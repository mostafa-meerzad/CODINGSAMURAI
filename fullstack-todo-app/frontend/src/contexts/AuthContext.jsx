import { createContext, useContext, useState } from "react";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

const authContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true"
  );

  const signup = async (userData) => {
    try {
      const response = await axiosInstance.post("/api/auth/signup", userData);

      if (response.status >= 200 && response.status < 300) {
        toast.success("Registered successfully!");
        setIsAuthenticated(true);
        localStorage.setItem("authenticated", "true");
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error("couldn't signup");
      setIsAuthenticated(false);
      localStorage.setItem("authenticated", "false");
    }
  };

  const login = async (userData) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", userData);

      if (response.status >= 200 && response.status < 300) {
        toast.success("Logged in successfully!");
        setIsAuthenticated(true);
        localStorage.setItem("authenticated", "true");
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error("couldn't login");
      setIsAuthenticated(false);
      localStorage.setItem("authenticated", "false");
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/api/auth/logout");
      if (response.status >= 200 && response.status < 300) {
        toast.success("Logged out successfully!");
        setIsAuthenticated(false);
        localStorage.setItem("authenticated", "false");
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error("couldn't login");
    }
  };

  return (
    <authContext.Provider value={{ isAuthenticated, signup, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must only be used within an AuthProvider");
  }
  return context;
};
