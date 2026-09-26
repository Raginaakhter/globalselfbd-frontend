import { NextRequest, NextResponse } from "next/server";
import { REFRESH_TOKEN_COOKIE_NAME } from "@/lib/cookies";
import { callBackend, clearRefreshCookie, jsonPost } from "@/lib/server/backend";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  // Revoke server-side too; the cookie is cleared even if the backend call fails.
  if (token) await callBackend("/api/auth/logout", jsonPost({ refreshToken: token }));
  return clearRefreshCookie(NextResponse.json({ success: true, message: "Logged out successfully" }));
}
