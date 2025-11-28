// // backend/controllers/menuController.js
// const Restaurant = require("../models/Restaurant");
// const RestaurantItem = require("../models/RestaurantItem");

// /* ============================================================
//    📋 Get all menu items (Public)
//    Route: GET /api/menu
// ============================================================ */
// exports.getMenu = async (req, res) => {
//   try {
//     const items = await RestaurantItem.find()
//       .populate("restaurantId", "name cuisineType email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: items.length,
//       data: items.map((item) => ({
//         _id: item._id,
//         name: item.name,
//         description: item.description,
//         price: item.price,
//         category: item.category,
//         image: item.image,
//         available: item.available,
//         restaurant: item.restaurantId
//           ? {
//               _id: item.restaurantId._id,
//               name: item.restaurantId.name,
//               cuisine: item.restaurantId.cuisineType,
//             }
//           : null,
//       })),
//     });
//   } catch (error) {
//     console.error("❌ Error fetching all menu items:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching menu items.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    📋 Get menu items for a specific restaurant (Public)
//    Route: GET /api/menu/:restaurantId
// ============================================================ */
// exports.getMenuByRestaurant = async (req, res) => {
//   try {
//     const { restaurantId } = req.params;

//     const restaurant = await Restaurant.findById(restaurantId, "name cuisineType");
//     if (!restaurant) {
//       return res.status(404).json({
//         success: false,
//         message: "Restaurant not found.",
//       });
//     }

//     const items = await RestaurantItem.find({ restaurantId }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       restaurant: { _id: restaurant._id, name: restaurant.name, cuisine: restaurant.cuisineType },
//       count: items.length,
//       data: items,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching menu by restaurant:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching restaurant menu.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    🍽️ Add a new menu item (Restaurant Only)
//    Route: POST /api/menu
// ============================================================ */
// exports.addMenuItem = async (req, res) => {
//   try {
//     const { name, description, price, category, image, available } = req.body;

//     if (!name || !price || !category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price, and category are required.",
//       });
//     }

//     const restaurant = await Restaurant.findById(req.user._id);
//     if (!restaurant) {
//       return res.status(404).json({ success: false, message: "Restaurant not found." });
//     }

//     const newItem = await RestaurantItem.create({
//       restaurantId: restaurant._id,
//       name,
//       description,
//       price,
//       category,
//       image: image || "https://via.placeholder.com/200",
//       available: available !== undefined ? available : true,
//     });

//     res.status(201).json({
//       success: true,
//       message: "✅ Menu item added successfully.",
//       data: newItem,
//     });
//   } catch (error) {
//     console.error("❌ Error adding menu item:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error while adding menu item.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    ✏️ Update a menu item (Restaurant Only)
//    Route: PUT /api/menu/:id
// ============================================================ */
// exports.updateMenuItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const menuItem = await RestaurantItem.findById(id);
//     if (!menuItem) {
//       return res.status(404).json({ success: false, message: "Menu item not found." });
//     }

//     // Only allow owner restaurant to update
//     if (menuItem.restaurantId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized to update this item." });
//     }

//     Object.assign(menuItem, req.body);
//     await menuItem.save();

//     res.status(200).json({
//       success: true,
//       message: "✅ Menu item updated successfully.",
//       data: menuItem,
//     });
//   } catch (error) {
//     console.error("❌ Error updating menu item:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error while updating menu item.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    🗑️ Delete a menu item (Restaurant Only)
//    Route: DELETE /api/menu/:id
// ============================================================ */
// exports.deleteMenuItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const menuItem = await RestaurantItem.findById(id);
//     if (!menuItem) {
//       return res.status(404).json({ success: false, message: "Menu item not found." });
//     }

//     // Ensure the restaurant owns the item
//     if (menuItem.restaurantId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized to delete this item." });
//     }

