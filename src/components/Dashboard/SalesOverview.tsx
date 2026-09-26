"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ReportPeriodKey, SalesChart, SalesChartRange, SalesReport } from "@/lib/backend-types";
import { ORDER_STATUS_LABELS, ORDER_STATUSES } from "@/lib/order-status";
import { useApiQuery } from "./api";
import { formatBDT } from "./format";
import { StatusPill, selectClass } from "./ui";

const RANGES: { value: SalesChartRange; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "14d", label: "14 days" },
  { value: "30d", label: "30 days" },
  { value: "6m", label: "6 months" },
  { value: "1y", label: "1 year" },
];

const axisLabel = (label: string, groupBy: "day" | "month") =>
  groupBy === "day"
    ? new Date(`${label}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : new Date(`${label}-01T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "2-digit" });

/** Sales totals per period, orders by status and the sales chart (GET /reports/sales, /reports/sales/chart). */
export default function SalesOverview() {
  const report = useApiQuery<SalesReport>("/reports/sales");
  const [periodKey, setPeriodKey] = useState<ReportPeriodKey>("today");
  const [range, setRange] = useState<SalesChartRange>("7d");
  const chart = useApiQuery<SalesChart>(`/reports/sales/chart?range=${range}`);

  const data = report.data;
  const period = data?.periods.find((p) => p.key === periodKey) ?? data?.periods[0];
  const card = "rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs";

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <section className={`${card} flex flex-col gap-4`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-extrabold tracking-wide text-slate-700 uppercase">Sales</h2>
          <select className={selectClass} value={periodKey} onChange={(e) => setPeriodKey(e.target.value as ReportPeriodKey)} disabled={!data}>
            {(data?.periods ?? []).map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        {report.error ? (
          <p className="text-sm font-semibold text-rose-600">{report.error}</p>
        ) : (
          <>
            <div>
              <div className="text-3xl font-black text-slate-900">{period ? formatBDT(period.amount) : "…"}</div>
              <div className="text-xs text-slate-500">{period ? `${period.orders} delivered order${period.orders === 1 ? "" : "s"}` : ""}</div>
            </div>
            <dl className="grid grid-cols-3 gap-2 text-xs">
              {[
                ["Products", period?.productSales],
                ["Shipping", period?.shippingCost],
                ["Discount", period?.discount],
              ].map(([k, v]) => (
                <div key={k as string} className="rounded-xl bg-slate-50 p-2.5">
                  <dt className="font-semibold text-slate-500">{k}</dt>
                  <dd className="font-extrabold text-slate-800">{v == null ? "…" : formatBDT(v as number)}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h3 className="mb-2 text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">Orders by status (now)</h3>
              <ul className="space-y-1.5">
                {ORDER_STATUSES.map((s) => {
                  const row = data?.ordersByStatus[s];
                  return (
                    <li key={s} className="flex items-center justify-between gap-2 text-xs">
                      <span title={ORDER_STATUS_LABELS[s]}>
                        <StatusPill value={s} />
                      </span>
                      <span className="font-semibold text-slate-600">
                        {row ? `${row.orders} · ${formatBDT(row.amount)}` : "…"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <p className="text-[11px] text-slate-400">Delivered orders on the day they were delivered; refunded orders are excluded.</p>
          </>
        )}
      </section>

      <section className={`${card} flex flex-col gap-3`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-extrabold tracking-wide text-slate-700 uppercase">Sales chart</h2>
            {chart.data && (
              <p className="text-xs text-slate-500">
                {formatBDT(chart.data.total.amount)} from {chart.data.total.orders} order{chart.data.total.orders === 1 ? "" : "s"}
              </p>
            )}
          </div>
          <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setRange(r.value)}
                className={`cursor-pointer rounded-lg px-2.5 py-1 ${range === r.value ? "bg-white text-blue-700 shadow" : "text-slate-500"}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-72">
          {chart.error ? (
            <p className="text-sm font-semibold text-rose-600">{chart.error}</p>
          ) : !chart.data ? (
            <div className="h-full animate-pulse rounded-2xl bg-slate-100" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart.data.points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="label"
                  tickFormatter={(l: string) => axisLabel(l, chart.data!.groupBy)}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={16}
                />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} width={56} tickFormatter={(v: number) => `৳${v.toLocaleString("en-US")}`} />
                <Tooltip
                  labelFormatter={(l) => axisLabel(String(l), chart.data!.groupBy)}
                  formatter={(v, name) => (name === "amount" ? [formatBDT(Number(v)), "Sales"] : [String(v), "Orders"])}
                />
                <Area type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} fill="url(#salesFill)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    </div>
  );
}
