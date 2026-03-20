/**
 * layout.tsx
 *
 * Root layout with font imports and navigation.
 *
 * @author claude — 2026-03-20
 */

import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Qwi Count',
  description: 'A fast, beautiful score tracker for tile games',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FEFBF6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased pb-20">
        {children}
        <Navigation />
      </body>
    </html>
  );
}
