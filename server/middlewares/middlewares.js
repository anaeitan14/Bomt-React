const Table = require("../models/tableSchema");

exports.sessionCheck = (req, res, next) => {
  const sessionExpires = new Date(req.session.cookie._expires);
  if (req.session && req.session.cookie && req.session.cookie._expires) {
    const now = new Date();
    console.log(now);
    console.log(sessionExpires);
    if (now > req.session.cookie._expires) { //checking dates
      req.logout();
      req.session.destroy(); //destroying the session, making sure we lose all the information we gathered about them.
      return res
        .status(401)
        .json({ message: "Session has expired. Please log in again." }); //disconnecting them due to session expire.
    }
  }
  next();
};

exports.checkAdminManager = async (req, res, next) => {
  try {
    const user = req.session.user;
    const tableName = req.session.table;

    const table = await Table.findOne({ name: tableName })
      .populate("admin", "role")
      .populate("managers", "role");

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    const isAdmin = table.admin._id.toString() === user._id.toString(); //checking if the user is an admin.
    const isManager = table.managers.some(
      (manager) => manager._id.toString() === user._id.toString() //checking if the user is a manager.
    );

    if (!(isAdmin || isManager)) {
      return res.status(403).json({ message: "Insufficient permissions" }); //if he isn't, not perms.
    }

    return next(); //if he's, he has perms to continue his task.
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
