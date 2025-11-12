// const mongoose = require("mongoose");

// // Store the date and sequence for daily reset
// const counterSchema = new mongoose.Schema({
//   date: { type: String, required: true, unique: true }, // YYYY-MM-DD
//   seq: { type: Number, default: 0 }, // start from 0 so first order = 1
// });

// module.exports = mongoose.model("OrderCounter", counterSchema);





const mongoose = require("mongoose");

// Define the schema for daily order counter
const counterSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true, // Ensure one counter per day
  },
  seq: {
    type: Number,
    default: 0, // start from 0, first order = 1
  },
});

// Clean up any old indexes that use 'name'
counterSchema.pre("save", async function (next) {
  const model = mongoose.model("OrderCounter");
  const indexes = await model.collection.indexes();

  // If any old 'name_1' index exists, drop it
  const hasOldIndex = indexes.some((idx) => idx.name === "name_1");
  if (hasOldIndex) {
    try {
      await model.collection.dropIndex("name_1");
      console.log("🧹 Dropped old index: name_1");
    } catch (err) {
      if (err.codeName !== "IndexNotFound") console.error(err);
    }
  }

  next();
});

// Optional: Ensure the correct index exists for 'date'
counterSchema.index({ date: 1 }, { unique: true });

module.exports = mongoose.model("OrderCounter", counterSchema);
