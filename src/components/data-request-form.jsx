"use client";

import { createRequestForm } from "@/app/actions/posts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

export default function DataRequestForm() {
  const [state, action, isPending] = useActionState(
    createRequestForm,
    undefined
  );

  return (
    <Card>
      <form action={action}>
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
              <input
                type="text"
                name="adminName"
                placeholder="Admin's full names"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.adminName && (
                <p className="text-sm text-red-600">{state.errors.adminName}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label>Department</Label>
              <input
                type="text"
                name="department"
                placeholder="Name of working department..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.department && (
                <p className="text-sm text-red-600">
                  {state.errors.department}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label>Email</Label>
              <input
                name="email"
                type="text"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.phoneNumber && (
                <p className="text-sm text-red-600">
                  {state.errors.phoneNumber}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label>User Applicants Name</Label>
              <input
                type="text"
                name="appName"
                placeholder="The name of person or user you're requesting data for.."
                className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              />
              {state?.errors?.appName && (
                <p className="text-sm text-red-600">{state.errors.appName}</p>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Label>Request From</Label>
            <input
              type="text"
              name="targetMinistry"
              className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
              placeholder="Select a Ministry, e.g., Ministry of Health"
            />
            {state?.errors?.targetMinistry && (
              <p className="text-sm text-red-600">
                {state.errors.targetMinistry}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Data Requested</Label>
            <textarea
              name="dataRequested"
              placeholder="e.g., Address History, Contact Information"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
            {state?.errors?.dataRequested && (
              <p className="text-sm text-red-600">
                {state.errors.dataRequested}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Reason for Request</Label>
            <textarea
              name="reason"
              placeholder="Provide a justification for this data request."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
            {state?.errors?.reason && (
              <p className="text-sm text-red-600">{state.errors.reason}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <button
            disabled={isPending}
            className="w-full h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? "Submiting..." : "Submit Request Form"}
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
