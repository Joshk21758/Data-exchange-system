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
  docType: z.string().trim(),
  selectMin: z.string().trim(),
  appDes: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters long" }),
});

//DataReuest schema
export async function DataRequestSchema = z.object({
  email: z.string().trim(),
  selectMin: z.string().trim(),
  dataReq: z.string().trim().min(10, {message: "Description must be at least 10 characters long"}),
  request: z.string().trim(),

});

//






