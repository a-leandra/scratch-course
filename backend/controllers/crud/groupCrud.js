let Group = require("../../models/groupModel");
let User = require("../../models/userModel");
let Task = require("../../models/taskModel");

const tryToFindAllGroupsOfTeacher = async (email) => {
  const teacher = await User.findOne({ email: email });
  const groups = await Group.find({ teacher: teacher }).populate(
    "homeworkTask"
  );
  const results = groups.map((group) => {
    return { name: group.name, code: group.code, homework: group.homeworkTask };
  });
  return results;
};

const tryToAddGroup = async (name, email) => {
  const teacher = await User.findOne({ email: email });
  const n = (await getLastCode()) + 1;
  const newGroup = Group({
    name: name,
    teacher: teacher,
    code: n,
  });
  const result = await newGroup.save();
  if (result !== newGroup) {
    throw Object.assign(new Error("Cannot add group named " + name + "."), {
      code: 409,
    });
  }
  return n;
};

async function getLastCode() {
  if (typeof getLastCode.code === "undefined") {
    const lastGroup = await Group.findOne().sort({ _id: -1 });
    getLastCode.code = lastGroup === null ? 1000 : lastGroup.code;
    return getLastCode.code;
  }
  return ++getLastCode.code;
}

const tryToRemoveGroup = async (code) => {
  const removed = await Group.findOneAndDelete({
    code: code,
  });
  if (removed === undefined || removed == null) {
    throw Object.assign(new Error("Group with code " + code + " not found."), {
      code: 404,
    });
  }
};

const tryToUpdateGroupsVar = async (code, newVariable) => {
  const result = await Group.updateOne({ code: code }, newVariable);
  if (result.acknowledged === false || result.modifiedCount === 0) {
    throw Object.assign(new Error("Group with code " + code + " not found."), {
      code: 404,
    });
  }
};

const tryToChangeHomework = async (code, homework) => {
  const task = await Task.findOne({ number: homework });
  const result = await Group.updateOne({ code: code }, { homeworkTask: task });
  if (result.acknowledged === false || result.modifiedCount === 0) {
    throw Object.assign(new Error("Group with code " + code + " not found."), {
      code: 404,
    });
  }
};

module.exports = {
  tryToFindAllGroupsOfTeacher,
  tryToAddGroup,
  tryToRemoveGroup,
  tryToUpdateGroupsVar,
  tryToChangeHomework,
};
