const {
  removeUserRequest,
  getStudentsOfTeacher,
  addStudentToGroup,
} = require("../controllers/requests/userRequests");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const userPrefix = "/users";
const userRouter = require("express").Router();

userRouter.get(userPrefix + "/:email", getStudentsOfTeacher);
userRouter.delete(userPrefix + "/:email", removeUserRequest);
userRouter.put(userPrefix + "/addToGroup", addStudentToGroup);

userRouter.route("/").post(registerUser);
userRouter.route("/login").post(authUser);
userRouter.route("/profil").post(protect, updateUserProfile);

module.exports = { userRouter, userPrefix };
