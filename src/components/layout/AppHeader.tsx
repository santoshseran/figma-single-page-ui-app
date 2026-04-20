type Props = {
  hasUnsavedChanges: boolean;
  onSave: () => void;
};

export function AppHeader({ hasUnsavedChanges, onSave }: Props) {
  return (
    <header className="bg-gradient-to-r from-[#D71E28] to-[#B01820] text-white flex items-center justify-between px-6 py-3.5 shadow-xl border-b-2 border-[#A01018] shrink-0">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white/25 rounded flex items-center justify-center backdrop-blur-sm shadow-sm">
            <span className="text-sm">🏦</span>
          </div>
          <span className="text-lg font-bold tracking-wider">WELLS FARGO</span>
        </div>
        <div className="h-7 w-px bg-white/40" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">Global Surveillance and Oversight</span>
          <span className="text-[10px] text-white/80">AC Review</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button type="button" className="p-2 hover:bg-white/15 rounded transition-all" title="Help Center">
          <span className="text-sm">📚</span>
        </button>
        <button type="button" className="p-2 hover:bg-white/15 rounded transition-all" title="Support">
          <span className="text-sm">🆘</span>
        </button>
        <button type="button" className="p-2 hover:bg-white/15 rounded transition-all" title="Settings">
          <span className="text-sm">⚙️</span>
        </button>
        <button type="button" className="p-2 hover:bg-white/15 rounded transition-all" title="Help">
          <span className="text-sm">❓</span>
        </button>

        {hasUnsavedChanges && (
          <>
            <div className="h-6 w-px bg-white/30 mx-2" />
            <button
              type="button"
              onClick={onSave}
              className="px-5 py-2 bg-[#FFCD41] text-[#1a1a1a] rounded font-semibold hover:bg-[#FFD65C] transition-all shadow-md text-xs flex items-center gap-2"
            >
              <span>💾</span>
              <span>Save Changes</span>
            </button>
          </>
        )}

        <div className="h-6 w-px bg-white/30 mx-2" />
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">JD</div>
          <div className="flex flex-col">
            <span className="text-xs font-medium">John Doe</span>
            <span className="text-[10px] text-white/80">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
