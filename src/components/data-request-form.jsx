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
      <form>
        <CardHeader>
          <CardTitle>Request User Data</CardTitle>
          <CardDescription>
            Request user information from another ministry.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-3">
              <Label>Admin Name</Label>
              <Input
                name="adminName"
                placeholder="Admin's full names"
                defaultValue="Admin User"
              />
            </div>
            <div className="grid gap-3">
              <Label>Department</Label>
              <Input
                type="text"
                name="department"
                placeholder="Name of working department"
              />
            </div>
            <div className="grid gap-3">
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                type="tel"
                placeholder="e.g., +65 91234567"
              />
            </div>
            <div className="grid gap-3">
              <Label>Applicant Name</Label>
              <Input type="text" name="appName" />
            </div>
          </div>
          <div className="grid gap-3">
            <Label>Request From</Label>
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
              name="dataRequested"
              placeholder="e.g., Address History, Contact Information"
              className="min-h-24"
            />
          </div>
          <div className="grid gap-3">
            <Label>Reason for Request</Label>
            <Textarea
              name="reason"
              placeholder="Provide a justification for this data request."
              className="min-h-24"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <button>
            <Button>Submit Request</Button>
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
