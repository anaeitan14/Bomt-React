const Log = require("../models/userSchema");
const Table = require("../models/tableSchema");

exports.logs = async (req, res) => {
  try {
    const { tableName } = req.body;
    const table = await Table.findOne({ name: tableName });
    return res.status(200).json(table.logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
