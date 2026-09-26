"use client";

import type { AdminOrderListItem } from "@/lib/backend-types";
import { qs, useApiQuery, type Pagination } from "../api";
import { PageHeader, useDebounced } from "../ui";
import { OrderFilterBar, OrdersTable, PAYMENT_STATUSES, useOrderFilters } from "./orderShared";
import PaymentsSummary from "./PaymentsSummary";
import { useAuth } from "@/context/AuthContext";

type OrdersResponse = { orders: AdminOrderListItem[]; pagination: Pagination };

/** Payments are tracked on orders: each order has its own payment status. */
export default function PaymentsPage() {
  const { hasPermission } = useAuth();
  const { filters, setFilters, page, setPage } = useOrderFilters({ paymentStatus: "PENDING" });
  const search = useDebounced(filters.search);
  const orders = useApiQuery<OrdersResponse>(`/admin/orders${qs({ ...filters, search, page, limit: 20 })}`);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader title="Payments" subtitle="Payment status of customer orders. Open an order to mark it paid, failed or refunded." />
      {hasPermission("payments.view") && <PaymentsSummary />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PAYMENT_STATUSES.map((s) => (
          <PaymentCount key={s} status={s} active={filters.paymentStatus === s} onClick={() => setFilters({ ...filters, paymentStatus: s })} />
        ))}
      </div>
      <OrderFilterBar value={filters} onChange={setFilters} />
      <OrdersTable
        orders={orders.data?.orders}
        loading={orders.loading}
        error={orders.error}
        pagination={orders.data?.pagination ?? null}
        onPage={setPage}
        onRetry={orders.reload}
        emptyText="No orders with this payment status."
      />
    </div>
  );
}

function PaymentCount({ status, active, onClick }: { status: string; active: boolean; onClick: () => void }) {
  // Only the total is needed, so ask for a single row.
  const res = useApiQuery<OrdersResponse>(`/admin/orders${qs({ paymentStatus: status, limit: 1 })}`);
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border bg-white p-4 text-left shadow-xs transition hover:border-blue-300 ${active ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200/80"}`}
    >
      <div className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">{status}</div>
      <div className="mt-1 text-2xl font-extrabold text-slate-900">{res.data ? res.data.pagination.total : "…"}</div>
      <div className="text-[11px] text-slate-400">orders</div>
    </button>
  );
}
