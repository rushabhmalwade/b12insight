'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Microscope, Search, Users, Brain, Droplet, Leaf, Sparkles, Mail, HeartHandshake, Target } from 'lucide-react'; // Added Mail, HeartHandshake, Target
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import Image from 'next/image'; // Use Next.js Image component
import { cn } from '@/lib/utils'; // Import cn

// Note: Metadata cannot be exported from a 'use client' component.
// Define page metadata in layout.tsx or parent Server Components if needed.


export default function Home() {
   const { toast } = useToast();
   const [email, setEmail] = useState('');

   const handleEmailSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // Basic email validation
     if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // More robust email validation
       toast({
         title: "Subscribed!",
         description: "You'll receive weekly tips and stories.",
         variant: "default", // Explicitly set default variant
       });
       setEmail(''); // Clear input after submission
     } else {
       toast({
         variant: "destructive",
         title: "Invalid Email",
         description: "Please enter a valid email address.",
       });
     }
   };

   // Quick Facts Data - Simplified description for rendering
   const quickFacts = [
     { id: 1, stat: 'Up to 15%', description: 'of people in developed countries may have B12 deficiency.', icon: Users, href: '/b12-deficiency-symptoms' },
     { id: 2, stat: '80%+', descriptionPrefix: 'of ', descriptionLinkText: 'vegans/vegetarians', descriptionSuffix: ' not supplementing may be deficient.', icon: Leaf, href: '/sources-of-b12' },
     { id: 3, stat: 'Fatigue', descriptionPrefix: 'is one of the most common, often overlooked, ', descriptionLinkText: 'early symptoms', descriptionSuffix: '.', icon: Droplet, href: '/b12-deficiency-symptoms' },
     { id: 4, stat: 'Nerve Health', descriptionPrefix: 'B12 is crucial for maintaining healthy ', descriptionLinkText: 'nerve function', descriptionSuffix: '.', icon: Brain, href: '/about-b12' },
   ];


  const features = [
    { id: 1, icon: Microscope, title: 'Learn About B12', description: 'Understand its crucial role, benefits, and recommended dosages.', href: '/about-b12', cta: 'Explore Basics' },
    { id: 2, icon: Search, title: 'Identify Symptoms', description: 'Recognize the signs of deficiency & use our AI symptom checker.', href: '/b12-deficiency-symptoms', cta: 'Check Now' },
    { id: 3, icon: Sparkles, title: 'Discover Sources', description: 'Explore food sources (animal & fortified vegan) and supplements.', href: '/sources-of-b12', cta: 'Find Sources' },
    { id: 4, icon: HeartHandshake, title: 'Community & Support', description: 'Connect with others, ask questions, and share experiences.', href: '/contact', cta: 'Get in Touch' }, // Updated icon and title
  ];

  const stories = [
    { id: 1, title: "Sarah's Journey to Recovery", excerpt: "After months of unexplained fatigue and brain fog, a B12 test changed everything...", name: "Sarah K.", image: "https://picsum.photos/seed/story1/400/300", dataAiHint: "woman portrait happy recovery" },
    { id: 2, title: "Mark's Vegan Challenge", excerpt: "Switching to a vegan diet was great, but I neglected my B12. Here's how I fixed it.", name: "Mark T.", image: "https://picsum.photos/seed/story2/400/300", dataAiHint: "man cooking vegan food" },
    { id: 3, title: "From Tingling to Thriving", excerpt: "The 'pins and needles' were just the start. Getting diagnosed was the key to feeling normal again.", name: "Emily R.", image: "https://picsum.photos/seed/story3/400/300", dataAiHint: "person hiking nature thriving" },
     { id: 4, title: "Unexpected Diagnosis", excerpt: "I never thought my digestive issues were related to B12. Finding the connection was life-changing.", name: "David L.", image: "https://picsum.photos/seed/story4/400/300", dataAiHint: "man thinking surprised" },
     { id: 5, title: "Elderly Care & B12", excerpt: "Helping my grandmother manage her B12 levels made a huge difference in her energy and mood.", name: "Chloe B.", image: "https://picsum.photos/seed/story5/400/300", dataAiHint: "elderly woman smiling caregiver" },
  ];

  return (
    <div className="space-y-20 md:space-y-32 overflow-x-hidden"> {/* Prevent horizontal overflow */}

      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10 dark:from-primary/20 dark:to-accent/20 overflow-hidden"> {/* Subtle gradient */}
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-5 dark:opacity-[0.03] [mask-image:radial-gradient(farthest-side_at_top_left,white,transparent)]">
           <svg aria-hidden="true" className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-primary/10 stroke-primary/20 dark:fill-primary/5 dark:stroke-primary/10">
             <defs>
               <pattern id="pattern" width="72" height="56" patternUnits="userSpaceOnUse" x="-12" y="4"><path d="M.5 56V.5H72" fill="none"></path></pattern>
             </defs>
             <rect width="100%" height="100%" strokeWidth="0" fill="url(#pattern)"></rect>
           </svg>
         </div>

        <div className="container mx-auto px-4 relative z-10">
           <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Column: Text and CTAs */}
              <div className="text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-5 animate-fade-in font-serif" style={{ animationDelay: '0.1s' }}>
                    Your Complete Guide to Vitamin B12
                  </h1>
                  <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto md:mx-0 mb-10 animate-fade-in font-inter" style={{ animationDelay: '0.3s' }}>
                    From <Link href="/b12-deficiency-symptoms" className="text-primary hover:underline font-medium">Symptoms</Link> to Solutions — Discover, Learn, and Share your B12 journey.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                     <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto">
                       <Link href="/about-b12">Learn About B12</Link>
                     </Button>
                     <Button size="lg" variant="secondary" asChild className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto">
                       <Link href="/b12-deficiency-symptoms">Check Symptoms</Link>
                     </Button>
                     {/* Optional 3rd CTA - maybe link to community/contact or resources */}
                     {/* <Button size="lg" variant="outline" asChild className="shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto">
                       <Link href="/contact">Join Community</Link>
                     </Button> */}
                  </div>
              </div>
              {/* Right Column: Image/Illustration */}
              <div className="flex justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                 <Image
                    src="https://picsum.photos/seed/b12hero/500/450" // Placeholder image
                    alt="Abstract visual representing health and vitality related to Vitamin B12"
                    width={500}
                    height={450}
                    className="rounded-xl shadow-xl object-cover border-4 border-background dark:border-muted/20"
                    priority // Prioritize loading hero image
                    data-ai-hint="vitamin b12 molecule abstract health"
                 />
              </div>
           </div>
        </div>
      </section>

      {/* Quick Facts Block */}
       <section className="container mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary/90 font-serif tracking-tight">B12 Deficiency: Key Facts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {quickFacts.map((fact) => (
              <Link href={fact.href || '#'} key={fact.id} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl group">
                <Card className="text-center bg-card/90 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1.5 border border-border/50 rounded-xl h-full flex flex-col p-4 hover:border-primary/30">
                  <CardHeader className="items-center pb-2 pt-4">
                      <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-full mb-3 inline-block text-primary">
                          <fact.icon className="w-7 h-7" />
                      </div>
                    <CardTitle className="text-4xl font-bold text-primary">{fact.stat}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow flex items-center justify-center">
                     <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                       {fact.descriptionPrefix}
                       {fact.descriptionLinkText ? (
                         <span className="text-primary font-medium group-hover:underline">{fact.descriptionLinkText}</span>
                       ) : fact.description}
                       {fact.descriptionSuffix}
                     </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

      {/* Feature Highlights */}
      <section className="container mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary/90 font-serif tracking-tight">Explore B12 Insight</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden group hover:border-primary/40">
              <CardHeader className="items-center pt-8 pb-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-full mb-4 inline-block text-primary transition-transform duration-300 group-hover:scale-110">
                   <feature.icon className="w-9 h-9" />
                </div>
                <CardTitle className="text-xl font-serif">
                    <Link href={feature.href} className="focus:outline-none">
                         <span className="absolute inset-0" aria-hidden="true"></span>
                         {feature.title}
                    </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-6 pb-4">
                <CardDescription className="font-inter text-foreground/70">{feature.description}</CardDescription>
              </CardContent>
               <CardContent className="pb-6">
                 <Button asChild variant="link" className="text-primary font-medium text-base relative z-10 group-hover:underline">
                   <Link href={feature.href} tabIndex={-1}>
                    {feature.cta || 'Learn More'} →
                   </Link>
                 </Button>
               </CardContent>
            </Card>
          ))}
        </div>
      </section>

       {/* Patient Story Preview Carousel */}
       <section className="bg-gradient-to-br from-muted/30 via-background to-secondary/20 dark:from-muted/50 dark:to-secondary/30 py-16 md:py-24 animate-fade-in" style={{ animationDelay: '0.8s' }}>
         <div className="container mx-auto px-4">
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary/90 font-serif tracking-tight">Real Stories, Real Impact</h2>
           <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto"
           >
             <CarouselContent className="-ml-4"> {/* Adjust margin for spacing */}
               {stories.map((story) => (
                 <CarouselItem key={story.id} className="md:basis-1/2 lg:basis-1/3 pl-4"> {/* Adjust basis and add padding */}
                   <div className="p-1 h-full">
                     <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-card rounded-xl border border-border/50 group hover:border-primary/30">
                      <div className="relative w-full h-48 overflow-hidden">
                         <Image
                            src={story.image}
                            alt={`Preview image for story titled: ${story.title}`} // Descriptive alt text
                            fill // Use fill layout
                            style={{objectFit:"cover"}} // Ensure image covers the area
                            className="transition-transform duration-500 group-hover:scale-105"
                            loading="lazy" // Lazy load carousel images
                            data-ai-hint={story.dataAiHint}
                         />
                      </div>
                       <CardHeader className="pt-4 pb-2">
                         <CardTitle className="text-lg font-serif tracking-tight">
                             <Link href="/resources" className="focus:outline-none stretched-link group-hover:text-primary transition-colors">
                                 <span className="absolute inset-0" aria-hidden="true"></span>
                                 {story.title}
                             </Link>
                         </CardTitle>
                         <CardDescription className="text-xs text-muted-foreground font-inter pt-1">By {story.name}</CardDescription>
                       </CardHeader>
                       <CardContent className="flex-grow pb-2">
                         <p className="text-sm text-foreground/80 line-clamp-3 font-inter">{story.excerpt}</p>
                       </CardContent>
                        <CardContent className="pb-4">
                           <Button asChild variant="secondary" size="sm" className="w-full hover:bg-secondary/90 transition-colors relative z-10">
                              {/* Link is technically handled by the CardTitle, but this provides a clear visual CTA */}
                              <Link href="/resources" tabIndex={-1}>Read Full Story</Link>
                           </Button>
                       </CardContent>
                     </Card>
                   </div>
                 </CarouselItem>
               ))}
             </CarouselContent>
             {/* Adjust position and style of prev/next buttons */}
             <CarouselPrevious className="absolute left-[-15px] sm:left-[-25px] top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card border shadow-lg z-10" />
             <CarouselNext className="absolute right-[-15px] sm:right-[-25px] top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card border shadow-lg z-10" />
           </Carousel>
            <div className="text-center mt-10">
                 <Button asChild variant="outline" size="lg" className="hover:bg-accent/50 transition-colors shadow-md hover:shadow-lg">
                    <Link href="/resources">View All Resources</Link>
                 </Button>
               </div>
         </div>
       </section>

       {/* Mission/Value Prop Section */}
      <section className="container mx-auto px-4 text-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-primary/90 mb-6 font-serif tracking-tight">Our Mission</h2>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10 font-inter">
          To empower individuals with comprehensive, accessible, and trustworthy information about Vitamin B12, helping them navigate symptoms, understand sources, and achieve better health outcomes through knowledge and community support.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
           <div className="flex flex-col items-center p-6 bg-card/50 rounded-lg border border-border/30 shadow-sm">
              <Target className="w-12 h-12 text-accent mb-4"/>
              <h3 className="text-xl font-semibold mb-2 font-serif">Accurate Information</h3>
              <p className="text-muted-foreground text-sm">Providing evidence-based details on B12 science, symptoms, and sources.</p>
           </div>
           <div className="flex flex-col items-center p-6 bg-card/50 rounded-lg border border-border/30 shadow-sm">
              <HeartHandshake className="w-12 h-12 text-accent mb-4"/>
              <h3 className="text-xl font-semibold mb-2 font-serif">Community Support</h3>
              <p className="text-muted-foreground text-sm">Fostering a space for sharing experiences and finding peer support.</p>
           </div>
           <div className="flex flex-col items-center p-6 bg-card/50 rounded-lg border border-border/30 shadow-sm">
              <Sparkles className="w-12 h-12 text-accent mb-4"/>
              <h3 className="text-xl font-semibold mb-2 font-serif">Actionable Insights</h3>
              <p className="text-muted-foreground text-sm">Offering tools and resources to help manage B12 levels effectively.</p>
           </div>
        </div>
      </section>


       {/* Email Signup Section */}
      <section className="container mx-auto px-4 py-16 md:py-20 animate-fade-in" style={{ animationDelay: '1.0s' }}>
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 via-background to-accent/10 dark:from-primary/20 dark:via-background dark:to-accent/20 shadow-lg border-primary/20 rounded-xl p-6 md:p-8"> {/* Adjusted opacity */}
          <CardHeader className="text-center pt-0 px-0 pb-4">
             <Mail className="w-10 h-10 text-primary mx-auto mb-3"/>
            <CardTitle className="text-2xl md:text-3xl text-primary font-serif tracking-tight">Stay Informed</CardTitle>
            <CardDescription className="font-inter text-foreground/70 mt-2">Get weekly health tips, B12 insights, and real stories in your inbox.</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow font-inter h-11 text-base" // Increased height and text size
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email for newsletter"
                required // Add required attribute
              />
              <Button type="submit" size="lg" className="shadow hover:shadow-md transition-shadow w-full sm:w-auto">Subscribe</Button>
            </form>
             <p className="text-xs text-muted-foreground text-center mt-4">We respect your privacy. Unsubscribe anytime.</p>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
