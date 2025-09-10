import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  redirectTo?: string;
  roles?: string[]; // Roles permitidos opcionales
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = '/login', roles }) => {
  const { isAuthenticated, loading, hasRole } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (roles && roles.length > 0 && !hasRole(roles)) {
    return <div>No tienes permisos para acceder.</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;