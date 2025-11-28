// // // import React, { useState, useContext, useEffect } from "react";
// // // import { useNavigate, Link } from "react-router-dom";
// // // import { AuthContext } from "../context/AuthContext";
// // // import { toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";
// // // import "../styles/Auth.css";
// // // import OtpModal from "../components/OtpModal"; // ✅ NEW

// // // function Login() {
// // //   const { login, setUser, pendingEmail } = useContext(AuthContext);
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [loginAs, setLoginAs] = useState("Student/Professor");
// // //   const [error, setError] = useState("");
// // //   const [showOtpModal, setShowOtpModal] = useState(false); // ✅ NEW
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const storedUser = JSON.parse(localStorage.getItem("user"));
// // //     if (storedUser) {
// // //       if (storedUser.role === "restaurant") navigate("/restaurant/dashboard", { replace: true });
// // //       else if (storedUser.role === "admin") navigate("/admin/dashboard", { replace: true });
// // //       else navigate("/restaurants", { replace: true });
// // //     }
// // //   }, [navigate]);

// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     try {
// // //       let role =
// // //         loginAs === "Restaurant Manager"
// // //           ? "restaurant"
// // //           : loginAs === "Administrator"
// // //           ? "admin"
// // //           : "user";

// // //       const result = await login(email, password, role);

// // //       if (result?.otpRequired) {
// // //         toast.info("📧 OTP sent to your email.", { position: "top-center" });
// // //         setShowOtpModal(true); // ✅ OPEN OTP POPUP
// // //         return;
// // //       }

// // //       const loggedInUser = {
// // //         _id: result._id,
// // //         name: result.name,
// // //         email: result.email,
// // //         role: result.role,
// // //         token: result.token,
// // //       };

// // //       localStorage.setItem("user", JSON.stringify(loggedInUser));
// // //       setUser(loggedInUser);

// // //       toast.success("✅ Login successful!", { position: "top-center" });

// // //       setTimeout(() => {
// // //         if (loggedInUser.role === "restaurant") {
// // //           navigate("/restaurant/dashboard", { replace: true });
// // //         } else if (loggedInUser.role === "admin") {
// // //           navigate("/admin/dashboard", { replace: true });
// // //         } else {
// // //           navigate("/restaurants", { replace: true });
// // //         }
// // //       }, 1500);
// // //     } catch (err) {
// // //       setError(err.message || "Invalid credentials");
// // //     }
// // //   };

// // //   return (
// // //     <div className="auth-page">
// // //       <div className="auth-box">
// // //         <h2 className="auth-heading">Campus Food</h2>
// // //         <p className="auth-subtext">Order food from campus outlets</p>

// // //         <div className="toggle-container">
// // //           <button className={`toggle-btn active`} type="button" onClick={() => navigate("/login")}>
// // //             Login
// // //           </button>
// // //           <button className="toggle-btn" type="button" onClick={() => navigate("/register")}>
// // //             Sign Up
// // //           </button>
// // //         </div>

// // //         <form onSubmit={handleLogin} className="auth-form">
// // //           <label className="auth-label">Email</label>
// // //           <input
// // //             type="email"
// // //             placeholder="you@university.edu"
// // //             className="auth-input"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             required
// // //           />
// // //           <label className="auth-label">Password</label>
// // //           <input
// // //             type="password"
// // //             placeholder="••••••••"
// // //             className="auth-input"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //             required
// // //           />
// // //           <label className="auth-label">Login As</label>
// // //           <select className="auth-select" value={loginAs} onChange={(e) => setLoginAs(e.target.value)}>
// // //             <option>Student/Professor</option>
// // //             <option>Restaurant Manager</option>
// // //             <option>Administrator</option>
// // //           </select>
// // //           {error && <p className="auth-error">{error}</p>}
// // //           <button type="submit" className="auth-btn">Login</button>
// // //         </form>
// // //       </div>

// // //       {/* ✅ OTP Popup Modal */}
// // //       {showOtpModal && (
// // //         <OtpModal
// // //           email={pendingEmail || email}
// // //           onClose={() => setShowOtpModal(false)}
// // //           onSuccess={() => {
// // //             toast.success("Email verified! Logging in...");
// // //             navigate("/restaurants");
// // //           }}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Login;






// // import React, { useState, useContext, useEffect } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import "../styles/Auth.css";
// // import OtpModal from "../components/OtpModal"; // ✅ OTP popup

// // function Login() {
// //   const { login, setUser, pendingEmail } = useContext(AuthContext);
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loginAs, setLoginAs] = useState("Student/Professor");
// //   const [error, setError] = useState("");
// //   const [showOtpModal, setShowOtpModal] = useState(false);
// //   const navigate = useNavigate();

