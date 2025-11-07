const mongoose = require("mongoose");

// Store the date and sequence for daily reset
const counterSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  seq: { type: Number, default: 0 }, // start from 0 so first order = 1
});

module.exports = mongoose.model("OrderCounter", counterSchema);
