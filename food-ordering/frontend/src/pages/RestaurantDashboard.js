// import React, { useState, useEffect } from "react";
// import api from "../utils/api";
// import { useNavigate } from "react-router-dom";
// import "../styles/RestaurantDashboard.css";

// function RestaurantDashboard() {
//   const navigate = useNavigate();
//   const [restaurant, setRestaurant] = useState(null);
//   const [menu, setMenu] = useState([]);
//   const [newItem, setNewItem] = useState({
//     name: "",
//     price: "",
//     category: "",
//     image: "",
//     available: true,
//   });
//   const [error, setError] = useState("");
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   // ✅ Load restaurant info
//   useEffect(() => {
//     const stored = localStorage.getItem("restaurant");
//     if (!stored) {
//       navigate("/restaurant/login");
//       return;
//     }
//     try {
//       const parsed = JSON.parse(stored);
//       setRestaurant(parsed);
//       fetchMenu(parsed._id);
//       fetchProfile(); // load gallery
//     } catch (err) {
//       console.error("Invalid restaurant JSON:", err);
//       navigate("/restaurant/login");
//     }
//   }, [navigate]);

//   // ✅ Fetch menu
//   const fetchMenu = async (restaurantId) => {
//     try {
//       const res = await api.get(`/restaurantitems/${restaurantId}`);
//       setMenu(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch items:", err);
//     }
//   };

//   // ✅ Fetch profile (for gallery)
//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await api.get("/restaurants/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setGalleryImages(res.data.galleryImages || []);
//     } catch (err) {
//       console.error("Failed to fetch profile:", err);
//     }
//   };

//   // ✅ Add menu item
//   const handleAddItem = async (e) => {
//     e.preventDefault();
//     if (!newItem.name || !newItem.price) return alert("Name and price required!");
//     try {
//       const res = await api.post("/restaurantitems", {
//         ...newItem,
//         restaurantId: restaurant._id,
//       });
//       setMenu([...menu, res.data]);
//       setNewItem({ name: "", price: "", category: "", image: "", available: true });
//     } catch (err) {
//       console.error("Add failed:", err);
//       setError("Failed to add item.");
//     }
//   };

//   // ✅ Delete item
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;
//     try {
//       await api.delete(`/restaurantitems/${id}`);
//       setMenu(menu.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   // ✅ Edit item
//   const handleEdit = async (id, item) => {
//     const name = prompt("Enter new name:", item.name);
//     const price = prompt("Enter new price:", item.price);
//     const available = window.confirm("Is this item available?");
//     const updated = { ...item, name, price, available };

//     try {
//       const res = await api.put(`/restaurantitems/${id}`, updated);
//       setMenu(menu.map((m) => (m._id === id ? res.data : m)));
//     } catch (err) {
//       console.error("Edit failed:", err);
//     }
//   };

//   // ✅ Upload gallery images
//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;
//     if (galleryImages.length + files.length > 10) {
//       alert("You can only upload up to 10 images.");
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append("images", file));

