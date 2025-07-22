'use client';

import { AppShell, Code, Divider, Flex, NavLink, Title } from '@mantine/core';
import {
  IconBell,
  IconHomeStats,
  IconLogout,
  IconSwitchHorizontal,
  IconWheat,
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navbarLinks = [
  {
    leftSection: <IconHomeStats />,
    label: 'Início',
    href: '/dashboard',
    active: true,
  },
  {
    leftSection: <IconSwitchHorizontal />,
    label: 'Transações',
    href: '/dashboard/transacoes',
  },
  {
    leftSection: <IconWheat />,
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

  if (!mounted) {
    return null; // Prevents hydration mismatch
  }

  return (
    <AppShell
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: true },
      }}
      padding="md"
    >
      <AppShell.Navbar bg="neutral.0" p="md">
        <AppShell.Section>
          <Flex gap="md" align="center" justify="space-between" p="md">
            <Title
              order={3}
              fw={800}
              style={{
                background:
                  'linear-gradient(135deg, var(--mantine-color-success-6) 0%, var(--mantine-color-blue-6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AgriDash
            </Title>
            <Code>v1.0.0</Code>
          </Flex>
        </AppShell.Section>
        <Divider />
        <AppShell.Section grow>
          {navbarLinks.map((link, index) => (
            <NavLink
              key={`link-${index}-${link.label}`}
              label={link.label}
              href={link.href}
              leftSection={link.leftSection}
              active={mounted && pathname === link.href}
              p="md"
              my="xs"
              bdrs="sm"
            />
          ))}
        </AppShell.Section>
        <Divider />
        <AppShell.Section>
          <NavLink
            label="Sair"
            href="/"
            leftSection={<IconLogout />}
            p="md"
            mt="xs"
            bdrs="sm"
          />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
