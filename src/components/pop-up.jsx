"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function SuccessMessage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "success") {
      //Display toast message
      toast.success("Application submitted successfully! You'll recieve an email shortly.", {
        position: "bottom-right",
        autoClose: 3000,
      });

      //clear query params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [status]);

  return <Toaster />;
}
