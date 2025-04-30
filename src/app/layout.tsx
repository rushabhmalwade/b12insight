import type { Metadata } from 'next';
import { Manrope, Playfair_Display, Inter } from 'next/font/google'; // Import Playfair Display and Inter
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { Header } from '@/components/layout/header'; // Import Header

// Configure Inter font for body text (primary font)
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap', // Improve font loading
  weight: ['400', '500', '600', '700'], // Add necessary weights
});

// Configure Playfair Display font for headings
const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'], // Add necessary weights
});

// Configure Manrope font (optional/secondary)
const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
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
      {/* Added suppressHydrationWarning to body as well to potentially mitigate extension interference */}
      <body
        suppressHydrationWarning={true}
        className={cn(
          'min-h-screen bg-background font-sans antialiased', // Use Tailwind's font-sans which defaults to Inter now
          inter.variable, // Apply Inter variable
          playfairDisplay.variable, // Apply Playfair Display variable
          manrope.variable // Apply Manrope variable (available for specific use)
        )}
      >
        <Header /> {/* Add Header */}
        {/* Increased top padding for more space below header, adjusted bottom padding */}
        <main className="pt-12 pb-20 md:pt-16">
          {children}
        </main>
        <Toaster /> {/* Add Toaster */}
      </body>
    </html>
  );
}
