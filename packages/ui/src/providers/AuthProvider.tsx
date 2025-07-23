'use client';

import { AuthUseCase, AuthUser } from '@agridash/api';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isInitialized: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<AuthUser>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  authService: AuthUseCase;
  onAuthStateChange?: (user: AuthUser | null) => void;
}

export function AuthProvider({
  children,
  authService,
  onAuthStateChange,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(authUser => {
      setUser(authUser);
      setIsLoading(false);

      if (!isInitialized) {
        setIsInitialized(true);
      }

      onAuthStateChange?.(authUser);
    });

    return unsubscribe;
  }, [authService, onAuthStateChange, isInitialized]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthUser> => {
      setIsLoading(true);
      try {
        const result = await authService.signIn(email, password);
        return result;
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    [authService]
  );

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      displayName?: string
    ): Promise<AuthUser> => {
      setIsLoading(true);
      try {
        const result = await authService.signUp(email, password, displayName);
        return result;
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    [authService]
  );

  const signOut = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.signOut();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, [authService]);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isLoading,
      isInitialized,
      signIn,
      signUp,
      signOut,
    }),
    [user, isLoading, isInitialized, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
