import { NextRequest, NextResponse } from "next/server";
import { calculateMockCart } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items = body.items ?? [];
    const zone = body.zone ?? "dhaka";
    const data = calculateMockCart(items, zone);
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  }
}
