"use client";

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
           <div className="flex justify-center items-center mb-4">
            <AppLogo className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Welcome to CityFlow</CardTitle>
          <CardDescription>
            The Inter-ministry Data Exchange System.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
           <p className="text-muted-foreground">Please select your login type.</p>
           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button asChild size="lg">
              <Link href="/login">User Login/Register</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
               <Link href="/admin">Admin Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
       <footer className="mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} CityFlow. All Rights Reserved.
      </footer>
    </div>
  );
}
