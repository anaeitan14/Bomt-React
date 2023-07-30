const User = require("../models/userSchema");
const Table = require("../models/tableSchema");

exports.sessionCheck = (req, res, next) => {
  const sessionExpires = new Date(req.session.cookie._expires);
  if (req.session && req.session.cookie && req.session.cookie.expires) {
    const now = new Date();
    console.log(now);
    console.log(sessionExpires);


    // If the session has expired, log the user out and clear the session
    if (now > req.session.cookie._expires) {
      req.logout(); // If using passport.js to manage login, this will log the user out
      req.session.destroy(); // Destroy the session
      return res.status(401).json({ message: "Session has expired. Please log in again." });
    }
  }

  // Continue to the next middleware or route handler
  next();
};
exports.checkPermissions = async (req, res, next) => {
  try {
    const { email } = req.body.email;
    const user = await User.findOne({ email: email });
    const tableName = req.body.tableName;

    const table = await Table.findById({ name: tableName })
      .populate("admin", "role")
      .populate("managers", "role");

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    const isAdmin = table.admin._id.toString() === user._id;
    const isManager = table.managers.some(
      (manager) => manager._id.toString() === user._id
    );

    if (!(isAdmin || isManager)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};