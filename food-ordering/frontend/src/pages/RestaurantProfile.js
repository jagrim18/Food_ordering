import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/RestaurantProfile.css";

const API_ROOT = process.env.REACT_APP_API_URL || "http://localhost:5000";

function RestaurantProfile() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    cuisineType: "",
  });
  const [gallery, setGallery] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/restaurants/profile");
      setRestaurant(res.data);
      setFormData({
        name: res.data.name || "",
        address: res.data.address || "",
        mobile: res.data.mobile || "",
        cuisineType: res.data.cuisineType || "",
      });
      setGallery(res.data.galleryImages || []);
    } catch (err) {
      console.error("❌ Failed to fetch restaurant profile:", err);
      setMessage("Failed to load profile. Please log in again.");
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("restaurant");
        navigate("/restaurant/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("address", formData.address);
      fd.append("mobile", formData.mobile);
      fd.append("cuisineType", formData.cuisineType);

      await api.put("/restaurants/profile", fd);
      setMessage("✅ Profile updated successfully.");
      fetchProfile();
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      setMessage("Failed to save changes. Try again.");
      setLoading(false);
    }
  };

  const handleSelectImages = (e) => {
    setNewImages(Array.from(e.target.files || []));
  };

  const handleUploadGallery = async () => {
    if (!newImages.length) return setMessage("Please select images to upload.");
    setLoading(true);
    setMessage("");
    try {
      const fd = new FormData();
      newImages.forEach((file) => fd.append("images", file));
      const res = await api.post("/restaurants/upload-gallery", fd);
      setGallery(res.data.galleryImages || []);
      setNewImages([]);
      setMessage("✅ Images uploaded successfully.");
    } catch (err) {
      console.error("❌ Error uploading images:", err);
      setMessage("Failed to upload images. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imagePath) => {
    const imageName = imagePath.split("/").pop();
    try {
      const res = await api.delete(`/restaurants/gallery/${imageName}`);
      setGallery(res.data.galleryImages);
      setMessage("🗑️ Image deleted successfully.");
      setConfirmDelete(null);
    } catch (err) {
      console.error("❌ Error deleting image:", err);
      setMessage("Failed to delete image.");
    }
  };

  return (
    <div className="restaurant-profile page-padding">
      <div className="profile-header">
        <h1>Restaurant Profile</h1>
        <p className="muted">
          Manage your restaurant details and gallery visible to users.
        </p>
      </div>

      {message && <div className="rp-message">{message}</div>}

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading profile...
        </div>
      ) : !restaurant ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          Profile not found.
        </div>
      ) : (
        <>
          {/* === Full Width Details Card === */}
          <form className="rp-card full-width-card" onSubmit={handleSaveProfile}>
            <h2>Details</h2>

            <div className="rp-form">
              <div>
                <label>Restaurant Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Restaurant name"
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Contact number"
                />
              </div>
              <div className="full-width">
                <label>Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full address"
                />
              </div>
              <div className="full-width">
                <label>Cuisine Type</label>
                <input
                  name="cuisineType"
                  value={formData.cuisineType}
                  onChange={handleChange}
                  placeholder="e.g. North Indian, Chinese"
                />
              </div>
            </div>

            <button className="primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>

          {/* === Full Width Gallery Section Below === */}
          <div className="rp-card gallery-card full-width-card">
            <h2>Gallery (visible to users)</h2>

            <div className="gallery-grid">
              {gallery.length === 0 ? (
                <div className="muted">No images uploaded yet.</div>
              ) : (
                gallery.map((img, idx) => (
                  <div key={idx} className="gallery-item">
                    <img src={`${API_ROOT}${img}`} alt={`gallery-${idx}`} />
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => setConfirmDelete(img)}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {confirmDelete && (
              <div className="confirm-modal">
                <div className="confirm-box">
                  <p>Are you sure you want to delete this image?</p>
                  <div className="confirm-actions">
                    <button
                      className="confirm-yes"
                      onClick={() => handleDeleteImage(confirmDelete)}
                    >
                      Yes, Delete
                    </button>
                    <button
                      className="confirm-no"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="upload-area">
              <label className="file-label">Select new images (max 10)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleSelectImages}
              />

              {newImages.length > 0 && (
                <div className="selected-preview">
                  <div className="muted">
                    Selected ({newImages.length}):
                  </div>
                  <div className="selected-list">
                    {newImages.map((f, i) => (
                      <div key={i} className="selected-item">
                        <div className="selected-name">{f.name}</div>
                        <button
                          type="button"
                          className="small-btn"
                          onClick={() =>
                            setNewImages((prev) =>
                              prev.filter((_, j) => j !== i)
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="primary"
                type="button"
                disabled={loading}
                onClick={handleUploadGallery}
              >
                {loading ? "Uploading..." : "Upload to Gallery"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RestaurantProfile;
