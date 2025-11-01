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

//   // ✅ Sync user data to localStorage based on role
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

//   // ✅ Unified login for all roles
//   const login = async (email, password, role = "user") => {
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       const userData = { ...res.data };
//       setUser(userData);
//       return userData;
//     } catch (err) {
//       console.error("Login error:", err);
//       throw new Error(err.response?.data?.message || "Login failed");
//     }
//   };

//   // ✅ Register a normal user
//   const registerUser = async (name, email, password) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Registration failed");
//       setUser({ ...data, role: "user" });
//     } catch (err) {
//       console.error("Register error:", err.message);
//       throw err;
//     }
//   };

//   // ✅ Logout clears all storage
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("admin");
//     localStorage.removeItem("restaurant");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, logout, registerUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };








import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

// ✅ Safe JSON.parse
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

  /* ============================================================
     🧠 Sync role-based storage
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
     🔐 LOGIN (Role-based protection)
  ============================================================ */
  const login = async (email, password, role = "user") => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const userData = res.data;

      // 🚫 Prevent cross-login attempts
      if (role === "restaurant" && userData.role !== "restaurant") {
        throw new Error("You must log in through the Restaurant Portal.");
      }
      if (role === "user" && userData.role !== "user" && userData.role !== "admin") {
        throw new Error("Please use the Restaurant Login page.");
      }
      if (role === "admin" && userData.role !== "admin") {
        throw new Error("Unauthorized access — Admins only.");
      }

      setUser(userData);
      return userData;
    } catch (err) {
      console.error("Login error:", err);
      throw new Error(err.response?.data?.message || err.message || "Login failed");
    }
  };

  /* ============================================================
     🧾 REGISTER (Normal user only)
  ============================================================ */
  const registerUser = async (name, email, password) => {
    try {
      // 🚫 Prevent misuse by checking for restricted words
      if (
        email.toLowerCase().includes("restaurant") ||
        email.toLowerCase().includes("admin")
      ) {
        throw new Error("Please register from the Restaurant or Admin portal.");
      }

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setUser({ ...data, role: "user" });
    } catch (err) {
      console.error("Register error:", err.message);
      throw err;
    }
  };

  /* ============================================================
     🚪 LOGOUT (Clears everything)
  ============================================================ */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("restaurant");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
