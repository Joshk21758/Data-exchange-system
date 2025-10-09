"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    FileText,
    Users,
    Plane,
    Building,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const ministryStats = [
    { title: "Embassies Worldwide", value: "180", icon: Building },
    { title: "Visa Applications", value: "8,430", icon: FileText },
    { title: "Citizens Abroad", value: "1,200,000", icon: Users },
    { title: "Diplomatic Missions", value: "350", icon: Plane },
];

const chartData = [
  { month: "January", visas: 1200 },
  { month: "February", visas: 1500 },
  { month: "March", visas: 1100 },
  { month: "April", visas: 1800 },
  { month: "May", visas: 1600 },
  { month: "June", visas: 1900 },
];

const chartConfig = {
  visas: {
    label: "Visas",
    color: "hsl(var(--primary))",
  },
};

export default function MinistryOfForeignAffairsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {ministryStats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={stat.title}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {stat.title}
                                        </CardTitle>
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                     <Card className="md:col-span-2 lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Ministry of Foreign Affairs - Monthly Visas</CardTitle>
                            <CardDescription>
                                Overview of visa applications.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="visas" fill="var(--color-visas)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
