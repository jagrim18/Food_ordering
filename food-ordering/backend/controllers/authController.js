// // // backend/controllers/authController.js
// // const bcrypt = require("bcryptjs");
// // const User = require("../models/User");
// // const Restaurant = require("../models/Restaurant");
// // const Admin = require("../models/Admin"); // ✅ NEW
// // const generateToken = require("../utils/generateToken");
// // const sendEmail = require("../utils/sendEmail");

// // // OTP configuration
// // const OTP_TTL_MS = 10 * 60 * 1000; 
// // const RESEND_DELAY_MS = 2 * 60 * 1000; 
// // const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// // // In-memory OTP store
// // const pendingUsers = {};

// // /* ============================================================
// //    🧍 USER REGISTRATION
// // ============================================================ */
// // const registerUser = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;
// //     if (!name || !email || !password)
// //       return res.status(400).json({ message: "Please provide all fields" });

// //     const normalizedEmail = email.toLowerCase();
// //     const existingUser = await User.findOne({ email: normalizedEmail });
// //     const existingRest = await Restaurant.findOne({ email: normalizedEmail });
// //     const existingAdmin = await Admin.findOne({ email: normalizedEmail });

// //     if (existingUser || existingRest || existingAdmin)
// //       return res.status(400).json({ message: "Email already registered" });

// //     const otp = generateOTP();
// //     pendingUsers[normalizedEmail] = {
// //       name,
// //       password,
// //       role: "user",
// //       otp,
// //       otpExpires: Date.now() + OTP_TTL_MS,
// //       lastSent: Date.now(),
// //     };

// //     await sendEmail(normalizedEmail, "Verify your Foodify Account", otp, name);
// //     console.log(`📩 OTP sent to ${normalizedEmail}: ${otp}`);

// //     return res.status(200).json({
// //       message: "OTP sent successfully to your email.",
// //       email: normalizedEmail,
// //     });
// //   } catch (err) {
// //     console.error("Register error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// // /* ============================================================
// //    🍴 RESTAURANT REGISTRATION
// // ============================================================ */
// // const registerRestaurant = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;
// //     if (!name || !email || !password)
// //       return res.status(400).json({ message: "Please provide all fields" });

// //     const normalizedEmail = email.toLowerCase();
// //     const existingUser = await User.findOne({ email: normalizedEmail });
// //     const existingRest = await Restaurant.findOne({ email: normalizedEmail });
// //     const existingAdmin = await Admin.findOne({ email: normalizedEmail });

// //     if (existingUser || existingRest || existingAdmin)
// //       return res.status(400).json({ message: "Email already registered" });

// //     const otp = generateOTP();
// //     pendingUsers[normalizedEmail] = {
// //       name,
// //       password,
// //       role: "restaurant",
// //       otp,
// //       otpExpires: Date.now() + OTP_TTL_MS,
// //       lastSent: Date.now(),
// //     };

// //     await sendEmail(
// //       normalizedEmail,
// //       "Verify your Restaurant Account",
// //       otp,
// //       name
// //     );

// //     console.log(`📩 OTP sent to restaurant ${normalizedEmail}: ${otp}`);

// //     return res.status(200).json({
// //       message: "OTP sent successfully to your email.",
// //       email: normalizedEmail,
// //     });
// //   } catch (err) {
// //     console.error("Restaurant register error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// // /* ============================================================
// //    🔁 RESEND OTP
// // ============================================================ */
// // const resendOTP = async (req, res) => {
// //   try {
// //     const { email } = req.body;
// //     if (!email)
// //       return res.status(400).json({ message: "Email is required" });

// //     const normalizedEmail = email.toLowerCase();
// //     const pending = pendingUsers[normalizedEmail];

// //     if (!pending)
// //       return res.status(404).json({ message: "No pending verification found" });

// //     const now = Date.now();
// //     if (now - pending.lastSent < RESEND_DELAY_MS) {
// //       const wait = Math.ceil((RESEND_DELAY_MS - (now - pending.lastSent)) / 1000);
// //       return res.status(429).json({
// //         message: `Please wait ${wait}s before resending OTP.`,
// //       });
// //     }

// //     const otp = generateOTP();
// //     pending.otp = otp;
// //     pending.otpExpires = now + OTP_TTL_MS;
// //     pending.lastSent = now;

// //     await sendEmail(
// //       normalizedEmail,
// //       "Your new Foodify OTP",
// //       otp,
// //       pending.name
// //     );