// //   // Redirect if already logged in
// //   useEffect(() => {
// //     const storedUser = JSON.parse(localStorage.getItem("user"));
// //     if (storedUser) {
// //       if (storedUser.role === "restaurant") navigate("/restaurant/dashboard", { replace: true });
// //       else if (storedUser.role === "admin") navigate("/admin/dashboard", { replace: true });
// //       else navigate("/restaurants", { replace: true });
// //     }
// //   }, [navigate]);

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     try {
// //       let role =
// //         loginAs === "Restaurant Manager"
// //           ? "restaurant"
// //           : loginAs === "Administrator"
// //           ? "admin"
// //           : "user";

// //       const result = await login(email, password, role);

// //       if (result?.otpRequired) {
// //         toast.info("📧 OTP sent to your email.", { position: "top-center" });
// //         setShowOtpModal(true);
// //         return;
// //       }

// //       const loggedInUser = {
// //         _id: result._id,
// //         name: result.name,
// //         email: result.email,
// //         role: result.role,
// //         token: result.token,
// //       };

// //       localStorage.setItem("user", JSON.stringify(loggedInUser));
// //       setUser(loggedInUser);

// //       toast.success("✅ Login successful!", { position: "top-center" });

// //       setTimeout(() => {
// //         if (loggedInUser.role === "restaurant") {
// //           navigate("/restaurant/dashboard", { replace: true });
// //         } else if (loggedInUser.role === "admin") {
// //           navigate("/admin/dashboard", { replace: true });
// //         } else {
// //           navigate("/restaurants", { replace: true });
// //         }
// //       }, 1500);
// //     } catch (err) {
// //       setError(err.message || "Invalid credentials");
// //     }
// //   };

// //   return (
// //     <div className="auth-page">
// //       <div className="auth-box">
// //         <h2 className="auth-heading">Campus Food</h2>
// //         <p className="auth-subtext">Order food from campus outlets</p>

// //         <div className="toggle-container">
// //           <button className={`toggle-btn active`} type="button" onClick={() => navigate("/login")}>
// //             Login
// //           </button>
// //           <button className="toggle-btn" type="button" onClick={() => navigate("/register")}>
// //             Sign Up
// //           </button>
// //         </div>

// //         <form onSubmit={handleLogin} className="auth-form">
// //           <label className="auth-label">Email</label>
// //           <input
// //             type="email"
// //             placeholder="you@university.edu"
// //             className="auth-input"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />

// //           <label className="auth-label">Password</label>
// //           <input
// //             type="password"
// //             placeholder="••••••••"
// //             className="auth-input"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />

// //           <label className="auth-label">Login As</label>
// //           <select className="auth-select" value={loginAs} onChange={(e) => setLoginAs(e.target.value)}>
// //             <option>Student/Professor</option>
// //             <option>Restaurant Manager</option>
// //             <option>Administrator</option>
// //           </select>

// //           {error && <p className="auth-error">{error}</p>}
// //           <button type="submit" className="auth-btn">Login</button>
// //         </form>
// //       </div>

// //       {/* ✅ OTP Popup Modal */}
// //       {showOtpModal && (
// //         <OtpModal
// //           email={pendingEmail || email}
// //           onClose={() => setShowOtpModal(false)}
// //           onSuccess={() => {
// //             toast.success("✅ Email verified successfully! Logging in...", {
// //               position: "top-center",
// //             });
// //             setTimeout(() => navigate("/restaurants", { replace: true }), 1500);
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // export default Login;

// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../styles/Auth.css";
// import OtpModal from "../components/OtpModal"; // ✅ OTP popup

// function Login() {
//   const { login, setUser, pendingEmail } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginAs, setLoginAs] = useState("Student/Professor");
//   const [error, setError] = useState("");
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const navigate = useNavigate();

//   // Redirect if already logged in
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("authUser"));
//     if (storedUser) {
//       if (storedUser.role === "restaurant") navigate("/restaurant/dashboard", { replace: true });
//       else if (storedUser.role === "admin") navigate("/admin/dashboard", { replace: true });
//       else navigate("/restaurants", { replace: true });
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       let role =
//         loginAs === "Restaurant Manager"
//           ? "restaurant"
//           : loginAs === "Administrator"
//           ? "admin"
//           : "user";

//       const result = await login(email, password, role);

//       if (result?.otpRequired) {
//         toast.info("📧 OTP sent to your email.", { position: "top-center" });
//         setShowOtpModal(true);
//         return;
//       }

