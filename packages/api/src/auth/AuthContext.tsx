'use client';

import { User } from 'firebase/auth';
import React, { createContext, useContext } from 'react';
import { FUser, useAuth } from './useAuth';

interface AuthContextType {
  user: FUser | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<boolean | void>;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };
