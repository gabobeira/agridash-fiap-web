'use client';

import { LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectUrl?: string;
  requireAuth?: boolean;
  enableStandaloneMode?: boolean;
}

// Função para verificar standalone mode (similar ao código do dashboard)
function useStandaloneMode(): boolean | null {
  const [isStandalone, setIsStandalone] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsStandalone(null);
      return;
    }

    const isOnDashboardPort = window.location.port === '3001';
    const isNotEmbedded = window.parent === window;
    setIsStandalone(isOnDashboardPort && isNotEmbedded);
  }, []);

  return isStandalone;
}

export function AuthGuard({
  children,
  fallback,
  redirectUrl = '/login',
  requireAuth = true,
  enableStandaloneMode = false,
}: AuthGuardProps) {
  const { user, isLoading, isInitialized } = useAuth();
  const isStandalone = useStandaloneMode();

  useEffect(() => {
    // Se standalone mode estiver habilitado e estivermos em standalone, pular autenticação
    if (enableStandaloneMode && isStandalone) {
      return;
    }

    if (!isInitialized || isLoading) return;

    if (requireAuth && !user) {
      window.location.href = redirectUrl;
    } else if (!requireAuth && user) {
      window.location.href = '/dashboard';
    }
  }, [
    user,
    isLoading,
    isInitialized,
    requireAuth,
    redirectUrl,
    isStandalone,
    enableStandaloneMode,
  ]);

  // Se standalone mode estiver habilitado e estivermos em standalone, mostrar conteúdo
  if (enableStandaloneMode && isStandalone) {
    return <>{children}</>;
  }

  if (!isInitialized || isLoading) {
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

  if (requireAuth && !user) {
    return null; // Will redirect
  }

  if (!requireAuth && user) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
