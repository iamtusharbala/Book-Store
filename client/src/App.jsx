import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { AuthContext } from './context/authContext';
import Login from './pages/Login';
import AddBook from './pages/AddBook';
import RequiredAuth from './util/authRoutes';

const App = () => {
  const [userLoggedData, setUserLoggedData] = useState({
    token: localStorage.getItem("token"), // Get token from localStorage
    userId: localStorage.getItem("userId"), // Get userId from localStorage
    isAdmin: JSON.parse(localStorage.getItem("isAdmin")), // Parse isAdmin from localStorage
  });

  const login = (token, userId, isAdmin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin)); // Store isAdmin as a string
    setUserLoggedData({ token: token, userId: userId, isAdmin: isAdmin });
  };

  const logout = () => {
    setUserLoggedData({ token: null, userId: null, isAdmin: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ userLoggedData, login, logout }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/addBook"
          element={
            <RequiredAuth adminOnly={true}>
              <AddBook />
            </RequiredAuth>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
