// // src/pages/AdminOutlets.jsx
// import { useEffect, useState, useContext, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/AdminOutlets.css";

// const API_BASE =
//   process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// /*
//   Updated AdminOutlets component — layout and markup adjusted so each
//   restaurant card visually matches the "Image 2" white card design.
//   - Uses the uploaded fallback image path when outlet.image is missing.
//   - Keeps all existing behavior (edit modal, toggle status, add/update).
//   - Ready to paste; preserves endpoints and existing handlers.
// */

// function AdminOutlets() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [outlets, setOutlets] = useState([]);
//   const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedOutlet, setSelectedOutlet] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     openTime: "09:00",
//     closeTime: "18:00",
//     image: "",
//     isOpen: true,
//   });

//   // ============================
//   // Fetch Outlets
//   // ============================
//   const fetchOutlets = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/outlets");
//       const performance = res.data?.performance || [];

//       setOutlets(performance);
//       setStats({
//         total: performance.length,
//         open: performance.filter((o) => o.isOpen).length,
//         closed: performance.filter((o) => !o.isOpen).length,
//       });
//     } catch (err) {
//       console.error("❌ Error fetching outlets:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!user || user.role !== "admin") {
//       navigate("/admin/login");
//       return;
//     }
//     fetchOutlets();
//   }, [user, navigate, fetchOutlets]);

//   // ============================
//   // Form Change Handler
//   // ============================
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // ============================
//   // Add Outlet
//   // ============================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/restaurants/register", {
//         name: formData.name,
//         restaurantName: formData.name,
//         description: formData.description,
//         openTime: formData.openTime,
//         closeTime: formData.closeTime,
//         image: formData.image,
//         isOpen: formData.isOpen,
//       });

//       setShowModal(false);
//       fetchOutlets();
//       setFormData({
//         name: "",
//         description: "",
//         openTime: "09:00",
//         closeTime: "18:00",
//         image: "",
//         isOpen: true,
//       });
//     } catch (err) {
//       console.error("❌ Failed to add outlet:", err);
//       alert("Error adding outlet. Please try again.");
//     }
//   };

//   // ============================
//   // Open Modal for Editing
//   // ============================
//   const openEditModal = (outlet) => {
//     setIsEditing(true);
//     setSelectedOutlet(outlet);

//     setFormData({
//       name: outlet.name || outlet.restaurantName || "",
//       description: outlet.description || "",
//       openTime: outlet.openTime || "09:00",
//       closeTime: outlet.closeTime || "18:00",
//       image: outlet.image || "/mnt/data/d1c1c1ec-9094-4895-9d13-87cd2fad54ae.png",
//       isOpen: outlet.isOpen ?? true,
//     });

//     setShowModal(true);
//   };

//   // ============================
//   // Update Outlet
//   // ============================
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!selectedOutlet?._id) return alert("No outlet selected");

//     try {
//       await api.put(`/restaurants/${selectedOutlet._id}`, {
//         restaurantName: formData.name,
//         description: formData.description,
//         openTime: formData.openTime,
//         closeTime: formData.closeTime,
//         image: formData.image,
//         profileImage: formData.image,
//         isOpen: formData.isOpen,
//       });

//       setShowModal(false);
//       setIsEditing(false);
//       setSelectedOutlet(null);
//       fetchOutlets();
//     } catch (err) {
//       console.error("❌ Failed to update outlet:", err);
//       alert("Error updating outlet. Please try again.");
//     }
//   };

//   // ============================
//   // Toggle Open / Close
//   // ============================
//   const toggleOutletStatus = async (outlet) => {
//     try {
//       const updatedStatus = !outlet.isOpen;

//       await api.put(`/restaurants/${outlet._id}`, {
//         isOpen: updatedStatus,
//       });

//       setOutlets((prev) =>
//         prev.map((o) =>
//           o._id === outlet._id ? { ...o, isOpen: updatedStatus } : o
//         )
//       );

//       setStats((prev) => ({
//         ...prev,
//         open: prev.open + (updatedStatus ? 1 : -1),
//         closed: prev.closed + (updatedStatus ? -1 : 1),
//       }));
//     } catch (err) {
//       console.error("❌ Failed to toggle outlet:", err);
//       alert("Error updating outlet status");
//     }
//   };

