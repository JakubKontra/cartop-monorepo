import type { Metadata } from 'next';

import { Sora } from 'next/font/google';

import { QueryProvider } from '@/components/providers/QueryProvider';

import './globals.css';

const sora = Sora({
  display: 'auto',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sora',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  description: 'Cartop Frontend Application',
  title: 'Cartop',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={sora.variable} lang="en">
      <body className={sora.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
