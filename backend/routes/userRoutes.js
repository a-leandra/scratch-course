const {
  addUserRequest,
  removeUserRequest,
  updateUsersVarRequest,
  getStudentsOfTeacher,
  addStudentToGroup,
} = require("../controllers/requests/userRequests");

const userPrefix = "/users";
const userRouter = require("express").Router();

userRouter.get(userPrefix + "/:email", getStudentsOfTeacher);
userRouter.post(userPrefix, addUserRequest);
userRouter.delete(userPrefix + "/:email", removeUserRequest);
userRouter.put(userPrefix, updateUsersVarRequest);
userRouter.put(userPrefix + "/addToGroup", addStudentToGroup);

module.exports = { userRouter, userPrefix };
