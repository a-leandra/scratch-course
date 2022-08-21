let Student = require("../../models/studentModel");
let Group = require("../../models/groupModel");
let Teacher = require("../../models/teacherModel");

const findAllStudentsOfTeacher = async (teacherLogin) => {
  const teacher = await Teacher.findOne({ login: teacherLogin });
  const allGroups = await Group.find({ teacher: teacher });
  const allStudents = await Student.find({
    group: { $in: allGroups },
  });
  return allStudents;
};

const tryToAddStudent = async (student) => {
  const group = await Group.findOne({ name: student.groupName });
  const newStudent = Student({
    login: student.login,
    password: student.password,
    name: student.name,
    surname: student.surname,
    group: group,
  });
  await newStudent.save();
};

const tryToRemoveStudent = async (login) => {
  const removed = await Student.findOneAndDelete({ login: login });
  if (removed === undefined || removed == null) {
    throw Object.assign(new Error("Student " + login + " not found."), {
      code: 404,
    });
  }
};

const tryToUpdateStudentsVar = async (login, newValue) => {
  const result = await Student.updateOne({ login: login }, newValue);
  if (result.acknowledged === false) {
    throw Object.assign(new Error("Student " + login + " not found."), {
      code: 404,
    });
  }
};

module.exports = {
  findAllStudentsOfTeacher,
  tryToAddStudent,
  tryToRemoveStudent,
  tryToUpdateStudentsVar,
};
