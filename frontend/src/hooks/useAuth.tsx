// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from "react";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if token exists in localStorage on initial load
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      // Simulate API call to authenticate user
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("authToken", token);
        setToken(token);
        setIsAuthenticated(true);
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
      setToken(null);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    token,
    login,
    logout,
  };
};

export default useAuth;
