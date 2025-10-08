'use server';

/**
 * @fileOverview An AI agent that routes document applications to the correct department.
 *
 * - routeDocumentApplication - A function that routes the document application.
 * - RouteDocumentApplicationInput - The input type for the routeDocumentApplication function.
 * - RouteDocumentApplicationOutput - The return type for the routeDocumentApplication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RouteDocumentApplicationInputSchema = z.object({
  applicationDescription: z
    .string()
    .describe('The description of the document application.'),
  availableDepartments: z
    .array(z.string())
    .describe('The list of available departments to route to.'),
});
export type RouteDocumentApplicationInput = z.infer<typeof RouteDocumentApplicationInputSchema>;

const RouteDocumentApplicationOutputSchema = z.object({
  department: z.string().describe('The department to route the application to.'),
  reason: z.string().describe('The reasoning behind the department selection.'),
});
export type RouteDocumentApplicationOutput = z.infer<typeof RouteDocumentApplicationOutputSchema>;

export async function routeDocumentApplication(
  input: RouteDocumentApplicationInput
): Promise<RouteDocumentApplicationOutput> {
  return routeDocumentApplicationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'routeDocumentApplicationPrompt',
  input: {schema: RouteDocumentApplicationInputSchema},
  output: {schema: RouteDocumentApplicationOutputSchema},
  prompt: `You are an expert in document routing within a ministry.

You will receive a description of a document application and a list of available departments.
Your task is to determine the most appropriate department for the application to be routed to.

Description: {{{applicationDescription}}}
Available Departments: {{#each availableDepartments}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Based on the description, the most appropriate department is:
`,
});

const routeDocumentApplicationFlow = ai.defineFlow(
  {
    name: 'routeDocumentApplicationFlow',
    inputSchema: RouteDocumentApplicationInputSchema,
    outputSchema: RouteDocumentApplicationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
