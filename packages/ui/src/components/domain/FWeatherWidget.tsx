'use client';

import { Card, Text, Group, Stack, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconSun, IconCloud, IconDroplet, IconWind } from '@tabler/icons-react';

export interface FWeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  location: string;
}

const weatherIcons = {
  sunny: IconSun,
  cloudy: IconCloud,
  rainy: IconDroplet,
};

const weatherColors = {
  sunny: 'yellow',
  cloudy: 'gray',
  rainy: 'blue',
};

export default function FWeatherWidget({
  weather,
}: Readonly<{ weather: FWeatherData }>) {
  const WeatherIcon = weatherIcons[weather.condition];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="lg">
        <div>
          <Text fw={500} size="lg">
            Condições Meteorológicas
          </Text>
          <Text size="sm" c="dimmed">
            {weather.location}
          </Text>
        </div>
        <ThemeIcon
          color={weatherColors[weather.condition]}
          variant="light"
          size={50}
        >
          <WeatherIcon size={30} />
        </ThemeIcon>
      </Group>

      <SimpleGrid cols={3} spacing="md">
        <Stack align="center" gap="xs">
          <Text size="xl" fw={700}>
            {weather.temperature}°C
          </Text>
          <Text size="sm" c="dimmed">
            Temperatura
          </Text>
        </Stack>

        <Stack align="center" gap="xs">
          <Group gap={4}>
            <IconDroplet size={16} color="blue" />
            <Text size="xl" fw={700}>
              {weather.humidity}%
            </Text>
          </Group>
          <Text size="sm" c="dimmed">
            Umidade
          </Text>
        </Stack>

        <Stack align="center" gap="xs">
          <Group gap={4}>
            <IconWind size={16} color="gray" />
            <Text size="xl" fw={700}>
              {weather.windSpeed}
            </Text>
          </Group>
          <Text size="sm" c="dimmed">
            km/h
          </Text>
        </Stack>
      </SimpleGrid>
    </Card>
  );
}
