const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    ProductID: {
        type: String,
        required: true,
        unique: true
    },
    ProductName: {
        type: String,
        required: true
    },

    Description:{
        type: String,
        required: true
    },

    BuyMake:{
        type: String,
        required: true
    },

    Manufacturer: {
        type: String,
    },

    ManufacturerID: {
        type: String
    },

    Distrobutor: [{
        DistrobutorName: {
          type: String,
          required: true
        },
        DistrobutorID: {
          type: String,
          required: true
        }
    }],

    Document: [{
        DocumentType: {
            type: String,
            required: true
        },
        DocumentLocation: {
            type:String,
            required: true
        }
    }],
    TreeAvailable: {
        type: Boolean,
        required: true
    }
  });

  module.exports = mongoose.model('Item', itemSchema);
