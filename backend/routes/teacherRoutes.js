const {
  getAllTeachersRequest,
  addTeacherRequest,
  removeTeacherRequest,
  updateTeachersVarRequest,
} = require("../controllers/requests/teacherRequests");

const teacherPrefix = "/teachers";
const teacherRouter = require("express").Router();

teacherRouter.get(teacherPrefix, getAllTeachersRequest);
teacherRouter.post(teacherPrefix, addTeacherRequest);
teacherRouter.delete(teacherPrefix + "/:login", removeTeacherRequest);
teacherRouter.put(teacherPrefix, updateTeachersVarRequest);

module.exports = { teacherRouter, teacherPrefix };
