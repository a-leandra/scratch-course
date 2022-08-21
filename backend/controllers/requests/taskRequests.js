const { tryToAddTask, tryToRemoveTask } = require("../crud/taskCrud");
let Task = require("../../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const addTaskRequest = async (req, res) => {
  const { number } = req.body;
  try {
    await tryToAddTask(number);
    res.status(201).json({
      message: "Task " + number + " added.",
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const removeTaskRequest = async (req, res) => {
  const { number } = req.params;
  try {
    await tryToRemoveTask(number);
    res.status(200).json({ message: "Task " + number + " removed." });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

module.exports = { getAllTasks, addTaskRequest, removeTaskRequest };
