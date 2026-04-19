"use client";

import { X } from "lucide-react";

export default function NewCaseModal({ value, onChange, onCreate, onClose }) {
  return (
    <div className="fixed inset-0 bg-colordark/50 z-50 flex items-center justify-center p-4">
      <div className="bg-colorwhite rounded-2xl shadow-2xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-colordark/8 flex items-center justify-between">
          <h3 className="text-[1.125rem] font-semibold text-colordark tracking-[-0.01em]">Create New Case</h3>
          <button onClick={onClose} className="p-2 text-colordark/40 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all cursor-pointer">
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <div className="p-6">
          <label className="block text-[0.8125rem] font-medium text-colordark mb-2">Case Name</label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onCreate()}
            placeholder="e.g., Smith vs. Johnson - Property Dispute"
            className="w-full h-11 px-4 bg-colorlight border border-colordark/8 rounded-lg text-[0.875rem] text-colordark placeholder:text-colordark/40 focus:outline-none focus:border-colordark/20 transition-colors"
          />
        </div>
        <div className="px-6 py-4 border-t border-colordark/8 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 h-10 text-[0.875rem] font-medium text-colordark bg-colorlight border border-colordark/8 hover:border-colordark/20 rounded-lg transition-all cursor-pointer">
            Cancel
          </button>
          <button onClick={onCreate} className="px-4 h-10 text-[0.875rem] font-semibold text-white bg-linear-to-br from-blue-from to-blue-to hover:shadow-lg rounded-lg transition-all cursor-pointer">
            Create Case
          </button>
        </div>
      </div>
    </div>
  );
}
