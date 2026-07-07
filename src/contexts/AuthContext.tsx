import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';

import * as authService from '@/services/auth.service';
import type { User, LoginCredentials } from '@/features/auth/types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permissionCode: string) => boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, restore session if a token already exists (page refresh case).
  useEffect(() => {
    const restoreSession = async () => {
      if (!authService.hasAccessToken()) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch {
        // Token invalid/expired and refresh failed — user stays logged out.
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    const loggedInUser = await authService.login(credentials);
    setUser(loggedInUser);
  }, []);

  const handleLogout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const hasPermission = useCallback(
    (permissionCode: string) => {
      return user?.permissions.some((permission) => permission.code === permissionCode) ?? false;
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        login: handleLogin,
        logout: handleLogout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
