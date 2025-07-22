import { Container, Text, Title } from '@mantine/core';

export const DashboardMain = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <Container maw="8xl" size="xl" py="xl">
    <header className="mb-8 space-y-2">
      <Title order={1}>{title}</Title>
      <Text c="neutral.5">{subtitle}</Text>
    </header>
    <main>{children}</main>
  </Container>
);
