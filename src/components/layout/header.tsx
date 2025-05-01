'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn

// Consistent SVG path data
const svgPathData1 = "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z";
const svgPathData2 = "M3.8 20.2c-2.04-2.03-.02-7.36 4.5-11.9 4.54-4.52 9.87-6.54 11.9-4.5 2.04 2.03.02 7.36-4.5 11.9-4.54 4.52-9.87 6.54 11.9 4.5Z";


// Placeholder for theme toggle functionality - Improved for hydration safety
const ThemeToggle = () => {
    const [theme, setTheme] = useState<string | undefined>(undefined); // Start undefined
    const [mounted, setMounted] = useState(false);

     // Effect to set initial theme from localStorage or system preference
     useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(storedTheme || (prefersDark ? 'dark' : 'light'));
        setMounted(true); // Component is mounted
     }, []);

    // Effect to apply theme class only after mounting and when theme is defined
    useEffect(() => {
        if (mounted && theme) {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark'); // Remove both classes first
            root.classList.add(theme);
            localStorage.setItem('theme', theme); // Save theme preference
        }
    }, [theme, mounted]);


    const toggleTheme = () => {
        if (theme) { // Only toggle if theme is defined
          setTheme(theme === 'light' ? 'dark' : 'light');
        }
    }

    // Render nothing on the server or before hydration/mounting
    if (!mounted || !theme) {
        // Render a placeholder button to prevent layout shift but keep it visually consistent
        return <Button variant="ghost" size="icon" disabled aria-label="Toggle theme" className="h-9 w-9 opacity-0 pointer-events-none" />;
    }

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Sun className="h-5 w-5 transition-all duration-300 transform hover:rotate-12" /> : <Moon className="h-5 w-5 transition-all duration-300 transform hover:rotate-[-12deg]" />}
        </Button>
    );
};


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current pathname

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about-b12', label: 'About B12' },
    { href: '/sources-of-b12', label: 'Sources' },
    { href: '/b12-deficiency-symptoms', label: 'Symptoms' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
    { href: '/legal', label: 'Legal' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      {/* Increased header height slightly */}
      <div className="container flex h-[72px] items-center justify-between px-4 md:px-6">
        {/* Logo/Title */}
        <Link href="/" className="flex items-center gap-2 mr-4 md:mr-6" aria-label="B12 Insight Home">
           {/* Slightly larger logo */}
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom transition-transform duration-300 hover:rotate-12">
             <circle cx="12" cy="12" r="1"/>
             <path d={svgPathData1}/>
             <path d={svgPathData2}/>
           </svg>
          {/* Apply serif font to title */}
          <span className="font-bold text-xl md:text-2xl text-primary font-serif tracking-tight">B12 Insight</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">
          {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors px-2 py-1 rounded-md hover:bg-primary/10", // Base styles
                    isActive
                      ? "text-primary font-semibold bg-primary/10" // Active styles
                      : "text-foreground/70 hover:text-primary" // Inactive styles
                  )}
                >
                  {item.label}
                </Link>
              );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" /> {/* Slightly larger menu icon */}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 w-[260px] bg-background"> {/* Adjusted width & bg */}
              <Link
                href="/"
                className="flex items-center gap-2 mb-8 pl-6 pt-4" // Added padding top
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="B12 Insight Home"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom">
                   <circle cx="12" cy="12" r="1"/>
                   <path d={svgPathData1}/>
                   <path d={svgPathData2}/>
                 </svg>
                <span className="font-bold text-xl text-primary font-serif tracking-tight">B12 Insight</span>
              </Link>
              <div className="flex flex-col gap-3 pl-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                     <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-base py-2 font-medium rounded-l-md transition-colors", // Base styles
                        isActive
                          ? "text-primary font-semibold bg-primary/10" // Active styles
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5" // Inactive styles
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