//   // ============================
//   // Delete (placeholder)
//   // ============================
//   const handleDelete = async (outlet) => {
//     if (!window.confirm("Are you sure you want to delete this outlet?")) return;
//     try {
//       await api.delete(`/restaurants/${outlet._id}`);
//       setOutlets((prev) => prev.filter((o) => o._id !== outlet._id));
//       setStats((prev) => ({
//         total: prev.total - 1,
//         open: prev.open - (outlet.isOpen ? 1 : 0),
//         closed: prev.closed - (!outlet.isOpen ? 1 : 0),
//       }));
//     } catch (err) {
//       console.error("❌ Failed to delete outlet:", err);
//       alert("Error deleting outlet");
//     }
//   };

//   // ============================
//   // UI
//   // ============================
//   return (
//     <div className="admin-outlets">
//       <header className="outlets-header">
//         <div>
//           <h1 className="outlets-title">Outlet Management</h1>
//           <p className="outlets-subtitle">Manage all campus food outlets</p>
//         </div>

//         <div className="header-actions">
//           <button
//             className="add-outlet-btn"
//             onClick={() => {
//               setIsEditing(false);
//               setSelectedOutlet(null);
//               setFormData({
//                 name: "",
//                 description: "",
//                 openTime: "09:00",
//                 closeTime: "18:00",
//                 image: "",
//                 isOpen: true,
//               });
//               setShowModal(true);
//             }}
//           >
//             + Add Outlet
//           </button>
//         </div>
//       </header>

//       <div className="outlets-stats">
//         <div className="outlet-stat-card">
//           <h2>{stats.total}</h2>
//           <p>Total Outlets</p>
//         </div>
//         <div className="outlet-stat-card">
//           <h2 className="green">{stats.open}</h2>
//           <p>Currently Open</p>
//         </div>
//         <div className="outlet-stat-card">
//           <h2 className="red">{stats.closed}</h2>
//           <p>Currently Closed</p>
//         </div>
//       </div>

//       {/* OUTLETS GRID */}
//       {loading ? (
//         <p className="loading-text">Loading outlets...</p>
//       ) : outlets.length > 0 ? (
//         <div className="outlets-grid">
//           {outlets.map((outlet, index) => {
//             const imageUrl = outlet.image
//               ? `${API_BASE}${outlet.image}`
//               : "/mnt/data/d1c1c1ec-9094-4895-9d13-87cd2fad54ae.png"; // uploaded fallback image path
//             return (
//               <article
//                 key={String(outlet._id || index)}
//                 className="restaurant-card"
//               >
//                 <div className="restaurant-image-wrap">
//                   <img
//                     src={imageUrl}
//                     alt={outlet.name || outlet.restaurantName}
//                     className="restaurant-image"
//                     onError={(e) => {
//                       e.currentTarget.onerror = null;
//                       e.currentTarget.src =
//                         "/mnt/data/d1c1c1ec-9094-4895-9d13-87cd2fad54ae.png";
//                     }}
//                   />
//                   <div className={`status-pill ${outlet.isOpen ? "open" : "closed"}`}>
//                     {outlet.isOpen ? "Open" : "Closed"}
//                   </div>
//                 </div>

//                 <div className="restaurant-body">
//                   <div className="restaurant-info">
//                     <h3 className="restaurant-title">
//                       {outlet.name || outlet.restaurantName}
//                     </h3>
//                     <p className="restaurant-desc">
//                       {outlet.description || "Fresh meals and beverages"}
//                     </p>
//                   </div>

//                   <div className="restaurant-meta">
//                     <div className="hours">
//                       <span className="clock">🕒</span>
//                       <span>
//                         {outlet.openTime || "09:00"} - {outlet.closeTime || "18:00"}
//                       </span>
//                     </div>

//                     <div className="actions-row">
//                       <button
//                         className="btn btn-edit"
//                         onClick={() => openEditModal(outlet)}
//                       >
//                         ✎ Edit
//                       </button>

//                       <button
//                         className="btn btn-toggle"
//                         onClick={() => toggleOutletStatus(outlet)}
//                       >
//                         {outlet.isOpen ? "Close" : "Open"}
//                       </button>

//                       <button
//                         className="btn btn-delete"
//                         onClick={() => handleDelete(outlet)}
//                         title="Delete outlet"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       ) : (
//         <p className="no-outlets">No outlets found</p>
//       )}

//       {/* ============================
//           MODAL
//       ============================ */}
//       {showModal && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>{isEditing ? "Edit Outlet" : "Add New Outlet"}</h2>
//               <p>
//                 {isEditing
//                   ? "Update outlet information"
//                   : "Add a new food outlet to the campus"}
//               </p>
//               <button
//                 className="close-modal"
//                 onClick={() => setShowModal(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             <form
//               className="modal-form"
//               onSubmit={isEditing ? handleUpdate : handleSubmit}
//             >
//               <label>Outlet Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />

