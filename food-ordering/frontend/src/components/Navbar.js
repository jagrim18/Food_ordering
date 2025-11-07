// // // import React, { useState, useEffect, useContext } from "react";
// // // import { Link, useNavigate, useLocation } from "react-router-dom";
// // // import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
// // // import "../styles/Navbar.css";
// // // import { AuthContext } from "../context/AuthContext";

// // // const Navbar = () => {
// // //   const { user, logout } = useContext(AuthContext);
// // //   const navigate = useNavigate();
// // //   const location = useLocation(); // 👈 get current route

// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const [darkMode, setDarkMode] = useState(false);
// // //   const [scrolled, setScrolled] = useState(false);

// // //   // 🌓 Toggle dark mode
// // //   const toggleDarkMode = () => {
// // //     setDarkMode(!darkMode);
// // //     document.body.classList.toggle("dark-mode", !darkMode);
// // //   };

// // //   // 📜 Add scroll listener for glass fade effect
// // //   useEffect(() => {
// // //     const handleScroll = () => {
// // //       setScrolled(window.scrollY > 60);
// // //     };
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   // 🚪 Logout handler
// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate("/login");
// // //   };

// // //   // 🎯 Hide Navbar on welcome (home) page
// // //   if (location.pathname === "/") {
// // //     return null;
// // //   }

// // //   // Get role from user or localStorage
// // //   const role = user?.role || localStorage.getItem("role") || "guest";

// // //   const renderLinks = () => {
// // //     switch (role) {
// // //       case "user":
// // //         return (
// // //           <>
// // //             <Link to="/restaurants" className="nav-link">Home</Link>
// // //             <Link to="/orders" className="nav-link">My Orders</Link>
// // //             <Link to="/cart" className="nav-link">Cart</Link>
// // //             <Link to="/profile" className="nav-link">My Profile</Link>
// // //           </>
// // //         );
// // //       case "restaurant":
// // //         return (
// // //           <>
// // //             <Link to="/restaurant/dashboard" className="nav-link">Dashboard</Link>
// // //             <Link to="/restaurant/orders" className="nav-link">Orders</Link>
// // //             <Link to="/restaurant/menu" className="nav-link">Menu</Link>
// // //             <Link to="/profile" className="nav-link">Profile</Link>
// // //           </>
// // //         );
// // //       case "admin":
// // //         return (
// // //           <>
// // //             <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
// // //             <Link to="/admin/users" className="nav-link">Users</Link>
// // //             <Link to="/admin/restaurants" className="nav-link">Restaurants</Link>
// // //           </>
// // //         );
// // //       default:
// // //         return (
// // //           <>
// // //             <Link to="/" className="nav-link">Home</Link>
// // //             <Link to="/login" className="nav-link">User</Link>
// // //             <Link to="/restaurant/login" className="nav-link">Restaurant</Link>
// // //             <Link to="/admin/login" className="nav-link">Admin</Link>
// // //           </>
// // //         );
// // //     }
// // //   };

// // //   const handleLogoClick = () => {
// // //     const isLoggedIn = !!user || !!localStorage.getItem("user");
// // //     if (isLoggedIn) {
// // //       navigate("/restaurants");
// // //     } else {
// // //       navigate("/");
// // //     }
// // //   };

// // //   return (
// // //     <nav className={`navbar ${scrolled ? "scrolled" : ""} ${darkMode ? "dark-mode" : ""}`}>
// // //       <div className="nav-container">
// // //         <div className="nav-logo" onClick={handleLogoClick}>
// // //           🍴 Foodify
// // //         </div>

// // //         <div className={`nav-links ${menuOpen ? "open" : ""}`}>
// // //           {renderLinks()}
// // //           {role !== "guest" && (
// // //             <button className="logout-btn" onClick={handleLogout}>
// // //               Logout
// // //             </button>
// // //           )}
// // //         </div>

// // //         <div className="nav-actions">
// // //           <button className="dark-toggle" onClick={toggleDarkMode}>
// // //             {darkMode ? <FaSun /> : <FaMoon />}
// // //           </button>
// // //           <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
// // //             {menuOpen ? <FaTimes /> : <FaBars />}
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;






// // import React, { useState, useEffect, useContext } from "react";
// // import { Link, useNavigate, useLocation } from "react-router-dom";
// // import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
// // import "../styles/Navbar.css";
// // import { AuthContext } from "../context/AuthContext";

// // const Navbar = () => {
// //   const { user, logout } = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [darkMode, setDarkMode] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);

