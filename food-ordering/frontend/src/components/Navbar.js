// // // // import React, { useState, useEffect, useContext } from "react";
// // // // import { Link, useNavigate, useLocation } from "react-router-dom";
// // // // import {
// // // //   FaBars,
// // // //   FaTimes,
// // // //   FaMoon,
// // // //   FaSun,
// // // //   FaShoppingCart,
// // // //   FaUser,
// // // //   FaBox,
// // // //   FaHome,
// // // //   FaSignOutAlt,
// // // //   FaThLarge,
// // // //   FaStore,
// // // // } from "react-icons/fa";
// // // // import "../styles/Navbar.css";
// // // // import { AuthContext } from "../context/AuthContext";
// // // // import Cart from "../pages/Cart";
// // // // import { CartContext } from "../context/CartContext";

// // // // const Navbar = () => {
// // // //   const { user, logout } = useContext(AuthContext);
// // // //   const { cart } = useContext(CartContext);
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();

// // // //   const [menuOpen, setMenuOpen] = useState(false);
// // // //   const [darkMode, setDarkMode] = useState(false);
// // // //   const [scrolled, setScrolled] = useState(false);
// // // //   const [isCartOpen, setIsCartOpen] = useState(false);

// // // //   const toggleDarkMode = () => {
// // // //     setDarkMode(!darkMode);
// // // //     document.body.classList.toggle("dark-mode", !darkMode);
// // // //   };

// // // //   useEffect(() => {
// // // //     const handleScroll = () => setScrolled(window.scrollY > 20);
// // // //     window.addEventListener("scroll", handleScroll);
// // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // //   }, []);

// // // //   const handleLogout = () => {
// // // //     logout();
// // // //     navigate("/login");
// // // //   };

// // // //   // Hide navbar on auth or landing pages
// // // //   const hideNavbarRoutes = [
// // // //     "/",
// // // //     "/login",
// // // //     "/register",
// // // //     "/restaurant/login",
// // // //     "/restaurant/register",
// // // //     "/admin/login",
// // // //   ];
// // // //   if (hideNavbarRoutes.includes(location.pathname)) return null;

// // // //   const role = user?.role || localStorage.getItem("role") || "guest";

// // // //   /* =============================
// // // //      ADMIN NAVBAR (Image 2 style)
// // // //      ============================= */
// // // //   if (role === "admin") {
// // // //     return (
// // // //       <nav className="admin-navbar">
// // // //         <div className="admin-nav-container">
// // // //           {/* Left: Title */}
// // // //           <h2 className="admin-logo">Campus Food Admin</h2>

// // // //           {/* Center: Navigation */}
// // // //           <div className="admin-nav-links">
// // // //             <button
// // // //               className={`admin-link ${
// // // //                 location.pathname === "/admin/dashboard" ? "active" : ""
// // // //               }`}
// // // //               onClick={() => navigate("/admin/dashboard")}
// // // //             >
// // // //               <FaThLarge className="admin-icon" />
// // // //               Dashboard
// // // //             </button>
// // // //             <button
// // // //               className={`admin-link ${
// // // //                 location.pathname === "/admin/outlets" ? "active" : ""
// // // //               }`}
// // // //               onClick={() => navigate("/admin/outlets")}
// // // //             >
// // // //               <FaStore className="admin-icon" />
// // // //               Outlets
// // // //             </button>
// // // //           </div>

// // // //           {/* Right: Logout */}
// // // //           <button className="admin-logout" onClick={handleLogout}>
// // // //             <FaSignOutAlt className="logout-icon" />
// // // //             Logout
// // // //           </button>
// // // //         </div>
// // // //       </nav>
// // // //     );
// // // //   }

// // // //   /* =============================
// // // //      RESTAURANT NAVBAR
// // // //      ============================= */
// // // //   if (role === "restaurant") {
// // // //     return (
// // // //       <nav className="restaurant-navbar">
// // // //         <div className="restaurant-nav-container">
// // // //           <div
// // // //             className="restaurant-logo"
// // // //             onClick={() => navigate("/restaurant/dashboard")}
// // // //           >
// // // //             Foodify
// // // //           </div>

