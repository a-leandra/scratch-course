const Teacher = require("../../models/teacherModel");
const {
  tryToAddTeacher,
  tryToRemoveTeacher,
  tryToUpdateTeachersVar,
} = require("../crud/teacherCrud");

const getAllTeachersRequest = async (req, res) => {
  try {
    const allTeachers = await Teacher.find();
    res.status(200).json(allTeachers);
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const addTeacherRequest = async (req, res) => {
  try {
    await tryToAddTeacher(req.body);
    res.status(201).json({
      message: "Teacher " + req.body.login + " added.",
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const removeTeacherRequest = async (req, res) => {
  const { login } = req.params;
  try {
    await tryToRemoveTeacher(login);
    res.status(200).json({ message: "Teacher " + login + " deleted." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const updateTeachersVarRequest = async (req, res) => {
  const { login, valueName, value } = req.body;
  try {
    tryToUpdateTeachersVar(login, { [valueName]: value });
    res
      .status(200)
      .json({ message: "Teacher's " + login + " " + valueName + " changed." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

module.exports = {
  getAllTeachersRequest,
  addTeacherRequest,
  removeTeacherRequest,
  updateTeachersVarRequest,
};
