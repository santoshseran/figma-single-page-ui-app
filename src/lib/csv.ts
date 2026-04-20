import type { DataRecord } from "../types";

type ColumnKey = keyof DataRecord;

export type ColumnVisibility = Record<ColumnKey, boolean>;

const DEFAULT_COLUMNS: ColumnKey[] = [
  "reviewer",
  "asofmonth",
  "customerName",
  "accountNumber",
  "status",
  "approved",
  "category",
  "amount",
  "comments"
];

export const DEFAULT_COLUMN_VISIBILITY: ColumnVisibility = {
  id: false,
  reviewer: true,
  asofmonth: true,
  customerName: true,
  accountNumber: true,
  status: true,
  approved: true,
  category: true,
  amount: true,
  comments: true
};

function escapeCsv(v: unknown) {
  const s = String(v ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}

export function buildCsv(data: DataRecord[], visibility: ColumnVisibility) {
  const cols = DEFAULT_COLUMNS.filter((k) => visibility[k]);
  const header = cols.join(",");
  const rows = data.map((r) =>
    cols
      .map((k) => {
        const v = r[k];
        if (typeof v === "boolean") return escapeCsv(v ? "Yes" : "No");
        return escapeCsv(v);
      })
      .join(",")
  );
  return [header, ...rows].join("\n");
}

