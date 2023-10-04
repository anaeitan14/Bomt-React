const crypto = require("crypto");
const User = require("../models/userSchema");
const passport = require("passport");
const nodemailer = require("nodemailer");

function passwordCheck(password) {
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  if (!/[a-z]/.test(password)) {
    return false;
  }

  if (!/[0-9]/.test(password)) {
    return false;
  }

  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
    return false;
  }
  if (password.length() < 10) {
    return false;
  }
  return true;
}

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const valid = passwordCheck(password);

    if (valid) {
      return res
        .status(404)
        .json({ message: "password is too weak, please pick another one" });
    }
    const salting_word = crypto.randomBytes(32).toString("base64");
    const hash = crypto // crypting the password using sha512 and irritiating it with a salting word so it won't be easily cracked.
      .pbkdf2Sync(password, salting_word, 950, 64, "sha512")
      .toString("hex");
    const newUser = new User({
      email: email,
      password: hash,
      salting_word: salting_word, //saving the salting word for logging back in later.
    });

    await newUser.save();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.googleReg = (req, res, next) => {
  passport.authenticate("local-google", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Google authentication failed" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.user = user;
      req.session.save();

      return res
        .status(200)
        .json({ message: "Google authentication successful" });
    });
  })(req, res, next);
};

//exports.googleRegister = async (req, res) => {
//  //since googleRegister handles both the registering and logging in using a gmail, it has 2 req.login
//  try {
//    const { JWT } = req.body;
//    console.log(JWT);
//    const data = jwt.decode(JWT); //decoding the jwt from the front, receiving the data.
//    console.log(data);
//    const user = await User.findOne({ email: data.email });
//    if (user) {
//      req.logIn(user, (err) => {
//        if (err) {
//          console.error(err);
//          return res.status(500).json({ message: "Failed to log in the user" });
//        }
//        req.session.user = user;
//        req.session.save();
//        res.cookie("sessionID", req.sessionID);
//        return res.status(200).json({ auth: true, message: "User logged in" });
//      });
//    }
//
//    const newUser = new User({
//      email: data.email,
//      password: "created with google", //to distinguish wether a user is signed with google or email, there's no point in having his password hashed, if he won't be using it anyway.
//    });
//    newUser.save();
//    req.logIn(newUser, (err) => {
//      if (err) {
//        console.error(err);
//        return res.status(500).json({ message: "Failed to log in the user" });
//      }
//      req.session.user = newUser;
//      req.session.save();
//      res.cookie("sessionID", req.sessionID);
//      return res.status(200).json({
//        auth: true,
//        message: "New user created successfully",
//      });
//    });
//  } catch (error) {
//    console.error(error);
//    return res.status(500).json({ message: "Internal server error" });
//  }
//};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //going to passport.use localstrat in server.js
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ auth: false, message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.user = user; //saving user in session for future use.
      req.session.save();
      res.cookie("sessionID", req.sessionID); //sending session ID in cookie.
      return res.status(200).json({ auth: true, message: "You can redirect" });
    });
  })(req, res, next);
};

exports.logout = async (req, res) => {
  const email = req.session.user.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.sendStatus(404);
    }

    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500);
      }
      return res.status(200).json({ message: "user has logged out" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.forgot = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const user = await User.findOne({ email: req.session.user.email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }
  const newPassword = randomstring.generate(16);
  const hash = crypto // crypting the password using sha512 and irritiating it with a salting word so it won't be easily cracked.
    .pbkdf2Sync(newPassword, user.salting_word, 950, 64, "sha512")
    .toString("hex");

  const mailOptions = {
    from: process.env.EMAIL,
    to: req.session.user.email,
    subject: "Password reset",
    text: `Your new password is ${newPassword},\nPlease change it ASAP as it is not a secure password.`,
  };

  transporter.sendEmail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(`Email sent: ${info.response}`);
      return res.status(200).json({ message: "New password send succesfully" });
    }
  });
};
