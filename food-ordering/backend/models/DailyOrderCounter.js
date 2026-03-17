const mongoose = require("mongoose");

const dailyOrderCounterSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  count: { type: Number, default: 0 },
});

module.exports = mongoose.model("DailyOrderCounter", dailyOrderCounterSchema);
