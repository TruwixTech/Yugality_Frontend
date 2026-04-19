"use client";

import { X, CalendarPlus, Type, Calendar, Clock, MapPin, Tag } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AddEventModal({ newEvent, onChange, onAdd, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const types = [
    { value: "meeting", label: "Meeting" },
    { value: "hearing", label: "Hearing" },
    { value: "deadline", label: "Deadline" },
    { value: "task", label: "Task" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
        <div className="w-full sm:max-w-[480px] max-h-[92vh] sm:max-h-[90vh] rounded-t-2xl sm:rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
          
          {/* Drag handle for mobile */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-colordark/15" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-colordark/[0.06]">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                <CalendarPlus size={15} strokeWidth={2} className="text-blue-from sm:w-4 sm:h-4" />
              </div>
              <div>
                <h2 className="text-[0.9375rem] sm:text-[1rem] font-semibold text-colordark tracking-[-0.02em]">Add New Event</h2>
                <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/50 mt-0.5">Schedule a new calendar event</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Form - scrollable on mobile */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div>
              <label className="flex items-center gap-1.5 text-[0.75rem] sm:text-[0.8125rem] font-semibold text-colordark/60 mb-1.5 sm:mb-2">
                <Type size={12} strokeWidth={2} className="text-blue-from/50 sm:w-[13px] sm:h-[13px]" />
                Event Title <span className="text-blue-from">*</span>
              </label>
              <input
                ref={inputRef}
                type="text"
                value={newEvent.title}
                onChange={(e) => onChange({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
                className="w-full h-10 sm:h-11 px-3 sm:px-4 text-[0.8125rem] sm:text-[0.875rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[0.75rem] sm:text-[0.8125rem] font-semibold text-colordark/60 mb-1.5 sm:mb-2">
                <Calendar size={12} strokeWidth={2} className="text-blue-from/50 sm:w-[13px] sm:h-[13px]" />
                Date <span className="text-blue-from">*</span>
              </label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => onChange({ ...newEvent, date: e.target.value })}
                className="w-full h-10 sm:h-11 px-3 sm:px-4 text-[0.8125rem] sm:text-[0.875rem] text-colordark border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[0.75rem] sm:text-[0.8125rem] font-semibold text-colordark/60 mb-1.5 sm:mb-2">
                  <Clock size={12} strokeWidth={2} className="text-blue-from/50 sm:w-[13px] sm:h-[13px]" />
                  Start <span className="text-blue-from">*</span>
                </label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => onChange({ ...newEvent, time: e.target.value })}
                  className="w-full h-10 sm:h-11 px-3 sm:px-4 text-[0.8125rem] sm:text-[0.875rem] text-colordark border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[0.75rem] sm:text-[0.8125rem] font-semibold text-colordark/60 mb-1.5 sm:mb-2">
                  <Clock size={12} strokeWidth={2} className="text-blue-from/50 sm:w-[13px] sm:h-[13px]" />
                  End
                </label>
                <input
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => onChange({ ...newEvent, endTime: e.target.value })}
                  className="w-full h-10 sm:h-11 px-3 sm:px-4 text-[0.8125rem] sm:text-[0.875rem] text-colordark border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[0.75rem] sm:text-[0.8125rem] font-semibold text-colordark/60 mb-1.5 sm:mb-2">
                <Type size={12} strokeWidth={2} className="text-blue-from/50 sm:w-[13px] sm:h-[13px]" />
                Description
              </label>
              <textarea
                value={newEvent.description}
                onChange={(e) => onChange({ ...newEvent, description: e.target.value })}
                placeholder="Enter event description (optional)"
                className="w-full h-20 sm:h-24 p-3 sm:px-4 text-[0.8125rem] sm:text-[0.875rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[0.75rem] sm:text-[0.8125rem] font-semibold text-colordark/60 mb-1.5 sm:mb-2">
                <MapPin size={12} strokeWidth={2} className="text-blue-from/50 sm:w-[13px] sm:h-[13px]" />
                Location
              </label>
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => onChange({ ...newEvent, location: e.target.value })}
                placeholder="Enter location (optional)"
                className="w-full h-10 sm:h-11 px-3 sm:px-4 text-[0.8125rem] sm:text-[0.875rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[0.75rem] sm:text-[0.8125rem] font-semibold text-colordark/60 mb-1.5 sm:mb-2">
                <Tag size={12} strokeWidth={2} className="text-blue-from/50 sm:w-[13px] sm:h-[13px]" />
                Event Type
              </label>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {types.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => onChange({ ...newEvent, type: t.value })}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[0.75rem] sm:text-[0.8125rem] font-semibold border transition-all cursor-pointer ${
                      newEvent.type === t.value
                        ? "bg-gradient-to-r from-blue-from to-blue-to text-white border-transparent shadow-sm shadow-blue-from/20"
                        : "text-colordark/55 border-colordark/[0.08] hover:border-colordark/15 hover:text-colordark/70"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions - sticky at bottom */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 px-4 sm:px-6 py-4 sm:py-5 border-t border-colordark/[0.06] bg-colorlight">
            <button onClick={onClose} className="h-10 px-4 sm:px-5 rounded-xl text-[0.8125rem] sm:text-[0.875rem] font-medium text-colordark/55 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">Cancel</button>
            <button onClick={onAdd} disabled={!newEvent.title || !newEvent.date || !newEvent.time}
              className="h-10 px-5 sm:px-6 rounded-xl text-[0.8125rem] sm:text-[0.875rem] font-semibold bg-gradient-to-r from-blue-from to-blue-to text-white hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm">
              Add Event
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
