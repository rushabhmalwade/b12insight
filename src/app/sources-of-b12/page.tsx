'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Beef, Leaf, Pill, Info, ChefHat, Carrot, Milk, Fish, Egg, WheatOff, Syringe, HelpCircle, AlertTriangle } from 'lucide-react'; // Added HelpCircle, AlertTriangle
import Image from 'next/image'; // Use next/image for optimization
import { cn } from '@/lib/utils'; // Import cn

// Data for B12 Sources
const animalSources = [
  { name: 'Beef Liver (Cooked)', icon: Beef, image: 'https://picsum.photos/seed/beefliver/200/150', description: 'Extremely high. ~70-80 mcg per 3oz serving.' },
  { name: 'Clams (Cooked)', icon: Info, image: 'https://picsum.photos/seed/clams/200/150', description: 'Very high. ~84 mcg per 3oz serving.' },
  { name: 'Sardines (Canned)', icon: Fish, image: 'https://picsum.photos/seed/sardines/200/150', description: 'High. ~7-8 mcg per 3.75oz can.' },
  { name: 'Tuna (Light, Canned)', icon: Fish, image: 'https://picsum.photos/seed/tuna/200/150', description: 'Good source. ~2.5 mcg per 3oz serving.' },
  { name: 'Salmon (Cooked)', icon: Fish, image: 'https://picsum.photos/seed/salmon/200/150', description: 'Good source. ~4-5 mcg per 3oz serving.' },
  { name: 'Beef (Ground, Cooked)', icon: Beef, image: 'https://picsum.photos/seed/beef/200/150', description: 'Good source. ~2.5 mcg per 3oz serving (lean).' },
  { name: 'Milk (Whole)', icon: Milk, image: 'https://picsum.photos/seed/milk/200/150', description: 'Moderate. ~1.2 mcg per cup.' },
  { name: 'Yogurt (Plain)', icon: Milk, image: 'https://picsum.photos/seed/yogurt/200/150', description: 'Moderate. ~1.1 mcg per cup.' },
  { name: 'Eggs (Large)', icon: Egg, image: 'https://picsum.photos/seed/eggs/200/150', description: 'Source. ~0.6 mcg per egg (mostly in yolk).' },
  { name: 'Chicken Breast (Cooked)', icon: Info, image: 'https://picsum.photos/seed/chicken/200/150', description: 'Lower source. ~0.3 mcg per 3oz serving.' }, // Placeholder icon for chicken
];

const plantSources = [
  { name: 'Fortified Nutritional Yeast', icon: Leaf, image: 'https://picsum.photos/seed/nutyeast/200/150', description: 'Variable, check label. Often 8-24 mcg per 1/4 cup.' },
  { name: 'Fortified Breakfast Cereals', icon: WheatOff, image: 'https://picsum.photos/seed/cereal/200/150', description: 'Variable, check label. Often 0.6-6 mcg per serving.' },
  { name: 'Fortified Plant Milks', icon: Milk, image: 'https://picsum.photos/seed/plantmilk/200/150', description: 'Variable, check label. Often ~1-3 mcg per cup (Soy, Almond, Oat).' },
  { name: 'Fortified Meat Alternatives', icon: Carrot, image: 'https://picsum.photos/seed/veganmeat/200/150', description: 'Variable, check label. Some burgers/sausages are fortified.' },
  // Note: Naturally occurring plant sources like spirulina are generally not considered reliable for active B12.
];

const supplements = [
    {
        name: 'Cyanocobalamin',
        type: 'Oral / Sublingual / Spray',
        icon: Pill,
        description: 'Most common, stable, synthetic. Body converts it to active forms (methyl/adenosyl). Cost-effective.',
        tooltip: 'Widely available & studied. Conversion efficiency can vary.'
    },
    {
        name: 'Methylcobalamin',
        type: 'Oral / Sublingual / Spray',
        icon: Pill,
        description: 'Active coenzyme form (primarily cytoplasmic). May be preferred by some; potentially better utilized directly for certain pathways.',
        tooltip: 'Naturally occurring. May be less stable than cyano. Often slightly more expensive.'
    },
    {
        name: 'Adenosylcobalamin',
        type: 'Oral / Sublingual',
        icon: Pill,
        description: 'Other active coenzyme form (primarily mitochondrial). Crucial for energy metabolism.',
        tooltip: 'Less common in supplements. Sometimes combined with methylcobalamin.'
    },
    {
        name: 'Hydroxocobalamin',
        type: 'Injection',
        icon: Syringe,
        description: 'Often used for injections due to longer retention. Must be converted to active forms. Prescribed for severe deficiency or malabsorption.',
        tooltip: 'Requires prescription & healthcare administration. Bypasses digestive absorption issues.'
    },
];

