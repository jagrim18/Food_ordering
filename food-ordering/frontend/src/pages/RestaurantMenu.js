// // import { useEffect, useState } from "react";
// // import { FaEdit, FaTrash, FaEyeSlash, FaPowerOff } from "react-icons/fa";
// // import api from "../utils/api";
// // import "../styles/RestaurantMenu.css";

// // function RestaurantMenu() {
// //   const [menu, setMenu] = useState([]);
// //   const [restaurantId, setRestaurantId] = useState(null);
// //   const [categories] = useState([
// //     "Starters",
// //     "Main Course",
// //     "Desserts",
// //     "Beverages",
// //     "Snacks",
// //     "Specials",
// //   ]);
// //   const [newItem, setNewItem] = useState({
// //     name: "",
// //     price: "",
// //     category: "",
// //     description: "",
// //     image: "",
// //     available: true,
// //   });
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [deleteItemId, setDeleteItemId] = useState(null);

// //   // Fetch restaurant
// //   const fetchRestaurant = async () => {
// //     try {
// //       const res = await api.get("/restaurants/profile");
// //       setRestaurantId(res.data._id);
// //     } catch (err) {
// //       console.error("❌ Error fetching restaurant profile:", err);
// //     }
// //   };

// //   // Fetch menu
// //   const fetchMenu = async (id) => {
// //     if (!id) return;
// //     try {
// //       const res = await api.get(`/restaurantitems/restaurant/${id}`);
// //       setMenu(res.data || []);
// //     } catch (err) {
// //       console.error("❌ Error fetching menu:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRestaurant();
// //   }, []);

// //   useEffect(() => {
// //     if (restaurantId) fetchMenu(restaurantId);
// //   }, [restaurantId]);

// //   // === ADD ITEM ===
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!restaurantId) return alert("Restaurant not loaded yet!");
// //     try {
// //       await api.post("/restaurantitems", { ...newItem, restaurantId });
// //       setShowAddModal(false);
// //       setNewItem({
// //         name: "",
// //         price: "",
// //         category: "",
// //         description: "",
// //         image: "",
// //         available: true,
// //       });
// //       fetchMenu(restaurantId);
// //     } catch (err) {
// //       console.error("❌ Save error:", err);
// //       alert("Failed to save item. Please check inputs or login again.");
// //     }
// //   };

// //   // === DELETE ===
// //   const confirmDelete = (id) => setDeleteItemId(id);

// //   const handleDelete = async () => {
// //     try {
// //       await api.delete(`/restaurantitems/${deleteItemId}`);
// //       setDeleteItemId(null);
// //       fetchMenu(restaurantId);
// //     } catch (err) {
// //       console.error("❌ Delete error:", err);
// //     }
// //   };

// //   // === EDIT ===
// //   const handleEdit = (item) => {
// //     setEditingItem(item);
// //     setNewItem({
// //       name: item.name,
// //       price: item.price,
// //       category: item.category,
// //       description: item.description || "",
// //       image: item.image || "",
// //       available: item.available,
// //     });
// //     setShowEditModal(true);
// //   };

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await api.put(`/restaurantitems/${editingItem._id}`, { ...newItem, restaurantId });
// //       setShowEditModal(false);
// //       setEditingItem(null);
// //       setNewItem({ name: "", price: "", category: "", description: "", image: "", available: true });
// //       fetchMenu(restaurantId);
// //     } catch (err) {
// //       console.error("❌ Update error:", err);
// //     }
// //   };

// //   // === TOGGLE AVAILABILITY ===
// //   const toggleAvailability = async (item) => {
// //     try {
// //       await api.put(`/restaurantitems/${item._id}`, { available: !item.available });
// //       fetchMenu(restaurantId);
// //     } catch (err) {
// //       console.error("❌ Availability toggle error:", err);
// //     }
// //   };

// //   // === STATS ===
// //   const totalItems = menu.length;
// //   const uniqueCategories = [...new Set(menu.map((m) => m.category))].length;
// //   const availableItems = menu.filter((m) => m.available !== false).length;
// //   const unavailableItems = totalItems - availableItems;

// //   // === GROUP MENU ===
// //   const groupedMenu = menu.reduce((acc, item) => {
// //     const cat = item.category || "Uncategorized";
// //     if (!acc[cat]) acc[cat] = [];
// //     acc[cat].push(item);
// //     return acc;
// //   }, {});

