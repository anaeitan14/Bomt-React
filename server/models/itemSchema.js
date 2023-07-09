const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  ProductID: {
    type: String,
    required: true,
    unique: true,
  },
  ProductName: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  BuyMake: {
    type: String,
    required: true,
  },

  Manufacturer: {
    type: String,
  },

  ManufacturerID: {
    type: String,
  },

  Distrobutor: [
    {
      DistrobutorName: {
        type: String,
        required: true,
      },
      DistrobutorID: {
        type: String,
        required: true,
      },
    },
  ],

  Document: [
    {
      DocumentType: {
        type: String,
        required: true,
      },
      DocumentLocation: {
        type: String,
        required: true,
      },
    },
  ],
  Father: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  Sons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  TreeAvailable: {
    type: Boolean,
    required: true,
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
