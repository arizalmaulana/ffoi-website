import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code =
    requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const supabase =
    await createClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(
      code
    );

  if (error) {
    console.error(error);

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const { data: profile } =
    await supabase
      .from("profil")
      .select("role")
      .eq("id", user.id)
      .single();

  const destination =
    profile?.role === "admin"
      ? "/admin"
      : "/dashboard";

  return NextResponse.redirect(
    new URL(destination, request.url)
  );
}

