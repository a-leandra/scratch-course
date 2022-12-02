const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const jwtSecret = require("../config/globalVariables").jwtSecret;

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, jwtSecret);

      req.user = await User.findById({ _id: decoded.id }).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Brak autoryzacji, błąd tokena");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Brak autoryzacji, brak tokenu");
  }
});

module.exports = { protect };
