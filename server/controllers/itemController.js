const Item = require("../models/itemSchema");
const User = require("../models/userSchema");

exports.addItem = async (req, res) => {
  try {
    const { item } = req.body.data;
    const existingItem = await Item.findOne({ ProductID: item.ProductID });
    if (existingItem) {
      return res.status(400).json({ message: "The item exists already" });
    }
    console.log(item);
    const newItem = new Item({
      ProductID: item.ProductID,
      ProductName: item.ProductName,
      Description: item.Description,
      BuyMake: item.BuyMake,
      Manufacturer: item.Manufacturer,
      ManufacturerID: item.ManufacturerID,
      Document: item.Document,
      Distrobutor: item.Distrobutor,
      TreeAvailable: item.TreeAvailable,
    });

    await newItem.save();
    return res.status(200).json({ message: "Item added succsfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { pid } = req.body;
    const existingItem = await Item.findOneAndDelete({ ProductID: pid });
    if (!existingItem) {
      return res
        .status(400)
        .json({ message: "Item not found in the database" });
    }
    return res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.searchItem = async (req, res) => {
  try {
    const { pid } = req.body;
    const findItem = await Item.findOne({ ProductID: pid });
    console.log(pid);
    if (!findItem) {
      return res
        .status(400)
        .json({ message: "Item not found in the database" });
    }
    return res.status(200).json(findItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
