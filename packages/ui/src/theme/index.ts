'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

// Define cores customizadas para o tema
const success: MantineColorsTuple = [
  '#f0fdf4',
  '#dcfce7',
  '#bbf7d0',
  '#86efac',
  '#4ade80',
  '#22c55e',
  '#16a34a',
  '#15803d',
  '#166534',
  '#14532d',
];

const brand: MantineColorsTuple = [
  '#f0f9ff',
  '#e0f2fe',
  '#bae6fd',
  '#7dd3fc',
  '#38bdf8',
  '#0ea5e9',
  '#0284c7',
  '#0369a1',
  '#075985',
  '#0c4a6e',
];

const warning: MantineColorsTuple = [
  '#fffbeb',
  '#fef3c7',
  '#fde68a',
  '#fcd34d',
  '#fbbf24',
  '#f59e0b',
  '#d97706',
  '#b45309',
  '#92400e',
  '#78350f',
];

const danger: MantineColorsTuple = [
  '#fef2f2',
  '#fee2e2',
  '#fecaca',
  '#fca5a5',
  '#f87171',
  '#ef4444',
  '#dc2626',
  '#b91c1c',
  '#991b1b',
  '#7f1d1d',
];

const fiap: MantineColorsTuple = [
  '#fef7f7',
  '#fdeaea',
  '#fbc7d1',
  '#f89eb5',
  '#f4749a',
  '#f04d82',
  '#ed145b',
  '#d10e4a',
  '#b50c3e',
  '#9a0a35',
];

const neutral: MantineColorsTuple = [
  '#f3f4f6',
  '#e5e7eb',
  '#d1d5db',
  '#9ca3af',
  '#6b7280',
  '#4b5563',
  '#374151',
  '#27303a',
  '#23272f',
  '#212529',
];

export const theme = createTheme({
  colors: {
    success,
    brand,
    warning,
    danger,
    fiap,
    neutral,
  },
  primaryColor: 'brand',
  defaultGradient: {
    from: 'success.6',
    to: 'blue.6',
    deg: 45,
  },
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
  focusRing: 'auto',
  cursorType: 'pointer',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
      },
    },
    Input: {
      defaultProps: {
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
      },
    },
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
  },
  other: {
    gradients: {
      primary:
        'linear-gradient(45deg, var(--mantine-color-success-6), var(--mantine-color-success-8))',
      secondary:
        'linear-gradient(45deg, var(--mantine-color-brand-6), var(--mantine-color-brand-8))',
      danger:
        'linear-gradient(45deg, var(--mantine-color-danger-6), var(--mantine-color-danger-8))',
      warning:
        'linear-gradient(45deg, var(--mantine-color-warning-6), var(--mantine-color-warning-8))',
      fiap: 'linear-gradient(45deg, var(--mantine-color-fiap-6), var(--mantine-color-fiap-8))',
      dark: 'linear-gradient(135deg, var(--mantine-color-neutral-9), var(--mantine-color-neutral-8), var(--mantine-color-success-9))',
    },
    shadows: {
      soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      medium:
        '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      hard: '0 10px 40px -10px rgba(0, 0, 0, 0.2), 0 25px 50px -12px rgba(0, 0, 0, 0.4)',
    },
  },
});
