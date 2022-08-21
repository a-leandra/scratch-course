const {
  findStudentProgressFromAllTasks,
  tryToAddProgress,
  tryToRemoveProgress,
  tryToUpdateProgressVar,
} = require("../crud/progressCrud");

const getStudentProgressFromAllTasksRequest = async (req, res) => {
  const { studentLogin } = req.params;
  try {
    const progress = await findStudentProgressFromAllTasks(studentLogin);
    return res.status(200).json(progress);
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

const addProgressRequest = async (req, res) => {
  try {
    await tryToAddProgress(req.body);
    res.status(201).json({
      message:
        "Progress (" +
        req.body.studentLogin +
        ", (" +
        req.body.taskNumber +
        ") added.",
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const removeProgressRequest = async (req, res) => {
  const { studentLogin, taskNumber } = req.params;
  try {
    await tryToRemoveProgress(studentLogin, taskNumber);
    return res.status(200).json({
      message:
        "Progress (" +
        req.body.studentLogin +
        ", (" +
        req.body.taskNumber +
        ") removed.",
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const updateProgressVarRequest = async (req, res) => {
  const { studentLogin, taskNumber, valueName, value } = req.body;
  try {
    await tryToUpdateProgressVar(
      { studentLogin: studentLogin, taskNumber: taskNumber },
      { [valueName]: value }
    );
    return res.status(200).json({
      message:
        "Progress (" +
        studentLogin +
        ", (" +
        taskNumber +
        ") " +
        valueName +
        " updated.",
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

module.exports = {
  addProgressRequest,
  removeProgressRequest,
  updateProgressVarRequest,
  getStudentProgressFromAllTasksRequest,
};
