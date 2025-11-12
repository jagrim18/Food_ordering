// // // // // // // // ✅ frontend/src/pages/Profile.js
// // // // // // // import React, { useState, useEffect, useContext } from "react";
// // // // // // // import api from "../utils/api";
// // // // // // // import { AuthContext } from "../context/AuthContext";
// // // // // // // import { toast } from "react-toastify";
// // // // // // // import "react-toastify/dist/ReactToastify.css";
// // // // // // // import "../styles/Profile.css";

// // // // // // // function Profile() {
// // // // // // //   const { user, setUser } = useContext(AuthContext);
// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     name: "",
// // // // // // //     email: "",
// // // // // // //     mobile: "",
// // // // // // //     dob: "",
// // // // // // //     profilePic: "",
// // // // // // //     restaurantName: "",
// // // // // // //     address: "",
// // // // // // //     cuisineType: "",
// // // // // // //   });
// // // // // // //   const [previewPic, setPreviewPic] = useState("");

// // // // // // //   const endpointPrefix =
// // // // // // //     user?.role === "restaurant"
// // // // // // //       ? "/restaurants"
// // // // // // //       : user?.role === "admin"
// // // // // // //       ? "/admin"
// // // // // // //       : "/users";

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchProfile = async () => {
// // // // // // //       try {
// // // // // // //         const { data } = await api.get(`${endpointPrefix}/profile`);
// // // // // // //         setFormData({
// // // // // // //           name: data.name || "",
// // // // // // //           email: data.email || "",
// // // // // // //           mobile: data.mobile || "",
// // // // // // //           dob: data.dob ? data.dob.split("T")[0] : "",
// // // // // // //           profilePic: data.profilePic || "",
// // // // // // //           restaurantName: data.restaurantName || "",
// // // // // // //           address: data.address || "",
// // // // // // //           cuisineType: data.cuisineType || "",
// // // // // // //         });
// // // // // // //         setPreviewPic(data.profilePic || "");
// // // // // // //       } catch (error) {
// // // // // // //         console.error("❌ Error fetching profile:", error);
// // // // // // //         toast.error("Failed to load profile!");
// // // // // // //       }
// // // // // // //     };

// // // // // // //     if (user?.role) fetchProfile();
// // // // // // //   }, [endpointPrefix, user?.role]);

// // // // // // //   const handleChange = (e) => {
// // // // // // //     const { name, value } = e.target;
// // // // // // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // // // // // //   };

// // // // // // //   const handleImageChange = (e) => {
// // // // // // //     const file = e.target.files[0];
// // // // // // //     if (file) {
// // // // // // //       const reader = new FileReader();
// // // // // // //       reader.onloadend = () => {
// // // // // // //         setPreviewPic(reader.result);
// // // // // // //         setFormData((prev) => ({ ...prev, profilePic: reader.result }));
// // // // // // //       };
// // // // // // //       reader.readAsDataURL(file);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSubmit = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     try {
// // // // // // //       const { data } = await api.put(`${endpointPrefix}/profile`, formData);
// // // // // // //       const updatedUser = { ...user, ...data };
// // // // // // //       setUser(updatedUser);

// // // // // // //       if (user.role === "restaurant") {
// // // // // // //         localStorage.setItem("restaurant", JSON.stringify(updatedUser));
// // // // // // //       } else if (user.role === "admin") {
// // // // // // //         localStorage.setItem("admin", JSON.stringify(updatedUser));
// // // // // // //       } else {
// // // // // // //         localStorage.setItem("user", JSON.stringify(updatedUser));
// // // // // // //       }

// // // // // // //       toast.success("✅ Profile updated successfully!");
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Error updating profile:", error);
// // // // // // //       toast.error(error.response?.data?.message || "Failed to update profile!");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="profile-glass-container">
// // // // // // //       <div className="profile-glass-card">
// // // // // // //         <h2 className="profile-glass-title">
// // // // // // //           {user?.role === "restaurant"
// // // // // // //             ? "🍽️ Restaurant Profile"
// // // // // // //             : user?.role === "admin"
// // // // // // //             ? "👑 Admin Profile"
// // // // // // //             : "👤 My Profile"}
// // // // // // //         </h2>

// // // // // // //         <div className="profile-glass-grid">
// // // // // // //           {/* Left Side - Profile Picture */}
// // // // // // //           <div className="profile-glass-left">
// // // // // // //             <img
// // // // // // //               src={previewPic || "https://via.placeholder.com/120"}
// // // // // // //               alt="Profile"
// // // // // // //               className="profile-glass-pic"
// // // // // // //             />
// // // // // // //             <label htmlFor="profilePicUpload" className="glass-upload-label">
// // // // // // //               📷 Change Photo
// // // // // // //             </label>
// // // // // // //             <input
// // // // // // //               id="profilePicUpload"
// // // // // // //               type="file"
// // // // // // //               accept="image/*"
// // // // // // //               onChange={handleImageChange}
// // // // // // //             />
// // // // // // //           </div>

// // // // // // //           {/* Right Side - Form */}
// // // // // // //           <form onSubmit={handleSubmit} className="profile-glass-form">
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               name="name"
// // // // // // //               placeholder="Full Name"
// // // // // // //               value={formData.name}
// // // // // // //               onChange={handleChange}
// // // // // // //               required
// // // // // // //             />
// // // // // // //             <input
// // // // // // //               type="email"
// // // // // // //               name="email"
// // // // // // //               placeholder="Email"
// // // // // // //               value={formData.email}
// // // // // // //               disabled
// // // // // // //             />
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               name="mobile"
// // // // // // //               placeholder="Mobile Number"
// // // // // // //               value={formData.mobile}
// // // // // // //               onChange={handleChange}
// // // // // // //             />
// // // // // // //             <input
// // // // // // //               type="date"
// // // // // // //               name="dob"
// // // // // // //               placeholder="Date of Birth"
// // // // // // //               value={formData.dob}
// // // // // // //               onChange={handleChange}
// // // // // // //             />

// // // // // // //             {user?.role === "restaurant" && (
// // // // // // //               <>
// // // // // // //                 <input
// // // // // // //                   type="text"
// // // // // // //                   name="restaurantName"
// // // // // // //                   placeholder="Restaurant Name"
// // // // // // //                   value={formData.restaurantName}
// // // // // // //                   onChange={handleChange}
// // // // // // //                 />
// // // // // // //                 <input
// // // // // // //                   type="text"
// // // // // // //                   name="address"
// // // // // // //                   placeholder="Address"
// // // // // // //                   value={formData.address}
// // // // // // //                   onChange={handleChange}
// // // // // // //                 />
// // // // // // //                 <input
// // // // // // //                   type="text"
// // // // // // //                   name="cuisineType"
// // // // // // //                   placeholder="Cuisine Type"
// // // // // // //                   value={formData.cuisineType}
// // // // // // //                   onChange={handleChange}
// // // // // // //                 />
// // // // // // //               </>
// // // // // // //             )}

// // // // // // //             <button type="submit" className="glass-save-btn">
// // // // // // //               💾 Save Changes
// // // // // // //             </button>
// // // // // // //           </form>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default Profile;








// // // // // // import React, { useState, useEffect, useContext } from "react";
// // // // // // import api from "../utils/api";
// // // // // // import { AuthContext } from "../context/AuthContext";
// // // // // // import { toast } from "react-toastify";
// // // // // // import "react-toastify/dist/ReactToastify.css";
// // // // // // import "../styles/Profile.css";

// // // // // // function Profile() {
// // // // // //   const { user, setUser } = useContext(AuthContext);
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     name: "",
// // // // // //     email: "",
// // // // // //     mobile: "",
// // // // // //     dob: "",
// // // // // //     profileImage: "",
// // // // // //     restaurantName: "",
// // // // // //     address: "",
// // // // // //     cuisineType: "",
// // // // // //   });
// // // // // //   const [previewPic, setPreviewPic] = useState(null);
// // // // // //   const [imageFile, setImageFile] = useState(null);
// // // // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // // // //   const endpointPrefix =
// // // // // //     user?.role === "restaurant"
// // // // // //       ? "/restaurants"
// // // // // //       : user?.role === "admin"
// // // // // //       ? "/admin"
// // // // // //       : "/users";

// // // // // //   useEffect(() => {
// // // // // //     const fetchProfile = async () => {
// // // // // //       try {
// // // // // //         const { data } = await api.get(`${endpointPrefix}/profile`);
// // // // // //         setFormData({
// // // // // //           name: data.name || "",
// // // // // //           email: data.email || "",
// // // // // //           mobile: data.mobile || "",
// // // // // //           dob: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
// // // // // //           profileImage: data.profileImage || "",
// // // // // //           restaurantName: data.restaurantName || "",
// // // // // //           address: data.address || "",
// // // // // //           cuisineType: data.cuisineType || "",
// // // // // //         });
// // // // // //         setPreviewPic(data.profileImage ? data.profileImage : null);
// // // // // //       } catch (error) {
// // // // // //         console.error("❌ Error fetching profile:", error);
// // // // // //         toast.error("Failed to load profile!");
// // // // // //       }
// // // // // //     };

// // // // // //     if (user?.role) fetchProfile();
// // // // // //   }, [endpointPrefix, user?.role]);

// // // // // //   const handleChange = (e) => {
// // // // // //     const { name, value } = e.target;
// // // // // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // // // // //   };

// // // // // //   const handleImageChange = (e) => {
// // // // // //     const file = e.target.files[0];
// // // // // //     if (file) {
// // // // // //       setImageFile(file);
// // // // // //       const previewURL = URL.createObjectURL(file);
// // // // // //       setPreviewPic(previewURL);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     try {
// // // // // //       const form = new FormData();
// // // // // //       form.append("name", formData.name);
// // // // // //       form.append("mobile", formData.mobile);
// // // // // //       form.append("dateOfBirth", formData.dob);
// // // // // //       if (imageFile) form.append("profileImage", imageFile);

// // // // // //       if (user?.role === "restaurant") {
// // // // // //         form.append("restaurantName", formData.restaurantName);
// // // // // //         form.append("address", formData.address);
// // // // // //         form.append("cuisineType", formData.cuisineType);
// // // // // //       }

// // // // // //       const { data } = await api.put(`${endpointPrefix}/profile`, form, {
// // // // // //         headers: { "Content-Type": "multipart/form-data" },
// // // // // //       });

// // // // // //       const updatedUser = { ...user, ...data };
// // // // // //       setUser(updatedUser);

// // // // // //       if (user.role === "restaurant") {
// // // // // //         localStorage.setItem("restaurant", JSON.stringify(updatedUser));
// // // // // //       } else if (user.role === "admin") {
// // // // // //         localStorage.setItem("admin", JSON.stringify(updatedUser));
// // // // // //       } else {
// // // // // //         localStorage.setItem("user", JSON.stringify(updatedUser));
// // // // // //       }

// // // // // //       // ✅ Success toast and modal popup
// // // // // //       toast.success("✅ Profile updated successfully!");
// // // // // //       setShowSuccessModal(true);
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Error updating profile:", error);
// // // // // //       toast.error(error.response?.data?.message || "Failed to update profile!");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="profile-glass-container">
// // // // // //       <div className="profile-glass-card">
// // // // // //         <h2 className="profile-glass-title">
// // // // // //           {user?.role === "restaurant"
// // // // // //             ? "🍽️ Restaurant Profile"
// // // // // //             : user?.role === "admin"
// // // // // //             ? "👑 Admin Profile"
// // // // // //             : "👤 My Profile"}
// // // // // //         </h2>

// // // // // //         <div className="profile-glass-grid">
// // // // // //           {/* Left Side - Profile Picture */}
// // // // // //           <div className="profile-glass-left">
// // // // // //             <img
// // // // // //               src={
// // // // // //                 previewPic
// // // // // //                   ? previewPic.startsWith("blob")
// // // // // //                     ? previewPic
// // // // // //                     : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${previewPic}`
// // // // // //                   : "https://via.placeholder.com/120"
// // // // // //               }
// // // // // //               alt="Profile"
// // // // // //               className="profile-glass-pic"
// // // // // //             />
// // // // // //             <label htmlFor="profilePicUpload" className="glass-upload-label">
// // // // // //               📷 Change Photo
// // // // // //             </label>
// // // // // //             <input
// // // // // //               id="profilePicUpload"
// // // // // //               type="file"
// // // // // //               accept="image/*"
// // // // // //               onChange={handleImageChange}
// // // // // //             />
// // // // // //           </div>

// // // // // //           {/* Right Side - Form */}
// // // // // //           <form onSubmit={handleSubmit} className="profile-glass-form">
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               name="name"
// // // // // //               placeholder="Full Name"
// // // // // //               value={formData.name}
// // // // // //               onChange={handleChange}
// // // // // //               required
// // // // // //             />
// // // // // //             <input
// // // // // //               type="email"
// // // // // //               name="email"
// // // // // //               placeholder="Email"
// // // // // //               value={formData.email}
// // // // // //               disabled
// // // // // //             />
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               name="mobile"
// // // // // //               placeholder="Mobile Number"
// // // // // //               value={formData.mobile}
// // // // // //               onChange={handleChange}
// // // // // //             />
// // // // // //             <input
// // // // // //               type="date"
// // // // // //               name="dob"
// // // // // //               placeholder="Date of Birth"
// // // // // //               value={formData.dob}
// // // // // //               onChange={handleChange}
// // // // // //             />

// // // // // //             {user?.role === "restaurant" && (
// // // // // //               <>
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   name="restaurantName"
// // // // // //                   placeholder="Restaurant Name"
// // // // // //                   value={formData.restaurantName}
// // // // // //                   onChange={handleChange}
// // // // // //                 />
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   name="address"
// // // // // //                   placeholder="Address"
// // // // // //                   value={formData.address}
// // // // // //                   onChange={handleChange}
// // // // // //                 />
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   name="cuisineType"
// // // // // //                   placeholder="Cuisine Type"
// // // // // //                   value={formData.cuisineType}
// // // // // //                   onChange={handleChange}
// // // // // //                 />
// // // // // //               </>
// // // // // //             )}

// // // // // //             <button type="submit" className="glass-save-btn">
// // // // // //               💾 Save Changes
// // // // // //             </button>
// // // // // //           </form>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* ✅ Success Modal */}
// // // // // //       {showSuccessModal && (
// // // // // //         <div className="popup-overlay">
// // // // // //           <div className="popup-box">
// // // // // //             <h3>✅ Profile Updated!</h3>
// // // // // //             <p>Your profile information has been saved successfully.</p>
// // // // // //             <button onClick={() => setShowSuccessModal(false)}>OK</button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default Profile;







// // // // // import React, { useState, useEffect, useContext } from "react";
// // // // // import api from "../utils/api";
// // // // // import { AuthContext } from "../context/AuthContext";
// // // // // import { toast } from "react-toastify";
// // // // // import "react-toastify/dist/ReactToastify.css";
// // // // // import "../styles/Profile.css";

// // // // // function Profile() {
// // // // //   const { user, setUser } = useContext(AuthContext);
// // // // //   const [formData, setFormData] = useState({
// // // // //     name: "",
// // // // //     email: "",
// // // // //     mobile: "",
// // // // //     dob: "",
// // // // //     profileImage: "",
// // // // //     restaurantName: "",
// // // // //     address: "",
// // // // //     cuisineType: "",
// // // // //   });
// // // // //   const [previewPic, setPreviewPic] = useState(null);
// // // // //   const [imageFile, setImageFile] = useState(null);
// // // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // // //   const endpointPrefix =
// // // // //     user?.role === "restaurant"
// // // // //       ? "/restaurants"
// // // // //       : user?.role === "admin"
// // // // //       ? "/admin"
// // // // //       : "/users";

// // // // //   useEffect(() => {
// // // // //     const fetchProfile = async () => {
// // // // //       try {
// // // // //         const { data } = await api.get(`${endpointPrefix}/profile`);
// // // // //         setFormData({
// // // // //           name: data.name || "",
// // // // //           email: data.email || "",
// // // // //           mobile: data.mobile || "",
// // // // //           dob: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
// // // // //           profileImage: data.profileImage || "",
// // // // //           restaurantName: data.restaurantName || "",
// // // // //           address: data.address || "",
// // // // //           cuisineType: data.cuisineType || "",
// // // // //         });
// // // // //         setPreviewPic(data.profileImage ? data.profileImage : null);
// // // // //       } catch (error) {
// // // // //         console.error("❌ Error fetching profile:", error);
// // // // //         toast.error("Failed to load profile!");
// // // // //       }
// // // // //     };

// // // // //     if (user?.role) fetchProfile();
// // // // //   }, [endpointPrefix, user?.role]);

// // // // //   const handleChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // // // //   };

// // // // //   const handleImageChange = (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (file) {
// // // // //       setImageFile(file);
// // // // //       const previewURL = URL.createObjectURL(file);
// // // // //       setPreviewPic(previewURL);
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       const form = new FormData();
// // // // //       form.append("name", formData.name);
// // // // //       form.append("mobile", formData.mobile);
// // // // //       form.append("dateOfBirth", formData.dob);
// // // // //       if (imageFile) form.append("profileImage", imageFile);

// // // // //       if (user?.role === "restaurant") {
// // // // //         form.append("restaurantName", formData.restaurantName);
// // // // //         form.append("address", formData.address);
// // // // //         form.append("cuisineType", formData.cuisineType);
// // // // //       }

// // // // //       const { data } = await api.put(`${endpointPrefix}/profile`, form, {
// // // // //         headers: { "Content-Type": "multipart/form-data" },
// // // // //       });

// // // // //       const updatedUser = { ...user, ...data };
// // // // //       setUser(updatedUser);

// // // // //       if (user.role === "restaurant") {
// // // // //         localStorage.setItem("restaurant", JSON.stringify(updatedUser));
// // // // //       } else if (user.role === "admin") {
// // // // //         localStorage.setItem("admin", JSON.stringify(updatedUser));
// // // // //       } else {
// // // // //         localStorage.setItem("user", JSON.stringify(updatedUser));
// // // // //       }

// // // // //       toast.success("✅ Profile updated successfully!");
// // // // //       setShowSuccessModal(true);
// // // // //     } catch (error) {
// // // // //       console.error("❌ Error updating profile:", error);
// // // // //       toast.error(error.response?.data?.message || "Failed to update profile!");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="profile-container">
// // // // //       {/* === Header === */}
// // // // //       <div className="profile-header">
// // // // //         <h2>My Profile</h2>
// // // // //         <p>Manage your account settings and preferences</p>
// // // // //       </div>

// // // // //       {/* === Profile Summary Card === */}
// // // // //       <div className="profile-card">
// // // // //         <div className="profile-info">
// // // // //           <div className="profile-avatar">
// // // // //             <img
// // // // //               src={
// // // // //                 previewPic
// // // // //                   ? previewPic.startsWith("blob")
// // // // //                     ? previewPic
// // // // //                     : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${previewPic}`
// // // // //                   : "https://via.placeholder.com/100"
// // // // //               }
// // // // //               alt="Profile"
// // // // //             />
// // // // //           </div>
// // // // //           <div className="profile-details">
// // // // //             <h3>{formData.name || "User"}</h3>
// // // // //             <p>{formData.email}</p>
// // // // //             <p className="role-type">
// // // // //               Account Type:{" "}
// // // // //               {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
// // // // //             </p>
// // // // //           </div>
// // // // //           <label htmlFor="profilePicUpload" className="edit-btn">
// // // // //             ✏️ Edit Profile
// // // // //           </label>
// // // // //           <input
// // // // //             id="profilePicUpload"
// // // // //             type="file"
// // // // //             accept="image/*"
// // // // //             onChange={handleImageChange}
// // // // //             hidden
// // // // //           />
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* === Personal Information === */}
// // // // //       <form onSubmit={handleSubmit} className="profile-form">
// // // // //         <div className="form-section">
// // // // //           <h4>Personal Information</h4>
// // // // //           <div className="form-grid">
// // // // //             <div className="form-field">
// // // // //               <label>Full Name</label>
// // // // //               <input
// // // // //                 type="text"
// // // // //                 name="name"
// // // // //                 value={formData.name}
// // // // //                 onChange={handleChange}
// // // // //                 placeholder="Enter full name"
// // // // //               />
// // // // //             </div>
// // // // //             <div className="form-field">
// // // // //               <label>Email</label>
// // // // //               <input type="email" name="email" value={formData.email} disabled />
// // // // //             </div>
// // // // //             <div className="form-field">
// // // // //               <label>Phone Number</label>
// // // // //               <input
// // // // //                 type="text"
// // // // //                 name="mobile"
// // // // //                 value={formData.mobile}
// // // // //                 onChange={handleChange}
// // // // //                 placeholder="Enter phone number"
// // // // //               />
// // // // //             </div>
// // // // //             <div className="form-field">
// // // // //               <label>Date of Birth</label>
// // // // //               <input
// // // // //                 type="date"
// // // // //                 name="dob"
// // // // //                 value={formData.dob}
// // // // //                 onChange={handleChange}
// // // // //               />
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* === Restaurant Info (for restaurant users) === */}
// // // // //         {user?.role === "restaurant" && (
// // // // //           <div className="form-section">
// // // // //             <h4>Restaurant Details</h4>
// // // // //             <div className="form-grid">
// // // // //               <div className="form-field">
// // // // //                 <label>Restaurant Name</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   name="restaurantName"
// // // // //                   value={formData.restaurantName}
// // // // //                   onChange={handleChange}
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="form-field">
// // // // //                 <label>Address</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   name="address"
// // // // //                   value={formData.address}
// // // // //                   onChange={handleChange}
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="form-field">
// // // // //                 <label>Cuisine Type</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   name="cuisineType"
// // // // //                   value={formData.cuisineType}
// // // // //                   onChange={handleChange}
// // // // //                 />
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* === Preferences Section === */}
// // // // //         <div className="form-section">
// // // // //           <h4>Preferences</h4>
// // // // //           <div className="pref-card">
// // // // //             <div>
// // // // //               <h5>Email Notifications</h5>
// // // // //               <p>Receive updates about your orders</p>
// // // // //             </div>
// // // // //             <button type="button" className="pref-btn enabled">
// // // // //               Enabled
// // // // //             </button>
// // // // //           </div>
// // // // //           <div className="pref-card">
// // // // //             <div>
// // // // //               <h5>SMS Notifications</h5>
// // // // //               <p>Get text updates when order is ready</p>
// // // // //             </div>
// // // // //             <button type="button" className="pref-btn disabled">
// // // // //               Disabled
// // // // //             </button>
// // // // //           </div>
// // // // //           <div className="pref-card">
// // // // //             <div>
// // // // //               <h5>Promotional Emails</h5>
// // // // //               <p>Receive special offers and deals</p>
// // // // //             </div>
// // // // //             <button type="button" className="pref-btn enabled">
// // // // //               Enabled
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* === Account Actions === */}
// // // // //         <div className="form-section">
// // // // //           <h4>Account Actions</h4>
// // // // //           <div className="actions-grid">
// // // // //             <button type="button" className="action-btn">
// // // // //               Change Password
// // // // //             </button>
// // // // //             <button type="button" className="action-btn delete">
// // // // //               Delete Account
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="form-actions">
// // // // //           <button type="submit" className="save-btn">
// // // // //             Save Changes
// // // // //           </button>
// // // // //         </div>
// // // // //       </form>

