"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/landing/ProductCard";

export default function WishlistPage() {
  const { products, hydrated } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-11 h-11 rounded-2xl bg-coral-50 text-coral-500 flex items-center justify-center">
          <Heart className="w-5 h-5 fill-coral-500" />
        </span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-700 tracking-tight">My Wishlist</h1>
          <p className="text-sm text-slate-500">
            {products.length} saved item{products.length === 1 ? "" : "s"} · saved on this device
          </p>
        </div>
      </div>

      {!hydrated && (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl bg-white border border-slate-200 animate-pulse" />
          ))}
        </div>
      )}

      {hydrated && products.length === 0 && (
        <div className="text-center py-20">
          <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-lg font-black text-navy-700">Your wishlist is empty</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6">Tap the heart on any product to save it here for later.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white btn-primary-gradient">
            <ShoppingBag className="w-4 h-4" /> Start Shopping
          </Link>
        </div>
      )}

      {hydrated && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
