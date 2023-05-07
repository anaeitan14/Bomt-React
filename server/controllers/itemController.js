const Item = require("../models/itemSchema");

exports.addItem = async (req, res) => {
  try {
    const { item } = req.body;
    console.log(item)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};