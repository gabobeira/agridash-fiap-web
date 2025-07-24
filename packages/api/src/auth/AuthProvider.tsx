'use client';

import { useEffect } from 'react';
import { useAuthStore } from './AuthStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    useAuthStore.getState().init();
    return () => {
      useAuthStore.getState().cleanup();
    };
  }, []);

  return <>{children}</>;
}
