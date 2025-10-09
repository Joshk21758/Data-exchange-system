import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    FileText,
    Users,
    School,
    GraduationCap,
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
    { title: "Total Schools", value: "1,250", icon: School },
    { title: "Student Applications", value: "15,320", icon: FileText },
    { title: "Teachers", value: "45,000", icon: Users },
    { title: "Graduates This Year", value: "22,450", icon: GraduationCap },
];

const chartData = [
  { month: "January", applications: 1860 },
  { month: "February", applications: 3050 },
  { month: "March", applications: 2370 },
  { month: "April", applications: 730 },
  { month: "May", applications: 2090 },
  { month: "June", applications: 2140 },
];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "hsl(var(--primary))",
  },
};

export default function MinistryOfEducationPage() {
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
                            <CardTitle>Ministry of Education - Monthly Applications</CardTitle>
                            <CardDescription>
                                Overview of student applications.
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
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
