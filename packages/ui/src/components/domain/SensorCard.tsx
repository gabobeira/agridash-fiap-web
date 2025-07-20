'use client';

import { Card, Text, Group, Badge, Progress, ThemeIcon } from '@mantine/core';
import { IconThermometer, IconDroplet, IconLeaf } from '@tabler/icons-react';

export interface SensorCardProps {
  sensorName: string;
  sensorType: 'temperature' | 'humidity' | 'ph';
  currentValue: number;
  unit: string;
  minValue: number;
  maxValue: number;
  status: 'normal' | 'warning' | 'critical';
  location?: string;
}

const sensorIcons = {
  temperature: IconThermometer,
  humidity: IconDroplet,
  ph: IconLeaf,
};

const statusColors = {
  normal: 'green',
  warning: 'yellow',
  critical: 'red',
};

export default function SensorCard({
  sensorName,
  sensorType,
  currentValue,
  unit,
  minValue,
  maxValue,
  status,
  location,
}: Readonly<SensorCardProps>) {
  const Icon = sensorIcons[sensorType];
  const percentage = ((currentValue - minValue) / (maxValue - minValue)) * 100;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon color={statusColors[status]} variant="light" size={40}>
            <Icon size={20} />
          </ThemeIcon>
          <div>
            <Text fw={500} size="lg">
              {sensorName}
            </Text>
            {location && (
              <Text size="sm" c="dimmed">
                {location}
              </Text>
            )}
          </div>
        </Group>
        <Badge color={statusColors[status]} variant="light">
          {status}
        </Badge>
      </Group>

      <Text size="xl" fw={700} ta="center" my="md">
        {currentValue}
        <Text component="span" size="sm" c="dimmed" ml={4}>
          {unit}
        </Text>
      </Text>

      <Progress
        value={percentage}
        color={statusColors[status]}
        size="lg"
        radius="xl"
        mb="xs"
      />

      <Group justify="space-between" mt="md">
        <Text size="sm" c="dimmed">
          Min: {minValue}
          {unit}
        </Text>
        <Text size="sm" c="dimmed">
          Max: {maxValue}
          {unit}
        </Text>
      </Group>
    </Card>
  );
}
