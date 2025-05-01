'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sun, Moon, User, LogOut, Loader2 } from 'lucide-react'; // Added LogOut, Loader2
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth.tsx'; // Import useAuth hook
import { useToast } from '@/hooks/use-toast'; // Import useToast

// Consistent SVG path data
const svgPathData1 = "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z";
const svgPathData2 = "M3.8 20.2c-2.04-2.03-.02-7.36 4.5-11.9 4.54-4.52 9.87-6.54 11.9-4.5 2.04 2.03.02 7.36-4.5 11.9-4.54 4.52-9.87 6.54 11.9 4.5Z";


// Placeholder for theme toggle functionality - Improved for hydration safety
const ThemeToggle = () => {
    const [theme, setTheme] = useState<string | undefined>(undefined);
    const [mounted, setMounted] = useState(false);

     useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(storedTheme || (prefersDark ? 'dark' : 'light'));
        setMounted(true);
     }, []);

    useEffect(() => {
        if (mounted && theme) {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme, mounted]);


    const toggleTheme = () => {
        if (theme) {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }
    }

    if (!mounted || !theme) {
        // Render a placeholder during hydration to prevent mismatch
        return <Button variant="ghost" size="icon" disabled aria-label="Toggle theme" className="h-9 w-9 opacity-0 pointer-events-none" />;
    }

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="h-9 w-9">
            {theme === 'light' ? <Sun className="h-5 w-5 transition-all duration-300 transform hover:rotate-12" /> : <Moon className="h-5 w-5 transition-all duration-300 transform hover:rotate-[-12deg]" />}
        </Button>
    );
};


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth(); // Get auth state and functions
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about-b12', label: 'About B12' },
    { href: '/sources-of-b12', label: 'Sources' },
    { href: '/b12-deficiency-symptoms', label: 'Symptoms' },
    { href: '/resources', label: 'Resources' },
    { href: '/community', label: 'Community' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleLogout = async () => {
      setIsLoggingOut(true);
      try {
          await logout();
          toast({ title: "Logged Out", description: "You have been successfully logged out." });
          // Optionally redirect or update UI further
      } catch (error) {
          console.error("Logout error in header:", error);
          toast({ title: "Logout Failed", description: "Could not log out. Please try again.", variant: "destructive" });
      } finally {
          setIsLoggingOut(false);
          setIsMobileMenuOpen(false); // Close mobile menu after logout attempt
      }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-[72px] items-center justify-between px-4 md:px-6">
        {/* Logo/Title */}
        <Link href="/" className="flex items-center gap-2 mr-4 md:mr-6" aria-label="B12 Insight Home">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom transition-transform duration-300 hover:rotate-12">
             <circle cx="12" cy="12" r="1"/>
             <path d={svgPathData1}/>
             <path d={svgPathData2}/>
           </svg>
          <span className="font-bold text-xl md:text-2xl text-primary font-serif tracking-tight">B12 Insight</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5 text-sm font-medium flex-grow justify-center">
          {navItems.map((item) => {
               // Check if the current path exactly matches the item's href OR
               // if the item's href is not '/' and the current path starts with the item's href
               const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors px-2 py-1 rounded-md hover:bg-primary/10 relative",
                    "after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:-translate-x-1/2",
                    isActive
                      ? "text-primary font-semibold after:w-4/5" // Active state styles
                      : "text-foreground/70 hover:text-primary hover:after:w-2/5" // Default state styles
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />

          {/* Auth Loading State */}
          {isLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}

          {/* Authentication Links/Actions */}
          {!isLoading && user ? (
             <>
               <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                   <Link href="/profile" aria-label="User Profile"><User className="h-5 w-5"/></Link>
               </Button>
               <Button variant="ghost" size="sm" onClick={handleLogout} disabled={isLoggingOut} className="hidden md:inline-flex h-9">
                   {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-1 h-4 w-4" />}
                   Logout
               </Button>
             </>
          ) : !isLoading && !user ? (
             <>
                 <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex h-9">
                   <Link href="/login">Login</Link>
                 </Button>
                 <Button size="sm" asChild className="hidden md:inline-flex h-9">
                     <Link href="/signup">Sign Up</Link>
                 </Button>
             </>
          ) : null /* Render nothing during initial load potentially */}

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 w-[260px] bg-background">
              <Link
                href="/"
                className="flex items-center gap-2 mb-8 pl-6 pt-4"
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
              <div className="flex flex-col gap-1 pl-4 pr-4"> {/* Adjusted padding */}
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                     <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-base py-2.5 px-3 font-medium rounded-md transition-colors block", // Added block and padding
                        isActive
                          ? "text-primary font-semibold bg-primary/10" // Active style for mobile
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      )}
                       aria-current={isActive ? 'page' : undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                 {/* Auth links/actions in mobile menu */}
                  {!isLoading && user ? (
                     <>
                         <Link href="/profile" className="text-base py-2.5 px-3 font-medium rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 block" onClick={() => setIsMobileMenuOpen(false)}>
                             <User className="inline w-4 h-4 mr-2" /> Profile
                         </Link>
                         <Button variant="ghost" onClick={handleLogout} disabled={isLoggingOut} className="w-full justify-start text-base py-2.5 px-3 font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 h-auto">
                            {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 w-4 h-4" />}
                             Logout
                         </Button>
                     </>
                  ) : !isLoading && !user ? (
                     <>
                         <Link href="/login" className="text-base py-2.5 px-3 font-medium rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 block" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                         <Link href="/signup" className="text-base py-2.5 px-3 font-medium rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 block" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                     </>
                  ) : null}

                  {/* Add Legal link to mobile menu */}
                  <Link href="/legal" className="text-base py-2.5 px-3 font-medium rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 block mt-4" onClick={() => setIsMobileMenuOpen(false)}>Legal</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
