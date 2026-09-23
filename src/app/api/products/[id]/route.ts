import { NextRequest, NextResponse } from "next/server";
import { getMockProductById } from "@/lib/mockData";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = getMockProductById(id);
  if (!result) {
    return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: result });
}