// // // // //       {/* === Success Modal === */}
// // // // //       {showSuccessModal && (
// // // // //         <div className="popup-overlay">
// // // // //           <div className="popup-box">
// // // // //             <h3>✅ Profile Updated!</h3>
// // // // //             <p>Your profile information has been saved successfully.</p>
// // // // //             <button onClick={() => setShowSuccessModal(false)}>OK</button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Profile;






// // // // import React, { useState, useEffect, useContext } from "react";
// // // // import api from "../utils/api";
// // // // import { AuthContext } from "../context/AuthContext";
// // // // import { toast } from "react-toastify";
// // // // import "react-toastify/dist/ReactToastify.css";
// // // // import "../styles/Profile.css";

// // // // function Profile() {
// // // //   const { user, setUser } = useContext(AuthContext);
// // // //   const [formData, setFormData] = useState({
// // // //     name: "",
// // // //     email: "",
// // // //     mobile: "",
// // // //     dob: "",
// // // //     profileImage: "",
// // // //     restaurantName: "",
// // // //     address: "",
// // // //     cuisineType: "",
// // // //   });
// // // //   const [previewPic, setPreviewPic] = useState(null);
// // // //   const [imageFile, setImageFile] = useState(null);
// // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // //   // New state for password/delete modals
// // // //   const [showPasswordModal, setShowPasswordModal] = useState(false);
// // // //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// // // //   const [passwordData, setPasswordData] = useState({
// // // //     currentPassword: "",
// // // //     newPassword: "",
// // // //   });

