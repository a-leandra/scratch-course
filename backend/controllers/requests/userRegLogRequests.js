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
    throw new Error("Użytkownik z podanym adresem e-mail już istnieje");
  }

  // check if such group exists in the database
  groupExists = await Group.findOne({ code: group });

  // setting a default group for users who didn't provide a code
  if (group === "") {
    groupExists = await Group.findOne({ code: 1001 });
  }

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
      throw new Error("Wystąpił błąd. Spróbuj ponownie");
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
        throw new Error("Wystąpił błąd. Spróbuj ponownie");
      }
    } else {
      res.status(404);
      throw new Error("Grupa o podanym kodzie nie istnieje");
    }
  }
});

const sendVerificationEmail = asyncHandler(async ({ _id, email }, res) => {
  const redirectUrl = "https://638d16dc1c52d86d38600aed--deft-centaur-0ce107.netlify.app/aktywacja-konta";
  const uniqueString = uuidv4() + _id;

  try {
    // hashing the unique string
    const salt = await bcrypt.genSalt(10);
    let hashedUniqueString = await bcrypt.hash(uniqueString, salt);

    //making sure there's no "/" and "\" characters in the string
    hashedUniqueString = hashedUniqueString.split("/").join("");
    hashedUniqueString = hashedUniqueString.split("\\").join("");

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Aktywacja konta do Kursu Scratcha",
      html: `<p>Dziękujemy za rejestrację w serwisie Kurs Scratcha. Twoje konto jest jeszcze nieaktywne. Aby je aktywować prosimy o kliknięcie w przycisk poniżej.</p>
              <p>Aby aktywować konto <a href=${
                redirectUrl + "/" + _id + "/" + hashedUniqueString
              }>kliknij tutaj</a></p>
              <p>Ważność linku wygaśnie za 6 godzin, więc prosimy o natychmiastowe działania. Dziękujemy za korzystanie z Kursu Scratcha!</p>`,
    };

    // setting values inside the userVerification
    const newVerification = await UserVerification.create({
      userId: _id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    });

    transporter.sendMail(mailOptions);
    // verification email sent
    res.status(202).json({
      userId: _id,
      uniqueString: hashedUniqueString,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  }
});

const activateAccount = asyncHandler(async (req, res) => {
  const { userId, uniqueString } = req.body;

  try {
    const userVerification = await UserVerification.findOne({ userId });
    if (userVerification) {
      const expirationDate = userVerification.expiresAt;
      const hashedUniqueString = userVerification.uniqueString;

      if (expirationDate < Date.now()) {
        await UserVerification.deleteOne({ userId });
        await User.deleteOne({ _id: userId });
        res.status(404);
        throw new Error("Ważność linku wygasła. Zarejestruj się jeszcze raz");
      } else {
        let comparison = bcrypt.compare(uniqueString, hashedUniqueString);
        if (comparison) {
          const user = await User.findOne({ _id: userId });
          user.verified = true;
          const updatedUser = await user.save();
          const userVerification = await UserVerification.deleteOne({
            userId,
          });
          res.status(201).json({
            _id: userId,
            token: generateToken(updatedUser._id),
          });
        } else {
          res.status(404);
          throw new Error(
            "Przekazano niepoprawne parametry. Sprawdź swoją skrzynkę pocztową"
          );
        }
      }
    } else {
      res.status(404);
      throw new Error(
        "Rekord uzytkownika nie istnieje lub zostal juz zweryfikowany. Zarejestruj sie lub zaloguj na swoje konto"
      );
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (!user.verified) {
      res.status(404);
      throw new Error(
        "Konto nie zostało zweryfikowane. Sprawdź swoją skrzynkę pocztową"
      );
    } else {
      res.status(201).json({
        name: user.name,
        surname: user.surname,
        email: user.email,
        isTeacher: user.isTeacher,
        token: generateToken(user._id),
      });
    }
  } else {
    res.status(400);
    throw new Error(
      "Nie znaleziono użytkownika o takim adresie e-mail lub podano nieprawidłowe hasło"
    );
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.surname = req.body.surname || user.surname;
    user.email = req.body.email || user.email;

    // check if user with such email already exists in the database
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.status(404);
      throw new Error("Użytkownik z podanym adresem e-mail już istnieje");
    }

    const updatedUser = await user.save();

    res.status(201).json({
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      isTeacher: updatedUser.isTeacher,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Nie znaleziono podanego użytkownika!");
  }
});

const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email, redirectUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.verified) {
        sendResetEmail(user, redirectUrl, res);
      } else {
        res.status(400);
        throw new Error(
          "Konto podanego użytkownika nie zostało jeszcze aktywowane. Sprawdź swoją skrzynkę pocztową"
        );
      }
    } else {
      res.status(400);
      throw new Error("Użytkownik z podanym adresem e-mail nie istnieje");
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  }
});

