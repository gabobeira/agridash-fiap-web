'use client';

import { getDefaultAuthService } from '@agridash/api';
import { LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';

interface PublicAuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  dashboardUrl?: string;
}

export function PublicAuthGuard({
  children,
  fallback,
  dashboardUrl = '/dashboard',
}: Readonly<PublicAuthGuardProps>) {
  const [isUnauthenticated, setIsUnauthenticated] = useState<boolean | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 100));

        const authUseCase = getDefaultAuthService();
        const user = await authUseCase.getCurrentUserAsync();

        if (user) {
          window.location.href = dashboardUrl;
          return;
        }

        setIsUnauthenticated(true);
      } catch (error) {
        console.error('Public auth check failed:', error);

        setIsUnauthenticated(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dashboardUrl]);

  if (isLoading || isUnauthenticated === null) {
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

  return isUnauthenticated ? <>{children}</> : null;
}
