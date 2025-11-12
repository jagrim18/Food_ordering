// // const bcrypt = require("bcryptjs");
// // const User = require("../models/User");
// // const Restaurant = require("../models/Restaurant");
// // const generateToken = require("../utils/generateToken");
// // const sendEmail = require("../utils/sendEmail"); // ✅ Using Resend API

// // // OTP configuration
// // const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
// // const RESEND_DELAY_MS = 2 * 60 * 1000; // 2 minutes
// // const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

// // // In-memory OTP store
// // const pendingUsers = {}; // { email: { name, password, role, otp, otpExpires, lastSent } }

// // /* ============================================================
// //    🧍 USER REGISTRATION (send OTP via Resend)
// // ============================================================ */
// // const registerUser = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;
// //     if (!name || !email || !password)
// //       return res.status(400).json({ message: "Please provide all fields" });

// //     const normalizedEmail = email.toLowerCase();
// //     const existingUser = await User.findOne({ email: normalizedEmail });
// //     const existingRest = await Restaurant.findOne({ email: normalizedEmail });

// //     if (existingUser || existingRest)
// //       return res.status(400).json({ message: "Email already registered" });

// //     // Throttle resend requests
// //     if (pendingUsers[normalizedEmail]) {
// //       const wait =
// //         RESEND_DELAY_MS -
// //         (Date.now() - (pendingUsers[normalizedEmail].lastSent || 0));
// //       if (wait > 0)
// //         return res.status(429).json({
// //           message: `Please wait ${Math.ceil(wait / 1000)}s before requesting another OTP.`,
// //         });
// //     }

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
// //     console.error("Register error:", err.message);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// // /* ============================================================
// //    🍴 RESTAURANT REGISTRATION (same logic)
// // ============================================================ */
// // const registerRestaurant = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;
// //     if (!name || !email || !password)
// //       return res.status(400).json({ message: "Please provide all fields" });

// //     const normalizedEmail = email.toLowerCase();
// //     const existingUser = await User.findOne({ email: normalizedEmail });
// //     const existingRest = await Restaurant.findOne({ email: normalizedEmail });

// //     if (existingUser || existingRest)
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
// //     console.error("Restaurant register error:", err.message);
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
// //       const wait = Math.ceil(
// //         (RESEND_DELAY_MS - (now - pending.lastSent)) / 1000
// //       );
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
// //     console.error("Resend OTP error:", err.message);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// // /* ============================================================
// //    ✅ VERIFY OTP (Create account after verification)
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
// //     let account;

// //     if (pending.role === "restaurant") {
// //       account = await Restaurant.create({
// //         name: pending.name,
// //         email: normalizedEmail,
// //         password: hashedPassword,
// //         role: "restaurant",
// //         isVerified: true,
// //       });
// //     } else {
// //       account = await User.create({
// //         name: pending.name,
// //         email: normalizedEmail,
// //         password: hashedPassword,
// //         role: "user",
// //         isVerified: true,
// //       });
// //     }

// //     delete pendingUsers[normalizedEmail]; // remove from pending cache

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
// //     console.error("Verify OTP error:", err.message);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// // /* ============================================================
// //    🔐 LOGIN (supports OTP for unverified users)
// // ============================================================ */
// // const loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const normalizedEmail = email.toLowerCase();

// //     let account = await User.findOne({ email: normalizedEmail });
// //     let role = "user";

// //     if (!account) {
// //       account = await Restaurant.findOne({ email: normalizedEmail });
// //       role = "restaurant";
// //     }

// //     if (!account)
// //       return res.status(401).json({ message: "Invalid email or password" });

// //     const isMatch = await account.matchPassword(password);
// //     if (!isMatch)
// //       return res.status(401).json({ message: "Invalid email or password" });

// //     // 🔐 If account is NOT verified, send OTP
// //     if (!account.isVerified) {
// //       const otp = generateOTP();
// //       pendingUsers[normalizedEmail] = {
// //         name: account.name,
// //         password, // reuse entered password
// //         role,
// //         otp,
// //         otpExpires: Date.now() + OTP_TTL_MS,
// //         lastSent: Date.now(),
// //       };

// //       await sendEmail(
// //         normalizedEmail,
// //         "Verify your Foodify Account",
// //         otp,
// //         account.name
// //       );

