const User = require("../models/userSchema");

exports.createTable = async (req, res) => {
  try {
    const { user, tableName } = req.body;

    const table = await User.findOne({
      email: user.email,
      tables: { $elemMatch: { name: tableName } },
    });

    if (table) {
      return res
        .status(400)
        .json({ message: "table name already exists inside the user" });
    }

    const newTable = tableName;

    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      { $push: { tables: newTable } },
      { new: true } // return the updated document
    );

    res
      .status(200)
      .json({ message: "table created successfully", table: newTable });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.tables = async(req, res) => {
  const tableNames = User.find(req.user.email)
  tableNames = tableNames.table
  console.log(table)
}
