import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import Logo from "@/assets/logo/logo-unidrive.png";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate(); // Hook para navegação programática

  // Função de logout
  const handleLogout = () => {
    logout(); // Chama o método de logout do contexto
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/regions" className="flex-shrink-0 flex items-center">
  <img
    src={Logo}
    alt="Unidrive Logo"
    className="h-[45px] w-auto object-contain"
  />
</Link>

          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Link para o perfil, redireciona dependendo do tipo de usuário */}
                <Link
                  to={user?.tipo_usuario === 'motorista' ? '/driver-profile' : '/profile'}
                  className="flex items-center gap-2 hover:text-unidriver-600 transition-colors"
                >
                  <User size={16} className="text-unidriver-600" />
                  <span className="text-gray-700">{user?.name}</span>
                </Link>
                {/* Botão de logout */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleLogout} // Chama a função de logout
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="ghost">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Cadastrar</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
