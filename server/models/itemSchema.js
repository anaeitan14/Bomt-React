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
<<<<<<< HEAD
=======
        enum: ["Buy", "Make"],
>>>>>>> 63efc12c1697d37beea8f86e35c6725275501408
        required: true
    },

    Manufacturer: {
        type: String,
    },

    ManufacturerID: {
        type: [String],
        default: []
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
<<<<<<< HEAD
        type: String,
=======
        type: Boolean,
>>>>>>> 63efc12c1697d37beea8f86e35c6725275501408
        required: true
    }
  });

  module.exports = mongoose.model('Item', itemSchema);
