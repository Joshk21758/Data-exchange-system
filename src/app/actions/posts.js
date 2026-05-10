"use server";

import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { UserApplicationSchema, NewPasswordSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//User application server action
export async function createApplication(state, formData) {
  //Simulate async delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  //check if user is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/user/auth");
  }

  //Validate form data
  const appName = formData.get("appName");
  const nationalId = formData.get("nationalId");
  const address = formData.get("address");
  const email = formData.get("email");
  const applicationType = formData.get("applicationType");
  const applicationDescription = formData.get("applicationDescription");

  const validatedFields = UserApplicationSchema.safeParse({
    appName,
    nationalId,
    address,
    email,
    applicationType,
    applicationDescription,
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Save post instance to Db
  const postCollection = await getCollection("applications");
  let post;
  try {
    post = await postCollection.insertOne({
      appName: validatedFields.data.appName,
      nationalId: validatedFields.data.nationalId,
      address: validatedFields.data.address,
      email: validatedFields.data.email,
      applicationType: validatedFields.data.applicationType,
      applicationDescription: validatedFields.data.applicationDescription,
      userId: ObjectId.createFromHexString(user.userId),
    });
  } catch (error) {
    console.log(error);
  }

  //redirect
  redirect("/user/dashboard?success=true");
}

//Update user application server action
export async function updateApplication(state, formData) {
  //Simulate async delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  //check if user is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/user/auth");
  }

  //validate form fields
  const appName = formData.get("appName");
  const nationalId = formData.get("nationalId");
  const address = formData.get("address");
  const email = formData.get("email");
  const applicationType = formData.get("applicationType");
  const applicationDescription = formData.get("applicationDescription");
  const postId = formData.get("postId");

  if (!postId || !ObjectId.isValid(postId)) {
    return {
      message: "Invalid application ID.",
    };
  }

  const validatedFields = UserApplicationSchema.safeParse({
    appName,
    nationalId,
    address,
    email,
    applicationType,
    applicationDescription,
  });

  //check if fields is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //find the post
  const postCollection = await getCollection("applications");
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  //update post
  (await postCollection.findOneAndUpdate(
    { _id: post._id },
    {
      $set: {
        appName: validatedFields.data.appName,
        nationalId: validatedFields.data.nationalId,
        address: validatedFields.data.address,
        email: validatedFields.data.email,
        applicationType: validatedFields.data.applicationType,
        applicationDescription: validatedFields.data.applicationDescription,
      },
    },
  ),
    // redirect
    redirect("/user/applications"));
}

//Delete user application server action
export async function deleteApplication(formData) {
  //Simulate async delay
  await new Promise((resolve) => setTimeout(resolve, 4000));

  //check if user is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/user/auth");
  }

  const postId = formData.get("postId");

  if (!postId || !ObjectId.isValid(postId)) {
    console.error("Invalid or missing postId for deletion");
    return;
  }

  //find post to delete
  const postCollection = await getCollection("applications");
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(formData.get("postId")),
  });

  //Delete the post
  await postCollection.findOneAndDelete({ _id: post._id });

  //revalidate path
  revalidatePath("/user/applications");
}

//New password server action
export async function newPasswordAction(state, formData) {
  // Validate passwords
  const newPass = formData.get("newPass");
  const confirmPassword = formData.get("confirmPassword");

  const validated = NewPasswordSchema.safeParse({
    newPass,
    confirmPassword,
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  // Identify the user
  const email = formData.get("email");
  if (!email) {
    return { message: "Missing email address for password reset." };
  }

  //check email and user collection is valid
  const userCollection = await getCollection("user");
  if (!userCollection) {
    return { message: "User collection not available." };
  }

  const user = await userCollection.findOne({ email: String(email).trim() });
  if (!user) {
    return { message: "No user found with that email." };
  }

  // Hash new password and update
  try {
    const hashed = await bcrypt.hash(validated.data.newPass, 10);
    await userCollection.updateOne(
      { _id: user._id },
      { $set: { password: hashed } },
    );
  } catch (err) {
    console.error("Failed to update password:", err);
    return { message: "Failed to update password." };
  }

  // redirect
  redirect("/user/auth");
}

//Reset code server action
export async function resetCodeAction() {
  redirect("/forgot-password/new-password");
}
