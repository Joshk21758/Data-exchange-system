"use client";

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLogo } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActionState } from 'react';

export default function UserAuthPage() {
  const [state, isPending, action] = useActionState(undefined);
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center mb-6">
           <Link href="/" className="flex items-center gap-2">
            <AppLogo className="h-12 w-12 text-primary" />
          </Link>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <form>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-headline">User Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="user@example.com"
                     
                    />
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
                    <Input type="password" placeholder="Enter your Password" name="password"/>
                  </div>
                  <Button className="w-full">
                    <Link href="/user/dashboard">Login</Link>
                  </Button>
                </div>
              </CardContent>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <form>
               <CardHeader className="text-center">
                <CardTitle className="text-3xl font-headline">Register</CardTitle>
                <CardDescription>
                  Create a new user account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label >Full Name</Label>
                        <Input type="text" placeholder="John Doe" name="fullName" />
                    </div>
                  <div className="grid gap-2">
                    <Label >Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="user@example.com"
                     
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <Input  type="password" name="password" placeholder="Enter your Password" />
                  </div>
                   <div className="grid gap-2">
                    <Label >Confirm Password</Label>
                    <Input  type="password" name="confirmPassword" placeholder="Re-enter your Password" />
                  </div>
                  <Button className="w-full">
                    Create Account
                  </Button>
                </div>
              </CardContent>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
