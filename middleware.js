import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  console.log(pathname, "pathname", pathname.startsWith("/patient"));

  // Paths that do not require authentication
  const publicPaths = ["/login", "/custom-error", "/api/auth", "/register"];

  // Check if the path is one of the public paths
  if (publicPaths.some(path => pathname.startsWith(path)) || pathname === "/") {
    return NextResponse.next();
  }

  // Token will exist if the user is logged in
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NEXTAUTH_COOKIE_NAME,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect based on the role
  const roleRedirects = {
    Doctor: "/doctor/dashboard",
    Patient: "/patient/dashboard",
    Hospital: "/hospital/dashboard"
  };

  const rolePathPrefixes = {
    Doctor: ["/doctor", "/api/auth/session"],
    Patient: ["/patient"],
    Hospital: ["/hospital", "/api/auth/session"]
  };

  const allowedPaths = rolePathPrefixes[token.role] || [];

  if (!allowedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(roleRedirects[token.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/patient/:path*",
    "/doctor/:path*",
    "/hospital/:path*",
    "/api/auth/:path*"
  ],
};
