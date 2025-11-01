// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");
// // const Restaurant = require("../models/Restaurant");

// // // ✅ Verify token and attach user/restaurant to request
// // const protect = async (req, res, next) => {
// //   let token;

// //   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
// //     try {
// //       token = req.headers.authorization.split(" ")[1];
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //       // ✅ Try User first
// //       let authUser = await User.findById(decoded.id).select("-password");
// //       if (!authUser) {
// //         // ✅ Try Restaurant
// //         authUser = await Restaurant.findById(decoded.id).select("-password");
// //       }

// //       if (!authUser) {
// //         return res.status(401).json({ message: "User/Restaurant not found" });
// //       }

// //       // ✅ Assign role if missing
// //       if (!authUser.role) {
// //         authUser.role = authUser.name ? "restaurant" : "user"; 
// //       }

// //       req.user = authUser;
// //       return next();
// //     } catch (err) {
// //       console.error("❌ Auth error:", err);
// //       return res.status(401).json({ message: "Not authorized, token failed" });
// //     }
// //   }

// //   return res.status(401).json({ message: "Not authorized, no token" });
// // };

// // const adminOnly = (req, res, next) => {
// //   if (req.user && req.user.role === "admin") return next();
// //   return res.status(403).json({ message: "Admin access only" });
// // };

// // const restaurantOnly = (req, res, next) => {
// //   if (req.user && req.user.role === "restaurant") return next();
// //   return res.status(403).json({ message: "Restaurant access only" });
// // };

// // module.exports = { protect, adminOnly, restaurantOnly };








// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");
// // const Restaurant = require("../models/Restaurant");

// // // ✅ Unified authentication middleware
// // const protect = async (req, res, next) => {
// //   let token;

// //   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
// //     try {
// //       token = req.headers.authorization.split(" ")[1];
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //       // ✅ Try finding User first
// //       let authUser = await User.findById(decoded.id).select("-password");
// //       let userType = "user";

// //       // ✅ If not found, try Restaurant
// //       if (!authUser) {
// //         authUser = await Restaurant.findById(decoded.id).select("-password");
// //         userType = "restaurant";
// //       }

// //       if (!authUser) {
// //         return res.status(401).json({ message: "User or Restaurant not found" });
// //       }

// //       // ✅ Assign correct role
// //       authUser.role = authUser.role || userType;

// //       req.user = authUser;
// //       next();
// //     } catch (err) {
// //       console.error("❌ Auth error:", err);
// //       return res.status(401).json({ message: "Not authorized, token failed" });
// //     }
// //   } else {
// //     return res.status(401).json({ message: "Not authorized, no token" });
// //   }
// // };

// // // ✅ Restrict to admins only
// // const adminOnly = (req, res, next) => {
// //   if (req.user && req.user.role === "admin") return next();
// //   return res.status(403).json({ message: "Admin access only" });
// // };

// // // ✅ Restrict to restaurants only
// // const restaurantOnly = (req, res, next) => {
// //   if (req.user && req.user.role === "restaurant") return next();
// //   return res.status(403).json({ message: "Restaurant access only" });
// // };

// // module.exports = { protect, adminOnly, restaurantOnly };






// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const Restaurant = require("../models/Restaurant");

// /**
//  * ✅ Unified Authentication Middleware
//  * - Supports users, restaurants, and admins
//  * - Verifies JWT
//  * - Attaches the correct model instance to req.user
//  */
// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // ✅ Try finding in User collection first
//       let authUser = await User.findById(decoded.id).select("-password");
//       let userType = "user";

//       // ✅ If not found, look in Restaurant collection
//       if (!authUser) {
//         authUser = await Restaurant.findById(decoded.id).select("-password");
//         userType = "restaurant";
//       }

//       // ✅ If still not found
//       if (!authUser) {
//         return res.status(401).json({ message: "User or Restaurant not found" });
//       }

//       // ✅ Assign correct role (important for frontend role-based behavior)
//       authUser.role = authUser.role || userType;

//       // ✅ Attach user to request
//       req.user = authUser;
//       req.token = token; // pass token along for profile updates

//       next();
//     } catch (err) {
//       console.error("❌ Auth Error:", err.message);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// /**
//  * ✅ Restrict to Admin Only
//  */
// const adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === "admin") return next();
//   return res.status(403).json({ message: "Admin access only" });
// };

// /**
//  * ✅ Restrict to Restaurant Only
//  */
// const restaurantOnly = (req, res, next) => {
//   if (req.user && req.user.role === "restaurant") return next();
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

      // ✅ Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Try finding in User collection first
      let authUser = await User.findById(decoded.id).select("-password");
      let userType = "user";

      // ✅ If not found, try in Restaurant collection
      if (!authUser) {
        authUser = await Restaurant.findById(decoded.id).select("-password");
        userType = "restaurant";
      }

      // ✅ If no match in either collection
      if (!authUser) {
        return res.status(401).json({ message: "User or Restaurant not found" });
      }

      // ✅ Assign a proper role fallback (important for restaurants)
      authUser.role = authUser.role || userType;

      // ✅ Attach data to request
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
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};

/**
 * ✅ Restaurant Only Middleware
 */
const restaurantOnly = (req, res, next) => {
  if (req.user && req.user.role === "restaurant") {
    return next();
  }
  return res.status(403).json({ message: "Restaurant access only" });
};

module.exports = { protect, adminOnly, restaurantOnly };
