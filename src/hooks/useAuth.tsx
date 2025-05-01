'use client';

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';
import { getCurrentUser, login as apiLogin, logout as apiLogout } from '@/lib/auth'; // Use simulated auth functions
import type { UserProfile } from '@/models/User';

type AuthContextType = {
  user: Pick<UserProfile, 'id' | 'name' | 'email'> | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Pick<UserProfile, 'id' | 'name' | 'email'> | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback(async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const loggedInUser = await apiLogin(email, password);
      setUser(loggedInUser);
      setIsLoading(false);
      return !!loggedInUser; // Return true if login succeeded
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
      setIsLoading(false);
      return false; // Return false if login failed
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally keep user logged in state if logout fails? Or force clear?
      setUser(null); // Force clear user state on logout error for safety
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
