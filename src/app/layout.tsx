import type { Metadata } from 'next';
import { Manrope, Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { AuthProvider } from '@/hooks/useAuth.tsx'; // Update import path

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Default Metadata (Applied to all pages unless overridden)
export const metadata: Metadata = {
  metadataBase: new URL('https://b12insight.com'), // Set your base URL
  title: {
    default: 'B12 Insight - Your Guide to Vitamin B12',
    template: '%s | B12 Insight', // Template for page-specific titles
  },
  description: 'Your comprehensive guide to understanding Vitamin B12, its sources, deficiency symptoms, and finding community support. Explore resources, check symptoms, and connect.',
  keywords: ['Vitamin B12', 'B12 Deficiency', 'Cobalamin', 'Symptoms', 'Sources', 'Vegan B12', 'Supplements', 'Health', 'Wellness', 'Community'],
  authors: [{ name: 'B12 Insight Team' }],
  // category: 'Health & Wellness',
  alternates: {
     canonical: '/', // Default canonical URL
   },
  openGraph: {
    title: 'B12 Insight - Your Guide to Vitamin B12',
    description: 'Your comprehensive guide to understanding Vitamin B12, its sources, deficiency symptoms, and finding community support.',
    url: 'https://b12insight.com', // Use the base URL
    siteName: 'B12 Insight',
    images: [
      {
        url: '/og-default.png', // Default OG image in /public
        width: 1200,
        height: 630,
        alt: 'B12 Insight Website Logo and Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
      card: 'summary_large_image',
      title: 'B12 Insight - Your Guide to Vitamin B12',
      description: 'Your comprehensive guide to understanding Vitamin B12, its sources, deficiency symptoms, and finding community support.',
      // site: '@B12Insight', // Replace with your Twitter handle
      // creator: '@YourCreatorHandle', // Optional: Creator handle
      images: ['/twitter-default.png'], // Default Twitter image in /public
   },
   robots: { // Ensure search engine visibility
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
  // manifest: '/manifest.json', // If you add a PWA manifest
  // icons: { // Provide various icon sizes
  //   icon: [
  //     { url: '/favicon.ico' },
  //     { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
  //     { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  //   ],
  //   apple: '/apple-touch-icon.png', // Apple touch icon
  // },
  charset: 'utf-8', // Explicitly set charset
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true} // Still needed for potential browser extension issues
        className={cn(
          'min-h-screen bg-background font-sans antialiased', // Use Tailwind's font-sans which defaults to Inter now
          inter.variable, // Apply Inter variable
          playfairDisplay.variable, // Apply Playfair Display variable
          manrope.variable // Apply Manrope variable
        )}
      >
        <AuthProvider> {/* Wrap content with AuthProvider */}
          <Header />
          <main className="pt-12 pb-20 md:pt-16">
            {children}
          </main>
          <Toaster />
        </AuthProvider> {/* Close AuthProvider */}
      </body>
    </html>
  );
}
