'use client';

import { PasswordInput, PasswordInputProps } from '@mantine/core';

export type FPasswordInputProps = PasswordInputProps;

export default function FPasswordInput(props: Readonly<FPasswordInputProps>) {
  return <PasswordInput {...props} />;
}