// //     console.log(`📩 Resent OTP to ${normalizedEmail}: ${otp}`);
// //     return res.status(200).json({ message: "New OTP sent successfully." });
// //   } catch (err) {
// //     console.error("Resend OTP error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// // /* ============================================================
// //    ✅ VERIFY OTP (User & Restaurant)
// // ============================================================ */
// // const verifyOTP = async (req, res) => {
// //   try {
// //     const { email, otp } = req.body;
// //     if (!email || !otp)
// //       return res.status(400).json({ message: "Email and OTP required" });

// //     const normalizedEmail = email.toLowerCase();
// //     const pending = pendingUsers[normalizedEmail];

// //     if (!pending)
// //       return res.status(400).json({ message: "No pending verification found" });

// //     if (pending.otp !== otp)
// //       return res.status(400).json({ message: "Invalid OTP" });

// //     if (pending.otpExpires < Date.now())
// //       return res.status(400).json({ message: "OTP expired. Please resend." });

// //     const hashedPassword = await bcrypt.hash(pending.password, 10);
// //     let account = null;

// //     const existingUser = await User.findOne({ email: normalizedEmail });
// //     const existingRest = await Restaurant.findOne({ email: normalizedEmail });
// //     const existingAdmin = await Admin.findOne({ email: normalizedEmail });

// //     if (existingAdmin)
// //       return res.status(400).json({ message: "Email already registered as admin" });

// //     if (pending.role === "restaurant") {
// //       if (existingRest) {
// //         if (existingRest.isVerified)
// //           return res.status(400).json({ message: "Account already verified" });

// //         existingRest.name = pending.name;
// //         existingRest.password = hashedPassword;
// //         existingRest.isVerified = true;
// //         account = await existingRest.save();
// //       } else if (existingUser) {
// //         return res.status(409).json({ message: "Email already registered as user" });
// //       } else {
// //         account = await Restaurant.create({
// //           name: pending.name,
// //           email: normalizedEmail,
// //           password: hashedPassword,
// //           role: "restaurant",
// //           isVerified: true,
// //         });
// //       }
// //     } else {
// //       if (existingUser) {
// //         if (existingUser.isVerified)
// //           return res.status(400).json({ message: "Account already verified" });

// //         existingUser.name = pending.name;
// //         existingUser.password = hashedPassword;
// //         existingUser.isVerified = true;
// //         account = await existingUser.save();
// //       } else if (existingRest) {
// //         return res.status(409).json({ message: "Email already registered as restaurant" });
// //       } else {
// //         account = await User.create({
// //           name: pending.name,
// //           email: normalizedEmail,
// //           password: hashedPassword,
// //           role: "user",
// //           isVerified: true,
// //         });
// //       }
// //     }

// //     delete pendingUsers[normalizedEmail];

// //     return res.status(200).json({
// //       message: "Account verified successfully ✅",
// //       token: generateToken(account._id, account.role),
// //       user: {
// //         _id: account._id,
// //         name: account.name,
// //         email: account.email,
// //         role: account.role,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Verify OTP error:", err);
// //     return res.status(500).json({ message: "Server error during verification" });
// //   }
// // };

// // /* ============================================================
// //    🔐 UPDATED LOGIN — Admin → Restaurant → User
// // ============================================================ */
// // /* ============================================================
// //    🔐 CLEANED LOGIN — Admin → Restaurant → User
// // ============================================================= */
// // const loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const normalizedEmail = email.toLowerCase();

// //     let account = null;
// //     let role = null;

// //     // 1. ADMIN LOGIN
// //     account = await Admin.findOne({ email: normalizedEmail });
// //     if (account) role = "admin";

// //     // 2. RESTAURANT LOGIN
// //     if (!account) {
// //       account = await Restaurant.findOne({ email: normalizedEmail });
// //       if (account) role = "restaurant";
// //     }

// //     // 3. USER LOGIN
// //     if (!account) {
// //       account = await User.findOne({ email: normalizedEmail });
// //       if (account) role = "user";
// //     }

// //     // Not found across all 3
// //     if (!account) {
// //       return res.status(401).json({ message: "Invalid email or password" });
// //     }

// //     // Check password
// //     const isMatch = await account.matchPassword(password);
// //     if (!isMatch) {
// //       return res.status(401).json({ message: "Invalid email or password" });
// //     }

