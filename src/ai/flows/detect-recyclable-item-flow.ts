'use server';
/**
 * @fileOverview An AI flow to detect recyclable items from images.
 *
 * - detectRecyclableItem - A function that handles the item detection process.
 * - DetectRecyclableItemInput - The input type for the detectRecyclableItem function.
 * - DetectRecyclableItemOutput - The return type for the detectRecyclableItem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectRecyclableItemInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectRecyclableItemInput = z.infer<typeof DetectRecyclableItemInputSchema>;

const DetectRecyclableItemOutputSchema = z.object({
  itemName: z.string().describe('The common name of the primary item detected in the image. If no specific item is identifiable, return "Unknown Item".'),
  itemCategory: z.string().describe('The general recycling category for this item (e.g., Plastic, Paper, Glass, Metal, Electronics, Organic, Not Recyclable, Unknown). Default to "Unknown" if not clear.'),
  isRecyclable: z.boolean().describe('Whether this item is commonly recyclable. Default to false if uncertain.'),
  recyclingAdvice: z.string().describe('Brief advice on how to prepare this item for recycling (e.g., "Empty and rinse. Remove cap.") or why it might not be recyclable. Provide helpful general advice if the item is "Unknown".'),
});
export type DetectRecyclableItemOutput = z.infer<typeof DetectRecyclableItemOutputSchema>;

export async function detectRecyclableItem(input: DetectRecyclableItemInput): Promise<DetectRecyclableItemOutput> {
  return detectRecyclableItemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectRecyclableItemPrompt',
  input: {schema: DetectRecyclableItemInputSchema},
  output: {schema: DetectRecyclableItemOutputSchema},
  prompt: `You are an expert in waste management and recycling, focusing on common household items. Analyze the provided image to identify the single, primary item shown.

Your tasks are:
1.  Identify the primary item in the image. If multiple items are present, focus on the most prominent one or the one most likely being queried for recycling.
2.  Determine if this item is commonly recyclable.
3.  Classify the item into one of the following categories: Plastic, Paper, Cardboard, Glass, Metal, Electronics, Organic, Textile, Not Recyclable, or Unknown.
4.  Provide brief, actionable advice (1-2 sentences) on how to prepare the item for recycling if it is recyclable. If it's not recyclable, briefly explain why or suggest alternative disposal. If the item or its recyclability is unknown, provide general good-practice recycling advice.

Image to analyze: {{media url=photoDataUri}}

Provide your response in the structured format defined by the output schema.
If the image is unclear, or the item is not easily identifiable, make a best guess for itemName as "Unclear Object" or "Multiple Items", set isRecyclable to false, itemCategory to "Unknown", and provide general recycling tips as recyclingAdvice.
`,
});

const detectRecyclableItemFlow = ai.defineFlow(
  {
    name: 'detectRecyclableItemFlow',
    inputSchema: DetectRecyclableItemInputSchema,
    outputSchema: DetectRecyclableItemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Ensure there's always a valid output, even if the LLM fails to provide one fully.
    // This guards against cases where the LLM might return null or an incomplete object.
    return output || {
        itemName: "Error in detection",
        itemCategory: "Unknown",
        isRecyclable: false,
        recyclingAdvice: "Could not process the image. Please try again with a clearer image."
    };
  }
);
