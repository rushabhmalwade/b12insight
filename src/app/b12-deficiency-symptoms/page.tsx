'use client';
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Brain, HeartPulse, SmilePlus, Stethoscope, UserCheck, Users, Footprints, HelpCircle, AlertTriangle, Leaf, Pill, Send, Loader2, CheckSquare, XSquare, ChevronRight, Activity, Eye, Thermometer } from 'lucide-react'; // Added more icons
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from "@/hooks/use-toast";
import type { SymptomCheckerInput, SymptomCheckerOutput } from '@/ai/flows/symptom-checker';
import { checkB12DeficiencySymptoms } from '@/ai/flows/symptom-checker';
import { cn } from '@/lib/utils'; // Import cn

// Note: Metadata cannot be exported from a 'use client' component.
// Define page metadata in layout.tsx or parent Server Components if needed.


// Icons for categories
const NeurologicalIcon = Brain;
const PhysicalIcon = Activity; // Activity icon for energy/physical state
const PsychologicalIcon = SmilePlus;
const OralIcon = Thermometer; // Thermometer for burning mouth / oral temp changes
const VisualIcon = Eye; // Eye icon for visual symptoms

// Symptom data structured by category
const symptomCategories = [
  {
    id: 'neurological',
    title: 'Neurological Symptoms',
    icon: NeurologicalIcon,
    colorClass: 'text-red-600 dark:text-red-400',
    bgColorClass: 'bg-red-50 dark:bg-red-900/30',
    borderColorClass: 'border-red-200 dark:border-red-700/50',
    symptoms: [
      { name: 'Numbness or Tingling (Paresthesia)', description: 'Often in hands, legs, or feet; "pins and needles" sensation.' },
      { name: 'Balance Problems & Dizziness', description: 'Difficulty walking, unsteadiness, vertigo, increased risk of falls.' },
      { name: 'Memory Loss & Cognitive Difficulties', description: 'Brain fog, trouble concentrating, forgetfulness, slowed thinking.' },
      { name: 'Muscle Weakness', description: 'Generalized or specific weakness, difficulty with coordination (ataxia).' },
      { name: 'Reflex Issues', description: 'Diminished or abnormal reflexes may be detected by a doctor.' },
      { name: 'Peripheral Neuropathy', description: 'Damage to peripheral nerves causing pain, weakness, or numbness.' },
    ],
    importance: 'Neurological damage can become permanent if not treated promptly. Early detection is key.',
  },
   {
    id: 'visual', // New Category
    title: 'Visual Symptoms',
    icon: VisualIcon,
    colorClass: 'text-cyan-600 dark:text-cyan-400',
    bgColorClass: 'bg-cyan-50 dark:bg-cyan-900/30',
    borderColorClass: 'border-cyan-200 dark:border-cyan-700/50',
    symptoms: [
      { name: 'Blurred or Double Vision', description: 'Difficulty focusing, seeing two images.' },
      { name: 'Optic Neuropathy', description: 'Damage to the optic nerve, potentially leading to vision loss (rare but serious).' },
      { name: 'Light Sensitivity', description: 'Increased sensitivity to light.' },
      { name: 'Eye Twitching', description: 'Involuntary spasms of the eyelid muscles.' },
    ],
    importance: 'Changes in vision should always be evaluated by a healthcare professional.',
  },
  {
    id: 'physical',
    title: 'Physical Symptoms',
    icon: PhysicalIcon,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgColorClass: 'bg-blue-50 dark:bg-blue-900/30',
    borderColorClass: 'border-blue-200 dark:border-blue-700/50',
    symptoms: [
      { name: 'Extreme Fatigue & Weakness', description: 'Persistent, overwhelming tiredness not relieved by rest; lack of energy.' },
      { name: 'Pale or Jaundiced Skin', description: 'Yellowish tinge to skin or whites of the eyes due to red blood cell issues (megaloblastic anemia).' },
      { name: 'Shortness of Breath (Dyspnea)', description: 'Feeling out of breath, especially with exertion, often linked to anemia.' },
      { name: 'Heart Palpitations & Rapid Heartbeat', description: 'Sensation of a fluttering, pounding, or fast-beating heart.' },
      { name: 'Unexplained Weight Loss', description: 'Losing weight without trying, often due to loss of appetite or metabolic changes.' },
      { name: 'Loss of Appetite', description: 'Reduced desire to eat, feeling full quickly.' },
    ],
    importance: 'Often related to anemia resulting from B12 deficiency impacting red blood cell production.',
  },
   {
    id: 'oral',
    title: 'Oral Symptoms',
    icon: OralIcon,
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgColorClass: 'bg-purple-50 dark:bg-purple-900/30',
    borderColorClass: 'border-purple-200 dark:border-purple-700/50',
    symptoms: [
      { name: 'Sore, Swollen, or "Beefy" Tongue (Glossitis)', description: 'Tongue may appear smooth (loss of papillae), red, inflamed, and painful.' },
      { name: 'Mouth Ulcers (Aphthous Stomatitis)', description: 'Recurrent, painful sores inside the mouth.' },
      { name: 'Burning Mouth Syndrome', description: 'Sensation of burning, tingling, or scalding in the mouth, often without visible signs.' },
      { name: 'Altered Taste or Loss of Taste', description: 'Changes in how food tastes or a diminished sense of taste.' },
      { name: 'Cracked Lips/Corners of Mouth (Angular Cheilitis)', description: 'Inflammation and cracking at the corners of the mouth.' },
    ],
    importance: 'Oral symptoms can be early and indicative signs of B12 deficiency.',
  },
  {
    id: 'psychological',
    title: 'Psychological & Mood Symptoms',
    icon: PsychologicalIcon,
    colorClass: 'text-yellow-600 dark:text-yellow-400',
    bgColorClass: 'bg-yellow-50 dark:bg-yellow-900/30',
    borderColorClass: 'border-yellow-200 dark:border-yellow-700/50',
    symptoms: [
      { name: 'Depression & Low Mood', description: 'Persistent sadness, loss of interest, feelings of hopelessness.' },
      { name: 'Anxiety & Nervousness', description: 'Increased worry, restlessness, feeling on edge.' },
      { name: 'Irritability & Mood Swings', description: 'Easily agitated, experiencing rapid shifts in emotional state.' },
      { name: 'Apathy & Lack of Motivation', description: 'Loss of interest in usual activities, lack of drive.' },
      { name: 'Confusion & Disorientation', description: 'Difficulty thinking clearly, feeling confused about time or place.' },
      { name: 'Behavioral Changes', description: 'Personality shifts, paranoia, or psychosis in severe cases.' },
    ],
    importance: 'Mental health effects significantly impact quality of life and should not be ignored.',
  },

];

