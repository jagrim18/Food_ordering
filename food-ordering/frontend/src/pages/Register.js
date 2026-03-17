// // import React, { useState, useContext, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";
// // import "../styles/Auth.css";
// // import OtpModal from "../components/OtpModal";

// // function Register() {
// //   const { registerUser, user, pendingEmail } = useContext(AuthContext);
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [accountType, setAccountType] = useState("Student/Professor");
// //   const [description, setDescription] = useState("");
// //   const [location, setLocation] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [error, setError] = useState("");
// //   const [showOtpModal, setShowOtpModal] = useState(false);
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
// //       let role = accountType === "Restaurant Manager" ? "restaurant" : "user";
// //       const result = await registerUser(name, email, password, role);

// //       if (result?.otpRequired) {
// //         setShowOtpModal(true);
// //         return;
// //       }

// //       alert("Registration successful ✅");
// //       navigate("/login");
// //     } catch (err) {
// //       setError(err.message || "Something went wrong.");
// //     }
// //   };

// //   return (
// //     <div className="auth-page">
// //       <div className="auth-box">
// //         {/* ✅ Back Button */}
// //         <div className="back-btn" onClick={() => navigate("/")}>
// //           ← Back
// //         </div>

// //         <h2 className="auth-heading">Campus Food</h2>
// //         <p className="auth-subtext">Order food from campus outlets</p>

// //         <div className="toggle-container">
// //           <button className="toggle-btn" onClick={() => navigate("/login")}>Login</button>
// //           <button className="toggle-btn active" onClick={() => navigate("/register")}>Sign Up</button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="auth-form">
// //           <label className="auth-label">Full Name</label>
// //           <input type="text" placeholder="Your full name" className="auth-input" value={name}
// //             onChange={(e) => setName(e.target.value)} required />

// //           <label className="auth-label">Email</label>
// //           <input type="email" placeholder="you@university.edu" className="auth-input" value={email}
// //             onChange={(e) => setEmail(e.target.value)} required />

// //           <label className="auth-label">Password</label>
// //           <input type="password" placeholder="••••••••" className="auth-input" value={password}
// //             onChange={(e) => setPassword(e.target.value)} required />

// //           {accountType === "Restaurant Manager" && (
// //             <>
// //               <label className="auth-label">Phone</label>
// //               <input type="text" placeholder="9876543210" className="auth-input" value={phone}
// //                 onChange={(e) => setPhone(e.target.value)} required />
// //               <label className="auth-label">Location</label>
// //               <input type="text" placeholder="Food Court Block A" className="auth-input" value={location}
// //                 onChange={(e) => setLocation(e.target.value)} required />
// //               <label className="auth-label">Description</label>
// //               <textarea placeholder="Describe your restaurant" className="auth-input"
// //                 value={description} onChange={(e) => setDescription(e.target.value)} />
// //             </>
// //           )}

// //           <label className="auth-label">Account Type</label>
// //           <select className="auth-select" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
// //             <option>Student/Professor</option>
// //             <option>Restaurant Manager</option>
// //           </select>

// //           {error && <p className="auth-error">{error}</p>}
// //           <button type="submit" className="auth-btn">Create Account</button>
// //         </form>
// //       </div>

// //       {/* ✅ OTP Modal */}
// //       {showOtpModal && (
// //         <OtpModal
// //           email={pendingEmail || email}
// //           onClose={() => setShowOtpModal(false)}
// //           onSuccess={() => {
// //             alert("✅ Email verified successfully!");
// //             navigate("/login");
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // export default Register;


// import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/Auth.css";
// import OtpModal from "../components/OtpModal";

// function Register() {
//   const { registerUser, user, pendingEmail } = useContext(AuthContext);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [accountType, setAccountType] = useState("Student/Professor");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [showOtpModal, setShowOtpModal] = useState(false);
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

//       if (result?.otpRequired) {
//         setShowOtpModal(true);
//         return;
//       }

