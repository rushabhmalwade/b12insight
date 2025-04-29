'use client';
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Brain, HeartPulse, SmilePlus, Stethoscope, UserCheck, Users, Footprints, HelpCircle, AlertTriangle, Leaf, Pill, Send, Loader2 } from 'lucide-react'; // Import Leaf, Pill, Send, Loader2
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import Link for navigation
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from "@/hooks/use-toast";
import type { SymptomCheckerInput, SymptomCheckerOutput } from '@/ai/flows/symptom-checker'; // Import types
import { checkB12DeficiencySymptoms } from '@/ai/flows/symptom-checker'; // Import the flow function

// Icons for categories
const NeurologicalIcon = Brain;
const PhysicalIcon = HeartPulse; // Representing overall body function/energy
const PsychologicalIcon = SmilePlus; // Representing mental state
const OralIcon = () => ( // Custom SVG for mouth/tongue
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouth"><path d="M10 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Z"/><path d="M18 14v-2a6 6 0 1 0-12 0v2h12Z"/><path d="M18 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2"/><path d="M11.7 18.5c.3.2.6.4.9.6.3-.2.6-.4.9-.6"/></svg>
);

// Symptom data structured by category
const symptomCategories = [
  {
    id: 'neurological',
    title: 'Neurological Symptoms',
    icon: NeurologicalIcon,
    colorClass: 'text-red-600 dark:text-red-400', // Example color coding
    bgColorClass: 'bg-red-50 dark:bg-red-900/20',
    symptoms: [
      { name: 'Numbness or Tingling', description: 'Often in hands, legs, or feet ("pins and needles").' },
      { name: 'Balance Problems', description: 'Difficulty walking, unsteadiness, increased risk of falls.' },
      { name: 'Memory Loss & Confusion', description: 'Difficulty concentrating, brain fog, forgetfulness.' },
      { name: 'Vision Problems', description: 'Blurred or disturbed vision due to optic nerve damage.' },
      { name: 'Muscle Weakness', description: 'General or specific muscle weakness.' },
      { name: 'Coordination Issues (Ataxia)', description: 'Problems with fine motor skills or movement control.' },
    ],
    importance: 'Neurological damage can become irreversible if not treated promptly.',
  },
  {
    id: 'physical',
    title: 'Physical Symptoms',
    icon: PhysicalIcon,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgColorClass: 'bg-blue-50 dark:bg-blue-900/20',
    symptoms: [
      { name: 'Fatigue & Weakness', description: 'Persistent tiredness, lack of energy, often profound.' },
      { name: 'Pale or Jaundiced Skin', description: 'Yellowish tinge to skin or eyes due to red blood cell issues.' },
      { name: 'Shortness of Breath & Dizziness', description: 'Caused by anemia (lack of healthy red blood cells).' },
      { name: 'Heart Palpitations', description: 'Feeling of a fast-beating, fluttering, or pounding heart.' },
      { name: 'Weight Loss', description: 'Unintentional decrease in body weight.' },
      { name: 'Loss of Appetite', description: 'Reduced desire to eat.' },
    ],
    importance: 'These often relate to anemia caused by B12 deficiency.',
  },
  {
    id: 'psychological',
    title: 'Psychological Symptoms',
    icon: PsychologicalIcon,
    colorClass: 'text-yellow-600 dark:text-yellow-400',
    bgColorClass: 'bg-yellow-50 dark:bg-yellow-900/20',
    symptoms: [
      { name: 'Depression', description: 'Low mood, loss of interest, feelings of hopelessness.' },
      { name: 'Anxiety & Irritability', description: 'Increased worry, nervousness, easily agitated.' },
      { name: 'Mood Swings', description: 'Rapid changes in emotional state.' },
      { name: 'Behavioral Changes', description: 'Personality shifts, unusual behavior.' },
      { name: 'Cognitive Difficulties', description: 'Problems with thinking, reasoning, or understanding.' },
    ],
    importance: 'Mental health effects can significantly impact quality of life.',
  },
  {
    id: 'oral',
    title: 'Oral Symptoms',
    icon: OralIcon,
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgColorClass: 'bg-purple-50 dark:bg-purple-900/20',
    symptoms: [
      { name: 'Sore or Swollen Tongue (Glossitis)', description: 'Tongue may appear smooth, red, and painful.' },
      { name: 'Mouth Ulcers or Sores', description: 'Painful sores inside the mouth.' },
      { name: 'Burning Mouth Syndrome', description: 'A burning or tingling sensation in the mouth.' },
      { name: 'Altered Taste', description: 'Changes in how food tastes.' },
    ],
    importance: 'Oral symptoms can be early indicators of B12 deficiency.',
  },
];

