import { NextRequest, NextResponse } from "next/server";
import { getMockWishlist, toggleMockWishlist } from "@/lib/mockData";

export async function GET() {
  const data = getMockWishlist();
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ success: false, message: "productId required" }, { status: 400 });
    }
    const result = toggleMockWishlist(productId);
    return NextResponse.json({ success: true, data: result });
  } catch {
    return NextResponse.json({ success: false, message: "Wishlist operation failed" }, { status: 500 });
  }
}
