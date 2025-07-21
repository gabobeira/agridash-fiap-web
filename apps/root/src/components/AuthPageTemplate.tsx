'use client';

import { Stack, Container, Group, Title, Card, Anchor } from '@mantine/core';
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
    <div className="min-h-screen bg-neutral-800 flex flex-col">
      <div className="flex-1 flex items-center">
        <Container size="xl" py="xl">
          <Anchor href="/">
            <div className="mb-4 inline-flex items-center text-neutral-300 hover:text-neutral-100 transition-colors">
              <IconChevronLeft size={20} className="mr-2" />
              Voltar para a página inicial
            </div>
          </Anchor>
          <Card padding="xl" miw={400} mx="auto">
            <Stack gap="lg">
              <Title order={3} c="neutral.8">
                {title}
              </Title>
              {content}
              <Group justify="center">{footer}</Group>
            </Stack>
          </Card>
        </Container>
      </div>
    </div>
  );
};
