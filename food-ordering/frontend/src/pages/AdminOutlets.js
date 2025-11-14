// // // // // // // import React, { useEffect, useState, useContext } from "react";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import api from "../utils/api";
// // // // // // // import { AuthContext } from "../context/AuthContext";
// // // // // // // import "../styles/AdminOutlets.css";

// // // // // // // function AdminOutlets() {
// // // // // // //   const { user } = useContext(AuthContext);
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const [outlets, setOutlets] = useState([]);
// // // // // // //   const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [showModal, setShowModal] = useState(false);
// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     name: "",
// // // // // // //     description: "",
// // // // // // //     openTime: "09:00",
// // // // // // //     closeTime: "18:00",
// // // // // // //     image: "",
// // // // // // //     isOpen: true,
// // // // // // //   });

// // // // // // //   useEffect(() => {
// // // // // // //     if (!user || user.role !== "admin") {
// // // // // // //       navigate("/admin/login");
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     fetchOutlets();
// // // // // // //   }, [user, navigate]);

// // // // // // //   const fetchOutlets = async () => {
// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const res = await api.get("/admin/outlets");
// // // // // // //       const performance = res.data?.performance || [];

// // // // // // //       const open = Math.floor(performance.length * 0.8);
// // // // // // //       const closed = performance.length - open;

