"use server";

import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

// Approve server action
export async function approveForm(formData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // Validate form data
  const postId = formData.get("postId");

  const postCollection = await getCollection("applications");

  // Find post to approve
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  // Update application status
  await postCollection.findOneAndUpdate(
    { _id: post._id },
    {
      $set: {
        status: "Approved",
      },
    },
  );

  // Send email notification
  const { data, error } = await resend.emails.send({
    from: "[EMAIL_ADDRESS]",
    to: post.email,
    subject: "Application Approved",
    html: `<p>Your application status is: <strong>${post.status}</strong></p>`,
  });

  if (error) {
    console.error("Resend API Error:", error);
    return { message: "Failed to send application status email." };
  }
}

// Reject server action
export async function rejectForm(formData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // Validate form data
  const postId = formData.get("postId");

  const postCollection = await getCollection("applications");

  // Find post to reject
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  // Update application status
  await postCollection.findOneAndUpdate(
    { _id: post._id },
    {
      $set: {
        status: "Rejected",
      },
    },
  );

  // Send email notification
  const { data, error } = await resend.emails.send({
    from: "[EMAIL_ADDRESS]",
    to: post.email,
    subject: "Application Rejected",
    html: `<p>Your application status is: <strong>${post.status}</strong></p>`,
  });

  if (error) {
    console.error("Resend API Error:", error);
    return { message: "Failed to send application rejected email." };
  }
}
