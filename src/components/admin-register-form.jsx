"use client";

import { useActionState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { adminRegister } from "@/app/actions/auth";

export default function AdminRegisterForm() {
  const [state, action, isPending] = useActionState(adminRegister, undefined);
  return (
    <div>
      <form action={action}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">
            Register Admin
          </CardTitle>
          <CardDescription>Create a new administrator account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <input
                type="text"
                name="name"
                placeholder="Administrator User"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.name && (
                <p className="text-sm text-red-600">{state.errors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <select
                name="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              >
                <option value="Security analyst">Security analyst</option>
                <option value="Super admin">Super Admin</option>
                <option value="Auditor">Auditor</option>
              </select>
              {state?.errors?.role && (
                <p className="text-sm text-red-600">{state.errors.role}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Select a Ministry</Label>
              <select
                name="ministry"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              >
                <option value="Minisrty of Foreign Affairs">
                  Ministry of Foreign Affairs
                </option>
                <option value="Ministry of Home Affairs">
                  Ministry of Home Affairs
                </option>
                <option value="Ministry of Education">
                  Ministry of Education
                </option>
                <option value="Ministry of Health">Ministry of Health</option>
              </select>
              {state?.errors?.ministry && (
                <p className="text-sm text-red-600">{state.errors.ministry}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <input
                name="email"
                type="email"
                placeholder="m@example.com"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-600">{state.errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-600">{state.errors.password}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
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
              {isPending ? "Signing Up..." : "Create an Account"}
            </button>
          </div>
        </CardContent>
      </form>
    </div>
  );
}
