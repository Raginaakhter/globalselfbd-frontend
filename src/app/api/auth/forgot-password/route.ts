import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Verification code sent! (Use 123456 in demo mode)",
  });
}
