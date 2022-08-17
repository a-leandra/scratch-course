let Teacher = require("../models/teacherModel");

const getTeachers = async (req, res) => {
  try {
    const allTeachers = await Teacher.find();
    res.status(200).json(allTeachers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addTeacher = async (req, res) => {
  const { login, password, telephoneNumber, name, surname } = req.body;
  try {
    if (doesTeacherExist(login)) {
      const newTeacher = Teacher({
        login,
        password,
        telephoneNumber,
        name,
        surname,
      });
      await newTeacher.save();
      res.status(201).json(newTeacher);
    } else {
      return res
        .status(404)
        .json({ message: "Teacher: " + login + " already exist." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const removeTeacher = async (req, res) => {
  const { login } = req.params;
  try {
    if (doesTeacherExist(login)) {
      await Teacher.findOneAndRemove({ login: login });
      res
        .status(201)
        .json({ message: "Teacher: " + login + " deleted successfully." });
    } else {
      return res
        .status(404)
        .json({ message: "Teacher: " + login + " doesn't exist." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const doesTeacherExist = async (login) => {
  const existingTeacher = await Teacher.findOne({ login: login });
  if (existingTeacher) {
    return true;
  }
  return false;
};

module.exports = { getTeachers, addTeacher, removeTeacher };
