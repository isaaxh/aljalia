import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const user = false;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/appointments/:path*",
    "/book-appointment",
    "/dashboard",
    "/profile",
  ],
};
