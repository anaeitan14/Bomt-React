const crypto = require("crypto");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const session = require("express-session");

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
    const data = jwt.decode(JWT);
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

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        const hash = crypto
          .pbkdf2Sync(password, user.salting_word, 950, 64, "sha512")
          .toString("hex");
        if (hash === user.password) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect email or password." });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

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
      console.log(req.session);
      return res
        .status(200)
        .json({ auth: true, message: "You  can redirect" });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  if (req.user.session) {
    req.user.session.destory();
    console.log(req.user.session());
    return res
      .status(200)
      .json({ auth: false, message: "User has disconnected" });
  }
};