// //   // 🌓 Toggle dark mode
// //   const toggleDarkMode = () => {
// //     setDarkMode(!darkMode);
// //     document.body.classList.toggle("dark-mode", !darkMode);
// //   };

// //   // 📜 Add scroll listener for glass fade effect
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrolled(window.scrollY > 60);
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // 🚪 Logout handler
// //   const handleLogout = () => {
// //     logout();
// //     navigate("/login");
// //   };

// //   // 🎯 Hide Navbar on specific pages
// //   const hideNavbarRoutes = [
// //     "/",               // Welcome page
// //     "/login",          // User login
// //     "/register",       // User register
// //     "/restaurant/login",
// //     "/restaurant/register",
// //     "/admin/login",
// //   ];

// //   if (hideNavbarRoutes.includes(location.pathname)) {
// //     return null;
// //   }

// //   // Get role from user or localStorage
// //   const role = user?.role || localStorage.getItem("role") || "guest";

// //   const renderLinks = () => {
// //     switch (role) {
// //       case "user":
// //         return (
// //           <>
// //             <Link to="/restaurants" className="nav-link">Home</Link>
// //             <Link to="/orders" className="nav-link">My Orders</Link>
// //             <Link to="/cart" className="nav-link">Cart</Link>
// //             <Link to="/profile" className="nav-link">My Profile</Link>
// //           </>
// //         );
// //       case "restaurant":
// //         return (
// //           <>
// //             <Link to="/restaurant/dashboard" className="nav-link">Dashboard</Link>
// //             <Link to="/restaurant/orders" className="nav-link">Orders</Link>
// //             <Link to="/restaurant/menu" className="nav-link">Menu</Link>
// //             <Link to="/profile" className="nav-link">Profile</Link>
// //           </>
// //         );
// //       case "admin":
// //         return (
// //           <>
// //             <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
// //             <Link to="/admin/users" className="nav-link">Users</Link>
// //             <Link to="/admin/restaurants" className="nav-link">Restaurants</Link>
// //           </>
// //         );
// //       default:
// //         return (
// //           <>
// //             <Link to="/" className="nav-link">Home</Link>
// //             <Link to="/login" className="nav-link">User</Link>
// //             <Link to="/restaurant/login" className="nav-link">Restaurant</Link>
// //             <Link to="/admin/login" className="nav-link">Admin</Link>
// //           </>
// //         );
// //     }
// //   };

// //   const handleLogoClick = () => {
// //     const isLoggedIn = !!user || !!localStorage.getItem("user");
// //     if (isLoggedIn) {
// //       navigate("/restaurants");
// //     } else {
// //       navigate("/");
// //     }
// //   };

// //   return (
// //     <nav className={`navbar ${scrolled ? "scrolled" : ""} ${darkMode ? "dark-mode" : ""}`}>
// //       <div className="nav-container">
// //         <div className="nav-logo" onClick={handleLogoClick}>
// //           🍴 Foodify
// //         </div>

// //         <div className={`nav-links ${menuOpen ? "open" : ""}`}>
// //           {renderLinks()}
// //           {role !== "guest" && (
// //             <button className="logout-btn" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           )}
// //         </div>

// //         <div className="nav-actions">
// //           <button className="dark-toggle" onClick={toggleDarkMode}>
// //             {darkMode ? <FaSun /> : <FaMoon />}
// //           </button>
// //           <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
// //             {menuOpen ? <FaTimes /> : <FaBars />}
// //           </button>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;








// import React, { useState, useEffect, useContext } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaBars, FaTimes, FaMoon, FaSun, FaShoppingCart, FaUser, FaBox, FaHome, FaSignOutAlt } from "react-icons/fa";
// import "../styles/Navbar.css";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // 🌓 Toggle dark mode
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.body.classList.toggle("dark-mode", !darkMode);
//   };

//   // 📜 Scroll effect
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // 🚪 Logout handler
//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // 🎯 Hide navbar on these routes
//   const hideNavbarRoutes = [
//     "/", "/login", "/register",
//     "/restaurant/login", "/restaurant/register",
//     "/admin/login"
//   ];

//   if (hideNavbarRoutes.includes(location.pathname)) return null;

//   // ✅ Role-based links
//   const role = user?.role || localStorage.getItem("role") || "guest";

