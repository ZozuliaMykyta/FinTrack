"use client";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { useEffect, useMemo } from "react";
import { setUserData } from "@/lib/features/authSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useMemo(() => makeStore(), []);

  useEffect(() => {
    const authSession = localStorage.getItem("authSession");
    if (!authSession) return;
    try {
      const sessionData = JSON.parse(authSession);
      if (sessionData.user && sessionData.token) {
        store.dispatch(
          setUserData({ user: sessionData.user, token: sessionData.token }),
        );
      }
    } catch {
      localStorage.removeItem("authSession");
    }
  }, [store]);
  return <Provider store={store}>{children}</Provider>;
}
