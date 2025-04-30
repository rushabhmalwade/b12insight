'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BarChart, ChartTooltip, ChartTooltipContent } from '@tremor/react'; // Using Tremor for charts, import Tooltip components
import { BrainCircuit, Dna, HeartPulse, ShieldCheck, Info, Atom, Stethoscope } from 'lucide-react'; // Import relevant icons
import { cn } from '@/lib/utils'; // Import cn for conditional classes
import Image from 'next/image'; // Import Next.js Image

// Inline SVG for Red Blood Cell (simplified)
const RedBloodCellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 dark:text-red-400">
    <circle cx="12" cy="12" r="9" fillOpacity="0.8"/>
    <circle cx="12" cy="12" r="5" fill="hsl(var(--card))" fillOpacity="0.3"/>
  </svg>
);


export default function AboutB12Page() {

  const rdaData = [
    { ageGroup: 'Infants (0-6m)', RDA: 0.4, color: "hsl(var(--chart-1))" },
    { ageGroup: 'Infants (7-12m)', RDA: 0.5, color: "hsl(var(--chart-2))" },
    { ageGroup: 'Children (1-3y)', RDA: 0.9, color: "hsl(var(--chart-3))" },
    { ageGroup: 'Children (4-8y)', RDA: 1.2, color: "hsl(var(--chart-4))" },
    { ageGroup: 'Children (9-13y)', RDA: 1.8, color: "hsl(var(--chart-5))" },
    { ageGroup: 'Teens (14-18y)', RDA: 2.4, color: "hsl(var(--chart-1))" },
    { ageGroup: 'Adults (19+y)', RDA: 2.4, color: "hsl(var(--chart-2))" },
    { ageGroup: 'Pregnancy', RDA: 2.6, color: "hsl(var(--chart-3))" },
    { ageGroup: 'Lactation', RDA: 2.8, color: "hsl(var(--chart-4))" },
  ];

   // Custom Tooltip for Bar Chart
   const CustomTooltip = ({ payload, active, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Get the data for the hovered bar
      return (
        <div className="rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:shadow-dark-tremor-dropdown">
          <p className="font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">{label}</p>
          <p className="text-tremor-content dark:text-dark-tremor-content">
             RDA: <span className="font-semibold" style={{ color: data.color }}>{data.RDA} mcg</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const chartValueFormatter = (number: number) => `${number} mcg`;

  const mythsFacts = [
    {
      id: 'myth1',
      question: 'Myth: You can get enough B12 from plant-based foods like spirulina or unwashed vegetables.',
      answer: 'Fact: While some algae and fermented foods contain B12 analogs (inactive forms), they are not reliable sources of active B12 for humans. Trace amounts on unwashed vegetables are insignificant and unreliable. Vegans and most vegetarians need fortified foods or supplements.'
    },
    {
      id: 'myth2',
      question: 'Myth: You can easily overdose on Vitamin B12 supplements.',
      answer: 'Fact: Vitamin B12 is water-soluble, meaning your body typically excretes excess amounts through urine. There is no established Tolerable Upper Intake Level (UL) due to its very low toxicity risk. However, extremely high doses are unnecessary unless medically advised.'
    },
     {
      id: 'myth3',
      question: 'Myth: B12 deficiency only affects the elderly or strict vegans.',
      answer: 'Fact: While risk increases with age (due to reduced absorption) and in vegans, B12 deficiency can affect anyone, including meat-eaters with absorption issues (like pernicious anemia, Crohn\'s, celiac disease, post-bariatric surgery) or those on certain medications (like Metformin, PPIs).'
    },
     {
      id: 'myth4',
      question: 'Myth: Energy drinks loaded with B12 are a good daily source.',
      answer: 'Fact: While they contain B12 (often synthetic cyanocobalamin), energy drinks usually have excessive amounts, often paired with high sugar, caffeine, and other stimulants. They are not a healthy or balanced way to meet B12 needs. Prioritize whole foods, fortified options, or dedicated supplements.'
    },
     {
      id: 'myth5',
      question: 'Myth: If my serum B12 blood test is "normal", I can\'t be deficient.',
      answer: 'Fact: Standard serum B12 tests measure total B12, including inactive forms. Some people experience deficiency symptoms even within the low-normal range. Functional markers like MMA (Methylmalonic Acid) and Homocysteine can provide a clearer picture of B12 status at the cellular level.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-20 font-inter">

      {/* Section 1: What is Vitamin B12? */}
      <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
         <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 md:mb-12 text-center tracking-tight">
            About Vitamin B12 (Cobalamin)
         </h1>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Card className="shadow-lg rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="font-serif text-3xl text-primary flex items-center gap-3">
                 <Info className="w-7 h-7 text-primary/80 flex-shrink-0" />
                 What is Vitamin B12?
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-relaxed text-foreground/90">
              <p>
                Vitamin B12, also known as <strong className="font-semibold text-cyan-700 dark:text-cyan-400">cobalamin</strong>, is a vital water-soluble vitamin essential for numerous bodily functions. First identified in the mid-20th century as the factor curing pernicious anemia, it stands out due to its complex structure containing the mineral <strong className="font-semibold text-gray-600 dark:text-gray-400">cobalt</strong>.
              </p>
               <p>
                It's indispensable for maintaining healthy <strong className="font-semibold text-red-600 dark:text-red-400">nerve tissue</strong>, optimal <strong className="font-semibold text-purple-600 dark:text-purple-400">brain function</strong>, and the production of <strong className="font-semibold text-rose-600 dark:text-rose-400">red blood cells</strong> and <strong className="font-semibold text-blue-600 dark:text-blue-400">DNA</strong>. Unlike most vitamins humans need, B12 is synthesized almost exclusively by microorganisms like bacteria and archaea found in soil and the gut of animals.
              </p>
               <div>
                  <h3 className="font-semibold text-xl mb-3 text-primary/90 font-serif">Common Forms:</h3>
                  <ul className="space-y-2 text-foreground/85">
                      <li className="flex items-start gap-2">
                         <Atom className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-1 flex-shrink-0" />
                         <span><strong className="text-cyan-700 dark:text-cyan-400">Cyanocobalamin:</strong> A stable, synthetic form commonly used in supplements and food fortification. Requires bodily conversion to active forms.</span>
                      </li>
                      <li className="flex items-start gap-2">
                         <Atom className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                         <span><strong className="text-green-700 dark:text-green-400">Methylcobalamin:</strong> A naturally occurring, active coenzyme form. Directly usable by the body, often found in food and premium supplements.</span>
                      </li>
                      <li className="flex items-start gap-2">
                          <Atom className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                         <span><strong className="text-orange-700 dark:text-orange-400">Adenosylcobalamin:</strong> Another active coenzyme form, crucial for energy metabolism within mitochondria.</span>
                       </li>
                      <li className="flex items-start gap-2">
                           <Stethoscope className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                         <span><strong className="text-indigo-700 dark:text-indigo-400">Hydroxocobalamin:</strong> Often used in injectable B12 treatments due to its longer retention time in the body. Must be converted to active forms.</span>
                       </li>
                  </ul>
               </div>
            </CardContent>
          </Card>
           {/* Image/Infographic Placeholder */}
           <div className="flex justify-center items-center p-6 md:p-10 bg-gradient-to-br from-muted/30 to-secondary/20 rounded-xl shadow-inner border border-border/30">
             {/* Replace with an actual infographic or relevant image */}
              <Image
                  src="https://picsum.photos/seed/b12molecule/500/400" // Replace with a relevant image URL
                  alt="Visual representation related to Vitamin B12"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover shadow-md"
                />
           </div>
        </div>
      </section>

      {/* Section 2: Why is it Important? */}
      <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">The Crucial Roles of Vitamin B12</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
             { title: 'DNA Synthesis & Repair', icon: Dna, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/30', description: 'Acts as a vital coenzyme for creating and repairing DNA, the blueprint for all cells, crucial for cell growth and division.' },
             { title: 'Red Blood Cell Formation', icon: RedBloodCellIcon, color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-50 dark:bg-red-900/30', description: 'Works synergistically with folate (B9) to produce healthy red blood cells, essential for oxygen transport and preventing megaloblastic anemia.' },
             { title: 'Nerve Health & Function', icon: BrainCircuit, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/30', description: 'Critical for maintaining the myelin sheath, the protective covering around nerves, ensuring proper nerve signal transmission and supporting cognitive function.' },
             { title: 'Energy Metabolism', icon: HeartPulse, color: 'text-rose-600 dark:text-rose-400', bgColor: 'bg-rose-50 dark:bg-rose-900/30', description: 'Plays a key role in converting carbohydrates into glucose and metabolizing fats and proteins, helping the body produce energy and reduce fatigue.' },
             { title: 'Homocysteine Regulation', icon: ShieldCheck, color: 'text-teal-600 dark:text-teal-400', bgColor: 'bg-teal-50 dark:bg-teal-900/30', description: 'Helps convert homocysteine into methionine. Elevated homocysteine levels are linked to increased risk of cardiovascular disease.' },
             { title: 'Mood & Mental Well-being', icon: ShieldCheck, color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-50 dark:bg-yellow-900/30', description: 'Contributes to the synthesis of neurotransmitters like serotonin and dopamine, influencing mood regulation. Deficiency is linked to depression and anxiety.' }
           ].map((item, index) => (
             <Card key={index} className={cn("shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 rounded-xl border border-border/50 overflow-hidden", item.bgColor)}>
                <CardHeader className="items-center text-center pt-6 pb-3">
                  <div className={cn("p-3 rounded-full mb-4 inline-block transition-transform duration-300 group-hover:scale-110", item.bgColor)}>
                     <item.icon className={cn("w-8 h-8", item.color)} />
                  </div>
                  <CardTitle className={cn("text-xl font-serif tracking-tight", item.color.replace('text-', 'text-'))}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-5 pb-6">
                  <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
           ))}
        </div>
      </section>

      {/* Section 3: Daily Requirements */}
      <section className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">Daily Requirements (RDA)</h2>
        <Card className="shadow-xl rounded-xl border border-border/50 overflow-hidden bg-card/90 backdrop-blur-sm">
          <CardHeader className="bg-muted/30 p-6 border-b">
            <CardTitle className="font-serif text-2xl text-primary">Recommended Dietary Allowances (Micrograms/mcg)</CardTitle>
            <CardDescription className="text-muted-foreground">Based on US National Institutes of Health (NIH) guidelines. Individual needs may vary.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
             {/* Use Tremor BarChart */}
             <BarChart
                className="mt-2 h-96" // Increased height
                data={rdaData}
                index="ageGroup"
                categories={['RDA']}
                colors={rdaData.map(d => d.color.replace('hsl(','').replace(')','').split(' ')[0])} // Pass HSL strings directly
                valueFormatter={chartValueFormatter}
                yAxisWidth={60} // Increased width for labels
                showLegend={false}
                barCategoryGap="25%" // Increased spacing
                customTooltip={CustomTooltip} // Use custom tooltip
                // showAnimation={true} // Enable animation
             />
             <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-dashed">
               <Info className="w-3 h-3 inline mr-1" />
               Note: RDA (Recommended Dietary Allowance) values represent the average daily intake sufficient for nearly all (97–98%) healthy individuals. Needs can increase due to factors like pregnancy, certain medical conditions, or medications.
             </p>
          </CardContent>
        </Card>
      </section>

      {/* Section 4: Myths & Facts */}
      <section className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">Myths vs. Facts</h2>
         <Card className="shadow-lg rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
                 <Accordion type="single" collapsible className="w-full space-y-2">
                   {mythsFacts.map((item) => (
                     <AccordionItem value={item.id} key={item.id} className="border px-4 rounded-lg bg-background/50 hover:bg-muted/40 transition-colors">
                       <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors text-base md:text-lg py-4 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-45">
                           {/* Split Myth/Fact for styling */}
                           <span>
                             <span className="text-red-600 dark:text-red-400 mr-1">Myth:</span>
                             {item.question.replace('Myth: ', '')}
                           </span>
                       </AccordionTrigger>
                       <AccordionContent className="text-foreground/80 pt-1 pb-4 text-base leading-relaxed">
                         <span className="font-semibold text-green-700 dark:text-green-400 mr-1">Fact:</span>
                          {item.answer.replace('Fact: ', '')}
                       </AccordionContent>
                     </AccordionItem>
                   ))}
                 </Accordion>
            </CardContent>
         </Card>
      </section>

       {/* Disclaimer */}
        <Card className="mt-16 border-2 border-dashed border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/20 rounded-lg animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0" />
              <div>
                 <h3 className="font-semibold text-amber-700 dark:text-amber-400">Important Disclaimer</h3>
                 <p className="text-sm text-amber-800/90 dark:text-amber-300/90 mt-1">
                    The information provided on this page is for educational and informational purposes only. It does not constitute medical advice and should not be used as a substitute for consultation with a qualified healthcare professional. Always seek professional medical advice for any health concerns or before making decisions about your health or treatment.
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>

    </div>
  );
}
