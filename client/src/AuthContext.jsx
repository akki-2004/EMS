
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if there is a token in localStorage and update the authentication state accordingly
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = () => {
    // Perform your login logic here
    // After successful login, set isAuthenticated to true and store the token in localStorage
   
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'yourAuthToken'); // Replace with your actual authentication token
  };

  const logout = () => {

    // Perform your logout logic here
    // After successful logout, set isAuthenticated to false and remove the token from localStorage
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
