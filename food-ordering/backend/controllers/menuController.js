// // const Menu = require("../models/Menu");

// // // ===============================
// // // @desc    Add new menu item
// // // @route   POST /api/menu
// // // @access  Private (Restaurant)
// // // ===============================
// // exports.addMenuItem = async (req, res) => {
// //   try {
// //     const { name, description, price, image, ingredients, category } = req.body;

// //     if (!name || !price || !category) {
// //       return res
// //         .status(400)
// //         .json({ message: "Name, price, and category are required" });
// //     }

// //     const menuItem = new Menu({
// //       restaurant: req.user._id, // ✅ from token
// //       name,
// //       description,
// //       price,
// //       image,
// //       ingredients,
// //       category,
// //     });

// //     const savedItem = await menuItem.save();
// //     res
// //       .status(201)
// //       .json({ message: "Menu item added successfully", menuItem: savedItem });
// //   } catch (error) {
// //     console.error("❌ Error adding menu item:", error);
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // };

// // // ===============================
// // // @desc    Get all menu items
// // // @route   GET /api/menu
// // // @access  Public
// // // ===============================
// // exports.getMenu = async (req, res) => {
// //   try {
// //     const items = await Menu.find().populate("restaurant", "name email cuisine");
// //     res.json(items);
// //   } catch (error) {
// //     console.error("❌ Error fetching menu:", error);
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // };

// // // ===============================
// // // @desc    Get menu items by restaurant
// // // @route   GET /api/menu/:restaurantId
// // // @access  Public
// // // ===============================
// // exports.getMenuByRestaurant = async (req, res) => {
// //   try {
// //     const { restaurantId } = req.params;
// //     const menu = await Menu.find({ restaurant: restaurantId });
// //     res.json(menu);
// //   } catch (error) {
// //     console.error("❌ Error fetching menu by restaurant:", error);
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // };

// // // ===============================
// // // @desc    Update menu item
// // // @route   PUT /api/menu/:id
// // // @access  Private (Restaurant/Admin)
// // // ===============================
// // exports.updateMenuItem = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const menuItem = await Menu.findById(id);
// //     if (!menuItem) {
// //       return res.status(404).json({ message: "Menu item not found" });
// //     }

// //     if (
// //       req.user.role !== "admin" &&
// //       menuItem.restaurant.toString() !== req.user._id.toString()
// //     ) {
// //       return res
// //         .status(403)
// //         .json({ message: "Not authorized to update this menu item" });
// //     }

// //     const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });
// //     res.json(updatedItem);
// //   } catch (error) {
// //     console.error("❌ Error updating menu item:", error);
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // };

// // // ===============================
// // // @desc    Delete menu item
// // // @route   DELETE /api/menu/:id
// // // @access  Private (Restaurant/Admin)
// // // ===============================
// // exports.deleteMenuItem = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const menuItem = await Menu.findById(id);

// //     if (!menuItem) {
// //       return res.status(404).json({ message: "Menu item not found" });
// //     }

// //     if (
// //       req.user.role !== "admin" &&
// //       menuItem.restaurant.toString() !== req.user._id.toString()
// //     ) {
// //       return res
// //         .status(403)
// //         .json({ message: "Not authorized to delete this menu item" });
// //     }

// //     await menuItem.deleteOne();
// //     res.json({ message: "Menu item deleted successfully" });
// //   } catch (error) {
// //     console.error("❌ Error deleting menu item:", error);
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // };




















// // // backend/controllers/menuController.js
// // const Menu = require("../models/Menu");

// // // ===============================
// // // @desc    Add new menu item
// // // @route   POST /api/menu
// // // @access  Private (Restaurant)
// // // ===============================
// // exports.addMenuItem = async (req, res) => {
// //   try {
// //     const { name, description, price, image, ingredients, category } = req.body;

// //     if (!name || !price || !category) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Name, price, and category are required",
// //       });
// //     }

// //     const menuItem = await Menu.create({
// //       restaurant: req.user?._id || req.body.restaurant, // supports both token & manual entry
// //       name,
// //       description,
// //       price,
// //       image,
// //       ingredients,
// //       category,
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "✅ Menu item added successfully",
// //       data: menuItem,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error adding menu item:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while adding menu item",
// //       error: error.message,
// //     });
// //   }
// // };

// // // ===============================
// // // @desc    Get all menu items
// // // @route   GET /api/menu
// // // @access  Public
// // // ===============================
// // exports.getMenu = async (req, res) => {
// //   try {
// //     const items = await Menu.find()
// //       .populate("restaurant", "name email cuisine")
// //       .sort({ createdAt: -1 });

