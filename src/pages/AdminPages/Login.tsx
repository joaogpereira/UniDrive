import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Sucesso!",
        description: "Login realizado com sucesso.",
      });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Fundo com grade verde */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-full h-full bg-[repeating-linear-gradient(0deg,#00ff80_0_1px,transparent_1px_100px)] opacity-20 animate-[moveLines_25s_linear_infinite]"></div>
        <div className="absolute w-full h-full bg-[repeating-linear-gradient(90deg,#00ff80_0_1px,transparent_1px_100px)] opacity-20 animate-[moveLinesReverse_30s_linear_infinite]"></div>
      </div>

      {/* Cabeçalho exclusivo da página */}
      <header className="relative z-10 border-b border-green-500/30 bg-black/80 backdrop-blur-sm shadow-[0_0_20px_#00ff8080]">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-green-400 tracking-wide">
            Painel Administrativo
          </h1>
          <Link
            to="/"
            className="text-sm text-green-400 hover:text-green-300 transition"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      {/* Conteúdo central */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-80px)] z-10">
        <div className="w-full max-w-md p-8 space-y-8 bg-neutral-900/90 backdrop-blur-md border border-green-500/40 rounded-xl shadow-[0_0_25px_#00ff80aa]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              Acesso Restrito
            </h2>
            <p className="mt-2 text-gray-400">
              Entre com suas credenciais de administrador
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black border-green-500/30 text-white focus:border-green-400 focus:ring-green-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black border-green-500/30 text-white focus:border-green-400 focus:ring-green-400"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition"
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Entrar"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Painel apenas para administradores{" "}
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Keyframes de animação */}
      <style>
        {`
          @keyframes moveLines {
            from { background-position-y: 0; }
            to { background-position-y: 100px; }
          }

          @keyframes moveLinesReverse {
            from { background-position-x: 0; }
            to { background-position-x: 100px; }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
