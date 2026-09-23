import { NextRequest, NextResponse } from "next/server";
import { handleMockLogin } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const result = handleMockLogin(email || "newuser@globalshelfbd.com");
    return NextResponse.json({ success: true, message: "Account created successfully!", data: result });
  } catch {
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 });
  }
}