// // // //           <div className="restaurant-nav-links">
// // // //             <Link
// // // //               to="/restaurant/dashboard"
// // // //               className={`restaurant-link ${
// // // //                 location.pathname === "/restaurant/dashboard" ? "active" : ""
// // // //               }`}
// // // //             >
// // // //               <FaThLarge className="restaurant-icon" /> Dashboard
// // // //             </Link>

// // // //             <Link
// // // //               to="/restaurant/menu"
// // // //               className={`restaurant-link ${
// // // //                 location.pathname === "/restaurant/menu" ? "active" : ""
// // // //               }`}
// // // //             >
// // // //               <FaBars className="restaurant-icon" /> Menu
// // // //             </Link>
// // // //           </div>

// // // //           <button className="restaurant-logout" onClick={handleLogout}>
// // // //             <FaSignOutAlt className="logout-icon" /> Logout
// // // //           </button>
// // // //         </div>
// // // //       </nav>
// // // //     );
// // // //   }

// // // //   /* =============================
// // // //      DEFAULT USER NAVBAR
// // // //      ============================= */
// // // //   return (
// // // //     <>
// // // //       <nav className={`navbar-light ${scrolled ? "scrolled" : ""}`}>
// // // //         <div className="nav-container">
// // // //           <div
// // // //             className="nav-logo"
// // // //             onClick={() => navigate("/restaurants")}
// // // //             style={{ cursor: "pointer" }}
// // // //           >
// // // //             foodify
// // // //           </div>

// // // //           <div className={`nav-links ${menuOpen ? "open" : ""}`}>
// // // //             {role === "user" && (
// // // //               <>
// // // //                 <Link to="/restaurants" className="nav-link">
// // // //                   <FaHome className="nav-icon" /> Home
// // // //                 </Link>
// // // //                 <Link to="/orders" className="nav-link">
// // // //                   <FaBox className="nav-icon" /> Orders
// // // //                 </Link>
// // // //                 <Link to="/profile" className="nav-link">
// // // //                   <FaUser className="nav-icon" /> Profile
// // // //                 </Link>
// // // //               </>
// // // //             )}
// // // //           </div>

// // // //           <div className="nav-actions">
// // // //             <button className="icon-btn" onClick={toggleDarkMode}>
// // // //               {darkMode ? <FaSun /> : <FaMoon />}
// // // //             </button>

// // // //             {role === "user" && (
// // // //               <button
// // // //                 className="icon-btn cart-btn"
// // // //                 onClick={() => setIsCartOpen(true)}
// // // //               >
// // // //                 <FaShoppingCart />
// // // //                 {cart.length > 0 && (
// // // //                   <span className="cart-badge">{cart.length}</span>
// // // //                 )}
// // // //               </button>
// // // //             )}

// // // //             <button className="icon-btn" onClick={handleLogout}>
// // // //               <FaSignOutAlt />
// // // //             </button>
// // // //           </div>

// // // //           <button
// // // //             className="menu-toggle"
// // // //             onClick={() => setMenuOpen(!menuOpen)}
// // // //           >
// // // //             {menuOpen ? <FaTimes /> : <FaBars />}
// // // //           </button>
// // // //         </div>
// // // //       </nav>

// // // //       <Cart
// // // //         isOpen={isCartOpen}
// // // //         onClose={() => setIsCartOpen(false)}
// // // //         onCheckout={() => {
// // // //           setIsCartOpen(false);
// // // //           navigate("/checkout");
// // // //         }}
// // // //       />
// // // //     </>
// // // //   );
// // // // };

// // // // export default Navbar;










// // // import React, { useState, useEffect, useContext } from "react";
// // // import { Link, useNavigate, useLocation } from "react-router-dom";
// // // import {
// // //   FaBars,
// // //   FaTimes,
// // //   FaShoppingCart,
// // //   FaUser,
// // //   FaBox,
// // //   FaHome,
// // //   FaSignOutAlt,
// // //   FaThLarge,
// // //   FaStore,
// // // } from "react-icons/fa";
// // // import "../styles/Navbar.css";
// // // import { AuthContext } from "../context/AuthContext";
// // // import Cart from "../pages/Cart";
// // // import { CartContext } from "../context/CartContext";

