"use client";

import { FileText, Download, Trash2 } from "lucide-react";

const typeColors = {
  pdf: "text-red-500 bg-red-50",
  docx: "text-blue-500 bg-blue-50",
  doc: "text-blue-500 bg-blue-50",
  zip: "text-amber-500 bg-amber-50",
  txt: "text-colordark/50 bg-colorlight",
};

export default function FileRow({ file, onDelete }) {
  const colorClass = typeColors[file.type] || "text-colordark/50 bg-colorlight";

  return (
    <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-colorwhite border border-colordark/8 shadow-sm hover:shadow-md hover:border-colordark/15 transition-all group">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
          <FileText className="w-5 h-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-[0.875rem] font-semibold text-colordark mb-0.5 tracking-[-0.01em]">
            {file.name}
          </h3>
          <p className="text-[0.75rem] text-colordark/40">
            {file.size} · {file.uploadedAt}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-2 text-colordark/30 hover:text-colordark hover:bg-colorlight rounded-lg transition-all cursor-pointer">
          <Download size={15} strokeWidth={2} />
        </button>
        <button
          onClick={() => { if (confirm("Delete this file?")) onDelete(); }}
          className="p-2 text-colordark/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
        >
          <Trash2 size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