// //     res.json({
// //       success: true,
// //       count: items.length,
// //       data: items,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching all menu:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while fetching menu",
// //       error: error.message,
// //     });
// //   }
// // };

// // // ===============================
// // // @desc    Get menu items by restaurant
// // // @route   GET /api/menu/:restaurantId
// // // @access  Public
// // // ===============================
// // exports.getMenuByRestaurant = async (req, res) => {
// //   try {
// //     const { restaurantId } = req.params;

// //     if (!restaurantId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Restaurant ID is required",
// //       });
// //     }

// //     const menu = await Menu.find({ restaurant: restaurantId }).sort({
// //       createdAt: -1,
// //     });

// //     if (!menu.length) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "No menu items found for this restaurant",
// //       });
// //     }

// //     res.json({menu});
// //   } catch (error) {
// //     console.error("❌ Error fetching menu by restaurant:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while fetching menu by restaurant",
// //       error: error.message,
// //     });
// //   }
// // };

// // // ===============================
// // // @desc    Update menu item
// // // @route   PUT /api/menu/:id
// // // @access  Private (Restaurant/Admin)
// // // ===============================
// // exports.updateMenuItem = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const menuItem = await Menu.findById(id);

// //     if (!menuItem) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Menu item not found",
// //       });
// //     }

// //     if (
// //       req.user.role !== "admin" &&
// //       menuItem.restaurant.toString() !== req.user._id.toString()
// //     ) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Not authorized to update this menu item",
// //       });
// //     }

// //     const updatedItem = await Menu.findByIdAndUpdate(id, req.body, {
// //       new: true,
// //       runValidators: true,
// //     });

// //     res.json({
// //       success: true,
// //       message: "✅ Menu item updated successfully",
// //       data: updatedItem,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error updating menu item:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while updating menu item",
// //       error: error.message,
// //     });
// //   }
// // };

// // // ===============================
// // // @desc    Delete menu item
// // // @route   DELETE /api/menu/:id
// // // @access  Private (Restaurant/Admin)
// // // ===============================
// // exports.deleteMenuItem = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const menuItem = await Menu.findById(id);

// //     if (!menuItem) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Menu item not found",
// //       });
// //     }

// //     if (
// //       req.user.role !== "admin" &&
// //       menuItem.restaurant.toString() !== req.user._id.toString()
// //     ) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Not authorized to delete this menu item",
// //       });
// //     }

// //     await menuItem.deleteOne();
// //     res.json({
// //       success: true,
// //       message: "🗑️ Menu item deleted successfully",
// //     });
// //   } catch (error) {
// //     console.error("❌ Error deleting menu item:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while deleting menu item",
// //       error: error.message,
// //     });
// //   }
// // };




// // const Menu = require("../models/Menu");

// // // ===============================
// // // @desc    Add new menu item
// // // @route   POST /api/menu
// // // @access  Private (Restaurant)
// // // ===============================
// // exports.addMenuItem = async (req, res) => {
// //   try {
// //     const { name, description, price, image, ingredients, category } = req.body;

// //     if (!name || !price || !category) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Name, price, and category are required",
// //       });
// //     }

// //     const menuItem = await Menu.create({
// //       restaurant: req.user?._id || req.body.restaurant, // supports both token & manual entry
// //       name,
// //       description,
// //       price,
// //       image,
// //       ingredients,
// //       category,
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "✅ Menu item added successfully",
// //       data: menuItem,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error adding menu item:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while adding menu item",
// //       error: error.message,
// //     });
// //   }
// // };

// // // ===============================
// // // @desc    Get all menu items
// // // @route   GET /api/menu
// // // @access  Public
// // // ===============================
// // exports.getMenu = async (req, res) => {
// //   try {
// //     const items = await Menu.find()
// //       .populate("restaurant", "name email cuisine")
// //       .sort({ createdAt: -1 });

// //     res.json({
// //       success: true,
// //       count: items.length,
// //       data: items,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching all menu:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while fetching menu",
// //       error: error.message,
// //     });
// //   }
// // };

// // // ===============================
// // // @desc    Get menu items by restaurant
// // // @route   GET /api/menu/:restaurantId
// // // @access  Public
// // // ===============================
// // exports.getMenuByRestaurant = async (req, res) => {
// //   try {
// //     const { restaurantId } = req.params;

// //     if (!restaurantId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Restaurant ID is required",
// //       });
// //     }

// //     const menuItems = await Menu.find({ restaurant: restaurantId }).sort({
// //       createdAt: -1,
// //     });

