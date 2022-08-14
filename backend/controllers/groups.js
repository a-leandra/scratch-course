let Group = require("../models/group.model");

const getGroups = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const allGroups = await Group.find({ teacherId: teacherId });
    res.status(200).json(allGroups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addGroup = async (req, res) => {
  const { teacherId } = req.params;
  const { name } = req.body;

  try {
    if (!doesGroupExist(name, teacherId)) {
      return res.status(404).json({ message: "Group already exist." });
    }
    const newGroup = Group({ name, teacherId });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const removeGroup = async (req, res) => {
  const { name, teacherId } = req.params;

  try {
    if (!doesGroupExist(name, teacherId)) {
      return res.status(404).json({ message: "Group doesn't exist." });
    }
    await Group.findOneAndRemove(name);
    res.json({ message: "Group deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const doesGroupExist = async (name, teacherId) => {
  const existingGroup = await Group.findOne({ name, teacherId });
  if (existingGroup) {
    return true;
  }
  return false;
};

module.exports = { getGroups, addGroup, removeGroup };
