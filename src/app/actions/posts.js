"use server";

import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import {
  DataRequestSchema,
  UserApplicationSchema,
  NewPasswordSchema,
} from "@/lib/schema";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//User application server action
export async function createApplication(state, formData) {
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
  const ministry = formData.get("ministry");
  const applicationDescription = formData.get("applicationDescription");

  const validatedFields = UserApplicationSchema.safeParse({
    appName,
    nationalId,
    address,
    email,
    applicationType,
    ministry,
    applicationDescription,
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const applicationData = {
    appName: validatedFields.data.appName,
    nationalId: validatedFields.data.nationalId,
    address: validatedFields.data.address,
    email: validatedFields.data.email,
    applicationType: validatedFields.data.applicationType,
    ministry: ministry,
    applicationDescription: validatedFields.data.applicationDescription,
    userId: ObjectId.createFromHexString(user.userId),
  };

  try {
    // Save to the general 'applications' collection
    const applicationsCollection = await getCollection("applications");
    await applicationsCollection.insertOne(applicationData);

    // Determine and save to the ministry-specific collection
    let ministryCollectionName;
    if (ministry === "Ministry of Home Affairs") {
      ministryCollectionName = "home-affairs-collection";
    } else if (ministry === "Ministry of Foreign Affairs") {
      ministryCollectionName = "foreign-affairs-collection";
    } else if (ministry === "Ministry of Health") {
      ministryCollectionName = "health-collection";
    } else if (ministry === "Ministry of Education") {
      ministryCollectionName = "education-collection";
    }

    if (ministryCollectionName) {
      const ministryCollection = await getCollection(ministryCollectionName);
      await ministryCollection.insertOne(applicationData);
    }
  } catch (error) {
    console.log("Failed to save application to DB", error);
    // Optionally, return an error state to the UI
    return {
      message: "Database error: Failed to save application.",
    };
  }

  //query params
  const successUrl = `/user/applications?success=true`;

  //redirect
  redirect(successUrl);
}

//Update user application server action
export async function updateApplication(state, formData) {
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
  const ministry = formData.get("ministry");
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
    ministry,
    applicationDescription,
  });

  //check if fields is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const applicationCollection = await getCollection("applications");
  const applicationObjectId = ObjectId.createFromHexString(postId);

  // Find the original post to get the old ministry
  const originalPost = await applicationCollection.findOne({
    _id: applicationObjectId,
  });

  if (!originalPost) {
    return { message: "Application not found." };
  }

  const oldMinistry = originalPost.ministry;
  const newMinistry = validatedFields.data.ministry;

  const updatedApplicationData = {
    appName: validatedFields.data.appName,
    nationalId: validatedFields.data.nationalId,
    address: validatedFields.data.address,
    email: validatedFields.data.email,
    applicationType: validatedFields.data.applicationType,
    ministry: newMinistry,
    applicationDescription: validatedFields.data.applicationDescription,
  };

  try {
    //  Update the document in the main 'applications' collection
    await applicationCollection.updateOne(
      { _id: applicationObjectId },
      { $set: updatedApplicationData }
    );

    const getMinistryCollectionName = (ministry) => {
      if (ministry === "Ministry of Home Affairs")
        return "home-affairs-collection";
      if (ministry === "Ministry of Foreign Affairs")
        return "foreign-affairs-collection";
      if (ministry === "Ministry of Health") return "health-collection";
      if (ministry === "Ministry of Education") return "education-collection";
      return null;
    };

    const oldMinistryCollectionName = getMinistryCollectionName(oldMinistry);
    const newMinistryCollectionName = getMinistryCollectionName(newMinistry);

    // Handle ministry collection changes
    if (
      oldMinistryCollectionName &&
      oldMinistryCollectionName !== newMinistryCollectionName
    ) {
      // Ministry has changed, so delete from the old ministry collection
      const oldMinistryCollection = await getCollection(
        oldMinistryCollectionName
      );
      await oldMinistryCollection.deleteOne({ _id: applicationObjectId });
    }

    if (newMinistryCollectionName) {
      const newMinistryCollection = await getCollection(
        newMinistryCollectionName
      );
      if (oldMinistryCollectionName !== newMinistryCollectionName) {
        // Insert into the new ministry collection
        await newMinistryCollection.insertOne({
          ...updatedApplicationData,
          _id: applicationObjectId, // Ensure the _id is the same
          userId: originalPost.userId,
        });
      } else {
        // Ministry is the same, so update the document in the ministry collection
        await newMinistryCollection.updateOne(
          { _id: applicationObjectId },
          { $set: updatedApplicationData }
        );
      }
    }
  } catch (error) {
    console.log("Failed to update application in DB", error);
    return {
      message: "Database error: Failed to update application.",
    };
  }

  // redirect
  redirect("/user/applications");
}

//Delete user application server action
export async function deleteApplication(formData) {
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

  const applicationObjectId = ObjectId.createFromHexString(postId);
  const applicationCollection = await getCollection("applications");

  try {
    // Find the application to get ministry info before deleting
    const applicationToDelete = await applicationCollection.findOne({
      _id: applicationObjectId,
    });

    if (!applicationToDelete) {
      console.log("Application to delete not found.");
      revalidatePath("/user/applications");
      return;
    }

    //  Delete from the main 'applications' collection
    await applicationCollection.deleteOne({ _id: applicationObjectId });

    //  Determine ministry collection and delete from it
    const getMinistryCollectionName = (ministry) => {
      if (ministry === "Ministry of Home Affairs")
        return "home-affairs-collection";
      if (ministry === "Ministry of Foreign Affairs")
        return "foreign-affairs-collection";
      if (ministry === "Ministry of Health") return "health-collection";
      if (ministry === "Ministry of Education") return "education-collection";
      return null;
    };

    const ministryCollectionName = getMinistryCollectionName(
      applicationToDelete.ministry
    );

    if (ministryCollectionName) {
      const ministryCollection = await getCollection(ministryCollectionName);
      await ministryCollection.deleteOne({ _id: applicationObjectId });
    }
  } catch (error) {
    console.error("Failed to delete application:", error);
    // Optionally return an error state if the action hook expects it
  }

  //revalidate path
  revalidatePath("/user/applications");
}

//Data Request server action
export async function createRequestForm(state, formData) {
  //check if admin is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/admin");
  }

  //Validate form data
  const adminName = formData.get("adminName");
  const department = formData.get("department");
  const email = formData.get("email");
  const appName = formData.get("appName");
  const targetMinistry = formData.get("targetMinistry");
  const dataRequested = formData.get("dataRequested");
  const reason = formData.get("reason");

  const validatedFields = DataRequestSchema.safeParse({
    adminName,
    department,
    email,
    appName,
    targetMinistry,
    dataRequested,
    reason,
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Save application form to Db
  const dataRequestCollection = await getCollection("data-requests");
  let form;
  try {
    form = await dataRequestCollection.insertOne({
      adminName: validatedFields.data.adminName,
      department: validatedFields.data.department,
      email: validatedFields.data.email,
      appName: validatedFields.data.appName,
      targetMinistry: targetMinistry,
      dataRequested: validatedFields.data.dataRequested,
      reason: validatedFields.data.reason,
      userId: ObjectId.createFromHexString(user.userId),
    });
  } catch (error) {
    console.log("Failed to save request form to DB");
  }

  //query params
  const successUrl = `/ministry?success=true`;

  //redirect
  redirect(successUrl);
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
      { $set: { password: hashed } }
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
