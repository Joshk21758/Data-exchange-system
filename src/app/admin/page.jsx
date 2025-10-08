
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ministries = [
  "Ministry of Home Affairs",
  "Ministry of Foreign Affairs",
  "Ministry of Health",
  "Ministry of Education",
];

export default function AuthPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center mb-6">
          <AppLogo className="h-12 w-12 text-primary" />
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access the admin portal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      defaultValue="user@gov.sg"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" required defaultValue="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="login-ministry">Ministry</Label>
                    <Select>
                        <SelectTrigger id="login-ministry">
                            <SelectValue placeholder="Select a ministry" />
                        </SelectTrigger>
                        <SelectContent>
                            {ministries.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                    </Select>
                  </div>
                  <Button asChild type="submit" className="w-full">
                    <Link href="/dashboard">Login</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
               <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline">Register Admin</CardTitle>
                <CardDescription>
                  Create a new administrator account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Admin User" required />
                    </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input id="reg-password" type="password" required />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="register-ministry">Ministry</Label>
                    <Select>
                        <SelectTrigger id="register-ministry">
                            <SelectValue placeholder="Select a ministry" />
                        </SelectTrigger>
                        <SelectContent>
                            {ministries.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
