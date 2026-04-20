import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { BarRectangleItem } from "recharts";
import type { DataRecord } from "../types";

const NAV_ITEMS = [
  { icon: "📊", label: "Dashboard" },
  { icon: "🚨", label: "Alerts", active: true },
  { icon: "📑", label: "Reports" },
  { icon: "⚙️", label: "Administration" },
  { icon: "🔧", label: "Manage Configurations" },
  { icon: "📋", label: "Manage Queue" },
  { icon: "🔔", label: "Manage Alerts" },
  { icon: "❓", label: "Help" }
];

function MonthlyBarChart({
  data,
  onMonthSelect
}: {
  data: DataRecord[];
  onMonthSelect: (month: string) => void;
}) {
  const chartData = React.useMemo(() => {
    const byMonth = data.reduce<Record<string, number>>((acc, r) => {
      acc[r.asofmonth] = (acc[r.asofmonth] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(byMonth)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
        <XAxis dataKey="month" style={{ fontSize: "10px", fill: "#aaa", fontWeight: 600 }} tick={{ fill: "#aaa" }} />
        <YAxis style={{ fontSize: "10px", fill: "#aaa", fontWeight: 600 }} tick={{ fill: "#aaa" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#2d2d2d",
            border: "1px solid #555",
            borderRadius: "4px",
            fontSize: "11px",
            color: "#fff",
            fontWeight: 600
          }}
          cursor={{ fill: "rgba(255, 205, 65, 0.1)" }}
        />
        <Bar
          dataKey="count"
          fill="#FFCD41"
          cursor="pointer"
          radius={[4, 4, 0, 0]}
          onClick={(item: BarRectangleItem) => {
            const month = item?.payload?.month as string | undefined;
            if (month) onMonthSelect(month);
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function ReviewerBreakdown({
  data,
  selectedMonth,
  onReviewerSelect
}: {
  data: DataRecord[];
  selectedMonth: string;
  onReviewerSelect: (reviewer: string) => void;
}) {
  const rows = React.useMemo(() => {
    if (!selectedMonth) return [];
    const tallies = data
      .filter((r) => r.asofmonth === selectedMonth)
      .reduce<Record<string, number>>((acc, r) => {
        acc[r.reviewer] = (acc[r.reviewer] || 0) + 1;
        return acc;
      }, {});
    return Object.entries(tallies)
      .map(([reviewer, count]) => ({ reviewer, count }))
      .sort((a, b) => b.count - a.count);
  }, [data, selectedMonth]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-1">
        {rows.map(({ reviewer, count }) => (
          <button
            key={reviewer}
            type="button"
            onClick={() => onReviewerSelect(reviewer)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-sm hover:bg-gray-700/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                {reviewer
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>
              <span className="text-[10px] text-gray-300 group-hover:text-white font-medium text-left">{reviewer}</span>
            </div>
            <span className="text-xs font-bold text-primary group-hover:text-white bg-gray-800 px-2 py-0.5 rounded-full min-w-[24px] text-center">
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

type Props = {
  data: DataRecord[];
  selectedMonth: string;
  onMonthSelect: (month: string) => void;
  onReviewerSelect: (reviewer: string) => void;
};

export function AppSidebar({ data, selectedMonth, onMonthSelect, onReviewerSelect }: Props) {
  const stats = React.useMemo(() => {
    const total = data.length;
    const pending = data.filter((r) => r.status === "Pending").length;
    const active = data.filter((r) => r.status === "Active").length;
    const inactive = data.filter((r) => r.status === "Inactive").length;
    const approved = data.filter((r) => r.approved).length;
    return { total, pending, active, inactive, approved };
  }, [data]);

  const approvalPct = stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(1) : "0";

  return (
    <aside className="w-[320px] bg-[#3d3d3d] text-white flex-shrink-0 overflow-y-auto shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-600">
          <div className="w-9 h-9 bg-primary rounded-sm flex items-center justify-center text-xs font-bold shadow-sm">WF</div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide">Wells Fargo</span>
            <span className="text-[10px] text-gray-400">Alert Management</span>
          </div>
        </div>

        <nav className="space-y-0.5 mb-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs transition-all ${
                item.active
                  ? "bg-primary text-white font-semibold shadow-sm"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mb-6 pt-4 border-t border-gray-600">
          <div className="px-3 py-2 text-[10px] text-gray-400 uppercase tracking-wider mb-2">Quick Stats</div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-gray-800/70 rounded-sm p-2 border border-gray-700">
              <div className="text-[9px] text-gray-400 uppercase tracking-wide mb-0.5">Total</div>
              <div className="text-lg font-bold text-white">{stats.total}</div>
            </div>
            <div className="bg-yellow-900/30 rounded-sm p-2 border border-yellow-700/50">
              <div className="text-[9px] text-yellow-400 uppercase tracking-wide mb-0.5">Pending</div>
              <div className="text-lg font-bold text-yellow-300">{stats.pending}</div>
            </div>
            <div className="bg-green-900/30 rounded-sm p-2 border border-green-700/50">
              <div className="text-[9px] text-green-400 uppercase tracking-wide mb-0.5">Active</div>
              <div className="text-lg font-bold text-green-300">{stats.active}</div>
            </div>
            <div className="bg-gray-800/70 rounded-sm p-2 border border-gray-700">
              <div className="text-[9px] text-gray-400 uppercase tracking-wide mb-0.5">Inactive</div>
              <div className="text-lg font-bold text-gray-400">{stats.inactive}</div>
            </div>
          </div>
          <div className="bg-primary/20 border border-primary/40 rounded-sm p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-white uppercase tracking-wide">Approval</span>
              <span className="text-sm font-bold text-white">
                {approvalPct}%
              </span>
            </div>
            <div className="bg-gray-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                style={{ width: `${approvalPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-600">
          <div className="px-3 py-1.5 text-[10px] text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span>📊</span>
            <span>Analytics</span>
          </div>
          <div className="text-[9px] text-gray-500 px-3 mb-2">Click month for breakdown</div>
          <div className="bg-gray-800/50 rounded-sm p-2 border border-gray-700">
            <div style={{ height: "240px" }}>
              <MonthlyBarChart data={data} onMonthSelect={onMonthSelect} />
            </div>
          </div>
        </div>

        {selectedMonth && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <div className="px-3 py-1.5 text-[10px] text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>👥</span>
                <div className="flex flex-col">
                  <span>Reviewers</span>
                  <span className="text-[9px] text-gray-500">{selectedMonth}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onMonthSelect("")}
                className="text-gray-400 hover:text-white text-lg transition-colors"
                title="Close"
              >
                ×
              </button>
            </div>
            <div className="bg-gray-800/50 rounded-sm p-2 border border-gray-700">
              <div style={{ height: "220px" }}>
                <ReviewerBreakdown
                  data={data}
                  selectedMonth={selectedMonth}
                  onReviewerSelect={onReviewerSelect}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
