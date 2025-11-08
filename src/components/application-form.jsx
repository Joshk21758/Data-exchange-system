"use client";

import { useActionState } from "react";
import { Label } from "@/components/ui/label";

export function ApplicationForm({ handler, post }) {
  const [state, formAction, isPending] = useActionState(handler, undefined);

  return (
    <form action={formAction} className="grid gap-6">
      <input type="hidden" name="postId" defaultValue={post?._id.toString()} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-3">
          <Label>Applicant Name</Label>
          <input
            type="text"
            name="appName"
            placeholder="Enter your Full names"
            className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
          />
          {state?.errors?.appName && (
            <p className="text-sm text-red-600">{state.errors.appName}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label>National ID</Label>
          <input
            name="nationalId"
            type="text"
            placeholder="e.g., 230/987/6"
            className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
          />
          {state?.errors?.nationalId && (
            <p className="text-sm text-red-600">{state.errors.nationalId}</p>
          )}
        </div>
      </div>
      <div className="grid gap-3">
        <Label>Address</Label>
        <textarea
          type="text"
          name="address"
          placeholder="Enter your full address"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        {state?.errors?.address && (
          <p className="text-sm text-red-600">{state.errors.address}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-3">
          <Label>Email</Label>
          <input
            name="email"
            type="text"
            placeholder="youremail@gmail.com"
            className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-600">{state.errors.email}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label>Document Type</Label>
          <input
            name="applicationType"
            type="text"
            placeholder="e.g., Passport Renewal, Visa Application"
            className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-bg"
          />
          {state?.errors?.applicationType && (
            <p className="text-sm text-red-600">
              {state.errors.applicationType}
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-3">
        <Label>Select a Ministry</Label>
        <input
          name="ministry"
          type="text"
          placeholder="e.g., Ministry of Foreign Affairs, Ministry of Health..."
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 flex cursor-default items-center justify-center py-1"
        />
        {state?.errors?.ministry && (
          <p className="text-sm text-red-600">{state.errors.ministry}</p>
        )}
      </div>
      <div className="grid gap-3">
        <Label>Application Description</Label>
        <textarea
          type="text"
          name="applicationDescription"
          placeholder="Provide a detailed description of the application, e.g., 'I am applying for a renewal of my passport which is expiring in 6 months. I am a citizen residing overseas.'"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        {state?.errors?.applicationDescription && (
          <p className="text-sm text-red-600">
            {state.errors.applicationDescription}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          disabled={isPending}
          className="w-full h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? "Submiting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
