// // const express = require("express");
// // const router = express.Router();
// // const {
// //   getItemsByRestaurant,
// //   addRestaurantItem,
// //   updateRestaurantItem,
// //   deleteRestaurantItem,
// // } = require("../controllers/restaurantItemController");

// // // ✅ Fetch all menu items for a specific restaurant
// // router.get("/:restaurantId", getItemsByRestaurant);

// // // ✅ Add new menu item
// // router.post("/", addRestaurantItem);

// // // ✅ Update a menu item
// // router.put("/:id", updateRestaurantItem);

// // // ✅ Delete a menu item
// // router.delete("/:id", deleteRestaurantItem);

// // module.exports = router;







// const express = require("express");
// const router = express.Router();

// const {
//   getItemsByRestaurant,
//   addRestaurantItem,
//   updateRestaurantItem,
//   deleteRestaurantItem,
// } = require("../controllers/restaurantItemController");

// // ✅ Get all menu items for a specific restaurant
// router.get("/restaurant/:restaurantId", getItemsByRestaurant);

// // ✅ Add new menu item
// router.post("/", addRestaurantItem);

// // ✅ Update a menu item
// router.put("/:id", updateRestaurantItem);

// // ✅ Delete a menu item
// router.delete("/:id", deleteRestaurantItem);

// module.exports = router;







const express = require("express");
const router = express.Router();

const {
  getItemsByRestaurant,
  addRestaurantItem,
  updateRestaurantItem,
  deleteRestaurantItem,
} = require("../controllers/restaurantItemController");

// ✅ Get all menu items for a specific restaurant
// Example: GET /api/restaurantitems/restaurant/675ab12345
router.get("/restaurant/:restaurantId", getItemsByRestaurant);

// ✅ Add a new menu item
// Example: POST /api/restaurantitems/
router.post("/", addRestaurantItem);

// ✅ Update an existing menu item
// Example: PUT /api/restaurantitems/:id
router.put("/:id", updateRestaurantItem);

// ✅ Delete a menu item
// Example: DELETE /api/restaurantitems/:id
router.delete("/:id", deleteRestaurantItem);

module.exports = router;
