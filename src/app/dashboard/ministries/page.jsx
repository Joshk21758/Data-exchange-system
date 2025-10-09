import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Landmark, Briefcase, HeartPulse, Home } from "lucide-react";

const ministries = [
  {
    name: "Ministry of Foreign Affairs",
    icon: Briefcase,
  },
  {
    name: "Ministry of Education",
    icon: Landmark,
  },
  {
    name: "Ministry of Health",
    icon: HeartPulse,
  },
  {
    name: "Ministry of Home Affairs",
    icon: Home,
  },
];

export default function MinistryPage() {
  return (
    <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
      {ministries.map((ministry) => {
        const Icon = ministry.icon;
        return (
          <Link href="#" key={ministry.name}>
            <Card className="hover:bg-muted/50 transition-colors">
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
  );
}