// //       console.log(`📩 Login OTP sent to ${normalizedEmail}: ${otp}`);
// //       return res.status(200).json({
// //         message: "OTP sent successfully to your email for verification.",
// //         email: normalizedEmail,
// //       });
// //     }

// //     // ✅ If already verified
// //     return res.status(200).json({
// //       _id: account._id,
// //       name: account.name,
// //       email: account.email,
// //       role: account.role || role,
// //       token: generateToken(account._id, account.role || role),
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err.message);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// // module.exports = {
// //   registerUser,
// //   registerRestaurant,
// //   verifyOTP,
// //   resendOTP,
// //   loginUser,
// // };







// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const Restaurant = require("../models/Restaurant");
// const generateToken = require("../utils/generateToken");
// const sendEmail = require("../utils/sendEmail"); // ✅ Using Resend API

// // OTP configuration
// const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
// const RESEND_DELAY_MS = 2 * 60 * 1000; // 2 minutes
// const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

// // In-memory OTP store
// const pendingUsers = {}; // { email: { name, password, role, otp, otpExpires, lastSent } }

// /* ============================================================
//    🧍 USER REGISTRATION (send OTP via Resend)
// ============================================================ */
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ message: "Please provide all fields" });

//     const normalizedEmail = email.toLowerCase();
//     const existingUser = await User.findOne({ email: normalizedEmail });
//     const existingRest = await Restaurant.findOne({ email: normalizedEmail });

//     if (existingUser || existingRest)
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
//     console.error("Register error:", err.message);
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
//     const existingUser = await User.findOne({ email: normalizedEmail });
//     const existingRest = await Restaurant.findOne({ email: normalizedEmail });

//     if (existingUser || existingRest)
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
//     console.error("Restaurant register error:", err.message);
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
//     console.error("Resend OTP error:", err.message);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /* ============================================================
//    ✅ VERIFY OTP (Handles both user & restaurant)
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
//     let account;

//     if (pending.role === "restaurant") {
//       account = await Restaurant.create({
//         name: pending.name,
//         email: normalizedEmail,
//         password: hashedPassword,
//         role: "restaurant",
//         isVerified: true,
//       });
//     } else {
//       account = await User.create({
//         name: pending.name,
//         email: normalizedEmail,
//         password: hashedPassword,
//         role: "user",
//         isVerified: true,
//       });
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
//     return res.status(500).json({ message: "Server error during verification" });
//   }
// };

// /* ============================================================
//    🔐 LOGIN
// ============================================================ */
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const normalizedEmail = email.toLowerCase();

//     let account = await User.findOne({ email: normalizedEmail });
//     let role = "user";

//     if (!account) {
//       account = await Restaurant.findOne({ email: normalizedEmail });
//       role = "restaurant";
//     }

//     if (!account)
//       return res.status(401).json({ message: "Invalid email or password" });

//     const isMatch = await account.matchPassword(password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid email or password" });

//     if (!account.isVerified) {
//       const otp = generateOTP();
//       pendingUsers[normalizedEmail] = {
//         name: account.name,
//         password, // reuse entered password
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

//       console.log(`📩 Login OTP sent to ${normalizedEmail}: ${otp}`);
//       return res.status(200).json({
//         message: "OTP sent successfully to your email for verification.",
//         email: normalizedEmail,
//       });
//     }

//     // ✅ Verified account
//     return res.status(200).json({
//       _id: account._id,
//       name: account.name,
//       email: account.email,
//       role: account.role || role,
//       token: generateToken(account._id, account.role || role),
//     });
//   } catch (err) {
//     console.error("Login error:", err.message);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   registerUser,
//   registerRestaurant,
//   verifyOTP,
//   resendOTP,
//   loginUser,
// };





// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail"); // ✅ Using Resend API

// OTP configuration
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_DELAY_MS = 2 * 60 * 1000; // 2 minutes
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

// In-memory OTP store
const pendingUsers = {}; // { email: { name, password, role, otp, otpExpires, lastSent } }