// //     // ✅ Always return success:true (even if empty array)
// //     res.status(200).json({
// //       success: true,
// //       count: menuItems.length,
// //       data: menuItems,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching menu by restaurant:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while fetching menu by restaurant",
// //       error: error.message,
// //     });
// //   }
// // };

// // // ===============================
// // // @desc    Update menu item
// // // @route   PUT /api/menu/:id
// // // @access  Private (Restaurant/Admin)
// // // ===============================
// // exports.updateMenuItem = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const menuItem = await Menu.findById(id);

// //     if (!menuItem) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Menu item not found",
// //       });
// //     }

// //     if (
// //       req.user.role !== "admin" &&
// //       menuItem.restaurant.toString() !== req.user._id.toString()
// //     ) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Not authorized to update this menu item",
// //       });
// //     }

// //     const updatedItem = await Menu.findByIdAndUpdate(id, req.body, {
// //       new: true,
// //       runValidators: true,
// //     });

// //     res.json({
// //       success: true,
// //       message: "✅ Menu item updated successfully",
// //       data: updatedItem,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error updating menu item:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while updating menu item",
// //       error: error.message,
// //     });
// //   }
// // };

// // // ===============================
// // // @desc    Delete menu item
// // // @route   DELETE /api/menu/:id
// // // @access  Private (Restaurant/Admin)
// // // ===============================
// // exports.deleteMenuItem = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const menuItem = await Menu.findById(id);

// //     if (!menuItem) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Menu item not found",
// //       });
// //     }

// //     if (
// //       req.user.role !== "admin" &&
// //       menuItem.restaurant.toString() !== req.user._id.toString()
// //     ) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Not authorized to delete this menu item",
// //       });
// //     }

// //     await menuItem.deleteOne();
// //     res.json({
// //       success: true,
// //       message: "🗑️ Menu item deleted successfully",
// //     });
// //   } catch (error) {
// //     console.error("❌ Error deleting menu item:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error while deleting menu item",
// //       error: error.message,
// //     });
// //   }
// // };







// const Menu = require("../models/Menu");

// /* ============================================================
//    🍽️ Add a new menu item (Restaurant Only)
//    Route: POST /api/menu
//    Access: Private (Restaurant)
// ============================================================ */
// exports.addMenuItem = async (req, res) => {
//   try {
//     const { name, description, price, image, ingredients, category } = req.body;

//     if (!name || !price || !category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price, and category are required.",
//       });
//     }

//     const restaurantId = req.user?._id || req.body.restaurant;

//     if (!restaurantId) {
//       return res.status(400).json({
//         success: false,
//         message: "Restaurant ID missing from request.",
//       });
//     }

//     const menuItem = await Menu.create({
//       restaurant: restaurantId,
//       name,
//       description,
//       price,
//       image,
//       ingredients,
//       category,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "✅ Menu item added successfully.",
//       data: menuItem,
//     });
//   } catch (error) {
//     console.error("❌ Error adding menu item:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while adding menu item.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    📋 Get all menu items (Public)
//    Route: GET /api/menu
// ============================================================ */
// exports.getMenu = async (req, res) => {
//   try {
//     const items = await Menu.find()
//       .populate("restaurant", "name email cuisine")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: items.length,
//       data: items,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching all menu:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while fetching menu items.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    🍔 Get menu items by restaurant
//    Route: GET /api/menu/:restaurantId
//    Access: Public
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

//     const menuItems = await Menu.find({ restaurant: restaurantId }).sort({
//       createdAt: -1,
//     });

//     return res.status(200).json({
//       success: true,
//       count: menuItems.length,
//       data: menuItems,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching menu by restaurant:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while fetching restaurant menu.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    ✏️ Update a menu item
//    Route: PUT /api/menu/:id
//    Access: Private (Restaurant/Admin)
// ============================================================ */
// exports.updateMenuItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const menuItem = await Menu.findById(id);
//     if (!menuItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Menu item not found.",
//       });
//     }

//     // Authorization check
//     if (
//       req.user.role !== "admin" &&
//       menuItem.restaurant.toString() !== req.user._id.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized to update this menu item.",
//       });
//     }

//     const updatedItem = await Menu.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "✅ Menu item updated successfully.",
//       data: updatedItem,
//     });
//   } catch (error) {
//     console.error("❌ Error updating menu item:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while updating menu item.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    🗑️ Delete a menu item
//    Route: DELETE /api/menu/:id
//    Access: Private (Restaurant/Admin)
// ============================================================ */
// exports.deleteMenuItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const menuItem = await Menu.findById(id);
//     if (!menuItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Menu item not found.",
//       });
//     }

