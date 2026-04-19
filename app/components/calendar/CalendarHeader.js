"use client";

import { Plus, ChevronLeft, ChevronRight, ChevronDown, CalendarDays } from "lucide-react";
import { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarHeader({ view, currentDate, onViewChange, onPrev, onNext, onToday, onDateSelect, onCreateEvent, headerText }) {
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const handleMonthSelect = (mIndex) => {
    const newDate = new Date(currentDate.getFullYear(), mIndex, 1);
    onDateSelect(newDate);
    setShowMonthDropdown(false);
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:items-center sm:flex-wrap sm:justify-end shrink-0 w-full sm:w-auto">

      {/* Mobile date subtitle */}
      <p className="text-[0.75rem] text-colordark/50 font-medium sm:hidden">{headerText}</p>

      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {/* Month Dropdown Selector */}
        <div className="relative">
          <button
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 h-9 sm:h-10 text-[0.8125rem] sm:text-[0.875rem] font-medium text-colordark border border-colordark/[0.06] hover:border-blue-from/30 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] rounded-xl transition-all cursor-pointer"
          >
            <CalendarDays size={15} strokeWidth={2} className="text-blue-from/60 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline sm:inline">{months[currentDate.getMonth()]}</span>
            <span className="xs:hidden sm:hidden">{months[currentDate.getMonth()].slice(0, 3)}</span>
            <ChevronDown size={13} strokeWidth={2} className={`text-colordark/40 transition-transform ${showMonthDropdown ? "rotate-180" : ""}`} />
          </button>
          {showMonthDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMonthDropdown(false)} />
              <div className="absolute left-0 sm:left-auto sm:right-0 lg:right-0 lg:left-auto top-[3rem] sm:top-[3.25rem] w-56 sm:w-64 bg-colorlight border border-colordark/[0.06] rounded-2xl shadow-[0_20px_60px_-10px_rgba(15,15,12,0.15)] z-50 p-1.5 sm:p-2 grid grid-cols-2 gap-1">
                {months.map((m, idx) => (
                  <button
                    key={m}
                    onClick={() => handleMonthSelect(idx)}
                    className={`text-left px-2.5 sm:px-3 py-2 rounded-xl text-[0.75rem] sm:text-[0.8125rem] font-medium transition-colors cursor-pointer ${
                      currentDate.getMonth() === idx 
                        ? "bg-gradient-to-r from-blue-from to-blue-to text-white shadow-sm shadow-blue-from/20" 
                        : "text-colordark hover:bg-colordark/[0.04]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button onClick={onToday} className="px-3 sm:px-4 h-9 sm:h-10 text-[0.8125rem] sm:text-[0.875rem] font-medium text-colordark border border-colordark/[0.06] hover:border-blue-from/30 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] rounded-xl transition-all cursor-pointer">
          Today
        </button>

        <div className="flex items-center border border-colordark/[0.06] rounded-xl p-0.5">
          <button onClick={onPrev} className="p-1.5 sm:p-2 hover:bg-colordark/[0.04] rounded-lg transition-all cursor-pointer">
            <ChevronLeft size={15} strokeWidth={2} className="text-colordark/50 sm:w-4 sm:h-4" />
          </button>
          <button onClick={onNext} className="p-1.5 sm:p-2 hover:bg-colordark/[0.04] rounded-lg transition-all cursor-pointer">
            <ChevronRight size={15} strokeWidth={2} className="text-colordark/50 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowViewDropdown(!showViewDropdown)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 h-9 sm:h-10 text-[0.8125rem] sm:text-[0.875rem] font-medium text-colordark border border-colordark/[0.06] hover:border-blue-from/30 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] rounded-xl transition-all cursor-pointer"
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
            <ChevronDown size={13} strokeWidth={2} className={`text-colordark/40 transition-transform ${showViewDropdown ? "rotate-180" : ""}`} />
          </button>
          {showViewDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowViewDropdown(false)} />
              <div className="absolute right-0 top-[3rem] sm:top-[3.25rem] w-32 bg-colorlight border border-colordark/[0.06] rounded-2xl shadow-[0_20px_60px_-10px_rgba(15,15,12,0.15)] z-50 overflow-hidden py-1">
                {["day", "week", "month"].map((v) => (
                  <button
                    key={v}
                    onClick={() => { onViewChange(v); setShowViewDropdown(false); }}
                    className={`w-full px-4 py-2.5 text-left text-[0.875rem] transition-colors cursor-pointer ${
                      view === v 
                        ? "font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to" 
                        : "font-medium text-colordark/70 hover:bg-colordark/[0.02]"
                    }`}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button onClick={onCreateEvent} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 h-9 sm:h-10 text-[0.8125rem] sm:text-[0.875rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] shadow-sm rounded-xl transition-all cursor-pointer">
          <Plus size={15} strokeWidth={2} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Create</span>
        </button>
      </div>

    </div>
  );
}
