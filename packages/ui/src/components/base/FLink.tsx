'use client';

import { Anchor } from '@mantine/core';
import { ReactNode } from 'react';

export interface FLinkProps {
  readonly children?: ReactNode;
  readonly href?: string;
  readonly onClick?: () => void;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export default function FLink({ children, ...props }: Readonly<FLinkProps>) {
  return <Anchor {...props}>{children}</Anchor>;
}
