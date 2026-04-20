import React from "react";
import { Toaster, toast } from "sonner";
import { AppSidebar } from "./components/AppSidebar";
import { ColumnPicker } from "./components/ColumnPicker";
import { DataTable } from "./components/DataTable";
import { Filters } from "./components/Filters";
import { AlertTabs } from "./components/layout/AlertTabs";
import { AppFooter } from "./components/layout/AppFooter";
import { AppHeader } from "./components/layout/AppHeader";
import { BreadcrumbBar } from "./components/layout/BreadcrumbBar";
import { BulkToolbar } from "./components/layout/BulkToolbar";
import { SEED_RECORDS } from "./data/seed";
import { DEFAULT_COLUMN_VISIBILITY, type ColumnVisibility } from "./lib/csv";
import { loadJson, saveJson } from "./lib/storage";
import type { DataRecord } from "./types";

const STORAGE_KEYS = {
  records: "spui.records.v1",
  columns: "spui.columns.v1"
} as const;

function matchesGlobalSearch(r: DataRecord, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    r.id,
    r.reviewer,
    r.asofmonth,
    r.customerName,
    r.accountNumber,
    r.status,
    r.category,
    r.comments,
    String(r.amount),
    r.approved ? "yes" : "no"
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export default function App() {
  const [records, setRecords] = React.useState<DataRecord[]>(
    () => loadJson<DataRecord[]>(STORAGE_KEYS.records) ?? SEED_RECORDS
  );
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibility>(
    () => loadJson<ColumnVisibility>(STORAGE_KEYS.columns) ?? DEFAULT_COLUMN_VISIBILITY
  );

  const [selectedReviewer, setSelectedReviewer] = React.useState("");
  const [selectedAsofmonth, setSelectedAsofmonth] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [dirty, setDirty] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"pending" | "closed">("pending");
  const [selectedIds, setSelectedIds] = React.useState(() => new Set<string>());

  React.useEffect(() => {
    saveJson(STORAGE_KEYS.columns, columnVisibility);
  }, [columnVisibility]);

  const reviewers = React.useMemo(
    () => Array.from(new Set(records.map((r) => r.reviewer))).sort((a, b) => a.localeCompare(b)),
    [records]
  );
  const asofmonths = React.useMemo(
    () => Array.from(new Set(records.map((r) => r.asofmonth))).sort((a, b) => a.localeCompare(b)),
    [records]
  );

  const filtered = React.useMemo(() => {
    return records.filter((r) => {
      if (selectedReviewer && r.reviewer !== selectedReviewer) return false;
      if (selectedAsofmonth && r.asofmonth !== selectedAsofmonth) return false;
      if (!matchesGlobalSearch(r, searchQuery)) return false;
      return true;
    });
  }, [records, selectedReviewer, selectedAsofmonth, searchQuery]);

  const pendingCount = React.useMemo(
    () => filtered.filter((r) => r.status === "Pending").length,
    [filtered]
  );
  const closedCount = React.useMemo(
    () => filtered.filter((r) => r.status !== "Pending").length,
    [filtered]
  );

  const tabData = React.useMemo(() => {
    if (activeTab === "pending") return filtered.filter((r) => r.status === "Pending");
    return filtered.filter((r) => r.status !== "Pending");
  }, [filtered, activeTab]);

  const saveRecords = React.useCallback(() => {
    saveJson(STORAGE_KEYS.records, records);
    setDirty(false);
    toast.success("Changes saved successfully");
  }, [records]);

  const onUpdateRecord = React.useCallback((id: string, patch: Partial<DataRecord>) => {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setDirty(true);
  }, []);

  const onSelectRecord = React.useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const onSelectAll = React.useCallback(
    (checked: boolean) => {
      if (!checked) {
        setSelectedIds(new Set());
        return;
      }
      setSelectedIds(new Set(tabData.map((r) => r.id)));
    },
    [tabData]
  );

  return (
    <div className="min-h-screen h-full flex flex-col bg-gradient-to-br from-[#1a1a1a] to-[#252525] text-foreground">
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          style: {
            background: "#2d2d2d",
            color: "#e5e5e5",
            border: "2px solid #4a4a4a",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 600
          }
        }}
      />

      <AppHeader hasUnsavedChanges={dirty} onSave={saveRecords} />

      <div className="flex flex-1 overflow-hidden min-h-0">
        <AppSidebar
          data={records}
          selectedMonth={selectedAsofmonth}
          onMonthSelect={setSelectedAsofmonth}
          onReviewerSelect={setSelectedReviewer}
        />

        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <BreadcrumbBar />

          <div className="bg-gradient-to-r from-[#2d2d2d] to-[#353535] px-6 py-4 border-b border-[#4a4a4a] shadow-sm shrink-0">
            <h2 className="text-lg text-white font-bold flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              AC Review
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-medium">All assigned search alerts - Real-time monitoring</p>
          </div>

          <AlertTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            pendingCount={pendingCount}
            closedCount={closedCount}
          />

          <BulkToolbar
            data={tabData}
            columnVisibility={columnVisibility}
            selectedCount={selectedIds.size}
            onSave={saveRecords}
          />

          <div className="flex-1 overflow-y-auto min-h-0 bg-gradient-to-br from-[#1a1a1a] to-[#252525] px-6 py-4">
            <div className="bg-gradient-to-br from-[#2d2d2d] to-[#353535] border-2 border-[#4a4a4a] rounded-md shadow-lg">
              <div className="border-b-2 border-[#4a4a4a] p-5 bg-gradient-to-r from-[#3d3d3d]/60 to-[#3d3d3d]/40">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">🔍</span>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wide">Advanced Filters</h3>
                </div>
                <Filters
                  key={`${selectedReviewer}::${selectedAsofmonth}`}
                  reviewers={reviewers}
                  asofmonths={asofmonths}
                  selectedReviewer={selectedReviewer}
                  selectedAsofmonth={selectedAsofmonth}
                  onReviewerChange={setSelectedReviewer}
                  onAsofmonthChange={setSelectedAsofmonth}
                />
              </div>

              <div className="p-5 border-b-2 border-[#4a4a4a] bg-[#2d2d2d]">
                <div className="flex gap-4 items-center justify-between flex-wrap">
                  <div className="flex-1 max-w-lg min-w-[240px]">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="🔎 Search across all fields..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border-2 border-[#4a4a4a] rounded-md bg-[#1a1a1a] text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm font-medium hover:border-[#5a5a5a] transition-colors placeholder:text-gray-500"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 text-lg"
                          aria-label="Clear search"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-300 font-semibold">
                      Showing {tabData.length} of {records.length} records
                    </span>
                    <ColumnPicker
                      columnVisibility={columnVisibility}
                      onColumnVisibilityChange={setColumnVisibility}
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#1a1a1a]">
                <DataTable
                  data={tabData}
                  columnVisibility={columnVisibility}
                  onUpdateRecord={onUpdateRecord}
                  selectedRecords={selectedIds}
                  onSelectRecord={onSelectRecord}
                  onSelectAll={onSelectAll}
                />
              </div>
            </div>
          </div>

          <AppFooter />
        </div>
      </div>
    </div>
  );
}
