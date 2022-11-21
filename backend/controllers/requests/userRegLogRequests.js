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
    throw new Error("Wystąpił błąd podczas wyszukiwania użytkownika");
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
      try {
        let hashedResetString = await bcrypt.hash(resetString, salt);

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

        try {
          // setting values inside the PasswordReset
          const newPasswordReset = await PasswordReset.create({
            userId: _id,
            resetString: hashedResetString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
          });

          try {
            transporter.sendMail(mailOptions);
            // reset password email sent
            res.status(202).json({
              userId: _id,
              resetString: hashedResetString,
            });
          } catch (error) {
            console.log(error);
            res.status(400);
            throw new Error("Wystąpił błąd podczas przesyłania maila");
          }
        } catch (error) {
          console.log(error);
          res.status(400);
          throw new Error(
            "Wystąpił błąd podczas tworzenia rekordu resetowania hasła"
          );
        }
      } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error(
          "Wystąpił błąd podczas haszowania rekordów resetowania hasła"
        );
      }
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error(
        "Wystąpił błąd podczas usuwania rekordów resetowania hasła"
      );
    }
  }
);

const resetPassword = asyncHandler(async (req, res) => {
  const { userId, resetString, newPassword } = req.body;

  console.log(userId);

  try {
    const passwordReset = await PasswordReset.findOne({ userId });
    if (passwordReset) {
      const expirationDate = passwordReset.expiresAt;
      const hashedResetString = passwordReset.resetString;
      if (expirationDate < Date.now()) {
        try {
          await passwordReset.deleteOne({ _id: userId });
          res.status(400);
          throw new Error(
            "Ważność linku wygasła. Ponów próbę zresetowania hasła"
          );
        } catch (error) {
          res.status(400);
          throw new Error(
            "Wystąpił błąd podczas czyszczenia rekordu resetowania hasła"
          );
        }
      } else {
        try {
          let comparison = bcrypt.compare(resetString, hashedResetString);
          if (comparison) {
            try {
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
                throw new Error("User not found!");
              }
              try {
                await PasswordReset.deleteOne({
                  userId,
                });
                res.status(202).json({
                  userId: userId,
                });
              } catch (error) {
                res.status(400);
                throw new Error(
                  "Wystąpił błąd podczas kończenia pomyślnego resetowania hasła"
                );
              }
            } catch (error) {
              res.status(400);
              throw new Error("Wystąpił błąd podczas zapisywania nowego hasła");
            }
          } else {
            res.status(400);
            throw new Error(
              "Przekazano niepoprawne parametry. Sprawdź swoją skrzynkę pocztową"
            );
          }
        } catch (error) {
          res.status(400);
          throw new Error("Wystąpił błąd podczas porównywania rekordu kodu");
        }
      }
    } else {
      res.status(400);
      throw new Error("Podany rekord resetowania hasła nie został znaleziony");
    }
  } catch (error) {
    res.status(400);
    throw new Error(
      "Wyszukiwanie podanego rekordu resetowania hasła niepowiodło się"
    );
  }
});

module.exports = {
  registerUser,
  authUser,
  requestPasswordReset,
  updateUserProfile,
  verifyEmail,
  verifiedAccount,
  resetPassword,
};