// // // const Navbar = () => {
// // //   const { user, logout } = useContext(AuthContext);
// // //   const { cart } = useContext(CartContext);
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const [scrolled, setScrolled] = useState(false);
// // //   const [isCartOpen, setIsCartOpen] = useState(false);

// // //   // Add scroll shadow
// // //   useEffect(() => {
// // //     const handleScroll = () => setScrolled(window.scrollY > 20);
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate("/login");
// // //   };

// // //   // Hide navbar on auth/landing pages
// // //   const hideNavbarRoutes = [
// // //     "/",
// // //     "/login",
// // //     "/register",
// // //     "/restaurant/login",
// // //     "/restaurant/register",
// // //     "/admin/login",
// // //   ];
// // //   if (hideNavbarRoutes.includes(location.pathname)) return null;

// // //   const role = user?.role || localStorage.getItem("role") || "guest";

// // //   /* =============================
// // //      ADMIN NAVBAR
// // //      ============================= */
// // //   if (role === "admin") {
// // //     return (
// // //       <nav className="admin-navbar">
// // //         <div className="admin-nav-container">
// // //           {/* Left: Title */}
// // //           <h2 className="admin-logo">Campus Food Admin</h2>

// // //           {/* Center: Navigation */}
// // //           <div className="admin-nav-links">
// // //             <button
// // //               className={`admin-link ${
// // //                 location.pathname === "/admin/dashboard" ? "active" : ""
// // //               }`}
// // //               onClick={() => navigate("/admin/dashboard")}
// // //             >
// // //               <FaThLarge className="admin-icon" />
// // //               Dashboard
// // //             </button>
// // //             <button
// // //               className={`admin-link ${
// // //                 location.pathname === "/admin/outlets" ? "active" : ""
// // //               }`}
// // //               onClick={() => navigate("/admin/outlets")}
// // //             >
// // //               <FaStore className="admin-icon" />
// // //               Outlets
// // //             </button>
// // //           </div>

// // //           {/* Right: Logout */}
// // //           <button className="admin-logout" onClick={handleLogout}>
// // //             <FaSignOutAlt className="logout-icon" />
// // //             Logout
// // //           </button>
// // //         </div>
// // //       </nav>
// // //     );
// // //   }

// // //   /* =============================
// // //      RESTAURANT NAVBAR
// // //      ============================= */
// // //   if (role === "restaurant") {
// // //     return (
// // //       <nav className="restaurant-navbar">
// // //         <div className="restaurant-nav-container">
// // //           <div
// // //             className="restaurant-logo"
// // //             onClick={() => navigate("/restaurant/dashboard")}
// // //           >
// // //             Foodify
// // //           </div>

// // //           <div className="restaurant-nav-links">
// // //             <Link
// // //               to="/restaurant/dashboard"
// // //               className={`restaurant-link ${
// // //                 location.pathname === "/restaurant/dashboard" ? "active" : ""
// // //               }`}
// // //             >
// // //               <FaThLarge className="restaurant-icon" /> Dashboard
// // //             </Link>

// // //             <Link
// // //               to="/restaurant/menu"
// // //               className={`restaurant-link ${
// // //                 location.pathname === "/restaurant/menu" ? "active" : ""
// // //               }`}
// // //             >
// // //               <FaBars className="restaurant-icon" /> Menu
// // //             </Link>
// // //           </div>

// // //           <button className="restaurant-logout" onClick={handleLogout}>
// // //             <FaSignOutAlt className="logout-icon" /> Logout
// // //           </button>
// // //         </div>
// // //       </nav>
// // //     );
// // //   }

// // //   /* =============================
// // //      DEFAULT USER NAVBAR
// // //      ============================= */
// // //   return (
// // //     <>
// // //       <nav className={`navbar-light ${scrolled ? "scrolled" : ""}`}>
// // //         <div className="nav-container">
// // //           {/* Logo */}
// // //           <div
// // //             className="nav-logo"
// // //             onClick={() => navigate("/restaurants")}
// // //             style={{ cursor: "pointer" }}
// // //           >
// // //             foodify
// // //           </div>

