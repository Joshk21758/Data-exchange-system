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

export default function AuditTrailPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>
                    Track all system activities and user actions.
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
                        {auditTrailData.map((log) => (
                        <TableRow key={log.timestamp}>
                            <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>
                                <span className="font-medium">{log.action}</span>
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
