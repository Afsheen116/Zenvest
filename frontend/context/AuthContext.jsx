"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from "@/lib/frontendData";

const AuthContext = createContext(null);

const API_URL = "http://localhost:5000/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = useCallback(() => {
    try {
      const storedUser = getStoredUser();
      setUser(storedUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const signup = async ({ name, email, password, confirmPassword, gender }) => {
    if (
      !name?.trim() ||
      !email?.trim() ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      throw new Error("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password,
        gender,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    setStoredUser(data.user);
    setUser(data.user);

    return data.user;
  };

  const login = async ({ email, password }) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid email or password");
    }

    setStoredUser(data.user);
    setUser(data.user);

    return data.user;
  };

  const logout = () => {
    clearStoredUser();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