// // //           {/* Nav Links */}
// // //           <div className={`nav-links ${menuOpen ? "open" : ""}`}>
// // //             {role === "user" && (
// // //               <>
// // //                 <Link to="/restaurants" className="nav-link">
// // //                   <FaHome className="nav-icon" /> Home
// // //                 </Link>
// // //                 <Link to="/orders" className="nav-link">
// // //                   <FaBox className="nav-icon" /> Orders
// // //                 </Link>
// // //                 <Link to="/profile" className="nav-link">
// // //                   <FaUser className="nav-icon" /> Profile
// // //                 </Link>
// // //               </>
// // //             )}
// // //           </div>

// // //           {/* Right Actions */}
// // //           <div className="nav-actions">
// // //             {role === "user" && (
// // //               <button
// // //                 className="icon-btn cart-btn"
// // //                 onClick={() => setIsCartOpen(true)}
// // //               >
// // //                 <FaShoppingCart />
// // //                 {cart.length > 0 && (
// // //                   <span className="cart-badge">{cart.length}</span>
// // //                 )}
// // //               </button>
// // //             )}

// // //             <button className="icon-btn" onClick={handleLogout}>
// // //               <FaSignOutAlt />
// // //             </button>
// // //           </div>

// // //           {/* Mobile Menu Toggle */}
// // //           <button
// // //             className="menu-toggle"
// // //             onClick={() => setMenuOpen(!menuOpen)}
// // //           >
// // //             {menuOpen ? <FaTimes /> : <FaBars />}
// // //           </button>
// // //         </div>
// // //       </nav>

// // //       {/* Cart Modal */}
// // //       <Cart
// // //         isOpen={isCartOpen}
// // //         onClose={() => setIsCartOpen(false)}
// // //         onCheckout={() => {
// // //           setIsCartOpen(false);
// // //           navigate("/checkout");
// // //         }}
// // //       />
// // //     </>
// // //   );
// // // };

// // // export default Navbar;







// // import React, { useState, useEffect, useContext } from "react";
// // import { Link, useNavigate, useLocation } from "react-router-dom";
// // import {
// //   FaBars,
// //   FaTimes,
// //   FaShoppingCart,
// //   FaUser,
// //   FaBox,
// //   FaHome,
// //   FaSignOutAlt,
// //   FaThLarge,
// //   FaStore,
// //   FaMoon,
// //   FaSun,
// // } from "react-icons/fa";
// // import "../styles/Navbar.css";
// // import { AuthContext } from "../context/AuthContext";
// // import Cart from "../pages/Cart";
// // import { CartContext } from "../context/CartContext";
// // import { ThemeContext } from "../context/ThemeContext"; // ✅ New import

// // const Navbar = () => {
// //   const { user, logout } = useContext(AuthContext);
// //   const { cart } = useContext(CartContext);
// //   const { theme, toggleTheme } = useContext(ThemeContext); // ✅ Access theme
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);
// //   const [isCartOpen, setIsCartOpen] = useState(false);

// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 20);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/login");
// //   };

// //   const hideNavbarRoutes = [
// //     "/",
// //     "/login",
// //     "/register",
// //     "/restaurant/login",
// //     "/restaurant/register",
// //     "/admin/login",
// //   ];
// //   if (hideNavbarRoutes.includes(location.pathname)) return null;

// //   const role = user?.role || localStorage.getItem("role") || "guest";

// //   // =============================
// //   // ADMIN NAVBAR
// //   // =============================
// //   if (role === "admin") {
// //     return (
// //       <nav className="admin-navbar">
// //         <div className="admin-nav-container">
// //           <h2 className="admin-logo">Campus Food Admin</h2>

// //           <div className="admin-nav-links">
// //             <button
// //               className={`admin-link ${
// //                 location.pathname === "/admin/dashboard" ? "active" : ""
// //               }`}
// //               onClick={() => navigate("/admin/dashboard")}
// //             >
// //               <FaThLarge className="admin-icon" />
// //               Dashboard
// //             </button>
// //             <button
// //               className={`admin-link ${
// //                 location.pathname === "/admin/outlets" ? "active" : ""
// //               }`}
// //               onClick={() => navigate("/admin/outlets")}
// //             >
// //               <FaStore className="admin-icon" />
// //               Outlets
// //             </button>
// //           </div>

