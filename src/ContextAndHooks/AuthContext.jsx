import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Perform login logic (useAuthLogin hook, API call, etc.)
    // On success, set the user state
    setUser({ username: userData.username, email: userData.email });
  };

  const logout = () => {
    // Perform logout logic
    // On logout, clear the user state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};