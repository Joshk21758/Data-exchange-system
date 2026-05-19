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
import { MoreHorizontal } from "lucide-react";
import { approveForm, rejectForm } from "@/app/actions/forms";

export default async function AdminDashboard() {
  // get application collection
  const applicationCollection = await getCollection("applications");
  const posts = await applicationCollection
    .find()
    .sort({ $natural: -1 })
    .toArray();

  // get feedback collection
  const feedbackCollection = await getCollection("feedbacks");
  const feedbacks = await feedbackCollection
    .find()
    .sort({ $natural: -1 })
    .toArray();
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Council Administrator Dashboard</CardTitle>
          <CardDescription>
            Review and manage document applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant name</TableHead>
                <TableHead>Permit Type</TableHead>
                <TableHead>email</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">{post.appName}</TableCell>
                  <TableCell>{post.applicationType}</TableCell>
                  <TableCell>{post.email}</TableCell>
                  <TableCell>{post.applicationDescription}</TableCell>
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
                          <form action={approveForm}>
                            <input
                              type="hidden"
                              name="postId"
                              value={post._id.toString()}
                            />
                            <button type="submit">Approve</button>
                          </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <form action={rejectForm}>
                            <input
                              type="hidden"
                              name="postId"
                              value={post._id.toString()}
                            />
                            <button type="submit">Reject</button>
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
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
            <CardDescription>Review user feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback._id}>
                    <TableCell className="font-medium">
                      {feedback.name}
                    </TableCell>
                    <TableCell>{feedback.feedback}</TableCell>
                    <TableCell>{feedback.email}</TableCell>
                    <TableCell>
                      {feedback._id.getTimestamp().toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
