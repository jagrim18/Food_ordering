// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/Auth.css";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();
//       if (res.ok) navigate("/login");
//       else setError(data.message || "Registration failed.");
//     } catch (err) {
//       setError("Something went wrong. Try again later.");
//     }
//   };

//   return (
//     <div className="auth-page register-bg">
//       <div className="overlay"></div>
//       <div className="auth-box">
//         <h2 className="auth-heading">Create Account 🍔</h2>
//         <p className="auth-subtext">Join Foodify and start exploring delicious meals</p>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="auth-input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="auth-input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="auth-input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {error && <p className="auth-error">{error}</p>}
//           <button type="submit" className="auth-btn">
//             Register
//           </button>
//         </form>

//         <p className="auth-footer">
//           Already have an account?{" "}
//           <Link to="/login" className="auth-link">Login</Link>
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

function Register() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🚫 Redirect logged-in users (especially restaurant/admin)
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
      // 🚫 Prevent restaurant-like email patterns from registering as normal users
      if (email.toLowerCase().includes("restaurant") || email.toLowerCase().includes("admin")) {
        setError("Please use the Restaurant or Admin portal to register.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful ✅");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="auth-page register-bg">
      <div className="overlay"></div>
      <div className="auth-box">
        <h2 className="auth-heading">Create Account 🍔</h2>
        <p className="auth-subtext">
          Join Foodify and start exploring delicious meals
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Full Name"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