//   const renderLinks = () => {
//     switch (role) {
//       case "user":
//         return (
//           <>
//             <Link to="/restaurants" className="nav-link">
//               <FaHome className="nav-icon" /> Home
//             </Link>
//             <Link to="/orders" className="nav-link">
//               <FaBox className="nav-icon" /> Orders
//             </Link>
//             <Link to="/profile" className="nav-link">
//               <FaUser className="nav-icon" /> Profile
//             </Link>
//           </>
//         );
//       case "restaurant":
//         return (
//           <>
//             <Link to="/restaurant/dashboard" className="nav-link">
//               Dashboard
//             </Link>
//             <Link to="/restaurant/orders" className="nav-link">
//               Orders
//             </Link>
//             <Link to="/restaurant/menu" className="nav-link">
//               Menu
//             </Link>
//             <Link to="/profile" className="nav-link">
//               Profile
//             </Link>
//           </>
//         );
//       case "admin":
//         return (
//           <>
//             <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
//             <Link to="/admin/users" className="nav-link">Users</Link>
//             <Link to="/admin/restaurants" className="nav-link">Restaurants</Link>
//           </>
//         );
//       default:
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
//     <nav className={`navbar-light ${scrolled ? "scrolled" : ""}`}>
//       <div className="nav-container">
//         {/* Logo */}
//         <div className="nav-logo" onClick={() => navigate("/restaurants")}>
//           Foodify
//         </div>

//         {/* Links */}
//         <div className={`nav-links ${menuOpen ? "open" : ""}`}>
//           {renderLinks()}
//         </div>

//         {/* Actions */}
//         <div className="nav-actions">
//           {role === "user" && (
//             <Link to="/cart" className="icon-btn">
//               <FaShoppingCart />
//             </Link>
//           )}
//           <button className="icon-btn" onClick={handleLogout}>
//             <FaSignOutAlt />
//           </button>
//         </div>

//         {/* Mobile toggle */}
//         <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaShoppingCart,
  FaUser,
  FaBox,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/Navbar.css";
import { AuthContext } from "../context/AuthContext";
import Cart from "../pages/Cart"; // ✅ import the new sliding cart
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // ✅ cart drawer toggle

  // 🌓 Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  // 📜 Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚪 Logout handler
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🎯 Hide navbar on these routes
  const hideNavbarRoutes = [
    "/",
    "/login",
    "/register",
    "/restaurant/login",
    "/restaurant/register",
    "/admin/login",
  ];

  if (hideNavbarRoutes.includes(location.pathname)) return null;

  // ✅ Role-based links
  const role = user?.role || localStorage.getItem("role") || "guest";

  const renderLinks = () => {
    switch (role) {
      case "user":
        return (
          <>
            <Link to="/restaurants" className="nav-link">
              <FaHome className="nav-icon" /> Home
            </Link>
            <Link to="/orders" className="nav-link">
              <FaBox className="nav-icon" /> Orders
            </Link>
            <Link to="/profile" className="nav-link">
              <FaUser className="nav-icon" /> Profile
            </Link>
          </>
        );
      case "restaurant":
        return (
          <>
            <Link to="/restaurant/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/restaurant/orders" className="nav-link">
              Orders
            </Link>
            <Link to="/restaurant/menu" className="nav-link">
              Menu
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </>
        );
      case "admin":
        return (
          <>
            <Link to="/admin/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/admin/users" className="nav-link">
              Users
            </Link>
            <Link to="/admin/restaurants" className="nav-link">
              Restaurants
            </Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/login" className="nav-link">
              User
            </Link>
            <Link to="/restaurant/login" className="nav-link">
              Restaurant
            </Link>
            <Link to="/admin/login" className="nav-link">
              Admin
            </Link>
          </>
        );
    }
  };

  return (
    <>
      <nav className={`navbar-light ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Logo */}
          <div
            className="nav-logo"
            onClick={() => navigate("/restaurants")}
            style={{ cursor: "pointer" }}
          >
            Foodify
          </div>

          {/* Links */}
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {renderLinks()}
          </div>

          {/* Actions */}
          <div className="nav-actions">
            {/* Dark Mode Toggle */}
            <button className="icon-btn" onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* 🛒 Cart Button (opens drawer) */}
            {role === "user" && (
              <button
                className="icon-btn cart-btn"
                onClick={() => setIsCartOpen(true)}
              >
                <FaShoppingCart />
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.length}</span>
                )}
              </button>
            )}

            {/* Logout */}
            <button className="icon-btn" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* ✅ Slide-in Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate("/checkout");
        }}
      />
    </>
  );
};

export default Navbar;
