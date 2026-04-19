"use client";

import { Search, Sparkles } from "lucide-react";

export default function ResearchSearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="relative group">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <Search
              size={15}
              className="text-colordark/25 group-focus-within:text-blue-from transition-colors"
              strokeWidth={2.5}
            />
          </div>
          <input
            type="text"
            placeholder="Search cases, statutes, or legal concepts with AI..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
            className="w-full h-11 pl-10 pr-4 bg-white border border-colordark/[0.08] rounded-xl text-[0.875rem] text-colordark placeholder:text-colordark/30 focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.06)] transition-all"
          />
        </div>
        <button
          onClick={onSearch}
          className="flex items-center gap-2 h-11 px-5 text-[0.8125rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] shadow-md rounded-xl transition-all cursor-pointer group active:scale-[0.98]"
        >
          <Sparkles size={14} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
          <span>Research</span>
        </button>
      </div>
    </div>
  );
}