const riskGroups = [
    { name: 'Vegans & Strict Vegetarians', icon: Leaf, reason: 'B12 naturally occurs almost exclusively in animal products. Requires reliable fortified foods or supplements.' },
    { name: 'Older Adults (50+)', icon: UserCheck, reason: 'Reduced stomach acid and intrinsic factor production impairs B12 absorption from food.' },
    { name: 'Gastrointestinal Conditions', icon: Stethoscope, reason: 'Crohn\'s, celiac disease, atrophic gastritis, or surgeries (gastric bypass, bowel resection) affect absorption.' },
    { name: 'Pernicious Anemia', icon: AlertTriangle, reason: 'Autoimmune condition destroying cells that produce intrinsic factor, preventing B12 absorption.' },
    { name: 'Certain Medications', icon: Pill, reason: 'Long-term use of Metformin (diabetes) or Proton Pump Inhibitors/H2 blockers (acid reflux) can interfere.' },
    { name: 'Pregnant & Breastfeeding', icon: Users, reason: 'Increased B12 demands for fetal and infant development; deficiency can impact the baby.' },
];

const severityTimeline = [
  { stage: 'Early / Mild', description: 'Subtle signs like occasional fatigue, mild tingling ("pins & needles"), slight mood changes, or occasional mouth sores may appear unnoticed.' },
  { stage: 'Moderate', description: 'Symptoms become more persistent: noticeable fatigue/weakness, frequent numbness/tingling, emerging balance issues, concentration problems ("brain fog"), possible depression/anxiety.' },
  { stage: 'Severe', description: 'Significant neurological symptoms: difficulty walking, clear memory loss/confusion, muscle weakness. Physical signs like glossitis, pale skin, shortness of breath (anemia) become more prominent.' },
  { stage: 'Long-Term / Potentially Irreversible', description: 'Untreated severe deficiency can lead to permanent nerve damage (neuropathy), chronic mobility problems, lasting cognitive decline, and serious anemia complications.' },
];

