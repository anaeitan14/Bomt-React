const User = require("../models/userSchema");
const Table = require("../models/tableSchema");

exports.createTable = async (req, res) => {
  try {
    const user = req.session.user;
    const realUser = await User.findById(user._id);
    console.log(realUser);
    const name = req.body.name;

    const table = new Table({
      name,
      admin: user._id, //settings the user created the table as admin.
      managers: [],
      products: [],
    });
    req.session.table = table;
    req.session.save();
    await table.save();
    realUser.tables.push(table); //user has the tables he's part of.
    await realUser.save();
    req.session.user = realUser;
    return res.status(200).json({ message: "Table created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.tables = async (req, res) => {
  //a get method, to show a user all of his tables.
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
  //after clicking on a table to join, request gives the table name.
  try {
    const { tableName } = req.body;
    const table = Table.findOne({ name: tableName });
    for (let i = 0; i < req.session.user.tables.length; i++) {
      if (req.session.user.tables[i]._id.toString() === table._id.toString()) {
        req.session.table = tableName; //setting the table name inside the session, to follow.
        req.session.save();
        return res.status(200).json({ message: "picked the table" });
      }
    }
    return res.status(404).json({ message: "table not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.addManager = async (req, res) => {
  //only an admin can add a manager
  try {
    const requestedEmail = req.body.requestedEmail;
    const tableName = req.session.table;
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
      //probably pointless, considering removing it, I have it in perm check middleware
      (checkTable) => checkTable._id.toString() === table._id.toString()
    );
    if (
      //checking if the user is not an admin.
      table.admin &&
      table.admin._id &&
      table.admin._id.toString() !== user._id &&
      isInside
    ) {
      return res
        .status(403)
        .json({ message: "Only the admin can add a manager" });
    }
    table.managers.push(requestedUser); //adding the user as manager
    requestedUser.tables.push(table);
    const logData = new Log({
      UID: req.session.user,
      action:
        "User " +
        requestedUser.email +
        " was promoted to manager by " +
        req.session.user.email,
    });
    table.logs.push(logData);
    await requestedUser.save();
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
    table.logs.push(logData);
    await table.save();
    return res
      .status(200)
      .json({ message: "user added succesfully to the table" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
