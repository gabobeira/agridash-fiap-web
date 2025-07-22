'use client';

import { Anchor, Card, Container, Group, Stack, Title } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';

export const AuthPageTemplate = ({
  title,
  content,
  footer,
}: {
  title: string;
  content: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <Container size="xl" py="xl" className="flex flex-col items-center">
      <Card padding="xl" miw={400} mx="auto">
        <Stack gap="lg">
          <Title order={3} c="neutral.8">
            {title}
          </Title>
          {content}
          <Group justify="center">{footer}</Group>
        </Stack>
      </Card>
      <Anchor
        href="/"
        mt="xl"
        size="sm"
        c="neutral.5"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <IconChevronLeft size={20} />
        Voltar para a página inicial
      </Anchor>
    </Container>
  );
};