//     try {
//       setUploading(true);
//       const token = localStorage.getItem("token");
//       const res = await api.post("/restaurants/upload-gallery", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setGalleryImages(res.data.galleryImages);
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       alert("Failed to upload images.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✅ Delete gallery image (optional)
//   const handleRemoveImage = async (imgUrl) => {
//     if (!window.confirm("Remove this image?")) return;
//     try {
//       const updated = galleryImages.filter((img) => img !== imgUrl);
//       const token = localStorage.getItem("token");
//       await api.put(
//         "/restaurants/profile",
//         { galleryImages: updated },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setGalleryImages(updated);
//     } catch (err) {
//       console.error("Failed to remove image:", err);
//     }
//   };

//   // ✅ Logout
//   const handleLogout = () => {
//     localStorage.removeItem("restaurant");
//     localStorage.removeItem("token");
//     navigate("/restaurant/login");
//   };

//   return (
//     <div className="restaurant-dashboard-page">
//       <div className="dashboard-container">
//         {/* Header */}
//         {restaurant && (
//           <div className="dashboard-header">
//             <h1 className="dashboard-title">Welcome, {restaurant.name} 🍴</h1>
//             <div>
//               <button
//                 onClick={() => navigate("/restaurant/orders")}
//                 className="orders-btn"
//               >
//                 View Orders
//               </button>
//               <button onClick={handleLogout} className="logout-btn">
//                 Logout
//               </button>
//             </div>
//           </div>
//         )}

//         {error && <p className="error-message">{error}</p>}

//         {/* ===========================
//             📸 Gallery Upload Section
//         ============================ */}
//         <div className="gallery-section">
//           <h2 className="section-title">Your Dish Gallery</h2>

//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageUpload}
//             disabled={uploading}
//           />

//           {uploading && <p>Uploading images...</p>}

//           <div className="gallery-container">
//             {galleryImages.length > 0 ? (
//               <div className="scroll-gallery">
//                 {galleryImages.map((img, i) => (
//                   <div key={i} className="gallery-item">
//                     <img
//                       src={img}
//                       alt={`dish-${i}`}
//                       className="gallery-img"
//                     />
//                     <button
//                       className="delete-gallery-btn"
//                       onClick={() => handleRemoveImage(img)}
//                     >
//                       ✖
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No gallery images yet. Upload some dishes!</p>
//             )}
//           </div>
//         </div>

//         {/* Add Item Form */}
//         <form onSubmit={handleAddItem} className="add-item-form">
//           <input
//             type="text"
//             placeholder="Item Name"
//             value={newItem.name}
//             onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newItem.price}
//             onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={newItem.category}
//             onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={newItem.image}
//             onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
//           />
//           <select
//             value={newItem.available}
//             onChange={(e) =>
//               setNewItem({ ...newItem, available: e.target.value === "true" })
//             }
//           >
//             <option value="true">Available</option>
//             <option value="false">Unavailable</option>
//           </select>
//           <button type="submit" className="add-btn">
//             Add Item
//           </button>
//         </form>

//         {/* Menu List */}
//         <h2 className="menu-title">Your Menu</h2>
//         <div className="menu-list">
//           {menu.length > 0 ? (
//             menu.map((item) => (
//               <div key={item._id} className="menu-item">
//                 <div className="menu-item-info">
//                   <img
//                     src={item.image || "https://via.placeholder.com/80"}
//                     alt={item.name}
//                     className="menu-item-img"
//                   />
//                   <div>
//                     <span className="item-name">{item.name}</span>
//                     <p>₹{item.price}</p>
//                     <p>{item.available ? "🟢 Available" : "🔴 Unavailable"}</p>
//                   </div>
//                 </div>
//                 <div className="menu-actions">
//                   <button onClick={() => handleEdit(item._id, item)} className="edit-btn">
//                     Edit
//                   </button>
//                   <button onClick={() => handleDelete(item._id)} className="delete-btn">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="empty-message">No items yet. Add your first menu item!</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RestaurantDashboard;









import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/RestaurantDashboard.css";

function RestaurantDashboard() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    available: true,
  });
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("restaurant");
    if (!stored) {
      navigate("/restaurant/login");
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      setRestaurant(parsed);
      fetchMenu(parsed._id);
      fetchProfile();
    } catch (err) {
      navigate("/restaurant/login");
    }
  }, [navigate]);

  const fetchMenu = async (restaurantId) => {
    try {
      const res = await api.get(`/restaurantitems/${restaurantId}`);
      setMenu(res.data || []);
      setFilteredMenu(res.data || []);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/restaurants/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGalleryImages(res.data.galleryImages || []);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  // ===============================
  // 🧁 MENU CRUD
  // ===============================
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return alert("Name & Price required!");

    try {
      const res = await api.post("/restaurantitems", {
        ...newItem,
        restaurantId: restaurant._id,
      });
      const updatedMenu = [...menu, res.data];
      setMenu(updatedMenu);
      setFilteredMenu(updatedMenu);
      setNewItem({ name: "", price: "", category: "", image: "", available: true });
    } catch (err) {
      setError("Failed to add item.");
    }
  };

  const handleEdit = async (id, field, value) => {
    try {
      const updatedItem = menu.find((item) => item._id === id);
      updatedItem[field] = value;
      const res = await api.put(`/restaurantitems/${id}`, updatedItem);
      const updatedMenu = menu.map((m) => (m._id === id ? res.data : m));
      setMenu(updatedMenu);
      setFilteredMenu(updatedMenu);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await api.delete(`/restaurantitems/${id}`);
      const updated = menu.filter((m) => m._id !== id);
      setMenu(updated);
      setFilteredMenu(updated);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const toggleAvailability = async (id, available) => {
    try {
      const item = menu.find((m) => m._id === id);
      const res = await api.put(`/restaurantitems/${id}`, { ...item, available });
      const updatedMenu = menu.map((m) => (m._id === id ? res.data : m));
      setMenu(updatedMenu);
      setFilteredMenu(updatedMenu);
    } catch (err) {
      console.error("Failed to update availability:", err);
    }
  };

  // ===============================
  // 📸 IMAGE UPLOAD
  // ===============================
  const handleImageUpload = async (files) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;
    if (galleryImages.length + fileArray.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    const formData = new FormData();
    fileArray.forEach((f) => formData.append("images", f));

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const res = await api.post("/restaurants/upload-gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setGalleryImages(res.data.galleryImages);
    } catch (err) {
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = () => setDragActive(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  // ===============================
  // 🔍 FILTER + SEARCH
  // ===============================
  useEffect(() => {
    let data = menu;
    if (filterCategory !== "All") {
      data = data.filter((item) => item.category === filterCategory);
    }
    if (search.trim()) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredMenu(data);
  }, [filterCategory, search, menu]);

  // ===============================
  // 🚪 Logout
  // ===============================
  const handleLogout = () => {
    localStorage.removeItem("restaurant");
    localStorage.removeItem("token");
    navigate("/restaurant/login");
  };

  return (
    <div className="restaurant-dashboard">
      {restaurant && (
        <header className="dashboard-header">
          <h1>Welcome, {restaurant.name} 🍽️</h1>
          <div className="header-buttons">
            <button onClick={() => navigate("/restaurant/orders")}>Orders</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>
      )}

      {/* ===================== GALLERY ===================== */}
      <section className="gallery-section">
        <h2>Dish Gallery</h2>
        <div
          className={`dropzone ${dragActive ? "active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag & Drop or Click to Upload (max 10)</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e.target.files)}
          />
        </div>
        {uploading && <p>Uploading...</p>}
        <div className="gallery-grid">
          {galleryImages.map((img, i) => (
            <div key={i} className="gallery-card">
              <img src={img} alt={`dish-${i}`} />
            </div>
          ))}
        </div>
      </section>

      {/* ===================== ADD ITEM ===================== */}
      <section className="add-item-section">
        <h2>Add Menu Item</h2>
        <form onSubmit={handleAddItem} className="add-item-form">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newItem.image}
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          />
          <button type="submit">Add Item</button>
        </form>
      </section>

      {/* ===================== FILTER + MENU ===================== */}
      <section className="menu-section">
        <div className="menu-filters">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option>All</option>
            <option>Starters</option>
            <option>Main Course</option>
            <option>Beverages</option>
            <option>Desserts</option>
          </select>
        </div>

        <div className="menu-grid">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <div key={item._id} className="menu-card">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                />
                <div className="menu-info">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleEdit(item._id, "name", e.target.value)}
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleEdit(item._id, "price", e.target.value)}
                  />
                  <p>{item.category}</p>
                  <div className="menu-actions">
                    <label>
                      <input
                        type="checkbox"
                        checked={item.available}
                        onChange={(e) =>
                          toggleAvailability(item._id, e.target.checked)
                        }
                      />
                      {item.available ? "Available" : "Unavailable"}
                    </label>
                    <button onClick={() => handleDelete(item._id)}>🗑</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default RestaurantDashboard;
