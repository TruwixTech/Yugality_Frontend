"use client";

import { Upload, X, FileText } from "lucide-react";
import DocumentViewer from "@/app/components/translation/DocumentViewer";

export default function UploadPanel({ uploadedFile, onUpload, onClear }) {
  return (
    <div className="flex flex-col w-full md:w-1/2 border-b md:border-b-0 md:border-r border-colordark/[0.06] min-h-[40vh] md:min-h-0">
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-colordark/[0.06] flex items-center justify-between shrink-0">
        <div className="min-w-0">
          <h2 className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-colordark tracking-[-0.01em]">Original Document</h2>
          <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/40 font-bold mt-0.5 truncate">{uploadedFile ? uploadedFile.name : "Upload a file to begin"}</p>
        </div>
        {uploadedFile && (
          <button onClick={onClear} className="p-2 text-colordark/35 hover:text-colordark hover:bg-colordark/[0.04] rounded-xl transition-all cursor-pointer shrink-0 ml-2">
            <X size={16} strokeWidth={2} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        {!uploadedFile ? (
          <div className="h-full flex items-center justify-center">
            <label className="flex flex-col items-center gap-3 sm:gap-4 cursor-pointer p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-blue-from/60" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-colordark mb-1">Upload Document</p>
                <p className="text-[0.75rem] sm:text-[0.8125rem] text-colordark/40 font-bold">PDF, DOCX, or TXT · Max 10MB</p>
              </div>
              <input type="file" accept=".pdf,.docx,.txt" onChange={onUpload} className="hidden" />
              <span className="px-5 h-9 flex items-center justify-center text-[0.8125rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] shadow-sm rounded-xl transition-all">
                Browse Files
              </span>
            </label>
          </div>
        ) : (
          <DocumentViewer file={uploadedFile.file} type={uploadedFile.type} content={uploadedFile.content} />
        )}
      </div>
    </div>
  );
}
