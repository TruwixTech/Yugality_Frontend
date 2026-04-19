"use client";

import { BookOpen, ExternalLink } from "lucide-react";

export default function ResearchResultCard({ result }) {
  return (
    <div className="px-6 py-5 rounded-2xl bg-white border border-colordark/[0.06] hover:bg-colordark/[0.015] transition-all cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 text-blue-from/70" strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-[0.9375rem] font-semibold text-colordark tracking-[-0.01em] leading-snug">
              {result.title}
            </h3>
            <ExternalLink className="w-4 h-4 text-colordark/20 shrink-0 group-hover:text-blue-from transition-colors mt-0.5" strokeWidth={2} />
          </div>
          <p className="text-[0.8125rem] text-colordark/50 leading-relaxed mb-4">
            {result.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[0.75rem] px-2.5 py-1 rounded-full border border-colordark/[0.06] text-colordark/60 font-medium">{result.court}</span>
            <span className="text-[0.75rem] px-2.5 py-1 rounded-full border border-colordark/[0.06] text-colordark/60 font-medium">{result.year}</span>
            <span className="text-[0.75rem] px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-from/10 to-blue-to/10 text-blue-from font-semibold">Cited {result.citations}×</span>
          </div>
        </div>
      </div>
    </div>
  );
}
