"use client";

import { newPasswordAction } from "@/app/actions/posts";
import { AppLogo } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useActionState } from "react";

export default function NewPasswordPage() {
  const [state, isPending, formAction] = useActionState(
    newPasswordAction,
    undefined
  );
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo className="h-12 w-12 text-primary" />
          </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">
              Enter new Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" action={formAction}>
              <div className="grid gap-2">
                <Label>New password</Label>
                <input
                  name="newPass"
                  type="password"
                  placeholder="Enter your New password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
                />
                {state?.errors?.newPass && (
                  <p className="text-sm text-red-600">{state.errors.newPass}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Re-enter your password</Label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
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
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              >
                {isPending ? "Updating..." : "Update Password"}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
