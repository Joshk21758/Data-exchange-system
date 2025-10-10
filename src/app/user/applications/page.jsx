import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { applicationsData } from "@/lib/data";

const statusVariantMap = {
  Approved: "default",
  Pending: "secondary",
  Rejected: "destructive",
};

// Filter to show only a subset of applications for a "logged in" user.
const userApplications = applicationsData.filter(app => ["APP-002", "APP-005"].includes(app.id));


export default function UserApplicationsPage() {
  return (
     <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <Card className="w-full max-w-4xl">
        <CardHeader className="flex flex-row justify-between items-center">
            <div>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>
                Track the status of your document applications.
            </CardDescription>
            </div>
            <Button asChild>
                <Link href="/user/applications/new">New Application</Link>
            </Button>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ministry</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userApplications.map((app) => (
                <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>{app.type}</TableCell>
                    <TableCell>
                    <Badge variant={statusVariantMap[app.status]}>
                        {app.status}
                    </Badge>
                    </TableCell>
                    <TableCell>{app.ministry}</TableCell>
                    <TableCell>{app.submitted}</TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Cancel Application</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    </div>
  );
}