const testingInfo = [
    { test: 'Serum Vitamin B12', description: 'Measures total B12 in blood. Common first test, but limitations exist (includes inactive forms). Low levels strongly suggest deficiency.', rangeInfo: 'Ranges vary; < 200 pg/mL often deficient, 200-400 pg/mL borderline (symptoms possible).', sensitivity: 'Moderate' },
    { test: 'Methylmalonic Acid (MMA)', description: 'Measures MMA (blood or urine). Rises when B12 is insufficient for metabolism. More sensitive functional marker.', rangeInfo: 'Elevated levels indicate functional B12 deficiency at the cellular level.', sensitivity: 'High' },
    { test: 'Homocysteine', description: 'Measures homocysteine (blood). Levels increase with B12 (and folate/B6) deficiency. Less specific than MMA.', rangeInfo: 'Elevated levels suggest B12/folate issue but need other tests for confirmation.', sensitivity: 'Moderate-High (but less specific)' },
    { test: 'Holotranscobalamin (Active B12)', description: 'Measures B12 bound to transcobalamin (the form cells use). Potentially more accurate but less common.', rangeInfo: 'Low levels indicate reduced bioavailable B12.', sensitivity: 'High (but availability limited)' },
];

// Zod schema for form validation
const formSchema = z.object({
  age: z.coerce.number().min(0, { message: "Age must be a positive number." }).max(120, { message: "Please enter a realistic age." }),
  diet: z.string().min(1, { message: "Please select or describe your primary diet type." }), // Consider a Select component later
  symptoms: z.string().min(5, { message: "Please list symptoms, separated by commas (at least 5 characters)." }),
});

type SymptomFormValues = z.infer<typeof formSchema>;

