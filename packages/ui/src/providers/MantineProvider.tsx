'use client';

import { MantineProvider as BaseMantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export interface MantineProviderProps {
  readonly children: React.ReactNode;
}

export default function MantineProvider({
  children,
}: Readonly<MantineProviderProps>) {
  return <BaseMantineProvider>{children}</BaseMantineProvider>;
}
