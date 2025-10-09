import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auditTrailData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

const actionVariantMap = {
    LOGIN_SUCCESS: "outline",
    VIEW_APPLICATION: "secondary",
    CREATE_APPLICATION: "default",
    UPDATE_ROLE: "destructive",
    REJECT_APPLICATION: "destructive",
  };

export default function AuditTrailPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Trail</CardTitle>
        <CardDescription>
          A log of all activities within the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditTrailData.map((log, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                <TableCell className="font-medium">{log.user}</TableCell>
                <TableCell>
                  <Badge variant={actionVariantMap[log.action] || 'secondary'}>{log.action}</Badge>
                </TableCell>
                <TableCell>{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
