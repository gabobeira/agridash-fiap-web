'use client';

import { Title, TitleProps } from '@mantine/core';

export type FTitleProps = TitleProps;

export default function FTitle(props: Readonly<FTitleProps>) {
  return <Title {...props} />;
}
