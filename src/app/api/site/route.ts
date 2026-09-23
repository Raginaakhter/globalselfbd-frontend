import { NextResponse } from "next/server";
import { getMockSiteData } from "@/lib/mockData";

export async function GET() {
  const data = getMockSiteData();
  return NextResponse.json({ success: true, data });
}
