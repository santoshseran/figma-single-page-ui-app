import React from "react";
import type { ColumnVisibility } from "../lib/csv";
import type { Category, DataRecord, Status } from "../types";

type Props = {
  data: DataRecord[];
  columnVisibility: ColumnVisibility;
  onUpdateRecord: (id: string, patch: Partial<DataRecord>) => void;
  selectedRecords: Set<string>;
  onSelectRecord: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
};

function statusBadgeClasses(status: Status) {
  if (status === "Active") return "bg-green-900/40 text-green-400 border border-green-700";
  if (status === "Pending") return "bg-yellow-900/40 text-yellow-400 border border-yellow-700";
  return "bg-gray-800/40 text-gray-400 border border-gray-700";
}

function statusPrefix(status: Status) {
  if (status === "Active") return "✓ ";
  if (status === "Pending") return "⏱ ";
  return "○ ";
}

function categoryBadgeClasses(category: Category) {
  if (category === "Type A") return "bg-blue-900/40 text-blue-400 border border-blue-700";
  if (category === "Type B") return "bg-purple-900/40 text-purple-400 border border-purple-700";
  return "bg-orange-900/40 text-orange-400 border border-orange-700";
}

export function DataTable({
  data,
  columnVisibility,
  onUpdateRecord,
  selectedRecords,
  onSelectRecord,
  onSelectAll
}: Props) {
  const selectAllRef = React.useRef<HTMLInputElement>(null);
  const allSelected = data.length > 0 && data.every((r) => selectedRecords.has(r.id));
  const someSelected = data.some((r) => selectedRecords.has(r.id)) && !allSelected;
  const [editingCell, setEditingCell] = React.useState<{ id: string; field: "comments" } | null>(null);

  React.useEffect(() => {
    const el = selectAllRef.current;
    if (el) el.indeterminate = someSelected;
  }, [someSelected, allSelected, data.length]);

  return (
    <div className="bg-[#2d2d2d] border border-[#4a4a4a] rounded-sm overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead className="bg-gradient-to-r from-[#D71E28] to-[#B01820] border-b-2 border-[#A01018]">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 text-primary focus:ring-primary cursor-pointer bg-[#2d2d2d]/10"
                />
              </th>
              {columnVisibility.reviewer && (
                <th className="px-4 py-3 text-left text-white whitespace-nowrap font-bold text-[11px] uppercase tracking-wide">
                  Reviewer
                </th>
              )}
              {columnVisibility.asofmonth && (
                <th className="px-4 py-3 text-left text-white whitespace-nowrap font-bold text-[11px] uppercase tracking-wide">
                  As of Month
                </th>
              )}
              {columnVisibility.customerName && (
                <th className="px-4 py-3 text-left text-white whitespace-nowrap font-bold text-[11px] uppercase tracking-wide">
                  Customer Name
                </th>
              )}
              {columnVisibility.accountNumber && (
                <th className="px-4 py-3 text-left text-white whitespace-nowrap font-bold text-[11px] uppercase tracking-wide">
                  Account Number
                </th>
              )}
              {columnVisibility.status && (
                <th className="px-4 py-3 text-left text-white whitespace-nowrap font-bold text-[11px] uppercase tracking-wide">
                  Status
                </th>
              )}
              {columnVisibility.approved && (
                <th className="px-4 py-3 text-left text-white whitespace-nowrap font-bold text-[11px] uppercase tracking-wide">
                  Approved
                </th>
              )}
              {columnVisibility.category && (
                <th className="px-4 py-3 text-left text-white whitespace-nowrap font-bold text-[11px] uppercase tracking-wide">
                  Category
                </th>
              )}
              {columnVisibility.amount && (
                <th className="px-4 py-3 text-left text-white whitespace-nowrap font-bold text-[11px] uppercase tracking-wide">
                  Amount
                </th>
              )}
              {columnVisibility.comments && (
                <th className="px-4 py-3 text-left text-white whitespace-nowrap font-bold text-[11px] uppercase tracking-wide">
                  Comments
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#4a4a4a]">
            {data.map((r, idx) => (
              <tr
                key={r.id}
                className={`hover:bg-[#3d3d3d] transition-colors border-l-2 hover:border-l-primary ${
                  idx % 2 === 0 ? "bg-[#2d2d2d] border-l-transparent" : "bg-[#252525] border-l-transparent"
                } ${selectedRecords.has(r.id) ? "bg-blue-900/30" : ""}`}
              >
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRecords.has(r.id)}
                    onChange={() => onSelectRecord(r.id)}
                    className="w-4 h-4 rounded border-[#4a4a4a] text-primary focus:ring-primary cursor-pointer bg-[#1a1a1a]"
                  />
                </td>
                {columnVisibility.reviewer && (
                  <td className="px-4 py-3 text-gray-200 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[9px] font-bold">
                        {r.reviewer
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </div>
                      <span className="font-medium">{r.reviewer}</span>
                    </div>
                  </td>
                )}
                {columnVisibility.asofmonth && (
                  <td className="px-4 py-3 text-gray-200 whitespace-nowrap font-mono">{r.asofmonth}</td>
                )}
                {columnVisibility.customerName && (
                  <td className="px-4 py-3 text-white whitespace-nowrap font-semibold">{r.customerName}</td>
                )}
                {columnVisibility.accountNumber && (
                  <td className="px-4 py-3 text-gray-200 whitespace-nowrap font-mono text-[11px]">
                    {r.accountNumber}
                  </td>
                )}
                {columnVisibility.status && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${statusBadgeClasses(r.status)}`}
                    >
                      {statusPrefix(r.status)}
                      {r.status}
                    </span>
                  </td>
                )}
                {columnVisibility.approved && (
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={r.approved}
                        onChange={(e) => onUpdateRecord(r.id, { approved: e.target.checked })}
                        className="w-4 h-4 rounded border-[#4a4a4a] text-primary focus:ring-primary cursor-pointer bg-[#1a1a1a]"
                      />
                      <span
                        className={`ml-2 text-[10px] font-semibold ${r.approved ? "text-green-400" : "text-gray-500"}`}
                      >
                        {r.approved ? "Yes" : "No"}
                      </span>
                    </div>
                  </td>
                )}
                {columnVisibility.category && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-semibold ${categoryBadgeClasses(r.category)}`}
                    >
                      {r.category}
                    </span>
                  </td>
                )}
                {columnVisibility.amount && (
                  <td className="px-4 py-3 text-white whitespace-nowrap font-bold text-right">
                    ${r.amount.toLocaleString()}
                  </td>
                )}
                {columnVisibility.comments && (
                  <td className="px-4 py-3">
                    <textarea
                      value={r.comments}
                      onChange={(e) => onUpdateRecord(r.id, { comments: e.target.value })}
                      onFocus={() => setEditingCell({ id: r.id, field: "comments" })}
                      onBlur={() => setEditingCell(null)}
                      rows={editingCell?.id === r.id && editingCell?.field === "comments" ? 4 : 1}
                      className={`w-full min-w-[200px] px-3 py-1.5 border border-[#4a4a4a] rounded-sm text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-[#2d2d2d] hover:border-[#5a5a5a] transition-all resize-none ${
                        editingCell?.id === r.id && editingCell?.field === "comments"
                          ? "whitespace-normal"
                          : "whitespace-nowrap overflow-hidden"
                      }`}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-20 px-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3d3d3d] rounded-full mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Records Found</h3>
          <p className="text-sm text-gray-300 max-w-md mx-auto">
            No records match your current filter criteria. Try adjusting your filters or clearing them to see more
            results.
          </p>
        </div>
      )}
    </div>
  );
}
