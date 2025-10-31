import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// 🔒 Proteção geral (usuários autenticados)
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // ⏳ Enquanto carrega o contexto (evita falso redirecionamento)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );
  }

  // 🔐 Só redireciona se o carregamento já terminou e não há autenticação
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Usuário autenticado
  return <>{children}</>;
};

// 🚗 Proteção adicional (rotas de motorista)
export const DriverRoutes = ({ children }: ProtectedRouteProps) => {
  const { isDriver, isLoading } = useAuth();

  // ⏳ Aguarda contexto
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );
  }

  // 🔐 Se não for motorista → manda pra /regions
  if (!isDriver) {
    return <Navigate to="/regions" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
