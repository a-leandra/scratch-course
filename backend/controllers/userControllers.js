const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Group = require("../models/groupModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, group, task, isTeacher, picture } =
    req.body;

  // check if user already exists in the database
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User with such email address already exists");
  }

  // check if such group exists in the database
  const groupExists = await Group.findOne({ code: group });

  if (groupExists) {
    const user = await User.create({
      name,
      surname,
      email,
      password,
      group: groupExists._id,
      task,
      isTeacher,
      picture,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        group: groupExists._id,
        task: user.task,
        isTeacher: user.isTeacher,
        picture: user.picture,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("Error occured. Please try again");
    }
  } else {
    if (isTeacher) {
      const user = await User.create({
        name,
        surname,
        email,
        password,
        group,
        task,
        isTeacher,
        picture,
      });

      if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          group: user.group,
          task: user.task,
          isTeacher: user.isTeacher,
          picture: user.picture,
          token: generateToken(user._id),
        });
      } else {
        res.status(404);
        throw new Error("Error occured. Please try again");
      }
    } else {
      res.status(404);
      throw new Error("Group with such code doesn't exist");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      group: user.group,
      task: user.task,
      isTeacher: user.isTeacher,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occured. Please try again");
  }
});

module.exports = { registerUser, authUser };
