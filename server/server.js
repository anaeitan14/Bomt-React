require("dotenv").config({ path: "bop.env" });
const crypto = require("crypto");
const User = require("./models/userSchema");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const expresssession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoURI = "mongodb://127.0.0.1:27017/BOMT";
const app = express();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 3600000, //1 hour
  },
};
app.use(express.json());
app.use(expresssession(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

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

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use(cors());
app.use("/api", routes);
mongoose.connect(mongoURI).then(() =>
  app.listen(5000, () => {
    console.log("connected to the database and listening in port 5000");
  })
);
