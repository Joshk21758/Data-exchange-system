import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { School, Landmark, HeartPulse, Globe } from "lucide-react";

const ministries = [
  {
    name: "Ministry of Education",
    icon: School,
    description: "Oversees the national education system, from primary to tertiary education.",
  },
  {
    name: "Ministry of Foreign Affairs",
    icon: Globe,
    description: "Manages diplomatic relations and international cooperation.",
  },
  {
    name: "Ministry of Home Affairs",
    icon: Landmark,
    description: "Ensures the safety, security, and stability of the nation.",
  },
  {
    name: "Ministry of Health",
    icon: HeartPulse,
    description: "Manages the public healthcare system and public health policies.",
  },
];

export default function MinistriesPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Ministries</CardTitle>
          <CardDescription>
            Overview of all government ministries.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {ministries.map((ministry) => {
          const Icon = ministry.icon;
          return (
            <Card key={ministry.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">
                  {ministry.name}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{ministry.description}</p>
                <Button asChild variant="outline">
                    <Link href="#">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