export default function B12DeficiencySymptomsPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkerResult, setCheckerResult] = useState<SymptomCheckerOutput | null>(null);
  const [checkerError, setCheckerError] = useState<string | null>(null);

  const form = useForm<SymptomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      diet: "",
      symptoms: "",
    },
  });

  async function onSubmit(values: SymptomFormValues) {
    setIsSubmitting(true);
    setCheckerResult(null);
    setCheckerError(null);
    console.log('Form Values:', values);

    // Simulate API call delay for demo
    // await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const input: SymptomCheckerInput = {
        age: values.age,
        diet: values.diet.trim(), // Trim whitespace
        symptoms: values.symptoms.trim(), // Trim whitespace
      };
      const result = await checkB12DeficiencySymptoms(input);

       // Add slight delay before showing result for smoother UX
       await new Promise(resolve => setTimeout(resolve, 300));

      setCheckerResult(result);
      toast({
        title: "AI Assessment Complete",
        description: "Scroll down to review the probability and advice.",
        variant: "default",
      });
       // Scroll to results section smoothly
       document.getElementById('checker-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
      console.error("Symptom checker error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setCheckerError(`Failed to get assessment: ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Assessment Error",
        description: `Could not complete assessment. ${errorMessage.slice(0, 100)}`, // Truncate long errors
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-20 font-inter">

       <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 md:mb-12 text-center tracking-tight animate-fade-in">
         Understanding B12 Deficiency Symptoms
        </h1>

        {/* Overview Card */}
         <Card className="shadow-lg rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="p-6">
              <CardTitle className="font-serif text-2xl md:text-3xl text-primary flex items-center gap-3 tracking-tight">
                  <AlertCircle className="w-7 h-7 flex-shrink-0" /> What is B12 Deficiency?
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-4 text-base leading-relaxed text-foreground/90">
              <p>
                Vitamin B12 deficiency occurs when your body doesn't get enough B12 or cannot properly absorb and utilize the vitamin it gets. Since B12 is critical for <strong className="font-medium">nerve function, red blood cell production, DNA synthesis, and energy metabolism</strong>, a lack of it can cascade into a wide spectrum of health problems.
              </p>
               <p>
                 Symptoms often develop <strong className="font-medium">gradually over months or even years</strong> and can be nonspecific, sometimes mimicking other conditions. This insidious onset makes awareness of the diverse symptoms crucial for timely detection and intervention before potentially irreversible damage occurs.
              </p>
            </CardContent>
          </Card>

      {/* Symptom Categories Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
         <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">Common Symptom Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {symptomCategories.map((category) => (
              <Card key={category.id} className={cn("shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 rounded-xl border-l-4 overflow-hidden flex flex-col", category.bgColorClass, category.borderColorClass)}>
                 <CardHeader className="pt-5 pb-3 px-5">
                   <CardTitle className={cn("font-serif text-xl md:text-2xl flex items-center gap-3 tracking-tight", category.colorClass)}>
                     <category.icon className="w-6 h-6 flex-shrink-0" />
                     {category.title}
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="px-5 pb-4 flex-grow">
                   <ul className="space-y-2.5 text-sm text-foreground/85">
                     {category.symptoms.map((symptom, index) => (
                       <li key={index} className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 mt-1 text-primary/70 flex-shrink-0" />
                          <span><strong className="font-medium">{symptom.name}:</strong> {symptom.description}</span>
                       </li>
                     ))}
                   </ul>
                 </CardContent>
                  <CardContent className="px-5 pb-5 mt-auto">
                    <p className={cn("text-xs font-semibold mt-3 pt-3 border-t border-dashed", category.colorClass, category.borderColorClass)}>
                        <AlertTriangle className="inline w-3.5 h-3.5 mr-1" /> {category.importance}
                    </p>
                  </CardContent>
               </Card>
            ))}
          </div>
      </section>

       {/* Symptom Checker Tool Section */}
       <section id="symptom-checker" className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">AI Symptom Assessment Tool</h2>
           <Card className="shadow-xl rounded-xl border-2 border-primary/30 bg-gradient-to-br from-card to-secondary/10">
                <CardHeader className="p-6">
                    <CardTitle className="font-serif text-2xl md:text-3xl text-primary flex items-center gap-3 tracking-tight"><HelpCircle className="w-7 h-7"/> Assess Your Symptoms (AI-Powered)</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2 text-base">Enter your details below for an AI-driven probability assessment related to B12 deficiency. <br /><strong className="text-destructive font-medium">Disclaimer: This tool provides informational insights only and is NOT a substitute for professional medical diagnosis or advice.</strong> Always consult a qualified healthcare provider.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8 pt-0">
                   <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                         <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="age"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-base">Your Age</FormLabel>
                                  <FormControl>
                                    {/* Ensure value is handled correctly for number input */}
                                    <Input type="number" placeholder="Enter age in years" {...field} value={field.value === undefined ? '' : field.value} onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} className="h-11 text-base" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                             <FormField
                              control={form.control}
                              name="diet"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-base">Primary Diet Type</FormLabel>
                                  <FormControl>
                                    {/* Consider using a <Select> component here for better UX */}
                                    <Input placeholder="e.g., Vegan, Vegetarian, Omnivore, Pescatarian" {...field} className="h-11 text-base"/>
                                  </FormControl>
                                   <FormDescription className="text-xs">Helps the AI assess risk factors.</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                         </div>

                           <FormField
                            control={form.control}
                            name="symptoms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base">Symptoms Experienced</FormLabel>
                                <FormControl>
                                  <Textarea
                                      placeholder="List your symptoms separated by commas (e.g., extreme fatigue, tingling hands, brain fog, sore tongue, anxiety)"
                                      {...field}
                                      rows={5}
                                      className="text-base"
                                  />
                                </FormControl>
                                 <FormDescription className="text-xs">Be specific but concise. Use commas between symptoms.</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                         <div className="flex justify-center pt-4">
                           <Button type="submit" disabled={isSubmitting} size="lg" className="min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                             {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Assessing...</> : <>Get AI Assessment <Send className="w-5 h-5 ml-2" /></>}
                           </Button>
                         </div>
                      </form>
                    </Form>

                     {/* Results Display Area */}
                     <div id="checker-results" className="mt-10 space-y-6">
                         {/* Results Card */}
                         {checkerResult && (
                           <Card className="mt-6 bg-green-50 dark:bg-green-900/30 border-2 border-green-500/50 rounded-lg shadow-md animate-fade-in">
                              <CardHeader className="pb-3">
                                 <CardTitle className="text-xl md:text-2xl text-green-700 dark:text-green-300 flex items-center gap-2"><CheckSquare className="w-6 h-6"/> Assessment Result</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-5">
                                  <div>
                                      <p className="text-sm font-medium text-muted-foreground mb-2">Estimated Probability of B12 Deficiency:</p>
                                       <div className="flex items-center gap-3">
                                           <Progress value={checkerResult.probability * 100} className="w-full h-3 bg-green-200 dark:bg-green-800" indicatorClassName="bg-green-600 dark:bg-green-400" />
                                           <span className="font-bold text-xl text-green-700 dark:text-green-300">{(checkerResult.probability * 100).toFixed(0)}%</span>
                                       </div>
                                  </div>
                                  <div>
                                      <p className="text-sm font-medium text-muted-foreground mb-2">AI Generated Advice:</p>
                                      <p className="text-foreground/90 bg-background/50 p-3 rounded-md border border-green-200 dark:border-green-700/50 text-base">{checkerResult.advice}</p>
                                  </div>
                                   <p className="text-xs text-muted-foreground pt-4 border-t border-dashed border-green-300 dark:border-green-700">
                                      <strong className="text-destructive">Crucial Reminder:</strong> This AI assessment is informational only and cannot replace professional medical evaluation. Consult your doctor to discuss symptoms and appropriate testing.
                                   </p>
                              </CardContent>
                           </Card>
                         )}

                         {/* Error Card */}
                         {checkerError && (
                             <Card className="mt-6 bg-red-50 dark:bg-red-900/30 border-2 border-destructive/50 rounded-lg shadow-md animate-fade-in">
                                 <CardHeader className="pb-3">
                                    <CardTitle className="text-xl md:text-2xl text-destructive flex items-center gap-2"><XSquare className="w-6 h-6"/> Assessment Error</CardTitle>
                                 </CardHeader>
                                 <CardContent>
                                     <p className="text-destructive/90 text-base">{checkerError}</p>
                                      <p className="text-xs text-muted-foreground mt-3">
                                         Please check your connection and try again. If the issue persists, the service might be temporarily unavailable.
                                      </p>
                                 </CardContent>
                             </Card>
                         )}
                    </div>

                </CardContent>
           </Card>
       </section>


      {/* Risk Groups Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">Who is at Higher Risk?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {riskGroups.map((group) => (
              <Card key={group.name} className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col text-center rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm">
                 <CardHeader className="items-center pt-6 pb-3">
                    <div className="p-3 bg-primary/10 rounded-full mb-4 inline-block transition-transform duration-300 group-hover:scale-110 text-primary">
                         <group.icon className="w-8 h-8" />
                    </div>
                   <CardTitle className="font-serif text-lg md:text-xl tracking-tight">{group.name}</CardTitle>
                 </CardHeader>
                 <CardContent className="flex-grow px-5 pb-6">
                   <p className="text-sm text-muted-foreground leading-relaxed">{group.reason}</p>
                 </CardContent>
               </Card>
            ))}
          </div>
           <p className="text-center mt-8 text-base text-muted-foreground">
                Belonging to a risk group doesn't guarantee deficiency, but increases the likelihood. Regular monitoring may be advisable.
           </p>
      </section>

      {/* Severity Timeline Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">Progression of Deficiency (If Untreated)</h2>
         <Card className="shadow-xl rounded-xl border border-border/50 overflow-hidden bg-card/90 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 p-6 border-b">
               <CardTitle className="font-serif text-2xl md:text-3xl text-primary flex items-center gap-3 tracking-tight"><Footprints className="w-7 h-7"/>Severity Stages</CardTitle>
               <CardDescription className="text-muted-foreground mt-1 text-base">Symptoms typically worsen gradually over time without intervention.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
               <div className="relative pl-6 before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-primary/30">
                  {severityTimeline.map((stage, index) => (
                     <div key={stage.stage} className="relative mb-8 pl-8 last:mb-0">
                       {/* Dot on the timeline */}
                       <div className="absolute left-[-4px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary shadow">
                           <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                        </div>
                         {/* Content */}
                       <div>
                         <h4 className="font-semibold text-lg md:text-xl text-primary/90 mb-1 font-serif tracking-tight">{stage.stage}</h4>
                         <p className="text-muted-foreground text-base leading-relaxed">{stage.description}</p>
                       </div>
                     </div>
                  ))}
               </div>
                 <p className="text-base text-red-600 dark:text-red-400 mt-8 pt-4 border-t border-dashed font-medium flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0"/> Early detection and treatment are crucial to prevent potentially permanent neurological consequences.
                  </p>
            </CardContent>
         </Card>
      </section>

       {/* Testing Information Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
         <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">How is B12 Deficiency Diagnosed?</h2>
         <Card className="shadow-xl rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm">
             <CardHeader className="bg-muted/30 p-6 border-b">
                 <CardTitle className="font-serif text-2xl md:text-3xl text-primary flex items-center gap-3 tracking-tight"><Stethoscope className="w-7 h-7"/>Diagnostic Tests</CardTitle>
                 <CardDescription className="text-muted-foreground mt-1 text-base">Several blood tests help assess Vitamin B12 status. A combination is often most informative.</CardDescription>
             </CardHeader>
             <CardContent className="p-6 md:p-8">
                  <Accordion type="single" collapsible className="w-full space-y-3">
                     {testingInfo.map((test, index) => (
                         <AccordionItem value={`item-${index}`} key={index} className="border px-4 rounded-lg bg-background/50 hover:bg-muted/40 transition-colors shadow-sm">
                         <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors text-base md:text-lg py-4 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                            {test.test} <Badge variant="outline" className="ml-3 text-xs">{test.sensitivity} Sensitivity</Badge>
                         </AccordionTrigger>
                         <AccordionContent className="space-y-2 pt-1 pb-4 text-foreground/85 text-base leading-relaxed">
                            <p>{test.description}</p>
                            <p><strong className="text-primary/90 font-medium">Interpretation:</strong> {test.rangeInfo}</p>
                         </AccordionContent>
                         </AccordionItem>
                     ))}
                 </Accordion>
                  <p className="text-sm text-muted-foreground mt-8 pt-4 border-t border-dashed">
                     Your healthcare provider will interpret test results in the context of your symptoms, medical history, and risk factors to make an accurate diagnosis. Do not self-diagnose based on test results alone.
                  </p>
             </CardContent>
         </Card>
      </section>

        {/* Final Disclaimer */}
         <Card className="mt-16 border-2 border-dashed border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/20 rounded-lg animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0" />
              <div>
                 <h3 className="font-semibold text-amber-700 dark:text-amber-400">Medical Disclaimer</h3>
                 <p className="text-sm text-amber-800/90 dark:text-amber-300/90 mt-1">
                    This website, including the AI symptom assessment tool, provides general information for educational purposes only. It is not intended as, and should not be considered, a substitute for professional medical advice, diagnosis, or treatment. Always consult with a physician or other qualified health provider regarding any medical condition or health concerns. Never disregard professional medical advice or delay seeking it because of something you have read here.
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
