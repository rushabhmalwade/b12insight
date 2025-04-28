'use server';
/**
 * @fileOverview A Vitamin B12 deficiency symptom checker AI agent.
 *
 * - checkB12DeficiencySymptoms - A function that handles the symptom checking process.
 * - SymptomCheckerInput - The input type for the checkB12DeficiencySymptoms function.
 * - SymptomCheckerOutput - The return type for the checkB12DeficiencySymptoms function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SymptomCheckerInputSchema = z.object({
  age: z.number().describe('The age of the user in years.'),
  diet: z
    .string()
    .describe(
      'The dietary habits of the user (e.g., vegan, vegetarian, omnivore).' + ' Should be a single word.'
    ),
  symptoms: z
    .string()
    .describe(
      'A comma-separated list of symptoms the user is experiencing (e.g., fatigue, muscle weakness, memory problems).' + 'Symptoms should be as concise as possible.'
    ),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  probability: z
    .number()
    .describe(
      'The probability (as a decimal between 0 and 1) that the user has a Vitamin B12 deficiency based on the provided symptoms, age, and diet.'
    ),
  advice: z
    .string()
    .describe(
      'Brief advice for the user regarding their potential Vitamin B12 deficiency, including whether they should seek medical advice.'
    ),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function checkB12DeficiencySymptoms(
  input: SymptomCheckerInput
): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {
    schema: z.object({
      age: z.number().describe('The age of the user in years.'),
      diet: z
        .string()
        .describe(
          'The dietary habits of the user (e.g., vegan, vegetarian, omnivore).  Should be a single word.'
        ),
      symptoms: z
        .string()
        .describe(
          'A comma-separated list of symptoms the user is experiencing (e.g., fatigue, muscle weakness, memory problems).  Symptoms should be as concise as possible.'
        ),
    }),
  },
  output: {
    schema: z.object({
      probability: z
        .number()
        .describe(
          'The probability (as a decimal between 0 and 1) that the user has a Vitamin B12 deficiency based on the provided symptoms, age, and diet.'
        ),
      advice: z
        .string()
        .describe(
          'Brief advice for the user regarding their potential Vitamin B12 deficiency, including whether they should seek medical advice.'
        ),
    }),
  },
  prompt: `You are a medical assistant specializing in Vitamin B12 deficiencies.

You will assess the probability of a Vitamin B12 deficiency based on the user's age, diet, and symptoms.

Age: {{{age}}}
Diet: {{{diet}}}
Symptoms: {{{symptoms}}}

Based on this information, determine the probability of a Vitamin B12 deficiency (as a decimal between 0 and 1) and provide brief advice to the user, including whether they should seek medical advice. Return your answer in JSON format.`,
});

const symptomCheckerFlow = ai.defineFlow<
  typeof SymptomCheckerInputSchema,
  typeof SymptomCheckerOutputSchema
>(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
