'use client';

import { Table, Card, Text } from '@mantine/core';

export interface FTableHeader {
  key: string;
  label: string;
  width?: string;
}

export interface FTableProps {
  title?: string;
  headers: FTableHeader[];
  data: Record<string, unknown>[];
  striped?: boolean;
  highlightOnHover?: boolean;
  withBorder?: boolean;
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  renderCell?: (
    key: string,
    value: unknown,
    row: Record<string, unknown>
  ) => React.ReactNode;
}

export default function FTable({
  title,
  headers,
  data,
  striped = true,
  highlightOnHover = true,
  withBorder = true,
  radius = 'md',
  shadow = 'sm',
  renderCell,
}: Readonly<FTableProps>) {
  const rows = data.map((row, index) => (
    <Table.Tr key={(row.id as string) || `row-${index}`}>
      {headers.map(header => (
        <Table.Td key={header.key} style={{ width: header.width }}>
          {renderCell
            ? renderCell(header.key, row[header.key], row)
            : (row[header.key] as React.ReactNode)}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Card shadow={shadow} padding="lg" radius={radius} withBorder={withBorder}>
      {title && (
        <Text fw={500} size="lg" mb="md">
          {title}
        </Text>
      )}
      <Table striped={striped} highlightOnHover={highlightOnHover}>
        <Table.Thead>
          <Table.Tr>
            {headers.map(header => (
              <Table.Th key={header.key} style={{ width: header.width }}>
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
}
