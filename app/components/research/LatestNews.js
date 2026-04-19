"use client";

import { Newspaper, Clock, ExternalLink } from "lucide-react";

const newsItems = [
  { id: 1, title: "Supreme Court Issues Landmark Ruling on Digital Privacy", source: "Legal Wire", date: "28 Mar 2026", category: "Constitutional Law" },
  { id: 2, title: "RBI Introduces New Guidelines for FinTech Lending Platforms", source: "Business Law Journal", date: "27 Mar 2026", category: "Banking & Finance" },
  { id: 3, title: "NCLT Approves Major Corporate Restructuring Under IBC", source: "Corporate Watch", date: "26 Mar 2026", category: "Corporate Law" },
  { id: 4, title: "New Arbitration Rules Published by SIAC for 2026", source: "ADR Times", date: "25 Mar 2026", category: "Arbitration" },
  { id: 5, title: "SEBI Tightens Disclosure Norms for Listed Entities", source: "Market Regulator", date: "24 Mar 2026", category: "Securities Law" },
];

export default function LatestNews() {
  return (
    <div className="space-y-3">
      {newsItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white border border-colordark/[0.06] hover:bg-colordark/[0.015] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 group-hover:from-blue-from/15 group-hover:to-blue-to/15 flex items-center justify-center shrink-0 transition-all">
              <Newspaper size={16} strokeWidth={1.8} className="text-blue-from/70 group-hover:text-blue-from transition-colors" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[0.875rem] font-semibold text-colordark tracking-[-0.01em] truncate">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[0.75rem] px-2 py-0.5 rounded-full border border-colordark/[0.06] text-colordark/60 font-medium">{item.category}</span>
                <span className="text-[0.75rem] text-colordark/40">{item.source}</span>
                <span className="text-colordark/25">·</span>
                <span className="text-[0.75rem] text-colordark/35 flex items-center gap-1">
                  <Clock size={10} strokeWidth={2} />
                  {item.date}
                </span>
              </div>
            </div>
          </div>
          <ExternalLink size={15} strokeWidth={2} className="text-colordark/20 group-hover:text-blue-from transition-colors shrink-0" />
        </div>
      ))}
    </div>
  );
}
