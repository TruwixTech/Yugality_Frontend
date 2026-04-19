"use client";

import { getEventStyles } from "./calendarUtils";

const dayNamesFull = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayNamesShort = ["S", "M", "T", "W", "T", "F", "S"];

export default function MonthView({ currentDate, getEventsForDate, onDayClick }) {
  const year = currentDate.getFullYear(), month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="h-full flex flex-col border border-colordark/[0.06] rounded-2xl overflow-hidden">
      <div className="grid grid-cols-7 border-b border-colordark/[0.06]">
        {dayNamesFull.map((d, i) => (
          <div key={d + i} className="text-center text-[0.625rem] sm:text-[0.75rem] font-semibold text-colordark/50 uppercase tracking-wider py-2 sm:py-3 border-r border-colordark/[0.06] last:border-r-0">
            <span className="hidden sm:inline">{d}</span>
            <span className="sm:hidden">{dayNamesShort[i]}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-7 overflow-y-auto">
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`e-${i}`} className="border-r border-b border-colordark/[0.06] last:border-r-0" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const dayEvents = getEventsForDate(date);
          const isToday = new Date().toDateString() === date.toDateString();
          const hasEvents = dayEvents.length > 0;
          return (
            <div key={day}
              className="border-r border-b border-colordark/[0.06] p-1 sm:p-1.5 min-h-[60px] sm:min-h-[100px] md:min-h-[120px] hover:bg-colordark/[0.015] transition-all cursor-pointer last:border-r-0"
              onClick={() => onDayClick(date)}>
              <div className="flex items-center justify-between mb-0.5 sm:mb-1.5 px-0 sm:px-0.5">
                <div className={`text-[0.6875rem] sm:text-[0.875rem] font-semibold ${isToday ? "w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-br from-blue-from to-blue-to text-white shadow-sm shadow-blue-from/20 flex items-center justify-center text-[0.625rem] sm:text-[0.875rem]" : hasEvents ? "text-colordark" : "text-colordark/60"}`}>{day}</div>
                {/* Event dot indicators on mobile */}
                {hasEvents && (
                  <div className="flex gap-0.5 sm:hidden">
                    {dayEvents.slice(0, 3).map((event) => {
                      const s = getEventStyles(event.type);
                      return <span key={event.id} className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />;
                    })}
                  </div>
                )}
              </div>
              {/* Full event list on desktop/tablet */}
              <div className="space-y-0.5 sm:space-y-1 hidden sm:block">
                {dayEvents.slice(0, 3).map((event) => {
                  const s = getEventStyles(event.type);
                  return (
                    <div key={event.id}
                      className={`text-[0.5625rem] sm:text-[0.6875rem] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-semibold truncate ${s.bg} ${s.text} ${s.hoverBg} transition-colors`}
                    >
                      <span className="opacity-70 mr-0.5 sm:mr-1">{event.time}</span>
                      <span className="hidden md:inline">{event.title}</span>
                    </div>
                  );
                })}
                {dayEvents.length > 3 && (
                  <div className="text-[0.5rem] sm:text-[0.625rem] text-blue-from font-semibold px-1.5 sm:px-2 py-0.5 hover:bg-blue-from/[0.06] rounded-md transition-all">+{dayEvents.length - 3} more</div>
                )}
              </div>
              {/* Mobile condensed indicator */}
              {hasEvents && (
                <div className="sm:hidden text-[0.5rem] text-colordark/40 font-semibold text-center mt-0.5">
                  {dayEvents.length}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
