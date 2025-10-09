"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ministries = [
  "Ministry of Foreign Affairs",
  "Ministry of Education",
  "Ministry of Health",
  "Ministry of Home Affairs",
];

export function DataRequestForm({ currentMinistry }) {
  const otherMinistries = ministries.filter((m) => m !== currentMinistry);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request User Data</CardTitle>
        <CardDescription>
          Request user information from another ministry.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="userId">User ID / Email</Label>
          <Input
            id="userId"
            name="userId"
            placeholder="e.g., user@example.com or USR-123"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="targetMinistry">Request From</Label>
          <Select name="targetMinistry">
            <SelectTrigger>
              <SelectValue placeholder="Select a ministry" />
            </SelectTrigger>
            <SelectContent>
              {otherMinistries.map((ministry) => (
                <SelectItem key={ministry} value={ministry}>
                  {ministry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="dataRequested">Data Requested</Label>
          <Textarea
            id="dataRequested"
            name="dataRequested"
            placeholder="e.g., Address History, Contact Information"
            className="min-h-24"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="reason">Reason for Request</Label>
          <Textarea
            id="reason"
            name="reason"
            placeholder="Provide a justification for this data request."
            className="min-h-24"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Submit Request</Button>
      </CardFooter>
    </Card>
  );
}
