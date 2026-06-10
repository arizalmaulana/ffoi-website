"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { isProtectedRoute } from "@/lib/auth/routes";
import { supabase } from "@/lib/supabase";

async function endSession() {
  await supabase.auth.signOut();
}

export default function AuthSessionGuard() {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("sb-"))
      .forEach((key) => localStorage.removeItem(key));
  }, []);

  useEffect(() => {
    const previous = previousPathRef.current;

    if (
      previous &&
      isProtectedRoute(previous) &&
      !isProtectedRoute(pathname)
    ) {
      void endSession();
    }

    previousPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    function handlePageHide(event: PageTransitionEvent) {
      if (
        isProtectedRoute(window.location.pathname) &&
        !event.persisted
      ) {
        void fetch("/api/auth/signout", {
          method: "POST",
          keepalive: true,
        });
      }
    }

    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, []);

  return null;
}
