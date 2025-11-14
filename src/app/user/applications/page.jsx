import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
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
import { getCollection } from "@/lib/db";
import { deleteApplication } from "@/app/actions/posts";
import SuccessMessage from "@/components/pop-up";

export default async function UserApplicationsPage() {
  //get application collection
  const applicationCollection = await getCollection("applications");
  const posts = await applicationCollection
    .find()
    .sort({ $natural: -1 })
    .toArray();

  return (
    <div className="flex w-full items-center justify-center">
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
                <TableHead>Applicant name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ministry</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>{post.appName}</TableCell>
                  <TableCell>{post.applicationType}</TableCell>
                  <TableCell>{post.email}</TableCell>
                  <TableCell>{post.ministry}</TableCell>
                  <TableCell>
                    {post._id.getTimestamp().toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link
                            href={`/user/applications/show/${post?._id.toString()}`}
                          >
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            href={`/user/applications/edit/${post?._id.toString()}`}
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <form action={deleteApplication}>
                            <input
                              type="hidden"
                              name="postId"
                              defaultValue={post?._id.toString()}
                            />
                            <button>Cancel Application</button>
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <SuccessMessage />
    </div>
  );
}
