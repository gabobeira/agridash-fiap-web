'use client';

import {
  Card as MantineCard,
  CardProps as MantineCardProps,
  Title,
} from '@mantine/core';

export interface FCardProps extends Omit<MantineCardProps, 'title'> {
  title?: string;
}

export default function FCard({
  title,
  children,
  ...props
}: Readonly<FCardProps>) {
  return (
    <MantineCard shadow="sm" padding="lg" radius="lg" withBorder {...props}>
      {title && (
        <Title order={3} mb="md">
          {title}
        </Title>
      )}
      {children}
    </MantineCard>
  );
}
