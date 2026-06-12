import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🌐 BASE URL — DYNAMIC RESOLUTION FOR EXPO GO PHYSICAL DEVICES
// If the backend runs on localhost:5000, physical devices cannot access it.
// We extract the development machine's IP address from Metro's bundler address dynamically.
export const getBaseURL = () => {
  const defaultURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';
  
  // If we are not in development or hostUri is unavailable, use the default URL
  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri; // e.g., "192.168.0.102:8081"
    if (hostUri) {
      const hostIp = hostUri.split(':')[0];
      return defaultURL.replace('localhost', hostIp).replace('127.0.0.1', hostIp);
    }
  }
  
  return defaultURL;
};

const client = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

/* ============================================================
   🔐 REQUEST INTERCEPTOR — Attach JWT Token from AsyncStorage
   ============================================================ */
client.interceptors.request.use(
  async (config) => {
    try {
      const rawUser = await AsyncStorage.getItem('authUser');
      if (rawUser) {
        const userData = JSON.parse(rawUser);
        if (userData?.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        }
      }
    } catch (err) {
      console.error('API Client Interceptor Error:', err);
    }

    // Handle form-data headers
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================================================
   🚫 RESPONSE INTERCEPTOR — Log issues without forcing logout
   ============================================================ */
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.warn('401 Unauthorized → Handled by UI/routing layers');
    }
    if (status === 403) {
      console.warn('403 Forbidden → Handled by UI/routing layers');
    }
    return Promise.reject(error);
  }
);

export default client;
