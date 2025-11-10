"use server";

import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Assign role server action
export default async function updateRole(formData) {
  // check if user is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/admin");
  }

  // read & validate inputs
  const userId = formData.get("userId");
  const role = formData.get("role");

  if (!userId || typeof userId !== "string" || !ObjectId.isValid(userId)) {
    return { ok: false, error: "Invalid or missing userId." };
  }

  // Whitelist allowed roles for safety. Adjust these to match your app's roles.
  const allowedRoles = ["admin", "editor", "auditor"]; // update as needed
  if (!role || typeof role !== "string" || !allowedRoles.includes(role)) {
    return { ok: false, error: "Invalid or disallowed role." };
  }

  // Prevent admins from changing their own role
  if (user.userId && String(user.userId) === String(userId)) {
    return { ok: false, error: "You cannot change your own role." };
  }

  const adminUserCollection = await getCollection("admin-user");
  const targetObjectId = ObjectId.createFromHexString(userId);

  try {
    const result = await adminUserCollection.findOneAndUpdate(
      { _id: targetObjectId },
      { $set: { role } },
      // returnDocument ensures we can check if the update matched a document
      { returnDocument: "after" }
    );

    if (!result || !result.value) {
      return { ok: false, error: "Target admin user not found." };
    }
  } catch (err) {
    console.error("Error updating role:", err);
    return { ok: false, error: "Database error while updating role." };
  }

  // revalidate the users dashboard so UI reflects the change
  revalidatePath("/dashboard/users");

  return { ok: true };
}
