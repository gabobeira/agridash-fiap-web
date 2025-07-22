import { Title } from '@mantine/core';

export const MainTitle = ({ children }: { children: React.ReactNode }) => (
  <Title
    order={1}
    size="3.5rem"
    ta="center"
    fw={800}
    style={{
      background:
        'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}
  >
    {children}
  </Title>
);
