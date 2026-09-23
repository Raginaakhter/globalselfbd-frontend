import { NextRequest, NextResponse } from "next/server";
import { handleMockLogin } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }
    const result = handleMockLogin(email);
    return NextResponse.json({ success: true, message: "Login successful!", data: result });
  } catch {
    return NextResponse.json({ success: false, message: "Login failed" }, { status: 500 });
  }
}
