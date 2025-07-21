'use client';

import { Container, ContainerProps } from '@mantine/core';

export type FContainerProps = ContainerProps;

export default function FContainer(props: Readonly<FContainerProps>) {
  return <Container {...props} />;
}
