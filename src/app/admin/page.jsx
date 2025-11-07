"use client";

import { Card } from "@/components/ui/card";

import { AppLogo } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLoginForm from "@/components/admin-login-form";
import AdminRegisterForm from "@/components/admin-register-form";
import Link from "next/link";

export default function AuthPage() {
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
            <TabsTrigger value="login">Admin Login</TabsTrigger>
            <TabsTrigger value="register">Admin Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <AdminLoginForm />
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <AdminRegisterForm />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
