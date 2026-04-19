"use client";

import { useState, useEffect, useRef } from "react";
import { X, AlertTriangle, Calendar, Briefcase, Type } from "lucide-react";

export default function AddDeadlineModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [caseRef, setCaseRef] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTitle(""); setCaseRef(""); setDueDate(""); setUrgency("medium");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), case: caseRef.trim(), date: dueDate, priority: urgency });
    onClose();
  };

  const urgencies = [
    { value: "high", label: "Urgent", dot: "bg-red-500" },
    { value: "medium", label: "Pending", dot: "bg-amber-400" },
    { value: "low", label: "Upcoming", dot: "bg-colordark/30" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
          
          {/* Header — matches card headers */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-colordark/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                <AlertTriangle size={16} strokeWidth={2} className="text-blue-from" />
              </div>
              <div>
                <h2 className="text-[1rem] font-semibold text-colordark tracking-[-0.02em]">Add Deadline</h2>
                <p className="text-[0.75rem] text-colordark/50 mt-0.5">Create a new critical deadline</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-colordark/60 mb-2">
                <Type size={13} strokeWidth={2} className="text-blue-from/50" />
                Deadline Title <span className="text-blue-from">*</span>
              </label>
              <input ref={inputRef} type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., File Motion to Dismiss"
                className="w-full h-11 px-4 text-[0.875rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all" />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-colordark/60 mb-2">
                <Briefcase size={13} strokeWidth={2} className="text-blue-from/50" />
                Case Reference
              </label>
              <input type="text" value={caseRef} onChange={(e) => setCaseRef(e.target.value)}
                placeholder="e.g., Case #2341"
                className="w-full h-11 px-4 text-[0.875rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all" />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-colordark/60 mb-2">
                <Calendar size={13} strokeWidth={2} className="text-blue-from/50" />
                Due Date
              </label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-11 px-4 text-[0.875rem] text-colordark border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all" />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-colordark/60 mb-2">
                <AlertTriangle size={13} strokeWidth={2} className="text-blue-from/50" />
                Urgency Level
              </label>
              <div className="flex gap-2">
                {urgencies.map((u) => (
                  <button key={u.value} type="button" onClick={() => setUrgency(u.value)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[0.8125rem] font-semibold border transition-all cursor-pointer ${
                      urgency === u.value
                        ? "bg-gradient-to-r from-blue-from to-blue-to text-white border-transparent shadow-sm shadow-blue-from/20"
                        : "text-colordark/55 border-colordark/[0.08] hover:border-colordark/15 hover:text-colordark/70"
                    }`}>
                    <span className={`w-2 h-2 rounded-full ${urgency === u.value ? "bg-white" : u.dot}`} />
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions — matches card header button style */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-colordark/[0.06] mt-6">
              <button type="button" onClick={onClose} className="h-10 px-5 rounded-xl text-[0.875rem] font-medium text-colordark/55 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">Cancel</button>
              <button type="submit" disabled={!title.trim()}
                className="h-10 px-6 rounded-xl text-[0.875rem] font-semibold bg-gradient-to-r from-blue-from to-blue-to text-white hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm">
                Add Deadline
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
