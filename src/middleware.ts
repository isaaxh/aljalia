import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value; // Extract token from cookies

  if (!token) {
    console.log("middleware: no decoded token found");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // this header is not passing the token
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-auth-token", token);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
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
