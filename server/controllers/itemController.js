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
      Distrobutor: [
        {
          DistrobutorName: "uwu",
          DistrobutorID: "123"
        }
      ],
      Document: [
        {
          DocumentType: item.DocumentType,
          DocumentLocation: item.DocumentLocation
        }
      ],
      TreeAvailable: item.TreeAvailable
    });
    
    await newItem.save();
    console.log(item)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};