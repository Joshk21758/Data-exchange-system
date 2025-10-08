import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link'; // Import Link

export const metadata: Metadata = {
  title: 'CityFlow',
  description: 'Inter-ministry Data Exchange System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {/* Redirect base route to /login */}
        {
          process.env.NODE_ENV === 'production' && (
            <noscript>
              <meta http-equiv="refresh" content="0;url=/login" />
            </noscript>
          )
        }
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
