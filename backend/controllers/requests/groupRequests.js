const {
  tryToFindAllGroupsOfTeacher,
  tryToAddGroup,
  tryToRemoveGroup,
} = require("../crud/groupCrud");

const getGroupsOfTeacherRequest = async (req, res) => {
  const { teacherLogin } = req.params;
  try {
    const allGroups = await tryToFindAllGroupsOfTeacher(teacherLogin);
    res.status(200).json(allGroups);
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const addGroupRequest = async (req, res) => {
  const { name, teacherLogin } = req.body;
  try {
    await tryToAddGroup(name, teacherLogin);
    res.status(201).json({ message: "Group " + name + " added." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const removeGroupRequest = async (req, res) => {
  const { teacherLogin, name } = req.params;
  try {
    await tryToRemoveGroup(name, teacherLogin);
    return res.status(200).json({ message: "Group " + name + " removed." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

module.exports = {
  getGroupsOfTeacherRequest,
  addGroupRequest,
  removeGroupRequest,
};
