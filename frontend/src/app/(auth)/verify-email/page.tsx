"use client";

import { useEffect, useState } from "react";
import axios from "axios";
export default function VerifyEmailPage() {
  const [status, setStatus] = useState<number | null>(null);
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/verify-email",
          null,
        );

        if (response.status === 200) {
          setStatus(200);
          window.close();
          return;
        }
      } catch (error) {
        console.error("Verification failed:", error);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">
        {status === 200
          ? "Email verified successfully!"
          : "Verifying your email..."}
      </p>
    </div>
  );
}
