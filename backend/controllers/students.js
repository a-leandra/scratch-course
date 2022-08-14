let Student = require("../models/student.model");

const getStudents = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const allStudents = await Student.find({ teacherId: teacherId });
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addStudent = async (req, res) => {
  const { teacherId } = req.params;
  const { name, surname, groupId } = req.body;

  try {
    if (doesStudentExist(name, surname, teacherId)) {
      return res.status(404).json({ message: "Student already exist." });
    }
    const newStudent = Student({ name, surname, groupId, teacherId });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const removeStudent = async (req, res) => {
  const { teacherId, name, surname } = req.params;

  try {
    if (!doesStudentExist(name, surname, teacherId)) {
      return res.status(404).json({ message: "Student doesn't exist." });
    }
    await Student.findOneAndRemove(name, surname);
    res.json({ message: "Student deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const doesStudentExist = async (name, surname, teacherId) => {
  const existingStudent = await Student.findOne({ name, surname, teacherId });
  if (existingStudent != null) {
    return true;
  }
  return false;
};

module.exports = { getStudents, addStudent, removeStudent };
