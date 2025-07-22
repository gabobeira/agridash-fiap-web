'use client';

import {
  AppShell,
  Burger,
  Code,
  Divider,
  Flex,
  NavLink,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderLogo = () => (
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
  );

  if (!mounted) {
    return null; // Prevents hydration mismatch
  }

  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, xs: 0 } }}
      navbar={{
        width: 260,
        breakpoint: 'xs',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header hiddenFrom="xs">
        <Flex gap="md" align="center" justify="space-between" p="md">
          <Burger opened={opened} onClick={toggle} size="sm" />
          {!opened ? renderLogo() : null}
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar bg="neutral.0" p="md">
        <AppShell.Section>
          <Flex gap="md" align="center" justify="space-between" p="md">
            {renderLogo()}
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
