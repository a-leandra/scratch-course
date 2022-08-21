const {
  getAllTasks,
  addTaskRequest,
  removeTaskRequest,
} = require("../controllers/requests/taskRequests");

const taskPrefix = "/tasks";
const taskRouter = require("express").Router();

taskRouter.get(taskPrefix, getAllTasks);
taskRouter.post(taskPrefix, addTaskRequest);
taskRouter.delete(taskPrefix + "/:taskNumber", removeTaskRequest);
taskRouter.put(taskPrefix, removeTaskRequest);

module.exports = { taskRouter, taskPrefix };
