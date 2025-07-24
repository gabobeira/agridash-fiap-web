'use client';

import { useAuthStore } from '@agridash/api';
import { useEffect, useState } from 'react';

interface PublicAuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  dashboardUrl?: string;
}

export function PublicAuthGuard({
  children,
  dashboardUrl = '/dashboard',
}: Readonly<PublicAuthGuardProps>) {
  const [isUnauthenticated, setIsUnauthenticated] = useState<boolean | null>(
    null
  );
  const { user, loading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Aguarda a inicialização do Firebase antes de verificar
        if (loading) {
          return;
        }

        if (user) {
          window.location.href = dashboardUrl;
          return;
        }

        setIsUnauthenticated(true);
      } catch (error) {
        console.error('Public auth check failed:', error);
        setIsUnauthenticated(true);
      }
    };

    checkAuth();
  }, [dashboardUrl, user, loading]);

  return isUnauthenticated ? <>{children}</> : null;
}
