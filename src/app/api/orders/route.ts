import { NextRequest, NextResponse } from "next/server";
import { createMockOrder, getMockOrdersForUser, getMockCurrentUser } from "@/lib/mockData";

export async function GET() {
  const user = getMockCurrentUser();
  const orders = getMockOrdersForUser(user?.email);
  return NextResponse.json({ success: true, data: { orders } });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.items || !body.customer) {
      return NextResponse.json({ success: false, message: "Missing required order information." }, { status: 400 });
    }
    const order = createMockOrder(body);
    return NextResponse.json({ success: true, message: "Order placed successfully", data: order });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to place order" }, { status: 500 });
  }
}
