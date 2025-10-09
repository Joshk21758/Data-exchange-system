"use server";

import { revalidatePath } from "next/cache";
import { routeDocumentApplication } from "@/ai/flows/route-document-application";

const DEPARTMENTS = [
  "Ministry of Home Affairs",
  "Ministry of Foreign Affairs",
  "Ministry of Health",
  "Ministry of Education",
];



export async function routeApplicationAction(
  prevState,
  formData
) {
  const applicationDescription = formData.get("applicationDescription");
  const ministry = formData.get("ministry");

  if (!applicationDescription || applicationDescription.trim().length < 10) {
    return {
      ...prevState,
      error: "Please provide a detailed application description (at least 10 characters).",
    };
  }

  // If a ministry is selected, we bypass the AI routing.
  if (ministry) {
      // In a real application, you would save this to the database.
      revalidatePath("/dashboard/applications/new");
      return { department: ministry, reason: "Manual selection by user.", error: null };
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
