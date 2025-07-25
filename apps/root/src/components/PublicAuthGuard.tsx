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
  dashboardUrl,
}: Readonly<PublicAuthGuardProps>) {
  const [isUnauthenticated, setIsUnauthenticated] = useState<boolean | null>(
    null
  );
  const { user, loading } = useAuthStore();

  useEffect(() => {
    const getDashboardUrl = () => {
      if (dashboardUrl) return dashboardUrl;

      // Em uma arquitetura multizone, o dashboard é servido através de rewrite
      // Usa URL relativa para aproveitar o rewrite configurado
      return '/dashboard';
    };

    const checkAuth = async () => {
      try {
        // Aguarda a inicialização do Firebase antes de verificar
        if (loading) {
          return;
        }

        if (user) {
          // Verifica se já não está no dashboard para evitar loops
          const currentPath = window.location.pathname;

          // Se já está no dashboard (através de rewrite), não redireciona
          if (currentPath.startsWith('/dashboard')) {
            setIsUnauthenticated(false);
            return;
          }

          // Redireciona para o dashboard usando URL relativa (rewrite)
          const targetDashboardUrl = getDashboardUrl();
          window.location.href = targetDashboardUrl;
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
