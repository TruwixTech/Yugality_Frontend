"use client";

import { useState, useEffect, useRef } from "react";
import { X, MessageSquarePlus, Type, FileText, Tag } from "lucide-react";

export default function AddQueryModal({ isOpen, onClose, onAdd }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tag, setTag] = useState("Created By You");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuestion(""); setAnswer(""); setTag("Created By You");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    onAdd({
      id: Date.now(),
      question: question.trim(),
      answer: answer.trim() || "Awaiting response...",
      tag: tag.trim() || "Created By You",
    });
    onClose();
  };

  const tags = [
    { value: "Created By You", label: "Created By You" },
    { value: "AI Generated", label: "AI Generated" },
    { value: "From Document", label: "From Document" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="w-full sm:max-w-[520px] rounded-t-2xl sm:rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-colordark/[0.06] sticky top-0 bg-colorlight z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                <MessageSquarePlus size={15} strokeWidth={2} className="text-blue-from" />
              </div>
              <div>
                <h2 className="text-[0.9375rem] sm:text-[1rem] font-semibold text-colordark tracking-[-0.02em]">Add Query</h2>
                <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/50 mt-0.5">Ask a question about your documents</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 sm:space-y-5">
            <div>
              <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-colordark/60 mb-2">
                <Type size={13} strokeWidth={2} className="text-blue-from/50" />
                Question <span className="text-blue-from">*</span>
              </label>
              <textarea
                ref={inputRef}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., What are the key provisions related to director responsibilities?"
                rows={3}
                className="w-full px-4 py-3 text-[0.875rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-colordark/60 mb-2">
                <FileText size={13} strokeWidth={2} className="text-blue-from/50" />
                Answer <span className="text-[0.75rem] font-normal text-colordark/35">(optional)</span>
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Provide an answer or leave empty for AI to generate one..."
                rows={3}
                className="w-full px-4 py-3 text-[0.875rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-colordark/60 mb-2">
                <Tag size={13} strokeWidth={2} className="text-blue-from/50" />
                Tag
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTag(t.value)}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[0.75rem] sm:text-[0.8125rem] font-semibold border transition-all cursor-pointer ${
                      tag === t.value
                        ? "bg-gradient-to-r from-blue-from to-blue-to text-white border-transparent shadow-sm shadow-blue-from/20"
                        : "text-colordark/55 border-colordark/[0.08] hover:border-colordark/15 hover:text-colordark/70"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-colordark/[0.06] mt-5 sm:mt-6">
              <button type="button" onClick={onClose} className="h-10 px-4 sm:px-5 rounded-xl text-[0.875rem] font-medium text-colordark/55 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">Cancel</button>
              <button type="submit" disabled={!question.trim()}
                className="h-10 px-5 sm:px-6 rounded-xl text-[0.875rem] font-semibold bg-gradient-to-r from-blue-from to-blue-to text-white hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm">
                Add Query
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
