import { z } from "zod";

//UserLogin schema
export const UserLoginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

//UserRegister schema
export const UserRegisterSchema = z
  .object({
    fullName: z.string().trim(),
    email: z.string().email().trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//AdminLogin schema
export const AdminLoginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

//AdminRegister schema
export const AdminRegisterSchema = z
  .object({
    name: z.string().trim(),
    email: z.string().email().trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//UserApplicationForm
export const UserApplicationSchema = z.object({
  appName: z.string().email().trim(),
  nationalId: z.string().trim(),
  address: z.string().trim(),
  contactNumber: z.string().trim(),
  applicationType: z.string().trim(),
  ministry: z.string().trim(),
  applicationDescription: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters long" }),
});

//DataReuest schema
export const DataRequestSchema = z.object({
  adminName: z.string().trim(),
  department: z.string().trim(),
  phoneNumber: z.string().trim(),
  appName: z.string().trim(),
  targetMinistry: z.string(),
  dataRequested: z.string().trim(),
  reason: z.string().trim().min(20, {
    message: "Reason for request must be at least 20 characters long",
  }),
});
