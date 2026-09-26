import { NextRequest, NextResponse } from "next/server";
import { clientSession, setRefreshCookie, type BackendResult, type BackendSession } from "@/lib/server/backend";

/** Forwards the caller's IP so the backend's per-IP rate limiting applies per visitor, not per server. */
export const forwardedFor = (req: NextRequest): Record<string, string> => {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip");
  return ip ? { "X-Forwarded-For": ip } : {};
};

/** Turns a backend login/register response into the browser response + refresh cookie. */
export function sessionResponse(result: BackendResult<BackendSession>) {
  const { status, body } = result;
  const data = body.data;
  if (!body.success || !data?.accessToken || !data.refreshToken) {
    return NextResponse.json({ success: false, message: body.message || "Authentication failed" }, { status: status >= 400 ? status : 500 });
  }
  const res = NextResponse.json({ success: true, message: body.message, data: clientSession(data, data.accessToken) }, { status });
  return setRefreshCookie(res, data.refreshToken);
}

export async function readJson(req: NextRequest): Promise<Record<string, unknown>> {
  try {
    return (await req.json()) ?? {};
  } catch {
    return {};
  }
}
