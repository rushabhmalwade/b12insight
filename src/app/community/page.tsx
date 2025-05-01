'use client';

import React from 'react';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus, Users, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Note: Metadata cannot be exported from a 'use client' component.
// Define page metadata in layout.tsx or parent Server Components if needed.

// Placeholder for Metadata if this were a Server Component
// export const metadata: Metadata = {
//   title: 'Community Forum | B12 Insight',
//   description: 'Connect with others, share your B12 journey, ask questions, and find support in the B12 Insight community forum.',
//   alternates: {
//     canonical: '/community',
//   },
//   openGraph: {
//     title: 'Community Forum | B12 Insight',
//     description: 'Join the B12 Insight community to share experiences and find support.',
//     url: 'https://b12insight.com/community',
//     images: [
//       {
//         url: 'https://b12insight.com/og-community.png', // Replace with specific OG image
//         width: 1200,
//         height: 630,
//         alt: 'Illustration of people connecting in a community.',
//       },
//     ],
//   },
//   twitter: {
//     title: 'Community Forum | B12 Insight',
//     description: 'Join the B12 Insight community to share experiences and find support.',
//     images: ['https://b12insight.com/twitter-community.png'], // Replace with specific Twitter image
//   },
// };

export default function CommunityPage() {
  // In a real application, forum data would be fetched and displayed here.
  // For now, it's a placeholder.

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 space-y-12 md:space-y-16 font-inter">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 md:mb-12 text-center tracking-tight animate-fade-in">
        B12 Insight Community Forum
      </h1>

      {/* Introduction Card */}
      <Card className="shadow-lg rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="p-6 md:p-8">
          <CardTitle className="font-serif text-2xl md:text-3xl text-primary flex items-center gap-3 tracking-tight">
            <Users className="w-7 h-7 flex-shrink-0" /> Welcome to the Community!
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-base">
            Connect with fellow members, share your experiences with Vitamin B12, ask questions, offer support, and learn from others on their health journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 md:px-8 pb-6 space-y-4 text-base leading-relaxed text-foreground/90">
           <div className="flex justify-center items-center p-6 md:p-10 bg-gradient-to-br from-muted/30 to-secondary/20 rounded-xl shadow-inner border border-border/30 mb-6">
             <Image
                src="https://picsum.photos/seed/communityhero/500/300" // Placeholder image URL
                alt="Diverse group of people connecting and supporting each other"
                width={500}
                height={300}
                className="rounded-lg object-cover shadow-md"
                loading="lazy"
                data-ai-hint="community support people connecting"
              />
           </div>
          <p>
            This forum is a space for open discussion, sharing tips, and finding encouragement. Whether you're newly diagnosed, managing long-term deficiency, exploring vegan B12 sources, or supporting a loved one, you're welcome here.
          </p>
          <p>
            Browse existing topics or start a new discussion!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto" disabled> {/* Placeholder: Link to actual forum */}
                <MessageSquarePlus className="w-5 h-5 mr-2"/> Start a New Topic (Coming Soon)
             </Button>
              <Button size="lg" variant="outline" className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto" disabled> {/* Placeholder: Link to browse */}
                 Browse Topics (Coming Soon)
              </Button>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for Forum Content */}
       <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
         <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">
           Recent Discussions
          </h2>
           <Card className="shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
             <CardContent className="p-6 md:p-8 text-center text-muted-foreground">
               <p className="text-lg mb-4">The community forum is currently under development.</p>
               <p>Check back soon to join the conversation!</p>
               {/* Placeholder for loading state or actual forum embed */}
                <div className="mt-8 flex justify-center">
                     <Users className="w-16 h-16 text-primary/30" />
                </div>
             </CardContent>
           </Card>
       </section>


      {/* Community Guidelines & Disclaimer */}
      <Card className="mt-16 border-2 border-dashed border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/20 rounded-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <CardContent className="p-5 md:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-700 dark:text-amber-400 text-lg mb-2">Community Guidelines & Disclaimer</h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-amber-800/90 dark:text-amber-300/90">
                 <li>Be respectful and supportive of all members.</li>
                 <li>Share personal experiences, but refrain from giving medical advice.</li>
                 <li>Information shared in the forum is not a substitute for professional medical consultation.</li>
                 <li>Do not share sensitive personal health information you are not comfortable making public.</li>
                 <li>See our full <Link href="/legal" className="text-primary hover:underline font-medium">Terms of Service</Link> for more details.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}