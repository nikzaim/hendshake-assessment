// app/layout.tsx
import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo List App',
  description: 'A simple todo list application with Next.js and shadcn/ui',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}