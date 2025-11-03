// // // // // // const express = require("express");
// // // // // // const router = express.Router();
// // // // // // const {
// // // // // //   addMenuItem,
// // // // // //   getMenu,
// // // // // //   getMenuByRestaurant,
// // // // // //   updateMenuItem,
// // // // // //   deleteMenuItem,
// // // // // // } = require("../controllers/menuController");

// // // // // // const { protect, restaurantOnly } = require("../middlewares/authMiddleware");

// // // // // // // ===============================
// // // // // // // @route   POST /api/menu
// // // // // // // @desc    Add menu item (Restaurant only)
// // // // // // // ===============================
// // // // // // router.post("/", protect, restaurantOnly, addMenuItem);

// // // // // // // ===============================
// // // // // // // @route   GET /api/menu
// // // // // // // @desc    Get all menu items
// // // // // // // ===============================
// // // // // // router.get("/", getMenu);

// // // // // // // ===============================
// // // // // // // @route   GET /api/menu/:restaurantId
// // // // // // // @desc    Get menu items by restaurant
// // // // // // // ===============================
// // // // // // router.get("/:restaurantId", getMenuByRestaurant);

// // // // // // // ===============================
// // // // // // // @route   PUT /api/menu/:id
// // // // // // // @desc    Update menu item (Restaurant/Admin)
// // // // // // // ===============================
// // // // // // router.put("/:id", protect, updateMenuItem);

// // // // // // // ===============================
// // // // // // // @route   DELETE /api/menu/:id
// // // // // // // @desc    Delete menu item (Restaurant/Admin)
// // // // // // // ===============================
// // // // // // router.delete("/:id", protect, deleteMenuItem);

// // // // // // module.exports = router;






// // // // // const express = require("express");
// // // // // const router = express.Router();
// // // // // const {
// // // // //   addMenuItem,
// // // // //   getMenu,
// // // // //   getMenuByRestaurant,
// // // // //   updateMenuItem,
// // // // //   deleteMenuItem,
// // // // // } = require("../controllers/menuController");

// // // // // const { protect, restaurantOnly } = require("../middlewares/authMiddleware");

// // // // // // ===============================
// // // // // // @route   POST /api/menu
// // // // // // @desc    Add menu item (Restaurant only)
// // // // // // ===============================
// // // // // router.post("/", protect, restaurantOnly, addMenuItem);

// // // // // // ===============================
// // // // // // @route   GET /api/menu
// // // // // // @desc    Get all menu items (public)
// // // // // // ===============================
// // // // // router.get("/", getMenu);

// // // // // // ===============================
// // // // // // @route   GET /api/menu/restaurant/:restaurantId
// // // // // // @desc    Get menu items by restaurant (public)
// // // // // // ===============================
// // // // // // ⚠️ Changed route to /restaurant/:restaurantId for clarity
// // // // // router.get("/restaurant/:restaurantId", getMenuByRestaurant);

// // // // // // ===============================
// // // // // // @route   PUT /api/menu/:id
// // // // // // @desc    Update menu item (Restaurant/Admin)
// // // // // // ===============================
// // // // // router.put("/:id", protect, updateMenuItem);

// // // // // // ===============================
// // // // // // @route   DELETE /api/menu/:id
// // // // // // @desc    Delete menu item (Restaurant/Admin)
// // // // // // ===============================
// // // // // router.delete("/:id", protect, deleteMenuItem);

// // // // // module.exports = router;






// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const {
// // // //   addMenuItem,
// // // //   getMenu,
// // // //   getMenuByRestaurant,
// // // //   updateMenuItem,
// // // //   deleteMenuItem,
// // // // } = require("../controllers/menuController");

// // // // const { protect, restaurantOnly } = require("../middlewares/authMiddleware");

// // // // // ===============================
// // // // // @route   POST /api/menu
// // // // // @desc    Add menu item (Restaurant only)
// // // // // ===============================
// // // // router.post("/", protect, restaurantOnly, addMenuItem);

// // // // // ===============================
// // // // // @route   GET /api/menu
// // // // // @desc    Get all menu items (public)
// // // // // ===============================
// // // // router.get("/", getMenu);

// // // // // ===============================
// // // // // @route   GET /api/menu/:restaurantId
// // // // // @desc    Get menu items by restaurant (public)
// // // // // ===============================
// // // // // ✅ Fixed route to match frontend
// // // // router.get("/:restaurantId", getMenuByRestaurant);

// // // // // ===============================
// // // // // @route   PUT /api/menu/:id
// // // // // @desc    Update menu item (Restaurant/Admin)
// // // // // ===============================
// // // // router.put("/:id", protect, updateMenuItem);

// // // // // ===============================
// // // // // @route   DELETE /api/menu/:id
// // // // // @desc    Delete menu item (Restaurant/Admin)
// // // // // ===============================
// // // // router.delete("/:id", protect, deleteMenuItem);

// // // // module.exports = router;






// // // // backend/routes/menuRoutes.js
// // // const express = require("express");
// // // const router = express.Router();
// // // const {
// // //   addMenuItem,
// // //   getMenu,
// // //   getMenuByRestaurant,
// // //   updateMenuItem,
// // //   deleteMenuItem,
// // // } = require("../controllers/menuController");

// // // const { protect, restaurantOnly } = require("../middlewares/authMiddleware");

// // // /* ============================================================
// // //    📋 Public Routes
// // // ============================================================ */

// // // // Get all menu items
// // // router.get("/", getMenu);

// // // // Get menu items for a specific restaurant
// // // router.get("/:restaurantId", getMenuByRestaurant);

// // // /* ============================================================
// // //    🔐 Protected Routes (Restaurant only)
// // // ============================================================ */