// //           <div className="nav-actions">
// //             {/* ✅ Theme Toggle */}
// //             <button className="icon-btn" onClick={toggleTheme}>
// //               {theme === "dark" ? <FaSun /> : <FaMoon />}
// //             </button>

// //             <button className="admin-logout" onClick={handleLogout}>
// //               <FaSignOutAlt className="logout-icon" />
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </nav>
// //     );
// //   }

// //   // =============================
// //   // RESTAURANT NAVBAR
// //   // =============================
// //   if (role === "restaurant") {
// //     return (
// //       <nav className="restaurant-navbar">
// //         <div className="restaurant-nav-container">
// //           <div
// //             className="restaurant-logo"
// //             onClick={() => navigate("/restaurant/dashboard")}
// //           >
// //             Foodify
// //           </div>

// //           <div className="restaurant-nav-links">
// //             <Link
// //               to="/restaurant/dashboard"
// //               className={`restaurant-link ${
// //                 location.pathname === "/restaurant/dashboard" ? "active" : ""
// //               }`}
// //             >
// //               <FaThLarge className="restaurant-icon" /> Dashboard
// //             </Link>

// //             <Link
// //               to="/restaurant/menu"
// //               className={`restaurant-link ${
// //                 location.pathname === "/restaurant/menu" ? "active" : ""
// //               }`}
// //             >
// //               <FaBars className="restaurant-icon" /> Menu
// //             </Link>
// //           </div>

// //           <div className="nav-actions">
// //             {/* ✅ Theme Toggle */}
// //             <button className="icon-btn" onClick={toggleTheme}>
// //               {theme === "dark" ? <FaSun /> : <FaMoon />}
// //             </button>

// //             <button className="restaurant-logout" onClick={handleLogout}>
// //               <FaSignOutAlt className="logout-icon" /> Logout
// //             </button>
// //           </div>
// //         </div>
// //       </nav>
// //     );
// //   }

// //   // =============================
// //   // DEFAULT USER NAVBAR
// //   // =============================
// //   return (
// //     <>
// //       <nav className={`navbar-light ${scrolled ? "scrolled" : ""}`}>
// //         <div className="nav-container">
// //           <div
// //             className="nav-logo"
// //             onClick={() => navigate("/restaurants")}
// //             style={{ cursor: "pointer" }}
// //           >
// //             foodify
// //           </div>

// //           <div className={`nav-links ${menuOpen ? "open" : ""}`}>
// //             {role === "user" && (
// //               <>
// //                 <Link to="/restaurants" className="nav-link">
// //                   <FaHome className="nav-icon" /> Home
// //                 </Link>
// //                 <Link to="/orders" className="nav-link">
// //                   <FaBox className="nav-icon" /> Orders
// //                 </Link>
// //                 <Link to="/profile" className="nav-link">
// //                   <FaUser className="nav-icon" /> Profile
// //                 </Link>
// //               </>
// //             )}
// //           </div>

// //           <div className="nav-actions">
// //             {/* ✅ Theme Toggle Button */}
// //             <button className="icon-btn" onClick={toggleTheme}>
// //               {theme === "dark" ? <FaSun /> : <FaMoon />}
// //             </button>

// //             {role === "user" && (
// //               <button
// //                 className="icon-btn cart-btn"
// //                 onClick={() => setIsCartOpen(true)}
// //               >
// //                 <FaShoppingCart />
// //                 {cart.length > 0 && (
// //                   <span className="cart-badge">{cart.length}</span>
// //                 )}
// //               </button>
// //             )}

// //             <button className="icon-btn" onClick={handleLogout}>
// //               <FaSignOutAlt />
// //             </button>
// //           </div>

// //           <button
// //             className="menu-toggle"
// //             onClick={() => setMenuOpen(!menuOpen)}
// //           >
// //             {menuOpen ? <FaTimes /> : <FaBars />}
// //           </button>
// //         </div>
// //       </nav>

// //       <Cart
// //         isOpen={isCartOpen}
// //         onClose={() => setIsCartOpen(false)}
// //         onCheckout={() => {
// //           setIsCartOpen(false);
// //           navigate("/checkout");
// //         }}
// //       />
// //     </>
// //   );
// // };

// // export default Navbar;




