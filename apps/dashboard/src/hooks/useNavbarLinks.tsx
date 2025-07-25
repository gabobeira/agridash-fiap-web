'use client';

import { IconCoins, IconHomeStats, IconWheat } from '@tabler/icons-react';
import { useMemo } from 'react';
import { useStandaloneMode } from './useStandaloneMode';

export function useNavbarLinks() {
  const isStandalone = useStandaloneMode();

  const navbarLinks = useMemo(() => {
    const basePath = isStandalone ? '' : '/dashboard';

    return [
      {
        leftSection: <IconHomeStats />,
        label: 'Início',
        href: isStandalone ? '/' : `${basePath}`,
      },
      {
        leftSection: <IconCoins />,
        label: 'Vendas',
        href: `${basePath}/vendas`,
      },
      {
        leftSection: <IconWheat />,
        label: 'Estoque',
        href: `${basePath}/estoque`,
      },
    ];
  }, [isStandalone]);

  return navbarLinks;
}
