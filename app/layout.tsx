import PasscodeCard from '@/components/PasscodeCard';
import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PasscodeCard />
      </body>
    </html>
  );
}