// import React, { useState, useEffect, useContext } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaBars,
//   FaTimes,
//   FaShoppingCart,
//   FaUser,
//   FaBox,
//   FaHome,
//   FaSignOutAlt,
//   FaThLarge,
//   FaStore,
//   FaMoon,
//   FaSun,
// } from "react-icons/fa";
// import "../styles/Navbar.css";
// import { AuthContext } from "../context/AuthContext";
// import Cart from "../pages/Cart";
// import { CartContext } from "../context/CartContext";
// import { ThemeContext } from "../context/ThemeContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const { cart } = useContext(CartContext);
//   const { theme, toggleTheme } = useContext(ThemeContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const hideNavbarRoutes = [
//     "/",
//     "/login",
//     "/register",
//     "/restaurant/login",
//     "/restaurant/register",
//     "/admin/login",
//   ];
//   if (hideNavbarRoutes.includes(location.pathname)) return null;

//   const role = user?.role || localStorage.getItem("role") || "guest";

//   // =============================
//   // ADMIN NAVBAR
//   // =============================
//   if (role === "admin") {
//     return (
//       <nav className="admin-navbar">
//         <div className="admin-nav-container">
//           {/* LEFT SECTION */}
//           <div className="admin-left">
//             <h2 className="admin-logo">Campus Food Admin</h2>

//             <div className="admin-links">
//               <button
//                 className={`admin-link ${
//                   location.pathname === "/admin/dashboard" ? "active" : ""
//                 }`}
//                 onClick={() => navigate("/admin/dashboard")}
//               >
//                 <FaThLarge className="admin-icon" />
//                 Dashboard
//               </button>
//               <button
//                 className={`admin-link ${
//                   location.pathname === "/admin/outlets" ? "active" : ""
//                 }`}
//                 onClick={() => navigate("/admin/outlets")}
//               >
//                 <FaStore className="admin-icon" />
//                 Outlets
//               </button>
//             </div>
//           </div>

//           {/* RIGHT SECTION */}
//           <div className="admin-right">
//             <button className="admin-theme-btn" onClick={toggleTheme}>
//               {theme === "dark" ? <FaSun /> : <FaMoon />}
//             </button>

//             <button className="admin-logout" onClick={handleLogout}>
//               <FaSignOutAlt className="logout-icon" /> Logout
//             </button>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   // =============================
//   // RESTAURANT NAVBAR
//   // =============================
//   if (role === "restaurant") {
//     return (
//       <nav className="restaurant-navbar">
//         <div className="restaurant-nav-container">
//           <div
//             className="restaurant-logo"
//             onClick={() => navigate("/restaurant/dashboard")}
//           >
//             Foodify
//           </div>

//           <div className="restaurant-nav-links">
//             <Link
//               to="/restaurant/dashboard"
//               className={`restaurant-link ${
//                 location.pathname === "/restaurant/dashboard" ? "active" : ""
//               }`}
//             >
//               <FaThLarge className="restaurant-icon" /> Dashboard
//             </Link>

//             <Link
//               to="/restaurant/menu"
//               className={`restaurant-link ${
//                 location.pathname === "/restaurant/menu" ? "active" : ""
//               }`}
//             >
//               <FaBars className="restaurant-icon" /> Menu
//             </Link>
//           </div>

//           <div className="nav-actions">
//             <button className="icon-btn" onClick={toggleTheme}>
//               {theme === "dark" ? <FaSun /> : <FaMoon />}
//             </button>

//             <button className="restaurant-logout" onClick={handleLogout}>
//               <FaSignOutAlt className="logout-icon" /> Logout
//             </button>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   // =============================
//   // DEFAULT USER NAVBAR
//   // =============================
//   return (
//     <>
//       <nav className={`navbar-light ${scrolled ? "scrolled" : ""}`}>
//         <div className="nav-container">
//           <div className="nav-logo" onClick={() => navigate("/restaurants")}>
//             foodify
//           </div>

//           <div className={`nav-links ${menuOpen ? "open" : ""}`}>
//             {role === "user" && (
//               <>
//                 <Link to="/restaurants" className="nav-link">
//                   <FaHome className="nav-icon" /> Home
//                 </Link>
//                 <Link to="/orders" className="nav-link">
//                   <FaBox className="nav-icon" /> Orders
//                 </Link>
//                 <Link to="/profile" className="nav-link">
//                   <FaUser className="nav-icon" /> Profile
//                 </Link>
//               </>
//             )}
//           </div>