// //   return (
// //     <div className="menu-page">
// //       {/* === Header === */}
// //       <div className="menu-header">
// //         <div>
// //           <h1>Menu Management</h1>
// //           <p>Manage menu items for your outlet</p>
// //         </div>
// //         <button className="add-menu-btn" onClick={() => setShowAddModal(true)}>
// //           + Add Menu Item
// //         </button>
// //       </div>

// //       {/* === Stats Section === */}
// //       <div className="menu-stats">
// //         <div className="stat-card"><h3>Total Items</h3><p>{totalItems}</p></div>
// //         <div className="stat-card"><h3>Categories</h3><p>{uniqueCategories}</p></div>
// //         <div className="stat-card"><h3>Available</h3><p className="green">{availableItems}</p></div>
// //         <div className="stat-card"><h3>Unavailable</h3><p className="red">{unavailableItems}</p></div>
// //       </div>

// //       {/* === Menu List === */}
// //       {Object.keys(groupedMenu).map((cat) => (
// //         <div key={cat} className="menu-category">
// //           <h2>{cat}</h2>
// //           <div className="menu-grid">
// //             {groupedMenu[cat].map((item) => (
// //               <div key={item._id} className={`menu-card ${!item.available ? "unavailable" : ""}`}>
// //                 <img src={item.image || "/default-food.png"} alt={item.name} className="menu-card-img" />
// //                 <div className="menu-card-body">
// //                   <div className="menu-card-top">
// //                     <h3>{item.name}</h3>
// //                     <button
// //                       className={`power-btn ${item.available ? "active" : ""}`}
// //                       onClick={() => toggleAvailability(item)}
// //                     >
// //                       <FaPowerOff />
// //                     </button>
// //                   </div>
// //                   <p className="menu-desc">{item.description}</p>
// //                   <p className="menu-price">₹{item.price}</p>
// //                   <div className="menu-card-actions">
// //                     <button className="icon-btn" onClick={() => handleEdit(item)}><FaEdit /></button>
// //                     <button className="icon-btn" onClick={() => toggleAvailability(item)}><FaEyeSlash /></button>
// //                     <button className="icon-btn delete" onClick={() => confirmDelete(item._id)}><FaTrash /></button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       ))}

// //       {/* === ADD ITEM MODAL === */}
// //       {showAddModal && (
// //         <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
// //           <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>Add Menu Item</h2>
// //               <p>Add a new item to your menu</p>
// //             </div>

// //             <form onSubmit={handleSubmit} className="edit-popup-form">
// //               <label>Item Name</label>
// //               <input
// //                 type="text"
// //                 value={newItem.name}
// //                 onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
// //                 required
// //               />

// //               <label>Description</label>
// //               <input
// //                 type="text"
// //                 value={newItem.description}
// //                 onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
// //               />

// //               <div className="form-row">
// //                 <div>
// //                   <label>Price ($)</label>
// //                   <input
// //                     type="number"
// //                     value={newItem.price}
// //                     onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Category</label>
// //                   <select
// //                     value={newItem.category}
// //                     onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
// //                     required
// //                   >
// //                     <option value="">Select</option>
// //                     {categories.map((cat) => (
// //                       <option key={cat}>{cat}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               </div>

// //               <label>Image URL (optional)</label>
// //               <input
// //                 type="text"
// //                 value={newItem.image}
// //                 onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
// //               />

// //               <div className="availability-toggle">
// //                 <label>Available</label>
// //                 <input
// //                   type="checkbox"
// //                   checked={newItem.available}
// //                   onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
// //                 />
// //               </div>

// //               <div className="modal-actions">
// //                 <button type="button" className="cancel-btn-outline" onClick={() => setShowAddModal(false)}>
// //                   Cancel
// //                 </button>
// //                 <button type="submit" className="update-btn">
// //                   Add Item
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* === Edit Modal === */}
// //       {showEditModal && (
// //         <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
// //           <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>Edit Menu Item</h2>
// //               <p>Update menu item details</p>
// //             </div>

// //             <form onSubmit={handleUpdate} className="edit-popup-form">
// //               <label>Item Name</label>
// //               <input
// //                 type="text"
// //                 value={newItem.name}
// //                 onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
// //                 required
// //               />

// //               <label>Description</label>
// //               <input
// //                 type="text"
// //                 value={newItem.description}
// //                 onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
// //               />

