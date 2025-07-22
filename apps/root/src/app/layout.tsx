import { Center, Container, Stack, Text } from '@mantine/core';
import { MantineProvider } from '@repo/ui';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AgriDash - Sistema de Gestão de Cooperativas Agrícolas',
  description:
    'Solução estratégica para gestão de vendas e planejamento assertivo dos alimentos com maior lucro para os integrantes da cooperativa.',
  icons: {
    icon: '/plant-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 flex flex-col">
            <div className="flex-1 flex items-center">{children}</div>
            <footer className="mt-auto">
              <Container size="xl">
                <Center py="xl">
                  <Stack align="center" gap="sm">
                    <Text size="sm" c="dimmed" ta="center">
                      © 2025 FIAP Farms - Cooperativa de Fazendas
                    </Text>
                    <Text size="xs" c="dimmed" ta="center" opacity={0.7}>
                      Solução desenvolvida para otimizar a gestão estratégica da
                      cooperativa
                    </Text>
                  </Stack>
                </Center>
              </Container>
            </footer>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
