"use server";

import { getCollection } from "@/lib/db";
import {
  AdminLoginSchema,
  AdminRegisterSchema,
  UserLoginSchema,
  UserRegisterSchema,
} from "@/lib/schema";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";
import { errors } from "jose";

//User Register server actions
export async function register(state, formData) {
  //Validate form data
  const validatedFields = UserRegisterSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const { email, password } = validatedFields.data;

  //check if user collection exists
  const userCollection = await getCollection("user");
  if (!userCollection) {
    return {
      errors: {
        email: "User collection does not exist.",
      },
    };
  }

  //check if user already exists
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: "User with this email already exists.",
      },
    };
  }

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //save user to the database
  let savedUser;
  try {
    savedUser = await userCollection.insertOne({
      email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log("Failed to save user:", error);
  }

  //create a session
  await createSession(savedUser.insertedId);

  //redirect
  redirect("/user/dashboard");
}

//User Login server action
export async function login(state, formData) {
  //Validate form data
  const validatedFields = UserLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const { email, password } = validatedFields.data;

  // check if user collection exists
  const userCollection = await getCollection("user");
  if (!userCollection) {
    return {
      errors: {
        email: "User collection does not exist.",
      },
    };
  }

  // check if user exists
  const user = await userCollection.findOne({ email });
  if (!user) {
    return {
      errors: {
        email: "Invalid email or password.",
      },
    };
  }

  // compare passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return {
      errors: {
        email: "Invalid email or password.",
      },
    };
  }

  // create a session
  await createSession(user._id);

  //redirect
  redirect("/user/dashboard");
}

//User Logout server action
export async function logout(formData) {
  //Clear the session cookie
  const cookieStore = await cookies();
  cookieStore.delete("session");

  //Redirect
  redirect("/");
}

//Admin Register server action
export async function adminRegister(state, formData) {
  //validate form data
  const validatedFields = AdminRegisterSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data (include role)
  const { name, role, email, password } = validatedFields.data;

  //check if user collection exists
  const adminUserCollection = await getCollection("admin-user");
  if (!adminUserCollection) {
    return {
      errors: {
        email: "Admin User collection does not exist.",
      },
    };
  }

  //check if admin user already exists
  const existingAdminUser = await adminUserCollection.findOne({ email });
  if (existingAdminUser) {
    return {
      errors: {
        email: "Administrator User with this email already exists.",
      },
    };
  }

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //save user to the database
  let adminUser;
  try {
    adminUser = await adminUserCollection.insertOne({
      name,
      role,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log("Failed to save Admin user:", error);
  }

  //create a session
  await createSession(adminUser.insertedId);

  //redirect
  redirect("/ministry");
}

//Admin Login server action
export async function adminLogin(state, formData) {
  //Validate form data
  const validatedFields = AdminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const { email, password } = validatedFields.data;

  // check if admin user collection exists
  const adminUserCollection = await getCollection("admin-user");
  if (!adminUserCollection) {
    return {
      errors: {
        email: "Admin User collection does not exist.",
      },
    };
  }

  // check if admin user exists
  const adminUser = await adminUserCollection.findOne({ email });
  if (!adminUser) {
    return {
      errors: {
        email: "Invalid email or password.",
      },
    };
  }

  // compare passwords
  const isPasswordMatch = await bcrypt.compare(password, adminUser.password);
  if (!isPasswordMatch) {
    return {
      errors: {
        email: "Invalid email or password.",
      },
    };
  }

  // create a session
  await createSession(adminUser._id);

  //redirect
  redirect("/ministry");
}
