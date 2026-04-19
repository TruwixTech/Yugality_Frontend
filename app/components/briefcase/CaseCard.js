"use client";

import { Folder, Trash2, FileText } from "lucide-react";

export default function CaseCard({ caseItem, onClick, onDelete }) {
  return (
    <div className="group relative">
      <div
        onClick={onClick}
        className="px-5 py-5 rounded-2xl bg-colorwhite border border-colordark/8 shadow-sm hover:shadow-md hover:border-colordark/15 transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-colorlight flex items-center justify-center">
            <Folder className="w-5 h-5 text-colordark/50" strokeWidth={2} />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Delete this case and all its files?")) onDelete();
            }}
            className="p-1.5 text-colordark/25 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={14} strokeWidth={2} />
          </button>
        </div>
        <h3 className="text-[0.9375rem] font-semibold text-colordark mb-3 tracking-[-0.01em] line-clamp-2 leading-snug">
          {caseItem.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[0.75rem] text-colordark/45">
            <FileText size={12} strokeWidth={2} />
            <span>{caseItem.fileCount} files</span>
          </div>
          <span className="text-[0.75rem] text-colordark/35">{caseItem.lastModified}</span>
        </div>
      </div>
    </div>
  );
}
