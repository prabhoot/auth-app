// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from './globalContext';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useGlobalContext();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
