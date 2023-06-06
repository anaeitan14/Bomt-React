const User = require("../models/userSchema");

exports.sessionCheck = (req, res, next) => {
  const { email } = req.body.email;
  const user = User.findOne({ email });
  next();
};