// // // // Add menu item
// // // router.post("/", protect, restaurantOnly, addMenuItem);

// // // // Update menu item
// // // router.put("/:id", protect, restaurantOnly, updateMenuItem);

// // // // Delete menu item
// // // router.delete("/:id", protect, restaurantOnly, deleteMenuItem);

// // // module.exports = router;



// // // // backend/routes/menuRoutes.js
// // // const express = require("express");
// // // const router = express.Router();
// // // const {
// // //   addMenuItem,
// // //   getMenu,
// // //   getMenuByRestaurant,
// // //   updateMenuItem,
// // //   deleteMenuItem,
// // // } = require("../controllers/menuController");
// // // const { protect, restaurantOnly } = require("../middlewares/authMiddleware");

// // // /* ============================================================
// // //    📋 Public Routes — accessible to all users
// // // ============================================================ */

// // // // ✅ Get all menu items (optional — for testing or browsing)
// // // router.get("/", getMenu);

// // // // ✅ Get menu items for a specific restaurant
// // // router.get("/restaurant/:restaurantId", getMenuByRestaurant);

// // // /* ============================================================
// // //    🔐 Protected Routes — only restaurant owners can access
// // // ============================================================ */

// // // // ✅ Add a new menu item (restaurant only)
// // // router.post("/", protect, restaurantOnly, addMenuItem);

// // // // ✅ Update a menu item (must belong to the same restaurant)
// // // router.put("/:id", protect, restaurantOnly, updateMenuItem);

// // // // ✅ Delete a menu item (must belong to the same restaurant)
// // // router.delete("/:id", protect, restaurantOnly, deleteMenuItem);

// // // module.exports = router;




// // // backend/routes/menuRoutes.js
// // const express = require("express");
// // const router = express.Router();
// // const {
// //   addMenuItem,
// //   getMenu,
// //   getMenuByRestaurant,
// //   updateMenuItem,
// //   deleteMenuItem,
// // } = require("../controllers/menuController");
// // const { protect, restaurantOnly } = require("../middlewares/authMiddleware");

// // /* ============================================================
// //    📖 PUBLIC ROUTES — accessible to all users
// // ============================================================ */

// // // ✅ Get all menu items (for general browsing or testing)
// // router.get("/", getMenu);

// // // ✅ Get all menu items from a specific restaurant
// // router.get("/restaurant/:restaurantId", getMenuByRestaurant);

// // /* ============================================================
// //    🔒 PROTECTED ROUTES — accessible only to restaurants
// // ============================================================ */

// // // ✅ Add a new menu item
// // router.post("/", protect, restaurantOnly, addMenuItem);

// // // ✅ Update an existing menu item (must belong to the restaurant)
// // router.put("/:id", protect, restaurantOnly, updateMenuItem);

// // // ✅ Delete a menu item (must belong to the restaurant)
// // router.delete("/:id", protect, restaurantOnly, deleteMenuItem);

// // /* ============================================================
// //    ✅ Export Router
// // ============================================================ */
// // module.exports = router;

// // backend/routes/menuRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   addMenuItem,
//   getMenu,
//   getMenuByRestaurant,
//   updateMenuItem,
//   deleteMenuItem,
// } = require("../controllers/menuController");
// const { protect, restaurantOnly } = require("../middlewares/authMiddleware");

// /* ============================================================
//    📖 PUBLIC ROUTES — accessible to all users
// ============================================================ */

// // ✅ Get all menu items (for general browsing or testing)
// router.get("/", getMenu);

// // ✅ Get all menu items from a specific restaurant (original route)
// router.get("/restaurant/:restaurantId", getMenuByRestaurant);

// // ✅ Alias route for frontend compatibility (/api/menu/:restaurantId)
// router.get("/:restaurantId", getMenuByRestaurant);

// /* ============================================================
//    🔒 PROTECTED ROUTES — accessible only to restaurants
// ============================================================ */

// // ✅ Add a new menu item
// router.post("/", protect, restaurantOnly, addMenuItem);

// // ✅ Update an existing menu item (must belong to the restaurant)
// router.put("/:id", protect, restaurantOnly, updateMenuItem);

// // ✅ Delete a menu item (must belong to the restaurant)
// router.delete("/:id", protect, restaurantOnly, deleteMenuItem);

// /* ============================================================
//    ✅ Export Router
// ============================================================ */
// module.exports = router;








// backend/routes/menuRoutes.js
const express = require("express");
const router = express.Router();
const {
  addMenuItem,
  getMenu,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");
const { protect, restaurantOnly } = require("../middlewares/authMiddleware");

/* ============================================================
   📖 PUBLIC ROUTES — accessible to all users
============================================================ */

// ✅ Get all menu items (for general browsing or testing)
router.get("/", getMenu);

// ✅ Get all menu items for a specific restaurant
// Example: /api/menu/restaurant/6730df12ab12...
router.get("/restaurant/:restaurantId", getMenuByRestaurant);

// ✅ Frontend alias route for easier access
// Example: /api/menu/:restaurantId
router.get("/:restaurantId", getMenuByRestaurant);

/* ============================================================
   🔒 PROTECTED ROUTES — accessible only to restaurant owners
============================================================ */

// ✅ Add a new menu item
router.post("/", protect, restaurantOnly, addMenuItem);

// ✅ Update a menu item (restaurant must own it)
router.put("/:id", protect, restaurantOnly, updateMenuItem);

// ✅ Delete a menu item (restaurant must own it)
router.delete("/:id", protect, restaurantOnly, deleteMenuItem);

/* ============================================================
   ✅ Export Router
============================================================ */
module.exports = router;
