import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, Briefcase, HeartPulse, Home } from "lucide-react";
import { AppLogo } from "@/components/icons";
import SuccessMessage from "@/components/pop-up";
import { Suspense } from "react";
import Loading from "../Loading";

const ministries = [
  {
    name: "Ministry of Foreign Affairs",
    icon: Briefcase,
    href: "/ministry/foreignaffairs",
  },
  {
    name: "Ministry of Education",
    icon: Landmark,
    href: "/ministry/education",
  },
  {
    name: "Ministry of Health",
    icon: HeartPulse,
    href: "/ministry/health",
  },
  {
    name: "Ministry of Home Affairs",
    icon: Home,
    href: "/ministry/homeaffairs",
  },
];

export default function MinistryPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-4xl text-center">
        <div className="flex justify-center items-center mb-4">
          <AppLogo className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-3xl font-headline mb-2">Select a Ministry</h1>
        <p className="text-muted-foreground mb-8">
          Choose a ministry to view its details and services.
        </p>
        <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {ministries.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <Link href={ministry.href} key={ministry.name}>
                <Card className="hover:bg-muted/50 transition-colors text-left">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {ministry.name}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">View</div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        <div className="mt-8">
          <Link href="/" className="text-sm text-primary hover:underline">
            Back to Home
          </Link>
          <Suspense fallback={<Loading />}>
            <SuccessMessage />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
