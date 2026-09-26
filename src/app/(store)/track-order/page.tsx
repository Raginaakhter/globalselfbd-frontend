"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, Package, Search } from "lucide-react";
import { ApiError, useAuth } from "@/context/AuthContext";
import type { OrderListItem } from "@/lib/backend-types";
import type { Pagination } from "@/lib/storefront";

const PAGE_LIMIT = 50;
const MAX_PAGES = 10;

/** Orders can only be looked up by their owner, so tracking searches the signed-in customer's own orders. */
export default function TrackOrderPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, api } = useAuth();
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const wanted = orderNumber.trim().toUpperCase();
    if (!wanted) return setError("Please enter your order number (e.g. ORD-1001).");
    setError("");
    setLoading(true);
    try {
      for (let page = 1; page <= MAX_PAGES; page++) {
        const res = await api<{ orders: OrderListItem[]; pagination: Pagination }>(`/orders?page=${page}&limit=${PAGE_LIMIT}`);
        const match = res.data.orders.find((o) => o.orderNumber.toUpperCase() === wanted);
        if (match) return router.push(`/profile/orders/${match._id}`);
        if (page >= res.data.pagination.totalPages) break;
      }
      setError("No order with that number was found in your account.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <span className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-4">
          <Package className="w-7 h-7" />
        </span>
        <h1 className="text-3xl font-black text-navy-700 tracking-tight">Track Your Order</h1>
        <p className="text-sm text-slate-500 mt-2">Enter the order number from your confirmation to see its latest status.</p>
      </div>

      {authLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-7 h-7 animate-spin text-brand-600" />
        </div>
      ) : !isAuthenticated ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center shadow-sm">
          <p className="text-sm text-slate-600 mb-5">Sign in to the account you ordered with to track your orders.</p>
          <Link href="/login?redirect=/track-order" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white btn-primary-gradient">
            <LogIn className="w-4 h-4" /> Sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <label className="block">
            <span className="block text-xs font-bold text-navy-700 uppercase tracking-wider mb-1.5">Order number</span>
            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="ORD-1001"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15"
            />
          </label>
          {error && <p className="text-sm font-semibold text-rose-600">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-full text-sm font-black text-white btn-primary-gradient flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Track order
          </button>
          <p className="text-center text-xs text-slate-500">
            Or see all your orders in{" "}
            <Link href="/profile?tab=orders" className="font-bold text-brand-700 hover:underline">
              My Orders
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}
