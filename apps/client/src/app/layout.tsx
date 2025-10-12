import type { Metadata } from 'next';
import { Sora } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cartop',
  description: 'Cartop Frontend Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sora.variable}>
      <body className={sora.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
