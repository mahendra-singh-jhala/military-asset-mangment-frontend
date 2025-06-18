import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ roles }) => {
    const { isAuthenticated, role, loading } = useAuth();

    if (loading) return null;

    if (!isAuthenticated || !roles.includes(role)) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}


export default ProtectedRoute