// //               <div className="form-row">
// //                 <div>
// //                   <label>Price (₹)</label>
// //                   <input
// //                     type="number"
// //                     value={newItem.price}
// //                     onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Category</label>
// //                   <select
// //                     value={newItem.category}
// //                     onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
// //                   >
// //                     {categories.map((cat) => (
// //                       <option key={cat}>{cat}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               </div>

// //               <label>Image URL (optional)</label>
// //               <input
// //                 type="text"
// //                 value={newItem.image}
// //                 onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
// //               />

// //               <div className="modal-actions">
// //                 <button type="button" className="cancel-btn-outline" onClick={() => setShowEditModal(false)}>
// //                   Cancel
// //                 </button>
// //                 <button type="submit" className="update-btn">
// //                   Update Item
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* === Delete Confirmation === */}
// //       {deleteItemId && (
// //         <div className="modal-overlay" onClick={() => setDeleteItemId(null)}>
// //           <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>Confirm Delete</h2>
// //               <p>Are you sure you want to delete this item?</p>
// //             </div>
// //             <div className="modal-actions">
// //               <button onClick={handleDelete} className="update-btn">Yes</button>
// //               <button onClick={() => setDeleteItemId(null)} className="cancel-btn-outline">Cancel</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default RestaurantMenu;





// import { useEffect, useState } from "react";
// import { FaEdit, FaTrash, FaEyeSlash, FaPowerOff } from "react-icons/fa";
// import api from "../utils/api";
// import "../styles/RestaurantMenu.css";

// // 🆕 Default categories
// const defaultCategories = [
//   "Starters",
//   "Main Course",
//   "Desserts",
//   "Beverages",
//   "Snacks",
//   "Specials",
// ];

// function RestaurantMenu() {
//   const [menu, setMenu] = useState([]);
//   const [restaurantId, setRestaurantId] = useState(null);

//   // 🆕 dynamic categories state
//   const [categories, setCategories] = useState(defaultCategories);
//   const [newCategory, setNewCategory] = useState("");

//   const [newItem, setNewItem] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//     image: "",
//     available: true,
//   });

//   const [editingItem, setEditingItem] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [deleteItemId, setDeleteItemId] = useState(null);

//   // ==============================
//   // Fetch restaurant profile
//   // ==============================
//   const fetchRestaurant = async () => {
//     try {
//       const res = await api.get("/restaurants/profile");
//       setRestaurantId(res.data._id);
//     } catch (err) {
//       console.error("❌ Error fetching restaurant profile:", err);
//     }
//   };

//   // ==============================
//   // Fetch menu items
//   // ==============================
//   const fetchMenu = async (id) => {
//     if (!id) return;
//     try {
//       const res = await api.get(`/restaurantitems/restaurant/${id}`);
//       setMenu(res.data || []);
//     } catch (err) {
//       console.error("❌ Error fetching menu:", err);
//     }
//   };

//   // ==============================
//   // 🆕 Fetch custom categories
//   // ==============================
//   const fetchCategories = async (id) => {
//     try {
//       const res = await api.get(`/categories/${id}`);
//       const custom = res.data.categories.map((c) => c.name);

//       setCategories([...defaultCategories, ...custom]);
//     } catch (err) {
//       console.error("❌ Error fetching categories:", err);
//     }
//   };

//   // ==============================
//   // Lifecycle
//   // ==============================
//   useEffect(() => {
//     fetchRestaurant();
//   }, []);

//   useEffect(() => {
//     if (restaurantId) {
//       fetchMenu(restaurantId);
//       fetchCategories(restaurantId); // 🆕 load categories
//     }
//   }, [restaurantId]);

//   // ==============================
//   // ADD ITEM
//   // ==============================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!restaurantId) return alert("Restaurant not loaded!");

//     try {
//       await api.post("/restaurantitems", { ...newItem, restaurantId });

//       setShowAddModal(false);
//       setNewItem({
//         name: "",
//         price: "",
//         category: "",
//         description: "",
//         image: "",
//         available: true,
//       });

//       fetchMenu(restaurantId);
//     } catch (err) {
//       console.error("❌ Save error:", err);
//       alert("Failed to save item.");
//     }
//   };

//   // ==============================
//   // DELETE
//   // ==============================
//   const confirmDelete = (id) => setDeleteItemId(id);