// // // //   const endpointPrefix =
// // // //     user?.role === "restaurant"
// // // //       ? "/restaurants"
// // // //       : user?.role === "admin"
// // // //       ? "/admin"
// // // //       : "/users";

// // // //   // === Fetch Profile ===
// // // //   useEffect(() => {
// // // //     const fetchProfile = async () => {
// // // //       try {
// // // //         const { data } = await api.get(`${endpointPrefix}/profile`);
// // // //         setFormData({
// // // //           name: data.name || "",
// // // //           email: data.email || "",
// // // //           mobile: data.mobile || "",
// // // //           dob: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
// // // //           profileImage: data.profileImage || "",
// // // //           restaurantName: data.restaurantName || "",
// // // //           address: data.address || "",
// // // //           cuisineType: data.cuisineType || "",
// // // //         });
// // // //         setPreviewPic(data.profileImage ? data.profileImage : null);
// // // //       } catch (error) {
// // // //         console.error("❌ Error fetching profile:", error);
// // // //         toast.error("Failed to load profile!");
// // // //       }
// // // //     };

// // // //     if (user?.role) fetchProfile();
// // // //   }, [endpointPrefix, user?.role]);

// // // //   // === Handle Changes ===
// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // // //   };

// // // //   const handleImageChange = (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (file) {
// // // //       setImageFile(file);
// // // //       const previewURL = URL.createObjectURL(file);
// // // //       setPreviewPic(previewURL);
// // // //     }
// // // //   };