// // // // // // //       setOutlets(performance);
// // // // // // //       setStats({ total: performance.length, open, closed });
// // // // // // //     } catch (err) {
// // // // // // //       console.error("❌ Error fetching outlets:", err);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleChange = (e) => {
// // // // // // //     const { name, value, type, checked } = e.target;
// // // // // // //     setFormData((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [name]: type === "checkbox" ? checked : value,
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const handleSubmit = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     try {
// // // // // // //       await api.post("/restaurants/register", formData);
// // // // // // //       setShowModal(false);
// // // // // // //       fetchOutlets();
// // // // // // //       setFormData({
// // // // // // //         name: "",
// // // // // // //         description: "",
// // // // // // //         openTime: "09:00",
// // // // // // //         closeTime: "18:00",
// // // // // // //         image: "",
// // // // // // //         isOpen: true,
// // // // // // //       });
// // // // // // //     } catch (err) {
// // // // // // //       console.error("❌ Failed to add outlet:", err);
// // // // // // //       alert("Error adding outlet. Please try again.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="admin-outlets">
// // // // // // //       <header className="outlets-header">
// // // // // // //         <div>
// // // // // // //           <h1 className="outlets-title">Outlet Management</h1>
// // // // // // //           <p className="outlets-subtitle">Manage all campus food outlets</p>
// // // // // // //         </div>
// // // // // // //         <button className="add-outlet-btn" onClick={() => setShowModal(true)}>
// // // // // // //           + Add Outlet
// // // // // // //         </button>
// // // // // // //       </header>

// // // // // // //       {/* ====== STATS ====== */}
// // // // // // //       <div className="outlets-stats">
// // // // // // //         <div className="outlet-stat-card">
// // // // // // //           <h2>{stats.total}</h2>
// // // // // // //           <p>Total Outlets</p>
// // // // // // //         </div>
// // // // // // //         <div className="outlet-stat-card">
// // // // // // //           <h2 className="green">{stats.open}</h2>
// // // // // // //           <p>Currently Open</p>
// // // // // // //         </div>
// // // // // // //         <div className="outlet-stat-card">
// // // // // // //           <h2 className="red">{stats.closed}</h2>
// // // // // // //           <p>Currently Closed</p>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* ====== OUTLETS GRID ====== */}
// // // // // // //       {loading ? (
// // // // // // //         <p className="loading-text">Loading outlets...</p>
// // // // // // //       ) : outlets.length > 0 ? (
// // // // // // //         <div className="outlets-grid">
// // // // // // //           {outlets.map((outlet, index) => (
// // // // // // //             <div key={index} className="outlet-card">
// // // // // // //               <div className="outlet-image-container">
// // // // // // //                 <img
// // // // // // //                   src={outlet.image || "/images/default-restaurant.png"}
// // // // // // //                   alt={outlet.name}
// // // // // // //                   className="outlet-image"
// // // // // // //                 />
// // // // // // //                 <span className="badge open">Open</span>
// // // // // // //               </div>

// // // // // // //               <div className="outlet-details">
// // // // // // //                 <h3>{outlet.name}</h3>
// // // // // // //                 <p className="outlet-desc">
// // // // // // //                   {outlet.description || "Fresh meals and beverages"}
// // // // // // //                 </p>
// // // // // // //                 <div className="outlet-hours">
// // // // // // //                   <span>🕒 10:00 AM - 8:00 PM</span>
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <div className="outlet-actions">
// // // // // // //                 <button className="edit-btn">✏️ Edit</button>
// // // // // // //                 <button className="close-btn">Close</button>
// // // // // // //                 <button className="delete-btn">🗑️</button>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       ) : (
// // // // // // //         <p className="no-outlets">No outlets found</p>
// // // // // // //       )}

// // // // // // //       {/* ====== ADD OUTLET MODAL ====== */}
// // // // // // //       {showModal && (
// // // // // // //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// // // // // // //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// // // // // // //             <div className="modal-header">
// // // // // // //               <h2>Add New Outlet</h2>
// // // // // // //               <p>Add a new food outlet to the campus</p>
// // // // // // //               <button
// // // // // // //                 className="close-modal"
// // // // // // //                 onClick={() => setShowModal(false)}
// // // // // // //               >
// // // // // // //                 ✕
// // // // // // //               </button>
// // // // // // //             </div>

// // // // // // //             <form className="modal-form" onSubmit={handleSubmit}>
// // // // // // //               <label>Outlet Name</label>
// // // // // // //               <input
// // // // // // //                 type="text"
// // // // // // //                 name="name"
// // // // // // //                 placeholder="e.g., Campus Café"
// // // // // // //                 value={formData.name}
// // // // // // //                 onChange={handleChange}
// // // // // // //                 required
// // // // // // //               />

// // // // // // //               <label>Description</label>
// // // // // // //               <textarea
// // // // // // //                 name="description"
// // // // // // //                 placeholder="Brief description of the outlet"
// // // // // // //                 value={formData.description}
// // // // // // //                 onChange={handleChange}
// // // // // // //               />

// // // // // // //               <div className="time-fields">
// // // // // // //                 <div>
// // // // // // //                   <label>Opening Time</label>
// // // // // // //                   <input
// // // // // // //                     type="time"
// // // // // // //                     name="openTime"
// // // // // // //                     value={formData.openTime}
// // // // // // //                     onChange={handleChange}
// // // // // // //                   />
// // // // // // //                 </div>
// // // // // // //                 <div>
// // // // // // //                   <label>Closing Time</label>
// // // // // // //                   <input
// // // // // // //                     type="time"
// // // // // // //                     name="closeTime"
// // // // // // //                     value={formData.closeTime}
// // // // // // //                     onChange={handleChange}
// // // // // // //                   />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <label>Image URL (optional)</label>
// // // // // // //               <input
// // // // // // //                 type="url"
// // // // // // //                 name="image"
// // // // // // //                 placeholder="https://..."
// // // // // // //                 value={formData.image}
// // // // // // //                 onChange={handleChange}
// // // // // // //               />

// // // // // // //               <div className="switch-row">
// // // // // // //                 <label>Currently Open</label>
// // // // // // //                 <input
// // // // // // //                   type="checkbox"
// // // // // // //                   name="isOpen"
// // // // // // //                   checked={formData.isOpen}
// // // // // // //                   onChange={handleChange}
// // // // // // //                 />
// // // // // // //               </div>

// // // // // // //               <div className="modal-actions">
// // // // // // //                 <button
// // // // // // //                   type="button"
// // // // // // //                   className="cancel-btn"
// // // // // // //                   onClick={() => setShowModal(false)}
// // // // // // //                 >
// // // // // // //                   Cancel
// // // // // // //                 </button>
// // // // // // //                 <button type="submit" className="submit-btn">
// // // // // // //                   Add Outlet
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //             </form>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default AdminOutlets;


// // // // // // import React, { useEffect, useState, useContext } from "react";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import api from "../utils/api";
// // // // // // import { AuthContext } from "../context/AuthContext";
// // // // // // import "../styles/AdminOutlets.css";

// // // // // // function AdminOutlets() {
// // // // // //   const { user } = useContext(AuthContext);
// // // // // //   const navigate = useNavigate();

// // // // // //   const [outlets, setOutlets] = useState([]);
// // // // // //   const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [showModal, setShowModal] = useState(false);
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     name: "",
// // // // // //     description: "",
// // // // // //     openTime: "09:00",
// // // // // //     closeTime: "18:00",
// // // // // //     image: "",
// // // // // //     isOpen: true,
// // // // // //   });

// // // // // //   useEffect(() => {
// // // // // //     if (!user || user.role !== "admin") {
// // // // // //       navigate("/admin/login");
// // // // // //       return;
// // // // // //     }
// // // // // //     fetchOutlets();
// // // // // //   }, [user, navigate]);

// // // // // //   const fetchOutlets = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const res = await api.get("/admin/outlets");
// // // // // //       const performance = res.data?.performance || [];
// // // // // //       const open = Math.floor(performance.length * 0.8);
// // // // // //       const closed = performance.length - open;

// // // // // //       setOutlets(performance);
// // // // // //       setStats({ total: performance.length, open, closed });
// // // // // //     } catch (err) {
// // // // // //       console.error("❌ Error fetching outlets:", err);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleChange = (e) => {
// // // // // //     const { name, value, type, checked } = e.target;
// // // // // //     setFormData((prev) => ({
// // // // // //       ...prev,
// // // // // //       [name]: type === "checkbox" ? checked : value,
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     try {
// // // // // //       await api.post("/restaurants/register", formData);
// // // // // //       setShowModal(false);
// // // // // //       fetchOutlets();
// // // // // //       setFormData({
// // // // // //         name: "",
// // // // // //         description: "",
// // // // // //         openTime: "09:00",
// // // // // //         closeTime: "18:00",
// // // // // //         image: "",
// // // // // //         isOpen: true,
// // // // // //       });
// // // // // //     } catch (err) {
// // // // // //       console.error("❌ Failed to add outlet:", err);
// // // // // //       alert("Error adding outlet. Please try again.");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="admin-outlets">
// // // // // //       <header className="outlets-header">
// // // // // //         <div>
// // // // // //           <h1 className="outlets-title">Outlet Management</h1>
// // // // // //           <p className="outlets-subtitle">Manage all campus food outlets</p>
// // // // // //         </div>
// // // // // //         <button className="add-outlet-btn" onClick={() => setShowModal(true)}>
// // // // // //           + Add Outlet
// // // // // //         </button>
// // // // // //       </header>

// // // // // //       {/* ====== STATS ====== */}
// // // // // //       <div className="outlets-stats">
// // // // // //         <div className="outlet-stat-card">
// // // // // //           <h2>{stats.total}</h2>
// // // // // //           <p>Total Outlets</p>
// // // // // //         </div>
// // // // // //         <div className="outlet-stat-card">
// // // // // //           <h2 className="green">{stats.open}</h2>
// // // // // //           <p>Currently Open</p>
// // // // // //         </div>
// // // // // //         <div className="outlet-stat-card">
// // // // // //           <h2 className="red">{stats.closed}</h2>
// // // // // //           <p>Currently Closed</p>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* ====== OUTLETS GRID ====== */}
// // // // // //       {loading ? (
// // // // // //         <p className="loading-text">Loading outlets...</p>
// // // // // //       ) : outlets.length > 0 ? (
// // // // // //         <div className="outlets-grid">
// // // // // //           {outlets.map((outlet, index) => (
// // // // // //             <div key={index} className="outlet-card">
// // // // // //               <div className="outlet-image-container">
// // // // // //                 <img
// // // // // //                   src={outlet.image || "/images/default-restaurant.png"}
// // // // // //                   alt={outlet.name}
// // // // // //                   className="outlet-image"
// // // // // //                 />
// // // // // //                 <span
// // // // // //                   className={`badge ${outlet.isOpen ? "open" : "closed"}`}
// // // // // //                 >
// // // // // //                   {outlet.isOpen ? "Open" : "Closed"}
// // // // // //                 </span>
// // // // // //               </div>

// // // // // //               <div className="outlet-details">
// // // // // //                 <h3>{outlet.name}</h3>
// // // // // //                 <p className="outlet-desc">
// // // // // //                   {outlet.description || "Fresh meals and beverages"}
// // // // // //                 </p>
// // // // // //                 <div className="outlet-hours">
// // // // // //                   🕒 {outlet.openTime || "10:00 AM"} -{" "}
// // // // // //                   {outlet.closeTime || "8:00 PM"}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div className="outlet-actions">
// // // // // //                 <button className="edit-btn">Edit</button>
// // // // // //                 <button className="close-btn">
// // // // // //                   {outlet.isOpen ? "Close" : "Open"}
// // // // // //                 </button>
// // // // // //                 <button className="delete-btn">🗑️</button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       ) : (
// // // // // //         <p className="no-outlets">No outlets found</p>
// // // // // //       )}

// // // // // //       {/* ====== ADD OUTLET MODAL ====== */}
// // // // // //       {showModal && (
// // // // // //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// // // // // //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// // // // // //             <div className="modal-header">
// // // // // //               <h2>Add New Outlet</h2>
// // // // // //               <p>Add a new food outlet to the campus</p>
// // // // // //               <button
// // // // // //                 className="close-modal"
// // // // // //                 onClick={() => setShowModal(false)}
// // // // // //               >
// // // // // //                 ✕
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             <form className="modal-form" onSubmit={handleSubmit}>
// // // // // //               <label>Outlet Name</label>
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 name="name"
// // // // // //                 placeholder="e.g., Campus Café"
// // // // // //                 value={formData.name}
// // // // // //                 onChange={handleChange}
// // // // // //                 required
// // // // // //               />

// // // // // //               <label>Description</label>
// // // // // //               <textarea
// // // // // //                 name="description"
// // // // // //                 placeholder="Brief description of the outlet"
// // // // // //                 value={formData.description}
// // // // // //                 onChange={handleChange}
// // // // // //               />

// // // // // //               <div className="time-fields">
// // // // // //                 <div>
// // // // // //                   <label>Opening Time</label>
// // // // // //                   <input
// // // // // //                     type="time"
// // // // // //                     name="openTime"
// // // // // //                     value={formData.openTime}
// // // // // //                     onChange={handleChange}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //                 <div>
// // // // // //                   <label>Closing Time</label>
// // // // // //                   <input
// // // // // //                     type="time"
// // // // // //                     name="closeTime"
// // // // // //                     value={formData.closeTime}
// // // // // //                     onChange={handleChange}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <label>Image URL (optional)</label>
// // // // // //               <input
// // // // // //                 type="url"
// // // // // //                 name="image"
// // // // // //                 placeholder="https://..."
// // // // // //                 value={formData.image}
// // // // // //                 onChange={handleChange}
// // // // // //               />

// // // // // //               <div className="switch-row">
// // // // // //                 <label>Currently Open</label>
// // // // // //                 <input
// // // // // //                   type="checkbox"
// // // // // //                   name="isOpen"
// // // // // //                   checked={formData.isOpen}
// // // // // //                   onChange={handleChange}
// // // // // //                 />
// // // // // //               </div>

// // // // // //               <div className="modal-actions">
// // // // // //                 <button
// // // // // //                   type="button"
// // // // // //                   className="cancel-btn"
// // // // // //                   onClick={() => setShowModal(false)}
// // // // // //                 >
// // // // // //                   Cancel
// // // // // //                 </button>
// // // // // //                 <button type="submit" className="submit-btn">
// // // // // //                   Add Outlet
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </form>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default AdminOutlets;





// // // // // import React, { useEffect, useState, useContext } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import api from "../utils/api";
// // // // // import { AuthContext } from "../context/AuthContext";
// // // // // import "../styles/AdminOutlets.css";

// // // // // function AdminOutlets() {
// // // // //   const { user } = useContext(AuthContext);
// // // // //   const navigate = useNavigate();

// // // // //   const [outlets, setOutlets] = useState([]);
// // // // //   const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // modal
// // // // //   const [showModal, setShowModal] = useState(false);
// // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // //   const [selectedOutlet, setSelectedOutlet] = useState(null);

// // // // //   const [formData, setFormData] = useState({
// // // // //     name: "",
// // // // //     description: "",
// // // // //     openTime: "09:00",
// // // // //     closeTime: "18:00",
// // // // //     image: "",
// // // // //     isOpen: true,
// // // // //   });

// // // // //   useEffect(() => {
// // // // //     if (!user || user.role !== "admin") {
// // // // //       navigate("/admin/login");
// // // // //       return;
// // // // //     }
// // // // //     fetchOutlets();
// // // // //   }, [user, navigate]);

// // // // //   const fetchOutlets = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const res = await api.get("/admin/outlets");
// // // // //       const performance = res.data?.performance || [];

// // // // //       const open = Math.floor(performance.length * 0.8);
// // // // //       const closed = performance.length - open;

// // // // //       setOutlets(performance);
// // // // //       setStats({ total: performance.length, open, closed });
// // // // //     } catch (err) {
// // // // //       console.error("❌ Error fetching outlets:", err);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleChange = (e) => {
// // // // //     const { name, value, type, checked } = e.target;
// // // // //     setFormData((prev) => ({
// // // // //       ...prev,
// // // // //       [name]: type === "checkbox" ? checked : value,
// // // // //     }));
// // // // //   };

// // // // //   /* =============================
// // // // //      ADD NEW OUTLET
// // // // //   ==============================*/
// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       await api.post("/restaurants/register", formData);
// // // // //       setShowModal(false);
// // // // //       fetchOutlets();

// // // // //       // reset form
// // // // //       setFormData({
// // // // //         name: "",
// // // // //         description: "",
// // // // //         openTime: "09:00",
// // // // //         closeTime: "18:00",
// // // // //         image: "",
// // // // //         isOpen: true,
// // // // //       });
// // // // //     } catch (err) {
// // // // //       console.error("❌ Failed to add outlet:", err);
// // // // //       alert("Error adding outlet. Please try again.");
// // // // //     }
// // // // //   };

// // // // //   /* =============================
// // // // //      OPEN EDIT MODAL
// // // // //   ==============================*/
// // // // //   const openEditModal = (outlet) => {
// // // // //     setIsEditing(true);
// // // // //     setSelectedOutlet(outlet);

// // // // //     // fill modal with selected outlet data
// // // // //     setFormData({
// // // // //       name: outlet.name,
// // // // //       description: outlet.description,
// // // // //       openTime: outlet.openTime,
// // // // //       closeTime: outlet.closeTime,
// // // // //       image: outlet.image,
// // // // //       isOpen: outlet.isOpen,
// // // // //     });

// // // // //     setShowModal(true);
// // // // //   };

// // // // //   /* =============================
// // // // //      UPDATE OUTLET
// // // // //   ==============================*/
// // // // //   const handleUpdate = async (e) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       await api.put(`/admin/outlets/${selectedOutlet._id}`, formData);

// // // // //       setShowModal(false);
// // // // //       fetchOutlets();

// // // // //       setIsEditing(false);
// // // // //       setSelectedOutlet(null);
// // // // //     } catch (err) {
// // // // //       console.error("❌ Failed to update outlet:", err);
// // // // //       alert("Error updating outlet. Please try again.");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="admin-outlets">
// // // // //       <header className="outlets-header">
// // // // //         <div>
// // // // //           <h1 className="outlets-title">Outlet Management</h1>
// // // // //           <p className="outlets-subtitle">Manage all campus food outlets</p>
// // // // //         </div>

// // // // //         {/* Add Outlet */}
// // // // //         <button
// // // // //           className="add-outlet-btn"
// // // // //           onClick={() => {
// // // // //             setIsEditing(false);
// // // // //             setShowModal(true);
// // // // //           }}
// // // // //         >
// // // // //           + Add Outlet
// // // // //         </button>
// // // // //       </header>

// // // // //       {/* ====== STATS ====== */}
// // // // //       <div className="outlets-stats">
// // // // //         <div className="outlet-stat-card">
// // // // //           <h2>{stats.total}</h2>
// // // // //           <p>Total Outlets</p>
// // // // //         </div>
// // // // //         <div className="outlet-stat-card">
// // // // //           <h2 className="green">{stats.open}</h2>
// // // // //           <p>Currently Open</p>
// // // // //         </div>
// // // // //         <div className="outlet-stat-card">
// // // // //           <h2 className="red">{stats.closed}</h2>
// // // // //           <p>Currently Closed</p>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* ====== OUTLETS GRID ====== */}
// // // // //       {loading ? (
// // // // //         <p className="loading-text">Loading outlets...</p>
// // // // //       ) : outlets.length > 0 ? (
// // // // //         <div className="outlets-grid">
// // // // //           {outlets.map((outlet, index) => (
// // // // //             <div key={index} className="outlet-card">
// // // // //               <div className="outlet-image-container">
// // // // //                 <img
// // // // //                   src={outlet.image || "/images/default-restaurant.png"}
// // // // //                   alt={outlet.name}
// // // // //                   className="outlet-image"
// // // // //                 />
// // // // //                 <span
// // // // //                   className={`badge ${outlet.isOpen ? "open" : "closed"}`}
// // // // //                 >
// // // // //                   {outlet.isOpen ? "Open" : "Closed"}
// // // // //                 </span>
// // // // //               </div>

// // // // //               <div className="outlet-details">
// // // // //                 <h3>{outlet.name}</h3>
// // // // //                 <p className="outlet-desc">
// // // // //                   {outlet.description || "Fresh meals and beverages"}
// // // // //                 </p>
// // // // //                 <div className="outlet-hours">
// // // // //                   🕒 {outlet.openTime} - {outlet.closeTime}
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="outlet-actions">
// // // // //                 <button className="edit-btn" onClick={() => openEditModal(outlet)}>
// // // // //                   Edit
// // // // //                 </button>

// // // // //                 <button className="close-btn">
// // // // //                   {outlet.isOpen ? "Close" : "Open"}
// // // // //                 </button>

// // // // //                 <button className="delete-btn">🗑️</button>
// // // // //               </div>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       ) : (
// // // // //         <p className="no-outlets">No outlets found</p>
// // // // //       )}

// // // // //       {/* ============ MODAL ============ */}
// // // // //       {showModal && (
// // // // //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// // // // //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// // // // //             <div className="modal-header">
// // // // //               <h2>{isEditing ? "Edit Outlet" : "Add New Outlet"}</h2>
// // // // //               <p>
// // // // //                 {isEditing
// // // // //                   ? "Update outlet information"
// // // // //                   : "Add a new food outlet to the campus"}
// // // // //               </p>

// // // // //               <button
// // // // //                 className="close-modal"
// // // // //                 onClick={() => setShowModal(false)}
// // // // //               >
// // // // //                 ✕
// // // // //               </button>
// // // // //             </div>

// // // // //             <form
// // // // //               className="modal-form"
// // // // //               onSubmit={isEditing ? handleUpdate : handleSubmit}
// // // // //             >
// // // // //               <label>Outlet Name</label>
// // // // //               <input
// // // // //                 type="text"
// // // // //                 name="name"
// // // // //                 placeholder="e.g., Campus Café"
// // // // //                 value={formData.name}
// // // // //                 onChange={handleChange}
// // // // //                 required
// // // // //               />

// // // // //               <label>Description</label>
// // // // //               <textarea
// // // // //                 name="description"
// // // // //                 placeholder="Brief description"
// // // // //                 value={formData.description}
// // // // //                 onChange={handleChange}
// // // // //               />

// // // // //               <div className="time-fields">
// // // // //                 <div>
// // // // //                   <label>Opening Time</label>
// // // // //                   <input
// // // // //                     type="time"
// // // // //                     name="openTime"
// // // // //                     value={formData.openTime}
// // // // //                     onChange={handleChange}
// // // // //                   />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label>Closing Time</label>
// // // // //                   <input
// // // // //                     type="time"
// // // // //                     name="closeTime"
// // // // //                     value={formData.closeTime}
// // // // //                     onChange={handleChange}
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <label>Image URL (optional)</label>
// // // // //               <input
// // // // //                 type="url"
// // // // //                 name="image"
// // // // //                 placeholder="https://..."
// // // // //                 value={formData.image}
// // // // //                 onChange={handleChange}
// // // // //               />

// // // // //               <div className="switch-row">
// // // // //                 <label>Currently Open</label>
// // // // //                 <input
// // // // //                   type="checkbox"
// // // // //                   name="isOpen"
// // // // //                   checked={formData.isOpen}
// // // // //                   onChange={handleChange}
// // // // //                 />
// // // // //               </div>

// // // // //               <div className="modal-actions">
// // // // //                 <button
// // // // //                   type="button"
// // // // //                   className="cancel-btn"
// // // // //                   onClick={() => setShowModal(false)}
// // // // //                 >
// // // // //                   Cancel
// // // // //                 </button>

// // // // //                 <button type="submit" className="submit-btn">
// // // // //                   {isEditing ? "Update Outlet" : "Add Outlet"}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </form>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default AdminOutlets;






// // // // // frontend/src/pages/AdminOutlets.js

// // // // import React, { useEffect, useState, useContext } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import api from "../utils/api";
// // // // import { AuthContext } from "../context/AuthContext";
// // // // import "../styles/AdminOutlets.css";

// // // // function AdminOutlets() {
// // // //   const { user } = useContext(AuthContext);
// // // //   const navigate = useNavigate();

// // // //   const [outlets, setOutlets] = useState([]);
// // // //   const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
// // // //   const [loading, setLoading] = useState(true);

// // // //   const [showModal, setShowModal] = useState(false);
// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const [selectedOutlet, setSelectedOutlet] = useState(null);

// // // //   const [formData, setFormData] = useState({
// // // //     name: "",
// // // //     description: "",
// // // //     openTime: "09:00",
// // // //     closeTime: "18:00",
// // // //     image: "",
// // // //     isOpen: true,
// // // //   });

// // // //   useEffect(() => {
// // // //     if (!user || user.role !== "admin") {
// // // //       navigate("/admin/login");
// // // //       return;
// // // //     }
// // // //     fetchOutlets();
// // // //   }, [user, navigate]);

// // // //   const fetchOutlets = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await api.get("/admin/outlets");
// // // //       const performance = res.data?.performance || [];

// // // //       const open = Math.floor(performance.length * 0.8);
// // // //       const closed = performance.length - open;

// // // //       setOutlets(performance);
// // // //       setStats({ total: performance.length, open, closed });
// // // //     } catch (err) {
// // // //       console.error("❌ Error fetching outlets:", err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { name, value, type, checked } = e.target;
// // // //     setFormData((prev) => ({
// // // //       ...prev,
// // // //       [name]: type === "checkbox" ? checked : value,
// // // //     }));
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       await api.post("/restaurants/register", formData);
// // // //       setShowModal(false);
// // // //       fetchOutlets();
// // // //       setFormData({
// // // //         name: "",
// // // //         description: "",
// // // //         openTime: "09:00",
// // // //         closeTime: "18:00",
// // // //         image: "",
// // // //         isOpen: true,
// // // //       });
// // // //     } catch (err) {
// // // //       console.error("❌ Failed to add outlet:", err);
// // // //       alert("Error adding outlet. Please try again.");
// // // //     }
// // // //   };

// // // //   const openEditModal = (outlet) => {
// // // //     setIsEditing(true);
// // // //     setSelectedOutlet(outlet);

// // // //     setFormData({
// // // //       name: outlet.name,
// // // //       description: outlet.description,
// // // //       openTime: outlet.openTime,
// // // //       closeTime: outlet.closeTime,
// // // //       image: outlet.image,
// // // //       isOpen: outlet.isOpen,
// // // //     });

// // // //     setShowModal(true);
// // // //   };

// // // //   const handleUpdate = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       // ★ FIXED
// // // //       await api.put(`/restaurants/${selectedOutlet._id}`, formData);

// // // //       setShowModal(false);
// // // //       fetchOutlets();
// // // //       setIsEditing(false);
// // // //       setSelectedOutlet(null);
// // // //     } catch (err) {
// // // //       console.error("❌ Failed to update outlet:", err);
// // // //       alert("Error updating outlet. Please try again.");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="admin-outlets">
// // // //       <header className="outlets-header">
// // // //         <div>
// // // //           <h1 className="outlets-title">Outlet Management</h1>
// // // //           <p className="outlets-subtitle">Manage all campus food outlets</p>
// // // //         </div>

// // // //         <button
// // // //           className="add-outlet-btn"
// // // //           onClick={() => {
// // // //             setIsEditing(false);
// // // //             setShowModal(true);
// // // //           }}
// // // //         >
// // // //           + Add Outlet
// // // //         </button>
// // // //       </header>

// // // //       <div className="outlets-stats">
// // // //         <div className="outlet-stat-card">
// // // //           <h2>{stats.total}</h2>
// // // //           <p>Total Outlets</p>
// // // //         </div>
// // // //         <div className="outlet-stat-card">
// // // //           <h2 className="green">{stats.open}</h2>
// // // //           <p>Currently Open</p>
// // // //         </div>
// // // //         <div className="outlet-stat-card">
// // // //           <h2 className="red">{stats.closed}</h2>
// // // //           <p>Currently Closed</p>
// // // //         </div>
// // // //       </div>

// // // //       {loading ? (
// // // //         <p className="loading-text">Loading outlets...</p>
// // // //       ) : outlets.length > 0 ? (
// // // //         <div className="outlets-grid">
// // // //           {outlets.map((outlet, index) => (
// // // //             <div key={index} className="outlet-card">
// // // //               <div className="outlet-image-container">
// // // //                 <img
// // // //                   src={outlet.image || "/images/default-restaurant.png"}
// // // //                   alt={outlet.name}
// // // //                   className="outlet-image"
// // // //                 />
// // // //                 <span className={`badge ${outlet.isOpen ? "open" : "closed"}`}>
// // // //                   {outlet.isOpen ? "Open" : "Closed"}
// // // //                 </span>
// // // //               </div>

// // // //               <div className="outlet-details">
// // // //                 <h3>{outlet.name}</h3>
// // // //                 <p className="outlet-desc">
// // // //                   {outlet.description || "Fresh meals and beverages"}
// // // //                 </p>
// // // //                 <div className="outlet-hours">
// // // //                   🕒 {outlet.openTime} - {outlet.closeTime}
// // // //                 </div>
// // // //               </div>

// // // //               <div className="outlet-actions">
// // // //                 <button className="edit-btn" onClick={() => openEditModal(outlet)}>
// // // //                   Edit
// // // //                 </button>
// // // //                 <button className="close-btn">
// // // //                   {outlet.isOpen ? "Close" : "Open"}
// // // //                 </button>
// // // //                 <button className="delete-btn">🗑️</button>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       ) : (
// // // //         <p className="no-outlets">No outlets found</p>
// // // //       )}

// // // //       {showModal && (
// // // //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// // // //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// // // //             <div className="modal-header">
// // // //               <h2>{isEditing ? "Edit Outlet" : "Add New Outlet"}</h2>
// // // //               <p>
// // // //                 {isEditing
// // // //                   ? "Update outlet information"
// // // //                   : "Add a new food outlet to the campus"}
// // // //               </p>

// // // //               <button
// // // //                 className="close-modal"
// // // //                 onClick={() => setShowModal(false)}
// // // //               >
// // // //                 ✕
// // // //               </button>
// // // //             </div>

// // // //             <form
// // // //               className="modal-form"
// // // //               onSubmit={isEditing ? handleUpdate : handleSubmit}
// // // //             >
// // // //               <label>Outlet Name</label>
// // // //               <input
// // // //                 type="text"
// // // //                 name="name"
// // // //                 value={formData.name}
// // // //                 onChange={handleChange}
// // // //                 required
// // // //               />

// // // //               <label>Description</label>
// // // //               <textarea
// // // //                 name="description"
// // // //                 value={formData.description}
// // // //                 onChange={handleChange}
// // // //               />

// // // //               <div className="time-fields">
// // // //                 <div>
// // // //                   <label>Opening Time</label>
// // // //                   <input
// // // //                     type="time"
// // // //                     name="openTime"
// // // //                     value={formData.openTime}
// // // //                     onChange={handleChange}
// // // //                   />
// // // //                 </div>

// // // //                 <div>
// // // //                   <label>Closing Time</label>
// // // //                   <input
// // // //                     type="time"
// // // //                     name="closeTime"
// // // //                     value={formData.closeTime}
// // // //                     onChange={handleChange}
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <label>Image URL (optional)</label>
// // // //               <input
// // // //                 type="url"
// // // //                 name="image"
// // // //                 value={formData.image}
// // // //                 onChange={handleChange}
// // // //               />

// // // //               <div className="switch-row">
// // // //                 <label>Currently Open</label>
// // // //                 <input
// // // //                   type="checkbox"
// // // //                   name="isOpen"
// // // //                   checked={formData.isOpen}
// // // //                   onChange={handleChange}
// // // //                 />
// // // //               </div>

// // // //               <div className="modal-actions">
// // // //                 <button
// // // //                   type="button"
// // // //                   className="cancel-btn"
// // // //                   onClick={() => setShowModal(false)}
// // // //                 >
// // // //                   Cancel
// // // //                 </button>

// // // //                 <button type="submit" className="submit-btn">
// // // //                   {isEditing ? "Update Outlet" : "Add Outlet"}
// // // //                 </button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default AdminOutlets;







// // // // frontend/src/pages/AdminOutlets.js

// // // import React, { useEffect, useState, useContext } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import api from "../utils/api";
// // // import { AuthContext } from "../context/AuthContext";
// // // import "../styles/AdminOutlets.css";

// // // function AdminOutlets() {
// // //   const { user } = useContext(AuthContext);
// // //   const navigate = useNavigate();

// // //   const [outlets, setOutlets] = useState([]);
// // //   const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
// // //   const [loading, setLoading] = useState(true);

// // //   const [showModal, setShowModal] = useState(false);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [selectedOutlet, setSelectedOutlet] = useState(null);

// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     description: "",
// // //     openTime: "",
// // //     closeTime: "",
// // //     image: "",
// // //     isOpen: true,
// // //   });

// // //   useEffect(() => {
// // //     if (!user || user.role !== "admin") {
// // //       navigate("/admin/login");
// // //       return;
// // //     }
// // //     fetchOutlets();
// // //   }, [user, navigate]);

// // //   const fetchOutlets = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await api.get("/admin/outlets");
// // //       const performance = res.data?.performance || [];

// // //       const open = Math.floor(performance.length * 0.8);
// // //       const closed = performance.length - open;

// // //       setOutlets(performance);
// // //       setStats({ total: performance.length, open, closed });
// // //     } catch (err) {
// // //       console.error("❌ Error fetching outlets:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value, type, checked } = e.target;
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [name]: type === "checkbox" ? checked : value,
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await api.post("/restaurants/register", {
// // //         name: formData.name,
// // //         description: formData.description,
// // //         openTime: formData.openTime,
// // //         closeTime: formData.closeTime,
// // //         image: formData.image,
// // //         isOpen: formData.isOpen,
// // //       });

// // //       setShowModal(false);
// // //       fetchOutlets();

// // //       setFormData({
// // //         name: "",
// // //         description: "",
// // //         openTime: "09:00",
// // //         closeTime: "18:00",
// // //         image: "",
// // //         isOpen: true,
// // //       });
// // //     } catch (err) {
// // //       console.error("❌ Failed to add outlet:", err);
// // //       alert("Error adding outlet. Please try again.");
// // //     }
// // //   };

// // //   const openEditModal = (outlet) => {
// // //     setIsEditing(true);
// // //     setSelectedOutlet(outlet);

// // //     setFormData({
// // //       name: outlet.name,
// // //       description: outlet.description,
// // //       openTime: outlet.openTime,
// // //       closeTime: outlet.closeTime,
// // //       image: outlet.image,
// // //       isOpen: outlet.isOpen,
// // //     });

// // //     setShowModal(true);
// // //   };

// // //   const handleUpdate = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await api.put(`/restaurants/${selectedOutlet._id}`, {
// // //         restaurantName: formData.name,
// // //         description: formData.description,
// // //         openTime: formData.openTime,
// // //         closeTime: formData.closeTime,
// // //         profileImage: formData.image,
// // //         isOpen: formData.isOpen,
// // //       });

// // //       setShowModal(false);
// // //       fetchOutlets();
// // //       setIsEditing(false);
// // //       setSelectedOutlet(null);
// // //     } catch (err) {
// // //       console.error("❌ Failed to update outlet:", err);
// // //       alert("Error updating outlet. Please try again.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="admin-outlets">
// // //       <header className="outlets-header">
// // //         <div>
// // //           <h1 className="outlets-title">Outlet Management</h1>
// // //           <p className="outlets-subtitle">Manage all campus food outlets</p>
// // //         </div>

// // //         <button
// // //           className="add-outlet-btn"
// // //           onClick={() => {
// // //             setIsEditing(false);
// // //             setShowModal(true);
// // //           }}
// // //         >
// // //           + Add Outlet
// // //         </button>
// // //       </header>

// // //       <div className="outlets-stats">
// // //         <div className="outlet-stat-card">
// // //           <h2>{stats.total}</h2>
// // //           <p>Total Outlets</p>
// // //         </div>
// // //         <div className="outlet-stat-card">
// // //           <h2 className="green">{stats.open}</h2>
// // //           <p>Currently Open</p>
// // //         </div>
// // //         <div className="outlet-stat-card">
// // //           <h2 className="red">{stats.closed}</h2>
// // //           <p>Currently Closed</p>
// // //         </div>
// // //       </div>

// // //       {loading ? (
// // //         <p className="loading-text">Loading outlets...</p>
// // //       ) : outlets.length > 0 ? (
// // //         <div className="outlets-grid">
// // //           {outlets.map((outlet, index) => (
// // //             <div key={index} className="outlet-card">
// // //               <div className="outlet-image-container">
// // //                 <img
// // //                   src={outlet.image || "/images/default-restaurant.png"}
// // //                   alt={outlet.name}
// // //                   className="outlet-image"
// // //                 />
// // //                 <span className={`badge ${outlet.isOpen ? "open" : "closed"}`}>
// // //                   {outlet.isOpen ? "Open" : "Closed"}
// // //                 </span>
// // //               </div>

// // //               <div className="outlet-details">
// // //                 <h3>{outlet.name}</h3>
// // //                 <p className="outlet-desc">
// // //                   {outlet.description || "Fresh meals and beverages"}
// // //                 </p>
// // //                 <div className="outlet-hours">
// // //                   🕒 {outlet.openTime} - {outlet.closeTime}
// // //                 </div>
// // //               </div>

// // //               <div className="outlet-actions">
// // //                 <button className="edit-btn" onClick={() => openEditModal(outlet)}>
// // //                   Edit
// // //                 </button>
// // //                 <button className="close-btn">
// // //                   {outlet.isOpen ? "Close" : "Open"}
// // //                 </button>
// // //                 <button className="delete-btn">🗑️</button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <p className="no-outlets">No outlets found</p>
// // //       )}

// // //       {showModal && (
// // //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// // //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// // //             <div className="modal-header">
// // //               <h2>{isEditing ? "Edit Outlet" : "Add New Outlet"}</h2>
// // //               <p>
// // //                 {isEditing
// // //                   ? "Update outlet information"
// // //                   : "Add a new food outlet to the campus"}
// // //               </p>

// // //               <button
// // //                 className="close-modal"
// // //                 onClick={() => setShowModal(false)}
// // //               >
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             <form
// // //               className="modal-form"
// // //               onSubmit={isEditing ? handleUpdate : handleSubmit}
// // //             >
// // //               <label>Outlet Name</label>
// // //               <input
// // //                 type="text"
// // //                 name="name"
// // //                 value={formData.name}
// // //                 onChange={handleChange}
// // //                 required
// // //               />

// // //               <label>Description</label>
// // //               <textarea
// // //                 name="description"
// // //                 value={formData.description}
// // //                 onChange={handleChange}
// // //               />

// // //               <div className="time-fields">
// // //                 <div>
// // //                   <label>Opening Time</label>
// // //                   <input
// // //                     type="time"
// // //                     name="openTime"
// // //                     value={formData.openTime}
// // //                     onChange={handleChange}
// // //                   />
// // //                 </div>

// // //                 <div>
// // //                   <label>Closing Time</label>
// // //                   <input
// // //                     type="time"
// // //                     name="closeTime"
// // //                     value={formData.closeTime}
// // //                     onChange={handleChange}
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <label>Image URL (optional)</label>
// // //               <input
// // //                 type="url"
// // //                 name="image"
// // //                 value={formData.image}
// // //                 onChange={handleChange}
// // //               />

// // //               <div className="switch-row">
// // //                 <label>Currently Open</label>
// // //                 <input
// // //                   type="checkbox"
// // //                   name="isOpen"
// // //                   checked={formData.isOpen}
// // //                   onChange={handleChange}
// // //                 />
// // //               </div>

// // //               <div className="modal-actions">
// // //                 <button
// // //                   type="button"
// // //                   className="cancel-btn"
// // //                   onClick={() => setShowModal(false)}
// // //                 >
// // //                   Cancel
// // //                 </button>

// // //                 <button type="submit" className="submit-btn">
// // //                   {isEditing ? "Update Outlet" : "Add Outlet"}
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default AdminOutlets;


// // // frontend/src/pages/AdminOutlets.js
// // import React, { useEffect, useState, useContext } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../utils/api";
// // import { AuthContext } from "../context/AuthContext";
// // import "../styles/AdminOutlets.css";

// // function AdminOutlets() {
// //   const { user } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const [outlets, setOutlets] = useState([]);
// //   const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
// //   const [loading, setLoading] = useState(true);

// //   const [showModal, setShowModal] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [selectedOutlet, setSelectedOutlet] = useState(null);

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     description: "",
// //     openTime: "09:00",
// //     closeTime: "18:00",
// //     image: "",
// //     isOpen: true,
// //   });

// //   useEffect(() => {
// //     if (!user || user.role !== "admin") {
// //       navigate("/admin/login");
// //       return;
// //     }
// //     fetchOutlets();
// //   }, [user, navigate]);

// //   const fetchOutlets = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await api.get("/admin/outlets");
// //       const performance = res.data?.performance || [];
// //       setOutlets(performance);
// //       setStats({
// //         total: performance.length,
// //         open: performance.filter((o) => o.isOpen).length,
// //         closed: performance.filter((o) => !o.isOpen).length,
// //       });
// //     } catch (err) {
// //       console.error("❌ Error fetching outlets:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Send restaurantName explicitly (Option A)
// //       await api.post("/restaurants/register", {
// //         name: formData.name, // login name fallback
// //         restaurantName: formData.name,
// //         description: formData.description,
// //         openTime: formData.openTime,
// //         closeTime: formData.closeTime,
// //         image: formData.image,
// //         isOpen: formData.isOpen,
// //       });

// //       setShowModal(false);
// //       fetchOutlets();
// //       setFormData({
// //         name: "",
// //         description: "",
// //         openTime: "09:00",
// //         closeTime: "18:00",
// //         image: "",
// //         isOpen: true,
// //       });
// //     } catch (err) {
// //       console.error("❌ Failed to add outlet:", err);
// //       alert("Error adding outlet. Please try again.");
// //     }
// //   };

// //   const openEditModal = (outlet) => {
// //     setIsEditing(true);
// //     setSelectedOutlet(outlet);

// //     setFormData({
// //       name: outlet.name || outlet.name || outlet.restaurantName || "",
// //       description: outlet.description || "",
// //       openTime: outlet.openTime || "09:00",
// //       closeTime: outlet.closeTime || "18:00",
// //       image: outlet.image || outlet.image || outlet.profileImage || "",
// //       isOpen: outlet.isOpen ?? true,
// //     });

// //     setShowModal(true);
// //   };

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     if (!selectedOutlet?._id) {
// //       alert("No outlet selected");
// //       return;
// //     }

// //     try {
// //       await api.put(`/restaurants/${selectedOutlet._id}`, {
// //         restaurantName: formData.name,
// //         description: formData.description,
// //         openTime: formData.openTime,
// //         closeTime: formData.closeTime,
// //         profileImage: formData.image,
// //         image: formData.image,
// //         isOpen: formData.isOpen,
// //       });

// //       setShowModal(false);
// //       setIsEditing(false);
// //       setSelectedOutlet(null);
// //       fetchOutlets();
// //     } catch (err) {
// //       console.error("❌ Failed to update outlet:", err);
// //       alert("Error updating outlet. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="admin-outlets">
// //       <header className="outlets-header">
// //         <div>
// //           <h1 className="outlets-title">Outlet Management</h1>
// //           <p className="outlets-subtitle">Manage all campus food outlets</p>
// //         </div>

// //         <button
// //           className="add-outlet-btn"
// //           onClick={() => {
// //             setIsEditing(false);
// //             setSelectedOutlet(null);
// //             setFormData({
// //               name: "",
// //               description: "",
// //               openTime: "09:00",
// //               closeTime: "18:00",
// //               image: "",
// //               isOpen: true,
// //             });
// //             setShowModal(true);
// //           }}
// //         >
// //           + Add Outlet
// //         </button>
// //       </header>

// //       <div className="outlets-stats">
// //         <div className="outlet-stat-card">
// //           <h2>{stats.total}</h2>
// //           <p>Total Outlets</p>
// //         </div>
// //         <div className="outlet-stat-card">
// //           <h2 className="green">{stats.open}</h2>
// //           <p>Currently Open</p>
// //         </div>
// //         <div className="outlet-stat-card">
// //           <h2 className="red">{stats.closed}</h2>
// //           <p>Currently Closed</p>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <p className="loading-text">Loading outlets...</p>
// //       ) : outlets.length > 0 ? (
// //         <div className="outlets-grid">
// //           {outlets.map((outlet, index) => (
// //             <div key={String(outlet._id || index)} className="outlet-card">
// //               <div className="outlet-image-container">
// //                 <img
// //                   src={outlet.image || outlet.profileImage || "/images/default-restaurant.png"}
// //                   alt={outlet.name || outlet.name || outlet.restaurantName}
// //                   className="outlet-image"
// //                 />
// //                 <span className={`badge ${outlet.isOpen ? "open" : "closed"}`}>
// //                   {outlet.isOpen ? "Open" : "Closed"}
// //                 </span>
// //               </div>

// //               <div className="outlet-details">
// //                 <h3>{outlet.name || outlet.restaurantName}</h3>
// //                 <p className="outlet-desc">{outlet.description || "Fresh meals and beverages"}</p>
// //                 <div className="outlet-hours">🕒 {outlet.openTime || "09:00"} - {outlet.closeTime || "18:00"}</div>
// //               </div>

// //               <div className="outlet-actions">
// //                 <button className="edit-btn" onClick={() => openEditModal(outlet)}>Edit</button>
// //                 <button className="close-btn">{outlet.isOpen ? "Close" : "Open"}</button>
// //                 <button className="delete-btn">🗑️</button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <p className="no-outlets">No outlets found</p>
// //       )}

// //       {showModal && (
// //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>{isEditing ? "Edit Outlet" : "Add New Outlet"}</h2>
// //               <p>{isEditing ? "Update outlet information" : "Add a new food outlet to the campus"}</p>

// //               <button className="close-modal" onClick={() => setShowModal(false)}>✕</button>
// //             </div>

// //             <form className="modal-form" onSubmit={isEditing ? handleUpdate : handleSubmit}>
// //               <label>Outlet Name</label>
// //               <input type="text" name="name" value={formData.name} onChange={handleChange} required />

// //               <label>Description</label>
// //               <textarea name="description" value={formData.description} onChange={handleChange} />

// //               <div className="time-fields">
// //                 <div>
// //                   <label>Opening Time</label>
// //                   <input type="time" name="openTime" value={formData.openTime} onChange={handleChange} />
// //                 </div>

// //                 <div>
// //                   <label>Closing Time</label>
// //                   <input type="time" name="closeTime" value={formData.closeTime} onChange={handleChange} />
// //                 </div>
// //               </div>

// //               <label>Image URL (optional)</label>
// //               <input type="url" name="image" value={formData.image} onChange={handleChange} />

// //               <div className="switch-row">
// //                 <label>Currently Open</label>
// //                 <input type="checkbox" name="isOpen" checked={formData.isOpen} onChange={handleChange} />
// //               </div>

// //               <div className="modal-actions">
// //                 <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
// //                 <button type="submit" className="submit-btn">{isEditing ? "Update Outlet" : "Add Outlet"}</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default AdminOutlets;









// // frontend/src/pages/AdminOutlets.js
// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/AdminOutlets.css";

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

//   useEffect(() => {
//     if (!user || user.role !== "admin") {
//       navigate("/admin/login");
//       return;
//     }
//     fetchOutlets();
//   }, [user, navigate]);

//   const fetchOutlets = async () => {
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
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

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

//   const openEditModal = (outlet) => {
//     setIsEditing(true);
//     setSelectedOutlet(outlet);

//     setFormData({
//       name: outlet.name || outlet.restaurantName || "",
//       description: outlet.description || "",
//       openTime: outlet.openTime || "09:00",
//       closeTime: outlet.closeTime || "18:00",
//       image: outlet.image || outlet.profileImage || "",
//       isOpen: outlet.isOpen ?? true,
//     });

//     setShowModal(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!selectedOutlet?._id) {
//       alert("No outlet selected");
//       return;
//     }

//     try {
//       await api.put(`/restaurants/${selectedOutlet._id}`, {
//         restaurantName: formData.name,
//         description: formData.description,
//         openTime: formData.openTime,
//         closeTime: formData.closeTime,
//         profileImage: formData.image,
//         image: formData.image,
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

//   return (
//     <div className="admin-outlets">
//       <header className="outlets-header">
//         <div>
//           <h1 className="outlets-title">Outlet Management</h1>
//           <p className="outlets-subtitle">Manage all campus food outlets</p>
//         </div>
//         {/* Add Outlet Button Removed */}
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

//       {loading ? (
//         <p className="loading-text">Loading outlets...</p>
//       ) : outlets.length > 0 ? (
//         <div className="outlets-grid">
//           {outlets.map((outlet, index) => (
//             <div key={String(outlet._id || index)} className="outlet-card">
//               <div className="outlet-image-container">
//                 <img
//                   src={outlet.image || outlet.profileImage || "/images/default-restaurant.png"}
//                   alt={outlet.name || outlet.restaurantName}
//                   className="outlet-image"
//                 />
//                 <span className={`badge ${outlet.isOpen ? "open" : "closed"}`}>
//                   {outlet.isOpen ? "Open" : "Closed"}
//                 </span>
//               </div>

//               <div className="outlet-details">
//                 <h3>{outlet.name || outlet.restaurantName}</h3>
//                 <p className="outlet-desc">{outlet.description || "Fresh meals and beverages"}</p>
//                 <div className="outlet-hours">🕒 {outlet.openTime} - {outlet.closeTime}</div>
//               </div>

//               <div className="outlet-actions">
//                 <button className="edit-btn" onClick={() => openEditModal(outlet)}>Edit</button>
//                 <button className="close-btn">{outlet.isOpen ? "Close" : "Open"}</button>
//                 <button className="delete-btn">🗑️</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="no-outlets">No outlets found</p>
//       )}

//       {/* Modal logic stays same */}
//       {showModal && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>{isEditing ? "Edit Outlet" : "Add New Outlet"}</h2>
//               <p>{isEditing ? "Update outlet information" : "Add a new food outlet to the campus"}</p>
//               <button className="close-modal" onClick={() => setShowModal(false)}>✕</button>
//             </div>

//             <form className="modal-form" onSubmit={isEditing ? handleUpdate : handleSubmit}>
//               <label>Outlet Name</label>
//               <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//               <label>Description</label>
//               <textarea name="description" value={formData.description} onChange={handleChange} />

//               <div className="time-fields">
//                 <div>
//                   <label>Opening Time</label>
//                   <input type="time" name="openTime" value={formData.openTime} onChange={handleChange} />
//                 </div>

//                 <div>
//                   <label>Closing Time</label>
//                   <input type="time" name="closeTime" value={formData.closeTime} onChange={handleChange} />
//                 </div>
//               </div>

//               <label>Image URL (optional)</label>
//               <input type="url" name="image" value={formData.image} onChange={handleChange} />

//               <div className="switch-row">
//                 <label>Currently Open</label>
//                 <input type="checkbox" name="isOpen" checked={formData.isOpen} onChange={handleChange} />
//               </div>

//               <div className="modal-actions">
//                 <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
//                 <button type="submit" className="submit-btn">{isEditing ? "Update Outlet" : "Add Outlet"}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminOutlets;








// frontend/src/pages/AdminOutlets.js
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/AdminOutlets.css";

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

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    fetchOutlets();
  }, [user, navigate]);

  const fetchOutlets = async () => {
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
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

  const openEditModal = (outlet) => {
    setIsEditing(true);
    setSelectedOutlet(outlet);

    setFormData({
      name: outlet.name || outlet.restaurantName || "",
      description: outlet.description || "",
      openTime: outlet.openTime || "09:00",
      closeTime: outlet.closeTime || "18:00",
      image: outlet.image || outlet.profileImage || "",
      isOpen: outlet.isOpen ?? true,
    });

    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedOutlet?._id) {
      alert("No outlet selected");
      return;
    }

    try {
      await api.put(`/restaurants/${selectedOutlet._id}`, {
        restaurantName: formData.name,
        description: formData.description,
        openTime: formData.openTime,
        closeTime: formData.closeTime,
        profileImage: formData.image,
        image: formData.image,
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

  // ⭐⭐⭐ ADDED: OPEN / CLOSE TOGGLE FUNCTION
  const toggleOutletStatus = async (outlet) => {
    try {
      const updatedStatus = !outlet.isOpen;

      await api.put(`/restaurants/${outlet._id}`, {
        isOpen: updatedStatus,
      });

      // Update UI instantly
      setOutlets((prev) =>
        prev.map((o) =>
          o._id === outlet._id ? { ...o, isOpen: updatedStatus } : o
        )
      );

      // Update stats
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

  return (
    <div className="admin-outlets">
      <header className="outlets-header">
        <div>
          <h1 className="outlets-title">Outlet Management</h1>
          <p className="outlets-subtitle">Manage all campus food outlets</p>
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

      {loading ? (
        <p className="loading-text">Loading outlets...</p>
      ) : outlets.length > 0 ? (
        <div className="outlets-grid">
          {outlets.map((outlet, index) => (
            <div key={String(outlet._id || index)} className="outlet-card">
              <div className="outlet-image-container">
                <img
                  src={
                    outlet.image ||
                    outlet.profileImage ||
                    "/images/default-restaurant.png"
                  }
                  alt={outlet.name || outlet.restaurantName}
                  className="outlet-image"
                />
                <span
                  className={`badge ${outlet.isOpen ? "open" : "closed"}`}
                >
                  {outlet.isOpen ? "Open" : "Closed"}
                </span>
              </div>

              <div className="outlet-details">
                <h3>{outlet.name || outlet.restaurantName}</h3>
                <p className="outlet-desc">
                  {outlet.description || "Fresh meals and beverages"}
                </p>
                <div className="outlet-hours">
                  🕒 {outlet.openTime} - {outlet.closeTime}
                </div>
              </div>

              <div className="outlet-actions">
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(outlet)}
                >
                  Edit
                </button>

                {/* ⭐⭐⭐ UPDATED BUTTON */}
                <button
                  className="close-btn"
                  onClick={() => toggleOutletStatus(outlet)}
                >
                  {outlet.isOpen ? "Close" : "Open"}
                </button>

                <button className="delete-btn">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-outlets">No outlets found</p>
      )}

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
                type="url"
                name="image"
                value={formData.image}
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
