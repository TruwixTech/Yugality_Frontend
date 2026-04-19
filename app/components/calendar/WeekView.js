"use client";

import { Clock, MapPin, ChevronRight } from "lucide-react";
import { getEventStyles, timeSlots } from "./calendarUtils";

const dayNamesFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ─── Mobile: Vertical agenda list ────────────────────────────── */
function MobileWeekView({ weekDays, getEventsForDate, onEventClick }) {
  return (
    <div className="h-full overflow-y-auto space-y-2 pb-4">
      {weekDays.map((day, i) => {
        const isToday = new Date().toDateString() === day.toDateString();
        const dayEvents = getEventsForDate(day);
        return (
          <div key={i} className={`rounded-xl border transition-all ${isToday ? "border-blue-from/20 bg-gradient-to-r from-blue-from/[0.03] to-blue-to/[0.03]" : "border-colordark/[0.06]"}`}>
            {/* Day header */}
            <div className={`flex items-center gap-3 px-3.5 py-2.5 border-b ${isToday ? "border-blue-from/10" : "border-colordark/[0.04]"}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-[1rem] ${
                isToday
                  ? "bg-gradient-to-br from-blue-from to-blue-to text-white shadow-sm shadow-blue-from/20"
                  : "bg-colordark/[0.04] text-colordark/70"
              }`}>
                {day.getDate()}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[0.8125rem] font-semibold leading-tight ${isToday ? "text-blue-from" : "text-colordark"}`}>
                  {dayNamesFull[day.getDay()]}
                </div>
                <div className="text-[0.6875rem] text-colordark/45 font-medium">
                  {day.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
              {dayEvents.length > 0 && (
                <span className="text-[0.625rem] font-bold text-blue-from bg-blue-from/[0.08] px-2 py-0.5 rounded-full">
                  {dayEvents.length}
                </span>
              )}
            </div>

            {/* Events list */}
            {dayEvents.length > 0 ? (
              <div className="p-2 space-y-1.5">
                {dayEvents.map((event) => {
                  const s = getEventStyles(event.type);
                  return (
                    <div
                      key={event.id}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all group ${s.bg} ${s.hoverBg}`}
                      onClick={() => onEventClick(event)}
                    >
                      <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className={`text-[0.8125rem] font-semibold truncate leading-tight ${s.text}`}>
                          {event.title}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className={`text-[0.6875rem] flex items-center gap-1 opacity-70 ${s.text}`}>
                            <Clock size={10} strokeWidth={2} />
                            {event.time} – {event.endTime}
                          </span>
                          {event.location && (
                            <span className={`text-[0.6875rem] flex items-center gap-1 opacity-60 truncate ${s.text}`}>
                              <MapPin size={10} strokeWidth={2} />
                              <span className="truncate">{event.location}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={14} strokeWidth={2} className="text-colordark/15 group-hover:text-colordark/30 shrink-0 transition-colors" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="px-3.5 py-3 text-[0.75rem] text-colordark/30 font-medium">
                No events
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Desktop: Full time-grid ─────────────────────────────────── */
function DesktopWeekView({ weekDays, getEventsForDate, onEventClick }) {
  return (
    <div className="h-full flex flex-col border border-colordark/[0.06] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[70px_repeat(7,1fr)] border-b border-colordark/[0.06] min-w-[700px]">
          <div className="border-r border-colordark/[0.06] flex items-center justify-center">
            <span className="text-[0.625rem] font-semibold text-colordark/40 uppercase tracking-wider">GMT</span>
          </div>
          {weekDays.map((day, i) => {
            const isToday = new Date().toDateString() === day.toDateString();
            const count = getEventsForDate(day).length;
            return (
              <div key={i} className="text-center py-3 border-r border-colordark/[0.06] last:border-r-0">
                <div className="text-[0.6875rem] font-semibold text-colordark/50 uppercase tracking-wider mb-1">{dayNamesShort[day.getDay()]}</div>
                <div className={`inline-flex items-center justify-center ${isToday ? "w-10 h-10 rounded-xl shadow-sm shadow-blue-from/20 bg-gradient-to-br from-blue-from to-blue-to text-white font-semibold text-[1.5rem]" : "text-[1.5rem] font-medium text-colordark"}`}>
                  {day.getDate()}
                </div>
                {count > 0 && <div className="text-[0.625rem] text-blue-from font-semibold mt-0.5">{count} event{count > 1 ? "s" : ""}</div>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-auto" ref={(el) => { if (el) el.scrollTop = 0; }}>
        <div className="grid grid-cols-[70px_repeat(7,1fr)] min-w-[700px]">
          <div className="border-r border-colordark/[0.06]">
            {timeSlots.map((time, i) => (
              <div key={i} className="h-16 border-b border-colordark/[0.06] pr-3 text-right text-[0.6875rem] text-colordark/50 font-medium pt-1">{time}</div>
            ))}
          </div>
          {weekDays.map((day, di) => {
            const dayEvents = getEventsForDate(day);
            const isToday = new Date().toDateString() === day.toDateString();
            return (
              <div key={di} className={`border-r border-colordark/[0.06] last:border-r-0 relative ${isToday ? "bg-blue-from/[0.02]" : ""}`}>
                {timeSlots.map((_, i) => <div key={i} className="h-16 border-b border-colordark/[0.06]" />)}
                {isToday && (
                  <div className="absolute left-0 right-0 h-0.5 bg-blue-from z-20 pointer-events-none"
                    style={{ top: `${(new Date().getHours() + new Date().getMinutes() / 60) * 64}px` }}>
                    <div className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full bg-blue-from border-2 border-colorlight" />
                  </div>
                )}
                {dayEvents.map((event) => {
                  const sh = parseInt(event.time.split(":")[0]), sm = parseInt(event.time.split(":")[1] || 0);
                  const eh = parseInt(event.endTime.split(":")[0]), em = parseInt(event.endTime.split(":")[1] || 0);
                  const top = (sh + sm / 60) * 64;
                  const height = Math.max(((eh + em / 60) - (sh + sm / 60)) * 64, 48);
                  const s = getEventStyles(event.type);
                  return (
                    <div key={event.id}
                      className={`absolute left-1 right-1 rounded-lg px-2 py-1.5 cursor-pointer transition-all duration-200 z-10 overflow-hidden border ${s.bg} ${s.border} ${s.hoverBg}`}
                      style={{ top: `${top}px`, height: `${height}px` }}
                      title={`${event.title}\n${event.time} - ${event.endTime}`}
                      onClick={() => onEventClick(event)}>
                      <div className={`font-semibold truncate text-[0.6875rem] leading-tight ${s.text}`}>{event.title}</div>
                      {height > 40 && (
                        <div className={`text-[0.5625rem] truncate mt-0.5 flex items-center gap-1 opacity-70 ${s.text}`}>
                          <Clock size={9} strokeWidth={2} />{event.time}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Main export: switches layout based on screen ────────────── */
export default function WeekView({ weekDays, getEventsForDate, onEventClick }) {
  return (
    <>
      {/* Mobile agenda view */}
      <div className="h-full sm:hidden">
        <MobileWeekView weekDays={weekDays} getEventsForDate={getEventsForDate} onEventClick={onEventClick} />
      </div>
      {/* Desktop time-grid view */}
      <div className="h-full hidden sm:flex sm:flex-col">
        <DesktopWeekView weekDays={weekDays} getEventsForDate={getEventsForDate} onEventClick={onEventClick} />
      </div>
    </>
  );
}