// // // //   // === Update Profile ===
// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const form = new FormData();
// // // //       form.append("name", formData.name);
// // // //       form.append("mobile", formData.mobile);
// // // //       form.append("dateOfBirth", formData.dob);
// // // //       if (imageFile) form.append("profileImage", imageFile);

// // // //       if (user?.role === "restaurant") {
// // // //         form.append("restaurantName", formData.restaurantName);
// // // //         form.append("address", formData.address);
// // // //         form.append("cuisineType", formData.cuisineType);
// // // //       }

// // // //       const { data } = await api.put(`${endpointPrefix}/profile`, form, {
// // // //         headers: { "Content-Type": "multipart/form-data" },
// // // //       });

// // // //       const updatedUser = { ...user, ...data };
// // // //       setUser(updatedUser);

// // // //       if (user.role === "restaurant") {
// // // //         localStorage.setItem("restaurant", JSON.stringify(updatedUser));
// // // //       } else if (user.role === "admin") {
// // // //         localStorage.setItem("admin", JSON.stringify(updatedUser));
// // // //       } else {
// // // //         localStorage.setItem("user", JSON.stringify(updatedUser));
// // // //       }

// // // //       toast.success("✅ Profile updated successfully!");
// // // //       setShowSuccessModal(true);
// // // //     } catch (error) {
// // // //       console.error("❌ Error updating profile:", error);
// // // //       toast.error(error.response?.data?.message || "Failed to update profile!");
// // // //     }
// // // //   };

// // // //   // === Change Password ===
// // // //   const handlePasswordChange = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       await api.put("/users/change-password", passwordData);
// // // //       toast.success("🔐 Password updated successfully!");
// // // //       setShowPasswordModal(false);
// // // //       setPasswordData({ currentPassword: "", newPassword: "" });
// // // //     } catch (error) {
// // // //       toast.error(error.response?.data?.message || "Failed to change password");
// // // //     }
// // // //   };

// // // //   // === Delete Account ===
// // // //   const handleDeleteAccount = async () => {
// // // //     try {
// // // //       await api.delete("/users/delete-account");
// // // //       toast.success("🗑️ Account deleted successfully!");
// // // //       localStorage.clear();
// // // //       setUser(null);
// // // //       window.location.href = "/login";
// // // //     } catch (error) {
// // // //       toast.error(error.response?.data?.message || "Failed to delete account");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="profile-container">
// // // //       {/* === Header === */}
// // // //       <div className="profile-header">
// // // //         <h2>My Profile</h2>
// // // //         <p>Manage your account settings and preferences</p>
// // // //       </div>

// // // //       {/* === Profile Summary === */}
// // // //       <div className="profile-card">
// // // //         <div className="profile-info">
// // // //           <div className="profile-avatar">
// // // //             <img
// // // //               src={
// // // //                 previewPic
// // // //                   ? previewPic.startsWith("blob")
// // // //                     ? previewPic
// // // //                     : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${previewPic}`
// // // //                   : "https://via.placeholder.com/100"
// // // //               }
// // // //               alt="Profile"
// // // //             />
// // // //           </div>
// // // //           <div className="profile-details">
// // // //             <h3>{formData.name || "User"}</h3>
// // // //             <p>{formData.email}</p>
// // // //             <p className="role-type">
// // // //               Account Type:{" "}
// // // //               {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
// // // //             </p>
// // // //           </div>
// // // //           <label htmlFor="profilePicUpload" className="edit-btn">
// // // //             ✏️ Edit Profile
// // // //           </label>
// // // //           <input
// // // //             id="profilePicUpload"
// // // //             type="file"
// // // //             accept="image/*"
// // // //             onChange={handleImageChange}
// // // //             hidden
// // // //           />
// // // //         </div>
// // // //       </div>

// // // //       {/* === Profile Form === */}
// // // //       <form onSubmit={handleSubmit} className="profile-form">
// // // //         <div className="form-section">
// // // //           <h4>Personal Information</h4>
// // // //           <div className="form-grid">
// // // //             <div className="form-field">
// // // //               <label>Full Name</label>
// // // //               <input
// // // //                 type="text"
// // // //                 name="name"
// // // //                 value={formData.name}
// // // //                 onChange={handleChange}
// // // //               />
// // // //             </div>
// // // //             <div className="form-field">
// // // //               <label>Email</label>
// // // //               <input type="email" name="email" value={formData.email} disabled />
// // // //             </div>
// // // //             <div className="form-field">
// // // //               <label>Phone Number</label>
// // // //               <input
// // // //                 type="text"
// // // //                 name="mobile"
// // // //                 value={formData.mobile}
// // // //                 onChange={handleChange}
// // // //               />
// // // //             </div>
// // // //             <div className="form-field">
// // // //               <label>Date of Birth</label>
// // // //               <input
// // // //                 type="date"
// // // //                 name="dob"
// // // //                 value={formData.dob}
// // // //                 onChange={handleChange}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {user?.role === "restaurant" && (
// // // //           <div className="form-section">
// // // //             <h4>Restaurant Details</h4>
// // // //             <div className="form-grid">
// // // //               <div className="form-field">
// // // //                 <label>Restaurant Name</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   name="restaurantName"
// // // //                   value={formData.restaurantName}
// // // //                   onChange={handleChange}
// // // //                 />
// // // //               </div>
// // // //               <div className="form-field">
// // // //                 <label>Address</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   name="address"
// // // //                   value={formData.address}
// // // //                   onChange={handleChange}
// // // //                 />
// // // //               </div>
// // // //               <div className="form-field">
// // // //                 <label>Cuisine Type</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   name="cuisineType"
// // // //                   value={formData.cuisineType}
// // // //                   onChange={handleChange}
// // // //                 />
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* === Account Actions === */}
// // // //         <div className="form-section">
// // // //           <h4>Account Actions</h4>
// // // //           <div className="actions-grid">
// // // //             <button
// // // //               type="button"
// // // //               className="action-btn"
// // // //               onClick={() => setShowPasswordModal(true)}
// // // //             >
// // // //               Change Password
// // // //             </button>
// // // //             <button
// // // //               type="button"
// // // //               className="action-btn delete"
// // // //               onClick={() => setShowDeleteModal(true)}
// // // //             >
// // // //               Delete Account
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         <div className="form-actions">
// // // //           <button type="submit" className="save-btn">
// // // //             Save Changes
// // // //           </button>
// // // //         </div>
// // // //       </form>

// // // //       {/* === Change Password Modal === */}
// // // //       {showPasswordModal && (
// // // //         <div className="popup-overlay">
// // // //           <div className="popup-box">
// // // //             <h3>🔐 Change Password</h3>
// // // //             <form onSubmit={handlePasswordChange}>
// // // //               <input
// // // //                 type="password"
// // // //                 placeholder="Current Password"
// // // //                 value={passwordData.currentPassword}
// // // //                 onChange={(e) =>
// // // //                   setPasswordData({
// // // //                     ...passwordData,
// // // //                     currentPassword: e.target.value,
// // // //                   })
// // // //                 }
// // // //                 required
// // // //               />
// // // //               <input
// // // //                 type="password"
// // // //                 placeholder="New Password"
// // // //                 value={passwordData.newPassword}
// // // //                 onChange={(e) =>
// // // //                   setPasswordData({
// // // //                     ...passwordData,
// // // //                     newPassword: e.target.value,
// // // //                   })
// // // //                 }
// // // //                 required
// // // //               />
// // // //               <div className="popup-actions">
// // // //                 <button type="submit" className="save-btn">
// // // //                   Update
// // // //                 </button>
// // // //                 <button
// // // //                   type="button"
// // // //                   className="cancel-btn"
// // // //                   onClick={() => setShowPasswordModal(false)}
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* === Delete Confirmation === */}
// // // //       {showDeleteModal && (
// // // //         <div className="popup-overlay">
// // // //           <div className="popup-box">
// // // //             <h3>⚠️ Delete Account</h3>
// // // //             <p>This action cannot be undone. Are you sure?</p>
// // // //             <div className="popup-actions">
// // // //               <button className="delete-btn" onClick={handleDeleteAccount}>
// // // //                 Yes, Delete
// // // //               </button>
// // // //               <button
// // // //                 className="cancel-btn"
// // // //                 onClick={() => setShowDeleteModal(false)}
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* === Success Modal === */}
// // // //       {showSuccessModal && (
// // // //         <div className="popup-overlay">
// // // //           <div className="popup-box">
// // // //             <h3>✅ Profile Updated!</h3>
// // // //             <p>Your profile information has been saved successfully.</p>
// // // //             <button onClick={() => setShowSuccessModal(false)}>OK</button>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Profile;








