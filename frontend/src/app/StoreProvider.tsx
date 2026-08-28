"use client";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { useEffect, useMemo, useState } from "react";
import { logout, setUserData } from "@/lib/features/authSlice";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useMemo(() => makeStore(), []);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const pathname = usePathname();
  const isPublicRoute = pathname === "/verify-email";

  useEffect(() => {
    if (isPublicRoute) {
      setIsCheckingAuth(false);
      return;
    }
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/refresh-status",
          {
            withCredentials: true,
          },
        );
        const { user, isEmailVerified } = response.data;
        if (user && isEmailVerified) {
          store.dispatch(setUserData({ user, isAuthenticated: true }));
        }
      } catch (error) {
        store.dispatch(logout());
        const status = axios.isAxiosError(error)
          ? error.response?.status
          : undefined;
        if (status === 401 || status === 404) {
          router.replace("/signUp");
        } else {
          console.error("Auth check failed:", error);
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };
    void checkAuth();
  }, [router, store, isPublicRoute]);
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking session...</p>
      </div>
    );
  }
  return <Provider store={store}>{children}</Provider>;
}
