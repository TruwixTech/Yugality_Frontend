"use client";

import { X, Upload } from "lucide-react";

export default function UploadModal({ cases, currentFolder, selectedCase, onCaseChange, selectedFile, onFileSelect, onUpload, onClose }) {
  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-colordark/[0.06] sticky top-0 bg-colorlight z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                <Upload size={15} strokeWidth={2} className="text-blue-from" />
              </div>
              <div>
                <h3 className="text-[0.9375rem] sm:text-[1rem] font-semibold text-colordark">Upload File</h3>
                <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/50 mt-0.5">Add a document to your case</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-4 sm:space-y-5">
            {!currentFolder && (
              <div>
                <label className="block text-[0.8125rem] font-semibold text-colordark/60 mb-2">Select Case</label>
                <select
                  value={selectedCase}
                  onChange={(e) => onCaseChange(e.target.value)}
                  className="w-full h-11 px-4 border border-colordark/[0.08] rounded-xl text-[0.875rem] text-colordark focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all cursor-pointer"
                >
                  <option value="">Choose a case...</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-[0.8125rem] font-semibold text-colordark/60 mb-2">Select File</label>
              <div className="border-2 border-dashed border-colordark/[0.08] rounded-xl p-5 sm:p-6 text-center hover:border-blue-from/30 transition-all">
                <input type="file" onChange={onFileSelect} className="hidden" id="file-upload" accept=".pdf,.docx,.doc,.txt,.zip" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-colordark/20 mx-auto mb-2" strokeWidth={1.5} />
                  {selectedFile ? (
                    <div>
                      <p className="text-[0.8125rem] sm:text-[0.875rem] font-medium text-colordark mb-1 break-all">{selectedFile.name}</p>
                      <p className="text-[0.75rem] text-colordark/45">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[0.8125rem] sm:text-[0.875rem] font-medium text-colordark/55 mb-1">Click to select file</p>
                      <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/35">PDF, DOCX, TXT, or ZIP (Max 50MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-colordark/[0.06] flex items-center justify-end gap-3 sticky bottom-0 bg-colorlight">
            <button onClick={onClose} className="h-10 px-4 sm:px-5 rounded-xl text-[0.875rem] font-medium text-colordark/55 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">Cancel</button>
            <button
              onClick={onUpload}
              disabled={!selectedFile || (!currentFolder && !selectedCase)}
              className="h-10 px-5 sm:px-6 rounded-xl text-[0.875rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
