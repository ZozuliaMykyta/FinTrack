"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        console.error("No token provided");
        setStatus(400);
        return;
      }
      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/verify-email?token=${token}`,
          null,
        );

        if (response.status === 200) {
          setStatus(200);
          const timer = setTimeout(() => {
            window.close();
          }, 3000);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus(500);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">
        {status === 200
          ? "Email verified successfully! This window will close shortly."
          : "Verifying your email..."}
        {status === 400 && "Invalid verification link."}
        {status === 500 && "Verification failed. Please try again."}
      </p>
    </div>
  );
}
