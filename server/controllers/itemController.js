const Item = require("../models/itemSchema");

exports.addItem = async (req, res) => {
  try {
    const { item } = req.body;
    const existingItem = await Item.findOne({ProductID : item.ProductID})
    if(existingItem){
      return res.status(400).json({message: "The item exists already"})
    }
    const newItem = new Item({
      ProductID: item.ProductID,
      ProductName: item.ProductName,
      Description: item.Description,
      BuyMake: "Buy",
      Manufacturer: item.Manufacturer,
      ManufacturerID: item.ManufacturerID,
      Distrobutor: item.Distrobutor,
      Document: item.Document,
      TreeAvailable: item.TreeAvailable
    });
    
    await newItem.save();
    return(res.status(200).json({message: "Item added succsfully"}))
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};