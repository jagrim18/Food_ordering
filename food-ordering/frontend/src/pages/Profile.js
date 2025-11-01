
// // ✅ frontend/src/pages/Profile.js
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
//     profilePic: "",
//     restaurantName: "",
//     address: "",
//     cuisineType: "",
//   });
//   const [previewPic, setPreviewPic] = useState("");

//   // ✅ Decide API endpoint prefix dynamically
//   const endpointPrefix =
//     user?.role === "restaurant"
//       ? "/restaurants"
//       : user?.role === "admin"
//       ? "/admin"
//       : "/users";

//   // ✅ Fetch profile data on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await api.get(`${endpointPrefix}/profile`);
//         setFormData({
//           name: data.name || "",
//           email: data.email || "",
//           mobile: data.mobile || "",
//           dob: data.dob ? data.dob.split("T")[0] : "",
//           profilePic: data.profilePic || "",
//           restaurantName: data.restaurantName || "",
//           address: data.address || "",
//           cuisineType: data.cuisineType || "",
//         });
//         setPreviewPic(data.profilePic || "");
//       } catch (error) {
//         console.error("❌ Error fetching profile:", error);
//         toast.error("Failed to load profile!");
//       }
//     };

//     if (user?.role) fetchProfile();
//   }, [endpointPrefix, user?.role]);

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Handle image upload preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewPic(reader.result);
//         setFormData((prev) => ({ ...prev, profilePic: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // ✅ Handle form submit (update profile)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.put(`${endpointPrefix}/profile`, formData);
//       const updatedUser = { ...user, ...data };

//       // Update global user state
//       setUser(updatedUser);

//       // Update localStorage
//       if (user.role === "restaurant") {
//         localStorage.setItem("restaurant", JSON.stringify(updatedUser));
//       } else if (user.role === "admin") {
//         localStorage.setItem("admin", JSON.stringify(updatedUser));
//       } else {
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//       }

//       toast.success("✅ Profile updated successfully!");
//     } catch (error) {
//       console.error("❌ Error updating profile:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to update profile!"
//       );
//     }
//   };

//   return (
//     <div className="profile-container">
//       <h2>
//         {user?.role === "restaurant"
//           ? "Restaurant Profile"
//           : user?.role === "admin"
//           ? "Admin Profile"
//           : "My Profile"}
//       </h2>

//       <form onSubmit={handleSubmit} className="profile-form">
//         {/* Profile Picture Section */}
//         <div className="profile-pic-section">
//           <img
//             src={previewPic || "https://via.placeholder.com/100"}
//             alt="Profile"
//             className="profile-pic-large"
//           />
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>

//         {/* Common Fields */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           disabled
//         />
//         <input
//           type="text"
//           name="mobile"
//           placeholder="Mobile Number"
//           value={formData.mobile}
//           onChange={handleChange}
//         />
//         <input
//           type="date"
//           name="dob"
//           placeholder="Date of Birth"
//           value={formData.dob}
//           onChange={handleChange}
//         />

//         {/* Restaurant-specific Fields */}
//         {user?.role === "restaurant" && (
//           <>
//             <input
//               type="text"
//               name="restaurantName"
//               placeholder="Restaurant Name"
//               value={formData.restaurantName}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="cuisineType"
//               placeholder="Cuisine Type"
//               value={formData.cuisineType}
//               onChange={handleChange}
//             />
//           </>
//         )}

//         <button type="submit" className="save-btn">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Profile;








// ✅ frontend/src/pages/Profile.js
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
    profilePic: "",
    restaurantName: "",
    address: "",
    cuisineType: "",
  });
  const [previewPic, setPreviewPic] = useState("");

  const endpointPrefix =
    user?.role === "restaurant"
      ? "/restaurants"
      : user?.role === "admin"
      ? "/admin"
      : "/users";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`${endpointPrefix}/profile`);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          dob: data.dob ? data.dob.split("T")[0] : "",
          profilePic: data.profilePic || "",
          restaurantName: data.restaurantName || "",
          address: data.address || "",
          cuisineType: data.cuisineType || "",
        });
        setPreviewPic(data.profilePic || "");
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
        toast.error("Failed to load profile!");
      }
    };

    if (user?.role) fetchProfile();
  }, [endpointPrefix, user?.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPic(reader.result);
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`${endpointPrefix}/profile`, formData);
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
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile!");
    }
  };

  return (
    <div className="profile-glass-container">
      <div className="profile-glass-card">
        <h2 className="profile-glass-title">
          {user?.role === "restaurant"
            ? "🍽️ Restaurant Profile"
            : user?.role === "admin"
            ? "👑 Admin Profile"
            : "👤 My Profile"}
        </h2>

        <div className="profile-glass-grid">
          {/* Left Side - Profile Picture */}
          <div className="profile-glass-left">
            <img
              src={previewPic || "https://via.placeholder.com/120"}
              alt="Profile"
              className="profile-glass-pic"
            />
            <label htmlFor="profilePicUpload" className="glass-upload-label">
              📷 Change Photo
            </label>
            <input
              id="profilePicUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Right Side - Form */}
          <form onSubmit={handleSubmit} className="profile-glass-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              disabled
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
            />

            {user?.role === "restaurant" && (
              <>
                <input
                  type="text"
                  name="restaurantName"
                  placeholder="Restaurant Name"
                  value={formData.restaurantName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="cuisineType"
                  placeholder="Cuisine Type"
                  value={formData.cuisineType}
                  onChange={handleChange}
                />
              </>
            )}

            <button type="submit" className="glass-save-btn">
              💾 Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
