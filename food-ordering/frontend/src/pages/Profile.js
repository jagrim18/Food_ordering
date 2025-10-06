import React, { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";

function Profile() {
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    profilePic: "",
  });

  // for local preview of uploaded file
  const [previewPic, setPreviewPic] = useState("");

  // ✅ fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/users/profile");
        setFormData(data);
        setPreviewPic(data.profilePic);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);

  // ✅ handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ handle file upload (preview only)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewPic(imageUrl);

      // If you later add Multer/Cloudinary, upload file here & update profilePic with returned URL
      setFormData({ ...formData, profilePic: imageUrl });
    }
  };

  // ✅ save profile to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put("/users/profile", formData);
      setUser(data); // update global auth state
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile!");
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        {/* profile image */}
        <div className="profile-pic-section">
          <img
            src={previewPic || "https://via.placeholder.com/100"}
            alt="Profile"
            className="profile-pic-large"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* form fields */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled // usually email is fixed
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

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
