// // backend/models/User.js
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: [true, "Please add a name"] },
//     email: {
//       type: String,
//       required: [true, "Please add an email"],
//       unique: true,
//       lowercase: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Please add a valid email",
//       ],
//     },
//     password: {
//       type: String,
//       required: [true, "Please add a password"],
//       minlength: [6, "Password must be at least 6 characters"],
//     },
//     role: {
//       type: String,
//       enum: ["user", "restaurant", "admin"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// // ✅ Encrypt password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   // Hash if not hashed already
//   if (!this.password.startsWith("$2a$")) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }

//   next();
// });

// // ✅ Compare entered password with hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // ✅ Force correct collection name
// const User = mongoose.model("User", userSchema, "users");
// module.exports = User;







const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "restaurant", "admin"],
      default: "user",
    },

    // 🆕 Profile-related fields
    mobile: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    profileImage: {
      type: String,
      default: "/uploads/default-avatar.png", // fallback image
    },
  },
  { timestamps: true }
);

// ✅ Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (!this.password.startsWith("$2a$")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

// ✅ Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Force correct collection name
const User = mongoose.model("User", userSchema, "users");
module.exports = User;
