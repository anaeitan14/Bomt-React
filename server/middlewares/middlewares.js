const User = require("../models/userSchema");
const Table = require("../models/tableSchema");

exports.sessionCheck = (req, res, next) => {
  const { email } = req.body.email;
  const user = User.findOne({ email });
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
