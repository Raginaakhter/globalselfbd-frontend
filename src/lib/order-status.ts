// Order status flow as enforced by the backend: PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED,
// with CANCELLED reachable from PENDING, CONFIRMED or PROCESSING. Single source for labels and ordering.
import type { OrderStatus } from "@/lib/backend-types";

export type { OrderStatus };

export const ORDER_STATUSES: OrderStatus[] = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

/** The happy path, in order. Cancelled is rendered separately rather than as a timeline step. */
export const ORDER_STATUS_FLOW: OrderStatus[] = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Order Placed",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

/** Statuses in which a customer may still cancel their own order. */
export const CUSTOMER_CANCELLABLE: OrderStatus[] = ["PENDING", "CONFIRMED", "PROCESSING"];

export function orderStatusLabel(status: string): string {
  return ORDER_STATUS_LABELS[status as OrderStatus] ?? status;
}

/** Index of a status within the happy-path flow, or -1 for cancelled / unknown statuses. */
export function orderStatusFlowIndex(status: string): number {
  return ORDER_STATUS_FLOW.indexOf(status as OrderStatus);
}
