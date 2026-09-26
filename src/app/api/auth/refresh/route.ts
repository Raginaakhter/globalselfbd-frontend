import { NextRequest, NextResponse } from "next/server";
import { REFRESH_TOKEN_COOKIE_NAME } from "@/lib/cookies";
import { callBackend, clearRefreshCookie, clientSession, refreshOnce, setRefreshCookie, type BackendSession } from "@/lib/server/backend";

/**
 * Restores the session from the HttpOnly refresh cookie: rotates the refresh token, then loads the
 * user's profile, permissions and menu with the new access token.
 */
export async function POST(req: NextRequest) {
  const token = req.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  const refreshed = await refreshOnce(token);
  const tokens = refreshed.body.data;
  if (!refreshed.body.success || !tokens?.accessToken || !tokens.refreshToken) {
    // 502 means the backend is unreachable: keep the cookie so the session survives the outage.
    const res = NextResponse.json(
      { success: false, message: refreshed.body.message || "Session expired, please login again" },
      { status: refreshed.status === 502 ? 502 : 401 }
    );
    return refreshed.status === 502 ? res : clearRefreshCookie(res);
  }

  const me = await callBackend<BackendSession>("/api/auth/me", { headers: { Authorization: `Bearer ${tokens.accessToken}` } });
  if (!me.body.success || !me.body.data) {
    const res = NextResponse.json({ success: false, message: me.body.message || "Could not load your account" }, { status: me.status || 401 });
    return clearRefreshCookie(res);
  }

  const res = NextResponse.json({ success: true, message: "Session restored", data: clientSession(me.body.data, tokens.accessToken) });
  return setRefreshCookie(res, tokens.refreshToken);
}