//   const handleDelete = async () => {
//     try {
//       await api.delete(`/restaurantitems/${deleteItemId}`);
//       setDeleteItemId(null);
//       fetchMenu(restaurantId);
//     } catch (err) {
//       console.error("❌ Delete error:", err);
//     }
//   };

//   // ==============================
//   // EDIT ITEM
//   // ==============================
//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setNewItem({
//       name: item.name,
//       price: item.price,
//       category: item.category,
//       description: item.description || "",
//       image: item.image || "",
//       available: item.available,
//     });
//     setShowEditModal(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/restaurantitems/${editingItem._id}`, {
//         ...newItem,
//         restaurantId,
//       });
//       setShowEditModal(false);
//       setEditingItem(null);
//       setNewItem({
//         name: "",
//         price: "",
//         category: "",
//         description: "",
//         image: "",
//         available: true,
//       });
//       fetchMenu(restaurantId);
//     } catch (err) {
//       console.error("❌ Update error:", err);
//     }
//   };

//   // ==============================
//   // Toggle availability
//   // ==============================
//   const toggleAvailability = async (item) => {
//     try {
//       await api.put(`/restaurantitems/${item._id}`, {
//         available: !item.available,
//       });
//       fetchMenu(restaurantId);
//     } catch (err) {
//       console.error("❌ Availability toggle error:", err);
//     }
//   };

//   // ==============================
//   // 🆕 Add new category
//   // ==============================
//   const handleAddCategory = async () => {
//     if (!newCategory.trim()) return;

//     try {
//       await api.post("/categories", {
//         restaurantId,
//         name: newCategory.trim(),
//       });

//       setCategories([...categories, newCategory.trim()]);
//       setNewCategory("");
//     } catch (err) {
//       console.error("❌ Add Category Error:", err);
//     }
//   };

//   // ==============================
//   // Stats
//   // ==============================
//   const totalItems = menu.length;
//   const uniqueCategories = [...new Set(menu.map((m) => m.category))].length;
//   const availableItems = menu.filter((m) => m.available !== false).length;
//   const unavailableItems = totalItems - availableItems;

//   // Group menu by category
//   const groupedMenu = menu.reduce((acc, item) => {
//     const cat = item.category || "Uncategorized";
//     if (!acc[cat]) acc[cat] = [];
//     acc[cat].push(item);
//     return acc;
//   }, {});

//   return (
//     <div className="menu-page">

//       {/* HEADER */}
//       <div className="menu-header">
//         <div>
//           <h1>Menu Management</h1>
//           <p>Manage menu items for your outlet</p>
//         </div>
//         <button className="add-menu-btn" onClick={() => setShowAddModal(true)}>
//           + Add Menu Item
//         </button>
//       </div>

//       {/* STATS */}
//       <div className="menu-stats">
//         <div className="stat-card"><h3>Total Items</h3><p>{totalItems}</p></div>
//         <div className="stat-card"><h3>Categories</h3><p>{uniqueCategories}</p></div>
//         <div className="stat-card"><h3>Available</h3><p className="green">{availableItems}</p></div>
//         <div className="stat-card"><h3>Unavailable</h3><p className="red">{unavailableItems}</p></div>
//       </div>

//       {/* MENU LIST */}
//       {Object.keys(groupedMenu).map((cat) => (
//         <div key={cat} className="menu-category">
//           <h2>{cat}</h2>
//           <div className="menu-grid">
//             {groupedMenu[cat].map((item) => (
//               <div key={item._id} className={`menu-card ${!item.available ? "unavailable" : ""}`}>

//                 <img src={item.image || "/default-food.png"} alt={item.name} className="menu-card-img" />

//                 <div className="menu-card-body">
//                   <div className="menu-card-top">
//                     <h3>{item.name}</h3>
//                     <button
//                       className={`power-btn ${item.available ? "active" : ""}`}
//                       onClick={() => toggleAvailability(item)}
//                     >
//                       <FaPowerOff />
//                     </button>
//                   </div>

//                   <p className="menu-desc">{item.description}</p>
//                   <p className="menu-price">₹{item.price}</p>

//                   <div className="menu-card-actions">
//                     <button className="icon-btn" onClick={() => handleEdit(item)}><FaEdit /></button>
//                     <button className="icon-btn" onClick={() => toggleAvailability(item)}><FaEyeSlash /></button>
//                     <button className="icon-btn delete" onClick={() => confirmDelete(item._id)}><FaTrash /></button>
//                   </div>