const riskGroups = [
    { name: 'Vegans & Vegetarians', icon: Leaf, reason: 'B12 is primarily found in animal products. Strict plant-based diets require fortified foods or supplements.' },
    { name: 'Older Adults (50+)', icon: UserCheck, reason: 'Reduced stomach acid production can impair B12 absorption from food.' },
    { name: 'Pregnant & Breastfeeding Women', icon: Users, reason: 'Increased B12 needs to support fetal and infant development.' },
    { name: 'Individuals with Gastrointestinal Issues', icon: Stethoscope, reason: 'Conditions like Crohn\'s, celiac disease, or surgeries (e.g., gastric bypass) can affect absorption.' },
    { name: 'Individuals on Certain Medications', icon: Pill, reason: 'Metformin (for diabetes) and long-term use of proton pump inhibitors (acid reflux meds) can interfere with B12 absorption.' },
    { name: 'Individuals with Pernicious Anemia', icon: AlertTriangle, reason: 'An autoimmune condition preventing the absorption of B12 due to lack of intrinsic factor.' },
];

const severityTimeline = [
  { stage: 'Mild', description: 'Early signs like fatigue, mild tingling, occasional mood changes, or mouth sores may appear subtly.' },
  { stage: 'Moderate', description: 'Symptoms become more persistent and noticeable: increased fatigue, definite numbness/tingling, balance issues, memory problems, depression/anxiety.' },
  { stage: 'Severe', description: 'Significant neurological impairment (difficulty walking, severe memory loss, confusion), profound weakness, risk of anemia complications.' },
  { stage: 'Potentially Irreversible', description: 'Long-term, untreated deficiency can lead to permanent nerve damage, chronic mobility issues, and lasting cognitive decline.' },
];

const testingInfo = [
    { test: 'Serum Vitamin B12 Test', description: 'Measures the total amount of B12 in the blood. Most common initial test, but may not always reflect active B12 levels available to cells.', rangeInfo: 'Reference ranges vary by lab, but levels below 200-300 pg/mL often indicate deficiency.' },
    { test: 'Methylmalonic Acid (MMA) Test', description: 'Measures MMA levels in blood or urine. MMA increases when B12 is low, as B12 is needed to metabolize it. Considered a more sensitive marker of functional B12 deficiency.', rangeInfo: 'Elevated MMA levels strongly suggest B12 deficiency.' },
    { test: 'Homocysteine Test', description: 'Measures homocysteine levels in the blood. Levels can increase with B12 (and folate) deficiency. Less specific than MMA as other factors can raise homocysteine.', rangeInfo: 'Elevated levels can indicate B12 or folate deficiency.' },
    { test: 'Holotranscobalamin (Active B12) Test', description: 'Measures the amount of B12 attached to its transport protein (transcobalamin), representing the B12 readily available for cells. Potentially more accurate but less widely available.', rangeInfo: 'Lower levels indicate reduced bioavailable B12.' },
];

