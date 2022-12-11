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
  resetPassword,
  activateAccount,
} = require("../controllers/requests/userRegLogRequests");
const { protect } = require("../middlewares/authMiddleware");

const userPrefix = "/users";
const userRouter = require("express").Router();

userRouter.get(userPrefix + "/:email", getStudentsOfTeacher);
userRouter.get(userPrefix + "/homework/:email", getHomework);
userRouter.get(userPrefix + "/api/task/:email", getLastTaskDone);
userRouter.delete(userPrefix + "/:email", removeUserRequest);
userRouter.put(userPrefix + "/addToGroup", addStudentToGroup);
userRouter.put(userPrefix + "/update", updateUsersVarRequest);

userRouter
  .route(userPrefix + "/requestPasswordReset")
  .post(requestPasswordReset);
userRouter.route(userPrefix + "/activateAccount").post(activateAccount);
userRouter.route(userPrefix + "/resetPassword").post(resetPassword);
userRouter.route(userPrefix).post(registerUser);
userRouter.route(userPrefix + "/login").post(authUser);
userRouter.route(userPrefix + "/profil").post(protect, updateUserProfile);
userRouter.route(userPrefix + "/removeFromGroup").post(updateUsersVarRequest);

module.exports = { userRouter, userPrefix };
