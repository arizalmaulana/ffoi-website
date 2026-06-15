import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const token_hash =
    requestUrl.searchParams.get("token_hash");

  const type =
    requestUrl.searchParams.get("type");

  if (!token_hash || !type) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const supabase =
    await createClient();

  const { error } =
    await supabase.auth.verifyOtp({
      token_hash,
      type: type as EmailOtpType,
    });

  if (error) {
    console.error(
      "Verify email error:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/login?verified=false",
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(
      "/login?verified=true",
      request.url
    )
  );
}