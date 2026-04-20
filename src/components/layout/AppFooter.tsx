export function AppFooter() {
  return (
    <footer className="bg-gradient-to-r from-[#3d3d3d] to-[#2d2d2d] text-white px-6 py-4 border-t-2 border-gray-700 mt-auto shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-xs text-gray-400">© 2026 Wells Fargo & Company. All rights reserved.</div>
          <div className="h-4 w-px bg-gray-600" />
          <div className="flex gap-4 text-xs">
            <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#security" className="text-gray-400 hover:text-white transition-colors">
              Security
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>Version 2.4.1</span>
          <div className="h-4 w-px bg-gray-600" />
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
