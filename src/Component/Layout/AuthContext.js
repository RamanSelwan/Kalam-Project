import React, { createContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token in localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, [isLoggedIn]);

  const login = (token) => {
    if (token) {
      localStorage.setItem("token", token); // Store the token in localStorage
      setIsLoggedIn(true); // Update state
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update state
  };

  // Debugging to monitor isLoggedIn state changes
  // useEffect(() => {
  //   console.log("Auth Login State:", isLoggedIn);
  // }, [isLoggedIn]); // Trigger whenever `isLoggedIn` changes

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
