"use client";

import { FileText, X, Clock, Loader2 } from "lucide-react";

export default function UploadedFilesList({ files, onRemove, onAnalyze, isAnalyzing }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[0.75rem] font-bold text-colordark/40 uppercase tracking-wider">{files.length} file{files.length > 1 ? "s" : ""}</p>
        <button onClick={onAnalyze} disabled={isAnalyzing}
          className="flex items-center gap-1.5 px-3 h-8 text-[0.75rem] font-semibold text-white bg-linear-to-br from-blue-from to-blue-to hover:shadow-lg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
          {isAnalyzing
            ? <><Loader2 size={12} strokeWidth={2} className="animate-spin" />Analyzing...</>
            : <><Clock size={12} strokeWidth={2} />Generate</>}
        </button>
      </div>
      <div className="space-y-2">
        {files.map((file) => (
          <div key={file.id} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-colorlight border border-colordark/8">
            <FileText className="w-3.5 h-3.5 text-colordark/40 shrink-0" strokeWidth={2} />
            <span className="text-[0.8125rem] font-medium text-colordark flex-1 truncate">{file.name}</span>
            <button onClick={() => onRemove(file.id)} className="p-0.5 text-colordark/30 hover:text-red-500 rounded transition-all cursor-pointer shrink-0">
              <X size={13} strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
