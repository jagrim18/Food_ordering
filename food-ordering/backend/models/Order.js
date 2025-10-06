// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     restaurant: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Restaurant",
//       required: true,
//     },
//     items: [
//       {
//         name: String,
//         price: Number,
//         quantity: Number,
//         image: String,
//       },
//     ],
//     total: { type: Number, required: true },
//     status: {
//       type: String,
//       enum: ["Pending", "Preparing", "Ready", "Delivered"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);






const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalPrice: { type: Number, required: true }, // ✅ changed from total → totalPrice
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
