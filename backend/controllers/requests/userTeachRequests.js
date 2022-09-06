const {
  tryToAddUser,
  tryToRemoveUser,
  tryToUpdateUsersVar,
  tryToFindAllStudentsOfTeacher,
  tryToAddStudentToGroup,
} = require("../crud/userTeachCrud");

const addUserRequest = async (req, res) => {
  try {
    await tryToAddUser(req.body);
    res.status(201).json({
      message: "Teacher " + req.body.login + " added.",
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const removeUserRequest = async (req, res) => {
  const { email } = req.params;
  try {
    await tryToRemoveUser(email);
    res
      .status(200)
      .json({ message: "User with e-mail " + email + " deleted." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const updateUsersVarRequest = async (req, res) => {
  const { email, valueName, value } = req.body;
  try {
    await tryToUpdateUsersVar(email, { [valueName]: value });
    res
      .status(200)
      .json({ message: "User's (" + email + ") " + valueName + " changed." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const getStudentsOfTeacher = async (req, res) => {
  const { email } = req.params;
  try {
    const students = await tryToFindAllStudentsOfTeacher(email);
    res.status(200).json(students);
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const addStudentToGroup = async (req, res) => {
  const { email, code } = req.body;
  try {
    await tryToAddStudentToGroup(email, code);
    res.status(200).json({
      message:
        "Student (" + email + ") added to group with code: " + code + ".",
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

module.exports = {
  addUserRequest,
  removeUserRequest,
  updateUsersVarRequest,
  getStudentsOfTeacher,
  addStudentToGroup,
};
