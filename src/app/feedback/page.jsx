"use client";

import { useActionState } from "react";
import { createFeedback } from "../actions/feedback";

export default function FeedbackPage() {
  const [state, formAction, isPending] = useActionState(
    createFeedback,
    undefined,
  );
  return (
    <div className="min-h-screen">
      <h1 className="flex justify-center text-4xl pt-10 pb-6 font-bold ">
        Give us your feedback
      </h1>
      <div className="flex justify-center">
        <p className="px-3">
          We value your opinion. Please share your thoughts, suggestions, or any
          concerns you may have to help us improve our services.
        </p>
      </div>
      {/* form */}
      <form className="max-w-lg mx-auto mt-10" action={formAction}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {state?.errors?.name && (
            <span className="text-red-500">{state.errors.name}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {state?.errors?.email && (
            <span className="text-red-500">{state.errors.email}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Message
          </label>
          <textarea
            name="message"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            rows="4"
          ></textarea>
          {state?.errors?.message && (
            <span className="text-red-500">{state.errors.message}</span>
          )}
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
