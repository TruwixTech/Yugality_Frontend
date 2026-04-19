"use client";

import { X, Clock, MapPin, Plus, Calendar, ChevronRight } from "lucide-react";
import { getEventStyles } from "./calendarUtils";

const typeLabels = {
  hearing: "Hearing",
  deadline: "Deadline",
  meeting: "Meeting",
  task: "Task",
};

export default function DayEventsPanel({ date, events, isClosing, onClose, onEventClick, onDeleteEvent, onAddEvent }) {
  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-[420px] bg-colorlight border-l border-colordark/[0.06] shadow-[0_0_60px_-10px_rgba(15,15,12,0.2)] z-50 flex flex-col ${isClosing ? "animate-slide-out" : "animate-slide-in"}`}>

        {/* Header */}
        <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5 border-b border-colordark/[0.06]">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-[1.125rem] sm:text-[1.25rem] font-bold text-colordark tracking-[-0.02em]">
                {date.toLocaleDateString("en-US", { weekday: "long" })}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[0.8125rem] sm:text-[0.875rem] text-colordark/55 font-medium">
                  {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                {events.length > 0 && (
                  <span className="text-[0.625rem] sm:text-[0.6875rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to">
                    {events.length} event{events.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-blue-from/50" strokeWidth={1.5} />
              </div>
              <p className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-colordark/50">No events scheduled</p>
              <p className="text-[0.75rem] sm:text-[0.8125rem] text-colordark/35 mt-1">Tap &quot;Add Event&quot; to create one</p>
            </div>
          ) : (
            <div className="space-y-2.5 sm:space-y-3">
              {events.map((event) => {
                const s = getEventStyles(event.type);
                const label = typeLabels[event.type] || event.type;
                return (
                  <div key={event.id}
                    className="rounded-xl sm:rounded-2xl border border-colordark/[0.06] hover:border-colordark/[0.1] transition-all cursor-pointer group overflow-hidden"
                    onClick={() => onEventClick(event)}
                  >
                    {/* Colored top strip */}
                    <div className={`h-1 ${s.bg}`} style={{ opacity: 1 }}>
                      <div className={`h-full ${s.dot}`} />
                    </div>

                    <div className="px-3 sm:px-4 py-3 sm:py-3.5">
                      <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                        <span className={`text-[0.625rem] sm:text-[0.6875rem] font-bold uppercase tracking-[0.06em] px-1.5 sm:px-2 py-0.5 rounded-md ${s.bg} ${s.text}`}>
                          {label}
                        </span>
                        <div className="flex items-center gap-1">
                          <button onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}
                            className="p-1 text-colordark/20 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer sm:opacity-0 sm:group-hover:opacity-100">
                            <X size={13} strokeWidth={2} />
                          </button>
                          <ChevronRight size={14} strokeWidth={2} className="text-colordark/20 group-hover:text-blue-from transition-colors" />
                        </div>
                      </div>

                      <h3 className="text-[0.8125rem] sm:text-[0.9375rem] font-semibold text-colordark mb-2 sm:mb-2.5 leading-snug">{event.title}</h3>

                      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                        <div className="flex items-center gap-1 sm:gap-1.5 text-[0.6875rem] sm:text-[0.75rem] text-colordark/50">
                          <Clock size={11} strokeWidth={2} className="text-colordark/35 sm:w-3 sm:h-3" />
                          <span className="font-medium">{event.time}{event.endTime && ` – ${event.endTime}`}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1 sm:gap-1.5 text-[0.6875rem] sm:text-[0.75rem] text-colordark/50 min-w-0">
                            <MapPin size={11} strokeWidth={2} className="text-colordark/35 shrink-0 sm:w-3 sm:h-3" />
                            <span className="font-medium truncate">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-colordark/[0.06]">
          <button onClick={onAddEvent}
            className="w-full flex items-center justify-center gap-2 h-10 sm:h-11 text-[0.8125rem] sm:text-[0.875rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] shadow-sm rounded-xl transition-all cursor-pointer">
            <Plus size={15} strokeWidth={2} className="sm:w-4 sm:h-4" />
            Add Event
          </button>
        </div>
      </div>
    </>
  );
}
