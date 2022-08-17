let Student = require("../models/studentModel");
let Group = require("../models/groupModel");
let Teacher = require("../models/teacherModel");

const getStudents = async (req, res) => {
  const { teacherLogin } = req.params;
  try {
    const teacher = await Teacher.findOne({ login: teacherLogin });
    const allStudents = await findAllStudents(teacher);
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const findAllStudents = async (teacher) => {
  const allGroups = await Group.find({ teacher: teacher });
  const allStudents = await Student.find({
    group: { $in: allGroups },
  });
  return allStudents;
};

const addStudent = async (req, res) => {
  const { login, password, name, surname, groupName } = req.body;
  try {
    if (doesStudentExist(login)) {
      const group = await Group.findOne({ name: groupName });
      const newStudent = Student({
        login: login,
        password: password,
        name: name,
        surname: surname,
        group: group,
      });
      await newStudent.save();
      res.status(201).json(newStudent);
    } else {
      return res.status(404).json({ message: "Student already exist." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const removeStudent = async (req, res) => {
  const { studentLogin } = req.params;
  try {
    if (doesStudentExist(studentLogin)) {
      await Student.findOneAndRemove({ login: studentLogin });
      res.status(201).json({ message: "Student deleted successfully." });
    } else {
      return res.status(404).json({ message: "Student doesn't exist." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const doesStudentExist = async (login) => {
  const existingStudent = await Student.findOne({ login: login });
  if (existingStudent) {
    return true;
  }
  return false;
};

module.exports = { getStudents, addStudent, removeStudent };
