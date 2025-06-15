import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await apiClient.get("/auth/verify");
        setUser(res.data.user); 
        setUserRole(res.data.user.role);
        setIsAuth(true);
      } catch (err) {
        setUser(null);
        setUserRole("");
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    await apiClient.post("/auth/login", { email, password }, { withCredentials: true });
    const res = await apiClient.get("/auth/verify");
    setUser(res.data.user);
    setUserRole(res.data.user.role);
    setIsAuth(true);
  };

  const register = async (value) => {
    await apiClient.post("/auth/register", value);
  };

  const logout = async () => {
    await apiClient.post("/auth/logout", { withCredentials: true }); 
    setUser(null);
    setUserRole("");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, isAuth, login, logout, register }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export default AuthProvider;
