import { verifyIdToken } from "@/lib/firebase.server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-auth-token");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify token using Firebase Admin
    const decodedToken = await verifyIdToken(token);
    return NextResponse.json({ success: true, user: decodedToken });
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
