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

// Default metadata for the entire application
export const metadata: Metadata = {
  // Define a base URL for canonical links and Open Graph images if needed
  metadataBase: new URL('https://b12insight.com'), // Replace with your actual domain
  title: {
    default: 'B12 Insight - Your Guide to Vitamin B12',
    template: '%s | B12 Insight', // Template for page titles
  },
  description: 'Your comprehensive guide to understanding Vitamin B12, its sources, deficiency symptoms, and living better. Explore resources, check symptoms, and connect.', // Default description
  alternates: {
     canonical: '/', // Default canonical URL
   },
  openGraph: {
    title: 'B12 Insight - Your Guide to Vitamin B12',
    description: 'Your comprehensive guide to understanding Vitamin B12, its sources, deficiency symptoms, and living better.',
    url: 'https://b12insight.com', // Default OG URL
    siteName: 'B12 Insight',
    // IMPORTANT: Replace with your actual preview image URL
    images: [
      {
        url: 'https://b12insight.com/og-image.png', // Placeholder OG image URL
        width: 1200,
        height: 630,
        alt: 'B12 Insight Website Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
      card: 'summary_large_image',
      title: 'B12 Insight - Your Guide to Vitamin B12',
      description: 'Your comprehensive guide to understanding Vitamin B12, its sources, deficiency symptoms, and living better.',
      // site: '@yourtwitterhandle', // Add twitter handle if available
      // creator: '@creatorhandle', // Add creator handle if available
      // IMPORTANT: Replace with your actual preview image URL
      images: ['https://b12insight.com/twitter-image.png'], // Placeholder Twitter image URL
   },
   robots: { // Default robots policy
     index: true,
     follow: true,
     googleBot: {
       index: true,
       follow: true,
       'max-video-preview': -1,
       'max-image-preview': 'large',
       'max-snippet': -1,
     },
   },
   // Charset is handled by Next.js automatically
};


// --- Root Layout Component ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      {/* Added suppressHydrationWarning to body as well to potentially mitigate extension interference */}
      <body
        suppressHydrationWarning={true} // Keep this if you still face hydration issues from extensions
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