// //     // ADMIN: no OTP
// //     if (role === "admin") {
// //       return res.status(200).json({
// //         _id: account._id,
// //         name: account.name,
// //         email: account.email,
// //         role: "admin",
// //         token: generateToken(account._id, "admin"),
// //       });
// //     }

// //     // USER / RESTAURANT: require verification
// //     if (!account.isVerified) {
// //       const otp = generateOTP();

// //       pendingUsers[normalizedEmail] = {
// //         name: account.name,
// //         password,
// //         role,
// //         otp,
// //         otpExpires: Date.now() + OTP_TTL_MS,
// //         lastSent: Date.now(),
// //       };

// //       await sendEmail(normalizedEmail, "Verify your Foodify Account", otp, account.name);

// //       return res.status(200).json({
// //         message: "OTP sent successfully to your email.",
// //         email: normalizedEmail,
// //       });
// //     }

// //     // Verified user or restaurant
// //     return res.status(200).json({
// //       _id: account._id,
// //       name: account.name,
// //       email: account.email,
// //       role,
// //       token: generateToken(account._id, role),
// //     });

// //   } catch (err) {
// //     console.error("Login error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// // /* ============================================================
// //    🔐 CHANGE PASSWORD
// // ============================================================ */
// // const changePassword = async (req, res) => {
// //   try {
// //     const { currentPassword, newPassword } = req.body;

// //     if (!currentPassword || !newPassword)
// //       return res.status(400).json({ message: "All fields are required" });

// //     const user = req.user;
// //     const isMatch = await user.matchPassword(currentPassword);

// //     if (!isMatch)
// //       return res.status(400).json({ message: "Current password is incorrect" });

// //     user.password = newPassword;
// //     await user.save();

// //     return res.status(200).json({
// //       message: "Password changed successfully",
// //     });
// //   } catch (err) {
// //     console.error("Change password error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// // module.exports = {
// //   registerUser,
// //   registerRestaurant,
// //   verifyOTP,
// //   resendOTP,
// //   loginUser,
// //   changePassword,
// // };









// // backend/controllers/authController.js
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const Restaurant = require("../models/Restaurant");
// const Admin = require("../models/Admin"); // ✅ NEW
// const generateToken = require("../utils/generateToken");
// const sendEmail = require("../utils/sendEmail");

// // OTP configuration
// const OTP_TTL_MS = 10 * 60 * 1000;
// const RESEND_DELAY_MS = 2 * 60 * 1000;
// const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// // In-memory OTP store
// const pendingUsers = {};

// /* ============================================================
//    🧍 USER REGISTRATION
// ============================================================ */
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ message: "Please provide all fields" });

//     const normalizedEmail = email.toLowerCase();

//     // 🚫 Allow only Bennett University campus emails
//     if (!normalizedEmail.endsWith("@bennett.edu.in")) {
//       return res.status(400).json({
//         message: "Only Bennett University campus emails (@bennett.edu.in) are allowed",
//       });
//     }

//     const existingUser = await User.findOne({ email: normalizedEmail });
//     const existingRest = await Restaurant.findOne({ email: normalizedEmail });
//     const existingAdmin = await Admin.findOne({ email: normalizedEmail });

//     if (existingUser || existingRest || existingAdmin)
//       return res.status(400).json({ message: "Email already registered" });

//     const otp = generateOTP();
//     pendingUsers[normalizedEmail] = {
//       name,
//       password,
//       role: "user",
//       otp,
//       otpExpires: Date.now() + OTP_TTL_MS,
//       lastSent: Date.now(),
//     };

//     await sendEmail(normalizedEmail, "Verify your Foodify Account", otp, name);
//     console.log(`📩 OTP sent to ${normalizedEmail}: ${otp}`);

//     return res.status(200).json({
//       message: "OTP sent successfully to your email.",
//       email: normalizedEmail,
//     });
//   } catch (err) {
//     console.error("Register error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /* ============================================================
//    🍴 RESTAURANT REGISTRATION
// ============================================================ */
// const registerRestaurant = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ message: "Please provide all fields" });

//     const normalizedEmail = email.toLowerCase();

//     // 🚫 Allow only Bennett University campus emails
//     if (!normalizedEmail.endsWith("@bennett.edu.in")) {
//       return res.status(400).json({
//         message: "Only Bennett University campus emails (@bennett.edu.in) are allowed",
//       });
//     }

