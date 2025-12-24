import { createContext, useContext, type ReactNode } from 'react';

// Stub AuthContext - not used in DevNest
// This file exists for compatibility with the template structure

interface AuthContextType {
  user: null;
  profile: null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (username: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const value: AuthContextType = {
    user: null,
    profile: null,
    loading: false,
    signIn: async () => ({ error: new Error('Not implemented') }),
    signUp: async () => ({ error: new Error('Not implemented') }),
    signOut: async () => {},
    refreshProfile: async () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
