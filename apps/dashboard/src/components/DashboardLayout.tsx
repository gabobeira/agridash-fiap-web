'use client';

import { AppShell, NavLink, Title } from '@mantine/core';
import {
  IconBell,
  IconBuildingCottage,
  IconBuildingWarehouse,
  IconDatabaseDollar,
  IconLogout,
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navbarLinks = [
  {
    leftSection: <IconBuildingCottage />,
    label: 'Início',
    href: '/dashboard',
    active: true,
  },
  {
    leftSection: <IconDatabaseDollar />,
    label: 'Transações',
    href: '/dashboard/transacoes',
  },
  {
    leftSection: <IconBuildingWarehouse />,
    label: 'Estoque',
    href: '/dashboard/estoque',
  },
  {
    leftSection: <IconBell />,
    label: 'Notificações',
    href: '/dashboard/notificacoes',
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <AppShell
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: true },
      }}
      padding="md"
    >
      <AppShell.Navbar bg="neutral.0">
        <AppShell.Section>
          <Title order={3} c="neutral.8" p="md">
            AgriDash
          </Title>
        </AppShell.Section>
        <AppShell.Section grow>
          {mounted &&
            navbarLinks.map((link, index) => (
              <NavLink
                key={`link-${index}-${link.label}`}
                label={link.label}
                href={link.href}
                leftSection={link.leftSection}
                active={pathname === link.href}
                p="md"
              />
            ))}
        </AppShell.Section>
        <AppShell.Section>
          <NavLink label="Sair" href="/" leftSection={<IconLogout />} p="md" />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
