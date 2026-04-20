type TabId = "pending" | "closed";

type Props = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  pendingCount: number;
  closedCount: number;
};

export function AlertTabs({ activeTab, onTabChange, pendingCount, closedCount }: Props) {
  return (
    <div className="bg-gradient-to-r from-[#2d2d2d] to-[#353535] px-6 border-b-2 border-[#4a4a4a] shrink-0">
      <div className="flex gap-0.5">
        <button
          type="button"
          onClick={() => onTabChange("pending")}
          className={`px-5 py-3 text-xs transition-all relative font-semibold tracking-wide ${
            activeTab === "pending"
              ? "bg-[#3d3d3d] text-white shadow-sm"
              : "text-gray-400 hover:text-white hover:bg-[#3d3d3d]/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>Escalated Alerts</span>
            <span
              className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold ${
                activeTab === "pending" ? "bg-primary text-white" : "bg-[#4a4a4a] text-gray-300"
              }`}
            >
              {pendingCount}
            </span>
          </div>
          {activeTab === "pending" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#B01820]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => onTabChange("closed")}
          className={`px-5 py-3 text-xs transition-all relative font-semibold tracking-wide ${
            activeTab === "closed"
              ? "bg-[#3d3d3d] text-white shadow-sm"
              : "text-gray-400 hover:text-white hover:bg-[#3d3d3d]/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>Closed Alerts</span>
            <span
              className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold ${
                activeTab === "closed" ? "bg-green-600 text-white" : "bg-[#4a4a4a] text-gray-300"
              }`}
            >
              {closedCount}
            </span>
          </div>
          {activeTab === "closed" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-700" />
          )}
        </button>
      </div>
    </div>
  );
}
