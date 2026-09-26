import { NextRequest } from "next/server";
import { callBackend, jsonPost, type BackendSession } from "@/lib/server/backend";
import { forwardedFor, readJson, sessionResponse } from "../_shared";

export async function POST(req: NextRequest) {
  const { email, password } = await readJson(req);
  const result = await callBackend<BackendSession>("/api/auth/login", jsonPost({ email, password }, forwardedFor(req)));
  return sessionResponse(result);
}
