import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log(
    request.nextUrl.pathname,
    "request.nextUrl.pathname",
    request.nextUrl.pathname.startsWith("/patient"),
  );

  // Paths that do not require authentication
  const publicPaths = ["/login", "/custom-error", "/api/auth", "/register", "/"];
 
  // Check if the path is one of the public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Token will exist if the user is logged in
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token",
  });

  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  // Check the role and redirect based on the role
  switch (token.role) {
    case "Doctor":
      if (
        !request.nextUrl.pathname.startsWith("/doctor") &&
        !request.nextUrl.pathname.startsWith("/api/auth/session")
      ) {
        return NextResponse.redirect(new URL("/doctor/dashboard", request.url));
      }
      break;
    case "Patient":
      if (!request.nextUrl.pathname.startsWith("/patient")) {
        return NextResponse.redirect(
          new URL("/patient/dashboard", request.url),
        );
      }
      break;
    case "Hospital":
      if (
        !request.nextUrl.pathname.startsWith("/api/auth/session") &&
        !request.nextUrl.pathname.startsWith("/hospital")
      ) {
        return NextResponse.redirect(
          new URL("/hospital/dashboard", request.url),
        );
      }
      break;
    default:
      return NextResponse.redirect(new URL("/login", request.url));
  }


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