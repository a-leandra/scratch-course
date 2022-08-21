const {
  getStudentsOfTeacherRequest,
  addStudentRequest,
  removeStudentRequest,
  updateStudentsVarRequest,
} = require("../controllers/requests/studentRequests");

const studentPrefix = "/students";
const studentRouter = require("express").Router();

studentRouter.get(
  studentPrefix + "/:teacherLogin",
  getStudentsOfTeacherRequest
);
studentRouter.post(studentPrefix, addStudentRequest);
studentRouter.delete(studentPrefix + "/:studentLogin", removeStudentRequest);
studentRouter.put(studentPrefix, updateStudentsVarRequest);

module.exports = { studentRouter, studentPrefix };
