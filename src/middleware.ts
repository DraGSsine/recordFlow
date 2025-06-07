import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth"; // Import the auth instance
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session using better-auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // If user is on the landing page and already signed in, redirect to /record
  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/record", request.url));
  }

  // If user is not on the landing page and not signed in, redirect to landing page
  if (pathname !== "/" && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If session token exists or user is on the landing page, allow access
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except for specific Next.js internals and API routes.
  // The logic inside the middleware further refines which of these matched routes require auth.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
