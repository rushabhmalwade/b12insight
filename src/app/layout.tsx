import type { Metadata } from 'next';
import { Manrope } from 'next/font/google'; // Import Manrope
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { Header } from '@/components/layout/header'; // Import Header

// Configure Manrope font
const manrope = Manrope({
  variable: '--font-manrope', // Use --font-manrope
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add necessary weights
});


export const metadata: Metadata = {
  title: 'B12 Insight', // Update title
  description: 'Your guide to understanding Vitamin B12 and living better.', // Update description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          manrope.variable // Apply Manrope font variable
        )}
        suppressHydrationWarning={true} // Add suppressHydrationWarning here as well
      >
        <Header /> {/* Add Header */}
        <main className="pt-8 pb-16"> {/* Adjust padding for main content */}
          {children}
        </main>
        <Toaster /> {/* Add Toaster */}
      </body>
    </html>
  );
}
