import { NextRequest, NextResponse } from "next/server";
import { getMockCurrentUser, updateMockUserProfile } from "@/lib/mockData";

export async function GET() {
  const user = getMockCurrentUser();
  return NextResponse.json({
    success: true,
    data: { profile: user },
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const { name, avatar } = await req.json();
    const updated = updateMockUserProfile(name, avatar);
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      data: { profile: updated },
    });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 500 });
  }
}
