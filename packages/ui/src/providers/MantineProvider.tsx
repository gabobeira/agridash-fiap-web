'use client';

import { MantineProvider as BaseMantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '../theme';

export interface MantineProviderProps {
  readonly children: React.ReactNode;
}

export default function MantineProvider({
  children,
}: Readonly<MantineProviderProps>) {
  return <BaseMantineProvider theme={theme}>{children}</BaseMantineProvider>;
}
