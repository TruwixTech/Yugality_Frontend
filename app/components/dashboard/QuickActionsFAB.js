"use client";

import { useState } from "react";
import { Plus, X, FileEdit, CalendarPlus, Upload, Briefcase, MessageSquare } from "lucide-react";

const quickActions = [
  { icon: FileEdit, label: "Add Note", description: "Quick note or annotation", href: "/dashboard/notepad" },
  { icon: CalendarPlus, label: "Create Event", description: "Schedule a hearing", href: "/dashboard/calendar" },
  { icon: Upload, label: "Upload Document", description: "Add files to briefcase", href: "/dashboard/briefcase" },
  { icon: Briefcase, label: "New Case", description: "Start a new case", href: "/dashboard/briefcase" },
  { icon: MessageSquare, label: "Ask AI", description: "Get legal assistance", href: "/dashboard/ai-assistant" },
];

export default function QuickActionsFAB() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-colordark/15 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Action Menu */}
      <div
        className={`absolute bottom-[4.5rem] right-0 w-[280px] p-2 rounded-2xl bg-colorlight border border-colordark/8 shadow-[0_20px_60px_-10px_rgba(15,15,12,0.2)] flex flex-col gap-0.5 origin-bottom-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-3 pointer-events-none"
        }`}
      >
        <p className="text-[0.5625rem] font-bold text-colordark/25 uppercase tracking-[0.15em] px-3 pt-2 pb-1">Quick Actions</p>
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <a
              key={i}
              href={action.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-colorwhite transition-all group"
              style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-from/10 group-hover:bg-blue-from/15 flex items-center justify-center shrink-0 transition-colors">
                <Icon className="w-4 h-4 text-blue-from group-hover:text-blue-from" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[0.8125rem] font-semibold text-colordark leading-tight">{action.label}</h3>
                <p className="text-[0.6875rem] text-colordark/35 truncate leading-tight">{action.description}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative w-14 h-14 rounded-2xl text-white shadow-lg shadow-blue-from/20 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95 z-20 bg-gradient-to-br from-blue-from to-blue-to ${
          open ? "shadow-2xl shadow-blue-from/30" : ""
        }`}
      >
        <Plus
          className={`w-5 h-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "rotate-45" : "rotate-0"
          }`}
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
}
