'use client';

import {
  Box,
  Code,
  Group,
  ScrollArea,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import React from 'react';

export interface FNavbarLink {
  icon: React.ComponentType<{ size?: number; stroke?: number }>;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface FNavbarProps {
  title?: string;
  version?: string;
  logo?: React.ReactNode;
  links: FNavbarLink[];
  onLogout?: () => void;
  width?: number;
  className?: string;
  children?: React.ReactNode;
}

interface NavbarLinkProps {
  icon: React.ComponentType<{ size?: number; stroke?: number }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
}: Readonly<NavbarLinkProps>) {
  return (
    <UnstyledButton
      onClick={onClick}
      data-active={active || undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: '14px',
        color: '#868e96',
        padding: '8px 12px',
        borderRadius: '4px',
        fontWeight: 500,
        cursor: 'pointer',
        width: '100%',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.backgroundColor = '#f8f9fa';
          e.currentTarget.style.color = '#212529';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#868e96';
        }
      }}
      {...(active && {
        style: {
          ...{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: '14px',
            padding: '8px 12px',
            borderRadius: '4px',
            fontWeight: 500,
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s ease',
          },
          backgroundColor: 'rgba(51, 154, 240, 0.1)',
          color: '#339af0',
        },
      })}
    >
      <Icon size={18} stroke={1.5} />
      <Box ml="sm">{label}</Box>
    </UnstyledButton>
  );
}

export default function FNavbar({
  title = 'Mantine',
  version = 'v3.1.2',
  logo,
  links,
  onLogout,
  width = 300,
  className,
  children,
}: Readonly<FNavbarProps>) {
  const linkElements = links.map((link, index) => (
    <NavbarLink
      key={`${link.label}-${index}`}
      icon={link.icon}
      label={link.label}
      active={link.active}
      onClick={link.onClick}
    />
  ));

  return (
    <Box
      style={{
        width: width,
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e9ecef',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
      }}
      className={className}
    >
      {/* Header */}
      <Box mb="md">
        <Group justify="space-between" align="center">
          <Group align="center">
            {logo}
            <Text size="lg" fw={500} style={{ color: '#212529' }}>
              {title}
            </Text>
          </Group>
          <Code fw={700}>{version}</Code>
        </Group>
      </Box>

      {/* Main Navigation Links */}
      <ScrollArea style={{ flex: 1 }} scrollbarSize={6} offsetScrollbars>
        <Box mt="md">
          {linkElements}
          {children}
        </Box>
      </ScrollArea>

      {/* Footer */}
      <Box
        style={{
          paddingTop: '16px',
          marginTop: '16px',
          borderTop: '1px solid #e9ecef',
        }}
      >
        {onLogout && (
          <NavbarLink icon={IconLogout} label="Logout" onClick={onLogout} />
        )}
      </Box>
    </Box>
  );
}
