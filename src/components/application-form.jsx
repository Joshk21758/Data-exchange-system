"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { routeApplicationAction } from "@/app/actions/application";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState = {
  department: null,
  reason: null,
  error: null,
};

const ministries = [
  "Ministry of Home Affairs",
  "Ministry of Foreign Affairs",
  "Ministry of Health",
  "Ministry of Education",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit Application"}
    </Button>
  );
}

export function ApplicationForm() {
  const [state, formAction] = useActionState(
    routeApplicationAction,
    initialState
  );
  const { toast } = useToast();
  const [selectedMinistry, setSelectedMinistry] = useState("");

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <form action={formAction} className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-3">
          <Label>Applicant Name</Label>
          <Input
            type="text"
            name="appName"
            placeholder="Enter your Full names"
          />
        </div>
        <div className="grid gap-3">
          <Label>National ID</Label>
          <Input name="nationalId" type="text" placeholder="e.g., 230/987/6" />
        </div>
      </div>
      <div className="grid gap-3">
        <Label>Address</Label>
        <Textarea
          type="text"
          name="address"
          placeholder="Enter your full address"
          className="min-h-24"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-3">
          <Label>Contact Number</Label>
          <Input
            name="contactNumber"
            type="tel"
            placeholder="e.g., +265 9123 567"
          />
        </div>
        <div className="grid gap-3">
          <Label>Document Type</Label>
          <Input
            name="applicationType"
            type="text"
            placeholder="e.g., Passport Renewal, Visa Application"
          />
        </div>
      </div>
      <div className="grid gap-3">
        <Label>Select a Ministry (Optional)</Label>
        <Select name="ministry" onValueChange={setSelectedMinistry}>
          <SelectTrigger>
            <SelectValue placeholder="Select a ministry " />
          </SelectTrigger>
          <SelectContent>
            {ministries.map((ministry) => (
              <SelectItem key={ministry} value={ministry}>
                {ministry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="applicationDescription">Application Description</Label>
        <Textarea
          type="text"
          name="applicationDescription"
          placeholder="Provide a detailed description of the application, e.g., 'I am applying for a renewal of my passport which is expiring in 6 months. I am a citizen residing overseas.'"
          className="min-h-32"
        />
      </div>

      {state.department && !selectedMinistry && (
        <Alert
          variant="default"
          className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
        >
          <Bot className="h-4 w-4 !text-green-600 dark:!text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-300">
            AI Routing Suggestion
          </AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400">
            <p className="font-semibold">
              Suggested Department: {state.department}
            </p>
            <p className="text-xs mt-1">
              <strong>Reasoning:</strong> {state.reason}
            </p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <button className="w-full h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90">Submit</button>
      </div>
    </form>
  );
}
