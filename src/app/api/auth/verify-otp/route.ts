import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "OTP verified successfully!",
    data: { resetToken: "mock-reset-token-12345" },
  });
}