//           <div className="nav-actions">
//             <button className="icon-btn" onClick={toggleTheme}>
//               {theme === "dark" ? <FaSun /> : <FaMoon />}
//             </button>

//             {role === "user" && (
//               <button
//                 className="icon-btn cart-btn"
//                 onClick={() => setIsCartOpen(true)}
//               >
//                 <FaShoppingCart />
//                 {cart.length > 0 && (
//                   <span className="cart-badge">{cart.length}</span>
//                 )}
//               </button>
//             )}

//             <button className="icon-btn" onClick={handleLogout}>
//               <FaSignOutAlt />
//             </button>
//           </div>

//           <button
//             className="menu-toggle"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </nav>

//       <Cart
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//         onCheckout={() => {
//           setIsCartOpen(false);
//           navigate("/checkout");
//         }}
//       />
//     </>
//   );
// };

// export default Navbar;








import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
  FaBox,
  FaHome,
  FaSignOutAlt,
  FaThLarge,
  FaStore,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "../styles/Navbar.css";
import { AuthContext } from "../context/AuthContext";
import Cart from "../pages/Cart";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const hideNavbarRoutes = [
    "/",
    "/login",
    "/register",
    "/restaurant/login",
    "/restaurant/register",
    "/admin/login",
  ];
  if (hideNavbarRoutes.includes(location.pathname)) return null;

  const role = user?.role || localStorage.getItem("role") || "guest";

  // =============================
  // ADMIN NAVBAR
  // =============================
  if (role === "admin") {
    return (
      <nav className="admin-navbar">
        <div className="admin-nav-container">
          {/* LEFT SECTION */}
          <div className="admin-left">
            <h2 className="admin-logo">Campus Food Admin</h2>

            <div className="admin-links">
              <button
                className={`admin-link ${
                  location.pathname === "/admin/dashboard" ? "active" : ""
                }`}
                onClick={() => navigate("/admin/dashboard")}
              >
                <FaThLarge className="admin-icon" />
                Dashboard
              </button>
              <button
                className={`admin-link ${
                  location.pathname === "/admin/outlets" ? "active" : ""
                }`}
                onClick={() => navigate("/admin/outlets")}
              >
                <FaStore className="admin-icon" />
                Outlets
              </button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="admin-right">
            <button className="admin-theme-btn" onClick={toggleTheme}>
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <button className="admin-logout" onClick={handleLogout}>
              <FaSignOutAlt className="logout-icon" /> Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // =============================
  // RESTAURANT NAVBAR
  // =============================
  if (role === "restaurant") {
    return (
      <nav className="restaurant-navbar">
        <div className="restaurant-nav-container">
          <div
            className="restaurant-logo"
            onClick={() => navigate("/restaurant/dashboard")}
          >
            Foodify
          </div>

          <div className="restaurant-nav-links">
            <Link
              to="/restaurant/dashboard"
              className={`restaurant-link ${
                location.pathname === "/restaurant/dashboard" ? "active" : ""
              }`}
            >
              <FaThLarge className="restaurant-icon" /> Dashboard
            </Link>

            <Link
              to="/restaurant/menu"
              className={`restaurant-link ${
                location.pathname === "/restaurant/menu" ? "active" : ""
              }`}
            >
              <FaBars className="restaurant-icon" /> Menu
            </Link>

            {/* ✅ NEW PROFILE LINK */}
            <Link
              to="/restaurant/profile"
              className={`restaurant-link ${
                location.pathname === "/restaurant/profile" ? "active" : ""
              }`}
            >
              <FaUser className="restaurant-icon" /> Profile
            </Link>
          </div>

          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleTheme}>
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <button className="restaurant-logout" onClick={handleLogout}>
              <FaSignOutAlt className="logout-icon" /> Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // =============================
  // DEFAULT USER NAVBAR
  // =============================
  return (
    <>
      <nav className={`navbar-light ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigate("/restaurants")}>
            foodify
          </div>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {role === "user" && (
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
            )}
          </div>

          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleTheme}>
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

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

            <button className="icon-btn" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

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
