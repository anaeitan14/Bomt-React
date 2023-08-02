const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    UID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    timestamp:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Log", logSchema);