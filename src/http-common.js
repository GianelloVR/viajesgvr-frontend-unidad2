import axios from "axios";
import keycloak from "./services/keycloak";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  async (config) => {
    if (keycloak.authenticated) {
      try {
        await keycloak.updateToken(30);
        config.headers.Authorization = `Bearer ${keycloak.token}`;
      } catch (error) {
        console.error("Error updating Keycloak token:", error);
        keycloak.login();
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default http;