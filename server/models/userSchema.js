const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  salting_word: {
    type: String,
  },

  tables: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },
  ],

  time_stamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
