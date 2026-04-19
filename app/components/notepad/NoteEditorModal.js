"use client";

import { X, Save, Printer, Share2, MoreVertical, Loader2 } from "lucide-react";
import LexicalEditor from "@/app/components/notepad/QuillEditor";

export default function NoteEditorModal({ noteTitle, editorContent, onTitleChange, onContentChange, onSave, onClose, isSaving }) {
  return (
    <div className="fixed inset-0 bg-colorwhite z-50 flex flex-col">
      {/* Header - OneNote Style */}
      <div className="px-3 sm:px-6 py-2.5 sm:py-3 border-b border-colordark/8 flex items-center justify-between bg-colorlight shrink-0 gap-2">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Untitled Note"
            className="text-base sm:text-lg font-semibold text-colordark tracking-[-0.01em] bg-transparent border-none focus:outline-none cursor-text placeholder:text-colordark/25 w-full min-w-0"
          />
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Hide print/share on very small screens */}
          <button
            className="hidden sm:flex items-center gap-2 px-3 h-8 text-xs font-medium text-colordark/60 hover:text-colordark hover:bg-colorwhite rounded-lg transition-all"
            title="Print"
          >
            <Printer size={14} strokeWidth={2} />
          </button>
          
          <button
            className="hidden sm:flex items-center gap-2 px-3 h-8 text-xs font-medium text-colordark/60 hover:text-colordark hover:bg-colorwhite rounded-lg transition-all"
            title="Share"
          >
            <Share2 size={14} strokeWidth={2} />
          </button>

          <button
            className="flex items-center gap-2 px-2 sm:px-3 h-8 text-xs font-medium text-colordark/60 hover:text-colordark hover:bg-colorwhite rounded-lg transition-all"
            title="More"
          >
            <MoreVertical size={14} strokeWidth={2} />
          </button>

          <div className="w-px h-5 sm:h-6 bg-colordark/8 mx-0.5 sm:mx-1" />
          
          <button onClick={onSave} disabled={isSaving}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 h-8 text-xs font-semibold text-white bg-linear-to-br from-blue-from to-blue-to hover:shadow-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {isSaving ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Save size={13} strokeWidth={2} />
            )}
            <span className="hidden xs:inline">{isSaving ? "Saving..." : "Save"}</span>
          </button>
          
          <button onClick={onClose}
            className="p-1.5 sm:p-2 text-colordark/35 hover:text-colordark hover:bg-colorwhite rounded-lg transition-all">
            <X size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Editor - Fullscreen with Lexical */}
      <div className="flex-1 overflow-hidden">
        <LexicalEditor content={editorContent} onChange={onContentChange} />
      </div>
    </div>
  );
}
