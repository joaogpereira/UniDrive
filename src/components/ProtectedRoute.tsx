import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Children } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const DriverRoutes = ({ children }: ProtectedRouteProps) => {
  const { isDriver } = useAuth();

  if (!isDriver) {
    return <Navigate to="/regions" replace />;
  }

  return <>{children}</>;
};


const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading,} = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};



export default ProtectedRoute;
