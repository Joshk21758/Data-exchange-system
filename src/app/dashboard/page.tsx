"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ArrowRightLeft,
  CheckCircle,
  FileText,
  ShieldAlert,
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
import type { ChartConfig } from "@/components/ui/chart";
import { dashboardStats, chartData } from "@/lib/data";

const icons = {
  FileText,
  ArrowRightLeft,
  CheckCircle,
  ShieldAlert,
};

const chartConfig = {
  applications: {
    label: "Applications",
    color: "hsl(var(--primary))",
  },
  exchanges: {
    label: "Exchanges",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat) => {
        const Icon = icons[stat.icon];
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
              <p
                className={`text-xs ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change} vs last month
              </p>
            </CardContent>
          </Card>
        );
      })}
       <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
          <CardDescription>
            Overview of document applications and data exchanges.
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
              <Bar dataKey="applications" fill="var(--color-applications)" radius={4} />
              <Bar dataKey="exchanges" fill="var(--color-exchanges)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
