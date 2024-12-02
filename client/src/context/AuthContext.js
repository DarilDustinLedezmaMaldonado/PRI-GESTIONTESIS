import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";  // Asegúrate de usar correctamente el named export

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);

  // Calcula isAuthenticated basado en la existencia del token
  const isAuthenticated = !!token;

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        setToken(savedToken);
        setUserId(decoded.UserId);
        setUserName(decoded.UserName); // Claim "Name"
        setRole(decoded.Role); // Claim "Role"
      } catch (error) {
        console.error("Error decoding token:", error);
        logout(); // Si hay un error, aseguramos que el usuario esté deslogueado
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setToken(token);
      setUserId(decoded.UserId);
      setUserName(decoded.UserName); // Claim "Name"
      setRole(decoded.Role); // Claim "Role"
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Error decoding token on login:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    setRole(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, userId, userName, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
