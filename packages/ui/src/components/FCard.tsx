import { Card, CardProps, Stack, Text, Title } from '@mantine/core';

export default function FCard({
  title,
  subtitle,
  children,
  customProps,
}: Readonly<{
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  customProps?: CardProps;
}>) {
  return (
    <Card p="lg" withBorder {...customProps}>
      <Stack>
        {title && <Title order={4}>{title}</Title>}
        {subtitle && (
          <Text mb="xl" size="xs" c="neutral.5">
            {subtitle}
          </Text>
        )}
        {children}
      </Stack>
    </Card>
  );
}
