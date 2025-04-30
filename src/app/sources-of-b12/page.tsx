'use client';

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Beef, Leaf, Pill, Info, ChefHat, Carrot, Milk, Fish, Egg, WheatOff, Syringe, HelpCircle, AlertTriangle, UtensilsCross, Bot, Loader2, Send, Sparkles, CheckSquare, XSquare } from 'lucide-react'; // Added new icons
import Image from 'next/image'; // Use next/image for optimization
import { cn } from '@/lib/utils'; // Import cn
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import type { DietPlannerInput, DietPlannerOutput } from '@/ai/flows/diet-planner-flow'; // Import types
import { generateDietPlan } from '@/ai/flows/diet-planner-flow'; // Import function
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'; // Import Accordion
import { z } from 'zod'; // Import Zod
import type { Metadata } from 'next'; // Metadata type


// Note: Metadata cannot be exported from a 'use client' component.
// Define page metadata in layout.tsx or parent Server Components if needed.

// Metadata for this specific page (Should be defined in layout.tsx or parent Server Component)
// export const metadata: Metadata = {
//   title: 'Vitamin B12 Sources: Animal, Vegan & Supplements',
//   description: 'Explore the primary sources of Vitamin B12, including animal products (meat, fish, dairy), fortified vegan options (nutritional yeast, plant milks), and various supplements.',
//   alternates: {
//     canonical: '/sources-of-b12',
//   },
//    openGraph: {
//     title: 'Vitamin B12 Sources: Animal, Vegan & Supplements | B12 Insight',
//     description: 'Find out where to get Vitamin B12 from food (animal & fortified vegan) and supplements.',
//     url: 'https://b12insight.com/sources-of-b12',
//     images: [
//       {
//         url: 'https://b12insight.com/og-sources.png', // Replace with specific OG image
//         width: 1200,
//         height: 630,
//         alt: 'Collage of Vitamin B12 food sources and supplements.',
//       },
//     ],
//   },
//    twitter: {
//       title: 'Vitamin B12 Sources: Animal, Vegan & Supplements | B12 Insight',
//       description: 'Find out where to get Vitamin B12 from food (animal & fortified vegan) and supplements.',
//       images: ['https://b12insight.com/twitter-sources.png'], // Replace with specific Twitter image
//    },
// };


// Data for B12 Sources (existing data)
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
];

const supplements = [
    { name: 'Cyanocobalamin', type: 'Oral / Sublingual / Spray', icon: Pill, description: 'Most common, stable, synthetic. Body converts it to active forms (methyl/adenosyl). Cost-effective.', tooltip: 'Widely available & studied. Conversion efficiency can vary.' },
    { name: 'Methylcobalamin', type: 'Oral / Sublingual / Spray', icon: Pill, description: 'Active coenzyme form (primarily cytoplasmic). May be preferred by some; potentially better utilized directly for certain pathways.', tooltip: 'Naturally occurring. May be less stable than cyano. Often slightly more expensive.' },
    { name: 'Adenosylcobalamin', type: 'Oral / Sublingual', icon: Pill, description: 'Other active coenzyme form (primarily mitochondrial). Crucial for energy metabolism.', tooltip: 'Less common in supplements. Sometimes combined with methylcobalamin.' },
    { name: 'Hydroxocobalamin', type: 'Injection', icon: Syringe, description: 'Often used for injections due to longer retention. Must be converted to active forms. Prescribed for severe deficiency or malabsorption.', tooltip: 'Requires prescription & healthcare administration. Bypasses digestive absorption issues.' },
];

const comparisonData = [
    { source: 'Liver (Beef)', absorption: 'High (food-bound)', cost: 'Low-Medium', availability: 'High', notes: 'Highest natural source.' },
    { source: 'Clams', absorption: 'High (food-bound)', cost: 'Medium', availability: 'Medium', notes: 'Excellent natural source.' },
    { source: 'Fortified Foods', absorption: 'Good (free B12)*', cost: 'Low-Medium', availability: 'High', notes: 'Crucial for vegans. Check labels.' },
    { source: 'Cyanocobalamin (Oral)', absorption: 'Good (free B12)**', cost: 'Low', availability: 'Very High', notes: 'Standard, stable supplement.' },
    { source: 'Methylcobalamin (Oral)', absorption: 'Good (free B12)**', cost: 'Medium', availability: 'High', notes: 'Active form, potentially better for some.' },
    { source: 'Hydroxocobalamin (IM Inj.)', absorption: 'Very High', cost: 'Medium-High', availability: 'Prescription', notes: 'Bypasses gut absorption. Medical use.' },
];