// // // import React, { useState, useEffect, useContext } from "react";
// // // import api from "../utils/api";
// // // import { AuthContext } from "../context/AuthContext";
// // // import { toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";
// // // import "../styles/Profile.css";

// // // function Profile() {
// // //   const { user, setUser } = useContext(AuthContext);
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     email: "",
// // //     mobile: "",
// // //     dob: "",
// // //     profileImage: "",
// // //     restaurantName: "",
// // //     address: "",
// // //     cuisineType: "",
// // //   });
// // //   const [previewPic, setPreviewPic] = useState(null);
// // //   const [imageFile, setImageFile] = useState(null);
// // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // //   // 🔐 New state for password/delete modals
// // //   const [showPasswordModal, setShowPasswordModal] = useState(false);
// // //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// // //   const [showPasswordSuccess, setShowPasswordSuccess] = useState(false); // ✅ NEW
// // //   const [passwordData, setPasswordData] = useState({
// // //     currentPassword: "",
// // //     newPassword: "",
// // //   });

// // //   const endpointPrefix =
// // //     user?.role === "restaurant"
// // //       ? "/restaurants"
// // //       : user?.role === "admin"
// // //       ? "/admin"
// // //       : "/users";

// // //   // === Fetch Profile ===
// // //   useEffect(() => {
// // //     const fetchProfile = async () => {
// // //       try {
// // //         const { data } = await api.get(`${endpointPrefix}/profile`);
// // //         setFormData({
// // //           name: data.name || "",
// // //           email: data.email || "",
// // //           mobile: data.mobile || "",
// // //           dob: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
// // //           profileImage: data.profileImage || "",
// // //           restaurantName: data.restaurantName || "",
// // //           address: data.address || "",
// // //           cuisineType: data.cuisineType || "",
// // //         });
// // //         setPreviewPic(data.profileImage ? data.profileImage : null);
// // //       } catch (error) {
// // //         console.error("❌ Error fetching profile:", error);
// // //         toast.error("Failed to load profile!");
// // //       }
// // //     };

// // //     if (user?.role) fetchProfile();
// // //   }, [endpointPrefix, user?.role]);

// // //   // === Handle Changes ===
// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleImageChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       setImageFile(file);
// // //       const previewURL = URL.createObjectURL(file);
// // //       setPreviewPic(previewURL);
// // //     }
// // //   };

// // //   // === Update Profile ===
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const form = new FormData();
// // //       form.append("name", formData.name);
// // //       form.append("mobile", formData.mobile);
// // //       form.append("dateOfBirth", formData.dob);
// // //       if (imageFile) form.append("profileImage", imageFile);

// // //       if (user?.role === "restaurant") {
// // //         form.append("restaurantName", formData.restaurantName);
// // //         form.append("address", formData.address);
// // //         form.append("cuisineType", formData.cuisineType);
// // //       }

// // //       const { data } = await api.put(`${endpointPrefix}/profile`, form, {
// // //         headers: { "Content-Type": "multipart/form-data" },
// // //       });

// // //       const updatedUser = { ...user, ...data };
// // //       setUser(updatedUser);

// // //       if (user.role === "restaurant") {
// // //         localStorage.setItem("restaurant", JSON.stringify(updatedUser));
// // //       } else if (user.role === "admin") {
// // //         localStorage.setItem("admin", JSON.stringify(updatedUser));
// // //       } else {
// // //         localStorage.setItem("user", JSON.stringify(updatedUser));
// // //       }

// // //       toast.success("✅ Profile updated successfully!");
// // //       setShowSuccessModal(true);
// // //     } catch (error) {
// // //       console.error("❌ Error updating profile:", error);
// // //       toast.error(error.response?.data?.message || "Failed to update profile!");
// // //     }
// // //   };

// // //   // === Change Password ===
// // //   const handlePasswordChange = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await api.put("/users/change-password", passwordData);
// // //       toast.success("🔐 Password updated successfully!");
// // //       setShowPasswordModal(false);
// // //       setShowPasswordSuccess(true); // ✅ Show popup after success
// // //       setPasswordData({ currentPassword: "", newPassword: "" });
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || "Failed to change password");
// // //     }
// // //   };

// // //   // === Delete Account ===
// // //   const handleDeleteAccount = async () => {
// // //     try {
// // //       await api.delete("/users/delete-account");
// // //       toast.success("🗑️ Account deleted successfully!");
// // //       localStorage.clear();
// // //       setUser(null);
// // //       window.location.href = "/login";
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || "Failed to delete account");
// // //     }
// // //   };

// // //   return (
// // //     <div className="profile-container">
// // //       {/* === Header === */}
// // //       <div className="profile-header">
// // //         <h2>My Profile</h2>
// // //         <p>Manage your account settings and preferences</p>
// // //       </div>

// // //       {/* === Profile Summary === */}
// // //       <div className="profile-card">
// // //         <div className="profile-info">
// // //           <div className="profile-avatar">
// // //             <img
// // //               src={
// // //                 previewPic
// // //                   ? previewPic.startsWith("blob")
// // //                     ? previewPic
// // //                     : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${previewPic}`
// // //                   : "https://via.placeholder.com/100"
// // //               }
// // //               alt="Profile"
// // //             />
// // //           </div>
// // //           <div className="profile-details">
// // //             <h3>{formData.name || "User"}</h3>
// // //             <p>{formData.email}</p>
// // //             <p className="role-type">
// // //               Account Type:{" "}
// // //               {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
// // //             </p>
// // //           </div>
// // //           <label htmlFor="profilePicUpload" className="edit-btn">
// // //             ✏️ Edit Profile
// // //           </label>
// // //           <input
// // //             id="profilePicUpload"
// // //             type="file"
// // //             accept="image/*"
// // //             onChange={handleImageChange}
// // //             hidden
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* === Profile Form === */}
// // //       <form onSubmit={handleSubmit} className="profile-form">
// // //         <div className="form-section">
// // //           <h4>Personal Information</h4>
// // //           <div className="form-grid">
// // //             <div className="form-field">
// // //               <label>Full Name</label>
// // //               <input
// // //                 type="text"
// // //                 name="name"
// // //                 value={formData.name}
// // //                 onChange={handleChange}
// // //               />
// // //             </div>
// // //             <div className="form-field">
// // //               <label>Email</label>
// // //               <input type="email" name="email" value={formData.email} disabled />
// // //             </div>
// // //             <div className="form-field">
// // //               <label>Phone Number</label>
// // //               <input
// // //                 type="text"
// // //                 name="mobile"
// // //                 value={formData.mobile}
// // //                 onChange={handleChange}
// // //               />
// // //             </div>
// // //             <div className="form-field">
// // //               <label>Date of Birth</label>
// // //               <input
// // //                 type="date"
// // //                 name="dob"
// // //                 value={formData.dob}
// // //                 onChange={handleChange}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {user?.role === "restaurant" && (
// // //           <div className="form-section">
// // //             <h4>Restaurant Details</h4>
// // //             <div className="form-grid">
// // //               <div className="form-field">
// // //                 <label>Restaurant Name</label>
// // //                 <input
// // //                   type="text"
// // //                   name="restaurantName"
// // //                   value={formData.restaurantName}
// // //                   onChange={handleChange}
// // //                 />
// // //               </div>
// // //               <div className="form-field">
// // //                 <label>Address</label>
// // //                 <input
// // //                   type="text"
// // //                   name="address"
// // //                   value={formData.address}
// // //                   onChange={handleChange}
// // //                 />
// // //               </div>
// // //               <div className="form-field">
// // //                 <label>Cuisine Type</label>
// // //                 <input
// // //                   type="text"
// // //                   name="cuisineType"
// // //                   value={formData.cuisineType}
// // //                   onChange={handleChange}
// // //                 />
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* === Account Actions === */}
// // //         <div className="form-section">
// // //           <h4>Account Actions</h4>
// // //           <div className="actions-grid">
// // //             <button
// // //               type="button"
// // //               className="action-btn"
// // //               onClick={() => setShowPasswordModal(true)}
// // //             >
// // //               Change Password
// // //             </button>
// // //             <button
// // //               type="button"
// // //               className="action-btn delete"
// // //               onClick={() => setShowDeleteModal(true)}
// // //             >
// // //               Delete Account
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <div className="form-actions">
// // //           <button type="submit" className="save-btn">
// // //             Save Changes
// // //           </button>
// // //         </div>
// // //       </form>

