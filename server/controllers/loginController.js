const crypto = require("crypto");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const session = require('express-session')

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email:email });
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
  
    const user = await User.findOne({email: data.email})
    if(user){
      res.status(200).json({auth:true, message: "User exist already"})
    }

    const newUser = new User({
      email: data.email,
      password: "created with google",
    })  
    newUser.save();
    res.status(200).json({auth:true, email:data.email,  message: "New user created succefully"})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"})
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ auth: false, message: "Incorrect information" });
    }

    const hash = crypto
      .pbkdf2Sync(password, user.salting_word, 950, 64, "sha512")
      .toString("hex");

    if (hash === user.password) {
      req.session.user = user
      return res.status(200).json({auth: true, message: "user login succsefully"})
    }
    return res
      .status(400)
      .json({ auth: false, message: "Incorrect information" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

