import { Settings } from "lucide-react";
import React from "react";
import type { ColumnVisibility } from "../lib/csv";

type Props = {
  columnVisibility: ColumnVisibility;
  onColumnVisibilityChange: (next: ColumnVisibility) => void;
};

const LABELS: Record<keyof ColumnVisibility, string> = {
  id: "ID",
  reviewer: "Reviewer",
  asofmonth: "As of Month",
  customerName: "Customer Name",
  accountNumber: "Account Number",
  status: "Status",
  approved: "Approved",
  category: "Category",
  amount: "Amount",
  comments: "Comments"
};

export function ColumnPicker({ columnVisibility, onColumnVisibilityChange }: Props) {
  const [open, setOpen] = React.useState(false);

  const toggle = (key: keyof ColumnVisibility) => {
    onColumnVisibilityChange({
      ...columnVisibility,
      [key]: !columnVisibility[key]
    });
  };

  const entries = Object.entries(LABELS).filter(([k]) => k !== "id") as [keyof ColumnVisibility, string][];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 bg-[#3d3d3d] border border-[#4a4a4a] text-gray-200 rounded hover:bg-[#4a4a4a] flex items-center gap-1.5 transition-colors text-sm"
      >
        <Settings className="w-3.5 h-3.5" />
        Columns
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 top-full mt-2 w-56 bg-[#2d2d2d] border border-[#4a4a4a] rounded shadow-lg z-20 p-3">
            <h3 className="mb-2 text-white text-xs font-semibold">Show/Hide Columns</h3>
            <div className="space-y-1.5">
              {entries.map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 cursor-pointer hover:bg-[#4a4a4a] px-1.5 py-1 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={columnVisibility[key]}
                    onChange={() => toggle(key)}
                    className="w-3.5 h-3.5 rounded border-[#4a4a4a] text-primary focus:ring-primary"
                  />
                  <span className="text-xs text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