//     await menuItem.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "🗑️ Menu item deleted successfully.",
//     });
//   } catch (error) {
//     console.error("❌ Error deleting menu item:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error while deleting menu item.",
//       error: error.message,
//     });
//   }
// };







// backend/controllers/menuController.js
const Restaurant = require("../models/Restaurant");
const RestaurantItem = require("../models/RestaurantItem");

/* ============================================================
   📋 Get all menu items (Public)
   Route: GET /api/menu
   Supports optional query: isVeg=veg|nonveg
============================================================ */
exports.getMenu = async (req, res) => {
  try {
    const query = {};
    if (req.query.isVeg === "veg") query.isVeg = true;
    if (req.query.isVeg === "nonveg") query.isVeg = false;

    const items = await RestaurantItem.find(query)
      .populate("restaurantId", "name cuisineType email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items.map((item) => ({
        _id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        available: item.available,
        isVeg: item.isVeg === undefined ? true : item.isVeg,
        restaurant: item.restaurantId
          ? {
              _id: item.restaurantId._id,
              name: item.restaurantId.name,
              cuisine: item.restaurantId.cuisineType,
            }
          : null,
      })),
    });
  } catch (error) {
    console.error("❌ Error fetching all menu items:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching menu items.",
      error: error.message,
    });
  }
};

/* ============================================================
   📋 Get menu items for a specific restaurant (Public)
   Route: GET /api/menu/:restaurantId
   Supports optional query: isVeg=veg|nonveg
============================================================ */
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId, "name cuisineType");
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }

    const query = { restaurantId };
    if (req.query.isVeg === "veg") query.isVeg = true;
    if (req.query.isVeg === "nonveg") query.isVeg = false;

    const items = await RestaurantItem.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      restaurant: { _id: restaurant._id, name: restaurant.name, cuisine: restaurant.cuisineType },
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("❌ Error fetching menu by restaurant:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching restaurant menu.",
      error: error.message,
    });
  }
};

/* ============================================================
   🍽️ Add a new menu item (Restaurant Only)
   Route: POST /api/menu
============================================================ */
exports.addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, available, isVeg } = req.body;

    if (!name || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required.",
      });
    }

    const restaurant = await Restaurant.findById(req.user._id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found." });
    }

    const newItem = await RestaurantItem.create({
      restaurantId: restaurant._id,
      name,
      description,
      price,
      category,
      image: image || "https://via.placeholder.com/200",
      available: available !== undefined ? available : true,
      isVeg: isVeg !== undefined ? Boolean(isVeg) : true,
    });

    res.status(201).json({
      success: true,
      message: "✅ Menu item added successfully.",
      data: newItem,
    });
  } catch (error) {
    console.error("❌ Error adding menu item:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while adding menu item.",
      error: error.message,
    });
  }
};

/* ============================================================
   ✏️ Update a menu item (Restaurant Only)
   Route: PUT /api/menu/:id
============================================================ */
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await RestaurantItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu item not found." });
    }

    // Only allow owner restaurant to update
    if (menuItem.restaurantId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this item." });
    }

    if (req.body.isVeg !== undefined) req.body.isVeg = Boolean(req.body.isVeg);

    Object.assign(menuItem, req.body);
    await menuItem.save();

    res.status(200).json({
      success: true,
      message: "✅ Menu item updated successfully.",
      data: menuItem,
    });
  } catch (error) {
    console.error("❌ Error updating menu item:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating menu item.",
      error: error.message,
    });
  }
};

/* ============================================================
   🗑️ Delete a menu item (Restaurant Only)
   Route: DELETE /api/menu/:id
============================================================ */
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await RestaurantItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu item not found." });
    }

    // Ensure the restaurant owns the item
    if (menuItem.restaurantId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this item." });
    }

    await menuItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "🗑️ Menu item deleted successfully.",
    });
  } catch (error) {
    console.error("❌ Error deleting menu item:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while deleting menu item.",
      error: error.message,
    });
  }
};
