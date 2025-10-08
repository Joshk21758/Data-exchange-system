"use client";

import { useActionState, useFormStatus } from "react";
import { useEffect } from "react";
import { Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { routeApplicationAction } from "@/app/actions/application";

const initialState = {
  department: null,
  reason: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit Application"}
    </Button>
  );
}

export function ApplicationForm() {
  const [state, formAction] = useActionState(routeApplicationAction, initialState);
  const { toast } = useToast();

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
      <div className="grid gap-3">
        <Label htmlFor="applicantName">Applicant Name</Label>
        <Input
          id="applicantName"
          name="applicantName"
          type="text"
          defaultValue="John Doe"
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="applicationType">Document Type</Label>
        <Input
          id="applicationType"
          name="applicationType"
          type="text"
          placeholder="e.g., Passport Renewal, Visa Application"
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="applicationDescription">Application Description</Label>
        <Textarea
          id="applicationDescription"
          name="applicationDescription"
          placeholder="Provide a detailed description of the application, e.g., 'I am applying for a renewal of my passport which is expiring in 6 months. I am a citizen residing overseas.'"
          className="min-h-32"
        />
      </div>

      {state.department && (
        <Alert variant="default" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
           <Bot className="h-4 w-4 !text-green-600 dark:!text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-300">AI Routing Suggestion</AlertTitle>
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
        <SubmitButton />
      </div>
    </form>
  );
}
