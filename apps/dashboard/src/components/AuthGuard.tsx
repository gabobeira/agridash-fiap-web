'use client';

import { useStandaloneMode } from '@/hooks/useStandaloneMode';
import { useAuthStore } from '@agridash/api';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectUrl?: string;
}

export function AuthGuard({ children, redirectUrl }: Readonly<AuthGuardProps>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isStandalone = useStandaloneMode();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    const getRedirectUrl = () => {
      if (redirectUrl) return redirectUrl;

      // Se estiver em modo standalone, redireciona para a aplicação root
      if (isStandalone) {
        if (typeof window !== 'undefined') {
          const isDev = window.location.hostname === 'localhost';
          return isDev
            ? 'http://localhost:3000/login'
            : 'https://agridash-fiap-web.vercel.app/login';
        }
      }

      // Em modo multizone, usa URL relativa para voltar à aplicação principal
      // O rewrite irá lidar com o roteamento correto
      return '/login';
    };

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
          const redirectTo = getRedirectUrl();

          // Em modo multizone, o /login será servido pela aplicação root através do rewrite
          // Por isso usamos window.location.href mesmo sendo URL relativa
          window.location.href = redirectTo;
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth verification failed:', error);
        const redirectTo = getRedirectUrl();
        window.location.href = redirectTo;
      }
    };

    // Adiciona um delay para evitar múltiplos redirecionamentos
    const timeoutId = setTimeout(checkAuth, 100);

    return () => clearTimeout(timeoutId);
  }, [user, isStandalone, loading, redirectUrl]);

  if (isStandalone) return <>{children}</>;

  return isAuthenticated ? <>{children}</> : null;
}
