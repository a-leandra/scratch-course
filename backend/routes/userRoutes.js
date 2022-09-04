const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userControllers");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profil").post(protect, updateUserProfile);

module.exports = router;
