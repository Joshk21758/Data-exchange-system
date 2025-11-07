"use server";

import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

//Auditor server action
export default async function auditorAction(formData) {
  //check if user is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/admin");
  }

  //find the user to update
  const adminUserCollection = await getCollection("admin-user");
  const adminUser = await adminUserCollection.findOne({
    _id: ObjectId.createFromHexString(formData.get("userId")),
  });

  //update the user role
  await adminUserCollection.findOneAndUpdate(
    {
      _id: user._id,
    },
    {
      $set: {
        role: "Auditor",
      },
    }
  );

  //revalidate path
  revalidatePath("/dashboard/users");
}