const comparisonData = [
    { source: 'Liver (Beef)', absorption: 'High (food-bound)', cost: 'Low-Medium', availability: 'High', notes: 'Highest natural source.' },
    { source: 'Clams', absorption: 'High (food-bound)', cost: 'Medium', availability: 'Medium', notes: 'Excellent natural source.' },
    { source: 'Fortified Foods', absorption: 'Good (free B12)*', cost: 'Low-Medium', availability: 'High', notes: 'Crucial for vegans. Check labels.' },
    { source: 'Cyanocobalamin (Oral)', absorption: 'Good (free B12)**', cost: 'Low', availability: 'Very High', notes: 'Standard, stable supplement.' },
    { source: 'Methylcobalamin (Oral)', absorption: 'Good (free B12)**', cost: 'Medium', availability: 'High', notes: 'Active form, potentially better for some.' },
    { source: 'Hydroxocobalamin (IM Inj.)', absorption: 'Very High', cost: 'Medium-High', availability: 'Prescription', notes: 'Bypasses gut absorption. Medical use.' },
];


export default function SourcesOfB12Page() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-20 font-inter">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 md:mb-12 text-center tracking-tight animate-fade-in">
         Finding Your Vitamin B12 Sources
      </h1>

      <Tabs defaultValue="animal" className="w-full animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-10 shadow-md h-auto sm:h-12 p-2 bg-muted rounded-lg">
          <TabsTrigger value="animal" className="text-base py-2 sm:py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
            <Beef className="w-5 h-5 mr-2 inline-block" /> Animal Sources
          </TabsTrigger>
          <TabsTrigger value="plant" className="text-base py-2 sm:py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
            <Leaf className="w-5 h-5 mr-2 inline-block" /> Plant-Based & Vegan
          </TabsTrigger>
          <TabsTrigger value="supplements" className="text-base py-2 sm:py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
             <Pill className="w-5 h-5 mr-2 inline-block" /> Supplements
          </TabsTrigger>
        </TabsList>

        {/* Animal Sources Tab */}
        <TabsContent value="animal" className="animate-fade-in">
          <Card className="shadow-lg rounded-xl border border-border/50 overflow-hidden bg-card/90 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 p-6 border-b">
              <CardTitle className="font-serif text-2xl md:text-3xl text-primary tracking-tight">Natural Animal Sources</CardTitle>
              <CardDescription className="text-muted-foreground mt-1">Animal products naturally contain Vitamin B12, synthesized by microorganisms.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {animalSources.map((source) => (
                  <Card key={source.name} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 rounded-lg border border-border/40 flex flex-col">
                     <div className="relative w-full h-36 bg-secondary/20 overflow-hidden">
                         <Image
                              src={source.image}
                              alt={source.name}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-500 group-hover:scale-105"
                          />
                     </div>
                    <CardContent className="p-4 flex-grow flex flex-col justify-between">
                       <div>
                         <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                           <source.icon className="w-5 h-5 text-primary/80 flex-shrink-0" />
                           {source.name}
                         </h3>
                         <p className="text-xs text-muted-foreground">{source.description}</p>
                       </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-dashed">
                 Approximate B12 content per standard serving size. Values can vary based on preparation and specific product. RDI (Recommended Daily Intake) for adults is 2.4 mcg.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plant-Based & Vegan Tab */}
        <TabsContent value="plant" className="animate-fade-in">
          <div className="grid lg:grid-cols-3 gap-8">
             {/* Left Column: Fortified Sources */}
            <Card className="shadow-lg rounded-xl border border-border/50 overflow-hidden bg-card/90 backdrop-blur-sm lg:col-span-2">
              <CardHeader className="bg-muted/30 p-6 border-b">
                <CardTitle className="font-serif text-2xl md:text-3xl text-primary tracking-tight">Plant-Based & Vegan Options</CardTitle>
                <CardDescription className="text-muted-foreground mt-1">Reliable vegan sources require fortification or supplementation.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {plantSources.map((source) => (
                     <Card key={source.name} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 rounded-lg border border-border/40 flex flex-col">
                        <div className="relative w-full h-32 bg-secondary/20 overflow-hidden">
                         <Image
                              src={source.image}
                              alt={source.name}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4 flex-grow">
                          <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <source.icon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                            {source.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{source.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
                 <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-dashed border-amber-500/50">
                    <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/>Critical Note for Vegans/Vegetarians</h4>
                    <p className="text-sm text-amber-800/90 dark:text-amber-300/90">
                       Naturally occurring B12 in unfortified plant foods (seaweed, mushrooms, fermented foods) is generally <strong className="font-medium">not bioactive or present in reliable amounts</strong> for human needs. Vegans and many vegetarians <strong className="font-medium">must consume fortified foods consistently or take a B12 supplement</strong> to prevent deficiency.
                    </p>
                  </div>
              </CardContent>
            </Card>

             {/* Right Column: Challenges */}
              <Card className="shadow-lg rounded-xl border border-border/50 bg-secondary/30 dark:bg-secondary/20 lg:col-span-1">
                  <CardHeader className="p-6">
                      <CardTitle className="font-serif text-xl md:text-2xl text-secondary-foreground dark:text-secondary-foreground tracking-tight flex items-center gap-2">
                         <HelpCircle className="w-6 h-6" /> Challenges & Considerations
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 space-y-5">
                      <div>
                          <h4 className="font-semibold mb-1">Fortification Levels Vary</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">Amounts of B12 added to fortified foods differ greatly. Always check nutrition labels.</p>
                      </div>
                       <div>
                          <h4 className="font-semibold mb-1">Absorption Factors</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">Individual absorption efficiency can be impacted by age, gut health, and genetics.</p>
                      </div>
                       <div>
                          <h4 className="font-semibold mb-1">Consistent Intake Needed</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">Relying solely on fortified foods requires careful planning and consistent daily consumption from multiple sources.</p>
                      </div>
                      <div>
                          <h4 className="font-semibold mb-1">Supplement Reliability</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">A dedicated B12 supplement offers a predictable and reliable dose, simplifying intake for many.</p>
                      </div>
                  </CardContent>
              </Card>
          </div>
        </TabsContent>

        {/* Supplements Tab */}
        <TabsContent value="supplements" className="animate-fade-in">
           <Card className="shadow-lg rounded-xl border border-border/50 overflow-hidden bg-card/90 backdrop-blur-sm">
             <CardHeader className="bg-muted/30 p-6 border-b">
               <CardTitle className="font-serif text-2xl md:text-3xl text-primary tracking-tight">Vitamin B12 Supplements</CardTitle>
               <CardDescription className="text-muted-foreground mt-1">Supplements offer a reliable way to ensure adequate B12, crucial for those with dietary restrictions or absorption issues.</CardDescription>
             </CardHeader>
             <CardContent className="p-6 md:p-8">
                <TooltipProvider delayDuration={150}>
                    <div className="space-y-6">
                        {supplements.map((sup) => (
                            <div key={sup.name} className="flex flex-col sm:flex-row items-start gap-4 p-5 border rounded-lg bg-background/50 hover:bg-muted/30 transition-colors shadow-sm">
                                <sup.icon className="w-7 h-7 text-cyan-600 dark:text-cyan-400 mt-1 flex-shrink-0" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-lg mb-1 flex items-center">
                                        {sup.name}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="w-4 h-4 ml-2 text-muted-foreground cursor-help hover:text-primary transition-colors" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs text-sm p-2 rounded-md shadow-lg bg-popover text-popover-foreground border">
                                                <p>{sup.tooltip}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </h3>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Format: {sup.type}</p>
                                    <p className="text-sm text-foreground/85 leading-relaxed">{sup.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-dashed">
                    Common dosages range from 50mcg to 1000mcg or higher, often taken daily or weekly depending on the dose and individual needs. Consult a healthcare provider to determine the appropriate form and dosage for you.
                 </p>
                </TooltipProvider>
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>

       {/* Comparison Table Section */}
       <section className="mt-16 md:mt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
           <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">Source Comparison Overview</h2>
            <Card className="shadow-xl rounded-xl border border-border/50 overflow-hidden bg-card/90 backdrop-blur-sm">
               <div className="overflow-x-auto">
                    <Table>
                         <TableCaption className="p-4 text-xs text-muted-foreground text-left">
                              *Absorption from food-bound B12 requires stomach acid and intrinsic factor. Absorption from fortified foods/supplements (crystalline B12) is generally better but still limited by intrinsic factor capacity at lower doses (~1-2 mcg). Higher doses rely partially on less efficient passive diffusion (~1%). **Oral supplement absorption rate decreases significantly as dose increases. Sublingual/spray forms might offer slightly enhanced absorption for some but evidence is mixed. Injections bypass the digestive system entirely. Always consult a healthcare provider for personalized advice.
                         </TableCaption>
                        <TableHeader className="bg-muted/40">
                            <TableRow>
                            <TableHead className="w-[180px] font-semibold text-primary/90 text-sm">Source</TableHead>
                            <TableHead className="font-semibold text-primary/90 text-sm">Absorption Pathway</TableHead>
                            <TableHead className="font-semibold text-primary/90 text-sm">Relative Cost</TableHead>
                            <TableHead className="font-semibold text-primary/90 text-sm">Availability</TableHead>
                            <TableHead className="text-left font-semibold text-primary/90 text-sm">Notes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {comparisonData.map((item) => (
                            <TableRow key={item.source} className="hover:bg-secondary/10 transition-colors text-sm">
                                <TableCell className="font-medium py-3">{item.source}</TableCell>
                                <TableCell className="py-3">{item.absorption}</TableCell>
                                <TableCell className="py-3">{item.cost}</TableCell>
                                <TableCell className="py-3">{item.availability}</TableCell>
                                <TableCell className="text-left text-xs text-muted-foreground py-3">{item.notes}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
               </div>
            </Card>
        </section>

      {/* Nutritionist Tips Section */}
      <section className="mt-16 md:mt-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">Nutritionist Tips</h2>
        <Card className="bg-gradient-to-r from-accent/20 via-background to-secondary/20 border-primary/20 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-6 md:p-8 grid md:grid-cols-3 gap-8 items-center">
             <div className="flex justify-center md:col-span-1">
                 {/* Placeholder for Nutritionist/Doctor Icon or Illustration */}
                 <ChefHat className="w-20 h-20 text-primary opacity-80" />
             </div>
             <div className="space-y-5 md:col-span-2">
                 <blockquote className="border-l-4 border-primary pl-4 py-2 italic text-foreground/85 bg-background/50 rounded-r-md">
                      "For vegans and vegetarians, consistent B12 supplementation (like 25-100 mcg daily or 1000-2000 mcg twice weekly) is generally recommended. Don't rely solely on fortified foods unless you meticulously track your intake."
                      <footer className="text-xs text-muted-foreground mt-2 block">- Dr. Anya Sharma, Registered Dietitian</footer>
                 </blockquote>
                  <blockquote className="border-l-4 border-accent pl-4 py-2 italic text-foreground/85 bg-background/50 rounded-r-md">
                      "If you're over 50, have digestive issues (Crohn's, celiac, low stomach acid), or take medications like Metformin or PPIs, discuss B12 testing (including MMA/homocysteine) with your doctor, regardless of diet."
                       <footer className="text-xs text-muted-foreground mt-2 block">- Kenji Tanaka, Clinical Nutritionist</footer>
                 </blockquote>
             </div>
          </CardContent>
        </Card>
      </section>

        {/* Disclaimer */}
        <Card className="mt-16 border-2 border-dashed border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/20 rounded-lg animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0" />
              <div>
                 <h3 className="font-semibold text-amber-700 dark:text-amber-400">Important Disclaimer</h3>
                 <p className="text-sm text-amber-800/90 dark:text-amber-300/90 mt-1">
                      The information on Vitamin B12 sources and typical amounts is for general educational purposes. Individual nutritional needs and absorption rates vary. Consult with a qualified healthcare professional or registered dietitian for personalized advice regarding diet, B12 intake, testing, and supplementation.
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>

    </div>
  );
}
