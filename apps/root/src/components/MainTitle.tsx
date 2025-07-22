import { Title } from '@mantine/core';

export const MainTitle = ({ children }: { children: React.ReactNode }) => (
  <Title
    order={1}
    size="3.5rem"
    ta="center"
    fw={800}
    style={{
      background:
        'linear-gradient(135deg, var(--mantine-color-success-6) 0%, var(--mantine-color-blue-6) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}
  >
    {children}
  </Title>
);