//     // Authorization check
//     if (
//       req.user.role !== "admin" &&
//       menuItem.restaurant.toString() !== req.user._id.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized to delete this menu item.",
//       });
//     }

//     await menuItem.deleteOne();

//     return res.status(200).json({
//       success: true,
//       message: "🗑️ Menu item deleted successfully.",
//     });
//   } catch (error) {
//     console.error("❌ Error deleting menu item:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while deleting menu item.",
//       error: error.message,
//     });
//   }
// };







// // backend/controllers/menuController.js
// const Menu = require("../models/Menu");

// /* ============================================================
//    🍔 Get menu items by restaurant
//    Route: GET /api/menu/:restaurantId
//    Access: Public
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

//     // ✅ Fetch menu items (support both 'restaurant' and 'restaurantId' fields)
//     const menuItems = await Menu.find({
//       $or: [
//         { restaurant: restaurantId },
//         { restaurantId: restaurantId }
//       ]
//     })
//       .populate("restaurant", "name email cuisine")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: menuItems.length,
//       data: menuItems,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching menu by restaurant:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching restaurant menu.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    📋 Get all menu items (Public)
//    Route: GET /api/menu
// ============================================================ */
// exports.getMenu = async (req, res) => {
//   try {
//     const items = await Menu.find()
//       .populate("restaurant", "name email cuisine")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: items.length,
//       data: items,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching all menu:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching menu items.",
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
//     const { name, description, price, image, ingredients, category } = req.body;

//     if (!name || !price || !category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price, and category are required.",
//       });
//     }

//     // ✅ Use either logged-in restaurant or provided ID
//     const restaurantId = req.user?._id || req.body.restaurant || req.body.restaurantId;

//     if (!restaurantId) {
//       return res.status(400).json({
//         success: false,
//         message: "Restaurant ID missing from request.",
//       });
//     }

//     const menuItem = await Menu.create({
//       restaurant: restaurantId,  // still compatible with schema
//       restaurantId: restaurantId, // ensure it's also saved under restaurantId if schema differs
//       name,
//       description,
//       price,
//       image,
//       ingredients,
//       category,
//     });

//     res.status(201).json({
//       success: true,
//       message: "✅ Menu item added successfully.",
//       data: menuItem,
//     });
//   } catch (error) {
//     console.error("❌ Error adding menu item:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while adding menu item.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    ✏️ Update a menu item
//    Route: PUT /api/menu/:id
// ============================================================ */
// exports.updateMenuItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const menuItem = await Menu.findById(id);

//     if (!menuItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Menu item not found.",
//       });
//     }

//     const updatedItem = await Menu.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "✅ Menu item updated successfully.",
//       data: updatedItem,
//     });
//   } catch (error) {
//     console.error("❌ Error updating menu item:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while updating menu item.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    🗑️ Delete a menu item
//    Route: DELETE /api/menu/:id
// ============================================================ */
// exports.deleteMenuItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const menuItem = await Menu.findById(id);

//     if (!menuItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Menu item not found.",
//       });
//     }

//     await menuItem.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "🗑️ Menu item deleted successfully.",
//     });
//   } catch (error) {
//     console.error("❌ Error deleting menu item:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while deleting menu item.",
//       error: error.message,
//     });
//   }
// };



// backend/controllers/menuController.js
const Menu = require("../models/Menu");

/* ============================================================
   📋 Get all menu items (Public)
   Route: GET /api/menu
============================================================ */
exports.getMenu = async (req, res) => {
  try {
    const items = await Menu.find()
      .populate("restaurantId", "name email cuisine")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("❌ Error fetching all menu:", error.message);
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

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID is required.",
      });
    }

    const menuItems = await Menu.find({ restaurantId })
      .populate("restaurantId", "name email cuisine")
      .sort({ createdAt: -1 });

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menu items found for this restaurant.",
      });
    }

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
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
    const { name, description, price, image, ingredients, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required.",
      });
    }

    // ✅ Determine restaurantId (from logged-in restaurant or body)
    const restaurantId = req.user?._id || req.body.restaurantId;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID missing from request.",
      });
    }

    const menuItem = await Menu.create({
      restaurantId,
      name,
      description,
      price,
      image,
      ingredients,
      category,
    });

    res.status(201).json({
      success: true,
      message: "✅ Menu item added successfully.",
      data: menuItem,
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
   ✏️ Update a menu item
   Route: PUT /api/menu/:id
============================================================ */
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found.",
      });
    }

    const updatedItem = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "✅ Menu item updated successfully.",
      data: updatedItem,
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
   🗑️ Delete a menu item
   Route: DELETE /api/menu/:id
============================================================ */
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found.",
      });
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
