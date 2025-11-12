// // import React, { useState, useContext, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";
// // import "../styles/Auth.css";

// // function Register() {
// //   const { user } = useContext(AuthContext);
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [accountType, setAccountType] = useState("Student/Professor");
// //   const [description, setDescription] = useState("");
// //   const [location, setLocation] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (user) {
// //       if (user.role === "restaurant") navigate("/restaurant/dashboard", { replace: true });
// //       else if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
// //       else navigate("/restaurants", { replace: true });
// //     }
// //   }, [user, navigate]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       let endpoint = "http://localhost:5000/api/auth/register";
// //       let body = { name, email, password };

// //       if (accountType === "Restaurant Manager") {
// //         endpoint = "http://localhost:5000/api/restaurants/register";
// //         body = { name, email, password, description, location, phone };
// //       }

// //       const res = await fetch(endpoint, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(body),
// //       });

// //       const data = await res.json();
// //       if (res.ok) {
// //         alert("Registration successful ✅");
// //         navigate("/login");
// //       } else {
// //         setError(data.message || "Registration failed.");
// //       }
// //     } catch (err) {
// //       console.error("Registration error:", err);
// //       setError("Something went wrong. Try again later.");
// //     }
// //   };

// //   return (
// //     <div className="auth-page">
// //       <div className="auth-box">
// //         <h2 className="auth-heading">Campus Food</h2>
// //         <p className="auth-subtext">Order food from campus outlets</p>

// //         {/* Toggle Tabs */}
// //         <div className="toggle-container">
// //           <button
// //             className="toggle-btn"
// //             type="button"
// //             onClick={() => navigate("/login")}
// //           >
// //             Login
// //           </button>
// //           <button
// //             className={`toggle-btn active`}
// //             type="button"
// //             onClick={() => navigate("/register")}
// //           >
// //             Sign Up
// //           </button>
// //         </div>

// //         {/* ===== Form Start ===== */}
// //         <form onSubmit={handleSubmit} className="auth-form">
// //           <label className="auth-label">Full Name</label>
// //           <input
// //             type="text"
// //             placeholder={
// //               accountType === "Restaurant Manager"
// //                 ? "e.g. SpiceHub Canteen"
// //                 : "Your full name"
// //             }
// //             className="auth-input"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             required
// //           />

// //           <label className="auth-label">Email</label>
// //           <input
// //             type="email"
// //             placeholder={
// //               accountType === "Restaurant Manager"
// //                 ? "restaurant@campus.edu"
// //                 : "student@university.edu"
// //             }
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

// //           {/* ===== Extra Fields for Restaurant Manager ===== */}
// //           {accountType === "Restaurant Manager" && (
// //             <>
// //               <label className="auth-label">Phone</label>
// //               <input
// //                 type="text"
// //                 placeholder="e.g. 9876543210"
// //                 className="auth-input"
// //                 value={phone}
// //                 onChange={(e) => setPhone(e.target.value)}
// //                 required
// //               />

// //               <label className="auth-label">Location</label>
// //               <input
// //                 type="text"
// //                 placeholder="e.g. Food Court Block A"
// //                 className="auth-input"
// //                 value={location}
// //                 onChange={(e) => setLocation(e.target.value)}
// //                 required
// //               />

// //               <label className="auth-label">Description</label>
// //               <textarea
// //                 placeholder="Describe your restaurant (optional)"
// //                 className="auth-input"
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //               />
// //             </>
// //           )}

// //           {/* ===== Account Type Dropdown moved to the end ===== */}
// //           <label className="auth-label">Account Type</label>
// //           <div className="select-wrapper">
// //             <select
// //               className="auth-select"
// //               value={accountType}
// //               onChange={(e) => setAccountType(e.target.value)}
// //               required
// //             >
// //               <option>Student/Professor</option>
// //               <option>Restaurant Manager</option>
// //             </select>
// //           </div>

// //           {/* ===== Error & Button ===== */}
// //           {error && <p className="auth-error">{error}</p>}

// //           <button type="submit" className="auth-btn">
// //             Create Account
// //           </button>
// //         </form>

// //         {/* ===== Footer ===== */}
// //         <p className="auth-footer">
// //           Already have an account?{" "}
// //           <Link to="/login" className="auth-link">
// //             Login
// //           </Link>
// //         </p>

// //         <p className="terms-footer">
// //           By continuing, you agree to our{" "}
// //           <a href="#" className="auth-link">Terms of Service</a> and{" "}
// //           <a href="#" className="auth-link">Privacy Policy</a>.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Register;




// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/Auth.css";

// function Register() {
//   const { registerUser, user } = useContext(AuthContext);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [accountType, setAccountType] = useState("Student/Professor");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       if (user.role === "restaurant") navigate("/restaurant/dashboard", { replace: true });
//       else if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
//       else navigate("/restaurants", { replace: true });
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       let role = accountType === "Restaurant Manager" ? "restaurant" : "user";

//       const result = await registerUser(name, email, password, role);

//       // 🧩 If OTP is required
//       if (result?.otpRequired) {
//         alert("📩 OTP sent to your email. Please verify your account.");
//         navigate("/verify-otp");
//         return;
//       }

