"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailToken = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!emailToken) {
        router.push("/signUp");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/verify-email",
          null,
          {
            params: { token: emailToken },
          },
        );

        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
          router.push("/");
          return;
        }

        router.push("/signIn");
      } catch (error) {
        console.error("Verification failed:", error);
        router.push("/signUp");
      }
    };

    verifyEmail();
  }, [emailToken, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Verifying your email...</p>
    </div>
  );
}
