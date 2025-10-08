import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserDashboardPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <Card>
            <CardHeader>
                <CardTitle>User Dashboard</CardTitle>
                <CardDescription>Welcome to your personal dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is where your user-specific information will be displayed.</p>
            </CardContent>
        </Card>
    </div>
  );
}
