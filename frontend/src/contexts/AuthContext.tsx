import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "../services/authService";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    travelType: string;
    budgetRange: string;
    destinations: string[];
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("porikroma_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const apiUser = await authService.login({ email, password });

      // Convert API user to app user format
      const user: User = {
        id: apiUser.userId?.toString() || "1",
        name: apiUser.name,
        email: apiUser.email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        preferences: {
          travelType: "adventure",
          budgetRange: "medium",
          destinations: [],
        },
      };

      setUser(user);
      authService.setCurrentUser(apiUser);
      localStorage.setItem("porikroma_user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const apiUser = await authService.register({ name, email, password });

      // Convert API user to app user format
      const user: User = {
        id: apiUser.userId?.toString() || Date.now().toString(),
        name: apiUser.name,
        email: apiUser.email,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        preferences: {
          travelType: "adventure",
          budgetRange: "medium",
          destinations: [],
        },
      };

      setUser(user);
      authService.setCurrentUser(apiUser);
      localStorage.setItem("porikroma_user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    authService.logout();
    localStorage.removeItem("porikroma_user");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("porikroma_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
