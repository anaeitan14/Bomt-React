const User = require("../models/userSchema");
const Table = require("../models/tableSchema");
const Log = require("../models/logSchema");

exports.createTable = async (req, res) => {
  try {
    const user = req.session.user;
    const realUser = await User.findById(user._id);
    const name = req.body.name;

    const table = new Table({
      name,
      admin: user._id, //settings the user created the table as admin.
      managers: [],
      products: [],
    });
    req.session.table = name;
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
  //a try catch, to prevent the whole server from crashing when the user 
  //does not have any tables :) :) 
  try {
    const tables = req.session.user.tables;
    const tableNames = [];
    for (let i = 0; i < tables.length; i++) {
      const Name = await Table.findById(tables[i]);
      tableNames[i] = Name.name;
    }
    return res.status(200).json({ tableNames });
  } catch (e) {
    return res
      .status(400)
      .json({ message: "User does not have any tables yet" });
  }
};

exports.pickTable = async (req, res) => {
  //after clicking on a table to join, request gives the table name.
  try {
    const email = req.session.user.email;
    const user = await User.findOne({ email: email });
    const { tableName } = req.body;
    const table = await Table.findOne({ name: tableName });
    for (let i = 0; i < user.tables.length; i++) {
      if (user.tables[i].toString() === table._id.toString()) {
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
    const addingTable = await Table.findOne({ name: tableName });
    const requestedUser = await User.findOne({ email: requestedEmail });
    if (!requestedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!addingTable) {
      return res.status(404).json({ message: "Table not found" });
    }
    const isUser = requestedUser.tables.some(
      (table) => table._id.toString() === addingTable._id
    );
    if (!isUser) {
      return res
        .status(400)
        .json({ message: "need to be a regular user first" });
    }
    const isInside = requestedUser.tables.some(
      (checkTable) => checkTable._id.toString() === addingTable._id.toString()
    );
    if (
      addingTable.admin &&
      addingTable.admin._id &&
      addingTable.admin._id.toString() !== user._id &&
      isInside
    ) {
      return res
        .status(403)
        .json({ message: "Only the admin can add a manager" });
    }
    addingTable.managers.push(requestedUser); //adding the user as manager
    const logData = new Log({
      UID: req.session.user,
      action:
        "User " +
        requestedUser.email +
        " was promoted to manager by " +
        req.session.user.email,
    });
    addingTable.logs.push(logData);
    await requestedUser.save();
    await logData.save();
    await addingTable.save();
    return res.status(200).json({ message: "Manager added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addNormalUser = async (req, res) => {
  try {
    const requestedEmail = req.body.requestedEmail;
    const tableName = req.session.table;
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
