'use client';

import { TextInput, TextInputProps } from '@mantine/core';

export type FInputProps = TextInputProps;

export default function FInput(props: Readonly<FInputProps>) {
  return <TextInput {...props} />;
}
