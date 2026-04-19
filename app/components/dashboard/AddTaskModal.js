"use client";

import { useState, useEffect, useRef } from "react";
import { X, ListTodo, Type } from "lucide-react";

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTitle("");
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
    if (!title.trim()) return;
    onAdd({ title: title.trim() });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[440px] rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
          
          {/* Header — matches card headers */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-colordark/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                <ListTodo size={16} strokeWidth={2} className="text-blue-from" />
              </div>
              <div>
                <h2 className="text-[1rem] font-semibold text-colordark tracking-[-0.02em]">Add Task</h2>
                <p className="text-[0.75rem] text-colordark/50 mt-0.5">Add to today&apos;s task list</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-colordark/60 mb-2">
              <Type size={13} strokeWidth={2} className="text-blue-from/50" />
              Task Name <span className="text-blue-from">*</span>
            </label>
            <input ref={inputRef} type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              className="w-full h-11 px-4 text-[0.875rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all mb-6" />

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-colordark/[0.06]">
              <button type="button" onClick={onClose} className="h-10 px-5 rounded-xl text-[0.875rem] font-medium text-colordark/55 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">Cancel</button>
              <button type="submit" disabled={!title.trim()}
                className="h-10 px-6 rounded-xl text-[0.875rem] font-semibold bg-gradient-to-r from-blue-from to-blue-to text-white hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
