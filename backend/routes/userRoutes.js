const {
  removeUserRequest,
  getStudentsOfTeacher,
  addStudentToGroup,
} = require("../controllers/requests/userTeachRequests");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/requests/userRegLogRequests");
const { protect } = require("../middlewares/authMiddleware");

const userPrefix = "/users";
const userRouter = require("express").Router();

userRouter.get(userPrefix + "/:email", getStudentsOfTeacher);
userRouter.delete(userPrefix + "/:email", removeUserRequest);
userRouter.put(userPrefix + "/addToGroup", addStudentToGroup);

userRouter.route(userPrefix).post(registerUser);
userRouter.route(userPrefix + "/login").post(authUser);
userRouter.route(userPrefix + "/profil").post(protect, updateUserProfile);

module.exports = { userRouter, userPrefix };
