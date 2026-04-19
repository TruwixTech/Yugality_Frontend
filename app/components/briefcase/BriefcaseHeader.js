"use client";

import { Upload, Plus } from "lucide-react";

export default function BriefcaseHeader({ currentFolder, onUpload, onNewCase }) {
  return (
    <div className="flex items-center shrink-0">
      {currentFolder ? (
        <button
          onClick={onUpload}
          className="flex items-center gap-2 px-5 h-10 text-[0.875rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <Upload size={16} strokeWidth={2} />
          Upload File
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={onUpload}
            className="flex items-center gap-2 px-4 h-10 text-[0.875rem] font-medium text-colordark/55 border border-colordark/[0.08] hover:border-colordark/15 hover:text-colordark rounded-xl transition-all cursor-pointer"
          >
            <Upload size={16} strokeWidth={2} />
            Upload
          </button>
          <button
            onClick={onNewCase}
            className="flex items-center gap-2 px-4 h-10 text-[0.875rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <Plus size={16} strokeWidth={2} />
            New Case
          </button>
        </div>
      )}
    </div>
  );
}
