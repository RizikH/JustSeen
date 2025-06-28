"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/components/stores/AuthStore/useAuthStore";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    // Try to validate cookie-based session
    fetchUser()
      .catch((err) => {
        // Handle failed auth (e.g., token expired)
        console.warn("Auth check failed:", err);
        logout(); // Clear Zustand + localStorage flags if any
      });
  }, [fetchUser, logout]);

  return <>{children}</>;
}