//       // ✅ Fallback: If OTP not required (already verified or admin)
//       alert("Registration successful ✅");
//       navigate("/login");
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError(err.message || "Something went wrong. Try again later.");
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-box">
//         <h2 className="auth-heading">Campus Food</h2>
//         <p className="auth-subtext">Order food from campus outlets</p>

//         {/* Toggle Tabs */}
//         <div className="toggle-container">
//           <button
//             className="toggle-btn"
//             type="button"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </button>
//           <button
//             className={`toggle-btn active`}
//             type="button"
//             onClick={() => navigate("/register")}
//           >
//             Sign Up
//           </button>
//         </div>

//         {/* ===== Form Start ===== */}
//         <form onSubmit={handleSubmit} className="auth-form">
//           <label className="auth-label">Full Name</label>
//           <input
//             type="text"
//             placeholder={
//               accountType === "Restaurant Manager"
//                 ? "e.g. SpiceHub Canteen"
//                 : "Your full name"
//             }
//             className="auth-input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           <label className="auth-label">Email</label>
//           <input
//             type="email"
//             placeholder={
//               accountType === "Restaurant Manager"
//                 ? "restaurant@campus.edu"
//                 : "student@university.edu"
//             }
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

//           {/* ===== Extra Fields for Restaurant Manager ===== */}
//           {accountType === "Restaurant Manager" && (
//             <>
//               <label className="auth-label">Phone</label>
//               <input
//                 type="text"
//                 placeholder="e.g. 9876543210"
//                 className="auth-input"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />

//               <label className="auth-label">Location</label>
//               <input
//                 type="text"
//                 placeholder="e.g. Food Court Block A"
//                 className="auth-input"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 required
//               />

//               <label className="auth-label">Description</label>
//               <textarea
//                 placeholder="Describe your restaurant (optional)"
//                 className="auth-input"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </>
//           )}

//           <label className="auth-label">Account Type</label>
//           <div className="select-wrapper">
//             <select
//               className="auth-select"
//               value={accountType}
//               onChange={(e) => setAccountType(e.target.value)}
//               required
//             >
//               <option>Student/Professor</option>
//               <option>Restaurant Manager</option>
//             </select>
//           </div>

//           {error && <p className="auth-error">{error}</p>}

//           <button type="submit" className="auth-btn">
//             Create Account
//           </button>
//         </form>

//         <p className="auth-footer">
//           Already have an account?{" "}
//           <Link to="/login" className="auth-link">
//             Login
//           </Link>
//         </p>

//         <p className="terms-footer">
//           By continuing, you agree to our{" "}
//           <a href="#" className="auth-link">Terms of Service</a> and{" "}
//           <a href="#" className="auth-link">Privacy Policy</a>.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;





import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";
import OtpModal from "../components/OtpModal"; // ✅ NEW

function Register() {
  const { registerUser, user, pendingEmail } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Student/Professor");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false); // ✅ NEW
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "restaurant") navigate("/restaurant/dashboard", { replace: true });
      else if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
      else navigate("/restaurants", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let role = accountType === "Restaurant Manager" ? "restaurant" : "user";
      const result = await registerUser(name, email, password, role);

      if (result?.otpRequired) {
        setShowOtpModal(true); // ✅ OPEN POPUP INSTEAD OF NAVIGATE
        return;
      }

      alert("Registration successful ✅");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2 className="auth-heading">Campus Food</h2>
        <p className="auth-subtext">Order food from campus outlets</p>

        <div className="toggle-container">
          <button className="toggle-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="toggle-btn active" onClick={() => navigate("/register")}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">Full Name</label>
          <input type="text" placeholder="Your full name" className="auth-input" value={name}
            onChange={(e) => setName(e.target.value)} required />

          <label className="auth-label">Email</label>
          <input type="email" placeholder="you@university.edu" className="auth-input" value={email}
            onChange={(e) => setEmail(e.target.value)} required />

          <label className="auth-label">Password</label>
          <input type="password" placeholder="••••••••" className="auth-input" value={password}
            onChange={(e) => setPassword(e.target.value)} required />

          {accountType === "Restaurant Manager" && (
            <>
              <label className="auth-label">Phone</label>
              <input type="text" placeholder="9876543210" className="auth-input" value={phone}
                onChange={(e) => setPhone(e.target.value)} required />
              <label className="auth-label">Location</label>
              <input type="text" placeholder="Food Court Block A" className="auth-input" value={location}
                onChange={(e) => setLocation(e.target.value)} required />
              <label className="auth-label">Description</label>
              <textarea placeholder="Describe your restaurant" className="auth-input"
                value={description} onChange={(e) => setDescription(e.target.value)} />
            </>
          )}

          <label className="auth-label">Account Type</label>
          <select className="auth-select" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option>Student/Professor</option>
            <option>Restaurant Manager</option>
          </select>

          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn">Create Account</button>
        </form>
      </div>

      {/* ✅ OTP Modal */}
      {showOtpModal && (
        <OtpModal
          email={pendingEmail || email}
          onClose={() => setShowOtpModal(false)}
          onSuccess={() => {
            alert("✅ Email verified successfully!");
            navigate("/login");
          }}
        />
      )}
    </div>
  );
}

export default Register;
