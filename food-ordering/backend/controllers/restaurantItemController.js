// const RestaurantItem = require("../models/RestaurantItem");

// // ✅ Get all items for a specific restaurant
// const getItemsByRestaurant = async (req, res) => {
//   try {
//     const restaurantId = req.params.restaurantId;

//     if (!restaurantId) {
//       return res.status(400).json({ message: "Restaurant ID is required" });
//     }

//     // Fetch all items linked to this restaurantId (sorted by latest)
//     const items = await RestaurantItem.find({ restaurantId }).sort({
//       createdAt: -1,
//     });

//     return res.status(200).json(items || []);
//   } catch (error) {
//     console.error("❌ Error fetching restaurant items:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error while fetching menu items" });
//   }
// };

// // ✅ Add new restaurant item
// const addRestaurantItem = async (req, res) => {
//   try {
//     const { restaurantId, name, price, description, category, image } = req.body;

//     if (!restaurantId || !name || !price) {
//       return res.status(400).json({
//         message: "restaurantId, name, and price are required",
//       });
//     }

//     // ✅ Create and save new item
//     const newItem = new RestaurantItem({
//       restaurantId,
//       name: name.trim(),
//       price,
//       description: description || "",
//       category: category || "Starters",
//       image: image || "https://via.placeholder.com/200",
//     });

//     const savedItem = await newItem.save();

//     return res.status(201).json({
//       message: "✅ Item added successfully",
//       item: savedItem,
//     });
//   } catch (error) {
//     console.error("❌ Error adding restaurant item:", error);
//     return res.status(500).json({ message: "Server error while adding item" });
//   }
// };

// // ✅ Update existing item
// const updateRestaurantItem = async (req, res) => {
//   try {
//     const itemId = req.params.id;

//     const updatedItem = await RestaurantItem.findByIdAndUpdate(
//       itemId,
//       req.body,
//       { new: true }
//     );

//     if (!updatedItem) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     return res.status(200).json({
//       message: "✅ Item updated successfully",
//       item: updatedItem,
//     });
//   } catch (error) {
//     console.error("❌ Error updating item:", error);
//     return res.status(500).json({ message: "Server error while updating item" });
//   }
// };

// // ✅ Delete item
// const deleteRestaurantItem = async (req, res) => {
//   try {
//     const itemId = req.params.id;

//     const deletedItem = await RestaurantItem.findByIdAndDelete(itemId);

//     if (!deletedItem) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     return res.status(200).json({ message: "✅ Item deleted successfully" });
//   } catch (error) {
//     console.error("❌ Error deleting item:", error);
//     return res.status(500).json({ message: "Server error while deleting item" });
//   }
// };

// module.exports = {
//   getItemsByRestaurant,
//   addRestaurantItem,
//   updateRestaurantItem,
//   deleteRestaurantItem,
// };


const RestaurantItem = require("../models/RestaurantItem");
const Restaurant = require("../models/Restaurant");

// ✅ Optimized API: Fetch restaurant + its menu in one call
const getFullMenuData = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId)
      return res.status(400).json({ success: false, message: "Restaurant ID is required" });

    const restaurant = await Restaurant.findById(restaurantId).select("-password -otp -otpExpires");
    if (!restaurant)
      return res.status(404).json({ success: false, message: "Restaurant not found" });

    const menuItems = await RestaurantItem.find({ restaurantId, available: { $ne: false } }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      restaurant,
      menu: menuItems || [],
    });
  } catch (error) {
    console.error("❌ Error fetching restaurant & menu:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching restaurant data",
    });
  }
};

// ✅ Keep your old routes working too
const getItemsByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    if (!restaurantId)
      return res.status(400).json({ message: "Restaurant ID is required" });

    const items = await RestaurantItem.find({ restaurantId }).sort({ createdAt: -1 });
    return res.status(200).json(items || []);
  } catch (error) {
    console.error("❌ Error fetching restaurant items:", error);
    return res.status(500).json({ message: "Server error while fetching menu items" });
  }
};

const addRestaurantItem = async (req, res) => {
  try {
    const { restaurantId, name, price, description, category, image } = req.body;
    if (!restaurantId || !name || !price)
      return res.status(400).json({ message: "restaurantId, name, and price are required" });

    const newItem = new RestaurantItem({
      restaurantId,
      name: name.trim(),
      price,
      description: description || "",
      category: category || "Starters",
      image: image || "https://via.placeholder.com/200",
    });

    const savedItem = await newItem.save();
    return res.status(201).json({ message: "✅ Item added successfully", item: savedItem });
  } catch (error) {
    console.error("❌ Error adding restaurant item:", error);
    return res.status(500).json({ message: "Server error while adding item" });
  }
};

const updateRestaurantItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = await RestaurantItem.findByIdAndUpdate(itemId, req.body, { new: true });

    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    return res.status(200).json({ message: "✅ Item updated successfully", item: updatedItem });
  } catch (error) {
    console.error("❌ Error updating item:", error);
    return res.status(500).json({ message: "Server error while updating item" });
  }
};

const deleteRestaurantItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await RestaurantItem.findByIdAndDelete(itemId);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    return res.status(200).json({ message: "✅ Item deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    return res.status(500).json({ message: "Server error while deleting item" });
  }
};

module.exports = {
  getFullMenuData,
  getItemsByRestaurant,
  addRestaurantItem,
  updateRestaurantItem,
  deleteRestaurantItem,
};
