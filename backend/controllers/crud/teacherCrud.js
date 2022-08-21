let Teacher = require("../../models/teacherModel");

const tryToAddTeacher = async (teacher) => {
  const newTeacher = Teacher(teacher);
  await newTeacher.save();
};

const tryToRemoveTeacher = async (login) => {
  const removed = await Teacher.findOneAndDelete({ login: login });
  if (removed === undefined || removed == null) {
    throw Object.assign(new Error("Teacher " + login + " not found."), {
      code: 404,
    });
  }
};

const tryToUpdateTeachersVar = async (login, newVariable) => {
  const result = await Teacher.updateOne({ login: login }, newVariable);
  if (result.acknowledged === false) {
    throw Object.assign(new Error("Teacher " + login + " not found."), {
      code: 404,
    });
  }
};

module.exports = {
  tryToAddTeacher,
  tryToRemoveTeacher,
  tryToUpdateTeachersVar,
};
