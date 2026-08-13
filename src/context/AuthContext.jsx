import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "currentUser"
        );

      return saved
        ? JSON.parse(saved)
        : null;
    });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(
        "currentUser"
      );
    }
  }, [user]);

  const signup = (
    name,
    email,
    password
  ) => {
    const users = JSON.parse(
      localStorage.getItem("users")
    ) || [];

    const exists = users.find(
      (u) => u.email === email
    );

    if (exists) {
      return {
        success: false,
        message:
          "User already exists",
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    setUser(newUser);

    return {
      success: true,
    };
  };

  const login = (
    email,
    password
  ) => {
    const users = JSON.parse(
      localStorage.getItem("users")
    ) || [];

    const found = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!found) {
      return {
        success: false,
        message:
          "Invalid credentials",
      };
    }

    setUser(found);

    return {
      success: true,
    };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedFields) => {
    if (!user) return { success: false, message: "Not logged in" };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if new email is already taken by someone else
    if (updatedFields.email && updatedFields.email !== user.email) {
      const exists = users.find((u) => u.email === updatedFields.email);
      if (exists) {
        return { success: false, message: "Email is already taken" };
      }
    }

    const updatedUser = { ...user, ...updatedFields };
    
    // Update users list in localStorage
    const updatedUsersList = users.map(u => 
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsersList));
    
    // Update current user state
    setUser(updatedUser);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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

export const useAuth = () =>
  useContext(AuthContext);