//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* =======================
//           ADD ITEM MODAL
//       ======================= */}
//       {showAddModal && (
//         <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
//           <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>Add Menu Item</h2>
//               <p>Add a new item to your menu</p>
//             </div>

//             <form onSubmit={handleSubmit} className="edit-popup-form">

//               {/* NAME */}
//               <label>Item Name</label>
//               <input
//                 type="text"
//                 value={newItem.name}
//                 onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//                 required
//               />

//               {/* DESCRIPTION */}
//               <label>Description</label>
//               <input
//                 type="text"
//                 value={newItem.description}
//                 onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
//               />

//               {/* PRICE + CATEGORY */}
//               <div className="form-row">

//                 <div>
//                   <label>Price (₹)</label>
//                   <input
//                     type="number"
//                     value={newItem.price}
//                     onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label>Category</label>
//                   <select
//                     value={newItem.category}
//                     onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//                     required
//                   >
//                     <option value="">Select</option>
//                     {categories.map((cat) => (
//                       <option key={cat}>{cat}</option>
//                     ))}
//                   </select>

//                   {/* 🆕 Add Custom Category Inline */}
//                   <div className="add-category-inline">
//                     <input
//                       type="text"
//                       placeholder="New category"
//                       value={newCategory}
//                       onChange={(e) => setNewCategory(e.target.value)}
//                     />
//                     <button type="button" onClick={handleAddCategory}>Add</button>
//                   </div>

//                 </div>

//               </div>

//               {/* IMAGE */}
//               <label>Image URL (optional)</label>
//               <input
//                 type="text"
//                 value={newItem.image}
//                 onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
//               />

//               {/* AVAILABLE */}
//               <div className="availability-toggle">
//                 <label>Available</label>
//                 <input
//                   type="checkbox"
//                   checked={newItem.available}
//                   onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
//                 />
//               </div>

//               {/* ACTIONS */}
//               <div className="modal-actions">
//                 <button type="button" className="cancel-btn-outline" onClick={() => setShowAddModal(false)}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="update-btn">
//                   Add Item
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//       {/* =======================
//           EDIT MODAL
//       ======================= */}
//       {showEditModal && (
//         <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
//           <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>Edit Menu Item</h2>
//               <p>Update menu item details</p>
//             </div>

//             <form onSubmit={handleUpdate} className="edit-popup-form">

//               {/* NAME */}
//               <label>Item Name</label>
//               <input
//                 type="text"
//                 value={newItem.name}
//                 onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//                 required
//               />

//               {/* DESCRIPTION */}
//               <label>Description</label>
//               <input
//                 type="text"
//                 value={newItem.description}
//                 onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
//               />

//               {/* PRICE + CATEGORY */}
//               <div className="form-row">
//                 <div>
//                   <label>Price (₹)</label>
//                   <input
//                     type="number"
//                     value={newItem.price}
//                     onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label>Category</label>
//                   <select
//                     value={newItem.category}
//                     onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//                   >
//                     {categories.map((cat) => (
//                       <option key={cat}>{cat}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* IMAGE */}
//               <label>Image URL (optional)</label>
//               <input
//                 type="text"
//                 value={newItem.image}
//                 onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
//               />

//               {/* ACTIONS */}
//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn-outline"
//                   onClick={() => setShowEditModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="update-btn">
//                   Update Item
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//       {/* =======================
//           DELETE CONFIRMATION
//       ======================= */}
//       {deleteItemId && (
//         <div className="modal-overlay" onClick={() => setDeleteItemId(null)}>
//           <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>Confirm Delete</h2>
//               <p>Are you sure you want to delete this item?</p>
//             </div>

//             <div className="modal-actions">
//               <button onClick={handleDelete} className="update-btn">
//                 Yes
//               </button>
//               <button
//                 onClick={() => setDeleteItemId(null)}
//                 className="cancel-btn-outline"
//               >
//                 Cancel
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default RestaurantMenu;




import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEyeSlash, FaPowerOff } from "react-icons/fa";
import api from "../utils/api";
import "../styles/RestaurantMenu.css";

// 🆕 Default categories
const defaultCategories = [
  "Starters",
  "Main Course",
  "Desserts",
  "Beverages",
  "Snacks",
  "Specials",
];