// Predefined options for multi-select fields
const allDietaryRestrictions = [
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'gluten_free', label: 'Gluten-Free' },
  { id: 'dairy_free', label: 'Dairy-Free' },
  { id: 'pescatarian', label: 'Pescatarian' },
  { id: 'nut_free', label: 'Nut-Free' },
];

const allHealthGoals = [
  { id: 'improve_b12', label: 'Improve B12 Intake' },
  { id: 'general_health', label: 'General Health & Wellness' },
  { id: 'weight_loss', label: 'Weight Loss' },
  { id: 'weight_gain', label: 'Weight Gain / Muscle Gain' },
  { id: 'increase_energy', label: 'Increase Energy Levels' },
];


// Re-define the input schema locally for form validation since it's not exported from the flow file
const DietPlannerInputSchemaForForm = z.object({
  age: z.number().min(1).max(120).describe('Age of the person in years.'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).describe('Gender of the person.'),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active']).describe('Physical activity level.'),
  dietaryRestrictions: z.array(z.string()).optional().describe('List any dietary restrictions (e.g., vegan, vegetarian, gluten-free, dairy-free).'),
  allergies: z.array(z.string()).optional().describe('List any food allergies.'),
  dislikedFoods: z.array(z.string()).optional().describe('List foods the person dislikes.'),
  healthGoals: z.array(z.string()).describe('List health goals (e.g., weight loss, muscle gain, general health, improve B12 intake).'),
  planDurationDays: z.number().int().min(1).max(7).default(3).describe('Duration of the diet plan in days (1-7).'),
});


// Zod schema for the diet planner form
const formSchema = DietPlannerInputSchemaForForm.extend({
    // Use refine to ensure disliked foods aren't empty strings if provided
    dislikedFoods: z.string().optional().transform(val => val ? val.split(',').map(s => s.trim()).filter(Boolean) : []),
    allergies: z.string().optional().transform(val => val ? val.split(',').map(s => s.trim()).filter(Boolean) : []),
    // Need to handle multi-select checkboxes for Zod validation
    dietaryRestrictions: z.array(z.string()).optional(),
    healthGoals: z.array(z.string()).min(1, { message: "Please select at least one health goal." }),
});


type DietPlanFormValues = z.infer<typeof formSchema>;