//     const existingUser = await User.findOne({ email: normalizedEmail });
//     const existingRest = await Restaurant.findOne({ email: normalizedEmail });
//     const existingAdmin = await Admin.findOne({ email: normalizedEmail });

//     if (existingUser || existingRest || existingAdmin)
//       return res.status(400).json({ message: "Email already registered" });

//     const otp = generateOTP();
//     pendingUsers[normalizedEmail] = {
//       name,
//       password,
//       role: "restaurant",
//       otp,
//       otpExpires: Date.now() + OTP_TTL_MS,
//       lastSent: Date.now(),
//     };

//     await sendEmail(
//       normalizedEmail,
//       "Verify your Restaurant Account",
//       otp,
//       name
//     );

//     console.log(`📩 OTP sent to restaurant ${normalizedEmail}: ${otp}`);

//     return res.status(200).json({
//       message: "OTP sent successfully to your email.",
//       email: normalizedEmail,
//     });
//   } catch (err) {
//     console.error("Restaurant register error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /* ============================================================
//    🔁 RESEND OTP
// ============================================================ */
// const resendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email)
//       return res.status(400).json({ message: "Email is required" });

//     const normalizedEmail = email.toLowerCase();
//     const pending = pendingUsers[normalizedEmail];

//     if (!pending)
//       return res.status(404).json({ message: "No pending verification found" });

//     const now = Date.now();
//     if (now - pending.lastSent < RESEND_DELAY_MS) {
//       const wait = Math.ceil(
//         (RESEND_DELAY_MS - (now - pending.lastSent)) / 1000
//       );
//       return res.status(429).json({
//         message: `Please wait ${wait}s before resending OTP.`,
//       });
//     }

//     const otp = generateOTP();
//     pending.otp = otp;
//     pending.otpExpires = now + OTP_TTL_MS;
//     pending.lastSent = now;

//     await sendEmail(
//       normalizedEmail,
//       "Your new Foodify OTP",
//       otp,
//       pending.name
//     );

//     console.log(`📩 Resent OTP to ${normalizedEmail}: ${otp}`);
//     return res.status(200).json({ message: "New OTP sent successfully." });
//   } catch (err) {
//     console.error("Resend OTP error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /* ============================================================
//    ✅ VERIFY OTP (User & Restaurant)
// ============================================================ */
// const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp)
//       return res.status(400).json({ message: "Email and OTP required" });

//     const normalizedEmail = email.toLowerCase();
//     const pending = pendingUsers[normalizedEmail];

//     if (!pending)
//       return res.status(400).json({ message: "No pending verification found" });

//     if (pending.otp !== otp)
//       return res.status(400).json({ message: "Invalid OTP" });

//     if (pending.otpExpires < Date.now())
//       return res.status(400).json({ message: "OTP expired. Please resend." });

//     const hashedPassword = await bcrypt.hash(pending.password, 10);
//     let account = null;

//     const existingUser = await User.findOne({ email: normalizedEmail });
//     const existingRest = await Restaurant.findOne({ email: normalizedEmail });
//     const existingAdmin = await Admin.findOne({ email: normalizedEmail });

//     if (existingAdmin)
//       return res
//         .status(400)
//         .json({ message: "Email already registered as admin" });

//     if (pending.role === "restaurant") {
//       if (existingRest) {
//         if (existingRest.isVerified)
//           return res
//             .status(400)
//             .json({ message: "Account already verified" });

//         existingRest.name = pending.name;
//         existingRest.password = hashedPassword;
//         existingRest.isVerified = true;
//         account = await existingRest.save();
//       } else if (existingUser) {
//         return res
//           .status(409)
//           .json({ message: "Email already registered as user" });
//       } else {
//         account = await Restaurant.create({
//           name: pending.name,
//           email: normalizedEmail,
//           password: hashedPassword,
//           role: "restaurant",
//           isVerified: true,
//         });
//       }
//     } else {
//       if (existingUser) {
//         if (existingUser.isVerified)
//           return res
//             .status(400)
//             .json({ message: "Account already verified" });

//         existingUser.name = pending.name;
//         existingUser.password = hashedPassword;
//         existingUser.isVerified = true;
//         account = await existingUser.save();
//       } else if (existingRest) {
//         return res
//           .status(409)
//           .json({ message: "Email already registered as restaurant" });
//       } else {
//         account = await User.create({
//           name: pending.name,
//           email: normalizedEmail,
//           password: hashedPassword,
//           role: "user",
//           isVerified: true,
//         });
//       }
//     }

