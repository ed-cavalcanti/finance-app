import * as AuthService from "@/services/authService";
import * as SecureStore from "expo-secure-store";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api";

interface User {
  id: string;
  email: string;
  name: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (credentials: AuthService.LoginUserInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);
  const checkAuthState = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("userToken");
      if (storedToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        const userData = await AuthService.getMe();

        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
        });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading stored data:", error);
      await SecureStore.deleteItemAsync("userToken");
      delete api.defaults.headers.common["Authorization"];
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  const login = async (credentials: AuthService.LoginUserInput) => {
    try {
      setIsLoading(true);
      const response = await AuthService.login(credentials);

      // Definir o header do axios
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.accessToken}`;

      // Buscar dados do usuário
      const userData = await AuthService.getMe();

      // Atualizar estado
      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("AuthContext Login Failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      setIsLoading(true);
      // Remover token do storage
      await SecureStore.deleteItemAsync("userToken");
      // Limpar header do axios
      delete api.defaults.headers.common["Authorization"];
      // Atualizar estado
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
