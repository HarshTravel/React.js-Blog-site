import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const login = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
  };
  
  const logemail = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUserName('');
    setUserEmail('');

    // Fetch all blog IDs
    const response = await fetch('http://localhost:9000/blogs');
    const blogs = await response.json();

    // Delete each blog entry individually
    await Promise.all(blogs.map(blog => 
      fetch(`http://localhost:9000/blogs/${blog.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    ));
  };

  const value = {
    isAuthenticated,
    userName,
    userEmail,
    login,
    logemail,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
