import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  tipo_usuario: "motorista" | "passageiro";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  isDriver: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    tipo_usuario: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [driver, setDriver] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Carrega dados do localStorage ao inicializar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedDriver = localStorage.getItem("driver");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
      if (storedDriver) setDriver(JSON.parse(storedDriver));
    }

    setIsLoading(false);
  }, []);

  // ✅ LOGIN
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true); // força ProtectedRoute a aguardar
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Erro ao fazer login");

      const data = await res.json();

      const user = {
        ...data.user,
        tipo_usuario: data.user.tipo_usuario,
      };
      const Driver = data.driver_profile || null;

      // salva no estado e storage
      setUser(user);
      setDriver(Driver);
      setToken(data.token);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("driver", JSON.stringify(Driver));
      localStorage.setItem("token", data.token);

      console.log("Login realizado com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw error;
    } finally {
      // libera carregamento após um microtempo
      setTimeout(() => setIsLoading(false), 100);
    }
  };

  // ✅ REGISTER
  const register = async (name: string, email: string, password: string, tipo_usuario: string) => {
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, tipo_usuario }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Erro ao registrar");
    }

    if (!data.token || !data.user) {
      throw new Error("Token ou usuário não retornado pelo backend.");
    }

    const user = {
      ...data.user,
      tipo_usuario: data.user.tipo_usuario,
    };
    const Driver = data.driver_profile || null;
    setUser(user);
    setToken(data.token);
    setDriver(Driver);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("driver", JSON.stringify(Driver));
    localStorage.setItem("token", data.token);
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    setDriver(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("driver");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        token,
        isLoading,
        isDriver: user?.tipo_usuario === "motorista",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
