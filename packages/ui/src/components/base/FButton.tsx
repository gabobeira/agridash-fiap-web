'use client';

import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from '@mantine/core';

export type FButtonProps = MantineButtonProps;

export default function FButton(props: Readonly<FButtonProps>) {
  return <MantineButton {...props} />;
}
