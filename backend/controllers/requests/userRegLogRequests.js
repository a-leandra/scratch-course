const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const UserVerification = require("../../models/userVerificationModel");
const Group = require("../../models/groupModel");
const PasswordReset = require("../../models/passwordResetModel");
const generateToken = require("../../utils/generateToken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

// accessing static verified page
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

//testing if transporter works successfully
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("[SUCCESS] Nodemailer transporter ready!");
    console.log(success);
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    surname,
    email,
    password,
    group,
    task,
    verified,
    isTeacher,
    picture,
  } = req.body;

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

  groupExists = await Group.findOne({ code: 1004 });

  if (groupExists) {
    const user = await User.create({
      name,
      surname,
      email,
      password,
      group: groupExists._id,
      verified: false,
      task,
      isTeacher,
      picture,
    });

    if (user) {
      // before we send the response we need to send a verification email to the user
      sendVerificationEmail(user, res);
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
        verified: false,
        task,
        isTeacher,
        picture,
      });

      if (user) {
        // before we send the response we need to send a verification email to the user
        sendVerificationEmail(user, res);
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

const sendVerificationEmail = asyncHandler(async ({ _id, email }, res) => {
  const currentUrl = "http://localhost:5000";

  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Aktywacja konta do Kursu Scratcha",
    html: `<p>Dziękujemy za rejestrację w serwisie Kurs Scratcha. Twoje konto jest jeszcze nieaktywne. Aby je aktywować prosimy o kliknięcie w przycisk poniżej.</p>
      <p>Aby aktywować konto <a href=${
        currentUrl + "/users/verify/" + _id + "/" + uniqueString
      }>kliknij tutaj</a></p>
      <p>Ważność linku wygaśnie za 6 godzin, więc prosimy o natychmiastowe działania. Dziękujemy za korzystanie z Kursu Scratcha!</p>`,
  };

  // hashing the unique string
  const salt = await bcrypt.genSalt(10);
  try {
    let hashedUniqueString = await bcrypt.hash(uniqueString, salt);

    try {
      // setting values inside the userVerification
      const newVerification = await UserVerification.create({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });

      try {
        transporter.sendMail(mailOptions);
        // verification email sent
        res.status(202);
        res.status(202).json({
          userId: _id,
          uniqueString: hashedUniqueString,
        });
      } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error(
          "Error while sending the verification email. Please try again"
        );
      }
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error(
        "Error occured while saving the email verification data. Please try again"
      );
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(
      "Error occured while hashing the email data. Please try again"
    );
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  let { userId, uniqueString } = req.params;

  try {
    const userVerification = await UserVerification.findOne({ userId });
    if (userVerification) {
      const expirationDate = userVerification.expiresAt;
      const hashedUniqueString = userVerification.uniqueString;

      if (expirationDate < Date.now()) {
        // record has expired so it needs to be deleted
        try {
          UserVerification.deleteOne({ userId });
          try {
            User.deleteOne({ _id: userId });
            let message = "Ważność linku wygasła. Zarejestruj się jeszcze raz";
            res.redirect(`/users/verified?error=true&message=${message}`);
          } catch (error) {
            let message =
              "Wystąpił błąd podczas czyszczenia rekordu użytkownika";
            res.redirect(`/users/verified?error=true&message=${message}`);
          }
        } catch (error) {
          console.log(error);
          let message =
            "Wystąpił błąd podczas czyszczenia rekordu weryfikacji użytkownika";
          res.redirect(`/users/verified?error=true&message=${message}`);
        }
      } else {
        try {
          let comparison = bcrypt.compare(uniqueString, hashedUniqueString);
          if (comparison) {
            try {
              const user = await User.findOne({ _id: userId });
              user.verified = true;
              const updatedUser = await user.save();
              try {
                const userVerification = await UserVerification.deleteOne({
                  userId,
                });
                res.sendFile(
                  path.join(__dirname, "./../../views/verified.html")
                );
              } catch (error) {
                console.log(error);
                let message =
                  "Wystąpił błąd podczas kończenia pomyślnej weryfikacji użytkownika";
                res.redirect(`/users/verified?error=true&message=${message}`);
              }
            } catch (error) {
              console.log(error);
              let message =
                "Wystąpił błąd podczas aktualizacji rekordu weryfikacji użytkownika";
              res.redirect(`/users/verified?error=true&message=${message}`);
            }
          } else {
            let message =
              "Przekazano niepoprawne parametry. Sprawdź swoją skrzynkę pocztową";
            res.redirect(`/users/verified?error=true&message=${message}`);
          }
        } catch (error) {
          let message = "Wystąpił błąd podczas porównywania rekordu kodu";
          res.redirect(`/users/verified?error=true&message=${message}`);
        }
      }
    } else {
      let message =
        "Rekord uzytkownika nie istnieje lub zostal juz zweryfikowany. Zarejestruj sie lub zaloguj na swoje konto";
      res.redirect(`/users/verified?error=true&message=${message}`);
    }
  } catch (error) {
    console.log(error);
    let message =
      "Wystąpił błąd podczas sprawdzania rekordu weryfikacji użytkownika";
    res.redirect(`/users/verified?error=true&message=${message}`);
  }
});

const verifiedAccount = asyncHandler(async (req, res) => {
  res.sendFile(path.join(__dirname, "./../../views/verified.html"));
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // checking if user is verified
  if (!user.verified) {
    res.status(404);
    throw new Error(
      "Konto nie zostało zweryfikowane. Sprawdź swoją skrzynkę pocztową"
    );
  } else {
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
  const resetString = "s0//P4$$w0rD";

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
    let hashedValue = bcrypt.hash(resetString, salt);
    const newPasswordReset = new PasswordReset({
      email: email,
      resetString: hashedValue,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    newPasswordReset.save();
    try {
      transporter.sendEmail(mailOptions);
    } catch (error) {
      res.status(400);
      throw new Error("Error occured. Please try again");
    }

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
  verifyEmail,
  verifiedAccount,
};
