let Task = require("../../models/taskModel");

const tryToAddTask = async (number) => {
  const newTask = Task({ number: number });
  await newTask.save();
};

const tryToRemoveTask = async (number) => {
  await Task.findOneAndRemove({ number: number });
};

module.exports = {
  tryToAddTask,
  tryToRemoveTask,
};
