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

  useEffect(() => {
    console.log("========== DEBUG AUTH INIT ==========");

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedDriver = localStorage.getItem("driver");

    console.log("storedUser existe?", !!storedUser);
    console.log("storedToken existe?", !!storedToken);
    console.log("storedToken início:", storedToken ? storedToken.substring(0, 40) + "..." : null);
    console.log("storedDriver existe?", !!storedDriver);

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);

      console.log("Usuário carregado do localStorage:", parsedUser);

      setUser(parsedUser);
      setToken(storedToken);
      setIsAuthenticated(true);

      if (storedDriver) {
        setDriver(JSON.parse(storedDriver));
      }
    }

    setIsLoading(false);

    console.log("========== FIM DEBUG AUTH INIT ==========");
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("========== DEBUG LOGIN FRONT ==========");
      console.log("Email enviado:", email);

      setIsLoading(true);

      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await res.text();

      console.log("Status login:", res.status);
      console.log("Resposta bruta login:", responseText);

      let data: any = {};

      try {
        data = JSON.parse(responseText);
        console.log("Resposta JSON login:", data);
      } catch {
        console.log("Login não retornou JSON.");
      }

      if (!res.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      if (!data.token) {
        throw new Error("Backend não retornou token.");
      }

      if (!data.user) {
        throw new Error("Backend não retornou usuário.");
      }

      const loggedUser = {
        ...data.user,
        tipo_usuario: data.user.tipo_usuario,
      };

      const Driver = data.driver_profile || null;

      console.log("Usuário recebido no login:", loggedUser);
      console.log("Driver recebido no login:", Driver);
      console.log("Token recebido existe?", !!data.token);
      console.log("Token recebido início:", data.token.substring(0, 40) + "...");

      setUser(loggedUser);
      setDriver(Driver);
      setToken(data.token);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("driver", JSON.stringify(Driver));
      localStorage.setItem("token", data.token);

      console.log("Token salvo no localStorage:", localStorage.getItem("token")?.substring(0, 40) + "...");
      console.log("Login realizado com sucesso no frontend.");
      console.log("========== FIM DEBUG LOGIN FRONT ==========");

      return true;
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw error;
    } finally {
      setTimeout(() => setIsLoading(false), 100);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    tipo_usuario: string
  ) => {
    console.log("========== DEBUG REGISTER FRONT ==========");
    console.log("Dados enviados no register:", {
      name,
      email,
      tipo_usuario,
    });

    const res = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, password, tipo_usuario }),
    });

    const responseText = await res.text();

    console.log("Status register:", res.status);
    console.log("Resposta bruta register:", responseText);

    let data: any = {};

    try {
      data = JSON.parse(responseText);
      console.log("Resposta JSON register:", data);
    } catch {
      console.log("Register não retornou JSON.");
    }

    if (!res.ok) {
      throw new Error(data.message || "Erro ao registrar");
    }

    if (!data.token || !data.user) {
      throw new Error("Token ou usuário não retornado pelo backend.");
    }

    const registeredUser = {
      ...data.user,
      tipo_usuario: data.user.tipo_usuario,
    };

    const Driver = data.driver_profile || null;

    setUser(registeredUser);
    setToken(data.token);
    setDriver(Driver);
    setIsAuthenticated(true);

    localStorage.setItem("user", JSON.stringify(registeredUser));
    localStorage.setItem("driver", JSON.stringify(Driver));
    localStorage.setItem("token", data.token);

    console.log("Register finalizado com sucesso.");
    console.log("========== FIM DEBUG REGISTER FRONT ==========");
  };

  const logout = () => {
    console.log("========== DEBUG LOGOUT ==========");

    setUser(null);
    setToken(null);
    setDriver(null);
    setIsAuthenticated(false);

    localStorage.removeItem("user");
    localStorage.removeItem("driver");
    localStorage.removeItem("token");

    console.log("Logout realizado. LocalStorage limpo.");
    console.log("========== FIM DEBUG LOGOUT ==========");
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

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};