'use client';

import { Card, Center, Flex, Pagination, Table, Text } from '@mantine/core';

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
  activePage?: number;
  onChangePage?: (page: number) => void;
  totalPages?: number;
  paginate?: boolean;
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
  activePage = 1,
  onChangePage = () => {},
  totalPages = 1,
  paginate = false,
}: Readonly<FTableProps>) {
  const rows = data.map((row, index) => (
    <Table.Tr key={(row.id as string) || `row-${index}`}>
      {headers.map(header => (
        <Table.Td key={header.key} style={{ width: header.width }} p="md">
          {renderCell
            ? renderCell(header.key, row[header.key], row)
            : (row[header.key] as React.ReactNode)}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <>
      <Card
        shadow={shadow}
        padding="lg"
        radius={radius}
        withBorder={withBorder}
      >
        {title && (
          <Text fw={500} size="lg" mb="md">
            {title}
          </Text>
        )}
        {data.length ? (
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
        ) : (
          <Center w="100%" h={100} bg="neutral.0" bdrs="md">
            <Text c="neutral.4" size="sm">
              Não há dados para exibir!
            </Text>
          </Center>
        )}
      </Card>
      {paginate && (
        <Flex justify="flex-end" mt="md">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={onChangePage}
          />
        </Flex>
      )}
    </>
  );
}
