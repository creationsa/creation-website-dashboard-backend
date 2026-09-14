import axios from "axios";
import { authStorage } from "../storage/authStorage";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ── Request interceptor ───────────────────────────────────────────────────────
instance.interceptors.request.use((config) => {
  const token = authStorage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Accept-Language"] =
    localStorage.getItem("i18nextLng") || "en";

  return config;
});
// ── Response interceptor ──────────────────────────────────────────────────────
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStorage.removeToken();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default instance;
