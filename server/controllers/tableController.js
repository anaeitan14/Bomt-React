const User = require("../models/userSchema");
const Table = require("../models/tableSchema");

exports.createTable = async (req, res) => {
  try {
    const email = req.session.user.email;
    const name = req.body.name;
    const user = await User.findOne({ email: email });

    const table = new Table({
      name,
      admin: user._id,
      managers: [],
      products: [],
    });

    await table.save();
    user.tables.push(table);
    await user.save();
    return res.status(200).json({ message: "Table created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.tables = async (req, res) => {
  const tables = req.session.user.tables;
  console.log(tables);
  const tableNames = [];
  for (let i = 0; i < tables.length; i++) {
    const Name = await Table.findById(tables[i]);
    tableNames[i] = Name.name;
  }
  return res.status(200).json({ tableNames });
};

exports.pickTable = async (req, res) => {
  try {
    const { tableName } = req.body;
    req.session.table = tableName;
    req.session.save();
    return res.status(200).json({ message: "picked the table" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.addManager = async (req, res) => {
  try {
    const requestedEmail = req.body.requestedEmail;
    const tableName = req.body.tableName;
    const user = req.session.user;
    const table = await Table.findOne({ name: tableName });
    const requestedUser = await User.findOne({ email: requestedEmail });
    if (!requestedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    const isInside = requestedUser.tables.some(
      (checkTable) => checkTable._id.toString() === table._id.toString()
    );
    if (
      table.admin &&
      table.admin._id &&
      table.admin._id.toString() !== user._id &&
      isInside
    ) {
      await requestedUser.save();
      return res
        .status(403)
        .json({ message: "Only the admin can add a manager" });
    }
    table.managers.push(requestedUser._id);
    const logData = new Log({
      UID: req.session.user,
      action:
        "User " +
        requestedUser.email +
        " was promoted to manager by " +
        req.session.user.email,
    });
    await logData.save();
    await table.save();
    return res.status(200).json({ message: "Manager added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addNormalUser = async (req, res) => {
  try {
    const requestedEmail = req.body.requestedEmail;
    const tableName = req.body.tableName;
    const table = await Table.findOne({ name: tableName });
    const requestedUser = await User.findOne({ email: requestedEmail });
    if (!requestedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    requestedUser.tables.push(table);
    const logData = new Log({
      UID: req.session.user,
      action:
        "User " +
        requestedUser.email +
        " was given access by " +
        req.session.user.email,
    });
    await logData.save();
    await requestedUser.save();
    return res
      .status(200)
      .json({ message: "user added succesfully to the table" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
