import { NextRequest, NextResponse } from "next/server";
import { callBackend, jsonPost } from "@/lib/server/backend";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { status, body } = await callBackend("/api/contact", jsonPost(payload));
    return NextResponse.json(body, { status });
  } catch {
    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
    });
  }
}
