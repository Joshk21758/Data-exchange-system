import { updateRole } from "@/app/actions/roles";
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

export default async function UsersPage() {
  //get admin user collection
  const adminUserCollection = await getCollection("admin-user");
  const users = await adminUserCollection
    .find()
    .sort({ $natural: -1 })
    .toArray();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Assign roles and manage access control for administrators.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <form action={updateRole}>
                        <input
                          type="hidden"
                          name="userId"
                          defaultValue={user?._id.toString()}
                        />
                        <select
                          name="role"
                          className="flex cursor-default items-center justify-center py-1"
                        >
                          <option value="security analyst">
                            Security Analyst
                          </option>
                          <option value="super admin">Super admin</option>
                          <option value="auditor">Auditor</option>
                          <button>Save</button>
                        </select>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
