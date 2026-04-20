import React from "react";

type Props = {
  reviewers: string[];
  asofmonths: string[];
  selectedReviewer: string;
  selectedAsofmonth: string;
  onReviewerChange: (v: string) => void;
  onAsofmonthChange: (v: string) => void;
};

export function Filters({
  reviewers,
  asofmonths,
  selectedReviewer,
  selectedAsofmonth,
  onReviewerChange,
  onAsofmonthChange
}: Props) {
  const [localReviewer, setLocalReviewer] = React.useState(selectedReviewer);
  const [localMonth, setLocalMonth] = React.useState(selectedAsofmonth);

  const apply = () => {
    onReviewerChange(localReviewer);
    onAsofmonthChange(localMonth);
  };

  const clear = () => {
    setLocalReviewer("");
    setLocalMonth("");
    onReviewerChange("");
    onAsofmonthChange("");
  };

  return (
    <div className="flex gap-4 items-end flex-wrap">
      <div className="flex-1 max-w-xs min-w-[200px]">
        <label className="block text-[11px] mb-1.5 text-gray-300 font-semibold">Reviewer:</label>
        <select
          value={localReviewer}
          onChange={(e) => setLocalReviewer(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-[#4a4a4a] rounded-sm bg-[#2d2d2d] text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm hover:border-[#5a5a5a] transition-colors font-medium"
        >
          <option value="">All Reviewers</option>
          {reviewers.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 max-w-xs min-w-[200px]">
        <label className="block text-[11px] mb-1.5 text-gray-300 font-semibold">As of Month:</label>
        <select
          value={localMonth}
          onChange={(e) => setLocalMonth(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-[#4a4a4a] rounded-sm bg-[#2d2d2d] text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm hover:border-[#5a5a5a] transition-colors font-medium"
        >
          <option value="">All Months</option>
          {asofmonths.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={apply}
          className="px-7 py-2 bg-gradient-to-r from-primary to-[#B01820] text-white rounded-sm text-xs hover:from-[#B01820] hover:to-primary transition-all font-bold shadow-md"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={clear}
          className="px-5 py-2 bg-[#2d2d2d] border border-[#4a4a4a] text-gray-300 rounded-sm text-xs hover:bg-[#4a4a4a] transition-all font-semibold shadow-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
