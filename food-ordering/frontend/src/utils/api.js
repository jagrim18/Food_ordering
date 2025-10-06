import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ backend base URL
});

// ✅ Attach token automatically for every request
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    const restaurant = localStorage.getItem("restaurant");

    let token = null;

    if (user) {
      token = JSON.parse(user).token;
    } else if (admin) {
      token = JSON.parse(admin).token;
    } else if (restaurant) {
      token = JSON.parse(restaurant).token;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
