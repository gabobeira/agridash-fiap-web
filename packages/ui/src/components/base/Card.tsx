'use client';

import {
  Card as MantineCard,
  CardProps as MantineCardProps,
  Title,
} from '@mantine/core';

export interface CardProps extends Omit<MantineCardProps, 'title'> {
  title?: string;
}

export default function Card({
  title,
  children,
  ...props
}: Readonly<CardProps>) {
  return (
    <MantineCard shadow="sm" padding="lg" radius="md" withBorder {...props}>
      {title && (
        <Title order={3} mb="md">
          {title}
        </Title>
      )}
      {children}
    </MantineCard>
  );
}
