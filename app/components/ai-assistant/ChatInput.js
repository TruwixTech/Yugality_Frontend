"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Mic, Send, BookOpen, Upload, ChevronDown, Image, FileText, LayoutTemplate } from "lucide-react";
import AttachModal from "./AttachModal";
import PromptLibraryModal from "./PromptLibraryModal";
import DraftTemplatesModal from "./DraftTemplatesBar";
import UploadModal from "./UploadModal";

export default function ChatInput({ value, onChange, onSend, mode, onModeChange }) {
  const setMode = onModeChange;
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [attachedItems, setAttachedItems] = useState([]);
  const uploadRef = useRef(null);
  const uploadButtonRef = useRef(null);
  const textareaRef = useRef(null);
  const modeRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [value]);

  useEffect(() => {
    const handleClick = (e) => {
      if (modeRef.current && !modeRef.current.contains(e.target)) setShowModeMenu(false);
    };
    if (showModeMenu) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showModeMenu]);

  const handleUpload = (items) => {
    setAttachedItems((prev) => [...prev, ...items]);
  };

  const handleSendClick = () => {
    if (!value.trim() && attachedItems.length === 0) return;
    onSend(attachedItems);
    setAttachedItems([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleAttach = (items) => {
    setAttachedItems((prev) => [...prev, ...items]);
  };

  const removeAttached = (id) => {
    setAttachedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const modes = [
    { id: "Ask", label: "Ask", desc: "Get answers to legal questions" },
    { id: "Research", label: "Research", desc: "Deep dive into case law" },
    { id: "Draft", label: "Draft", desc: "Generate legal documents" },
    { id: "Summarize", label: "Summarize", desc: "Summarize case law instantly" },
    { id: "Predict", label: "Predict", desc: "Predict judgment outcomes" },
  ];

  return (
    <>
      <div className="border-t border-colordark/[0.06] sticky bottom-0 z-10 w-full backdrop-blur-md bg-colorlight/80">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">

          <div className="relative rounded-2xl border border-colordark/[0.06] focus-within:border-blue-from/30 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] bg-colorlight/50 transition-all">

            {/* Attached items preview */}
            {attachedItems.length > 0 && (
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 pt-3 pb-1 flex-wrap">
                {attachedItems.map((item) => (
                  <span key={item.id} className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 text-[0.6875rem] sm:text-[0.75rem] font-medium text-blue-from bg-blue-from/[0.06] border border-blue-from/15 rounded-lg">
                    {item.name.length > 20 ? item.name.slice(0, 20) + "…" : item.name}
                    <button onClick={() => removeAttached(item.id)} className="text-blue-from/50 hover:text-blue-from transition-colors cursor-pointer">×</button>
                  </span>
                ))}
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type what you need help with..."
              rows={1}
              className="w-full px-3.5 sm:px-5 pt-3 sm:pt-4 pb-1.5 sm:pb-2 text-[0.875rem] sm:text-[0.9375rem] text-colordark placeholder:text-colordark/35 focus:outline-none resize-none bg-transparent leading-relaxed"
            />

            <div className="flex items-center justify-between px-2 sm:px-3 pb-2.5 sm:pb-3">
              {/* Left: Add + Upload + Prompt Library */}
              <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto">
                <button
                  onClick={() => setShowAttachModal(true)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[0.75rem] sm:text-[0.8125rem] font-medium text-colordark/50 hover:text-blue-from hover:bg-blue-from/[0.04] rounded-lg transition-all cursor-pointer shrink-0"
                >
                  <Plus size={14} strokeWidth={2.5} />
                  <span className="hidden xs:inline">Add</span>
                </button>
                <div className="relative" ref={uploadRef}>
                  <button
                    ref={uploadButtonRef}
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[0.75rem] sm:text-[0.8125rem] font-medium rounded-lg transition-all cursor-pointer shrink-0 text-colordark/50 hover:text-colordark hover:bg-colordark/[0.04]"
                  >
                    <Upload size={14} strokeWidth={2} />
                    <span className="hidden sm:inline">Upload</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowPromptLibrary(true)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[0.75rem] sm:text-[0.8125rem] font-medium text-colordark/50 hover:text-colordark hover:bg-colordark/[0.04] rounded-lg transition-all cursor-pointer shrink-0"
                >
                  <BookOpen size={14} strokeWidth={2} />
                  <span className="hidden sm:inline">Prompt Library</span>
                  <span className="sm:hidden">Prompts</span>
                </button>
                {mode === "Draft" && (
                  <button
                    onClick={() => setShowTemplatesModal(true)}
                    className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[0.75rem] sm:text-[0.8125rem] font-semibold text-blue-from bg-blue-from/[0.06] hover:bg-blue-from/[0.1] rounded-lg transition-all cursor-pointer border border-blue-from/15 shrink-0"
                  >
                    <LayoutTemplate size={14} strokeWidth={2} />
                    <span className="hidden xs:inline">Templates</span>
                  </button>
                )}
              </div>

              {/* Right: Mic + Mode Dropdown + Send */}
              <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-colordark/35 hover:text-colordark hover:bg-colordark/[0.04] rounded-xl transition-all cursor-pointer hidden sm:flex">
                  <Mic size={16} strokeWidth={2} />
                </button>

                <div className="relative" ref={modeRef}>
                  <button
                    onClick={() => setShowModeMenu(!showModeMenu)}
                    className={`flex items-center gap-1 sm:gap-1.5 h-8 sm:h-9 px-2 sm:px-3 rounded-xl text-[0.75rem] sm:text-[0.8125rem] font-semibold transition-all cursor-pointer border ${showModeMenu ? "text-blue-from border-blue-from/30 bg-blue-from/[0.06]" : "text-colordark/55 border-colordark/[0.06] hover:border-colordark/15 hover:text-colordark"}`}
                  >
                    {mode}
                    <ChevronDown size={12} strokeWidth={2} className={`transition-transform ${showModeMenu ? "rotate-180" : ""}`} />
                  </button>

                  {showModeMenu && (
                    <div className="absolute bottom-11 sm:bottom-12 right-0 w-[200px] sm:w-[220px] bg-colorlight border border-colordark/[0.06] rounded-xl shadow-[0_20px_60px_-10px_rgba(15,15,12,0.15)] z-50 py-1 overflow-hidden">
                      {modes.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => { setMode(m.id); setShowModeMenu(false); }}
                          className={`w-full px-4 py-2.5 text-left transition-colors cursor-pointer ${mode === m.id ? "bg-blue-from/[0.06]" : "hover:bg-colordark/[0.02]"}`}
                        >
                          <div className={`text-[0.8125rem] font-semibold ${mode === m.id ? "text-blue-from" : "text-colordark"}`}>{m.label}</div>
                          <div className="text-[0.6875rem] text-colordark/40 mt-0.5">{m.desc}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSendClick}
                  disabled={!value.trim() && attachedItems.length === 0}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          <p className="text-[0.625rem] sm:text-[0.6875rem] text-colordark/35 text-center mt-2 sm:mt-2.5">
            AI can make mistakes. Always verify important legal information.
          </p>
        </div>
      </div>

      <AttachModal
        isOpen={showAttachModal}
        onClose={() => setShowAttachModal(false)}
        onAttach={handleAttach}
      />

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />

      <PromptLibraryModal
        isOpen={showPromptLibrary}
        onClose={() => setShowPromptLibrary(false)}
        onUse={(text) => onChange(text)}
      />

      <DraftTemplatesModal
        isOpen={showTemplatesModal}
        onClose={() => setShowTemplatesModal(false)}
        onUse={(text) => onChange(text)}
        onAttach={handleAttach}
      />
    </>
  );
}
