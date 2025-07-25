'use client';

import { useEffect, useState } from 'react';

export function isStandaloneModeSync(): boolean | null {
  if (typeof window === 'undefined') {
    return null;
  }

  // Verifica se está acessando diretamente o dashboard (standalone)
  const currentUrl = window.location.href;
  const currentPath = window.location.pathname;

  // Em modo standalone: acesso direto ao dashboard na sua própria porta/domínio
  const isDirectDashboardAccess =
    currentUrl.includes('localhost:3001') || // desenvolvimento standalone
    currentUrl.includes('agridash-fiap-web-dashboard.vercel.app'); // produção standalone

  // Em modo multizone: dashboard sendo servido através de rewrites na aplicação principal
  const isMultizoneAccess = currentPath.startsWith('/dashboard');

  const isNotEmbedded = window.parent === window;

  // Standalone apenas se for acesso direto (não através de rewrite)
  return isDirectDashboardAccess && isNotEmbedded && !isMultizoneAccess;
}

export function useStandaloneMode(): boolean | null {
  const [isStandalone, setIsStandalone] = useState<boolean | null>(null);

  useEffect(() => {
    setIsStandalone(isStandaloneModeSync());
  }, []);

  return isStandalone;
}
