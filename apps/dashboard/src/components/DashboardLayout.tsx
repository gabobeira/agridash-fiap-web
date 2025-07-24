'use client';

import { useNavbarLinks } from '@/hooks/useNavbarLinks';
import { useAuthStore } from '@agridash/api';
import {
  AppShell,
  Burger,
  Code,
  Divider,
  Flex,
  Loader,
  NavLink,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthGuard } from './AuthGuard';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const { signOut, loading: signOutLoading } = useAuthStore();

  const navbarLinks = useNavbarLinks();

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

  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      window.location.href = `/login`;
    }
  };

  return (
    <AuthGuard>
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
              leftSection={
                signOutLoading ? <Loader size="xs" /> : <IconLogout />
              }
              p="md"
              mt="xs"
              bdrs="sm"
              onClick={handleLogout}
              disabled={signOutLoading}
            />
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
}
