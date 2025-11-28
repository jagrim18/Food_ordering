// src/utils/api.js
import axios from "axios";

/* ============================================================
   🌐 BASE URL — FINAL, FIXED, ALWAYS CORRECT
   Your backend uses:  /api/auth/login
   So baseURL must be:  http://localhost:5000/api
============================================================ */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false,
});

/* ============================================================
   🔐 REQUEST INTERCEPTOR — Attach Token
============================================================ */
api.interceptors.request.use(
  (config) => {
    const rawUser = localStorage.getItem("authUser");

    if (rawUser) {
      try {
        const userData = JSON.parse(rawUser);
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        }
      } catch (err) {
        console.error("Token parse error:", err);
      }
    }

    // Handle form-data
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================================================
   🚫 RESPONSE INTERCEPTOR — No auto logout
============================================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Just print the error; do NOT logout
    if (status === 401) {
      console.warn("401 Unauthorized → letting routes handle it");
    }
    if (status === 403) {
      console.warn("403 Forbidden → letting routes handle it");
    }

    return Promise.reject(error);
  }
);
// 🆕 Fetch categories
export const fetchCategories = (restaurantId) =>
  api.get(`/categories/${restaurantId}`);

// 🆕 Add new category
export const createCategory = (restaurantId, name) =>
  api.post(`/categories`, { restaurantId, name });


export default api;
