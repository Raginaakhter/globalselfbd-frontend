import { NextRequest, NextResponse } from "next/server";
import { getMockOrderById } from "@/lib/mockData";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = req.nextUrl;
  const email = searchParams.get("email") ?? undefined;

  const order = getMockOrderById(id, email);
  if (!order) {
    return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: order });
}
