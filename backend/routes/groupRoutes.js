const {
  getGroupsOfTeacherRequest,
  addGroupRequest,
  removeGroupRequest,
  updateGroupsVarRequest,
  updateGroupHomework,
} = require("../controllers/requests/groupRequests");

const groupPrefix = "/groups";
const groupRouter = require("express").Router();

groupRouter.get(groupPrefix + "/:email", getGroupsOfTeacherRequest);
groupRouter.post(groupPrefix, addGroupRequest);
groupRouter.delete(groupPrefix + "/:code", removeGroupRequest);
groupRouter.put(groupPrefix, updateGroupsVarRequest);
groupRouter.put(groupPrefix + "/homework", updateGroupHomework);

module.exports = { groupRouter, groupPrefix };