//       const loggedInUser = {
//         _id: result._id,
//         name: result.name,
//         email: result.email,
//         role: result.role,
//         token: result.token,
//       };

//       localStorage.setItem("authUser", JSON.stringify(loggedInUser));
//       setUser(loggedInUser);

//       toast.success("✅ Login successful!", { position: "top-center" });

//       setTimeout(() => {
//         if (loggedInUser.role === "restaurant") {
//           navigate("/restaurant/dashboard", { replace: true });
//         } else if (loggedInUser.role === "admin") {
//           navigate("/admin/dashboard", { replace: true });
//         } else {
//           navigate("/restaurants", { replace: true });
//         }
//       }, 1500);
//     } catch (err) {
//       setError(err.message || "Invalid credentials");
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-box">
//         {/* ✅ Back Button */}
//         <div className="back-btn" onClick={() => navigate("/")}>
//           ← Back
//         </div>

//         <h2 className="auth-heading">Campus Food</h2>
//         <p className="auth-subtext">Order food from campus outlets</p>

//         <div className="toggle-container">
//           <button className={`toggle-btn active`} type="button" onClick={() => navigate("/login")}>
//             Login
//           </button>
//           <button className="toggle-btn" type="button" onClick={() => navigate("/register")}>
//             Sign Up
//           </button>
//         </div>

//         <form onSubmit={handleLogin} className="auth-form">
//           <label className="auth-label">Email</label>
//           <input
//             type="email"
//             placeholder="you@university.edu"
//             className="auth-input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label className="auth-label">Password</label>
//           <input
//             type="password"
//             placeholder="••••••••"
//             className="auth-input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <label className="auth-label">Login As</label>
//           <select className="auth-select" value={loginAs} onChange={(e) => setLoginAs(e.target.value)}>
//             <option>Student/Professor</option>
//             <option>Restaurant Manager</option>
//             <option>Administrator</option>
//           </select>

//           {error && <p className="auth-error">{error}</p>}
//           <button type="submit" className="auth-btn">Login</button>
//         </form>
//       </div>

//       {/* ✅ OTP Popup Modal */}
//       {showOtpModal && (
//         <OtpModal
//           email={pendingEmail || email}
//           onClose={() => setShowOtpModal(false)}
//           onSuccess={() => {
//             toast.success("✅ Email verified successfully! Logging in...", {
//               position: "top-center",
//             });
//             setTimeout(() => navigate("/restaurants", { replace: true }), 1500);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default Login;






import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Auth.css";
import OtpModal from "../components/OtpModal";

function Login() {
  const { login, setUser, pendingEmail } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (storedUser) {
      if (storedUser.role === "restaurant")
        navigate("/restaurant/dashboard", { replace: true });
      else if (storedUser.role === "admin")
        navigate("/admin/dashboard", { replace: true });
      else navigate("/restaurants", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // No role sent → backend decides role (admin/user/restaurant)
      const result = await login(email, password);

      if (result?.otpRequired) {
        toast.info("📧 OTP sent to your email.", { position: "top-center" });
        setShowOtpModal(true);
        return;
      }

      const loggedInUser = {
        _id: result._id,
        name: result.name,
        email: result.email,
        role: result.role, // backend decided role
        token: result.token,
      };

      localStorage.setItem("authUser", JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      toast.success("✅ Login successful!", { position: "top-center" });

      setTimeout(() => {
        if (loggedInUser.role === "restaurant")
          navigate("/restaurant/dashboard", { replace: true });
        else if (loggedInUser.role === "admin")
          navigate("/admin/dashboard", { replace: true });
        else navigate("/restaurants", { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        {/* Back Button */}
        <div className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </div>

        <h2 className="auth-heading">Campus Food</h2>
        <p className="auth-subtext">Order food from campus outlets</p>

        <div className="toggle-container">
          <button className="toggle-btn active" type="button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="toggle-btn" type="button" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <label className="auth-label">Email</label>
          <input
            type="email"
            placeholder="you@university.edu"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="auth-label">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ❌ Role dropdown removed */}

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">Login</button>
        </form>
      </div>

      {/* OTP Popup Modal */}
      {showOtpModal && (
        <OtpModal
          email={pendingEmail || email}
          onClose={() => setShowOtpModal(false)}
          onSuccess={() => {
            toast.success("✅ Email verified successfully! Logging in...", {
              position: "top-center",
            });
            setTimeout(() => navigate("/restaurants", { replace: true }), 1500);
          }}
        />
      )}
    </div>
  );
}

export default Login;
