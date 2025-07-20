'use client';

import { TextInput, TextInputProps } from '@mantine/core';

export type InputProps = TextInputProps;

export default function Input(props: Readonly<InputProps>) {
  return <TextInput {...props} />;
}
