import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);

    toast.success("You have been logged out successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            Foodify
          </Link>

          {/* Links */}
          <div className="navbar-links">
            {!user ? (
              <>
                <Link to="/admin/login" className="navbar-link">
                  Admin
                </Link>
                {/* ✅ Fixed Restaurant link */}
                <Link to="/restaurant/login" className="navbar-link">
                  Restaurant
                </Link>
              </>
            ) : (
              <>
                <Link to="/menu" className="navbar-link">Menu</Link>
                <Link to="/orders" className="navbar-link">My Orders</Link>
                <Link to="/cart" className="navbar-link">
                  <FaShoppingCart size={20} />
                </Link>

                {/* Profile Dropdown */}
                <div className="navbar-profile" ref={dropdownRef}>
                  <FaUserCircle
                    size={22}
                    className="profile-icon"
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="dropdown-item logout-btn"
                      onClick={() => {
                        setShowDropdown(false);
                        setShowLogoutConfirm(true);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Logout Confirmation</h3>
            <p>Are you sure you want to logout?</p>
            <div className="logout-buttons">
              <button className="confirm-btn" onClick={handleLogout}>
                Confirm
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default Navbar;
