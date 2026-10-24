import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // loading is true on initial mount while verifying session with /api/auth/me
  const [loading, setLoading] = useState(true);

  // Check authenticated session upon initial app load / refresh
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await authService.getMe();
        if (data && data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        // No active or valid session cookie - user is guest
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Register a new user via the backend API
   */
  const signup = async (name, email, password) => {
    try {
      const data = await authService.register(name, email, password);
      if (data && data.success) {
        setUser(data.user);
        return { success: true, user: data.user };
      }
      return {
        success: false,
        message: data?.message || "Registration failed",
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      return { success: false, message };
    }
  };

  /**
   * Authenticate user with backend API
   */
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      if (data && data.success) {
        setUser(data.user);
        return { success: true, user: data.user };
      }
      return {
        success: false,
        message: data?.message || "Login failed",
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password.";
      return { success: false, message };
    }
  };

  /**
   * Logout user and clear session cookie on the backend
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout request error:", error.message);
    } finally {
      // Clear in-memory user state
      setUser(null);
    }
    return { success: true };
  };

  /**
   * Update authenticated user profile details in MongoDB
   */
  const updateUser = async (updatedFields) => {
    try {
      const data = await authService.updateProfile(updatedFields);
      if (data && data.success) {
        setUser(data.user);
        return { success: true, user: data.user };
      }
      return {
        success: false,
        message: data?.message || "Failed to update profile",
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile.";
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);