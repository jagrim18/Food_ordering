// // frontend/src/utils/api.js
// import axios from "axios";

// // ============================================================
// // 🌍 Axios Instance (Dynamic Base URL)
// // ============================================================
// // Uses environment variable if provided, otherwise defaults to localhost.
// // Example in .env:
// // REACT_APP_API_URL=https://yourserver.com/api
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
// });

// // ============================================================
// // 🧠 Request Interceptor – Automatically Attach Token
// // ============================================================
// api.interceptors.request.use(
//   (config) => {
//     try {
//       // Try all possible login types
//       const userData =
//         JSON.parse(localStorage.getItem("user")) ||
//         JSON.parse(localStorage.getItem("admin")) ||
//         JSON.parse(localStorage.getItem("restaurant"));

//       if (userData?.token) {
//         config.headers.Authorization = `Bearer ${userData.token}`;
//       }

//       // Automatically detect file uploads
//       if (config.data instanceof FormData) {
//         config.headers["Content-Type"] = "multipart/form-data";
//       } else if (!config.headers["Content-Type"]) {
//         config.headers["Content-Type"] = "application/json";
//       }
//     } catch (err) {
//       console.error("❌ Error reading token from localStorage:", err);
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ============================================================
// // 🚨 Response Interceptor – Handle Unauthorized / Token Expiry
// // ============================================================
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;

//     if (status === 401 || status === 403) {
//       console.warn("⚠️ Token expired or unauthorized — logging out...");

//       // Clear all local data safely
//       localStorage.removeItem("user");
//       localStorage.removeItem("admin");
//       localStorage.removeItem("restaurant");

//       // Optional redirect to login page
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 800);
//     }

//     // Log errors clearly during development
//     if (process.env.NODE_ENV === "development") {
//       console.error("❌ API Error:", error.response?.data || error.message);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;



import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000/api"; // always include /api

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    try {
      const userData =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("admin")) ||
        JSON.parse(localStorage.getItem("restaurant"));

      if (userData?.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }

      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    } catch (err) {
      console.error("❌ Error reading token:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      localStorage.removeItem("restaurant");

      setTimeout(() => {
        window.location.href = "/login";
      }, 800);
    }

    return Promise.reject(error);
  }
);

export default api;
