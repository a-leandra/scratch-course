const {
  findAllStudentsOfTeacher,
  tryToAddStudent,
  tryToRemoveStudent,
  tryToUpdateStudentsVar,
} = require("../crud/studentCrud");

const getStudentsOfTeacherRequest = async (req, res) => {
  const { teacherLogin } = req.params;
  try {
    const allStudents = await findAllStudentsOfTeacher(teacherLogin);
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const addStudentRequest = async (req, res) => {
  try {
    await tryToAddStudent(req.body);
    res.status(201).json({ message: "Student " + req.body.login + " added." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const removeStudentRequest = async (req, res) => {
  const { studentLogin } = req.params;
  try {
    await tryToRemoveStudent(studentLogin);
    res.status(200).json({ message: "Student " + studentLogin + " removed." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const updateStudentsVarRequest = async (req, res) => {
  const { studentLogin, valueName, value } = req.body;
  try {
    await tryToUpdateStudentsVar(studentLogin, { [valueName]: value });
    res.status(200).json({
      message: "Students " + studentLogin + " " + valueName + " changed.",
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

module.exports = {
  getStudentsOfTeacherRequest,
  addStudentRequest,
  removeStudentRequest,
  updateStudentsVarRequest,
};
