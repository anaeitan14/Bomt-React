const User = require("../models/userSchema");

exports.sessionCheck = (req, res, next) => {
  const { email } = req.body.email;
  const uid = User.findOne({ email });
  console.log(uid);
  next();
};
