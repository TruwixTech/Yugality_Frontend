"use client";

import { MapPin, Clock, ArrowRight, Scale } from "lucide-react";

export default function UpcomingHearings({ hearings }) {
  const displayHearings = hearings?.length > 0 ? hearings.map(h => ({
    title: h.title,
    case: h.description?.substring(0, 40) + "...",
    date: new Date(h.startTime).toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase(),
    time: new Date(h.startTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' }),
    location: h.location || "Courtroom A" 
  })) : [];

  return (
    <div className="rounded-2xl border border-colordark/[0.06] bg-white flex flex-col h-full shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-colordark/[0.06]">
        <div className="flex items-center gap-2">
           <Scale size={18} className="text-blue-from" />
           <h2 className="text-[1rem] font-semibold text-colordark tracking-[-0.01em]">Hearings & Appointments</h2>
        </div>
        <a href="/dashboard/calendar" className="flex items-center gap-1 text-[0.75rem] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to hover:opacity-70 transition-all">
          View Calendar <ArrowRight size={12} strokeWidth={2} className="text-blue-from" />
        </a>
      </div>

      {/* Items */}
      <div className="divide-y divide-colordark/[0.04] flex-1">
        {displayHearings.length > 0 ? displayHearings.map((hearing, i) => (
          <div key={i} className="flex items-start gap-4 px-5 py-4 cursor-pointer group hover:bg-colordark/[0.015] transition-colors">
            <div className="shrink-0 w-[44px] h-[44px] rounded-xl bg-gradient-to-br from-blue-from to-blue-to flex flex-col items-center justify-center shadow-sm shadow-blue-from/15">
              <span className="text-[0.4375rem] font-bold text-white/60 uppercase tracking-widest leading-none block mb-0.5">{hearing.date.split(" ")[0]}</span>
              <span className="text-[1rem] font-bold text-white leading-none block tracking-[-0.02em]">{hearing.date.split(" ")[1]}</span>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h3 className="text-[0.875rem] font-semibold text-colordark leading-tight mb-1 truncate">{hearing.title}</h3>
              <p className="text-[0.8125rem] font-bold text-colordark/55 mb-1.5 truncate">{hearing.case}</p>
              <div className="flex items-center gap-2.5 text-[0.75rem] text-colordark/50 font-bold">
                <span className="flex items-center gap-1"><Clock size={11} strokeWidth={2.5} />{hearing.time}</span>
                <span className="flex items-center gap-1"><MapPin size={11} strokeWidth={2.5} />{hearing.location}</span>
              </div>
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-12 px-5 text-center">
            <div className="w-12 h-12 rounded-full bg-colordark/[0.03] flex items-center justify-center mb-3">
              <Scale size={20} className="text-colordark/20" />
            </div>
            <p className="text-[0.875rem] font-semibold text-colordark/40 mb-1">No upcoming hearings</p>
            <p className="text-[0.75rem] text-colordark/25 font-bold">Your schedule is currently clear</p>
          </div>
        )}
      </div>
    </div>
  );
}