export default function SourcesOfB12Page() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [plannerResult, setPlannerResult] = useState<DietPlannerOutput | null>(null);
  const [plannerError, setPlannerError] = useState<string | null>(null);

  const form = useForm<DietPlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
      activityLevel: undefined,
      dietaryRestrictions: [],
      allergies: [],
      dislikedFoods: [],
      healthGoals: [],
      planDurationDays: 3, // Default duration
    },
  });

  async function onSubmit(values: DietPlanFormValues) {
    setIsSubmitting(true);
    setPlannerResult(null);
    setPlannerError(null);
    console.log('Diet Planner Form Values:', values);

     try {
        // Map form values back to the exact schema expected by the flow
        // Type assertion is safe here because DietPlanFormValues extends the base input schema
        const input: DietPlannerInput = values as DietPlannerInput;

        const result = await generateDietPlan(input);

        await new Promise(resolve => setTimeout(resolve, 300)); // Slight delay

        setPlannerResult(result);
        toast({
            title: "AI Diet Plan Generated!",
            description: "Scroll down to view your personalized plan.",
            variant: "default",
        });
        document.getElementById('planner-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
        console.error("Diet planner error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        setPlannerError(`Failed to generate diet plan: ${errorMessage}`);
        toast({
            variant: "destructive",
            title: "Planner Error",
            description: `Could not generate plan. ${errorMessage.slice(0, 100)}`,
        });
    } finally {
        setIsSubmitting(false);
    }
  }


  return (
    <div className="container mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-20 font-inter">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 md:mb-12 text-center tracking-tight animate-fade-in">
         Finding Your Vitamin B12 Sources
      </h1>

      <Tabs defaultValue="animal" className="w-full animate-fade-in" style={{ animationDelay: '0.1s' }}>
         <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 mb-10 shadow-md h-auto sm:h-12 p-2 bg-muted rounded-lg">
             <TabsTrigger value="animal" className="text-base py-2 sm:py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
                <Beef className="w-5 h-5 mr-2 inline-block" /> Animal Sources
             </TabsTrigger>
             <TabsTrigger value="plant" className="text-base py-2 sm:py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
                <Leaf className="w-5 h-5 mr-2 inline-block" /> Plant-Based & Vegan
             </TabsTrigger>
             <TabsTrigger value="supplements" className="text-base py-2 sm:py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
                 <Pill className="w-5 h-5 mr-2 inline-block" /> Supplements
             </TabsTrigger>
              <TabsTrigger value="planner" className="text-base py-2 sm:py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
                  <Bot className="w-5 h-5 mr-2 inline-block" /> AI Diet Planner
              </TabsTrigger>
        </TabsList>


        {/* Animal Sources Tab (Existing) */}
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
                                      alt={`Image of ${source.name} as a source of B12`} // Descriptive alt text
                                      layout="fill"
                                      objectFit="cover"
                                      className="transition-transform duration-500 group-hover:scale-105"
                                      loading="lazy" // Lazy load images in grid
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

        {/* Plant-Based & Vegan Tab (Existing) */}
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
                                          alt={`Image of ${source.name} as a fortified vegan source of B12`} // Descriptive alt text
                                          layout="fill"
                                          objectFit="cover"
                                          className="transition-transform duration-500 group-hover:scale-105"
                                          loading="lazy" // Lazy load images in grid
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

                {/* Right Column: Challenges (Existing) */}
                <Card className="shadow-lg rounded-xl border border-border/50 bg-secondary/30 dark:bg-secondary/20 lg:col-span-1">
                    <CardHeader className="p-6">
                        <CardTitle className="font-serif text-xl md:text-2xl text-secondary-foreground dark:text-secondary-foreground tracking-tight flex items-center gap-2">
                            <HelpCircle className="w-6 h-6" /> Challenges & Considerations
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-5">
                        <div><h4 className="font-semibold mb-1">Fortification Levels Vary</h4><p className="text-sm text-muted-foreground leading-relaxed">Amounts of B12 added to fortified foods differ greatly. Always check nutrition labels.</p></div>
                        <div><h4 className="font-semibold mb-1">Absorption Factors</h4><p className="text-sm text-muted-foreground leading-relaxed">Individual absorption efficiency can be impacted by age, gut health, and genetics.</p></div>
                        <div><h4 className="font-semibold mb-1">Consistent Intake Needed</h4><p className="text-sm text-muted-foreground leading-relaxed">Relying solely on fortified foods requires careful planning and consistent daily consumption from multiple sources.</p></div>
                        <div><h4 className="font-semibold mb-1">Supplement Reliability</h4><p className="text-sm text-muted-foreground leading-relaxed">A dedicated B12 supplement offers a predictable and reliable dose, simplifying intake for many.</p></div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        {/* Supplements Tab (Existing) */}
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
                                                <TooltipTrigger asChild><HelpCircle className="w-4 h-4 ml-2 text-muted-foreground cursor-help hover:text-primary transition-colors" /></TooltipTrigger>
                                                <TooltipContent className="max-w-xs text-sm p-2 rounded-md shadow-lg bg-popover text-popover-foreground border"><p>{sup.tooltip}</p></TooltipContent>
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

        {/* AI Diet Planner Tab */}
         <TabsContent value="planner" className="animate-fade-in">
            <Card className="shadow-xl rounded-xl border-2 border-primary/30 bg-gradient-to-br from-card to-secondary/10">
                <CardHeader className="p-6">
                    <CardTitle className="font-serif text-2xl md:text-3xl text-primary flex items-center gap-3 tracking-tight"><Bot className="w-7 h-7"/> AI-Powered B12 Diet Planner</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2 text-base">
                       Get a personalized meal plan focused on Vitamin B12 sources, tailored to your needs.
                       <br /><strong className="text-destructive font-medium">Disclaimer: This AI tool provides suggestions, not medical advice. Always consult a qualified professional.</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8 pt-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                             {/* Personal Details Row */}
                             <div className="grid md:grid-cols-3 gap-6">
                                <FormField control={form.control} name="age" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Age</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Years" {...field} value={field.value === undefined ? '' : field.value} onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} className="h-11 text-base" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                 <FormField control={form.control} name="gender" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Gender</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger className="h-11 text-base"><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="activityLevel" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Activity Level</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger className="h-11 text-base"><SelectValue placeholder="Select activity level" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                                                <SelectItem value="lightly_active">Lightly Active (light exercise/sports 1-3 days/wk)</SelectItem>
                                                <SelectItem value="moderately_active">Moderately Active (moderate exercise/sports 3-5 days/wk)</SelectItem>
                                                <SelectItem value="very_active">Very Active (hard exercise/sports 6-7 days/wk)</SelectItem>
                                                <SelectItem value="extra_active">Extra Active (very hard exercise/physical job)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                             </div>

                             {/* Preferences Row */}
                              <div className="grid md:grid-cols-2 gap-6">
                                 <FormField control={form.control} name="allergies" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Food Allergies</FormLabel>
                                        <FormControl><Input placeholder="List allergies, separated by commas (e.g., peanuts, shellfish)" {...field} value={Array.isArray(field.value) ? field.value.join(', ') : field.value} className="h-11 text-base" /></FormControl>
                                        <FormDescription className="text-xs">Optional. Separate multiple items with commas.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                 <FormField control={form.control} name="dislikedFoods" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Disliked Foods</FormLabel>
                                        <FormControl><Input placeholder="List dislikes, separated by commas (e.g., olives, mushrooms)" {...field} value={Array.isArray(field.value) ? field.value.join(', ') : field.value} className="h-11 text-base" /></FormControl>
                                        <FormDescription className="text-xs">Optional. Separate multiple items with commas.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                              </div>

                               {/* Dietary Restrictions */}
                              <FormField control={form.control} name="dietaryRestrictions" render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">Dietary Restrictions</FormLabel>
                                            <FormDescription className="text-xs">Select any that apply. Leave blank if none.</FormDescription>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {allDietaryRestrictions.map((item) => (
                                                <FormField key={item.id} control={form.control} name="dietaryRestrictions" render={({ field }) => {
                                                    return (
                                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm bg-background/50">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...(field.value || []), item.id])
                                                                            : field.onChange(field.value?.filter((value) => value !== item.id));
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal text-sm">{item.label}</FormLabel>
                                                        </FormItem>
                                                    );
                                                }}/>
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}/>

                                {/* Health Goals */}
                                <FormField control={form.control} name="healthGoals" render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">Health Goals</FormLabel>
                                            <FormDescription className="text-xs">Select your main health objectives.</FormDescription>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {allHealthGoals.map((item) => (
                                                <FormField key={item.id} control={form.control} name="healthGoals" render={({ field }) => {
                                                    return (
                                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm bg-background/50">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...(field.value || []), item.id])
                                                                            : field.onChange(field.value?.filter((value) => value !== item.id));
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal text-sm">{item.label}</FormLabel>
                                                        </FormItem>
                                                    );
                                                }}/>
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}/>

                                {/* Plan Duration */}
                                 <FormField control={form.control} name="planDurationDays" render={({ field }) => (
                                    <FormItem className="max-w-xs">
                                        <FormLabel className="text-base">Plan Duration</FormLabel>
                                        <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                                            <FormControl><SelectTrigger className="h-11 text-base"><SelectValue placeholder="Select duration" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5, 6, 7].map(days => (
                                                    <SelectItem key={days} value={String(days)}>{days} Day{days > 1 ? 's' : ''}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-xs">How many days the meal plan should cover (max 7).</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}/>


                             <div className="flex justify-center pt-4">
                                <Button type="submit" disabled={isSubmitting} size="lg" className="min-w-[220px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Plan...</> : <>Generate My B12 Plan <Sparkles className="w-5 h-5 ml-2" /></>}
                                </Button>
                             </div>
                        </form>
                    </Form>

                     {/* Results Display Area */}
                     <div id="planner-results" className="mt-12 space-y-6">
                         {/* Results Card */}
                         {plannerResult && (
                           <Card className="mt-6 bg-green-50 dark:bg-green-900/30 border-2 border-green-500/50 rounded-lg shadow-md animate-fade-in">
                              <CardHeader className="pb-4">
                                 <CardTitle className="text-xl md:text-2xl text-green-700 dark:text-green-300 flex items-center gap-3"><CheckSquare className="w-6 h-6"/> Your Personalized Diet Plan</CardTitle>
                                 <CardDescription className="text-muted-foreground">{plannerResult.planTitle}</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-8">
                                 <p className="text-base text-foreground/90 bg-background/50 p-4 rounded-md border border-green-200 dark:border-green-700/50">{plannerResult.introduction}</p>

                                  <Accordion type="multiple" className="w-full space-y-4">
                                    {plannerResult.dailyPlans.map((dayPlan) => (
                                        <AccordionItem value={`day-${dayPlan.day}`} key={`day-${dayPlan.day}`} className="border px-4 rounded-lg bg-background/60 shadow-sm">
                                            <AccordionTrigger className="text-left font-semibold text-lg text-primary hover:text-primary/80 transition-colors py-4 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                                                Day {dayPlan.day}
                                            </AccordionTrigger>
                                            <AccordionContent className="space-y-5 pt-2 pb-5">
                                                 {dayPlan.meals.map((meal, mealIndex) => (
                                                    <div key={mealIndex} className="p-3 border-l-4 border-secondary rounded-r-md bg-muted/20">
                                                        <h4 className="font-medium text-base text-primary/90">{meal.name}</h4>
                                                        <p className="text-sm text-foreground/85 mt-1">{meal.description}</p>
                                                        {meal.b12_source_highlight && (
                                                            <p className="text-xs text-green-700 dark:text-green-400 mt-1 font-medium">[B12 Source: {meal.b12_source_highlight}]</p>
                                                        )}
                                                    </div>
                                                 ))}
                                                 <p className="text-sm font-medium text-muted-foreground pt-3 border-t border-dashed mt-4">Summary: {dayPlan.daily_summary}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>

                                  <div>
                                      <h4 className="text-lg font-semibold text-primary/90 mb-2">B12 Strategy Notes:</h4>
                                      <p className="text-base text-foreground/90 bg-background/50 p-4 rounded-md border border-green-200 dark:border-green-700/50">{plannerResult.b12StrategyNotes}</p>
                                  </div>
                                   <p className="text-sm text-destructive/90 pt-4 border-t border-dashed border-green-300 dark:border-green-700 font-medium">
                                      <AlertTriangle className="inline w-4 h-4 mr-1" /> {plannerResult.disclaimer}
                                   </p>
                              </CardContent>
                           </Card>
                         )}

                         {/* Error Card */}
                         {plannerError && (
                             <Card className="mt-6 bg-red-50 dark:bg-red-900/30 border-2 border-destructive/50 rounded-lg shadow-md animate-fade-in">
                                 <CardHeader className="pb-3">
                                    <CardTitle className="text-xl md:text-2xl text-destructive flex items-center gap-2"><XSquare className="w-6 h-6"/> Plan Generation Error</CardTitle>
                                 </CardHeader>
                                 <CardContent>
                                     <p className="text-destructive/90 text-base">{plannerError}</p>
                                      <p className="text-xs text-muted-foreground mt-3">
                                         Please check your input and try again. If the issue persists, the AI service might be temporarily unavailable.
                                      </p>
                                 </CardContent>
                             </Card>
                         )}
                    </div>

                </CardContent>
           </Card>
         </TabsContent>


      </Tabs>

       {/* Comparison Table Section (Existing) */}
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

      {/* Nutritionist Tips Section (Existing) */}
      <section className="mt-16 md:mt-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">Nutritionist Tips</h2>
        <Card className="bg-gradient-to-r from-accent/20 via-background to-secondary/20 border-primary/20 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-6 md:p-8 grid md:grid-cols-3 gap-8 items-center">
             <div className="flex justify-center md:col-span-1">
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

        {/* Disclaimer (Existing) */}
        <Card className="mt-16 border-2 border-dashed border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/20 rounded-lg animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0" />
              <div>
                 <h3 className="font-semibold text-amber-700 dark:text-amber-400">Important Disclaimer</h3>
                 <p className="text-sm text-amber-800/90 dark:text-amber-300/90 mt-1">
                      The information on Vitamin B12 sources and typical amounts is for general educational purposes. Individual nutritional needs and absorption rates vary. Consult with a qualified healthcare professional or registered dietitian for personalized advice regarding diet, B12 intake, testing, and supplementation. AI tools provide suggestions, not medical advice.
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>

    </div>
  );
}
