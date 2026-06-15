export const PROTECTED_ROUTE_PREFIXES = [
  "/dashboard",
  "/profile",
  "/admin",
] as const;

export const AUTH_ROUTE_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
  "/update-password",
] as const;

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) =>
      pathname === prefix ||
      pathname.startsWith(`${prefix}/`)
  );
}

export function isAdminRoute(pathname: string): boolean {
  return pathname === "/admin" ||
    pathname.startsWith("/admin/");
}

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTE_PREFIXES.some(
    (prefix) =>
      pathname === prefix ||
      pathname.startsWith(`${prefix}/`)
  );
}

export function getPostLoginPath(
  role?: string | null
): string {
  return role === "admin"
    ? "/admin"
    : "/dashboard";
}