//     delete pendingUsers[normalizedEmail];

//     return res.status(200).json({
//       message: "Account verified successfully ✅",
//       token: generateToken(account._id, account.role),
//       user: {
//         _id: account._id,
//         name: account.name,
//         email: account.email,
//         role: account.role,
//       },
//     });
//   } catch (err) {
//     console.error("Verify OTP error:", err);
//     return res
//       .status(500)
//       .json({ message: "Server error during verification" });
//   }
// };

// /* ============================================================
//    🔐 CLEANED LOGIN — Admin → Restaurant → User
// ============================================================ */
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const normalizedEmail = email.toLowerCase();

//     // 🚫 Block login for non-campus email (EXCEPT admins)
//     if (!normalizedEmail.endsWith("@bennett.edu.in")) {
//       const isAdmin = await Admin.findOne({ email: normalizedEmail });

//       if (!isAdmin) {
//         return res.status(401).json({
//           message:
//             "Only Bennett University campus emails (@bennett.edu.in) can login",
//         });
//       }
//     }

//     let account = null;
//     let role = null;

//     // 1. ADMIN LOGIN
//     account = await Admin.findOne({ email: normalizedEmail });
//     if (account) role = "admin";

//     // 2. RESTAURANT LOGIN
//     if (!account) {
//       account = await Restaurant.findOne({ email: normalizedEmail });
//       if (account) role = "restaurant";
//     }

//     // 3. USER LOGIN
//     if (!account) {
//       account = await User.findOne({ email: normalizedEmail });
//       if (account) role = "user";
//     }

//     if (!account) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await account.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     if (role === "admin") {
//       return res.status(200).json({
//         _id: account._id,
//         name: account.name,
//         email: account.email,
//         role: "admin",
//         token: generateToken(account._id, "admin"),
//       });
//     }

//     if (!account.isVerified) {
//       const otp = generateOTP();

//       pendingUsers[normalizedEmail] = {
//         name: account.name,
//         password,
//         role,
//         otp,
//         otpExpires: Date.now() + OTP_TTL_MS,
//         lastSent: Date.now(),
//       };

//       await sendEmail(
//         normalizedEmail,
//         "Verify your Foodify Account",
//         otp,
//         account.name
//       );

//       return res.status(200).json({
//         message: "OTP sent successfully to your email.",
//         email: normalizedEmail,
//       });
//     }

//     return res.status(200).json({
//       _id: account._id,
//       name: account.name,
//       email: account.email,
//       role,
//       token: generateToken(account._id, role),
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /* ============================================================
//    🔐 CHANGE PASSWORD
// ============================================================ */
// const changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword)
//       return res.status(400).json({ message: "All fields are required" });

//     const user = req.user;
//     const isMatch = await user.matchPassword(currentPassword);

//     if (!isMatch)
//       return res
//         .status(400)
//         .json({ message: "Current password is incorrect" });

//     user.password = newPassword;
//     await user.save();

//     return res.status(200).json({
//       message: "Password changed successfully",
//     });
//   } catch (err) {
//     console.error("Change password error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   registerUser,
//   registerRestaurant,
//   verifyOTP,
//   resendOTP,
//   loginUser,
//   changePassword,
// };










// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Admin = require("../models/Admin"); 
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// OTP configuration
const OTP_TTL_MS = 10 * 60 * 1000;
const RESEND_DELAY_MS = 2 * 60 * 1000;
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// In-memory OTP storage
const pendingUsers = {};

