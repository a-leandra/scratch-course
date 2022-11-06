const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const Group = require("../../models/groupModel");
const PasswordReset = require("../../models/passwordResetModel");
const generateToken = require("../../utils/generateToken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

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
  groupExists = await Group.findOne({ code: group });

  if (group === "") {
    groupExists = await Group.findOne({ code: 0 });
  }

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
    res.status(400);
    throw new Error("Error occured. Please try again");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.surname = req.body.surname || user.surname;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(201).json({
      _id: updateUserProfile._id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email, redirectUrl } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    sendResetEmail(email, redirectUrl, res);
  } else {
    res.status(400);
    throw new Error("Error occured. Please try again");
  }
});

const sendResetEmail = (email, redirectUrl, res) => {
  const resetString = uuidv4;

  // Deleting all exisitng reset records
  try {
    PasswordReset.deleteMany({ userEmail: email });
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Zmiana hasła",
      html: `<p>Wystąpiłeś(-aś) ostatnio z prośbą o zmianę hasła.</p>
      <p>Aby zmienić hasło <a href=${
        redirectUrl + "/" + email + "/" + resetString
      }kliknij tutaj</a>.</p>
      <p>Ważność linku wygaśnie za 60 minut, więc prosimy o natychmiastowe działania. Dziękujemy za korzystanie z Kursu Scratcha!</p>`,
    };

    //Hashing the reset string
    const salt = bcrypt.genSalt(10);
    resetString = bcrypt.hash(resetString, salt);
    const newPasswordReset = new PasswordReset({
      email: email,
      resetString: resetString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    newPasswordReset.save();

    transporter.sendEmail(mailOptions);

    res.json({
      status: "PENDING",
      message: "Password reset email sent",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Error occured. Please try again");
  }
};

module.exports = {
  registerUser,
  authUser,
  requestPasswordReset,
  updateUserProfile,
};
