// En ProtectedRoute.tsx

import { Outlet, Navigate } from "react-router-dom";
import { UseAuth } from "./AuthProvider";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = UseAuth();

  console.log(`isAuthenticated: ${isAuthenticated}`);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
