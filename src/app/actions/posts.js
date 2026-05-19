"use server";

import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { UserApplicationSchema, NewPasswordSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

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
  const status = formData.get("status");
  const applicationDescription = formData.get("applicationDescription");

  const validatedFields = UserApplicationSchema.safeParse({
    appName,
    nationalId,
    address,
    email,
    applicationType,
    status,
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
      status: validatedFields.data.status,
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
export async function resetCodeAction(state, formData) {
  const email = formData.get("email");

  if (!email) {
    return { message: "Email is required." };
  }

  // Generate a 6-digit code
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  // TODO: Save the reset code to your database (e.g., in a 'resetTokens' collection or the 'user' document)
  const resetTokenCollection = await getCollection("resetPasswordTokens");
  await resetTokenCollection.insertOne({
    email: String(email).trim(),
    resetCode,
    resetCodeExpires: Date.now() + 10 * 60 * 1000,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Replace with your verified sender domain
      to: [email],
      subject: "Your Password Reset Code",
      html: `<p>Your password reset code is: <strong>${resetCode}</strong></p>`,
    });

    // redirect
    if (data) {
      redirect("/forgot-password/code-input");
    }

    if (error) {
      console.error("Resend API Error:", error);
      return { message: "Failed to send reset email." };
    }

    return { success: true, message: "Reset email sent successfully!" };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { message: "An unexpected error occurred." };
  }
}

//Verify reset code server action
export async function verifyResetCodeAction(state, formData) {
  const email = formData.get("email");
  const resetCode = formData.get("resetCode");

  if (!email || !resetCode) {
    return { message: "Email and reset code are required." };
  }

  //check email and reset code in database
  const resetTokenCollection = await getCollection("resetPasswordTokens");
  const user = await resetTokenCollection.findOne({
    email: String(email).trim(),
    resetCode: String(resetCode).trim(),
    resetCodeExpires: { $gt: Date.now() },
  });

  if (!user) {
    return { message: "Invalid or expired reset code." };
  }

  // redirect
  redirect("/forgot-password/new-password");
}
