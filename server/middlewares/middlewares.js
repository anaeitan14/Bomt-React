const User = require("../models/userSchema");
const Table = require("../models/tableSchema");

exports.sessionCheck = (req, res, next) => {
  //to-do
  const sessionExpires = new Date(req.session.cookie._expires);
  if (req.session && req.session.cookie && req.session.cookie._expires) {
    const now = new Date();
    console.log(now);
    console.log(sessionExpires);
    if (now > req.session.cookie._expires) {
      req.logout();
      req.session.destroy();
      return res
        .status(401)
        .json({ message: "Session has expired. Please log in again." });
    }
  }
  next();
};
exports.checkPermissions = async (req, res, next) => {
  try {
    const user = req.session.user;
    const tableName = req.body.tableName;

    const table = await Table.findOne({ name: tableName })
      .populate("admin", "role")
      .populate("managers", "role");

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    const isAdmin = table.admin._id.toString() === user._id.toString();
    const isManager = table.managers.some(
      (manager) => manager._id.toString() === user._id.toString()
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
