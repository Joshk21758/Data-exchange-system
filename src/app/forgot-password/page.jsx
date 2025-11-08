"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AppLogo } from "@/components/icons";

export default function ForgotPasswordPage() {
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
              Forgot Password
            </CardTitle>
            <CardDescription>
              Enter your email, a code will be sent to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label>Email</Label>
                <input
                  name="email"
                  type="email"
                  placeholder="myemail@example.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                Send Reset Code
              </button>
              <Button variant="link" asChild className="mt-2">
                <Link href="/user/auth">Back to Login</Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
