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
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  const publicRoutes = ["/verify-email"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const authSession = localStorage.getItem("authSession");
    if (!authSession) {
      if (!isPublicRoute) {
        router.replace("/signUp");
      }
      setTimeout(() => setIsCheckingAuth(false), 0);
      return;
    }
    const controller = new AbortController();
    const checkAuth = async () => {
      try {
        const sessionData = JSON.parse(authSession);

        if (!sessionData.user || !sessionData.token) {
          localStorage.removeItem("authSession");
          store.dispatch(logout());
          if (!isPublicRoute) {
            router.replace("/signUp");
          }
          return;
        }

        store.dispatch(
          setUserData({ user: sessionData.user, token: sessionData.token }),
        );

        await axios.post(
          "http://localhost:5000/api/auth/token",
          { token: sessionData.token },
          { signal: controller.signal },
        );

        setIsCheckingAuth(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        localStorage.removeItem("authSession");
        store.dispatch(logout());
        if (!isPublicRoute) {
          router.replace("/signUp");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsCheckingAuth(false);
        }
      }
    };

    void checkAuth();
    return () => {
      controller.abort();
    };
  }, [store, router, pathname, isPublicRoute]);
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking session...</p>
      </div>
    );
  }
  return <Provider store={store}>{children}</Provider>;
}
