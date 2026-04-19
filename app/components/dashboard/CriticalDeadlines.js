"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Clock, Plus, AlertCircle } from "lucide-react";
import AddDeadlineModal from "./AddDeadlineModal";

const urgencyConfig = {
  high:   { dot: "bg-red-500",     label: "Urgent",   labelClass: "text-red-600 bg-red-50" },
  medium: { dot: "bg-amber-400",   label: "Pending",  labelClass: "text-amber-600 bg-amber-50" },
  low:    { dot: "bg-colordark/20", label: "Upcoming", labelClass: "text-colordark/40 bg-colordark/[0.04]" },
};

export default function CriticalDeadlines({ data }) {
  const [deadlines, setDeadlines] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (data?.length > 0) {
      setDeadlines(data.map(d => ({
        id: d._id,
        title: d.title,
        case: d.description?.substring(0, 30) || "General",
        date: new Date(d.startTime).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        urgent: d.priority?.toLowerCase() || "medium"
      })));
    } else if (data === undefined) {
      // Keep initial dummy for visual if no props passed (standalone use)
      setDeadlines([
        { title: "File Motion to Dismiss", case: "Case #2341", date: "Due in 4h", urgent: "high" },
      ]);
    } else {
        setDeadlines([]);
    }
  }, [data]);

  const handleAdd = (task) => {
    setDeadlines((prev) => [
      ...prev,
      {
        title: task.title,
        case: task.case || "—",
        date: task.date || "No date",
        urgent: task.priority || "medium",
      },
    ]);
  };

  return (
    <>
      <div className="rounded-2xl border border-colordark/[0.06] bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-colordark/[0.06]">
          <div>
            <h2 className="text-[1rem] font-semibold text-colordark tracking-[-0.02em]">Critical Deadlines</h2>
            <p className="text-[0.75rem] font-bold text-colordark/50 mt-0.5">{deadlines.length} items need attention</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[0.8125rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-lg transition-all cursor-pointer shadow-sm"
            >
              <Plus size={14} strokeWidth={2.5} /> Add
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="divide-y divide-colordark/[0.04]">
          {deadlines.length > 0 ? deadlines.map((item, i) => {
            const urgencyKey = item.urgent === "high" || item.urgent === "medium" || item.urgent === "low" ? item.urgent : "medium";
            const cfg = urgencyConfig[urgencyKey];
            return (
              <div
                key={i}
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-colordark/[0.01] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                  <div className="min-w-0">
                    <h3 className="text-[0.875rem] font-semibold text-colordark leading-tight truncate">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[0.75rem] font-bold text-colordark/55">{item.case}</span>
                      <span className="text-colordark/25">·</span>
                      <span className="flex items-center gap-1 text-[0.75rem] font-bold text-colordark/50">
                        <Clock size={11} strokeWidth={2.5} />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
                
                <span className={`text-[0.5625rem] font-bold uppercase tracking-[0.08em] px-2.5 py-1.5 rounded-md shrink-0 ${cfg.labelClass}`}>
                  {cfg.label}
                </span>
              </div>
            );
          }) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
               <AlertCircle size={20} className="text-colordark/20 mb-2" />
               <p className="text-[0.8125rem] font-medium text-colordark/30">No critical deadlines found</p>
            </div>
          )}
        </div>
      </div>

      <AddDeadlineModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={handleAdd} />
    </>
  );
}
