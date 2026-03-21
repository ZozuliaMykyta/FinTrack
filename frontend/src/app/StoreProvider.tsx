"use client";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { useMemo } from "react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useMemo(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
}
