"use client";

import { Upload, Download } from "lucide-react";

export default function ChronologyHeader({ onUpload, onExport, showExport }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <h1 className="text-[1.375rem] sm:text-[1.75rem] lg:text-[2rem] font-semibold tracking-[-0.02em] text-colordark mb-1 sm:mb-1.5 leading-tight">Chronology</h1>
        <p className="text-[0.8125rem] sm:text-[0.9375rem] text-colordark/50">Upload documents to generate an AI-powered case timeline</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <label className="flex items-center gap-2 px-3 sm:px-4 h-9 text-[0.8125rem] sm:text-[0.875rem] font-medium text-colordark bg-colorwhite border border-colordark/8 hover:border-colordark/20 rounded-xl transition-all cursor-pointer shadow-sm">
          <input type="file" multiple accept=".pdf,.doc,.docx,.txt" onChange={onUpload} className="hidden" />
          <Upload size={15} strokeWidth={2} />
          Upload
        </label>
        {showExport && (
          <button onClick={onExport}
            className="flex items-center gap-2 px-3 sm:px-4 h-9 text-[0.8125rem] sm:text-[0.875rem] font-semibold text-white bg-linear-to-br from-blue-from to-blue-to hover:shadow-lg rounded-xl transition-all cursor-pointer">
            <Download size={15} strokeWidth={2} />
            Export
          </button>
        )}
      </div>
    </div>
  );
}
