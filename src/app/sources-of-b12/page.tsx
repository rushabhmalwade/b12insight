
'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Beef, Leaf, Pill, Info, ChefHat, Carrot, Milk, Fish, Egg, WheatOff, Syringe } from 'lucide-react';
import Image from 'next/image'; // Use next/image for optimization

// Data for B12 Sources
const animalSources = [
  { name: 'Beef Liver', icon: Beef, image: 'https://picsum.photos/seed/beefliver/200/200', description: 'Extremely high in B12. A 3-ounce serving can provide thousands of percent of the RDI.' },
  { name: 'Clams', icon: Info, image: 'https://picsum.photos/seed/clams/200/200', description: 'One of the best sources. A 3-ounce serving provides significantly more than the RDI.' },
  { name: 'Sardines', icon: Fish, image: 'https://picsum.photos/seed/sardines/200/200', description: 'Rich in B12 and Omega-3 fatty acids. A 3.75-ounce can is a good source.' },
  { name: 'Tuna', icon: Fish, image: 'https://picsum.photos/seed/tuna/200/200', description: 'Light tuna is a good source, especially canned in water.' },
  { name: 'Salmon', icon: Fish, image: 'https://picsum.photos/seed/salmon/200/200', description: 'Provides a good amount of B12 per 3-ounce serving.' },
  { name: 'Beef (Muscle Meat)', icon: Beef, image: 'https://picsum.photos/seed/beef/200/200', description: 'A good source, especially leaner cuts.' },
  { name: 'Milk & Dairy Products', icon: Milk, image: 'https://picsum.photos/seed/milk/200/200', description: 'Milk, yogurt, and cheese contribute to B12 intake.' },
  { name: 'Eggs', icon: Egg, image: 'https://picsum.photos/seed/eggs/200/200', description: 'The yolk contains most of the B12. Two large eggs provide a portion of the RDI.' },
];

const plantSources = [
  { name: 'Fortified Nutritional Yeast', icon: Leaf, image: 'https://picsum.photos/seed/nutyeast/200/200', description: 'A popular vegan source, often providing high amounts of B12 per serving. Check the label.' },
  { name: 'Fortified Cereals', icon: WheatOff, image: 'https://picsum.photos/seed/cereal/200/200', description: 'Many breakfast cereals are fortified with B12. Check labels for amounts.' },
  { name: 'Fortified Plant Milks', icon: Milk, image: 'https://picsum.photos/seed/plantmilk/200/200', description: 'Soy, almond, oat, and other plant milks are often fortified. Verify B12 content on the packaging.' },
  { name: 'Fortified Meat Alternatives', icon: Carrot, image: 'https://picsum.photos/seed/veganmeat/200/200', description: 'Some vegan burgers, sausages, etc., are fortified with B12.' },
  // Note: Naturally occurring plant sources like spirulina are generally not considered reliable for active B12.
];

const supplements = [
    {
        name: 'Cyanocobalamin',
        type: 'Oral Tablet/Sublingual/Spray',
        icon: Pill,
        description: 'Most common, stable, synthetic form. Body converts it to active forms.',
        tooltip: 'Cost-effective and widely available. Requires conversion in the body.'
    },
    {
        name: 'Methylcobalamin',
        type: 'Oral Tablet/Sublingual/Spray',
        icon: Pill,
        description: 'Active coenzyme form. May be preferred by some, potentially better absorbed directly.',
        tooltip: 'Naturally occurring active form. Might be more readily used by the body.'
    },
    {
        name: 'Adenosylcobalamin',
        type: 'Oral Tablet/Sublingual',
        icon: Pill,
        description: 'Another active coenzyme form, involved in energy metabolism.',
        tooltip: 'Less common than Methylcobalamin but also an active form.'
    },
    {
        name: 'Hydroxocobalamin',
        type: 'Injection',
        icon: Syringe,
        description: 'Often used for injections due to longer retention in the body. Prescribed for severe deficiency or absorption issues.',
        tooltip: 'Typically requires a prescription and administration by a healthcare professional.'
    },
];

