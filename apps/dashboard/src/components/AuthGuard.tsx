'use client';

import { getDefaultAuthService } from '@agridash/api';
import { LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectUrl?: string;
}

export function AuthGuard({
  children,
  fallback,
  redirectUrl = '/login',
}: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 100));

        const authUseCase = getDefaultAuthService();
        const user = await authUseCase.getCurrentUserAsync();

        if (!user) {
          window.location.href = redirectUrl;
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth verification failed:', error);
        window.location.href = redirectUrl;
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [redirectUrl]);

  if (isLoading || isAuthenticated === null) {
    return (
      fallback || (
        <div style={{ position: 'relative', height: '100vh' }}>
          <LoadingOverlay
            visible={true}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ size: 'lg', type: 'bars' }}
          />
        </div>
      )
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
