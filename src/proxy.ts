import { type NextRequest } from "next/server";

import { handleAuthMiddleware } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return handleAuthMiddleware(request);
  console.log("[MIDDLEWARE]", request.nextUrl.pathname);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