const comparisonData = [
    { source: 'Liver (Beef)', absorption: 'High', cost: 'Low-Medium', availability: 'High', notes: 'Very high B12 content.' },
    { source: 'Clams', absorption: 'High', cost: 'Medium', availability: 'Medium', notes: 'Excellent B12 source.' },
    { source: 'Fortified Foods', absorption: 'Variable*', cost: 'Low-Medium', availability: 'High', notes: 'Absorption depends on individual factors and fortification levels.' },
    { source: 'Cyanocobalamin (Oral)', absorption: 'Good**', cost: 'Low', availability: 'Very High', notes: 'Standard supplement form.' },
    { source: 'Methylcobalamin (Oral)', absorption: 'Good**', cost: 'Medium', availability: 'High', notes: 'Active form, potentially better for some.' },
    { source: 'Hydroxocobalamin (Injection)', absorption: 'Very High', cost: 'Medium-High', availability: 'Prescription', notes: 'Bypasses gut absorption.' },
];


export default function SourcesOfB12Page() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 font-inter">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 text-center">Sources of Vitamin B12</h1>

      <Tabs defaultValue="animal" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 shadow-sm">
          <TabsTrigger value="animal"><Beef className="w-4 h-4 mr-2 inline-block" /> Animal Sources</TabsTrigger>
          <TabsTrigger value="plant"><Leaf className="w-4 h-4 mr-2 inline-block" /> Plant-Based & Vegan</TabsTrigger>
          <TabsTrigger value="supplements"><Pill className="w-4 h-4 mr-2 inline-block" /> Supplements</TabsTrigger>
        </TabsList>

        {/* Animal Sources Tab */}
        <TabsContent value="animal" className="animate-fade-in">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-primary">Natural Animal Sources</CardTitle>
              <CardDescription>Animal products are the primary natural source of Vitamin B12.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {animalSources.map((source) => (
                  <Card key={source.name} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader className="p-0">
                     <Image
                          src={source.image}
                          alt={source.name}
                          width={200}
                          height={200}
                          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <source.icon className="w-5 h-5 mr-2 text-primary/80" />
                        {source.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{source.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plant-Based & Vegan Tab */}
        <TabsContent value="plant" className="animate-fade-in">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-primary">Plant-Based & Vegan Options</CardTitle>
                <CardDescription>Reliable vegan sources are typically fortified foods or supplements.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {plantSources.map((source) => (
                     <Card key={source.name} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <CardHeader className="p-0">
                         <Image
                              src={source.image}
                              alt={source.name}
                              width={200}
                              height={150} // Adjust height for these cards
                              className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </CardHeader>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <source.icon className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                            {source.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{source.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
                 <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed border-amber-600/50">
                    <h4 className="font-semibold text-amber-700 dark:text-amber-500 mb-2 flex items-center"><Info className="w-4 h-4 mr-2"/>Important Note for Vegans</h4>
                    <p className="text-sm text-muted-foreground">
                      Naturally occurring B12 in plant foods (like seaweed or fermented foods) is generally not considered a reliable source of active B12 for humans. Vegans <span className="font-semibold">must</span> rely on fortified foods or B12 supplements to meet their requirements and prevent deficiency.
                    </p>
                  </div>
              </CardContent>
            </Card>
             {/* Challenges Section */}
              <Card className="shadow-md bg-secondary/20">
                  <CardHeader>
                      <CardTitle className="font-serif text-2xl text-primary/90">Challenges & Considerations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div>
                          <h4 className="font-semibold mb-1">Fortification Variability</h4>
                          <p className="text-sm text-muted-foreground">The amount of B12 in fortified foods can vary significantly between brands and products. Always check labels.</p>
                      </div>
                       <div>
                          <h4 className="font-semibold mb-1">Absorption Issues</h4>
                          <p className="text-sm text-muted-foreground">Even with fortified foods, absorption can be a concern for some individuals, especially older adults or those with digestive issues.</p>
                      </div>
                       <div>
                          <h4 className="font-semibold mb-1">Consistency is Key</h4>
                          <p className="text-sm text-muted-foreground">Relying solely on fortified foods requires consistent daily intake from various sources to ensure adequate levels.</p>
                      </div>
                      <div>
                          <h4 className="font-semibold mb-1">Supplement Reliability</h4>
                          <p className="text-sm text-muted-foreground">For many vegans, a dedicated B12 supplement offers a more reliable and straightforward way to ensure sufficient intake.</p>
                      </div>
                  </CardContent>
              </Card>
          </div>
        </TabsContent>

        {/* Supplements Tab */}
        <TabsContent value="supplements" className="animate-fade-in">
           <Card className="shadow-md">
             <CardHeader>
               <CardTitle className="font-serif text-2xl text-primary">Vitamin B12 Supplements</CardTitle>
               <CardDescription>Supplements provide a reliable way to increase B12 intake, especially when dietary sources are insufficient or absorption is compromised.</CardDescription>
             </CardHeader>
             <CardContent>
                <TooltipProvider>
                    <div className="space-y-6">
                        {supplements.map((sup) => (
                            <div key={sup.name} className="flex items-start gap-4 p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                                <sup.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mt-1 flex-shrink-0" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-lg mb-1 flex items-center">
                                        {sup.name}
                                        <Tooltip delayDuration={100}>
                                            <TooltipTrigger asChild>
                                                <Info className="w-4 h-4 ml-2 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs">
                                                <p>{sup.tooltip}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </h3>
                                    <p className="text-sm font-medium text-muted-foreground mb-1">Type: {sup.type}</p>
                                    <p className="text-sm text-foreground/80">{sup.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TooltipProvider>
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>

       {/* Comparison Table Section */}
       <section className="mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
           <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">Source Comparison</h2>
            <Card className="shadow-lg overflow-hidden">
               <div className="overflow-x-auto">
                    <Table>
                         <TableCaption className="p-4 text-xs text-muted-foreground">
                              *Absorption from fortified foods can be good but may be affected by food matrix and individual factors. **Oral supplement absorption is typically low (around 1-2%) for doses above physiological needs, relying on intrinsic factor and passive diffusion. Sublingual/spray may offer slightly better absorption for some. Always consult a healthcare provider for personalized advice.
                         </TableCaption>
                        <TableHeader className="bg-muted/50 sticky top-0 z-10">
                            <TableRow>
                            <TableHead className="w-[200px] font-semibold text-primary/90">Source</TableHead>
                            <TableHead className="font-semibold text-primary/90">Typical Absorption</TableHead>
                            <TableHead className="font-semibold text-primary/90">Relative Cost</TableHead>
                            <TableHead className="font-semibold text-primary/90">Availability</TableHead>
                            <TableHead className="text-right font-semibold text-primary/90">Notes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {comparisonData.map((item) => (
                            <TableRow key={item.source} className="hover:bg-secondary/20 transition-colors">
                                <TableCell className="font-medium">{item.source}</TableCell>
                                <TableCell>{item.absorption}</TableCell>
                                <TableCell>{item.cost}</TableCell>
                                <TableCell>{item.availability}</TableCell>
                                <TableCell className="text-right text-sm text-muted-foreground">{item.notes}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
               </div>
            </Card>
        </section>

      {/* Doctor Tips Section */}
      <section className="mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">Nutritionist Tips</h2>
        <Card className="bg-gradient-to-r from-accent/10 via-background to-secondary/10 border-primary/20 shadow-sm">
          <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center">
             <div className="flex justify-center">
                 {/* Placeholder for Nutritionist/Doctor Icon or Illustration */}
                 <ChefHat className="w-16 h-16 text-primary opacity-70" />
             </div>
             <div className="space-y-4">
                 <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80">
                      "For vegans and vegetarians, regular B12 supplementation is non-negotiable for long-term health. Don't rely on wishful thinking with unfortified plant foods."
                      <footer className="text-xs text-muted-foreground mt-2">- Dr. Anya Sharma, Registered Dietitian</footer>
                 </blockquote>
                  <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                      "If you're over 50, experiencing digestive issues, or taking certain medications like metformin or acid blockers, talk to your doctor about B12 testing, even if you eat animal products."
                       <footer className="text-xs text-muted-foreground mt-2">- Dr. Kenji Tanaka, Nutritionist</footer>
                 </blockquote>
             </div>
          </CardContent>
        </Card>
      </section>

        {/* Disclaimer */}
        <Card className="mt-12 border-dashed border-primary/50">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Disclaimer:</strong> This information is for educational purposes only. Consult with a healthcare professional or registered dietitian for personalized advice regarding Vitamin B12 intake and supplementation.
            </p>
          </CardContent>
        </Card>

    </div>
  );
}
 
	