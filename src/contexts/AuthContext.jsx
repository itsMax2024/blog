import React, { createContext, useState, useContext, useEffect } from "react";
import {
  login as loginAPI,
  register as registerAPI,
  getCurrentUser,
} from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await loginAPI(username, password);
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      await fetchUser();
      return { success: true };
    } catch (err) {
      // ✅ NEVER throw; always return a plain object
      let errorMessage = "ورود ناموفق. لطفاً دوباره تلاش کنید.";
      if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.response?.data?.non_field_errors) {
        errorMessage = err.response.data.non_field_errors[0];
      }
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      await registerAPI(userData);
      // Auto login after registration
      return await login(userData.username, userData.password);
    } catch (error) {
      const errorData = error.response?.data;
      return {
        success: false,
        error: errorData,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