/* ============================================================
   🧍 USER REGISTRATION — ONLY @bennett.edu.in
============================================================ */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const normalizedEmail = email.toLowerCase();

    // Only users must be @bennett.edu.in
    if (!normalizedEmail.endsWith("@bennett.edu.in")) {
      return res.status(400).json({
        message: "Users must use their Bennett University email (@bennett.edu.in)",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    const existingRest = await Restaurant.findOne({ email: normalizedEmail });
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });

    if (existingUser || existingRest || existingAdmin)
      return res.status(400).json({ message: "Email already registered" });

    const otp = generateOTP();

    pendingUsers[normalizedEmail] = {
      name,
      password,
      role: "user",
      otp,
      otpExpires: Date.now() + OTP_TTL_MS,
      lastSent: Date.now(),
    };

    await sendEmail(normalizedEmail, "Verify your Foodify Account", otp, name);

    return res.status(200).json({
      message: "OTP sent successfully to your email.",
      email: normalizedEmail,
    });

  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   🍴 RESTAURANT REGISTRATION — ANY EMAIL ALLOWED
============================================================ */
const registerRestaurant = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const normalizedEmail = email.toLowerCase();

    // ❌ REMOVED campus restriction for restaurants
    // Restaurants can use ANY email

    const existingUser = await User.findOne({ email: normalizedEmail });
    const existingRest = await Restaurant.findOne({ email: normalizedEmail });
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });

    if (existingUser || existingRest || existingAdmin)
      return res.status(400).json({ message: "Email already registered" });

    const otp = generateOTP();

    pendingUsers[normalizedEmail] = {
      name,
      password,
      role: "restaurant",
      otp,
      otpExpires: Date.now() + OTP_TTL_MS,
      lastSent: Date.now(),
    };

    await sendEmail(
      normalizedEmail,
      "Verify your Restaurant Account",
      otp,
      name
    );

    return res.status(200).json({
      message: "OTP sent successfully to your email.",
      email: normalizedEmail,
    });

  } catch (err) {
    console.error("Restaurant register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   🔁 RESEND OTP
============================================================ */
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const normalizedEmail = email.toLowerCase();
    const pending = pendingUsers[normalizedEmail];

    if (!pending)
      return res.status(404).json({ message: "No pending verification found" });

    const now = Date.now();
    if (now - pending.lastSent < RESEND_DELAY_MS) {
      const wait = Math.ceil((RESEND_DELAY_MS - (now - pending.lastSent)) / 1000);
      return res.status(429).json({
        message: `Please wait ${wait}s before resending OTP.`,
      });
    }

    const otp = generateOTP();
    pending.otp = otp;
    pending.otpExpires = now + OTP_TTL_MS;
    pending.lastSent = now;

    await sendEmail(
      normalizedEmail,
      "Your new Foodify OTP",
      otp,
      pending.name
    );

    return res.status(200).json({ message: "New OTP sent successfully." });

  } catch (err) {
    console.error("Resend OTP error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   🔐 VERIFY OTP
============================================================ */
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const normalizedEmail = email.toLowerCase();
    const pending = pendingUsers[normalizedEmail];

    if (!pending)
      return res.status(400).json({ message: "No pending verification found" });

    const isDevBypass = process.env.NODE_ENV === "development" && (otp === "1234" || otp === "123456");
    if (pending.otp !== otp && !isDevBypass)
      return res.status(400).json({ message: "Invalid OTP" });

    if (pending.otpExpires < Date.now() && !isDevBypass)
      return res.status(400).json({ message: "OTP expired. Please resend." });

    const hashedPassword = await bcrypt.hash(pending.password, 10);
    let account = null;

    const existingUser = await User.findOne({ email: normalizedEmail });
    const existingRest = await Restaurant.findOne({ email: normalizedEmail });
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });

    if (existingAdmin)
      return res.status(400).json({ message: "Email already registered as admin" });

    if (pending.role === "restaurant") {
      if (existingRest) {
        if (existingRest.isVerified)
          return res.status(400).json({ message: "Account already verified" });

        existingRest.name = pending.name;
        existingRest.password = hashedPassword;
        existingRest.isVerified = true;
        account = await existingRest.save();
      } else if (existingUser) {
        return res.status(409).json({ message: "Email already registered as user" });
      } else {
        account = await Restaurant.create({
          name: pending.name,
          email: normalizedEmail,
          password: hashedPassword,
          role: "restaurant",
          isVerified: true,
        });
      }
    } else {
      if (existingUser) {
        if (existingUser.isVerified)
          return res.status(400).json({ message: "Account already verified" });

        existingUser.name = pending.name;
        existingUser.password = hashedPassword;
        existingUser.isVerified = true;
        account = await existingUser.save();
      } else if (existingRest) {
        return res.status(409).json({ message: "Email already registered as restaurant" });
      } else {
        account = await User.create({
          name: pending.name,
          email: normalizedEmail,
          password: hashedPassword,
          role: "user",
          isVerified: true,
        });
      }
    }

    delete pendingUsers[normalizedEmail];

    return res.status(200).json({
      message: "Account verified successfully ✅",
      token: generateToken(account._id, account.role),
      user: {
        _id: account._id,
        name: account.name,
        email: account.email,
        role: account.role,
      },
    });

  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({ message: "Server error during verification" });
  }
};

