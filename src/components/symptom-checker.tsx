'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { checkB12DeficiencySymptoms, type SymptomCheckerOutput } from '@/ai/flows/symptom-checker';
import { Loader2, AlertCircle } from 'lucide-react';

const formSchema = z.object({
  age: z.coerce.number().int().min(0, { message: 'Age must be a positive number.' }).max(120),
  diet: z.enum(['omnivore', 'vegetarian', 'vegan']),
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }),
});

type SymptomCheckerFormValues = z.infer<typeof formSchema>;

export function SymptomChecker() {
  const [result, setResult] = useState<SymptomCheckerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SymptomCheckerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      diet: undefined,
      symptoms: '',
    },
  });

  async function onSubmit(values: SymptomCheckerFormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null); // Clear previous results

    try {
      const response = await checkB12DeficiencySymptoms({
        age: values.age,
        diet: values.diet,
        symptoms: values.symptoms,
      });
      setResult(response);
    } catch (err) {
      console.error('Symptom checker error:', err);
      setError('An error occurred while checking symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const probabilityPercentage = result ? Math.round(result.probability * 100) : 0;

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your age" {...field} />
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
                  <FormLabel>Primary Diet</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary diet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="omnivore">Omnivore</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the diet that best describes your eating habits.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your symptoms (e.g., fatigue, tingling, memory issues)"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>
                    Please list any symptoms you are experiencing, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                'Check Symptoms'
              )}
            </Button>
          </form>
        </Form>

        {error && (
          <Alert variant="destructive" className="mt-6">
             <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && !isLoading && !error && (
          <Card className="mt-6 bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-lg">Assessment Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                 <p className="text-sm font-medium mb-1">Probability of B12 Deficiency:</p>
                 <div className="flex items-center gap-2">
                    <Progress value={probabilityPercentage} className="w-[calc(100%-4rem)] h-3" />
                    <span className="font-bold text-primary">{probabilityPercentage}%</span>
                 </div>

              </div>
               <div>
                 <p className="text-sm font-medium mb-1">Advice:</p>
                 <p className="text-sm text-foreground/90">{result.advice}</p>
              </div>

            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Disclaimer: This tool provides a probability assessment based on AI analysis and is not a substitute for professional medical advice. Consult a healthcare provider for diagnosis and treatment.
              </p>
            </CardFooter>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
