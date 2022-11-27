const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passwordResetSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    resetString: {
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

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

module.exports = PasswordReset;
