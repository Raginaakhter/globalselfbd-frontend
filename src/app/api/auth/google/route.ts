import { NextResponse } from "next/server";
import { handleMockLogin } from "@/lib/mockData";

export async function POST() {
  const result = handleMockLogin("googleuser@globalshelfbd.com");
  return NextResponse.json({
    success: true,
    message: "Google login successful!",
    data: result,
  });
}
