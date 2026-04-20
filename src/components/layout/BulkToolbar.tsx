import { Download, Mail } from "lucide-react";
import { toast } from "sonner";
import type { ColumnVisibility } from "../../lib/csv";
import { buildCsv } from "../../lib/csv";
import type { DataRecord } from "../../types";

type Props = {
  data: DataRecord[];
  columnVisibility: ColumnVisibility;
  selectedCount: number;
  onSave: () => void;
};

export function BulkToolbar({ data, columnVisibility, selectedCount, onSave }: Props) {
  const buildExport = () => buildCsv(data, columnVisibility);

  return (
    <div className="bg-gradient-to-r from-[#2d2d2d] to-[#353535] px-6 py-3.5 border-b-2 border-[#4a4a4a] flex items-center justify-between shadow-sm shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-300 font-medium">
          {selectedCount > 0 ? (
            <span className="text-primary font-bold">
              {selectedCount} selected
            </span>
          ) : (
            "Select alerts to perform bulk actions"
          )}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 bg-[#3d3d3d] border border-[#4a4a4a] rounded-sm text-xs text-gray-200 hover:bg-[#4a4a4a] transition-all shadow-sm font-semibold flex items-center gap-1.5"
          >
            <span className="text-green-600">✓</span>
            Assign To
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              const csv = buildExport();
              const stamp = new Date().toISOString().split("T")[0];
              const blob = new Blob([csv], { type: "text/csv" });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `data-export-${stamp}.csv`;
              a.click();
              window.URL.revokeObjectURL(url);
              toast.success("CSV downloaded successfully");
            }}
            className="px-4 py-2 bg-[#3d3d3d] border border-[#4a4a4a] rounded-sm text-xs text-gray-200 hover:bg-[#4a4a4a] transition-all flex items-center gap-2 shadow-sm font-semibold hover:border-[#5a5a5a]"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button
            type="button"
            onClick={() => {
              const csv = buildExport();
              const kb = (new Blob([csv], { type: "text/csv" }).size / 1024).toFixed(2);
              toast.success(`Email prepared with attachment (${kb} KB)`, {
                description:
                  "In a production environment, this would open your email client with the CSV attached."
              });
            }}
            className="px-4 py-2 bg-[#3d3d3d] border border-[#4a4a4a] rounded-sm text-xs text-gray-200 hover:bg-[#4a4a4a] transition-all flex items-center gap-2 shadow-sm font-semibold hover:border-[#5a5a5a]"
          >
            <Mail className="w-3.5 h-3.5" />
            Email
          </button>
        </div>
        <button
          type="button"
          onClick={onSave}
          className="px-5 py-2 bg-gradient-to-r from-primary to-[#B01820] text-white rounded-sm text-xs hover:from-[#B01820] hover:to-primary transition-all shadow-md font-bold flex items-center gap-1.5"
        >
          <span className="text-sm">💾</span>
          Save
        </button>
      </div>
    </div>
  );
}
