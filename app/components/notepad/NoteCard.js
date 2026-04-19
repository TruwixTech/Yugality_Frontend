"use client";

import { Clock } from "lucide-react";

export default function NoteCard({ note, onClick }) {
  return (
    <div
      onClick={onClick}
      className="px-6 py-5 rounded-2xl bg-colorwhite border border-colordark/8 shadow-sm hover:shadow-md hover:border-colordark/15 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-[0.9375rem] font-semibold text-colordark tracking-[-0.01em] leading-snug group-hover:text-blue-from transition-colors">
          {note.title}
        </h3>
      </div>
      <div
        className="text-[0.8125rem] text-colordark/50 leading-relaxed line-clamp-3 mb-4"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
      <div className="flex items-center gap-1.5 text-[0.75rem] text-colordark/35">
        <Clock size={12} strokeWidth={2} />
        <span>{note.updatedAt}</span>
      </div>
    </div>
  );
}
