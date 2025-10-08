"use server";

import { revalidatePath } from "next/cache";
import { routeDocumentApplication } from "@/ai/flows/route-document-application";

const DEPARTMENTS = [
  "Ministry of Home Affairs",
  "Ministry of Foreign Affairs",
  "Ministry of Health",
  "Ministry of Education",
];

export interface ActionState {
  department: string | null;
  reason: string | null;
  error: string | null;
}

export async function routeApplicationAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const applicationDescription = formData.get("applicationDescription") as string;

  if (!applicationDescription || applicationDescription.trim().length < 10) {
    return {
      ...prevState,
      error: "Please provide a detailed application description (at least 10 characters).",
    };
  }

  try {
    const result = await routeDocumentApplication({
      applicationDescription,
      availableDepartments: DEPARTMENTS,
    });
    // In a real application, you would now save the application to a database.
    // For this demo, we just return the AI's suggestion.
    revalidatePath("/dashboard/applications/new");
    return { ...result, error: null };
  } catch (error) {
    console.error("AI Routing Error:", error);
    return {
      department: null,
      reason: null,
      error: "Failed to get routing suggestion from AI. Please try again.",
    };
  }
}
