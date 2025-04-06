
import React, { createContext, useState, useContext, useEffect } from "react";

// Define user roles
export type UserRole = "factory" | "marketer" | "admin";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Create provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("exportbase_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkSession();
  }, []);

  // Mock login function (replace with real authentication later)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (!email.includes("@") || password.length < 6) {
      throw new Error("Invalid credentials");
    }
    
    // Demo user data based on email
    let role: UserRole = "marketer";
    if (email.includes("factory")) {
      role = "factory";
    } else if (email.includes("admin")) {
      role = "admin";
    }
    
    const user: User = {
      id: Math.random().toString(36).substring(2, 15),
      name: email.split('@')[0],
      email,
      role,
    };
    
    // Save to local storage
    localStorage.setItem("exportbase_user", JSON.stringify(user));
    setUser(user);
    setIsLoading(false);
  };

  // Mock signup function
  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (!email.includes("@") || password.length < 6) {
      throw new Error("Invalid credentials");
    }
    
    const user: User = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      email,
      role,
    };
    
    // Save to local storage
    localStorage.setItem("exportbase_user", JSON.stringify(user));
    setUser(user);
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("exportbase_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Create hook for using the auth context
export function useAuth() {
  return useContext(AuthContext);
}