function RestaurantMenu() {
  const [menu, setMenu] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);

  // 🆕 dynamic categories state
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState("");

  // ⭐ UPDATED: Added isVeg
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    available: true,
    isVeg: true, // ⭐ NEW
  });

  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // ==============================
  // Fetch restaurant profile
  // ==============================
  const fetchRestaurant = async () => {
    try {
      const res = await api.get("/restaurants/profile");
      setRestaurantId(res.data._id);
    } catch (err) {
      console.error("❌ Error fetching restaurant profile:", err);
    }
  };

  // ==============================
  // Fetch menu items
  // ==============================
  const fetchMenu = async (id) => {
    if (!id) return;
    try {
      const res = await api.get(`/restaurantitems/restaurant/${id}`);
      setMenu(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching menu:", err);
    }
  };

  // ==============================
  // 🆕 Fetch custom categories
  // ==============================
  const fetchCategories = async (id) => {
    try {
      const res = await api.get(`/categories/${id}`);
      const custom = res.data.categories.map((c) => c.name);

      setCategories([...defaultCategories, ...custom]);
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
    }
  };

  // ==============================
  // Lifecycle
  // ==============================
  useEffect(() => {
    fetchRestaurant();
  }, []);

  useEffect(() => {
    if (restaurantId) {
      fetchMenu(restaurantId);
      fetchCategories(restaurantId);
    }
  }, [restaurantId]);

  // ==============================
  // ADD ITEM
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantId) return alert("Restaurant not loaded!");

    try {
      await api.post("/restaurantitems", { ...newItem, restaurantId });

      setShowAddModal(false);
      setNewItem({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
        available: true,
        isVeg: true,
      });

      fetchMenu(restaurantId);
    } catch (err) {
      console.error("❌ Save error:", err);
      alert("Failed to save item.");
    }
  };

  // ==============================
  // DELETE
  // ==============================
  const confirmDelete = (id) => setDeleteItemId(id);

  const handleDelete = async () => {
    try {
      await api.delete(`/restaurantitems/${deleteItemId}`);
      setDeleteItemId(null);
      fetchMenu(restaurantId);
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  // ==============================
  // EDIT ITEM
  // ==============================
  const handleEdit = (item) => {
    setEditingItem(item);

    // ⭐ UPDATED: include isVeg
    setNewItem({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description || "",
      image: item.image || "",
      available: item.available,
      isVeg: item.isVeg !== undefined ? item.isVeg : true, // ⭐ NEW
    });

    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/restaurantitems/${editingItem._id}`, {
        ...newItem,
        restaurantId,
      });

      setShowEditModal(false);
      setEditingItem(null);

      setNewItem({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
        available: true,
        isVeg: true,
      });

      fetchMenu(restaurantId);
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  };

  // ==============================
  // Toggle availability
  // ==============================
  const toggleAvailability = async (item) => {
    try {
      await api.put(`/restaurantitems/${item._id}`, {
        available: !item.available,
      });
      fetchMenu(restaurantId);
    } catch (err) {
      console.error("❌ Availability toggle error:", err);
    }
  };

  // ==============================
  // 🆕 Add new category
  // ==============================
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      await api.post("/categories", {
        restaurantId,
        name: newCategory.trim(),
      });

      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    } catch (err) {
      console.error("❌ Add Category Error:", err);
    }
  };

  // ==============================
  // Stats
  // ==============================
  const totalItems = menu.length;
  const uniqueCategories = [...new Set(menu.map((m) => m.category))].length;
  const availableItems = menu.filter((m) => m.available !== false).length;
  const unavailableItems = totalItems - availableItems;

  // Group menu by category
  const groupedMenu = menu.reduce((acc, item) => {
    const cat = item.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-page">
      {/* HEADER */}
      <div className="menu-header">
        <div>
          <h1>Menu Management</h1>
          <p>Manage menu items for your outlet</p>
        </div>
        <button className="add-menu-btn" onClick={() => setShowAddModal(true)}>
          + Add Menu Item
        </button>
      </div>

      {/* STATS */}
      <div className="menu-stats">
        <div className="stat-card"><h3>Total Items</h3><p>{totalItems}</p></div>
        <div className="stat-card"><h3>Categories</h3><p>{uniqueCategories}</p></div>
        <div className="stat-card"><h3>Available</h3><p className="green">{availableItems}</p></div>
        <div className="stat-card"><h3>Unavailable</h3><p className="red">{unavailableItems}</p></div>
      </div>

      {/* MENU LIST */}
      {Object.keys(groupedMenu).map((cat) => (
        <div key={cat} className="menu-category">
          <h2>{cat}</h2>
          <div className="menu-grid">
            {groupedMenu[cat].map((item) => (
              <div key={item._id} className={`menu-card ${!item.available ? "unavailable" : ""}`}>
                <img src={item.image || "/default-food.png"} alt={item.name} className="menu-card-img" />

                <div className="menu-card-body">
                  <div className="menu-card-top">
                    <h3>{item.name}</h3>
                    <button
                      className={`power-btn ${item.available ? "active" : ""}`}
                      onClick={() => toggleAvailability(item)}
                    >
                      <FaPowerOff />
                    </button>
                  </div>

                  <p className="menu-desc">{item.description}</p>
                  <p className="menu-price">₹{item.price}</p>

                  <div className="menu-card-actions">
                    <button className="icon-btn" onClick={() => handleEdit(item)}><FaEdit /></button>
                    <button className="icon-btn" onClick={() => toggleAvailability(item)}><FaEyeSlash /></button>
                    <button className="icon-btn delete" onClick={() => confirmDelete(item._id)}><FaTrash /></button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* =======================
          ADD ITEM MODAL
      ======================= */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Menu Item</h2>
              <p>Add a new item to your menu</p>
            </div>

            <form onSubmit={handleSubmit} className="edit-popup-form">

              {/* NAME */}
              <label>Item Name</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />

              {/* DESCRIPTION */}
              <label>Description</label>
              <input
                type="text"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />

              {/* PRICE + CATEGORY */}
              <div className="form-row">

                <div>
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label>Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    required
                  >
                    <option value="">Select</option>
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>

                  {/* 🆕 Add Custom Category */}
                  <div className="add-category-inline">
                    <input
                      type="text"
                      placeholder="New category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button type="button" onClick={handleAddCategory}>Add</button>
                  </div>

                </div>

              </div>

              {/* IMAGE */}
              <label>Image URL (optional)</label>
              <input
                type="text"
                value={newItem.image}
                onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              />

              {/* AVAILABLE */}
              <div className="availability-toggle">
                <label>Available</label>
                <input
                  type="checkbox"
                  checked={newItem.available}
                  onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                />
              </div>

              {/* ⭐ NEW: VEG / NON-VEG TOGGLE */}
              <div className="availability-toggle" style={{ marginTop: "0.8rem" }}>
                <label>{newItem.isVeg ? "Veg" : "Non-Veg"}</label>
                <input
                  type="checkbox"
                  checked={newItem.isVeg}
                  onChange={(e) =>
                    setNewItem({ ...newItem, isVeg: e.target.checked })
                  }
                />
              </div>

              {/* ACTIONS */}
              <div className="modal-actions">
                <button type="button" className="cancel-btn-outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="update-btn">
                  Add Item
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =======================
          EDIT MODAL
      ======================= */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Menu Item</h2>
              <p>Update menu item details</p>
            </div>

            <form onSubmit={handleUpdate} className="edit-popup-form">

              {/* NAME */}
              <label>Item Name</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />

              {/* DESCRIPTION */}
              <label>Description</label>
              <input
                type="text"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />

              {/* PRICE + CATEGORY */}
              <div className="form-row">
                <div>
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* IMAGE */}
              <label>Image URL (optional)</label>
              <input
                type="text"
                value={newItem.image}
                onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              />

              {/* ⭐ EDIT MODAL VEG/NON-VEG */}
              <div className="availability-toggle" style={{ marginTop: "0.8rem" }}>
                <label>{newItem.isVeg ? "Veg" : "Non-Veg"}</label>
                <input
                  type="checkbox"
                  checked={newItem.isVeg}
                  onChange={(e) =>
                    setNewItem({ ...newItem, isVeg: e.target.checked })
                  }
                />
              </div>

              {/* ACTIONS */}
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn-outline"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="update-btn">
                  Update Item
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =======================
          DELETE CONFIRMATION
      ======================= */}
      {deleteItemId && (
        <div className="modal-overlay" onClick={() => setDeleteItemId(null)}>
          <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this item?</p>
            </div>

            <div className="modal-actions">
              <button onClick={handleDelete} className="update-btn">
                Yes
              </button>
              <button
                onClick={() => setDeleteItemId(null)}
                className="cancel-btn-outline"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default RestaurantMenu;
