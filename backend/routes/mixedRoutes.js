const getStudentsOfTeacherAndTheirStatRequest = require("../controllers/requests/mixedRequests");

const mixedRouter = require("express").Router();

const mixedPrefix = "mixed";
mixedRouter.get(
  "/panel-nauczyciela/:teacherLogin",
  getStudentsOfTeacherAndTheirStatRequest
);

module.exports = { mixedRouter, mixedPrefix };
