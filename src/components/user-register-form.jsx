"use client";

import { useActionState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { register } from "@/app/actions/auth";
import { Label } from "./ui/label";

export default function UserRegisterForm() {
  const [state, action, isPending] = useActionState(register, undefined);
  return (
    <div>
      <form action={action}>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Register</CardTitle>
          <CardDescription>Create a new user account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <input
                type="text"
                placeholder="Enter your names"
                name="fullName"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.fullName && (
                <p className="text-sm text-red-600">{state.errors.fullName}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.email && (
                <p className="text-bg text-red-600">{state.errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-600">{state.errors.password}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your Password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.confirmPassword && (
                <p className="text-sm text-red-600">
                  {state.errors.confirmPassword}
                </p>
              )}
            </div>
            <button
              disabled={isPending}
              className="w-full h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isPending ? "Signing Up..." : "Create An account"}
            </button>
          </div>
        </CardContent>
      </form>
    </div>
  );
}
