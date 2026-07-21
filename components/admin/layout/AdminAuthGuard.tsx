"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const subscribeToClient = () => () => undefined;

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const hydrated = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (hydrated && !token) {
      router.replace("/?admin=login");
    }
  }, [hydrated, router, token]);

  if (!hydrated || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        Memeriksa sesi admin...
      </div>
    );
  }

  return children;
}
