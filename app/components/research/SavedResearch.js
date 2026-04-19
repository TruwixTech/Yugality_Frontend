"use client";

import { Bookmark, Clock, ExternalLink } from "lucide-react";

const savedItems = [
  { id: 1, title: "Companies Act 2013 — Director Duties Summary", type: "Note", savedAt: "2 days ago", source: "Personal Research" },
  { id: 2, title: "Smith v. Johnson — Key Precedents on Contract Breach", type: "Case", savedAt: "5 days ago", source: "Case Law" },
  { id: 3, title: "SEBI Regulations on Insider Trading — Annotated", type: "Statute", savedAt: "1 week ago", source: "Legislation" },
  { id: 4, title: "Arbitration & Conciliation Act — Recent Amendments", type: "Article", savedAt: "2 weeks ago", source: "Articles" },
];

export default function SavedResearch() {
  return (
    <div className="space-y-3">
      {savedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Bookmark size={40} className="text-colordark/15 mb-3" strokeWidth={1.5} />
          <p className="text-[0.9375rem] font-medium text-colordark/50 mb-1">No saved research</p>
          <p className="text-[0.8125rem] text-colordark/35">Bookmark cases, statutes, or articles to access them here</p>
        </div>
      ) : (
        savedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white border border-colordark/[0.06] hover:bg-colordark/[0.015] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 group-hover:from-blue-from/15 group-hover:to-blue-to/15 flex items-center justify-center shrink-0 transition-all">
                <Bookmark size={16} strokeWidth={1.8} className="text-blue-from/70 group-hover:text-blue-from transition-colors" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[0.875rem] font-semibold text-colordark tracking-[-0.01em] truncate">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[0.75rem] px-2 py-0.5 rounded-full border border-colordark/[0.06] text-colordark/60 font-medium">{item.type}</span>
                  <span className="text-[0.75rem] text-colordark/40">{item.source}</span>
                  <span className="text-colordark/25">·</span>
                  <span className="text-[0.75rem] text-colordark/35 flex items-center gap-1">
                    <Clock size={10} strokeWidth={2} />
                    {item.savedAt}
                  </span>
                </div>
              </div>
            </div>
            <ExternalLink size={15} strokeWidth={2} className="text-colordark/20 group-hover:text-blue-from transition-colors shrink-0" />
          </div>
        ))
      )}
    </div>
  );
}
