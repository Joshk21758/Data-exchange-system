"use client";

import { login } from "@/app/actions/auth";
import { useActionState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Label } from "./ui/label";

export default function UserLoginForm() {
  const [state, formAction, isPending] = useActionState(login, undefined);
  return (
    <div>
      <form action={formAction}>
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline">
            Welcome back!
          </CardTitle>
          <CardDescription>
            Enter your credentials to Login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <input
                name="email"
                type="email"
                placeholder="user-email@example.com"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-600">{state.errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="Enter your Password"
                name="password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-600">{state.errors.password}</p>
              )}
            </div>
            <button
              disabled={isPending}
              className="w-full h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </div>
        </CardContent>
      </form>
    </div>
  );
}
