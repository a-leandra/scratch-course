const {
  getGroupsOfTeacherRequest,
  addGroupRequest,
  removeGroupRequest,
  updateGroupsVarRequest,
} = require("../controllers/requests/groupRequests");

const groupPrefix = "/groups";
const groupRouter = require("express").Router();

groupRouter.get(groupPrefix + "/:email", getGroupsOfTeacherRequest);
groupRouter.post(groupPrefix, addGroupRequest);
groupRouter.delete(groupPrefix + "/:code", removeGroupRequest);
groupRouter.put(groupPrefix, updateGroupsVarRequest);

module.exports = { groupRouter, groupPrefix };