// Zod schema for form validation based on SymptomCheckerInput
const formSchema = z.object({
  age: z.coerce.number().min(0, { message: "Age must be a positive number." }).max(120, { message: "Please enter a realistic age." }),
  diet: z.string().min(1, { message: "Please describe your primary diet type (e.g., Vegan, Omnivore)." }),
  symptoms: z.string().min(3, { message: "Please list at least one symptom." }),
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
      age: undefined, // Use undefined for number inputs initially
      diet: "",
      symptoms: "",
    },
  });

  async function onSubmit(values: SymptomFormValues) {
    setIsSubmitting(true);
    setCheckerResult(null); // Clear previous results
    setCheckerError(null); // Clear previous errors
    console.log('Form Values:', values);

    try {
      const input: SymptomCheckerInput = {
        age: values.age,
        diet: values.diet,
        symptoms: values.symptoms,
      };
      const result = await checkB12DeficiencySymptoms(input);
      setCheckerResult(result);
      toast({
        title: "Assessment Complete",
        description: "Review the probability and advice below.",
      });
    } catch (error) {
      console.error("Symptom checker error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setCheckerError(`Failed to get assessment: ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Could not complete assessment. ${errorMessage}`,
      });
    } finally {
      setIsSubmitting(false);
      // Do not reset form here, allow user to see their inputs with the result
      // form.reset();
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 font-inter">

       <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 text-center">Understanding B12 Deficiency Symptoms</h1>

        {/* Overview Card */}
         <Card className="shadow-md bg-muted/30">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-primary flex items-center gap-2"><AlertCircle className="w-6 h-6" /> What is B12 Deficiency?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-foreground/90">
              <p>
                Vitamin B12 deficiency occurs when your body doesn't get enough or can't properly absorb the vitamin B12 it needs. Because B12 is crucial for nerve function, red blood cell production, and DNA synthesis, a deficiency can lead to a wide range of health problems, affecting physical, neurological, and mental well-being.
              </p>
               <p>
                 Symptoms often develop gradually and can be mistaken for other conditions, making awareness crucial for early detection and treatment.
              </p>
            </CardContent>
          </Card>

      {/* Symptom Categories Section */}
      <section>
         <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Common Symptom Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {symptomCategories.map((category) => (
              <Card key={category.id} className={`shadow-md hover:shadow-lg transition-shadow ${category.bgColorClass} border-l-4 border-current ${category.colorClass}`}>
                 <CardHeader>
                   <CardTitle className={`font-serif text-xl flex items-center gap-2 ${category.colorClass}`}>
                     <category.icon className="w-6 h-6" />
                     {category.title}
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
                     {category.symptoms.map((symptom, index) => (
                       <li key={index}>
                         <span className="font-medium">{symptom.name}:</span> {symptom.description}
                       </li>
                     ))}
                   </ul>
                    <p className="text-sm font-semibold text-foreground/90 mt-4 border-t border-current pt-3">{category.importance}</p>
                 </CardContent>
               </Card>
            ))}
          </div>
      </section>

       {/* Symptom Checker Tool Section */}
       <section id="symptom-checker">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">AI Symptom Assessment</h2>
           <Card className="shadow-lg border-primary/30">
                <CardHeader>
                    <CardTitle className="font-serif text-2xl text-primary flex items-center gap-2"><HelpCircle className="w-6 h-6"/> Assess Your Symptoms (AI-Powered)</CardTitle>
                    <CardDescription>Enter your details below to get an AI-based probability assessment for B12 deficiency. <strong className="text-destructive">This is not a diagnosis.</strong> Consult a healthcare professional for medical advice.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                         <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="age"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Age</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="Enter your age" {...field} value={field.value ?? ''} />
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
                                  <FormLabel>Primary Diet Type</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Vegan, Vegetarian, Omnivore, Pescatarian" {...field} />
                                  </FormControl>
                                   <FormDescription>A single word describing your main diet helps the assessment.</FormDescription>
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
                                <FormLabel>Symptoms Experienced</FormLabel>
                                <FormControl>
                                  <Textarea
                                      placeholder="List your symptoms, separated by commas (e.g., fatigue, tingling hands, brain fog, pale skin)"
                                      {...field}
                                      rows={4}
                                  />
                                </FormControl>
                                 <FormDescription>Be concise but clear. Use commas between symptoms.</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                         <div className="flex justify-end">
                           <Button type="submit" disabled={isSubmitting} size="lg">
                             {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Assessing...</> : <>Get Assessment <Send className="w-4 h-4 ml-2" /></>}
                           </Button>
                         </div>
                      </form>
                    </Form>

                     {/* Results Display */}
                     {checkerResult && (
                       <Card className="mt-6 bg-green-50 dark:bg-green-900/20 border-green-600">
                          <CardHeader>
                             <CardTitle className="text-xl text-green-700 dark:text-green-400">Assessment Result</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                              <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-1">Probability of B12 Deficiency:</p>
                                   <div className="flex items-center gap-2">
                                       <Progress value={checkerResult.probability * 100} className="w-full h-3" />
                                       <span className="font-bold text-lg text-green-700 dark:text-green-400">{(checkerResult.probability * 100).toFixed(0)}%</span>
                                   </div>
                              </div>
                              <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-1">AI Generated Advice:</p>
                                  <p className="text-foreground/90">{checkerResult.advice}</p>
                              </div>
                               <p className="text-xs text-muted-foreground pt-4 border-t">
                                  <strong className="text-destructive">Important:</strong> This assessment is based on AI analysis and is for informational purposes only. It does not replace professional medical diagnosis. Please consult your doctor to discuss your symptoms and potential testing.
                               </p>
                          </CardContent>
                       </Card>
                     )}

                     {/* Error Display */}
                     {checkerError && (
                         <Card className="mt-6 bg-red-50 dark:bg-red-900/20 border-destructive">
                             <CardHeader>
                                <CardTitle className="text-xl text-destructive">Assessment Error</CardTitle>
                             </CardHeader>
                             <CardContent>
                                 <p className="text-destructive/90">{checkerError}</p>
                                  <p className="text-xs text-muted-foreground mt-2">
                                     Please check your network connection and try again. If the problem persists, contact support.
                                  </p>
                             </CardContent>
                         </Card>
                     )}

                </CardContent>
           </Card>
       </section>


      {/* Risk Groups Section */}
      <section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Who is at Risk?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskGroups.map((group) => (
              <Card key={group.name} className="shadow-md hover:shadow-lg transition-shadow flex flex-col text-center">
                 <CardHeader className="items-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                         <group.icon className="w-7 h-7 text-primary/80" />
                    </div>
                   <CardTitle className="font-serif text-lg">{group.name}</CardTitle>
                 </CardHeader>
                 <CardContent className="flex-grow">
                   <p className="text-sm text-muted-foreground">{group.reason}</p>
                 </CardContent>
               </Card>
            ))}
          </div>
           <p className="text-center mt-6 text-sm text-muted-foreground">
                If you belong to one or more of these groups, regular B12 level monitoring might be recommended.
           </p>
      </section>

      {/* Severity Timeline Section */}
      <section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Progression of Deficiency</h2>
         <Card className="shadow-lg">
            <CardHeader>
               <CardTitle className="font-serif text-2xl text-primary flex items-center gap-2"><Footprints className="w-6 h-6"/>Severity Stages</CardTitle>
               <CardDescription>B12 deficiency symptoms typically worsen over time if left untreated.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simple list representation of the timeline */}
               <div className="space-y-6">
                  {severityTimeline.map((stage, index) => (
                     <div key={stage.stage} className="flex items-start gap-4">
                       <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">{index + 1}</div>
                       <div>
                         <h4 className="font-semibold text-lg text-primary/90">{stage.stage}</h4>
                         <p className="text-muted-foreground">{stage.description}</p>
                       </div>
                     </div>
                  ))}
               </div>
                 <p className="text-sm text-red-600 dark:text-red-400 mt-6 font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4"/> Early detection and treatment are crucial to prevent potentially permanent neurological damage.
                  </p>
            </CardContent>
         </Card>
      </section>

       {/* Testing Information Section */}
      <section>
         <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">How is B12 Deficiency Tested?</h2>
         <Card className="shadow-md">
             <CardHeader>
                 <CardTitle className="font-serif text-2xl text-primary flex items-center gap-2"><Stethoscope className="w-6 h-6"/>Diagnostic Tests</CardTitle>
                 <CardDescription>Several blood tests can help diagnose a Vitamin B12 deficiency.</CardDescription>
             </CardHeader>
             <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                     {testingInfo.map((test, index) => (
                         <AccordionItem value={`item-${index}`} key={index}>
                         <AccordionTrigger className="font-semibold text-lg hover:text-primary transition-colors">
                            {test.test}
                         </AccordionTrigger>
                         <AccordionContent className="space-y-2 pt-2 text-foreground/80">
                            <p>{test.description}</p>
                            <p><strong className="text-primary/90">Typical Range Info:</strong> {test.rangeInfo}</p>
                         </AccordionContent>
                         </AccordionItem>
                     ))}
                 </Accordion>
                  <p className="text-sm text-muted-foreground mt-6">
                     Your healthcare provider will determine the most appropriate tests based on your symptoms, medical history, and risk factors. Results should always be interpreted by a qualified professional.
                  </p>
             </CardContent>
         </Card>
      </section>

        {/* Disclaimer */}
        <Card className="mt-12 border-dashed border-primary/50">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Disclaimer:</strong> This information, including the AI symptom assessment, is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
            </p>
          </CardContent>
        </Card>
    </div>
  );
}
