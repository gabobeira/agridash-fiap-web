'use client';

import { Table, Card, Badge, Text, Group, ActionIcon } from '@mantine/core';
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react';

export interface DataRow {
  id: string;
  sensorName: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface DataTableProps {
  title?: string;
  data: DataRow[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusColors = {
  normal: 'green',
  warning: 'yellow',
  critical: 'red',
};

export default function DataTable({
  title = 'Dados dos Sensores',
  data,
  onView,
  onEdit,
  onDelete,
}: Readonly<DataTableProps>) {
  const rows = data.map(row => (
    <Table.Tr key={row.id}>
      <Table.Td>
        <Text fw={500}>{row.sensorName}</Text>
      </Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td>
        <Text fw={600}>
          {row.value} {row.unit}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color={statusColors[row.status]} variant="light">
          {row.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {new Date(row.timestamp).toLocaleString('pt-BR')}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          {onView && (
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => onView(row.id)}
            >
              <IconEye size={16} />
            </ActionIcon>
          )}
          {onEdit && (
            <ActionIcon
              variant="subtle"
              color="orange"
              onClick={() => onEdit(row.id)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          )}
          {onDelete && (
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(row.id)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={500} size="lg" mb="md">
        {title}
      </Text>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Sensor</Table.Th>
            <Table.Th>Tipo</Table.Th>
            <Table.Th>Valor</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Timestamp</Table.Th>
            <Table.Th>Ações</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
}
