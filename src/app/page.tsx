
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Heart, Microscope, PencilLine, Search, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast"
import { useState } from 'react';


export default function Home() {
   const { toast } = useToast();
   const [email, setEmail] = useState('');

   const handleEmailSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // Basic email validation
     if (email && email.includes('@')) {
       toast({
         title: "Subscribed!",
         description: "You'll receive weekly tips and stories.",
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


  const quickFacts = [
    { id: 1, stat: 'Up to 15%', description: 'of the general population may have B12 deficiency.' },
    { id: 2, stat: '40%+', description: 'of vegetarians and 80%+ of vegans may be B12 deficient without supplementation.' },
    { id: 3, stat: 'Fatigue', description: 'is one of the most common early symptoms.' },
    { id: 4, stat: 'Nerve Damage', description: 'can occur if deficiency is left untreated long-term.' },
  ];

  const features = [
    { id: 1, icon: Microscope, title: 'Learn About B12', description: 'Understand its crucial role, benefits, and recommended dosages.', href: '/b12-benefits' },
    { id: 2, icon: Search, title: 'Identify Symptoms', description: 'Recognize the signs of deficiency, from mild to severe.', href: '/b12-deficiency-symptoms' },
    { id: 3, icon: PencilLine, title: 'Read Real Stories', description: 'Gain insights from personal journeys of diagnosis and recovery. (Coming Soon)', href: '#' }, // Update href when stories page is ready
    { id: 4, icon: Users, title: 'Join the Community', description: 'Connect, ask questions, and share experiences with others. (Coming Soon)', href: '#' }, // Update href when community page is ready
  ];

  const stories = [
    { id: 1, title: "Sarah's Journey to Recovery", excerpt: "After months of unexplained fatigue and brain fog, a B12 test changed everything...", name: "Sarah K.", image: "https://picsum.photos/seed/story1/400/300" },
    { id: 2, title: "Mark's Vegan Challenge", excerpt: "Switching to a vegan diet was great, but I neglected my B12. Here's how I fixed it.", name: "Mark T.", image: "https://picsum.photos/seed/story2/400/300" },
    { id: 3, title: "From Tingling to Thriving", excerpt: "The 'pins and needles' were just the start. Getting diagnosed was the key to feeling normal again.", name: "Emily R.", image: "https://picsum.photos/seed/story3/400/300" },
     { id: 4, title: "Unexpected Diagnosis", excerpt: "I never thought my digestive issues were related to B12. Finding the connection was life-changing.", name: "David L.", image: "https://picsum.photos/seed/story4/400/300" },
  ];

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 bg-gradient-to-br from-background via-secondary/10 to-accent/10 rounded-lg shadow-sm">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Your Complete Guide to Vitamin B12
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          From Symptoms to Solutions — Discover, Learn, and Share.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow" >
            <Link href="/b12-benefits">
               Learn About B12
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="shadow-md hover:shadow-lg transition-shadow">
             <Link href="/b12-deficiency-symptoms">
               Check Symptoms
             </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="shadow-md hover:shadow-lg transition-shadow">
             <Link href="#">
                Join Community
             </Link> {/* Update href when community page is ready */}
          </Button>
        </div>
      </section>

      {/* Quick Facts Block */}
       <section className="container mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-3xl font-bold text-center mb-8 text-primary/90">B12 Deficiency: Key Facts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFacts.map((fact) => (
              <Card key={fact.id} className="text-center bg-card/80 shadow hover:shadow-md transition-shadow transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">{fact.stat}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{fact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      {/* Feature Highlights */}
      <section className="container mx-auto px-4 animate-fade-in" style={{ animationDelay: '1.0s' }}>
         <h2 className="text-3xl font-bold text-center mb-12 text-primary/90">Explore B12 Insight</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="text-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                   <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
               <CardContent>
                 <Button asChild variant="link" className="text-primary">
                   <Link href={feature.href}>
                      Learn More
                   </Link>
                 </Button>
               </CardContent>
            </Card>
          ))}
        </div>
      </section>

       {/* Patient Story Preview Carousel */}
       <section className="bg-muted/50 py-16 md:py-20 animate-fade-in" style={{ animationDelay: '1.2s' }}>
         <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold text-center mb-12 text-primary/90">Real Stories, Real Impact</h2>
           <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
           >
             <CarouselContent>
               {stories.map((story) => (
                 <CarouselItem key={story.id} className="md:basis-1/2 lg:basis-1/3">
                   <div className="p-1 h-full">
                     <Card className="flex flex-col h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
                       <CardHeader>
                         <CardTitle className="text-lg">{story.title}</CardTitle>
                         <CardDescription className="text-xs text-muted-foreground">By {story.name}</CardDescription>
                       </CardHeader>
                       <CardContent className="flex-grow">
                         <p className="text-sm text-foreground/80 line-clamp-3">{story.excerpt}</p>
                       </CardContent>
                        <CardContent>
                           <Button asChild variant="secondary" size="sm" className="w-full">
                              <Link href="#">
                                Read Full Story
                              </Link> {/* Update href later */}
                           </Button>
                       </CardContent>
                     </Card>
                   </div>
                 </CarouselItem>
               ))}
             </CarouselContent>
             <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden md:flex" />
             <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden md:flex" />
           </Carousel>
            <div className="text-center mt-8">
                 <Button asChild variant="outline">
                    <Link href="#">
                        View All Stories
                    </Link> {/* Update href later */}
                 </Button>
               </div>
         </div>
       </section>

       {/* Email Signup Section */}
      <section className="container mx-auto px-4 py-16 animate-fade-in" style={{ animationDelay: '1.4s' }}>
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-accent/20 via-background to-secondary/20 shadow-lg border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Stay Informed</CardTitle>
            <CardDescription>Get weekly health tips and real stories in your inbox.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="shadow hover:shadow-md transition-shadow">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
