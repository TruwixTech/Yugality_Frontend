"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, X, Clock, MapPin, CalendarDays } from "lucide-react";

const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function MiniCalendar({ events: externalEvents }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [groupedEvents, setGroupedEvents] = useState({});

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    if (externalEvents?.length > 0) {
      const grouped = {};
      externalEvents.forEach(event => {
        const d = new Date(event.startTime);
        // Only include events for the currently viewed month/year
        if (d.getMonth() === month && d.getFullYear() === year) {
          const day = d.getDate();
          if (!grouped[day]) grouped[day] = [];
          grouped[day].push({
            id: event._id,
            title: event.title,
            time: new Date(event.startTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' }),
            location: event.location || "Office",
            type: event.EventType || "meeting"
          });
        }
      });
      setGroupedEvents(grouped);
    } else {
      setGroupedEvents({});
    }
  }, [externalEvents, month, year]);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const setMonth = (mIndex) => {
    setCurrentDate(new Date(year, mIndex, 1));
    setShowMonthDropdown(false);
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

  const gridCells = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    gridCells.push({ type: "prev", day: daysInPrevMonth - i });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    gridCells.push({ type: "current", day: i });
  }
  const remainingCells = 42 - gridCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    gridCells.push({ type: "next", day: i });
  }

  const handleDateClick = (day) => {
    if (groupedEvents[day]) {
      setSelectedDate(day);
      setShowEventsModal(true);
    }
  };

  return (
    <>
      <div className="p-5 rounded-2xl border border-colordark/[0.06] bg-white relative flex flex-col shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <button 
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-colordark tracking-[-0.02em] hover:text-colordark/70 transition-colors cursor-pointer"
            >
              {months[month]} {year}
              <ChevronDown size={14} strokeWidth={2.5} className={`text-colordark/25 transition-transform ${showMonthDropdown ? "rotate-180" : ""}`} />
            </button>
            
            {showMonthDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMonthDropdown(false)} />
                <div className="absolute top-full left-0 mt-2 w-[180px] bg-white border border-colordark/8 rounded-xl shadow-[0_20px_60px_-10px_rgba(15,15,12,0.12)] z-20 p-1.5 grid grid-cols-3 gap-0.5">
                  {months.map((m, idx) => (
                    <button
                      key={m}
                      onClick={() => setMonth(idx)}
                      className={`text-center px-1 py-2 rounded-lg text-[0.6875rem] font-semibold transition-colors cursor-pointer ${
                        month === idx 
                          ? "bg-colordark text-white" 
                          : "text-colordark/40 hover:bg-colordark/[0.04] hover:text-colordark"
                      }`}
                    >
                      {m.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={handlePrevMonth} className="w-7 h-7 flex items-center justify-center text-colordark/20 hover:text-colordark/50 hover:bg-colordark/[0.04] rounded-lg transition-all cursor-pointer">
              <ChevronLeft size={15} strokeWidth={2.5} />
            </button>
            <button onClick={handleNextMonth} className="w-7 h-7 flex items-center justify-center text-colordark/20 hover:text-colordark/50 hover:bg-colordark/[0.04] rounded-lg transition-all cursor-pointer">
              <ChevronRight size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-1.5">
          {dayLabels.map((d, i) => (
            <div key={i} className="text-center text-[0.5625rem] font-bold text-colordark/20 py-1 uppercase tracking-[0.14em]">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-0.5">
          {gridCells.map((cell, idx) => {
            const isToday = isCurrentMonth && cell.type === "current" && cell.day === today.getDate();
            const hasEvents = cell.type === "current" && groupedEvents[cell.day];
            
            return (
              <div key={idx}
                onClick={() => cell.type === "current" && handleDateClick(cell.day)}
                className={`aspect-square flex flex-col items-center justify-center text-[0.8125rem] rounded-lg transition-all ${
                  cell.type !== "current"
                    ? "text-colordark/8 pointer-events-none"
                    : isToday
                    ? "bg-colordark text-white font-semibold cursor-pointer"
                    : "text-colordark/50 hover:bg-colordark/[0.04] hover:text-colordark cursor-pointer"
                }`}
              >
                <span>{cell.day}</span>
                {hasEvents && !isToday && (
                  <div className="w-1 h-1 rounded-full bg-blue-from mt-0.5" />
                )}
                {hasEvents && isToday && (
                  <div className="w-1 h-1 rounded-full bg-white mt-0.5" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showEventsModal && (
        <>
          <div className="fixed inset-0 bg-colordark/40 backdrop-blur-sm z-50 animate-in fade-in" onClick={() => setShowEventsModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-in zoom-in slide-in-from-bottom-10 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-colordark/8 bg-colorlight/30">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-blue-from" />
                <h3 className="text-[1rem] font-semibold text-colordark">
                  {months[month]} {selectedDate}, {year}
                </h3>
              </div>
              <button onClick={() => setShowEventsModal(false)} className="p-2 text-colordark/40 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all">
                <X size={18} strokeWidth={2} />
              </button>
            </div>
            
            <div className="p-6 max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {(groupedEvents[selectedDate] || []).map((event) => (
                  <div key={event.id} className="p-4 rounded-xl border border-colordark/[0.06] hover:border-blue-from/20 transition-all bg-white shadow-sm">
                    <h4 className="text-[0.875rem] font-semibold text-colordark mb-2 uppercase tracking-wide">{event.title}</h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[0.8125rem] text-colordark/50 font-medium">
                        <Clock size={14} strokeWidth={2} className="text-blue-from/60" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-[0.8125rem] text-colordark/50 font-medium">
                        <MapPin size={14} strokeWidth={2} className="text-blue-from/60" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
