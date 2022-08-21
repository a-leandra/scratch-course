const {
  addProgressRequest,
  removeProgressRequest,
  updateProgressVarRequest,
  getStudentProgressFromAllTasksRequest,
} = require("../controllers/requests/progressRequests");

const progressPrefix = "/progress";
const progressRouter = require("express").Router();

progressRouter.get(
  progressPrefix + "/:studentLogin",
  getStudentProgressFromAllTasksRequest
);
progressRouter.post(progressPrefix, addProgressRequest);
progressRouter.delete(
  progressPrefix + "/:studentLogin/:taskNumber",
  removeProgressRequest
);
progressRouter.put(progressPrefix, updateProgressVarRequest);

module.exports = { progressRouter, progressPrefix };
