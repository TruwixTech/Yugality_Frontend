"use client";

import { FileText } from "lucide-react";

export default function TimelineEvent({ event }) {
  return (
    <div className="relative pl-8 sm:pl-12">
      {/* Dot */}
      <div className="absolute left-0 top-4 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-colordark border-2 border-colorwhite shadow-sm" />

      <div className="px-4 sm:px-6 py-4 sm:py-5 rounded-2xl bg-colorwhite border border-colordark/8 shadow-sm hover:shadow-md transition-all">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2">
          <h3 className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-colordark tracking-[-0.01em]">{event.title}</h3>
          <div className="shrink-0 sm:text-right">
            <p className="text-[0.75rem] font-semibold text-colordark/70">{event.date}</p>
            <p className="text-[0.6875rem] text-colordark/40 mt-0.5">{event.time}</p>
          </div>
        </div>
        <p className="text-[0.8125rem] sm:text-[0.875rem] text-colordark/60 leading-relaxed mb-3">{event.description}</p>
        <div className="flex items-center gap-1.5 text-[0.75rem] text-colordark/40">
          <FileText size={12} strokeWidth={2} />
          <span className="truncate">{event.source}</span>
        </div>
      </div>
    </div>
  );
}
