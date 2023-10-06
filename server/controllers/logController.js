const Log = require("../models/logSchema");
const Table = require("../models/tableSchema");

exports.logs = async (req, res) => {
  try {
    const tableName = req.session.table;
    const table = await Table.findOne({ name: tableName }); //.populate("logs").exec();
    if (!table) {
      return res.status(400).json({ message: "logs not found" });
    }
    const logsArray = [];
    for(let i = 0; i < table.logs.length; i++){
      const log = await Log.findOne({_id: table.logs[i]});
      logsArray[i] = log;
    }
    return res.status(200).json(logsArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
