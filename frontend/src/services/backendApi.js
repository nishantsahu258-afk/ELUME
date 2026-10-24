import axios from "axios";

/**
 * Backend API Client for ELUME
 * Uses withCredentials: true so that the browser automatically attaches
 * and stores the HttpOnly session cookie ('token') on cross-origin requests.
 *
 * NOTE: DummyJSON product API uses a separate client in `api.js`
 * so existing product browsing remains completely untouched.
 */
const backendApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default backendApi;
