const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userVerificationSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    uniqueString: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const UserVerification = mongoose.model(
  "UserVerification",
  userVerificationSchema
);

module.exports = UserVerification;
