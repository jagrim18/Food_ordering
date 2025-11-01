// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: "http://localhost:5000/api", // ✅ backend base URL
// // });

// // // ✅ Attach token automatically for every request
// // api.interceptors.request.use(
// //   (config) => {
// //     const user = localStorage.getItem("user");
// //     const admin = localStorage.getItem("admin");
// //     const restaurant = localStorage.getItem("restaurant");

// //     let token = null;

// //     if (user) {
// //       token = JSON.parse(user).token;
// //     } else if (admin) {
// //       token = JSON.parse(admin).token;
// //     } else if (restaurant) {
// //       token = JSON.parse(restaurant).token;
// //     }

// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // export default api;














// // // frontend/src/utils/api.js
// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: "http://localhost:5000/api", // ✅ Change if backend runs on another port
// // });

// // // ✅ Automatically attach token (user / admin / restaurant)
// // api.interceptors.request.use(
// //   (config) => {
// //     let token = null;

// //     try {
// //       const user = localStorage.getItem("user");
// //       const admin = localStorage.getItem("admin");
// //       const restaurant = localStorage.getItem("restaurant");

// //       if (user) {
// //         token = JSON.parse(user)?.token;
// //       } else if (admin) {
// //         token = JSON.parse(admin)?.token;
// //       } else if (restaurant) {
// //         token = JSON.parse(restaurant)?.token;
// //       }
// //     } catch (err) {
// //       console.error("Error parsing token from localStorage:", err);
// //     }

// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // export default api;












// // frontend/src/utils/api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // ✅ Change this if backend runs elsewhere
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Automatically attach token (user / admin / restaurant)
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
//     } catch (err) {
//       console.error("❌ Error reading token from localStorage:", err);
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Handle token expiry globally (optional, advanced UX)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (
//       error.response &&
//       (error.response.status === 401 || error.response.status === 403)
//     ) {
//       console.warn("⚠️ Token expired or unauthorized — logging out...");
//       localStorage.removeItem("user");
//       localStorage.removeItem("admin");
//       localStorage.removeItem("restaurant");
//       window.location.href = "/login"; // redirect safely
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;










// frontend/src/utils/api.js
import axios from "axios";

// ============================================================
// 🌍 Axios Instance (Base URL)
// ============================================================
// Make sure your backend runs on the same port or update this URL.
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ============================================================
// 🧠 Request Interceptor – Automatically Attach Token
// ============================================================
api.interceptors.request.use(
  (config) => {
    try {
      // Try all possible login types
      const userData =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("admin")) ||
        JSON.parse(localStorage.getItem("restaurant"));

      if (userData?.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }

      // ⚙️ Automatically detect if uploading files (FormData)
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
    } catch (err) {
      console.error("❌ Error reading token from localStorage:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// 🚨 Response Interceptor – Handle Token Expiry / Unauthorized
// ============================================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.warn("⚠️ Token expired or unauthorized — logging out...");

      // Clear all local data safely
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      localStorage.removeItem("restaurant");

      // Optional delay before redirect
      setTimeout(() => {
        window.location.href = "/login";
      }, 800);
    }

    // Log error in dev mode
    if (process.env.NODE_ENV === "development") {
      console.error("❌ API Error:", error.response?.data || error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
