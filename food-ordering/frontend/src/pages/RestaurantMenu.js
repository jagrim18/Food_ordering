// // frontend/src/pages/RestaurantMenu.js
// import { useEffect, useState } from "react";
// import api from "../utils/api";
// import "../styles/RestaurantMenu.css";

// function RestaurantMenu() {
//   const [menu, setMenu] = useState([]);
//   const [newItem, setNewItem] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//     image: "",
//   });
//   const [editingItem, setEditingItem] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);

//   // 🧩 Fetch restaurant's own menu items
//   const fetchMenu = async () => {
//     try {
//       const res = await api.get("/menu"); // restaurant sees their own items via token
//       setMenu(res.data.data || []);
//     } catch (err) {
//       console.error("❌ Error fetching menu:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   // ➕ Add New Item
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/menu", newItem);
//       setNewItem({ name: "", price: "", category: "", description: "", image: "" });
//       fetchMenu();
//     } catch (err) {
//       console.error("❌ Save error:", err);
//       alert("Failed to save item. Please check inputs or login again.");
//     }
//   };

//   // 🗑️ Delete Item
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       try {
//         await api.delete(`/menu/${id}`);
//         fetchMenu();
//       } catch (err) {
//         console.error("❌ Delete error:", err);
//       }
//     }
//   };

//   // ✏️ Open Edit Modal
//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setNewItem({
//       name: item.name,
//       price: item.price,
//       category: item.category,
//       description: item.description || "",
//       image: item.image || "",
//     });
//     setShowEditModal(true);
//   };

//   // 💾 Save Edited Item
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/menu/${editingItem._id}`, newItem);
//       setShowEditModal(false);
//       setEditingItem(null);
//       setNewItem({ name: "", price: "", category: "", description: "", image: "" });
//       fetchMenu();
//     } catch (err) {
//       console.error("❌ Update error:", err);
//     }
//   };

//   return (
//     <div className="menu-container">
//       <h2>🍽️ Manage Menu</h2>

//       {/* 🧾 Add New Item Form */}
//       <form className="menu-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Item Name"
//           value={newItem.name}
//           onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newItem.price}
//           onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={newItem.category}
//           onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description (optional)"
//           value={newItem.description}
//           onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={newItem.image}
//           onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
//         />

//         <button type="submit" className="add-btn">
//           Add Item
//         </button>
//       </form>

//       {/* 📋 Menu List */}
//       <div className="menu-grid">
//         {menu.length === 0 ? (
//           <p className="no-items">No items in your menu yet.</p>
//         ) : (
//           menu.map((item) => (
//             <div key={item._id} className="menu-card">
//               <img
//                 src={item.image || "/default-food.png"}
//                 alt={item.name}
//                 className="menu-image"
//               />
//               <div className="menu-info">
//                 <h3>{item.name}</h3>
//                 <p className="category">{item.category}</p>
//                 <p className="price">₹{item.price}</p>
//                 {item.description && <p className="desc">{item.description}</p>}
//               </div>
//               <div className="menu-actions">
//                 <button className="edit-btn" onClick={() => handleEdit(item)}>
//                   ✏️ Edit
//                 </button>
//                 <button className="delete-btn" onClick={() => handleDelete(item._id)}>
//                   🗑️ Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* ✏️ Edit Modal */}
//       {showEditModal && (
//         <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3>Edit Menu Item</h3>
//             <form onSubmit={handleUpdate} className="edit-form">
//               <input
//                 type="text"
//                 value={newItem.name}
//                 onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//                 required
//               />
//               <input
//                 type="number"
//                 value={newItem.price}
//                 onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 value={newItem.category}
//                 onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 value={newItem.description}
//                 onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
//               />
//               <input
//                 type="text"
//                 value={newItem.image}
//                 onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
//               />
//               <div className="modal-actions">
//                 <button type="submit" className="save-btn">
//                   💾 Save
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowEditModal(false)}
//                 >
//                   ❌ Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RestaurantMenu;





// import { useEffect, useState } from "react";
// import api from "../utils/api";
// import "../styles/RestaurantMenu.css";

// function RestaurantMenu() {
//   const [menu, setMenu] = useState([]);
//   const [categories] = useState([
//     "Starters",
//     "Main Course",
//     "Desserts",
//     "Beverages",
//     "Snacks",
//     "Specials",
//   ]);
//   const [newItem, setNewItem] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//     image: "",
//   });
//   const [editingItem, setEditingItem] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [deleteItemId, setDeleteItemId] = useState(null);

//   // 🧩 Fetch restaurant's own menu items
//   const fetchMenu = async () => {
//     try {
//       const res = await api.get("/menu");
//       setMenu(res.data.data || []);
//     } catch (err) {
//       console.error("❌ Error fetching menu:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   // ➕ Add New Item
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/menu", newItem);
//       setNewItem({
//         name: "",
//         price: "",
//         category: "",
//         description: "",
//         image: "",
//       });
//       fetchMenu();
//     } catch (err) {
//       console.error("❌ Save error:", err);
//       alert("Failed to save item. Please check inputs or login again.");
//     }
//   };

//   // 🗑️ Delete Item (with popup)
//   const confirmDelete = (id) => {
//     setDeleteItemId(id);
//   };

//   const handleDelete = async () => {
//     try {
//       await api.delete(`/menu/${deleteItemId}`);
//       setDeleteItemId(null);
//       fetchMenu();
//     } catch (err) {
//       console.error("❌ Delete error:", err);
//     }
//   };

//   // ✏️ Open Edit Modal
//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setNewItem({
//       name: item.name,
//       price: item.price,
//       category: item.category,
//       description: item.description || "",
//       image: item.image || "",
//     });
//     setShowEditModal(true);
//   };

//   // 💾 Save Edited Item
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/menu/${editingItem._id}`, newItem);
//       setShowEditModal(false);
//       setEditingItem(null);
//       setNewItem({
//         name: "",
//         price: "",
//         category: "",
//         description: "",
//         image: "",
//       });
//       fetchMenu();
//     } catch (err) {
//       console.error("❌ Update error:", err);
//     }
//   };

