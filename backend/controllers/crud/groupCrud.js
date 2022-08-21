let Group = require("../../models/groupModel");
let Teacher = require("../../models/teacherModel");

const tryToFindAllGroupsOfTeacher = async (teacherLogin) => {
  const teacher = await Teacher.findOne({ login: teacherLogin });
  const groups = await Group.find({ teacher: teacher });
  return groups;
};

const tryToAddGroup = async (groupName, teacherLogin) => {
  const teacher = await Teacher.findOne({ login: teacherLogin });
  const newGroup = Group({ name: groupName, teacher: teacher });
  await newGroup.save();
};

const tryToRemoveGroup = async (groupName, teacherLogin) => {
  const teacher = await Teacher.findOne({ login: teacherLogin });
  const removed = await Group.findOneAndDelete({
    name: groupName,
    teacher: teacher,
  });
  if (removed === undefined || removed == null) {
    throw Object.assign(new Error("Group " + groupName + " not found."), {
      code: 404,
    });
  }
};

module.exports = {
  tryToFindAllGroupsOfTeacher,
  tryToAddGroup,
  tryToRemoveGroup,
};
