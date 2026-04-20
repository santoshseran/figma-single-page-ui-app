export function BreadcrumbBar() {
  return (
    <div className="bg-gradient-to-r from-[#2d2d2d] to-[#353535] px-6 py-2.5 border-b border-[#4a4a4a] flex items-center gap-2 text-xs text-gray-300 shadow-sm shrink-0">
      <span className="hover:text-primary cursor-pointer transition-colors font-medium flex items-center gap-1">
        <span className="text-sm">🏠</span>
        Home
      </span>
      <span className="text-gray-400 font-light">›</span>
      <span className="font-bold text-white bg-[#3d3d3d] px-2 py-0.5 rounded-sm shadow-sm">AC Review</span>
    </div>
  );
}
