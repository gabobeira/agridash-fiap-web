'use client';

import { Text, TextProps } from '@mantine/core';
import { ReactNode } from 'react';

export interface FTextProps extends TextProps {
  readonly children?: ReactNode;
}

export default function FText({ children, ...props }: Readonly<FTextProps>) {
  return <Text {...props}>{children}</Text>;
}