//       alert("Registration successful ✅");
//       navigate("/login");
//     } catch (err) {
//       setError(err.message || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-box">
//         {/* Back Button */}
//         <div className="back-btn" onClick={() => navigate("/")}>
//           ← Back
//         </div>

//         <h2 className="auth-heading">Campus Food</h2>
//         <p className="auth-subtext">Order food from campus outlets</p>

//         <div className="toggle-container">
//           <button className="toggle-btn" onClick={() => navigate("/login")}>Login</button>
//           <button className="toggle-btn active" onClick={() => navigate("/register")}>Sign Up</button>
//         </div>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <label className="auth-label">Full Name</label>
//           <input
//             type="text"
//             placeholder="Your full name"
//             className="auth-input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

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

//           {accountType === "Restaurant Manager" && (
//             <>
//               <label className="auth-label">Phone</label>
//               <input
//                 type="text"
//                 placeholder="9876543210"
//                 className="auth-input"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />

//               <label className="auth-label">Location</label>
//               <input
//                 type="text"
//                 placeholder="Food Court Block A"
//                 className="auth-input"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 required
//               />

//               <label className="auth-label">Description</label>
//               <textarea
//                 placeholder="Describe your restaurant"
//                 className="auth-input"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </>
//           )}

//           <label className="auth-label">Account Type</label>
//           <select
//             className="auth-select"
//             value={accountType}
//             onChange={(e) => setAccountType(e.target.value)}
//           >
//             <option>Student/Professor</option>
//             <option>Restaurant Manager</option>
//           </select>

//           {error && <p className="auth-error">{error}</p>}

//           <button type="submit" className="auth-btn">Create Account</button>
//         </form>
//       </div>

//       {/* OTP Modal */}
//       {showOtpModal && (
//         <OtpModal
//           email={pendingEmail || email}
//           onClose={() => setShowOtpModal(false)}
//           onSuccess={() => {
//             alert("✅ Email verified successfully!");
//             navigate("/login");
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default Register;


import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";
import OtpModal from "../components/OtpModal";

function Register() {
  const { registerUser, user, pendingEmail, setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Student/Professor");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "restaurant") {
        navigate("/restaurant/dashboard", { replace: true });
      } else if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/restaurants", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const role = accountType === "Restaurant Manager" ? "restaurant" : "user";

      const result = await registerUser(name, email, password, role);

      // 🔥 OTP Required → show OTP modal
      if (result?.otpRequired) {
        setShowOtpModal(true);
        return;
      }

      // 🔥 No OTP → Auto Login Immediately
      if (result?.user) {
        setUser(result.user);

        alert("Registration successful! Logging you in...");

        if (result.user.role === "restaurant") {
          navigate("/restaurant/dashboard", { replace: true });
        } else {
          navigate("/restaurants", { replace: true });
        }
        return;
      }

    } catch (err) {
      setError(err.message || "Something went wrong.");
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
          <button className="toggle-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="toggle-btn active" onClick={() => navigate("/register")}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">Full Name</label>
          <input
            type="text"
            placeholder="Your full name"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          {accountType === "Restaurant Manager" && (
            <>
              <label className="auth-label">Phone</label>
              <input
                type="text"
                placeholder="9876543210"
                className="auth-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label className="auth-label">Description</label>
              <textarea
                placeholder="Describe your restaurant"
                className="auth-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </>
          )}

          <label className="auth-label">Account Type</label>
          <select
            className="auth-select"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option>Student/Professor</option>
            <option>Restaurant Manager</option>
          </select>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">Create Account</button>
        </form>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <OtpModal
          email={pendingEmail || email}
          onClose={() => setShowOtpModal(false)}
          onSuccess={() => {
            alert("✅ Email verified successfully!");
            // navigate("/login");
          }}
        />
      )}
    </div>
  );
}

export default Register;
