import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cartop Admin',
  description: 'Cartop Administration Panel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
