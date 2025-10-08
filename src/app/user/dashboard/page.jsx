import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>User Dashboard</CardTitle>
                <CardDescription>Welcome to your personal dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <p>This is where your user-specific information will be displayed.</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Button asChild size="lg">
                        <Link href="/user/applications/new">New Application</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/user/applications">View My Applications</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
