const User = require("../models/userSchema");
const Table = require("../models/tableSchema");

exports.createTable = async (req, res) => {
  try {
    const { email } = req.body.email;
    const { name } = req.body.name;
    const user = await User.findOne({ email: email });

    const table = new Table({
      name,
      admin: user._id,
      managers: [],
      products: [],
    });

    await table.save();
    return res.status(200).json({ message: "Table created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.tables = async (req, res) => {
  const tableNames = User.find(req.user.email);
  tableNames = tableNames.table;
  console.log(table);
};

exports.addManager = async (req, res) => {
  try {
    const { email } = req.body.email;
    const { requestedEmail } = req.body.requestedEmail;
    const { tableName } = req.body.tableName;
    const user = await User.findOne({ email: email });
    const table = await Table.findOne({ name: tableName });
    const requestedUser = await User.findOne({ email: requestedEmail });
    if (!requestedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (table.admin._id.toString() !== user._id) {
      return res
        .status(403)
        .json({ message: "Only the admin can add a manager" });
    }

    table.managers.push(requestedUser._id);
    await table.save();
    return res.status(200).json({ message: "Manager added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
