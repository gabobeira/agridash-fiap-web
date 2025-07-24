'use client';

import { useStandaloneMode } from '@/hooks/useStandaloneMode';
import { useAuthStore } from '@agridash/api';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectUrl?: string;
}

export function AuthGuard({
  children,
  redirectUrl = '/login',
}: Readonly<AuthGuardProps>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isStandalone = useStandaloneMode();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isStandalone) {
          setIsAuthenticated(true);
          return;
        }

        if (loading) {
          return;
        }

        if (!user) {
          window.location.href = redirectUrl;
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth verification failed:', error);
        window.location.href = redirectUrl;
      }
    };

    checkAuth();
  }, [user, isStandalone, redirectUrl, loading]);

  if (isStandalone) return <>{children}</>;

  return isAuthenticated ? <>{children}</> : null;
}
