// import { createContext, useState, useEffect } from "react";
// import api from "../utils/api";

// export const AuthContext = createContext();

// // ✅ Safe JSON.parse
// const safeJSONParse = (value) => {
//   try {
//     if (!value || value === "undefined") return null;
//     return JSON.parse(value);
//   } catch {
//     return null;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const storedAdmin = safeJSONParse(localStorage.getItem("admin"));
//     const storedRestaurant = safeJSONParse(localStorage.getItem("restaurant"));
//     const storedUser = safeJSONParse(localStorage.getItem("user"));
//     return storedAdmin || storedRestaurant || storedUser || null;
//   });

//   const [pendingEmail, setPendingEmail] = useState(null); // 🧩 store email awaiting OTP verification
//   const [pendingRole, setPendingRole] = useState("user"); // role for verification (user/restaurant)

//   /* ============================================================
//      🧠 Sync role-based storage
//   ============================================================ */
//   useEffect(() => {
//     if (!user) {
//       localStorage.removeItem("admin");
//       localStorage.removeItem("restaurant");
//       localStorage.removeItem("user");
//       return;
//     }

//     if (user.role === "admin") {
//       localStorage.setItem("admin", JSON.stringify(user));
//       localStorage.removeItem("restaurant");
//       localStorage.removeItem("user");
//     } else if (user.role === "restaurant") {
//       localStorage.setItem("restaurant", JSON.stringify(user));
//       localStorage.removeItem("admin");
//       localStorage.removeItem("user");
//     } else {
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.removeItem("restaurant");
//       localStorage.removeItem("admin");
//     }
//   }, [user]);

//   /* ============================================================
//      🔐 LOGIN (Role-based protection + OTP flow)
//   ============================================================ */
//   const login = async (email, password, role = "user") => {
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       const data = res.data;

//       // 🧩 If backend says "OTP sent", handle verification step
//       if (data.message?.includes("OTP sent")) {
//         setPendingEmail(data.email);
//         setPendingRole(role);
//         return { otpRequired: true, email: data.email };
//       }

//       // 🚫 Prevent cross-login attempts
//       if (role === "restaurant" && data.role !== "restaurant") {
//         throw new Error("You must log in through the Restaurant Portal.");
//       }
//       if (role === "user" && data.role !== "user" && data.role !== "admin") {
//         throw new Error("Please use the Restaurant Login page.");
//       }
//       if (role === "admin" && data.role !== "admin") {
//         throw new Error("Unauthorized access — Admins only.");
//       }

//       setUser(data);
//       return data;
//     } catch (err) {
//       console.error("Login error:", err);
//       throw new Error(err.response?.data?.message || err.message || "Login failed");
//     }
//   };

//   /* ============================================================
//      🧾 REGISTER (Normal user or restaurant with OTP flow)
//   ============================================================ */
//   const registerUser = async (name, email, password, role = "user") => {
//     try {
//       const endpoint =
//         role === "restaurant" ? "/auth/register-restaurant" : "/auth/register";
//       const res = await api.post(endpoint, { name, email, password });
//       const data = res.data;

//       // 🧩 Expecting OTP verification
//       if (data.message?.includes("OTP")) {
//         setPendingEmail(email);
//         setPendingRole(role);
//         return { otpRequired: true, email };
//       }

//       setUser({ ...data, role });
//       return data;
//     } catch (err) {
//       console.error("Register error:", err.message);
//       throw err;
//     }
//   };

//   /* ============================================================
//      🧠 VERIFY OTP (for both user and restaurant)
//   ============================================================ */
//   const verifyOTP = async (otp) => {
//     if (!pendingEmail) throw new Error("No pending email for verification.");

//     try {
//       const res = await api.post("/auth/verify-otp", {
//         email: pendingEmail,
//         otp,
//         role: pendingRole,
//       });

//       const { user, token } = res.data;

//       if (!user || !token) throw new Error("Invalid server response");

//       const userData = { ...user, token };
//       setUser(userData);

//       // Clear pending state
//       setPendingEmail(null);
//       setPendingRole("user");

//       return userData;
//     } catch (err) {
//       console.error("OTP verification error:", err);
//       throw new Error(err.response?.data?.message || "Invalid or expired OTP");
//     }
//   };

//   /* ============================================================
//      🔁 RESEND OTP (2-minute cooldown handled by backend)
//   ============================================================ */
//   const resendOTP = async () => {
//     if (!pendingEmail) throw new Error("No pending email for resend.");

//     try {
//       const res = await api.post("/auth/resend-otp", { email: pendingEmail });
//       return res.data;
//     } catch (err) {
//       console.error("Resend OTP error:", err);
//       throw new Error(err.response?.data?.message || "Failed to resend OTP");
//     }
//   };

