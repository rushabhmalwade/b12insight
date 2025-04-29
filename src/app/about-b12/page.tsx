
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BarChart } from '@tremor/react'; // Using Tremor for charts as shadcn charts are experimental
import { BrainCircuit, Dna, HeartPulse, ShieldCheck, Info } from 'lucide-react'; // Import relevant icons

// Inline SVG for DNA strand if lucide-react Dna is not suitable
const DnaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dna"><path d="M2 15c6.667-6 13.333-6 20 0"/><path d="M20 9c-6.667 6-13.333 6-20 0"/><path d="M10 2c1.753 4 1.753 10 0 14"/><path d="M14 8c-1.753 4-1.753 10 0 14"/></svg>
);
// Inline SVG for Red Blood Cell
const RedBloodCellIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/><path d="M12 6a6 6 0 1 0 6 6 6.007 6.007 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4.005 4.005 0 0 1-4 4z"/></svg>
);

export default function AboutB12Page() {

  const rdaData = [
    { ageGroup: 'Infants (0-6m)', RDA: 0.4 },
    { ageGroup: 'Infants (7-12m)', RDA: 0.5 },
    { ageGroup: 'Children (1-3y)', RDA: 0.9 },
    { ageGroup: 'Children (4-8y)', RDA: 1.2 },
    { ageGroup: 'Children (9-13y)', RDA: 1.8 },
    { ageGroup: 'Teens (14-18y)', RDA: 2.4 },
    { ageGroup: 'Adults (19+y)', RDA: 2.4 },
    { ageGroup: 'Pregnancy', RDA: 2.6 },
    { ageGroup: 'Lactation', RDA: 2.8 },
  ];

  const chartValueFormatter = (number: number) => `${number} mcg`;

  const mythsFacts = [
    {
      id: 'myth1',
      question: 'Myth: You can get enough B12 from plant-based foods like spirulina.',
      answer: 'Fact: While some algae and fermented foods contain B12 analogs, they are not considered reliable sources of active B12 for humans. Vegans and vegetarians need fortified foods or supplements.'
    },
    {
      id: 'myth2',
      question: 'Myth: You can overdose on Vitamin B12 supplements.',
      answer: 'Fact: Vitamin B12 is a water-soluble vitamin, meaning excess amounts are typically excreted in urine. There is no established Tolerable Upper Intake Level (UL) for B12 due to its low potential for toxicity. However, always consult a doctor before taking high doses.'
    },
     {
      id: 'myth3',
      question: 'Myth: B12 deficiency only affects older adults.',
      answer: 'Fact: While the risk increases with age due to reduced absorption, B12 deficiency can affect people of all ages, including infants, children, and young adults, especially those with specific diets or medical conditions.'
    },
     {
      id: 'myth4',
      question: 'Myth: Energy drinks with B12 are a good source.',
      answer: 'Fact: While some energy drinks contain B12, they often have very high amounts, potentially alongside high sugar and caffeine. Relying on them isn\'t a balanced approach. Whole foods, fortified foods, or dedicated supplements are generally better.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 font-inter">

      {/* Section 1: What is Vitamin B12? */}
      <section>
         <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 text-center">About Vitamin B12</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-serif text-3xl text-primary flex items-center gap-2">
                 <Info className="w-7 h-7 text-primary/80" />
                 What is Vitamin B12?
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Vitamin B12, also known as <span className="font-semibold text-cyan-700 dark:text-cyan-400">cobalamin</span>, is a water-soluble vitamin crucial for various bodily functions. Discovered in the mid-20th century as the cure for pernicious anemia, it's unique among vitamins due to its complex structure containing the mineral cobalt.
              </p>
               <p>
                It's essential for the health of nerve tissue, brain function, and the production of red blood cells and DNA. Unlike many other vitamins, B12 is primarily synthesized by microorganisms like bacteria and archaea.
              </p>
               <div>
                  <h3 className="font-semibold text-lg mb-2 text-primary/90">Common Forms:</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground/90">
                      <li><strong className="text-cyan-700 dark:text-cyan-400">Cyanocobalamin:</strong> A synthetic, stable form often used in supplements and fortified foods.</li>
                      <li><strong className="text-cyan-700 dark:text-cyan-400">Methylcobalamin:</strong> A naturally occurring, active form found in foods and some supplements.</li>
                      <li><strong className="text-cyan-700 dark:text-cyan-400">Adenosylcobalamin:</strong> Another active form primarily involved in energy metabolism.</li>
                      <li><strong className="text-cyan-700 dark:text-cyan-400">Hydroxocobalamin:</strong> Often used in injectable B12 treatments.</li>
                  </ul>
               </div>
            </CardContent>
          </Card>
           {/* Image/Infographic Placeholder */}
           <div className="flex justify-center items-center p-6 bg-muted/30 rounded-lg shadow-inner">
             {/* Replace with an actual infographic or relevant image */}
             <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/> {/* Clock analogy for time/history */}
                <path d="M8 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V2z"/> {/* Simple molecule structure */}
                 <path d="M16 22a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2z"/>
                 <path d="M2 8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/>
                  <path d="M16 8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V8z"/>
                  <line x1="12" y1="12" x2="8" y2="10"/>
                  <line x1="12" y1="12" x2="16" y2="10"/>
                  <line x1="12" y1="12" x2="12" y2="18"/>
             </svg>
           </div>
        </div>
      </section>

      {/* Section 2: Why is it Important? */}
      <section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">The Importance of Vitamin B12</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                 <DnaIcon />
               </div>
              <CardTitle className="text-xl font-serif">DNA Synthesis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-foreground/80">B12 is a vital coenzyme for the synthesis and repair of DNA, essential for cell growth and replication.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="items-center text-center">
               <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                 <RedBloodCellIcon />
               </div>
              <CardTitle className="text-xl font-serif">Red Blood Cell Formation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-foreground/80">It works with folate to produce healthy red blood cells, preventing megaloblastic anemia.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                 <BrainCircuit className="w-6 h-6 text-cyan-700 dark:text-cyan-400" />
               </div>
              <CardTitle className="text-xl font-serif">Nerve Health & Brain Function</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-foreground/80">Crucial for maintaining the myelin sheath that protects nerves, supporting neurological function and cognition.</p>
            </CardContent>
          </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="items-center text-center">
               <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                 <HeartPulse className="w-6 h-6 text-rose-600 dark:text-rose-400" />
               </div>
              <CardTitle className="text-xl font-serif">Energy Metabolism</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-foreground/80">Plays a role in converting carbohydrates into glucose, helping the body produce energy and combat fatigue.</p>
            </CardContent>
          </Card>
           <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                 <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
               </div>
              <CardTitle className="text-xl font-serif">Immune Function</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-foreground/80">Contributes to the normal function of the immune system by supporting the production and activity of immune cells.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 3: Daily Requirements */}
      <section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">Daily Requirements (RDA)</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-primary">Recommended Dietary Allowances (Micrograms/mcg)</CardTitle>
            <CardDescription>Based on US National Institutes of Health (NIH) guidelines.</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              className="mt-6 h-80"
              data={rdaData}
              index="ageGroup"
              categories={['RDA']}
              colors={['cyan']} // Using cyan color accent
              valueFormatter={chartValueFormatter}
              yAxisWidth={48}
              showLegend={false}
              barCategoryGap="20%" // Add spacing between bars
            />
             <p className="text-xs text-muted-foreground mt-4">
               Note: RDA values represent the average daily level of intake sufficient to meet the nutrient requirements of nearly all (97%–98%) healthy individuals. Individual needs may vary.
             </p>
          </CardContent>
        </Card>
      </section>

      {/* Section 4: Myths & Facts */}
      <section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Myths & Facts</h2>
         <Accordion type="single" collapsible className="w-full bg-card p-4 md:p-6 rounded-lg shadow-md">
           {mythsFacts.map((item) => (
             <AccordionItem value={item.id} key={item.id}>
               <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors [&[data-state=open]>svg]:text-primary">
                  {item.question}
               </AccordionTrigger>
               <AccordionContent className="text-foreground/80 pt-2">
                 {item.answer}
               </AccordionContent>
             </AccordionItem>
           ))}
         </Accordion>
      </section>

       {/* Disclaimer */}
        <Card className="mt-12 border-dashed border-primary/50">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Disclaimer:</strong> The information provided on this page is for educational purposes only and does not constitute medical advice. Always consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment.
            </p>
          </CardContent>
        </Card>

    </div>
  );
}
