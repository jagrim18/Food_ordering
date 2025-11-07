// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/Auth.css";

// function Login() {
//   const { login, user } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // 🚫 If restaurant or admin is already logged in, redirect them properly
//   useEffect(() => {
//     if (user) {
//       if (user.role === "restaurant") navigate("/restaurant/dashboard", { replace: true });
//       else if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
//     }
//   }, [user, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await login(email, password);
//       const storedUser = JSON.parse(localStorage.getItem("user"));

//       // 🚫 Restrict restaurant/admin from logging in via user page
//       if (storedUser?.role === "restaurant") {
//         setError("Please use the Restaurant Login page to access your dashboard.");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         return;
//       }
//       if (storedUser?.role === "admin") {
//         setError("Admins must log in through the Admin portal.");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         return;
//       }

//       // ✅ Normal user continues as usual
//       navigate("/restaurants");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   return (
//     <div className="auth-page login-bg">
//       <div className="overlay"></div>
//       <div className="auth-box">
//         <h2 className="auth-heading">Welcome Back 👋</h2>
//         <p className="auth-subtext">Sign in to continue ordering your favorites</p>

//         <form onSubmit={handleLogin} className="auth-form">
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
//             Sign In
//           </button>
//         </form>

//         <p className="auth-footer">
//           Don’t have an account?{" "}
//           <Link to="/register" className="auth-link">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;







import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";

function Login() {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "restaurant") navigate("/restaurant/dashboard", { replace: true });
      else if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser?.role === "restaurant") {
        setError("Please use the Restaurant Login page to access your dashboard.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return;
      }
      if (storedUser?.role === "admin") {
        setError("Admins must log in through the Admin portal.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return;
      }

      navigate("/restaurants");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2 className="auth-heading">Campus Food</h2>
        <p className="auth-subtext">Order food from campus outlets</p>

        {/* Toggle Tabs */}
        <div className="toggle-container">
          <button
            className={`toggle-btn active`}
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="toggle-btn"
            type="button"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="auth-form">
          <label className="auth-label">Email</label>
          <input
            type="email"
            placeholder="student@university.edu"
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

          <label className="auth-label">Login As</label>
          <select className="auth-select" defaultValue="Student/Professor">
            <option>Student/Professor</option>
          </select>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="forgot-link">
          <a href="#" className="auth-link">Forgot password?</a>
        </p>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/register" className="auth-link">
            Sign Up
          </Link>
        </p>

        <p className="terms-footer">
          By continuing, you agree to our{" "}
          <a href="#" className="auth-link">Terms of Service</a> and{" "}
          <a href="#" className="auth-link">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default Login;
