import { NextRequest, NextResponse } from "next/server";
import { testing, verifyIdToken } from "./lib/firebase.server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value; // Extract token from cookies

  if (!token) {
    console.log("middleware: no id token found");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /* const user = await verifyIdToken(token); */
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
