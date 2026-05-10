"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function SuccessMessage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "success") {
      //Display toast message
      toast.success("Application submitted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      //clear query params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [status]);

  return <ToastContainer />;
}
