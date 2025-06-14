import React, { createContext, useEffect, useState } from "react";
import apiClient from "../src/api/apiClient";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await apiClient.get("/auth/verify");
        setUser(res.data);
        setIsAuth(true);
      } catch (err) {
        setUser(null);
        setIsAuth(false);
      } 
    };
    verifyUser();
  }, []);

  const login = async (email, password) => {
    await apiClient.post("/auth/login", { email, password });
    const res = await apiClient.get("/auth/verify");
    setUser(res.data);
    setIsAuth(true);
  };

  const register = async (value) => {
    await apiClient.post("/auth/register", value);
  };

  const logout = async () => {
    await apiClient.post("/auth/logout", {});
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