const sendResetEmail = asyncHandler(
  async ({ _id, email }, redirectUrl, res) => {
    const resetString = uuidv4() + _id;

    // Deleting all exisitng reset records
    try {
      await PasswordReset.deleteMany({ userId: _id });

      // hashing the unique string
      const salt = await bcrypt.genSalt(10);
      let hashedResetString = await bcrypt.hash(resetString, salt);

      //making sure there's no "/" and "\" characters in the string
      hashedResetString = hashedResetString.split("/").join("");
      hashedResetString = hashedResetString.split("\\").join("");

      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Zmiana hasła",
        html: `<p>Wystąpiłeś(-aś) ostatnio z prośbą o zmianę hasła.</p>
                <p>Aby zmienić hasło <a href=${
                  redirectUrl + "/" + _id + "/" + hashedResetString
                }>kliknij tutaj</a>.</p>
                <p>Ważność linku wygaśnie za 60 minut, więc prosimy o natychmiastowe działania. Dziękujemy za korzystanie z Kursu Scratcha!</p>`,
      };

      // setting values inside the PasswordReset
      const newPasswordReset = await PasswordReset.create({
        userId: _id,
        resetString: hashedResetString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });

      transporter.sendMail(mailOptions);
      // reset password email sent
      res.status(202).json({
        userId: _id,
        resetString: hashedResetString,
      });
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error(error);
    }
  }
);

const resetPassword = asyncHandler(async (req, res) => {
  const { userId, resetString, newPassword } = req.body;

  try {
    const passwordReset = await PasswordReset.findOne({ userId });
    if (passwordReset) {
      const expirationDate = passwordReset.expiresAt;
      const hashedResetString = passwordReset.resetString;
      if (expirationDate < Date.now()) {
        await passwordReset.deleteOne({ _id: userId });
        res.status(400);
        throw new Error(
          "Ważność linku wygasła. Ponów próbę zresetowania hasła"
        );
      } else {
        let comparison = bcrypt.compare(resetString, hashedResetString);
        if (comparison) {
          const user = await User.findById(userId);

          if (user) {
            if (newPassword) {
              user.password = newPassword;
            }

            const updatedUser = await user.save();

            res.status(201).json({
              _id: userId,
              token: generateToken(updatedUser._id),
            });
          } else {
            res.status(404);
            throw new Error("Nie znaleziono podanego użytkownika!");
          }
          await PasswordReset.deleteOne({
            userId,
          });
          res.status(202).json({
            userId: userId,
          });
        } else {
          res.status(400);
          throw new Error(
            "Przekazano niepoprawne parametry. Sprawdź swoją skrzynkę pocztową"
          );
        }
      }
    } else {
      res.status(400);
      throw new Error("Podany rekord resetowania hasła nie został znaleziony");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  registerUser,
  authUser,
  requestPasswordReset,
  updateUserProfile,
  resetPassword,
  activateAccount,
};
