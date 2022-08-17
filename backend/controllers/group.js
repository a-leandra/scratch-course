let Group = require("../models/groupModel");
let Teacher = require("../models/teacherModel");

const getGroups = async (req, res) => {
  const { teacherLogin } = req.params;
  try {
    const allGroups = await findAllGroups(teacherLogin);
    res.status(200).json(allGroups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const findAllGroups = async (teacherLogin) => {
  const teacher = await Teacher.findOne({ login: teacherLogin });
  const groups = await Group.find({ teacher: teacher });
  return groups;
};

const addGroup = async (req, res) => {
  const { name, teacherLogin } = req.body;
  try {
    const teacher = await Teacher.findOne({ login: teacherLogin });
    if (doesGroupExist(name, teacher)) {
      const newGroup = Group({ name: name, teacher: teacher });
      await newGroup.save();
      res.status(201).json(newGroup);
    } else {
      return res.status(404).json({ message: "Group already exist." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const removeGroup = async (req, res) => {
  const { name, teacherLogin } = req.params;

  try {
    const teacher = await Teacher.findOne({ login: teacherLogin });
    if (doesGroupExist(name, teacher)) {
      await Group.findOneAndRemove({ name: name, teacher: teacher });
      res.status(201);
      res.json({ message: "Group deleted successfully." });
    } else {
      return res.status(404).json({ message: "Group doesn't exist." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const doesGroupExist = async (name, teacher) => {
  const existingGroup = await Group.findOne({ name: name, teacher: teacher });
  if (existingGroup) {
    return true;
  }
  return false;
};

module.exports = { getGroups, addGroup, removeGroup };
