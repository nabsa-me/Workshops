import React, { useEffect, useState } from "react";
import type { User, AuthContextValue } from "@pulse/shared";
import { AuthContext } from "@pulse/shared";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser(): Promise<void> {
      try {
        const response = await fetch("/api/users/me");
        const data: User = await response.json();
        setUser(data);
        setToken("mock-jwt-token-" + data.id);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">Authenticating...</div>
      </div>
    );
  }

  const login = async (newToken: string): Promise<void> => {
    setToken(newToken);
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
