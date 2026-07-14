"use client";
import { useAppSelector } from "@/lib/hooks";
export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      <h1>Welcome, {user?.name}!</h1>
    </>
  );
}
