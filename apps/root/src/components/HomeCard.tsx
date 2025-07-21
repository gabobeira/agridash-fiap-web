import { Stack, Title, Text, Card } from '@mantine/core';

export const HomeCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card
    padding="lg"
    withBorder
    h="100%"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
    }}
  >
    <Stack align="center" gap="sm">
      {icon}
      <Title order={4} ta="center" c="white" size="md">
        {title}
      </Title>
      <Text ta="center" c="dimmed" size="sm">
        {description}
      </Text>
    </Stack>
  </Card>
);
