'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

const svgPathData1 = "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z";
const svgPathData2 = "M3.8 20.2c-2.04-2.03-.02-7.36 4.5-11.9 4.54-4.52 9.87-6.54 11.9-4.5 2.04 2.03.02 7.36-4.5 11.9-4.54 4.52-9.87 6.54 11.9 4.5Z";

export function Footer() {
  const currentYear = new Date().getFullYear();

   const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/b12insight_official' }, // Use more specific placeholders
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/b12_insight' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/b12insight' },
  ];

  return (
    <footer className="bg-muted/60 border-t border-border/50 mt-auto"> {/* mt-auto pushes footer down */}
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="flex items-center gap-2 mb-3" aria-label="B12 Insight Home">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom transition-transform duration-300 hover:rotate-12">
                    <circle cx="12" cy="12" r="1"/>
                    <path d={svgPathData1}/>
                    <path d={svgPathData2}/>
                </svg>
                <span className="font-bold text-lg text-primary font-serif tracking-tight">B12 Insight</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
              Your comprehensive guide to understanding Vitamin B12.
            </p>
            <div className="flex gap-3 mt-4">
                 {socialLinks.map((link) => (
                   <Button key={link.name} variant="outline" size="icon" className="rounded-full w-9 h-9 hover:bg-primary/10 border-primary/30" asChild>
                     <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                       <link.icon className="w-4 h-4 text-primary/80" />
                     </Link>
                   </Button>
                 ))}
               </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-primary mb-3 text-center md:text-left">Quick Links</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground text-center md:text-left">
              <li><Link href="/about-b12" className="hover:text-primary hover:underline">About B12</Link></li>
              <li><Link href="/sources-of-b12" className="hover:text-primary hover:underline">Sources</Link></li>
              <li><Link href="/b12-deficiency-symptoms" className="hover:text-primary hover:underline">Symptoms</Link></li>
              <li><Link href="/resources" className="hover:text-primary hover:underline">Resources</Link></li>
              <li><Link href="/community" className="hover:text-primary hover:underline">Community</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-primary mb-3 text-center md:text-left">Support</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground text-center md:text-left">
              <li><Link href="/contact" className="hover:text-primary hover:underline">Contact Us</Link></li>
              <li><Link href="/contact#faq" className="hover:text-primary hover:underline">FAQs</Link></li>
              {/* <li><Link href="/feedback" className="hover:text-primary hover:underline">Feedback</Link></li> */}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-primary mb-3 text-center md:text-left">Legal</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground text-center md:text-left">
              <li><Link href="/legal" className="hover:text-primary hover:underline">Terms of Service</Link></li>
              <li><Link href="/legal#privacy-policy" className="hover:text-primary hover:underline">Privacy Policy</Link></li>
              <li><Link href="/legal#cookie-policy" className="hover:text-primary hover:underline">Cookie Policy</Link></li>
              <li><Link href="/legal#medical-disclaimer" className="hover:text-primary hover:underline">Medical Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 bg-border/70" />

        <div className="text-center text-xs text-muted-foreground">
          &copy; {currentYear} B12 Insight. All rights reserved. <br className="sm:hidden"/>
          <span className="hidden sm:inline"> | </span>
           The information on this site is for educational purposes only and is not medical advice.
        </div>
      </div>
    </footer>
  );
}