/* ============================================================
   🧍 USER REGISTRATION (send OTP via Resend)
============================================================ */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    const existingRest = await Restaurant.findOne({ email: normalizedEmail });

    if (existingUser || existingRest)
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
    console.log(`📩 OTP sent to ${normalizedEmail}: ${otp}`);

    return res.status(200).json({
      message: "OTP sent successfully to your email.",
      email: normalizedEmail,
    });
  } catch (err) {
    console.error("Register error:", err.stack || err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   🍴 RESTAURANT REGISTRATION
============================================================ */
const registerRestaurant = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    const existingRest = await Restaurant.findOne({ email: normalizedEmail });

    if (existingUser || existingRest)
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

    console.log(`📩 OTP sent to restaurant ${normalizedEmail}: ${otp}`);

    return res.status(200).json({
      message: "OTP sent successfully to your email.",
      email: normalizedEmail,
    });
  } catch (err) {
    console.error("Restaurant register error:", err.stack || err);
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
      const wait = Math.ceil(
        (RESEND_DELAY_MS - (now - pending.lastSent)) / 1000
      );
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

    console.log(`📩 Resent OTP to ${normalizedEmail}: ${otp}`);
    return res.status(200).json({ message: "New OTP sent successfully." });
  } catch (err) {
    console.error("Resend OTP error:", err.stack || err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   ✅ VERIFY OTP (Handles both user & restaurant) - Robust version
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

    if (pending.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (pending.otpExpires < Date.now())
      return res.status(400).json({ message: "OTP expired. Please resend." });

    // Hash password from pending cache
    const hashedPassword = await bcrypt.hash(pending.password, 10);
    let account = null;

    // Check existing records (prevent duplicate key errors)
    const existingUser = await User.findOne({ email: normalizedEmail });
    const existingRest = await Restaurant.findOne({ email: normalizedEmail });

    if (pending.role === "restaurant") {
      // If a restaurant already exists with this email
      if (existingRest) {
        if (existingRest.isVerified) {
          // Already verified
          return res.status(400).json({ message: "Account already verified" });
        }
        // Update existing restaurant (set password + isVerified)
        existingRest.name = pending.name || existingRest.name;
        existingRest.password = hashedPassword;
        existingRest.isVerified = true;
        account = await existingRest.save();
      } else if (existingUser) {
        // Email exists as a user — conflict
        return res.status(409).json({ message: "Email already registered as user" });
      } else {
        // Create new restaurant account
        account = await Restaurant.create({
          name: pending.name,
          email: normalizedEmail,
          password: hashedPassword,
          role: "restaurant",
          isVerified: true,
        });
      }
    } else {
      // pending.role === "user"
      if (existingUser) {
        if (existingUser.isVerified) {
          return res.status(400).json({ message: "Account already verified" });
        }
        // Update existing user
        existingUser.name = pending.name || existingUser.name;
        existingUser.password = hashedPassword;
        existingUser.isVerified = true;
        account = await existingUser.save();
      } else if (existingRest) {
        // Email exists as a restaurant — conflict
        return res.status(409).json({ message: "Email already registered as restaurant" });
      } else {
        // Create new user account
        account = await User.create({
          name: pending.name,
          email: normalizedEmail,
          password: hashedPassword,
          role: "user",
          isVerified: true,
        });
      }
    }

    // Remove pending cache entry
    delete pendingUsers[normalizedEmail];

    // Safety check
    if (!account)
      return res.status(500).json({ message: "Account creation failed" });

    // Return consistent response
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
    // Provide helpful logs for debugging
    console.error("Verify OTP error:", err.stack || err);
    // Try to surface a meaningful message for common errors
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Server error during verification" });
  }
};

/* ============================================================
   🔐 LOGIN
============================================================ */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    let account = await User.findOne({ email: normalizedEmail });
    let role = "user";

    if (!account) {
      account = await Restaurant.findOne({ email: normalizedEmail });
      role = "restaurant";
    }

    if (!account)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await account.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    if (!account.isVerified) {
      const otp = generateOTP();
      pendingUsers[normalizedEmail] = {
        name: account.name,
        password, // reuse entered password
        role,
        otp,
        otpExpires: Date.now() + OTP_TTL_MS,
        lastSent: Date.now(),
      };

      await sendEmail(
        normalizedEmail,
        "Verify your Foodify Account",
        otp,
        account.name
      );

      console.log(`📩 Login OTP sent to ${normalizedEmail}: ${otp}`);
      return res.status(200).json({
        message: "OTP sent successfully to your email for verification.",
        email: normalizedEmail,
      });
    }

    // ✅ Verified account
    return res.status(200).json({
      _id: account._id,
      name: account.name,
      email: account.email,
      role: account.role || role,
      token: generateToken(account._id, account.role || role),
    });
  } catch (err) {
    console.error("Login error:", err.stack || err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  registerRestaurant,
  verifyOTP,
  resendOTP,
  loginUser,
};
