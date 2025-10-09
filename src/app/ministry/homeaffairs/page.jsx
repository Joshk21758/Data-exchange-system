import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    FileText,
    Users,
    Landmark,
    Shield,
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
    { title: "Police Stations", value: "350", icon: Landmark },
    { title: "Incident Reports", value: "45,000", icon: FileText },
    { title: "Officers", value: "75,000", icon: Users },
    { title: "Security Alerts", value: "88", icon: Shield },
];

const chartData = [
  { month: "January", incidents: 3200 },
  { month: "February", incidents: 3500 },
  { month: "March", incidents: 3100 },
  { month: "April", incidents: 3800 },
  { month: "May", incidents: 3600 },
  { month: "June", incidents: 3900 },
];

const chartConfig = {
  incidents: {
    label: "Incidents",
    color: "hsl(var(--primary))",
  },
};

export default function MinistryOfHomeAffairsPage() {
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
                            <CardTitle>Ministry of Home Affairs - Monthly Incidents</CardTitle>
                            <CardDescription>
                                Overview of incident reports.
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
                                    <Bar dataKey="incidents" fill="var(--color-incidents)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
