"use client";

import type { AdminOrderListItem } from "@/lib/backend-types";
import { qs, useApiQuery, type Pagination } from "../api";
import { PageHeader, useDebounced } from "../ui";
import { OrderFilterBar, OrdersTable, useOrderFilters } from "./orderShared";

export default function OrdersPage() {
  const { filters, setFilters, page, setPage } = useOrderFilters();
  const search = useDebounced(filters.search);
  const orders = useApiQuery<{ orders: AdminOrderListItem[]; pagination: Pagination }>(
    `/admin/orders${qs({ ...filters, search, page, limit: 20 })}`
  );

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader title="Orders" subtitle="Every customer order. Open an order to confirm, ship or cancel it." />
      <OrderFilterBar value={filters} onChange={setFilters} />
      <OrdersTable
        orders={orders.data?.orders}
        loading={orders.loading}
        error={orders.error}
        pagination={orders.data?.pagination ?? null}
        onPage={setPage}
        onRetry={orders.reload}
      />
    </div>
  );
}
