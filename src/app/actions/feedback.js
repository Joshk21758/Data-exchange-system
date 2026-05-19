"use server";

import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { FeedbackSchema } from "@/lib/schema";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

// Feedback server action
export async function createFeedback(state, formData) {
  //Simulate async delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  //check if user is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/user/auth");
  }

  //validate form fields
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const validatedFields = FeedbackSchema.safeParse({
    name,
    email,
    message,
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Save feedback instance to Db
  const feedbackCollection = await getCollection("feedbacks");
  let feedback;
  try {
    feedback = await feedbackCollection.insertOne({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      message: validatedFields.data.message,
      userId: ObjectId.createFromHexString(user.userId),
    });
  } catch (error) {
    console.log(error);
  }

  //redirect
  redirect("/");
}
