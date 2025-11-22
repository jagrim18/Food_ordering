// // backend/middlewares/authMiddleware.js
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const Restaurant = require("../models/Restaurant");

// /**
//  * ✅ Unified Authentication Middleware
//  * Supports: users, restaurants, admins
//  */
// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       // ✅ Verify the token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // ✅ Try finding in User collection first
//       let authUser = await User.findById(decoded.id).select("-password");
//       let userType = "user";

//       // ✅ If not found, try in Restaurant collection
//       if (!authUser) {
//         authUser = await Restaurant.findById(decoded.id).select("-password");
//         userType = "restaurant";
//       }

//       // ✅ If no match in either collection
//       if (!authUser) {
//         return res.status(401).json({ message: "User or Restaurant not found" });
//       }

//       // ✅ Assign a proper role fallback (important for restaurants)
//       authUser.role = authUser.role || userType;

//       // ✅ Attach data to request
//       req.user = authUser;
//       req.token = token;

//       next();
//     } catch (err) {
//       console.error("❌ Auth Error:", err.message);
//       return res.status(401).json({ message: "Not authorized, token invalid" });
//     }
//   } else {
//     return res.status(401).json({ message: "Not authorized, no token provided" });
//   }
// };

// /**
//  * ✅ Admin Only Middleware
//  */
// const adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     return next();
//   }
//   return res.status(403).json({ message: "Admin access only" });
// };

// /**
//  * ✅ Restaurant Only Middleware
//  */
// const restaurantOnly = (req, res, next) => {
//   if (req.user && req.user.role === "restaurant") {
//     return next();
//   }
//   return res.status(403).json({ message: "Restaurant access only" });
// };

// module.exports = { protect, adminOnly, restaurantOnly };


// backend/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

/**
 * ✅ Unified Authentication Middleware
 * Supports: users, restaurants, admins
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 🔐 Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ❗ IMPORTANT: Do NOT remove password — needed for change-password
      let authUser = await User.findById(decoded.id);
      let userType = "user";

      if (!authUser) {
        authUser = await Restaurant.findById(decoded.id);
        userType = "restaurant";
      }

      if (!authUser) {
        return res.status(401).json({ message: "User or Restaurant not found" });
      }

      // Assign fallback role (important for restaurants)
      authUser.role = authUser.role || userType;

      // Attach to request
      req.user = authUser;
      req.token = token;

      next();
    } catch (err) {
      console.error("❌ Auth Error:", err.message);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

/**
 * ✅ Admin Only Middleware
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin access only" });
};

/**
 * ✅ Restaurant Only Middleware
 */
const restaurantOnly = (req, res, next) => {
  if (req.user && req.user.role === "restaurant") return next();
  return res.status(403).json({ message: "Restaurant access only" });
};

module.exports = { protect, adminOnly, restaurantOnly };
