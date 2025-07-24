import './globals.css';

import { AuthGuard } from '@/components/AuthGuard';
import DashboardLayout from '@/components/DashboardLayout';
import { AuthProvider } from '@agridash/api';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { FLoadingOverlay, MantineProvider } from '@repo/ui';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';

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
    icon: '/leaf.svg',
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
          <Notifications />
          <AuthProvider>
            <AuthGuard>
              <Suspense fallback={<FLoadingOverlay />}>
                <DashboardLayout>{children}</DashboardLayout>
              </Suspense>
            </AuthGuard>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
