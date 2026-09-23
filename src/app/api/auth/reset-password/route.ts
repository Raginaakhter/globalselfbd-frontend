import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Password reset successful! You can now log in with your new password.",
  });
}
