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
    role: z.string().trim(),
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
  appName: z.string().trim(),
  nationalId: z.string().trim(),
  address: z.string().trim(),
  email: z.string(),
  applicationType: z.string().trim(),
  ministry: z.string(),
  applicationDescription: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters long" }),
});

//DataReuest schema
export const DataRequestSchema = z.object({
  adminName: z.string(),
  department: z.string().trim(),
  email: z.string().trim(),
  appName: z.string().trim(),
  targetMinistry: z.string().trim(),
  dataRequested: z.string().trim(),
  reason: z
    .string()
    .min(20, {
      message: "Reason for request must be at least 20 characters long",
    })
    .trim(),
});

//ForgotPassword schema
export const ForgotPasswordSchema = z.object({
  email: z.string().trim(),
});

//CodeReset schema
export const CodeResetSchema = z.object({
  code: z.number().min(6, { message: "Code must be 6 Digits long!" }),
});

//NewPassword schema
export const NewPasswordSchema = z
  .object({
    newPass: z
      .string()
      .trim()
      .min(8, { message: "Password must be atleast 8 characters long" }),
    confirmPassword: z.string().trim(),
  })
  .refine((val) => val.newPass === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
