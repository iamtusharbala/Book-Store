import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, Navigate } from "react-router-dom";

const RequiredAuth = ({ children, adminOnly = false }) => {
    const { userLoggedData } = useContext(AuthContext);
    const location = useLocation();
    const token = localStorage.getItem("token");
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin")); // Use JSON.parse to get boolean value

    // Check if the user is authenticated
    const isAuthenticated = token !== null && userLoggedData.token !== null;

    // Check if the user is an admin, if the route requires admin access
    const hasAdminAccess = isAdmin && userLoggedData.isAdmin;

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !hasAdminAccess) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequiredAuth;