/* ============================================================
   🔐 LOGIN — Only users require Bennett email
============================================================ */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    let account = null;
    let role = null;

    // 1️⃣ ADMIN LOGIN (allowed for any email)
    account = await Admin.findOne({ email: normalizedEmail });
    if (account) role = "admin";

    // 2️⃣ RESTAURANT LOGIN (ANY email allowed)
    if (!account) {
      account = await Restaurant.findOne({ email: normalizedEmail });
      if (account) role = "restaurant";
    }

    // 3️⃣ USER LOGIN (RESTRICTED TO @bennett.edu.in)
    if (!account) {
      account = await User.findOne({ email: normalizedEmail });
      if (account) role = "user";

      if (role === "user" && !normalizedEmail.endsWith("@bennett.edu.in")) {
        return res.status(401).json({
          message: "Users must login using @bennett.edu.in email",
        });
      }
    }

    if (!account) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await account.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (role === "admin") {
      return res.status(200).json({
        _id: account._id,
        name: account.name,
        email: account.email,
        role,
        token: generateToken(account._id, role),
      });
    }

    // OTP verification for unverified users/restaurants
    if (!account.isVerified) {
      const otp = generateOTP();

      pendingUsers[normalizedEmail] = {
        name: account.name,
        password,
        role,
        otp,
        otpExpires: Date.now() + OTP_TTL_MS,
        lastSent: Date.now(),
      };

      await sendEmail(normalizedEmail, "Verify your Foodify Account", otp, account.name);

      return res.status(200).json({
        message: "OTP sent successfully to your email.",
        email: normalizedEmail,
      });
    }

    return res.status(200).json({
      _id: account._id,
      name: account.name,
      email: account.email,
      role,
      token: generateToken(account._id, role),
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   🔐 CHANGE PASSWORD
============================================================ */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "All fields are required" });

    const user = req.user;
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });

  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// In-memory Password Reset OTP store
const passwordResetOTPs = {};

/* ============================================================
   🔑 FORGOT PASSWORD (Generate & Send OTP)
============================================================ */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase();
    
    // Find account across Admin, Restaurant, and User
    let account = null;
    let role = null;

    account = await Admin.findOne({ email: normalizedEmail });
    if (account) {
      role = "admin";
    } else {
      account = await Restaurant.findOne({ email: normalizedEmail });
      if (account) {
        role = "restaurant";
      } else {
        account = await User.findOne({ email: normalizedEmail });
        if (account) {
          role = "user";
        }
      }
    }

    if (!account) {
      return res.status(404).json({ message: "Email is not registered" });
    }

    // Generate OTP
    const otp = generateOTP();
    passwordResetOTPs[normalizedEmail] = {
      otp,
      otpExpires: Date.now() + OTP_TTL_MS,
      role,
      lastSent: Date.now(),
    };

    // Send OTP to email
    await sendEmail(normalizedEmail, "Password Reset OTP - Foodify", otp, account.name);

    console.log(`🔑 Reset Password OTP sent to ${normalizedEmail} (${role}): ${otp}`);

    return res.status(200).json({
      message: "Password reset OTP sent to your email",
      email: normalizedEmail,
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   🔑 RESET PASSWORD (Verify OTP & Update Password)
============================================================ */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase();
    const record = passwordResetOTPs[normalizedEmail];

    if (!record) {
      return res.status(400).json({ message: "No password reset request found for this email" });
    }

    const isDevBypass = process.env.NODE_ENV === "development" && (otp === "1234" || otp === "123456");
    if (record.otp !== otp && !isDevBypass) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.otpExpires < Date.now() && !isDevBypass) {
      return res.status(400).json({ message: "OTP expired. Please request a new one" });
    }

    let account = null;
    if (record.role === "admin") {
      account = await Admin.findOne({ email: normalizedEmail });
    } else if (record.role === "restaurant") {
      account = await Restaurant.findOne({ email: normalizedEmail });
    } else {
      account = await User.findOne({ email: normalizedEmail });
    }

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Set password (pre-save hook hashes it)
    account.password = newPassword;
    await account.save();

    // Clear reset OTP record
    delete passwordResetOTPs[normalizedEmail];

    console.log(`🔑 Password reset successfully for ${normalizedEmail} (${record.role})`);

    return res.status(200).json({
      message: "Password reset successfully. You can now log in with your new password.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  registerRestaurant,
  verifyOTP,
  resendOTP,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
