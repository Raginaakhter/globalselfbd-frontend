import { NextRequest, NextResponse } from "next/server";
import { getMockOrderById } from "@/lib/mockData";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getMockOrderById(id);
  if (!order) {
    return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: order });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status, note } = await req.json();
  const order = getMockOrderById(id);
  if (order) {
    const now = new Date().toISOString();
    order.status = status;
    order.updatedAt = now;
    order.statusHistory.push({
      status,
      note: note || `Order status updated to ${status}`,
      createdAt: now,
    });
  }
  return NextResponse.json({ success: true, message: "Order status updated", data: order });
}
