import { NextResponse } from "next/server";
import { getMockCurrentUser, handleMockLogin } from "@/lib/mockData";

export async function POST() {
  const current = getMockCurrentUser();
  if (current) {
    return NextResponse.json({ success: true, data: { user: current, accessToken: "mock-jwt-access-token" } });
  }
  // Default demo user so logged-in views can be tested smoothly if desired
  const result = handleMockLogin("user@globalshelfbd.com");
  return NextResponse.json({ success: true, data: result });
}
