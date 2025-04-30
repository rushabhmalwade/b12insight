'use server';
/**
 * @fileOverview AI Diet Planner focusing on Vitamin B12 sources.
 *
 * - generateDietPlan - A function that creates a personalized diet plan.
 * - DietPlannerInput - The input type for the generateDietPlan function.
 * - DietPlannerOutput - The return type for the generateDietPlan function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

// Define Zod schemas for input and output
const MealSchema = z.object({
  name: z.string().describe('Name of the meal (e.g., Breakfast, Lunch, Dinner, Snack).'),
  description: z.string().describe('Description of the meal, including specific foods.'),
  b12_source_highlight: z.string().optional().describe('If this meal is a significant source of B12, briefly mention the B12-rich food item here.')
});

const DailyPlanSchema = z.object({
  day: z.number().int().min(1).max(7).describe('Day number (1-7).'),
  meals: z.array(MealSchema).describe('List of meals for the day.'),
  daily_summary: z.string().describe('A brief summary for the day, potentially highlighting overall B12 intake strategy.')
});

export const DietPlannerInputSchema = z.object({
  age: z.number().min(1).max(120).describe('Age of the person in years.'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).describe('Gender of the person.'),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active']).describe('Physical activity level.'),
  dietaryRestrictions: z.array(z.string()).optional().describe('List any dietary restrictions (e.g., vegan, vegetarian, gluten-free, dairy-free).'),
  allergies: z.array(z.string()).optional().describe('List any food allergies.'),
  dislikedFoods: z.array(z.string()).optional().describe('List foods the person dislikes.'),
  healthGoals: z.array(z.string()).describe('List health goals (e.g., weight loss, muscle gain, general health, improve B12 intake).'),
  planDurationDays: z.number().int().min(1).max(7).default(3).describe('Duration of the diet plan in days (1-7).'),
});
export type DietPlannerInput = z.infer<typeof DietPlannerInputSchema>;


export const DietPlannerOutputSchema = z.object({
  planTitle: z.string().describe('A suitable title for the generated diet plan.'),
  introduction: z.string().describe('A brief introductory paragraph for the diet plan, mentioning the focus on B12.'),
  dailyPlans: z.array(DailyPlanSchema).describe('An array containing the meal plans for each day.'),
  b12StrategyNotes: z.string().describe('General notes on how the plan incorporates Vitamin B12 based on the user\'s profile (e.g., reliance on fortified foods for vegans, inclusion of animal products, supplement suggestion).'),
  disclaimer: z.string().default('This diet plan is AI-generated and for informational purposes only. Consult with a qualified healthcare professional or registered dietitian before making significant changes to your diet.').describe('Standard disclaimer.'),
});
export type DietPlannerOutput = z.infer<typeof DietPlannerOutputSchema>;

// Exported function to be called from the frontend
export async function generateDietPlan(input: DietPlannerInput): Promise<DietPlannerOutput> {
  // Ensure default values are handled if not provided by the form (like planDurationDays)
  const validatedInput = DietPlannerInputSchema.parse(input);
  return dietPlannerFlow(validatedInput);
}

// Define the prompt for the AI
const dietPlannerPrompt = ai.definePrompt({
  name: 'dietPlannerPrompt',
  input: { schema: DietPlannerInputSchema },
  output: { schema: DietPlannerOutputSchema },
  prompt: `You are an expert nutritionist creating a personalized diet plan for a user. The primary focus should be ensuring adequate Vitamin B12 intake through appropriate dietary sources, considering the user's profile and preferences.

User Profile:
- Age: {{{age}}}
- Gender: {{{gender}}}
- Activity Level: {{{activityLevel}}}
{{#if dietaryRestrictions}}
- Dietary Restrictions: {{#each dietaryRestrictions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}
{{#if allergies}}
- Allergies: {{#each allergies}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}
{{#if dislikedFoods}}
- Disliked Foods: {{#each dislikedFoods}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}
- Health Goals: {{#each healthGoals}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Plan Duration: {{{planDurationDays}}} day(s)

Instructions:
1.  Create a balanced meal plan for {{{planDurationDays}}} day(s).
2.  For each day, include realistic suggestions for breakfast, lunch, dinner, and optionally 1-2 snacks.
3.  **Crucially, integrate Vitamin B12 sources relevant to the user's diet:**
    *   If omnivore/vegetarian (non-vegan), include good animal sources (meat, fish, dairy, eggs) appropriately.
    *   If vegan, focus heavily on reliably fortified foods (nutritional yeast, fortified cereals, fortified plant milks). Specify "fortified" where applicable.
    *   If vegan and goals/restrictions make fortified food intake seem difficult, suggest considering a B12 supplement in the 'b12StrategyNotes'.
4.  For each meal, briefly describe the food items.
5.  If a meal is a particularly good source of B12 (based on the plan), highlight the B12-rich food item in the 'b12_source_highlight' field for that meal.
6.  Avoid disliked foods and allergens.
7.  Align the plan with the user's health goals.
8.  Provide a 'planTitle' and a brief 'introduction'.
9.  Summarize the overall Vitamin B12 strategy in 'b12StrategyNotes'.
10. Include the standard 'disclaimer'.
11. Structure the output strictly according to the defined JSON schema. Ensure all fields are present.
`,
});


// Define the Genkit flow
const dietPlannerFlow = ai.defineFlow<
  typeof DietPlannerInputSchema,
  typeof DietPlannerOutputSchema
>(
  {
    name: 'dietPlannerFlow',
    inputSchema: DietPlannerInputSchema,
    outputSchema: DietPlannerOutputSchema,
  },
  async (input) => {
    const { output } = await dietPlannerPrompt(input);
    if (!output) {
        throw new Error('AI failed to generate a diet plan.');
    }
    // Add the default disclaimer if the AI somehow misses it (though it's defaulted in the schema)
    if (!output.disclaimer) {
         output.disclaimer = 'This diet plan is AI-generated and for informational purposes only. Consult with a qualified healthcare professional or registered dietitian before making significant changes to your diet.';
    }
    return output;
  }
);
