// // backend/controllers/menuController.js
// const MenuItem = require("../models/MenuItem");

// /* ============================================================
//    📋 Get all menu items (Public)
//    Route: GET /api/menu
// ============================================================ */
// exports.getMenu = async (req, res) => {
//   try {
//     const items = await MenuItem.find()
//       .populate("restaurant", "name email cuisine")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: items.length,
//       data: items,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching all menu:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching menu items.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    📋 Get menu items for a specific restaurant (Public)
//    Route: GET /api/menu/restaurant/:restaurantId
// ============================================================ */
// exports.getMenuByRestaurant = async (req, res) => {
//   try {
//     const { restaurantId } = req.params;

//     if (!restaurantId) {
//       return res.status(400).json({
//         success: false,
//         message: "Restaurant ID is required.",
//       });
//     }

//     const menuItems = await MenuItem.find({ restaurant: restaurantId })
//       .populate("restaurant", "name email cuisine")
//       .sort({ createdAt: -1 });

//     if (!menuItems.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No menu items found for this restaurant.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: menuItems.length,
//       data: menuItems,
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
//     const { name, description, price, category, image } = req.body;

//     if (!name || !price || !category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price, and category are required.",
//       });
//     }

//     const restaurantId = req.user._id; // From protect + restaurantOnly middleware

//     const menuItem = await MenuItem.create({
//       restaurant: restaurantId,
//       name,
//       description,
//       price,
//       category,
//       image,
//     });

//     res.status(201).json({
//       success: true,
//       message: "✅ Menu item added successfully.",
//       data: menuItem,
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

//     const menuItem = await MenuItem.findById(id);
//     if (!menuItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Menu item not found.",
//       });
//     }

//     // 🛡️ Ensure the logged-in restaurant owns this menu item
//     if (menuItem.restaurant.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized to edit this menu item.",
//       });
//     }

//     const updatedItem = await MenuItem.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "✅ Menu item updated successfully.",
//       data: updatedItem,
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
//     const menuItem = await MenuItem.findById(id);

//     if (!menuItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Menu item not found.",
//       });
//     }

//     // 🛡️ Ensure the logged-in restaurant owns this menu item
//     if (menuItem.restaurant.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized to delete this menu item.",
//       });
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

/* ============================================================
   📋 Get all menu items (Public)
   Route: GET /api/menu
============================================================ */
exports.getMenu = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}, "name email cuisineType menuItems");

    // Flatten all menu items into one array with restaurant info
    const allItems = restaurants.flatMap((r) =>
      r.menuItems.map((item) => ({
        ...item.toObject(),
        restaurant: { _id: r._id, name: r.name, cuisine: r.cuisineType },
      }))
    );

    res.status(200).json({
      success: true,
      count: allItems.length,
      data: allItems,
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
============================================================ */
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId, "name cuisineType menuItems");
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }

    res.status(200).json({
      success: true,
      restaurant: { _id: restaurant._id, name: restaurant.name, cuisine: restaurant.cuisineType },
      count: restaurant.menuItems.length,
      data: restaurant.menuItems,
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
    const { name, description, price, category, image, isAvailable } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required.",
      });
    }

    const restaurant = await Restaurant.findById(req.user._id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found." });
    }

    const newItem = {
      name,
      description,
      price,
      category,
      image: image || "/images/default-food.png",
      isAvailable: isAvailable !== undefined ? isAvailable : true,
    };

    restaurant.menuItems.push(newItem);
    await restaurant.save();

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
    const restaurant = await Restaurant.findById(req.user._id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found." });
    }

    const menuItem = restaurant.menuItems.id(id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu item not found." });
    }

    Object.assign(menuItem, req.body); // Update only provided fields
    await restaurant.save();

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
    const restaurant = await Restaurant.findById(req.user._id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found." });
    }

    const menuItem = restaurant.menuItems.id(id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu item not found." });
    }

    menuItem.deleteOne(); // Remove subdocument
    await restaurant.save();

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