// // //       {/* === Change Password Modal === */}
// // //       {showPasswordModal && (
// // //         <div className="popup-overlay">
// // //           <div className="popup-box">
// // //             <h3>🔐 Change Password</h3>
// // //             <form onSubmit={handlePasswordChange}>
// // //               <input
// // //                 type="password"
// // //                 placeholder="Current Password"
// // //                 value={passwordData.currentPassword}
// // //                 onChange={(e) =>
// // //                   setPasswordData({
// // //                     ...passwordData,
// // //                     currentPassword: e.target.value,
// // //                   })
// // //                 }
// // //                 required
// // //               />
// // //               <input
// // //                 type="password"
// // //                 placeholder="New Password"
// // //                 value={passwordData.newPassword}
// // //                 onChange={(e) =>
// // //                   setPasswordData({
// // //                     ...passwordData,
// // //                     newPassword: e.target.value,
// // //                   })
// // //                 }
// // //                 required
// // //               />
// // //               <div className="popup-actions">
// // //                 <button type="submit" className="save-btn">
// // //                   Update
// // //                 </button>
// // //                 <button
// // //                   type="button"
// // //                   className="cancel-btn"
// // //                   onClick={() => setShowPasswordModal(false)}
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ✅ Password Change Success Popup */}
// // //       {showPasswordSuccess && (
// // //         <div className="popup-overlay">
// // //           <div className="popup-box">
// // //             <h3>✅ Password Changed!</h3>
// // //             <p>Your password has been updated successfully.</p>
// // //             <button onClick={() => setShowPasswordSuccess(false)}>OK</button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* === Delete Confirmation === */}
// // //       {showDeleteModal && (
// // //         <div className="popup-overlay">
// // //           <div className="popup-box">
// // //             <h3>⚠️ Delete Account</h3>
// // //             <p>This action cannot be undone. Are you sure?</p>
// // //             <div className="popup-actions">
// // //               <button className="delete-btn" onClick={handleDeleteAccount}>
// // //                 Yes, Delete
// // //               </button>
// // //               <button
// // //                 className="cancel-btn"
// // //                 onClick={() => setShowDeleteModal(false)}
// // //               >
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* === Success Modal === */}
// // //       {showSuccessModal && (
// // //         <div className="popup-overlay">
// // //           <div className="popup-box">
// // //             <h3>✅ Profile Updated!</h3>
// // //             <p>Your profile information has been saved successfully.</p>
// // //             <button onClick={() => setShowSuccessModal(false)}>OK</button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Profile;





// // // frontend/src/pages/Profile.js
// // import React, { useState, useEffect, useContext } from "react";
// // import api from "../utils/api";
// // import { AuthContext } from "../context/AuthContext";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import "../styles/Profile.css";

// // function Profile() {
// //   const { user, setUser } = useContext(AuthContext);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     mobile: "",
// //     dob: "",
// //     profileImage: "",
// //     restaurantName: "",
// //     address: "",
// //     cuisineType: "",
// //   });
// //   const [previewPic, setPreviewPic] = useState(null);
// //   const [imageFile, setImageFile] = useState(null);
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// //   // 🔐 New state for password/delete modals
// //   const [showPasswordModal, setShowPasswordModal] = useState(false);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// //   const [showPasswordSuccess, setShowPasswordSuccess] = useState(false); // ✅ NEW
// //   const [passwordData, setPasswordData] = useState({
// //     currentPassword: "",
// //     newPassword: "",
// //   });

// //   // Use role-based prefix so requests go to /users OR /restaurants OR /admin
// //   const endpointPrefix =
// //     user?.role === "restaurant"
// //       ? "/restaurants"
// //       : user?.role === "admin"
// //       ? "/admin"
// //       : "/users";

// //   // === Fetch Profile ===
// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const { data } = await api.get(`${endpointPrefix}/profile`);
// //         setFormData({
// //           name: data.name || "",
// //           email: data.email || "",
// //           mobile: data.mobile || "",
// //           dob: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
// //           profileImage: data.profileImage || "",
// //           restaurantName: data.restaurantName || "",
// //           address: data.address || "",
// //           cuisineType: data.cuisineType || "",
// //         });
// //         setPreviewPic(data.profileImage ? data.profileImage : null);
// //       } catch (error) {
// //         console.error("❌ Error fetching profile:", error);
// //         toast.error("Failed to load profile!");
// //       }
// //     };

// //     if (user?.role) fetchProfile();
// //   }, [endpointPrefix, user?.role]);

// //   // === Handle Changes ===
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setImageFile(file);
// //       const previewURL = URL.createObjectURL(file);
// //       setPreviewPic(previewURL);
// //     }
// //   };

// //   // === Update Profile ===
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const form = new FormData();
// //       form.append("name", formData.name);
// //       form.append("mobile", formData.mobile);
// //       form.append("dateOfBirth", formData.dob);
// //       if (imageFile) form.append("profileImage", imageFile);

// //       if (user?.role === "restaurant") {
// //         form.append("restaurantName", formData.restaurantName);
// //         form.append("address", formData.address);
// //         form.append("cuisineType", formData.cuisineType);
// //       }

// //       const { data } = await api.put(`${endpointPrefix}/profile`, form, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       const updatedUser = { ...user, ...data };
// //       setUser(updatedUser);

// //       if (user.role === "restaurant") {
// //         localStorage.setItem("restaurant", JSON.stringify(updatedUser));
// //       } else if (user.role === "admin") {
// //         localStorage.setItem("admin", JSON.stringify(updatedUser));
// //       } else {
// //         localStorage.setItem("user", JSON.stringify(updatedUser));
// //       }

// //       toast.success("✅ Profile updated successfully!");
// //       setShowSuccessModal(true);
// //     } catch (error) {
// //       console.error("❌ Error updating profile:", error);
// //       toast.error(error.response?.data?.message || "Failed to update profile!");
// //     }
// //   };

// //   // === Change Password ===
// //   const handlePasswordChange = async (e) => {
// //     e.preventDefault();

// //     // small client-side validation
// //     if (!passwordData.currentPassword || !passwordData.newPassword) {
// //       return toast.error("Please fill both fields");
// //     }
// //     if (passwordData.newPassword.length < 6) {
// //       return toast.error("New password must be at least 6 characters");
// //     }

// //     try {
// //       // <<< KEY FIX: use endpointPrefix here so role-specific routes are used >>>
// //       await api.put(`${endpointPrefix}/change-password`, passwordData);

// //       toast.success("🔐 Password updated successfully!");
// //       setShowPasswordModal(false);
// //       setShowPasswordSuccess(true); // ✅ Show popup after success
// //       setPasswordData({ currentPassword: "", newPassword: "" });

// //       // OPTIONAL: If you want to force logout after password change uncomment:
// //       // localStorage.clear();
// //       // setUser(null);
// //       // window.location.href = "/login";
// //     } catch (error) {
// //       toast.error(
// //         error.response?.data?.message || "Failed to change password"
// //       );
// //     }
// //   };

// //   // === Delete Account ===
// //   const handleDeleteAccount = async () => {
// //     try {
// //       // <<< KEY FIX: use endpointPrefix here too >>>
// //       await api.delete(`${endpointPrefix}/delete-account`);
// //       toast.success("🗑️ Account deleted successfully!");
// //       localStorage.clear();
// //       setUser(null);
// //       window.location.href = "/login";
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Failed to delete account");
// //     }
// //   };

// //   return (
// //     <div className="profile-container">
// //       {/* === Header === */}
// //       <div className="profile-header">
// //         <h2>My Profile</h2>
// //         <p>Manage your account settings and preferences</p>
// //       </div>

// //       {/* === Profile Summary === */}
// //       <div className="profile-card">
// //         <div className="profile-info">
// //           <div className="profile-avatar">
// //             <img
// //               src={
// //                 previewPic
// //                   ? previewPic.startsWith("blob")
// //                     ? previewPic
// //                     : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${previewPic}`
// //                   : "https://via.placeholder.com/100"
// //               }
// //               alt="Profile"
// //             />
// //           </div>
// //           <div className="profile-details">
// //             <h3>{formData.name || "User"}</h3>
// //             <p>{formData.email}</p>
// //             <p className="role-type">
// //               Account Type:{" "}
// //               {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
// //             </p>
// //           </div>
// //           <label htmlFor="profilePicUpload" className="edit-btn">
// //             ✏️ Edit Profile
// //           </label>
// //           <input
// //             id="profilePicUpload"
// //             type="file"
// //             accept="image/*"
// //             onChange={handleImageChange}
// //             hidden
// //           />
// //         </div>
// //       </div>

