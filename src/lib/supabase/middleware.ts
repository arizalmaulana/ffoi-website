import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  getPostLoginPath,
  isAdminRoute,
  isAuthRoute,
  isProtectedRoute,
} from "@/lib/auth/routes";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        supabaseResponse = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });

        Object.entries(headers).forEach(([key, value]) => {
          supabaseResponse.headers.set(key, value);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  

  console.log(
    "[MIDDLEWARE]",
    request.nextUrl.pathname,
    !!user
  );

  return {
    supabase,
    supabaseResponse,
    user,
  };
}

function copyCookies(
  source: NextResponse,
  target: NextResponse
) {
  source.cookies.getAll().forEach(({ name, value }) => {
    target.cookies.set(name, value);
  });
}

export async function handleAuthMiddleware(request: NextRequest) {
  const { supabase, supabaseResponse, user } =
    await updateSession(request);

  const pathname = request.nextUrl.pathname;

  if (isProtectedRoute(pathname) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);

    const redirectResponse = NextResponse.redirect(url);
    copyCookies(supabaseResponse, redirectResponse);
    return redirectResponse;
  }

  if (user && isAdminRoute(pathname)) {
    const { data: profile } = await supabase
      .from("profil")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";

      const redirectResponse = NextResponse.redirect(url);
      copyCookies(supabaseResponse, redirectResponse);
      return redirectResponse;
    }
  }

  if (
    user &&
    isAuthRoute(pathname) &&
    pathname !== "/update-password"
  ) {
    const { data: profile } =
      await supabase
        .from("profil")
        .select("role")
        .eq("id", user.id)
        .single();

    const url = request.nextUrl.clone();

    url.pathname =
      getPostLoginPath(profile?.role);

    const redirectResponse =
      NextResponse.redirect(url);

    copyCookies(
      supabaseResponse,
      redirectResponse
    );

    return redirectResponse;
  }

  return supabaseResponse;
}
