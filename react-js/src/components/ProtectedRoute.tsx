import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