//   /* ============================================================
//      🚪 LOGOUT (Clears everything)
//   ============================================================ */
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("admin");
//     localStorage.removeItem("restaurant");
//     localStorage.removeItem("user");
//   };

//   /* ============================================================
//      🌍 PROVIDER VALUE (shared globally)
//   ============================================================ */
//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         login,
//         logout,
//         registerUser,
//         verifyOTP,
//         resendOTP, // ✅ newly added
//         pendingEmail,
//         pendingRole,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

// ✅ Safe JSON.parse helper
const safeJSONParse = (value) => {
  try {
    if (!value || value === "undefined") return null;
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedAdmin = safeJSONParse(localStorage.getItem("admin"));
    const storedRestaurant = safeJSONParse(localStorage.getItem("restaurant"));
    const storedUser = safeJSONParse(localStorage.getItem("user"));
    return storedAdmin || storedRestaurant || storedUser || null;
  });

  const [pendingEmail, setPendingEmail] = useState(null); // 🧩 Email waiting for OTP
  const [pendingRole, setPendingRole] = useState("user"); // Role type (user/restaurant)

  /* ============================================================
     🧠 Auto-sync user role with localStorage
  ============================================================ */
  useEffect(() => {
    if (!user) {
      localStorage.removeItem("admin");
      localStorage.removeItem("restaurant");
      localStorage.removeItem("user");
      return;
    }

    if (user.role === "admin") {
      localStorage.setItem("admin", JSON.stringify(user));
      localStorage.removeItem("restaurant");
      localStorage.removeItem("user");
    } else if (user.role === "restaurant") {
      localStorage.setItem("restaurant", JSON.stringify(user));
      localStorage.removeItem("admin");
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("restaurant");
      localStorage.removeItem("admin");
    }
  }, [user]);

  /* ============================================================
     🔐 LOGIN — Handles OTP flow automatically
  ============================================================ */
  const login = async (email, password, role = "user") => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const data = res.data;

      // 🧩 If OTP required — show modal
      if (data.message?.includes("OTP sent")) {
        setPendingEmail(data.email);
        setPendingRole(role);
        return { otpRequired: true, email: data.email };
      }

      // 🚫 Prevent wrong role login
      if (role === "restaurant" && data.role !== "restaurant") {
        throw new Error("You must log in through the Restaurant Portal.");
      }
      if (role === "user" && data.role !== "user" && data.role !== "admin") {
        throw new Error("Please use the Restaurant Login page.");
      }
      if (role === "admin" && data.role !== "admin") {
        throw new Error("Unauthorized access — Admins only.");
      }

      setUser(data);
      return data;
    } catch (err) {
      console.error("Login error:", err);
      throw new Error(
        err.response?.data?.message || err.message || "Login failed"
      );
    }
  };

  /* ============================================================
     🧾 REGISTER — Sends OTP (User or Restaurant)
  ============================================================ */
  const registerUser = async (name, email, password, role = "user") => {
    try {
      const endpoint =
        role === "restaurant" ? "/auth/register-restaurant" : "/auth/register";
      const res = await api.post(endpoint, { name, email, password });
      const data = res.data;

      // 🧩 OTP step triggered
      if (data.message?.includes("OTP")) {
        setPendingEmail(email);
        setPendingRole(role);
        return { otpRequired: true, email };
      }

      setUser({ ...data, role });
      return data;
    } catch (err) {
      console.error("Register error:", err.message);
      throw err;
    }
  };

  /* ============================================================
     ✅ VERIFY OTP — Universal for User/Restaurant
  ============================================================ */
  const verifyOTP = async (otp) => {
    if (!pendingEmail) throw new Error("No pending email for verification.");

    try {
      const res = await api.post("/auth/verify-otp", {
        email: pendingEmail,
        otp,
      });

      const { user, token } = res.data;

      if (!user || !token) throw new Error("Invalid server response");

      const userData = { ...user, token };
      setUser(userData);

      // 🧹 Clear pending states
      setPendingEmail(null);
      setPendingRole("user");

      return userData;
    } catch (err) {
      console.error("OTP verification error:", err);
      throw new Error(err.response?.data?.message || "Invalid or expired OTP");
    }
  };

  /* ============================================================
     🔁 RESEND OTP — 2 minute backend cooldown
  ============================================================ */
  const resendOTP = async () => {
    if (!pendingEmail) throw new Error("No pending email for resend.");

    try {
      const res = await api.post("/auth/resend-otp", { email: pendingEmail });
      return res.data;
    } catch (err) {
      console.error("Resend OTP error:", err);
      throw new Error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  /* ============================================================
     🚪 LOGOUT — Clears all roles and localStorage
  ============================================================ */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("restaurant");
    localStorage.removeItem("user");
  };

  /* ============================================================
     🌍 EXPORT CONTEXT VALUE
  ============================================================ */
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        registerUser,
        verifyOTP,
        resendOTP,
        pendingEmail,
        pendingRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