//               <label>Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />

//               <div className="time-fields">
//                 <div>
//                   <label>Opening Time</label>
//                   <input
//                     type="time"
//                     name="openTime"
//                     value={formData.openTime}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label>Closing Time</label>
//                   <input
//                     type="time"
//                     name="closeTime"
//                     value={formData.closeTime}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <label>Image URL (optional)</label>
//               <input
//                 type="text"
//                 name="image"
//                 value={formData.image}
//                 placeholder="/uploads/restaurants/example.png"
//                 onChange={handleChange}
//               />

//               <div className="switch-row">
//                 <label>Currently Open</label>
//                 <input
//                   type="checkbox"
//                   name="isOpen"
//                   checked={formData.isOpen}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="submit-btn">
//                   {isEditing ? "Update Outlet" : "Add Outlet"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminOutlets;


// src/pages/AdminOutlets.jsx
import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/AdminOutlets.css";

const API_BASE =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// FALLBACK IMAGE (uploaded file)
const FALLBACK_IMAGE =
  "/mnt/data/d1c1c1ec-9094-4895-9d13-87cd2fad54ae.png";

function AdminOutlets() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [outlets, setOutlets] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    openTime: "09:00",
    closeTime: "18:00",
    image: "",
    isOpen: true,
  });

  // ===== Fetch Outlets =====
  const fetchOutlets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/outlets");
      const performance = res.data?.performance || [];

      setOutlets(performance);
      setStats({
        total: performance.length,
        open: performance.filter((o) => o.isOpen).length,
        closed: performance.filter((o) => !o.isOpen).length,
      });
    } catch (err) {
      console.error("❌ Error fetching outlets:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    fetchOutlets();
  }, [user, navigate, fetchOutlets]);

  // ===== Form Change =====
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===== Add Outlet =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/restaurants/register", {
        name: formData.name,
        restaurantName: formData.name,
        description: formData.description,
        openTime: formData.openTime,
        closeTime: formData.closeTime,
        image: formData.image,
        isOpen: formData.isOpen,
      });

      setShowModal(false);
      fetchOutlets();
      setFormData({
        name: "",
        description: "",
        openTime: "09:00",
        closeTime: "18:00",
        image: "",
        isOpen: true,
      });
    } catch (err) {
      console.error("❌ Failed to add outlet:", err);
      alert("Error adding outlet. Please try again.");
    }
  };

  // ===== Open Edit Modal =====
  const openEditModal = (outlet) => {
    setIsEditing(true);
    setSelectedOutlet(outlet);

    setFormData({
      name: outlet.name || outlet.restaurantName || "",
      description: outlet.description || "",
      openTime: outlet.openTime || "09:00",
      closeTime: outlet.closeTime || "18:00",
      image: outlet.image || FALLBACK_IMAGE,
      isOpen: outlet.isOpen ?? true,
    });

    setShowModal(true);
  };

  // ===== Update Outlet =====
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedOutlet?._id) return alert("No outlet selected");

    try {
      await api.put(`/restaurants/${selectedOutlet._id}`, {
        restaurantName: formData.name,
        description: formData.description,
        openTime: formData.openTime,
        closeTime: formData.closeTime,
        image: formData.image,
        profileImage: formData.image,
        isOpen: formData.isOpen,
      });

      setShowModal(false);
      setIsEditing(false);
      setSelectedOutlet(null);
      fetchOutlets();
    } catch (err) {
      console.error("❌ Failed to update outlet:", err);
      alert("Error updating outlet. Please try again.");
    }
  };

  // ===== Toggle Open / Close =====
  const toggleOutletStatus = async (outlet) => {
    try {
      const updatedStatus = !outlet.isOpen;

      await api.put(`/restaurants/${outlet._id}`, {
        isOpen: updatedStatus,
      });

      setOutlets((prev) =>
        prev.map((o) =>
          o._id === outlet._id ? { ...o, isOpen: updatedStatus } : o
        )
      );

      setStats((prev) => ({
        ...prev,
        open: prev.open + (updatedStatus ? 1 : -1),
        closed: prev.closed + (updatedStatus ? -1 : 1),
      }));
    } catch (err) {
      console.error("❌ Failed to toggle outlet:", err);
      alert("Error updating outlet status");
    }
  };

  // ===== Delete Outlet =====
  const handleDelete = async (outlet) => {
    if (!window.confirm("Are you sure you want to delete this outlet?")) return;
    try {
      await api.delete(`/restaurants/${outlet._id}`);
      setOutlets((prev) => prev.filter((o) => o._id !== outlet._id));
      setStats((prev) => ({
        total: prev.total - 1,
        open: prev.open - (outlet.isOpen ? 1 : 0),
        closed: prev.closed - (!outlet.isOpen ? 1 : 0),
      }));
    } catch (err) {
      console.error("❌ Failed to delete outlet:", err);
      alert("Error deleting outlet");
    }
  };

  // ===== Render UI =====
  return (
    <div className="admin-outlets">
      <header className="outlets-header">
        <div>
          <h1 className="outlets-title">Outlet Management</h1>
          <p className="outlets-subtitle">Manage all campus food outlets</p>
        </div>

        <div className="header-actions">
          <button
            className="add-outlet-btn"
            onClick={() => {
              setIsEditing(false);
              setSelectedOutlet(null);
              setFormData({
                name: "",
                description: "",
                openTime: "09:00",
                closeTime: "18:00",
                image: "",
                isOpen: true,
              });
              setShowModal(true);
            }}
          >
            + Add Outlet
          </button>
        </div>
      </header>

      <div className="outlets-stats">
        <div className="outlet-stat-card">
          <h2>{stats.total}</h2>
          <p>Total Outlets</p>
        </div>
        <div className="outlet-stat-card">
          <h2 className="green">{stats.open}</h2>
          <p>Currently Open</p>
        </div>
        <div className="outlet-stat-card">
          <h2 className="red">{stats.closed}</h2>
          <p>Currently Closed</p>
        </div>
      </div>

      {/* ===== OUTLETS GRID ===== */}
      {loading ? (
        <p className="loading-text">Loading outlets...</p>
      ) : outlets.length > 0 ? (
        <div className="outlets-grid">
          {outlets.map((outlet, index) => {
            // ===== FIXED IMAGE RESOLVER =====
            let imageUrl = FALLBACK_IMAGE;

            if (outlet.image) {
              if (outlet.image.startsWith("http")) {
                imageUrl = outlet.image;
              } else if (outlet.image.startsWith("/uploads")) {
                imageUrl = `${API_BASE}${outlet.image}`;
              } else {
                imageUrl = `${API_BASE}/${outlet.image}`;
              }
            }

            return (
              <article
                key={String(outlet._id || index)}
                className="restaurant-card"
              >
                <div className="restaurant-image-wrap">
                  <img
                    src={imageUrl}
                    alt={outlet.name || outlet.restaurantName}
                    className="restaurant-image"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />

                  <div
                    className={`status-pill ${
                      outlet.isOpen ? "open" : "closed"
                    }`}
                  >
                    {outlet.isOpen ? "Open" : "Closed"}
                  </div>
                </div>

                <div className="restaurant-body">
                  <div className="restaurant-info">
                    <h3 className="restaurant-title">
                      {outlet.name || outlet.restaurantName}
                    </h3>
                    <p className="restaurant-desc">
                      {outlet.description || "Fresh meals and beverages"}
                    </p>
                  </div>

                  <div className="restaurant-meta">
                    <div className="hours">
                      <span className="clock">🕒</span>
                      <span>
                        {outlet.openTime || "09:00"} -{" "}
                        {outlet.closeTime || "18:00"}
                      </span>
                    </div>

                    <div className="actions-row">
                      <button
                        className="btn btn-edit"
                        onClick={() => openEditModal(outlet)}
                      >
                        ✎ Edit
                      </button>

                      <button
                        className="btn btn-toggle"
                        onClick={() => toggleOutletStatus(outlet)}
                      >
                        {outlet.isOpen ? "Close" : "Open"}
                      </button>

                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(outlet)}
                        title="Delete outlet"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="no-outlets">No outlets found</p>
      )}

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isEditing ? "Edit Outlet" : "Add New Outlet"}</h2>
              <p>
                {isEditing
                  ? "Update outlet information"
                  : "Add a new food outlet to the campus"}
              </p>
              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <form
              className="modal-form"
              onSubmit={isEditing ? handleUpdate : handleSubmit}
            >
              <label>Outlet Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />

              <div className="time-fields">
                <div>
                  <label>Opening Time</label>
                  <input
                    type="time"
                    name="openTime"
                    value={formData.openTime}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Closing Time</label>
                  <input
                    type="time"
                    name="closeTime"
                    value={formData.closeTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label>Image URL (optional)</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                placeholder="/uploads/restaurants/example.png"
                onChange={handleChange}
              />

              <div className="switch-row">
                <label>Currently Open</label>
                <input
                  type="checkbox"
                  name="isOpen"
                  checked={formData.isOpen}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {isEditing ? "Update Outlet" : "Add Outlet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOutlets;
