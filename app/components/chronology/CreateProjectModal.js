"use client";

import { useRef } from "react";
import { X, Upload, FileText, FolderPlus } from "lucide-react";

export default function CreateProjectModal({
  projectName,
  setProjectName,
  uploadedDocs,
  setUploadedDocs,
  onCreate,
  onClose,
}) {
  const fileInputRef = useRef(null);

  return (
    <>
      <div
        className="fixed inset-0 bg-colordark/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div
          className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-colordark/[0.06] sticky top-0 bg-colorlight z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                <FolderPlus
                  size={15}
                  strokeWidth={2}
                  className="text-blue-from"
                />
              </div>
              <div>
                <h3 className="text-[0.9375rem] sm:text-[1rem] font-semibold text-colordark">
                  Create New Project
                </h3>
                <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/50 mt-0.5">
                  Set up a new chronology project
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-4 sm:space-y-5">
            <div>
              <label className="block text-[0.8125rem] font-semibold text-colordark/60 mb-2">
                Project Name
              </label>
              <input
                type="text"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onCreate()}
                className="w-full h-11 px-4 text-[0.875rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all"
              />
            </div>

            {/* input for the uploading the files */}
            <div>
              <label className="block text-[0.8125rem] font-semibold text-colordark/60 mb-2">
                Documents
              </label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files).map((f) => ({
                    name: f.name,
                    size: (f.size / 1024).toFixed(1) + " KB",
                  }));
                  setUploadedDocs((prev) => [...prev, ...files]);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-4 sm:py-5 border-2 border-dashed border-colordark/[0.08] hover:border-blue-from/30 rounded-xl text-[0.875rem] text-colordark/40 hover:text-blue-from transition-all cursor-pointer"
              >
                <Upload size={16} strokeWidth={2} />
                Click to upload PDF, DOCX, TXT
              </button>

              {uploadedDocs.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {uploadedDocs.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-colordark/[0.04]"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <FileText
                          size={14}
                          strokeWidth={2}
                          className="text-blue-from/50 shrink-0"
                        />
                        <span className="text-[0.8125rem] text-colordark/70 truncate">
                          {doc.name}
                        </span>
                        <span className="text-[0.75rem] text-colordark/35 shrink-0">
                          {doc.size}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setUploadedDocs(
                            uploadedDocs.filter((_, idx) => idx !== i),
                          )
                        }
                        className="p-1 text-colordark/30 hover:text-red-500 rounded transition-all cursor-pointer shrink-0 ml-2"
                      >
                        <X size={13} strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-colordark/[0.06] flex items-center justify-end gap-3 sticky bottom-0 bg-colorlight">
            <button
              onClick={onClose}
              className="h-10 px-4 sm:px-5 rounded-xl text-[0.875rem] font-medium text-colordark/55 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onCreate}
              className="h-10 px-5 sm:px-6 rounded-xl text-[0.875rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] transition-all cursor-pointer shadow-sm"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
