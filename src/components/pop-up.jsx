"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function SuccessMessage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (status === "success" && !hasShown) {
      //Display toast message
      toast.success(
        "Application submitted successfully! You'll receive an Email after review...",
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );

      setHasShown(true);

      //clear query params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [status, hasShown]);

  return <ToastContainer />;
}
