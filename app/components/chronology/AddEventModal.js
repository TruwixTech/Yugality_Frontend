"use client";

import { useState } from "react";
import { X, Calendar, Type, AlertCircle, Loader2, Plus } from "lucide-react";

export default function AddEventModal({ isOpen, onClose, onAdd, isSaving }) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("Medium");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description) return;
    onAdd({ eventDate: date, description, importance });
  };

  return (
    <div className="fixed inset-0 bg-colordark/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-colordark/8 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-colordark/8 flex items-center justify-between bg-colorlight/30">
          <h3 className="text-lg font-semibold text-colordark">Add Timeline Event</h3>
          <button onClick={onClose} className="p-2 text-colordark/40 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all">
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-[0.8125rem] font-semibold text-colordark/60 mb-1.5">Event Date</label>
            <div className="relative">
              <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-colordark/30" />
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 pl-10 pr-4 text-[0.875rem] text-colordark border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.8125rem] font-semibold text-colordark/60 mb-1.5">Description</label>
            <div className="relative">
              <Type size={15} className="absolute left-3 top-3 text-colordark/30" />
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened..."
                className="w-full h-24 pl-10 pr-4 py-2 text-[0.875rem] text-colordark border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all resize-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.8125rem] font-semibold text-colordark/60 mb-1.5">Importance</label>
            <div className="grid grid-cols-3 gap-2">
              {["Low", "Medium", "High"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setImportance(level)}
                  className={`h-9 rounded-xl text-[0.8125rem] font-medium transition-all ${
                    importance === level
                      ? "bg-blue-from text-white shadow-md shadow-blue-from/20"
                      : "bg-colordark/[0.03] text-colordark/60 hover:bg-colordark/[0.06]"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[0.875rem] font-medium text-colordark/60 hover:text-colordark hover:bg-colordark/5 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 text-[0.875rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-lg rounded-xl transition-all disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} strokeWidth={2.5} />}
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
