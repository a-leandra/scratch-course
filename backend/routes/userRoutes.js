const {
  removeUserRequest,
  getStudentsOfTeacher,
  addStudentToGroup,
  updateUsersVarRequest,
  getHomework,
  getLastTaskDone,
} = require("../controllers/requests/userTeachRequests");
const {
  registerUser,
  authUser,
  updateUserProfile,
  requestPasswordReset,
  verifyEmail,
  verifiedAccount,
} = require("../controllers/requests/userRegLogRequests");
const { protect } = require("../middlewares/authMiddleware");

const userPrefix = "/users";
const userRouter = require("express").Router();

userRouter.get(userPrefix + "/:email", getStudentsOfTeacher);
userRouter.get(userPrefix + "/homework/:email", getHomework);
userRouter.get(userPrefix + "/task/:email", getLastTaskDone);
userRouter.delete(userPrefix + "/:email", removeUserRequest);
userRouter.put(userPrefix + "/addToGroup", addStudentToGroup);
userRouter.put(userPrefix + "/update", updateUsersVarRequest);

userRouter
  .route(userPrefix + "/requestPasswordReset")
  .post(requestPasswordReset);
userRouter.route(userPrefix).post(registerUser);
userRouter.route(userPrefix + "/login").post(authUser);
userRouter.route(userPrefix + "/profil").post(protect, updateUserProfile);
userRouter.route(userPrefix + "/removeFromGroup").post(updateUsersVarRequest);
userRouter.route(userPrefix + "/verify/:userId/:uniqueString").get(verifyEmail);
userRouter.route(userPrefix + "/verified/:error/:message").get(verifiedAccount);

module.exports = { userRouter, userPrefix };
