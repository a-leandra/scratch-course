const {
  tryToFindAllGroupsOfTeacher,
  tryToAddGroup,
  tryToRemoveGroup,
  tryToUpdateGroupsVar,
  tryToChangeHomework,
} = require("../crud/groupCrud");

const getGroupsOfTeacherRequest = async (req, res) => {
  const { email } = req.params;
  try {
    const groups = await tryToFindAllGroupsOfTeacher(email);
    res.status(200).json(groups);
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const addGroupRequest = async (req, res) => {
  const { name, email } = req.body;
  try {
    await tryToAddGroup(name, email);
    res.status(201).json({ message: "Group " + name + " added." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const removeGroupRequest = async (req, res) => {
  const { code } = req.params;
  try {
    await tryToRemoveGroup(code);
    return res.status(200).json({ message: "Group (" + code + ") removed." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const updateGroupsVarRequest = async (req, res) => {
  const { code, valueName, value } = req.body;
  try {
    await tryToUpdateGroupsVar(code, { [valueName]: value });
    res
      .status(200)
      .json({ message: "Group's (" + code + ") " + valueName + " changed." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const updateGroupHomework = async (req, res) => {
  const { code, homework } = req.body;
  try {
    await tryToChangeHomework(code, homework);
    res
      .status(200)
      .json({ message: "Group's (" + code + ") homework  changed." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

module.exports = {
  getGroupsOfTeacherRequest,
  addGroupRequest,
  removeGroupRequest,
  updateGroupsVarRequest,
  updateGroupHomework,
};