//   return (
//     <div className="menu-container">
//       <h2>🍽️ Manage Menu</h2>

//       {/* 🧾 Add New Item Form */}
//       <form className="menu-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Item Name"
//           value={newItem.name}
//           onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Price (₹)"
//           value={newItem.price}
//           onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//           required
//         />

//         <select
//           value={newItem.category}
//           onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//           required
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat, idx) => (
//             <option key={idx} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           placeholder="Description (optional)"
//           value={newItem.description}
//           onChange={(e) =>
//             setNewItem({ ...newItem, description: e.target.value })
//           }
//         />

//         <input
//           type="text"
//           placeholder="Image URL"
//           value={newItem.image}
//           onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
//         />

//         <button type="submit" className="add-btn">
//           ➕ Add Item
//         </button>
//       </form>

//       {/* 📋 Menu Grid */}
//       <div className="menu-grid">
//         {menu.length === 0 ? (
//           <p className="no-items">No items in your menu yet.</p>
//         ) : (
//           menu.map((item) => (
//             <div key={item._id} className="menu-card">
//               <img
//                 src={item.image || "/default-food.png"}
//                 alt={item.name}
//                 className="menu-image"
//               />
//               <div className="menu-info">
//                 <h3>{item.name}</h3>
//                 <p className="category">{item.category}</p>
//                 <p className="price">₹{item.price}</p>
//                 {item.description && (
//                   <p className="desc">{item.description}</p>
//                 )}
//               </div>
//               <div className="menu-actions">
//                 <button className="edit-btn" onClick={() => handleEdit(item)}>
//                   ✏️ Edit
//                 </button>
//                 <button
//                   className="delete-btn"
//                   onClick={() => confirmDelete(item._id)}
//                 >
//                   🗑️ Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* ✏️ Edit Modal */}
//       {showEditModal && (
//         <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3>Edit Menu Item</h3>
//             <form onSubmit={handleUpdate} className="edit-form">
//               <label>🍽️ Item Name</label>
//               <input
//                 type="text"
//                 value={newItem.name}
//                 onChange={(e) =>
//                   setNewItem({ ...newItem, name: e.target.value })
//                 }
//                 required
//               />

//               <label>💰 Price (₹)</label>
//               <input
//                 type="number"
//                 value={newItem.price}
//                 onChange={(e) =>
//                   setNewItem({ ...newItem, price: e.target.value })
//                 }
//                 required
//               />

//               <label>📂 Category</label>
//               <select
//                 value={newItem.category}
//                 onChange={(e) =>
//                   setNewItem({ ...newItem, category: e.target.value })
//                 }
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat, idx) => (
//                   <option key={idx} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>

//               <label>📝 Description</label>
//               <input
//                 type="text"
//                 value={newItem.description}
//                 onChange={(e) =>
//                   setNewItem({ ...newItem, description: e.target.value })
//                 }
//               />

//               <label>🖼️ Image URL</label>
//               <input
//                 type="text"
//                 value={newItem.image}
//                 onChange={(e) =>
//                   setNewItem({ ...newItem, image: e.target.value })
//                 }
//               />

//               <div className="modal-actions">
//                 <button type="submit" className="save-btn">
//                   💾 Save
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowEditModal(false)}
//                 >
//                   ❌ Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ⚠️ Delete Confirmation */}
//       {deleteItemId && (
//         <div className="modal-overlay" onClick={() => setDeleteItemId(null)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3 style={{ color: "#ff4d4d" }}>⚠️ Confirm Delete</h3>
//             <p style={{ textAlign: "center", color: "#ccc" }}>
//               Are you sure you want to permanently delete this menu item?
//             </p>
//             <div className="modal-actions">
//               <button className="save-btn" onClick={handleDelete}>
//                 ✅ Yes, Delete
//               </button>
//               <button
//                 className="cancel-btn"
//                 onClick={() => setDeleteItemId(null)}
//               >
//                 ❌ Cancel
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
import api from "../utils/api";
import "../styles/RestaurantMenu.css";

