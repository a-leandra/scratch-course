const { Group, User, Task } = require("../models/index");
const { tryToAddUser } = require("../controllers/crud/userTeachCrud");
const { tryToAddGroup } = require("../controllers/crud/groupCrud");
const { tryToaddUnivTeachAndGroup } = require("../controllers/special/special");
const { dataSets, testNameSuffix, exampleNameSuffix } = require("./dbData");
const mongoose = require("mongoose");

async function populateDB(isTest) {
  const suffix = isTest ? testNameSuffix : exampleNameSuffix;
  if(!(await Group.findOne({code: 1001}))) {
    await tryToaddUnivTeachAndGroup();
  }
  await addTasks();
  await addTeachers(suffix);
  await addGroups(suffix);
  await addStudents(suffix);
}

const addTasks = async() => {
  for (var i = 0; i < 8; i++) {
    var task = await Task.findOne({number: i});
    if(!task) {
     await Task.create({number: i}); 
    }
  }
}

const addTeachers = async (suffix) => {
  for (const teacher of dataSets.get("teachers").set) {
    teacher.name += suffix;
    teacher.email += suffix;
    teacher.verified = true;
    await tryToAddUser(teacher);
  }
};

const addGroups = async (suffix) => {
  for (const group of dataSets.get("groups").set) {
    group.name += suffix;
    group.email += suffix;
    await tryToAddGroup(group.name, group.email);
  }
};

const addStudents = async (suffix) => {
  const groups = await getGroups(suffix);
  const n = groups.length;
  for (const student of dataSets.get("students").set) {
    student.name += suffix;
    student.email += suffix;
    student.verified = true;
    student.group = groups[Math.floor(Math.random() * n)];
    await tryToAddUser(student);
  }
};

const getGroups = async (suffix) => {
  return await Group.find({
    name: {
      $regex: suffix,
      $options: "i",
    },
  });
};

async function clearDB(isTest) {
  const suffix = isTest ? testNameSuffix : exampleNameSuffix;
  await dropModelsByName([User], suffix);
}

const dropModelsByName = async (models, substring) => {
  for (const model of models) {
    await mongoose.connection
      .collection(model.collection.collectionName)
      .deleteMany({
        name: {
          $regex: substring,
          $options: "i",
        },
      });
  }
  var groups = await Group.find({
    name: {
      $regex: substring,
      $options: "i",
    },
  });
  for(const group of groups) {
    if(group.code !== 1001) {
      await Group.findOneAndDelete({
        code: group.code,
      });
    }
  }
};

/*async function isDBPopulated(isTest) {
  const suffix = isTest ? testNameSuffix : exampleNameSuffix;
  const models = [User, Group];
  for (const model of models) {
    const result = await mongoose.connection
      .collection(model.collection.collectionName)
      .count({
        name: {
          $regex: suffix,
          $options: "i",
        },
      });
    if (result === 0) {
      return false;
    }
  }
  return true;
}*/

module.exports = {
  clearDB,
  populateDB,
  //isDBPopulated,
};
