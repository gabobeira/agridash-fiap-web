'use client';

import { useEffect, useState } from 'react';

export function isStandaloneModeSync(): boolean | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const isOnDashboardPort = window.location.port === '3001';
  const isNotEmbedded = window.parent === window;
  return isOnDashboardPort && isNotEmbedded;
}

export function useStandaloneMode(): boolean | null {
  const [isStandalone, setIsStandalone] = useState<boolean | null>(null);

  useEffect(() => {
    setIsStandalone(isStandaloneModeSync());
  }, []);

  return isStandalone;
}
