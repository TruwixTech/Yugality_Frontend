"use client";

export default function RecentSearches({ searches, onSearchClick }) {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="mb-6">
      <p className="text-[0.6875rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to uppercase tracking-[0.1em] mb-2.5">Recent Searches</p>
      <div className="flex items-center gap-2 flex-wrap">
        {searches.map((term, i) => (
          <button
            key={i}
            onClick={() => onSearchClick(term)}
            className="px-3.5 py-1.5 text-[0.8125rem] text-colordark/70 border border-colordark/[0.06] rounded-full hover:border-blue-from/30 hover:text-colordark transition-all cursor-pointer"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
