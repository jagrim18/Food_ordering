// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

// ✅ Safe JSON.parse to avoid "undefined is not valid JSON"
const safeJSONParse = (value) => {
  try {
    if (!value || value === "undefined") return null;
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  // ✅ Load from localStorage safely
  const [user, setUser] = useState(() => {
    const storedUser = safeJSONParse(localStorage.getItem("user"));
    const storedRestaurant = safeJSONParse(localStorage.getItem("restaurant"));
    const storedAdmin = safeJSONParse(localStorage.getItem("admin"));

    if (storedAdmin) return storedAdmin;
    if (storedRestaurant) return storedRestaurant;
    if (storedUser) return storedUser;
    return null;
  });

  // ✅ Sync localStorage whenever user changes
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(user));
        localStorage.removeItem("user");
        localStorage.removeItem("restaurant");
      } else if (user.role === "restaurant") {
        localStorage.setItem("restaurant", JSON.stringify(user));
        localStorage.removeItem("user");
        localStorage.removeItem("admin");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.removeItem("admin");
        localStorage.removeItem("restaurant");
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("restaurant");
      localStorage.removeItem("admin");
    }
  }, [user]);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const userData = res.data;
      setUser(userData);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        throw new Error("Invalid email or password");
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }
  };

  // ✅ Register
  const registerUser = async (name, email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err.message);
      throw new Error(err.message || "Something went wrong. Please try again.");
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("restaurant");
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
