import { NextRequest, NextResponse } from "next/server";
import { getMockOrderById } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const { orderId, email } = await req.json();
    if (!orderId || !email) {
      return NextResponse.json({ success: false, message: "Order ID and email are required." }, { status: 400 });
    }
    const order = getMockOrderById(orderId.trim(), email.trim());
    if (!order) {
      return NextResponse.json({ success: false, message: "No order found with that Order ID and email." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: order });
  } catch {
    return NextResponse.json({ success: false, message: "Order lookup failed" }, { status: 500 });
  }
}
