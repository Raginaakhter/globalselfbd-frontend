import { NextResponse } from "next/server";
import { getMockFeaturedProducts } from "@/lib/mockData";

export async function GET() {
  const data = getMockFeaturedProducts();
  return NextResponse.json({ success: true, data });
}