// //       {/* === Profile Form === */}
// //       <form onSubmit={handleSubmit} className="profile-form">
// //         <div className="form-section">
// //           <h4>Personal Information</h4>
// //           <div className="form-grid">
// //             <div className="form-field">
// //               <label>Full Name</label>
// //               <input
// //                 type="text"
// //                 name="name"
// //                 value={formData.name}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //             <div className="form-field">
// //               <label>Email</label>
// //               <input type="email" name="email" value={formData.email} disabled />
// //             </div>
// //             <div className="form-field">
// //               <label>Phone Number</label>
// //               <input
// //                 type="text"
// //                 name="mobile"
// //                 value={formData.mobile}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //             <div className="form-field">
// //               <label>Date of Birth</label>
// //               <input
// //                 type="date"
// //                 name="dob"
// //                 value={formData.dob}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {user?.role === "restaurant" && (
// //           <div className="form-section">
// //             <h4>Restaurant Details</h4>
// //             <div className="form-grid">
// //               <div className="form-field">
// //                 <label>Restaurant Name</label>
// //                 <input
// //                   type="text"
// //                   name="restaurantName"
// //                   value={formData.restaurantName}
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //               <div className="form-field">
// //                 <label>Address</label>
// //                 <input
// //                   type="text"
// //                   name="address"
// //                   value={formData.address}
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //               <div className="form-field">
// //                 <label>Cuisine Type</label>
// //                 <input
// //                   type="text"
// //                   name="cuisineType"
// //                   value={formData.cuisineType}
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* === Account Actions === */}
// //         <div className="form-section">
// //           <h4>Account Actions</h4>
// //           <div className="actions-grid">
// //             <button
// //               type="button"
// //               className="action-btn"
// //               onClick={() => setShowPasswordModal(true)}
// //             >
// //               Change Password
// //             </button>
// //             <button
// //               type="button"
// //               className="action-btn delete"
// //               onClick={() => setShowDeleteModal(true)}
// //             >
// //               Delete Account
// //             </button>
// //           </div>
// //         </div>

// //         <div className="form-actions">
// //           <button type="submit" className="save-btn">
// //             Save Changes
// //           </button>
// //         </div>
// //       </form>

// //       {/* === Change Password Modal === */}
// //       {showPasswordModal && (
// //         <div className="popup-overlay">
// //           <div className="popup-box">
// //             <h3>🔐 Change Password</h3>
// //             <form onSubmit={handlePasswordChange}>
// //               <input
// //                 type="password"
// //                 placeholder="Current Password"
// //                 value={passwordData.currentPassword}
// //                 onChange={(e) =>
// //                   setPasswordData({
// //                     ...passwordData,
// //                     currentPassword: e.target.value,
// //                   })
// //                 }
// //                 required
// //               />
// //               <input
// //                 type="password"
// //                 placeholder="New Password"
// //                 value={passwordData.newPassword}
// //                 onChange={(e) =>
// //                   setPasswordData({
// //                     ...passwordData,
// //                     newPassword: e.target.value,
// //                   })
// //                 }
// //                 required
// //               />
// //               <div className="popup-actions">
// //                 <button type="submit" className="save-btn">
// //                   Update
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className="cancel-btn"
// //                   onClick={() => setShowPasswordModal(false)}
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* ✅ Password Change Success Popup */}
// //       {showPasswordSuccess && (
// //         <div className="popup-overlay">
// //           <div className="popup-box">
// //             <h3>✅ Password Changed!</h3>
// //             <p>Your password has been updated successfully.</p>
// //             <button onClick={() => setShowPasswordSuccess(false)}>OK</button>
// //           </div>
// //         </div>
// //       )}

// //       {/* === Delete Confirmation === */}
// //       {showDeleteModal && (
// //         <div className="popup-overlay">
// //           <div className="popup-box">
// //             <h3>⚠️ Delete Account</h3>
// //             <p>This action cannot be undone. Are you sure?</p>
// //             <div className="popup-actions">
// //               <button className="delete-btn" onClick={handleDeleteAccount}>
// //                 Yes, Delete
// //               </button>
// //               <button
// //                 className="cancel-btn"
// //                 onClick={() => setShowDeleteModal(false)}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* === Success Modal === */}
// //       {showSuccessModal && (
// //         <div className="popup-overlay">
// //           <div className="popup-box">
// //             <h3>✅ Profile Updated!</h3>
// //             <p>Your profile information has been saved successfully.</p>
// //             <button onClick={() => setShowSuccessModal(false)}>OK</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Profile;




// import React, { useState, useEffect, useContext } from "react";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../styles/Profile.css";

// function Profile() {
//   const { user, setUser } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     dob: "",
//     profileImage: "",
//     restaurantName: "",
//     address: "",
//     cuisineType: "",
//   });
//   const [previewPic, setPreviewPic] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   // 🔐 Password + delete modal states
//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//   });

//   // Role-based endpoint prefix (for profile/delete)
//   const endpointPrefix =
//     user?.role === "restaurant"
//       ? "/restaurants"
//       : user?.role === "admin"
//       ? "/admin"
//       : "/users";

//   /* ============================================================
//      🧭 Fetch Profile
//      ============================================================ */
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await api.get(`${endpointPrefix}/profile`);
//         setFormData({
//           name: data.name || "",
//           email: data.email || "",
//           mobile: data.mobile || "",
//           dob: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
//           profileImage: data.profileImage || "",
//           restaurantName: data.restaurantName || "",
//           address: data.address || "",
//           cuisineType: data.cuisineType || "",
//         });
//         setPreviewPic(data.profileImage ? data.profileImage : null);
//       } catch (error) {
//         console.error("❌ Error fetching profile:", error);
//         toast.error("Failed to load profile!");
//       }
//     };

//     if (user?.role) fetchProfile();
//   }, [endpointPrefix, user?.role]);

//   /* ============================================================
//      ✏️ Handle Form Inputs
//      ============================================================ */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const previewURL = URL.createObjectURL(file);
//       setPreviewPic(previewURL);
//     }
//   };

//   /* ============================================================
//      💾 Update Profile
//      ============================================================ */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const form = new FormData();
//       form.append("name", formData.name);
//       form.append("mobile", formData.mobile);
//       form.append("dateOfBirth", formData.dob);
//       if (imageFile) form.append("profileImage", imageFile);

//       if (user?.role === "restaurant") {
//         form.append("restaurantName", formData.restaurantName);
//         form.append("address", formData.address);
//         form.append("cuisineType", formData.cuisineType);
//       }

//       const { data } = await api.put(`${endpointPrefix}/profile`, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const updatedUser = { ...user, ...data };
//       setUser(updatedUser);

//       if (user.role === "restaurant") {
//         localStorage.setItem("restaurant", JSON.stringify(updatedUser));
//       } else if (user.role === "admin") {
//         localStorage.setItem("admin", JSON.stringify(updatedUser));
//       } else {
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//       }

//       toast.success("✅ Profile updated successfully!");
//       setShowSuccessModal(true);
//     } catch (error) {
//       console.error("❌ Error updating profile:", error);
//       toast.error(error.response?.data?.message || "Failed to update profile!");
//     }
//   };

//   /* ============================================================
//      🔑 Change Password  (✅ FIXED ENDPOINT)
//      ============================================================ */
//   const handlePasswordChange = async (e) => {
//     e.preventDefault();

//     if (!passwordData.currentPassword || !passwordData.newPassword) {
//       return toast.error("Please fill both fields");
//     }
//     if (passwordData.newPassword.length < 6) {
//       return toast.error("New password must be at least 6 characters");
//     }

//     try {
//       // ✅ Always use the unified auth endpoint
//       await api.put("/auth/change-password", passwordData);

//       toast.success("🔐 Password updated successfully!");
//       setShowPasswordModal(false);
//       setShowPasswordSuccess(true);
//       setPasswordData({ currentPassword: "", newPassword: "" });

//       // ✅ Optional security: force logout after password change
//       localStorage.clear();
//       setUser(null);
//       window.location.href = "/login";
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to change password"
//       );
//     }
//   };

//   /* ============================================================
//      🗑️ Delete Account
//      ============================================================ */
//   const handleDeleteAccount = async () => {
//     try {
//       await api.delete(`${endpointPrefix}/delete-account`);
//       toast.success("🗑️ Account deleted successfully!");
//       localStorage.clear();
//       setUser(null);
//       window.location.href = "/login";
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete account");
//     }
//   };

//   /* ============================================================
//      🖥️ Render
//      ============================================================ */
//   return (
//     <div className="profile-container">
//       {/* === Header === */}
//       <div className="profile-header">
//         <h2>My Profile</h2>
//         <p>Manage your account settings and preferences</p>
//       </div>

//       {/* === Profile Summary === */}
//       <div className="profile-card">
//         <div className="profile-info">
//           <div className="profile-avatar">
//             <img
//               src={
//                 previewPic
//                   ? previewPic.startsWith("blob")
//                     ? previewPic
//                     : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${previewPic}`
//                   : "https://via.placeholder.com/100"
//               }
//               alt="Profile"
//             />
//           </div>
//           <div className="profile-details">
//             <h3>{formData.name || "User"}</h3>
//             <p>{formData.email}</p>
//             <p className="role-type">
//               Account Type:{" "}
//               {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
//             </p>
//           </div>
//           <label htmlFor="profilePicUpload" className="edit-btn">
//             ✏️ Edit Profile
//           </label>
//           <input
//             id="profilePicUpload"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             hidden
//           />
//         </div>
//       </div>

