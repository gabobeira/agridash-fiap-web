import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MantineProvider } from '@repo/ui';

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
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
