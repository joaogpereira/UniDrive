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
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, tipo_usuario: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ✅ NOVO

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }

    setIsLoading(false); 
  }, []);

  const login = async (email: string, password: string) => {
  const res = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Erro ao fazer login");

  const data = await res.json();

  const user = {
    ...data.user,
    tipo_usuario: data.user.tipo_usuario,
  };

  setUser(user);
  setToken(data.token);
  setIsAuthenticated(true);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", data.token);
};


  const register = async (name: string, email: string, password: string, tipo_usuario: string) => {
  const res = await fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      tipo_usuario: tipo_usuario,
    }),
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
    tipo_usuario: data.user.tipo_usuario, // ✅ converte para camelCase
  };

  setUser(user);
  setToken(data.token);
  setIsAuthenticated(true);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", data.token);
};


  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        token,
        isLoading, 
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
