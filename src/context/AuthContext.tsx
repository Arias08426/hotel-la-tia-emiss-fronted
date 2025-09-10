import React, { createContext, useState, useCallback, useEffect } from 'react';
import { authService, LoginCredentials, RegisterData } from '../api/authService';
import { getAccessToken, getUser, setToken, setUser, clearAuth, setRole, getRole } from '../utils/storage';

interface AuthContextValue {
  user: any;
  role: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  hasRole: (r: string | string[]) => boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUserState] = useState<any | null>(getUser());
  const [role, setRoleState] = useState<string | null>(getRole());
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!getAccessToken();

  const applyRole = (newRole?: string) => {
    if (newRole) {
      setRole(newRole);
      setRoleState(newRole);
    }
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { token, role } = await authService.login(credentials);
    setToken(token);
    applyRole(role);
    // Obtener perfil luego del login
    const profile = await authService.fetchProfile();
    setUser(profile);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    await authService.register(data);
    // Tras registro exitoso, iniciar sesión automáticamente
    await login({ email: data.email, password: data.password });
  }, [login]);

  const logout = useCallback(() => {
    clearAuth();
    setUserState(null);
    setRoleState(null);
  }, []);

  const setUser = (u: any) => {
    setUserState(u);
    setUser(u);
  };

  const refreshProfile = useCallback(async () => {
    if (!getAccessToken()) return;
    try {
      const profile = await authService.fetchProfile();
      setUser(profile);
    } catch {
      // Si falla, puedes decidir hacer logout
    }
  }, []);

  const hasRole = (r: string | string[]) => {
    if (!role) return false;
    if (Array.isArray(r)) return r.includes(role);
    return role === r;
  };

  useEffect(() => {
    (async () => {
      if (getAccessToken() && !user) {
        await refreshProfile();
      }
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      role,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      refreshProfile,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};