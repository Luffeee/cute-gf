'use client'
import PasscodeCard from '@/components/PasscodeCard';
import './globals.css';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        {pathname !== '/messages' && pathname !== '/updates' && <PasscodeCard />}
        {children}
      </body>
    </html>
  );
}
