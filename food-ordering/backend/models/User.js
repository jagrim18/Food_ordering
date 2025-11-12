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

//     mobile: { type: String, default: "" },
//     dateOfBirth: { type: String, default: "" },
//     profileImage: {
//       type: String,
//       default: "/uploads/default-avatar.png",
//     },
//   },
//   { timestamps: true }
// );

// /* ============================================================
//    ✅ Encrypt password before saving (safe against double-hash)
//    ============================================================ */
// userSchema.pre("save", async function (next) {
//   // Only hash when password field is modified
//   if (!this.isModified("password")) return next();

//   // If the value already looks like a bcrypt hash ($2a$, $2b$, $2y$), skip hashing
//   if (/^\$2[aby]\$/.test(this.password)) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// /* ============================================================
//    ✅ Compare entered password with hashed password
//    ============================================================ */
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema, "users");
// module.exports = User;







// backend/models/User.js
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

    mobile: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    profileImage: {
      type: String,
      default: "/uploads/default-avatar.png",
    },

    /* ============================================================
       🧩 OTP Verification fields
       ============================================================ */
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/* ============================================================
   ✅ Encrypt password before saving (safe against double-hash)
   ============================================================ */
userSchema.pre("save", async function (next) {
  // Only hash when password field is modified
  if (!this.isModified("password")) return next();

  // If the value already looks like a bcrypt hash ($2a$, $2b$, $2y$), skip hashing
  if (/^\$2[aby]\$/.test(this.password)) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* ============================================================
   ✅ Compare entered password with hashed password
   ============================================================ */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
