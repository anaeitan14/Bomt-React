const crypto = require("crypto");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const passport = require("passport");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salting_word = crypto.randomBytes(32).toString("base64");
    const hash = crypto
      .pbkdf2Sync(password, salting_word, 950, 64, "sha512")
      .toString("hex");
    const newUser = new User({
      email: email,
      password: hash,
      salting_word: salting_word,
    });

    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.googleRegister = async (req, res) => {
  try {
    const { JWT } = req.body;
    console.log(JWT);
    const data = jwt.decode(JWT);
    console.log(data);
    const user = await User.findOne({ email: data.email });
    if (user) {
      return res
        .status(200)
        .json({ auth: true, message: "User exist already" });
    }

    const newUser = new User({
      email: data.email,
      password: "created with google",
    });
    newUser.save();
    return res.status(200).json({
      auth: true,
      email: data.email,
      message: "New user created succefully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
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
      req.session.user = user;
      req.session.save();
      res.cookie("sessionID", req.sessionID);
      return res.status(200).json({ auth: true, message: "You can redirect" });
    });
  })(req, res, next);
};

exports.logout = async (req, res) => {
  const { email } = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.sendStatus(404);
    }

    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500);
      }
      return res.status(200);
    });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
