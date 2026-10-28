import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Pico Foods | Fresh Bowls in Homagama',
  description: 'Explore Pico Foods chicken, prawn, thalapath fish, fresh salads, and protein-focused meals. Order freshly prepared bowls around Homagama, Sri Lanka.',
  icons: {
    icon: '/pico-foods-favicon.webp',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
