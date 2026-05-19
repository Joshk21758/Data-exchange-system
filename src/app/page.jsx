import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MapPin,
  ShieldCheck,
  ShieldPlus,
} from "lucide-react";
import Image from "next/image";
import bgImage from "../public/state-pic.jpg";
import { AppLogo } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white">
        <Link className="flex items-center justify-center gap-2" href="#">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            <AppLogo />
          </div>
          <span className="font-headline font-bold text-xl">
            CityFlow Connect
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-primary"
            href="/admin/auth"
          >
            <ShieldPlus />
          </Link>

          <Link
            className="text-1xl font-medium hover:text-primary"
            href="/user/auth"
          >
            Login
          </Link>

          <Link
            className="text-1xl font-medium hover:text-primary"
            href="/user/auth"
          >
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-6xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none text-foreground font-headline">
                    Streamline Your Civic Life Online
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-3xl">
                    Submit permits, register businesses and construction
                    permits, and track council services from the comfort of your
                    screen. CityFlow Connect is your direct digital link to
                    local government services. Ensuring seamless connectivity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Link href="/user/auth">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl lg:aspect-square">
                <Image
                  src={bgImage}
                  alt="Civic building with digital interface overlay"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="space-y-2 mb-12">
              <h2 className="text-3xl font-bold font-headline sm:text-4xl text-foreground">
                Why Use CityFlow?
              </h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Our platform is designed to make local government service
                interaction faster, more secure, and fully transparent.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-none shadow-md bg-background/50">
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2 mx-auto" />
                  <CardTitle className="text-lg">
                    Digital Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Structured forms guide you through every application step
                    with ease.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-background/50">
                <CardHeader>
                  <CheckCircle2 className="h-10 w-10 text-primary mb-2 mx-auto" />
                  <CardTitle className="text-lg">Real-time Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Know exactly where your request stands with automated status
                    updates.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-background/50">
                <CardHeader>
                  <ShieldCheck className="h-10 w-10 text-primary mb-2 mx-auto" />
                  <CardTitle className="text-lg">Secure Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Your personal data and approved documents are encrypted and
                    safe.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-background/50">
                <CardHeader>
                  <MapPin className="h-10 w-10 text-primary mb-2 mx-auto" />
                  <CardTitle className="text-lg">Local Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Stay connected with community events and local neighborhood
                    updates.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-white py-6">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 CityFlow Connect. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="/feedback"
            >
              Feedback
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="/admin/auth"
            >
              Council Admin Portal
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
