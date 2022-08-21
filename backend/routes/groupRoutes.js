const {
  getGroupsOfTeacherRequest,
  addGroupRequest,
  removeGroupRequest,
} = require("../controllers/requests/groupRequests");

const groupPrefix = "/groups";
const groupRouter = require("express").Router();

groupRouter.get(groupPrefix + "/:teacherLogin", getGroupsOfTeacherRequest);
groupRouter.post(groupPrefix, addGroupRequest);
groupRouter.delete(groupPrefix + "/:teacherLogin/:name", removeGroupRequest);

module.exports = { groupRouter, groupPrefix };
