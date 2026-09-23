import { NextResponse } from "next/server";
import { getMockOrdersForUser } from "@/lib/mockData";

export async function GET() {
  const orders = getMockOrdersForUser();
  return NextResponse.json({
    success: true,
    data: {
      orders,
      pagination: {
        page: 1,
        limit: 20,
        total: orders.length,
        totalPages: 1,
      },
    },
  });
}
