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
    // images: [ // Add a default OG image if available
    //   {
    //     url: 'https://b12insight.com/og-image.png', // Replace with your actual image URL
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
      card: 'summary_large_image',
      title: 'B12 Insight - Your Guide to Vitamin B12',
      description: 'Your comprehensive guide to understanding Vitamin B12, its sources, deficiency symptoms, and living better.',
      // site: '@yourtwitterhandle', // Add twitter handle if available
      // creator: '@creatorhandle', // Add creator handle if available
      // images: ['https://b12insight.com/twitter-image.png'], // Replace with your actual image URL
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


// --- Metadata for specific pages (Exported constants) ---
// These can be imported and used in generateMetadata functions in specific page.tsx/layout.tsx files

export const metadataHomePage: Metadata = {
  title: 'B12 Insight - Your Guide to Vitamin B12', // Specific title for home
  description: 'Discover the importance of Vitamin B12, identify symptoms of deficiency, explore sources, and connect with our community. Start your journey to better health.',
  alternates: { canonical: '/' },
};

export const metadataAboutPage: Metadata = {
  title: 'About Vitamin B12 (Cobalamin)',
  description: 'Learn what Vitamin B12 is, its crucial roles in the body (DNA synthesis, nerve health, energy), recommended daily dosages, and common myths vs. facts.',
  alternates: { canonical: '/about-b12' },
};

export const metadataSourcesPage: Metadata = {
   title: 'Sources of Vitamin B12',
   description: 'Explore natural animal sources, reliable plant-based/vegan options (fortified foods), and various B12 supplements (oral, sublingual, injection). Compare sources and use our AI diet planner.',
   alternates: { canonical: '/sources-of-b12' },
 };

export const metadataSymptomsPage: Metadata = {
   title: 'B12 Deficiency Symptoms & Diagnosis',
   description: 'Recognize common B12 deficiency symptoms (neurological, physical, psychological, oral), identify risk groups, understand testing methods, and use our AI assessment tool.',
   alternates: { canonical: '/b12-deficiency-symptoms' },
 };

 export const metadataResourcesPage: Metadata = {
   title: 'B12 Resources & Learning Hub',
   description: 'Explore articles, expert videos, and downloadable guides on Vitamin B12. Filter by topic, search for information, and deepen your understanding.',
   alternates: { canonical: '/resources' },
 };

 export const metadataContactPage: Metadata = {
   title: 'Contact Us',
   description: 'Get in touch with B12 Insight via our contact form or email. Find answers in our FAQs or connect with us on social media.',
   alternates: { canonical: '/contact' },
 };

 export const metadataLegalPage: Metadata = {
  title: 'Legal Information & Policies',
  description: 'Review the Terms of Service, Privacy Policy, Cookie Policy, and Medical Disclaimer for B12 Insight. Understand your rights and our commitments.',
  alternates: { canonical: '/legal' },
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
