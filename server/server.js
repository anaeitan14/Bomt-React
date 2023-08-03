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
  //simple session config
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 3600000, //1 hour
  },
};
//setting up the server, using sessions, allowing for json requests, and intiliazing passport.
app.use(express.json());
app.use(expresssession(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the request origin is in the allowedOrigins array, or if it's not set (e.g., when using Postman)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials (cookies, session) to be sent with the request
};

app.use(cors(corsOptions));


passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email or password." }); //I don't want the user to know if he had a wrong email or password, could be abuseable.
        }
        const hash = crypto
          .pbkdf2Sync(password, user.salting_word, 950, 64, "sha512") //encrypthing the password using pbkdf2Sync, using the same salting word I used for registering the user.
          .toString("hex");
        if (hash === user.password) { //comparing hashes
          return done(null, user); //user managed to log in, returning the user object.
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
  done(null, user._id); //storing user._id in the session
});

passport.deserializeUser(async (id, done) => {
  //grabbing information about the user, saving it in req.user for  future methods.
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


app.use("/api", routes);
mongoose.connect(mongoURI).then(() =>
//connecting to a local database, using port 5000
  app.listen(5000, () => {
    console.log("connected to the database and listening in port 5000");
  })
);
