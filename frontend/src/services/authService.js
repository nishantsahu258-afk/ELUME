import backendApi from "./backendApi";

/**
 * Authentication service communicating with the Node.js/Express backend.
 * All requests automatically carry the HttpOnly cookie via `withCredentials: true`.
 */
export const authService = {
  /**
   * Register a new user
   */
  async register(name, email, password) {
    const response = await backendApi.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  /**
   * Login user with email & password
   */
  async login(email, password) {
    const response = await backendApi.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Retrieve currently authenticated user session
   * Verifies the HttpOnly cookie stored in browser
   */
  async getMe() {
    const response = await backendApi.get("/api/auth/me");
    return response.data;
  },

  /**
   * Log out user (instructs backend to clear HttpOnly cookie)
   */
  async logout() {
    const response = await backendApi.post("/api/auth/logout");
    return response.data;
  },

  /**
   * Update profile information (name, email, optional password)
   */
  async updateProfile(profileData) {
    const response = await backendApi.put("/api/auth/profile", profileData);
    return response.data;
  },
};

export default authService;