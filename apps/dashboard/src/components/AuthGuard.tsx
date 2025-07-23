'use client';

import { useStandaloneMode } from '@/hooks/useStandaloneMode';
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
}: Readonly<AuthGuardProps>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isStandalone = useStandaloneMode();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isStandalone || isStandalone === null) return;

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 100));

        const authUseCase = getDefaultAuthService();
        
        // Se não conseguiu inicializar o Firebase, não faz verificação de auth
        if (!authUseCase) {
          setIsAuthenticated(true);
          return;
        }

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
  }, [redirectUrl, isStandalone]);

  if (isStandalone) return <>{children}</>;

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
