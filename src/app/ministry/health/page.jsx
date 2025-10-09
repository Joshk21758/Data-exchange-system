import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    FileText,
    Users,
    Hospital,
    HeartPulse,
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
    { title: "Hospitals", value: "120", icon: Hospital },
    { title: "Patient Records", value: "1,2M", icon: FileText },
    { title: "Healthcare Workers", value: "85,000", icon: Users },
    { title: "Public Health Alerts", value: "15", icon: HeartPulse },
];

const chartData = [
  { month: "January", patients: 2200 },
  { month: "February", patients: 2500 },
  { month: "March", patients: 2100 },
  { month: "April", patients: 2800 },
  { month: "May", patients: 2600 },
  { month: "June", patients: 2900 },
];

const chartConfig = {
  patients: {
    label: "Patients",
    color: "hsl(var(--primary))",
  },
};

export default function MinistryOfHealthPage() {
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
                            <CardTitle>Ministry of Health - Monthly Patient Count</CardTitle>
                            <CardDescription>
                                Overview of patient admissions.
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
                                    <Bar dataKey="patients" fill="var(--color-patients)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