function RestaurantMenu() {
  const [menu, setMenu] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  const [categories] = useState([
    "Starters",
    "Main Course",
    "Desserts",
    "Beverages",
    "Snacks",
    "Specials",
  ]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // ✅ 1. Fetch logged-in restaurant profile
  const fetchRestaurant = async () => {
    try {
      const res = await api.get("/restaurants/profile");
      setRestaurantId(res.data._id);
    } catch (err) {
      console.error("❌ Error fetching restaurant profile:", err);
    }
  };

  // ✅ 2. Fetch restaurant’s menu items from restaurantitems collection
  const fetchMenu = async (id) => {
    if (!id) return;
    try {
      const res = await api.get(`/restaurantitems/restaurant/${id}`);
      setMenu(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching menu:", err);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  useEffect(() => {
    if (restaurantId) fetchMenu(restaurantId);
  }, [restaurantId]);

  // ✅ 3. Add New Item (saves to restaurantitems)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantId) return alert("Restaurant not loaded yet!");
    try {
      await api.post("/restaurantitems", { ...newItem, restaurantId });
      setNewItem({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
      });
      fetchMenu(restaurantId);
    } catch (err) {
      console.error("❌ Save error:", err);
      alert("Failed to save item. Please check inputs or login again.");
    }
  };

  // 🗑️ 4. Delete Item
  const confirmDelete = (id) => {
    setDeleteItemId(id);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/restaurantitems/${deleteItemId}`);
      setDeleteItemId(null);
      fetchMenu(restaurantId);
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  // ✏️ 5. Edit Item
  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description || "",
      image: item.image || "",
    });
    setShowEditModal(true);
  };

  // 💾 6. Save Updated Item
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
      });
      fetchMenu(restaurantId);
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  };

  return (
    <div className="menu-container">
      <h2>🍽️ Manage Menu</h2>

      {/* 🧾 Add New Item Form */}
      <form className="menu-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price (₹)"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          required
        />

        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Description (optional)"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
        />

        <button type="submit" className="add-btn">
          ➕ Add Item
        </button>
      </form>

      {/* 📋 Menu Grid */}
      <div className="menu-grid">
        {menu.length === 0 ? (
          <p className="no-items">No items in your menu yet.</p>
        ) : (
          menu.map((item) => (
            <div key={item._id} className="menu-card">
              <img
                src={item.image || "/default-food.png"}
                alt={item.name}
                className="menu-image"
              />
              <div className="menu-info">
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="price">₹{item.price}</p>
                {item.description && (
                  <p className="desc">{item.description}</p>
                )}
              </div>
              <div className="menu-actions">
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => confirmDelete(item._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✏️ Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Menu Item</h3>
            <form onSubmit={handleUpdate} className="edit-form">
              <label>🍽️ Item Name</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                required
              />

              <label>💰 Price (₹)</label>
              <input
                type="number"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                required
              />

              <label>📂 Category</label>
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <label>📝 Description</label>
              <input
                type="text"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              />

              <label>🖼️ Image URL</label>
              <input
                type="text"
                value={newItem.image}
                onChange={(e) =>
                  setNewItem({ ...newItem, image: e.target.value })
                }
              />

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  💾 Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ⚠️ Delete Confirmation */}
      {deleteItemId && (
        <div className="modal-overlay" onClick={() => setDeleteItemId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "#ff4d4d" }}>⚠️ Confirm Delete</h3>
            <p style={{ textAlign: "center", color: "#ccc" }}>
              Are you sure you want to permanently delete this menu item?
            </p>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleDelete}>
                ✅ Yes, Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => setDeleteItemId(null)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantMenu;
