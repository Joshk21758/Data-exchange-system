"use server";

import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//Assign role server action
export default async function updateRole(formData) {
  //check if user is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/admin");
  }

  //validate form data
  const userId = formData.get("userId");
  const role = formData.get("role");

  //get admin user collection
  const adminUserCollection = await getCollection("admin-user");
  //find the user by id
  const adminUser = await adminUserCollection.findOne({
    _id: ObjectId.createFromHexString(userId),
  });

  //update the role
  try {
    await adminUserCollection.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          role: role,
        },
      }
    );
  } catch (error) {
    console.log("Error updating role");
  }

  //revalidate
  revalidatePath("/dashboard/users");
}
