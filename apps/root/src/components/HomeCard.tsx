import { Card, Stack, Text, Title } from '@mantine/core';

export const HomeCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card padding="lg" withBorder h="100%">
    <Stack align="center" gap="sm">
      {icon}
      <Title order={4} ta="center" c="neutral.5" size="md">
        {title}
      </Title>
      <Text ta="center" c="dimmed" size="sm">
        {description}
      </Text>
    </Stack>
  </Card>
);
