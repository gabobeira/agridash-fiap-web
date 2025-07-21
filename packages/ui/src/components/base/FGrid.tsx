'use client';

import { Grid, GridCol, GridProps, GridColProps } from '@mantine/core';
import { ReactNode } from 'react';

export interface FGridProps extends Omit<GridProps, 'children'> {
  readonly children?: ReactNode;
}

export interface FGridColProps extends GridColProps {
  readonly children?: ReactNode;
}

export function FGrid({ children, ...props }: Readonly<FGridProps>) {
  return <Grid {...props}>{children}</Grid>;
}

export function FGridCol({ children, ...props }: Readonly<FGridColProps>) {
  return <GridCol {...props}>{children}</GridCol>;
}

export default FGrid;
