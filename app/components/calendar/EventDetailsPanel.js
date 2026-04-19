"use client";

import { X, Clock, MapPin, Calendar, Edit3, Trash2 } from "lucide-react";
import { getEventStyles } from "./calendarUtils";

const typeLabels = {
  hearing: "Hearing",
  deadline: "Deadline",
  meeting: "Meeting",
  task: "Task",
};

export default function EventDetailsPanel({ event, isClosing, onClose, onDelete }) {
  const s = getEventStyles(event.type);
  const label = typeLabels[event.type] || event.type;

  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-[420px] bg-colorlight border-l border-colordark/[0.06] shadow-[0_0_60px_-10px_rgba(15,15,12,0.2)] z-50 flex flex-col ${isClosing ? "animate-slide-out" : "animate-slide-in"}`}>

        {/* Colored Header Banner */}
        <div className={`px-4 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5 ${s.bg}`}>
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <span className={`text-[0.625rem] sm:text-[0.6875rem] font-bold uppercase tracking-[0.08em] px-2 sm:px-2.5 py-1 rounded-md ${s.text} bg-white/60`}>
              {label}
            </span>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-white/50 transition-all cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>
          <h2 className="text-[1.125rem] sm:text-[1.375rem] font-bold text-colordark tracking-[-0.02em] leading-snug">{event.title}</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="space-y-2.5 sm:space-y-3">
            {/* Date & Time */}
            <div className="flex items-start gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-colordark/[0.06] hover:bg-colordark/[0.01] transition-colors">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <Calendar size={16} strokeWidth={1.8} className={`${s.text} sm:w-[18px] sm:h-[18px]`} />
              </div>
              <div className="min-w-0">
                <p className="text-[0.625rem] sm:text-[0.6875rem] font-bold text-colordark/40 uppercase tracking-[0.08em] mb-1">Date & Time</p>
                <p className="text-[0.8125rem] sm:text-[0.9375rem] font-semibold text-colordark leading-snug">
                  {event.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
                <p className="text-[0.75rem] sm:text-[0.8125rem] text-colordark/55 mt-0.5 flex items-center gap-1.5">
                  <Clock size={11} strokeWidth={2} className="sm:w-3 sm:h-3" />
                  {event.time} – {event.endTime}
                </p>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div className="flex items-start gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-colordark/[0.06] hover:bg-colordark/[0.01] transition-colors">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <Edit3 size={16} strokeWidth={1.8} className={`${s.text} sm:w-[18px] sm:h-[18px]`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.625rem] sm:text-[0.6875rem] font-bold text-colordark/40 uppercase tracking-[0.08em] mb-1">Description</p>
                  <p className="text-[0.8125rem] sm:text-[0.875rem] text-colordark/70 leading-relaxed break-words">{event.description}</p>
                </div>
              </div>
            )}

            {/* Location */}
            {event.location && (
              <div className="flex items-start gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-colordark/[0.06] hover:bg-colordark/[0.01] transition-colors">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <MapPin size={16} strokeWidth={1.8} className={`${s.text} sm:w-[18px] sm:h-[18px]`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.625rem] sm:text-[0.6875rem] font-bold text-colordark/40 uppercase tracking-[0.08em] mb-1">Location</p>
                  <p className="text-[0.8125rem] sm:text-[0.9375rem] font-semibold text-colordark leading-snug break-words">{event.location}</p>
                </div>
              </div>
            )}

            {/* Type Info */}
            <div className="flex items-start gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-colordark/[0.06] hover:bg-colordark/[0.01] transition-colors">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <Edit3 size={16} strokeWidth={1.8} className={`${s.text} sm:w-[18px] sm:h-[18px]`} />
              </div>
              <div className="min-w-0">
                <p className="text-[0.625rem] sm:text-[0.6875rem] font-bold text-colordark/40 uppercase tracking-[0.08em] mb-1">Event Type</p>
                <p className="text-[0.8125rem] sm:text-[0.9375rem] font-semibold text-colordark leading-snug">{label}</p>
                <p className="text-[0.75rem] sm:text-[0.8125rem] text-colordark/45 mt-0.5">
                  {event.date.toLocaleDateString("en-US", { year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-colordark/[0.06] flex items-center gap-2.5 sm:gap-3">
          <button onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-2 h-10 sm:h-11 text-[0.8125rem] sm:text-[0.875rem] font-semibold text-red-500 border border-red-200 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
            <Trash2 size={14} strokeWidth={2} className="sm:w-[15px] sm:h-[15px]" />
            Delete
          </button>
          <button onClick={onClose}
            className="flex-1 h-10 sm:h-11 text-[0.8125rem] sm:text-[0.875rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] shadow-sm rounded-xl transition-all cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </>
  );
}
