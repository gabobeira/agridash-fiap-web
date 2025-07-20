'use client';

import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from '@mantine/core';

export type ButtonProps = MantineButtonProps;

export default function Button(props: Readonly<ButtonProps>) {
  return <MantineButton {...props} />;
}
