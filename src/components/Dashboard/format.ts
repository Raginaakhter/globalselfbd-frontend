const bdt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BDT",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 2,
});

export const formatBDT = (value?: number | null) => bdt.format(value || 0);

export const formatTaka = (value?: number | null) =>
  value == null
    ? "--"
    : `৳${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const formatShortDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "-";
