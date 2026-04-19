"use client";

import { Clock, MapPin, X } from "lucide-react";
import { getEventStyles, timeSlots } from "./calendarUtils";
import { useState, useEffect } from "react";

export default function DayView({ currentDate, dayEvents, onEventClick, onDeleteEvent }) {
  const [rowHeight, setRowHeight] = useState(64);

  useEffect(() => {
    const updateHeight = () => {
      setRowHeight(window.innerWidth < 640 ? 48 : window.innerWidth < 768 ? 56 : 64);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="h-full flex flex-col border border-colordark/[0.06] rounded-2xl overflow-hidden">
      <div className="border-b border-colordark/[0.06] px-3 sm:px-4 py-2 sm:py-3 bg-colordark/[0.01]">
        <div className="flex items-center justify-between">
          <div className="text-[0.5625rem] sm:text-[0.625rem] md:text-[0.6875rem] text-colordark/40 font-bold uppercase tracking-[0.1em]">Schedule Summary</div>
          {dayEvents.length > 0 && (
            <div className="text-[0.5625rem] sm:text-[0.625rem] md:text-[0.6875rem] text-blue-from font-bold uppercase tracking-[0.1em]">
              {dayEvents.length} Event{dayEvents.length > 1 ? "s" : ""} Today
            </div>
          )}
        </div>
      </div>
      {dayEvents.filter(e => e.time === e.endTime).length > 0 && (
        <div className="border-b border-colordark/[0.06] px-3 sm:px-4 py-2 sm:py-3">
          <div className="text-[0.5625rem] sm:text-[0.625rem] md:text-[0.6875rem] text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to font-bold uppercase tracking-[0.1em] mb-2">All Day</div>
          <div className="space-y-1.5">
            {dayEvents.filter(e => e.time === e.endTime).map((event) => {
              const s = getEventStyles(event.type);
              return (
                <div key={event.id}
                  className={`rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-[0.75rem] sm:text-[0.8125rem] font-semibold cursor-pointer transition-all flex items-center gap-2 sm:gap-2.5 ${s.bg} ${s.text} ${s.hoverBg}`}
                  onClick={() => onEventClick(event)}>
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${s.dot}`} />
                  <span className="truncate">{event.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto overflow-x-auto" ref={(el) => { if (el) el.scrollTop = 0; }}>
        <div className="grid grid-cols-[48px_1fr] sm:grid-cols-[60px_1fr] md:grid-cols-[70px_1fr] min-w-0">
          <div className="border-r border-colordark/[0.06]">
            {timeSlots.map((time, i) => (
              <div key={i} className="border-b border-colordark/[0.06] pr-1.5 sm:pr-2 md:pr-3 text-right text-[0.5rem] sm:text-[0.625rem] md:text-[0.6875rem] text-colordark/50 font-medium pt-1"
                style={{ height: `${rowHeight}px` }}>{time}</div>
            ))}
          </div>
          <div className="relative">
            {timeSlots.map((_, i) => <div key={i} className="border-b border-colordark/[0.06]" style={{ height: `${rowHeight}px` }} />)}
            {new Date().toDateString() === currentDate.toDateString() && (
              <div className="absolute left-0 right-0 h-0.5 bg-blue-from z-20 pointer-events-none"
                style={{ top: `${(new Date().getHours() + new Date().getMinutes() / 60) * rowHeight}px` }}>
                <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-blue-from border-2 border-colorlight" />
              </div>
            )}
            {dayEvents.filter(e => e.time !== e.endTime).map((event) => {
              const sh = parseInt(event.time.split(":")[0]), sm = parseInt(event.time.split(":")[1] || 0);
              const eh = parseInt(event.endTime.split(":")[0]), em = parseInt(event.endTime.split(":")[1] || 0);
              const top = (sh + sm / 60) * rowHeight;
              const height = Math.max(((eh + em / 60) - (sh + sm / 60)) * rowHeight, rowHeight);
              const s = getEventStyles(event.type);
              return (
                <div key={event.id}
                  className={`absolute left-1.5 sm:left-2 md:left-3 right-1.5 sm:right-2 md:right-3 rounded-lg sm:rounded-xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 cursor-pointer transition-all duration-200 z-10 overflow-hidden group border ${s.bg} ${s.border} ${s.hoverBg}`}
                  style={{ top: `${top}px`, height: `${height}px` }}
                  onClick={() => onEventClick(event)}>
                  <div className="flex items-start justify-between gap-1 sm:gap-2 h-full">
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className={`font-semibold text-[0.6875rem] sm:text-[0.8125rem] md:text-[0.875rem] truncate leading-tight ${s.text}`}>{event.title}</div>
                      <div className={`text-[0.5625rem] sm:text-[0.6875rem] md:text-[0.75rem] flex items-center gap-1 mt-0.5 sm:mt-1 opacity-70 ${s.text}`}>
                        <Clock size={10} strokeWidth={2} className="shrink-0 sm:w-[11px] sm:h-[11px]" />
                        <span>{event.time} – {event.endTime}</span>
                      </div>
                      {event.location && height > 70 && (
                        <div className={`text-[0.5625rem] sm:text-[0.6875rem] md:text-[0.75rem] flex items-center gap-1 mt-0.5 truncate opacity-60 ${s.text}`}>
                          <MapPin size={10} strokeWidth={2} className="shrink-0 sm:w-[11px] sm:h-[11px]" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 sm:p-1 text-colordark/30 hover:text-red-500 hover:bg-white/60 rounded-lg transition-all cursor-pointer">
                      <X size={11} strokeWidth={2.5} className="sm:w-3 sm:h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