//       {/* === Profile Form === */}
//       <form onSubmit={handleSubmit} className="profile-form">
//         <div className="form-section">
//           <h4>Personal Information</h4>
//           <div className="form-grid">
//             <div className="form-field">
//               <label>Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-field">
//               <label>Email</label>
//               <input type="email" name="email" value={formData.email} disabled />
//             </div>
//             <div className="form-field">
//               <label>Phone Number</label>
//               <input
//                 type="text"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-field">
//               <label>Date of Birth</label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </div>

//         {user?.role === "restaurant" && (
//           <div className="form-section">
//             <h4>Restaurant Details</h4>
//             <div className="form-grid">
//               <div className="form-field">
//                 <label>Restaurant Name</label>
//                 <input
//                   type="text"
//                   name="restaurantName"
//                   value={formData.restaurantName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-field">
//                 <label>Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-field">
//                 <label>Cuisine Type</label>
//                 <input
//                   type="text"
//                   name="cuisineType"
//                   value={formData.cuisineType}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* === Account Actions === */}
//         <div className="form-section">
//           <h4>Account Actions</h4>
//           <div className="actions-grid">
//             <button
//               type="button"
//               className="action-btn"
//               onClick={() => setShowPasswordModal(true)}
//             >
//               Change Password
//             </button>
//             <button
//               type="button"
//               className="action-btn delete"
//               onClick={() => setShowDeleteModal(true)}
//             >
//               Delete Account
//             </button>
//           </div>
//         </div>

//         <div className="form-actions">
//           <button type="submit" className="save-btn">
//             Save Changes
//           </button>
//         </div>
//       </form>

//       {/* === Change Password Modal === */}
//       {showPasswordModal && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h3>🔐 Change Password</h3>
//             <form onSubmit={handlePasswordChange}>
//               <input
//                 type="password"
//                 placeholder="Current Password"
//                 value={passwordData.currentPassword}
//                 onChange={(e) =>
//                   setPasswordData({
//                     ...passwordData,
//                     currentPassword: e.target.value,
//                   })
//                 }
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 value={passwordData.newPassword}
//                 onChange={(e) =>
//                   setPasswordData({
//                     ...passwordData,
//                     newPassword: e.target.value,
//                   })
//                 }
//                 required
//               />
//               <div className="popup-actions">
//                 <button type="submit" className="save-btn">
//                   Update
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowPasswordModal(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ✅ Password Change Success Popup */}
//       {showPasswordSuccess && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h3>✅ Password Changed!</h3>
//             <p>Your password has been updated successfully.</p>
//             <button onClick={() => setShowPasswordSuccess(false)}>OK</button>
//           </div>
//         </div>
//       )}

//       {/* === Delete Confirmation === */}
//       {showDeleteModal && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h3>⚠️ Delete Account</h3>
//             <p>This action cannot be undone. Are you sure?</p>
//             <div className="popup-actions">
//               <button className="delete-btn" onClick={handleDeleteAccount}>
//                 Yes, Delete
//               </button>
//               <button
//                 className="cancel-btn"
//                 onClick={() => setShowDeleteModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* === Success Modal === */}
//       {showSuccessModal && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h3>✅ Profile Updated!</h3>
//             <p>Your profile information has been saved successfully.</p>
//             <button onClick={() => setShowSuccessModal(false)}>OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Profile;




import React, { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Profile.css";

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    profileImage: "",
    restaurantName: "",
    address: "",
    cuisineType: "",
  });
  const [previewPic, setPreviewPic] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 🔐 Password + delete modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // Role-based endpoint prefix (for profile, password, delete)
  const endpointPrefix =
    user?.role === "restaurant"
      ? "/restaurants"
      : user?.role === "admin"
      ? "/admin"
      : "/users";

  /* ============================================================
     🧭 Fetch Profile
  ============================================================ */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`${endpointPrefix}/profile`);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          dob: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          profileImage: data.profileImage || "",
          restaurantName: data.restaurantName || "",
          address: data.address || "",
          cuisineType: data.cuisineType || "",
        });
        setPreviewPic(data.profileImage ? data.profileImage : null);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
        toast.error("Failed to load profile!");
      }
    };

    if (user?.role) fetchProfile();
  }, [endpointPrefix, user?.role]);

  /* ============================================================
     ✏️ Handle Form Inputs
  ============================================================ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewPic(previewURL);
    }
  };

  /* ============================================================
     💾 Update Profile
  ============================================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("mobile", formData.mobile);
      form.append("dateOfBirth", formData.dob);
      if (imageFile) form.append("profileImage", imageFile);

      if (user?.role === "restaurant") {
        form.append("restaurantName", formData.restaurantName);
        form.append("address", formData.address);
        form.append("cuisineType", formData.cuisineType);
      }

      const { data } = await api.put(`${endpointPrefix}/profile`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = { ...user, ...data };
      setUser(updatedUser);

      if (user.role === "restaurant") {
        localStorage.setItem("restaurant", JSON.stringify(updatedUser));
      } else if (user.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(updatedUser));
      } else {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      toast.success("✅ Profile updated successfully!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile!");
    }
  };

  /* ============================================================
     🔑 Change Password (role-aware endpoint)
  ============================================================ */
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      return toast.error("Please fill both fields");
    }
    if (passwordData.newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters");
    }

    try {
      // Use the same role-based prefix for password change
      await api.put(`${endpointPrefix}/change-password`, passwordData);

      toast.success("🔐 Password updated successfully!");
      setShowPasswordModal(false);
      setShowPasswordSuccess(true);
      setPasswordData({ currentPassword: "", newPassword: "" });

      // ✅ Force logout for security
      localStorage.clear();
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Change password failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    }
  };

  /* ============================================================
     🗑️ Delete Account
  ============================================================ */
  const handleDeleteAccount = async () => {
    try {
      await api.delete(`${endpointPrefix}/delete-account`);
      toast.success("🗑️ Account deleted successfully!");
      localStorage.clear();
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    }
  };

  /* ============================================================
     🖥️ Render
  ============================================================ */
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        <p>Manage your account settings and preferences</p>
      </div>

      {/* === Profile Summary === */}
      <div className="profile-card">
        <div className="profile-info">
          <div className="profile-avatar">
            <img
              src={
                previewPic
                  ? previewPic.startsWith("blob")
                    ? previewPic
                    : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${previewPic}`
                  : "https://via.placeholder.com/100"
              }
              alt="Profile"
            />
          </div>
          <div className="profile-details">
            <h3>{formData.name || "User"}</h3>
            <p>{formData.email}</p>
            <p className="role-type">
              Account Type:{" "}
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
            </p>
          </div>
          <label htmlFor="profilePicUpload" className="edit-btn">
            ✏️ Edit Profile
          </label>
          <input
            id="profilePicUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </div>
      </div>

      {/* === Profile Form === */}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-section">
          <h4>Personal Information</h4>
          <div className="form-grid">
            <div className="form-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} disabled />
            </div>
            <div className="form-field">
              <label>Phone Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {user?.role === "restaurant" && (
          <div className="form-section">
            <h4>Restaurant Details</h4>
            <div className="form-grid">
              <div className="form-field">
                <label>Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Cuisine Type</label>
                <input
                  type="text"
                  name="cuisineType"
                  value={formData.cuisineType}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* === Account Actions === */}
        <div className="form-section">
          <h4>Account Actions</h4>
          <div className="actions-grid">
            <button
              type="button"
              className="action-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
            <button
              type="button"
              className="action-btn delete"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>
      </form>

      {/* === Change Password Modal === */}
      {showPasswordModal && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>🔐 Change Password</h3>
            <form onSubmit={handlePasswordChange}>
              <input
                type="password"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                required
              />
              <div className="popup-actions">
                <button type="submit" className="save-btn">
                  Update
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Password Change Success Popup */}
      {showPasswordSuccess && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>✅ Password Changed!</h3>
            <p>Your password has been updated successfully.</p>
            <button onClick={() => setShowPasswordSuccess(false)}>OK</button>
          </div>
        </div>
      )}

      {/* === Delete Confirmation === */}
      {showDeleteModal && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>⚠️ Delete Account</h3>
            <p>This action cannot be undone. Are you sure?</p>
            <div className="popup-actions">
              <button className="delete-btn" onClick={handleDeleteAccount}>
                Yes, Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Success Modal === */}
      {showSuccessModal && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>✅ Profile Updated!</h3>
            <p>Your profile information has been saved successfully.</p>
            <button onClick={() => setShowSuccessModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
