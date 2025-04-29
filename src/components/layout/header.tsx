'use client';

import * as React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sun, Moon } from 'lucide-react';

// Consistent SVG path data
const svgPathData1 = "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z";
const svgPathData2 = "M3.8 20.2c-2.04-2.03-.02-7.36 4.5-11.9 4.54-4.52 9.87-6.54 11.9-4.5 2.04 2.03.02 7.36-4.5 11.9-4.54 4.52-9.87 6.54 11.9 4.5Z";


// Placeholder for theme toggle functionality - Improved for hydration safety
const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);

    // Effect to set the theme class on mount and theme change
    useEffect(() => {
      const root = window.document.documentElement;
      // Set initial theme from localStorage or system preference if needed
      // For simplicity, we start with 'light' and allow toggle
      root.classList.remove(theme === 'light' ? 'dark' : 'light');
      root.classList.add(theme);
      // Optionally save theme to localStorage
      // localStorage.setItem('theme', theme);
    }, [theme]);

    // Effect to ensure component is mounted before rendering theme-specific UI
    useEffect(() => {
      setMounted(true);
      // Optionally read initial theme from localStorage here
      // const storedTheme = localStorage.getItem('theme') || 'light';
      // setTheme(storedTheme);
    }, []);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    // Render a placeholder or null initially, then the actual button content
    if (!mounted) {
        // Render a placeholder button to prevent layout shift and hydration mismatch on attributes like `disabled`
        return <Button variant="ghost" size="icon" disabled aria-label="Toggle theme" className="h-9 w-9" />;
    }

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
    );
};


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/b12-deficiency-symptoms', label: 'B12 Deficiency' },
    { href: '/b12-benefits', label: 'B12 Benefits' },
    { href: '/contact', label: 'Contact' },
    { href: '/legal', label: 'Legal' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo/Title */}
        <Link href="/" className="flex items-center gap-2 mr-6">
           {/* Simple SVG Placeholder for B12 molecule/icon */}
           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom">
             <circle cx="12" cy="12" r="1"/>
             <path d={svgPathData1}/>
             <path d={svgPathData2}/>
           </svg>
          <span className="font-bold text-xl text-primary">B12 Insight</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 w-[240px]">
              <Link
                href="/"
                className="flex items-center gap-2 mb-6 pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom">
                   <circle cx="12" cy="12" r="1"/>
                   <path d={svgPathData1}/>
                   <path d={svgPathData2}/>
                 </svg>
                <span className="font-bold text-lg text-primary">B12 Insight</span>
              </Link>
              <div className="flex flex-col gap-3 pl-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground hover:text-foreground/80"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
