// import axios from "axios";

// const API_URL =
//   process.env.REACT_APP_API_URL ||
//   "http://localhost:5000/api"; // always include /api

// const api = axios.create({
//   baseURL: API_URL,
// });

// api.interceptors.request.use(
//   (config) => {
//     try {
//       const userData =
//         JSON.parse(localStorage.getItem("user")) ||
//         JSON.parse(localStorage.getItem("admin")) ||
//         JSON.parse(localStorage.getItem("restaurant"));

//       if (userData?.token) {
//         config.headers.Authorization = `Bearer ${userData.token}`;
//       }

//       if (config.data instanceof FormData) {
//         config.headers["Content-Type"] = "multipart/form-data";
//       } else if (!config.headers["Content-Type"]) {
//         config.headers["Content-Type"] = "application/json";
//       }
//     } catch (err) {
//       console.error("❌ Error reading token:", err);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;

//     if (status === 401 || status === 403) {
//       localStorage.removeItem("user");
//       localStorage.removeItem("admin");
//       localStorage.removeItem("restaurant");

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 800);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;




import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

/* ============================================================
   🔐 Attach token from global "authUser"
============================================================ */
api.interceptors.request.use(
  (config) => {
    try {
      const userData = JSON.parse(localStorage.getItem("authUser"));

      if (userData?.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }

      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    } catch (err) {
      console.error("Token read error:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);


/* ============================================================
   🚫 DO NOT AUTO-LOGOUT ON ANY ERROR  
   Show toast and let protected routes handle it
============================================================ */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    if (status === 401) {
      console.warn("Unauthorized → letting routes handle it.");
      // NO automatic logout
    }

    if (status === 403) {
      console.warn("Forbidden → letting routes handle it.");
      // NO automatic logout
    }

    return Promise.reject(err);
  }
);

export default api;
