const Item = require("../models/itemSchema");

exports.addItem = async (req, res) => {
    try {
      const { item } = req.body;
  
      const item = await User.findOne({ item });
      if (item) {
        return res.status(400).json({ message: "User already exists" });
      }
  };