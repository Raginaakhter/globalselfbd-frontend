import { NextRequest, NextResponse } from "next/server";
import { getMockProducts } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;
  const limitStr = searchParams.get("limit");
  const limit = limitStr ? parseInt(limitStr, 10) : undefined;

  const result = getMockProducts({ q, category, sort, limit });
  return NextResponse.json({ success: true, data: result });
}
