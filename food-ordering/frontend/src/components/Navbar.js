// import React, { useContext, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaMoon, FaSun, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import "../styles/Navbar.css";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   // ✅ Handle dark mode toggle
//   useEffect(() => {
//     if (darkMode) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   }, [darkMode]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // ✅ Get role safely (from context or localStorage)
//   const role = user?.role || localStorage.getItem("role") || "guest";

//   const renderLinks = () => {
//     switch (role) {
//       case "user":
//         return (
//           <>
//             <Link to="/restaurants" className="nav-link">Home</Link>
//             <Link to="/orders" className="nav-link">My Orders</Link>
//             <Link to="/cart" className="nav-link">Cart</Link>
//             <Link to="/profile" className="nav-link">My Profile</Link>
//           </>
//         );
//       case "restaurant":
//         return (
//           <>
//             <Link to="/restaurant/dashboard" className="nav-link">Dashboard</Link>
//             <Link to="/restaurant/orders" className="nav-link">Orders</Link>
//             <Link to="/restaurant/menu" className="nav-link">Menu</Link>
//             <Link to="/profile" className="nav-link">Profile</Link>
//           </>
//         );
//       case "admin":
//         return (
//           <>
//             <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
//             <Link to="/admin/users" className="nav-link">Users</Link>
//             <Link to="/admin/restaurants" className="nav-link">Restaurants</Link>
//           </>
//         );
//       default:
//         // guest
//         return (
//           <>
//             <Link to="/" className="nav-link">Home</Link>
//             <Link to="/login" className="nav-link">User</Link>
//             <Link to="/restaurant/login" className="nav-link">Restaurant</Link>
//             <Link to="/admin/login" className="nav-link">Admin</Link>
//           </>
//         );
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <div className="nav-logo" onClick={() => navigate("/restaurants")}>
//           🍽️ Foodify
//         </div>

//         <div className={`nav-links ${menuOpen ? "open" : ""}`}>
//           {renderLinks()}
//           {role !== "guest" && (
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           )}
//         </div>

//         <div className="nav-actions">
//           <button
//             className="dark-toggle"
//             onClick={() => setDarkMode(!darkMode)}
//             title="Toggle Dark Mode"
//           >
//             {darkMode ? <FaSun /> : <FaMoon />}
//           </button>
//           <button
//             className="menu-toggle"
//             onClick={() => setMenuOpen(!menuOpen)}
//             title="Menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;










import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import "../styles/Navbar.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🌓 Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  // 📜 Add scroll listener for glass fade effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚪 Logout handler
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get role from user or localStorage
  const role = user?.role || localStorage.getItem("role") || "guest";

  // Render role-based links
  const renderLinks = () => {
    switch (role) {
      case "user":
        return (
          <>
            <Link to="/restaurants" className="nav-link">Home</Link>
            <Link to="/orders" className="nav-link">My Orders</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
            <Link to="/profile" className="nav-link">My Profile</Link>
          </>
        );
      case "restaurant":
        return (
          <>
            <Link to="/restaurant/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/restaurant/orders" className="nav-link">Orders</Link>
            <Link to="/restaurant/menu" className="nav-link">Menu</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </>
        );
      case "admin":
        return (
          <>
            <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
            <Link to="/admin/users" className="nav-link">Users</Link>
            <Link to="/admin/restaurants" className="nav-link">Restaurants</Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">User</Link>
            <Link to="/restaurant/login" className="nav-link">Restaurant</Link>
            <Link to="/admin/login" className="nav-link">Admin</Link>
          </>
        );
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${darkMode ? "dark-mode" : ""}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate("/")}>
          🍴 Foodify
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {renderLinks()}
          {role !== "guest" && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <div className="nav-actions">
          <button className="dark-toggle" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
