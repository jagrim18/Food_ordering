// // // src/pages/AdminLogin.js
// // import React, { useState, useContext } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";
// // import api from "../utils/api";
// // import "../styles/AdminLogin.css";

// // function AdminLogin() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();
// //   const { setUser } = useContext(AuthContext) || {}; // optional fallback

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       // ✅ Use correct admin endpoint
// //       const res = await api.post("/admin/login", { email, password });

// //       // ✅ Ensure role is admin
// //       if (res.data?.role === "admin" || res.data?.user?.role === "admin") {
// //         const adminData = res.data.user || res.data;
// //         const fullAdmin = { ...adminData, role: "admin" };

// //         // ✅ Store in localStorage
// //         localStorage.setItem("admin", JSON.stringify(fullAdmin));
// //         localStorage.removeItem("user");
// //         localStorage.removeItem("restaurant");

// //         // ✅ Update context if available
// //         if (setUser) setUser(fullAdmin);

// //         navigate("/admin/dashboard");
// //       } else {
// //         setError("Not authorized as Admin.");
// //       }
// //     } catch (err) {
// //       console.error("Admin login error:", err);
// //       setError("Invalid admin credentials or server error.");
// //     }
// //   };

// //   return (
// //     <div className="admin-login-container">
// //       <div className="admin-login-card">
// //         <h2>🔑 Admin Login</h2>
// //         <form onSubmit={handleLogin}>
// //           <input
// //             type="email"
// //             placeholder="Admin Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //           <input
// //             type="password"
// //             placeholder="Admin Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //           {error && <p className="error-text">{error}</p>}
// //           <button type="submit">Login</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdminLogin;






// // src/pages/AdminLogin.jsx
// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../utils/api";
// import "../styles/Admin.css"; // ✅ new CSS file

// function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext) || {};

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/admin/login", { email, password });

//       if (res.data?.role === "admin" || res.data?.user?.role === "admin") {
//         const adminData = res.data.user || res.data;
//         const fullAdmin = { ...adminData, role: "admin" };

//         localStorage.setItem("authUser", JSON.stringify(fullAdmin));
//         localStorage.removeItem("authUser");
//         localStorage.setItem("authUser", JSON.stringify(fullAdmin));


//         if (setUser) setUser(fullAdmin);
//         navigate("/admin/dashboard");
//       } else {
//         setError("Not authorized as Admin.");
//       }
//     } catch (err) {
//       console.error("Admin login error:", err);
//       setError("Invalid admin credentials or server error.");
//     }
//   };

//   return (
//     <div className="admin-auth-container">
//       <div className="admin-auth-card">
//         <h1 className="admin-title">👑 Admin Login</h1>
//         <p className="admin-subtitle">
//           Sign in to manage restaurants, users & system operations
//         </p>

//         <form onSubmit={handleLogin} className="admin-form">
//           <input
//             type="email"
//             placeholder="Admin Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="admin-input"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Admin Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="admin-input"
//             required
//           />
//           {error && <p className="admin-error">{error}</p>}

//           <button type="submit" className="admin-btn">
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;
