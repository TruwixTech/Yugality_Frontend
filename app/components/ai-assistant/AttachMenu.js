"use client";

import { FileText, BookOpen } from "lucide-react";

const items = [
  { icon: FileText, label: "Add Document", sub: "From briefcase" },
  { icon: BookOpen, label: "Add Research", sub: "From research history" },
];

export default function AttachMenu({ onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute left-0 bottom-16 w-[240px] p-2 rounded-xl bg-colorlight border border-colordark/8 shadow-xl z-20">
        {items.map(({ icon: Icon, label, sub }) => (
          <button key={label} className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg hover:bg-colorwhite transition-all group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-colordark/8 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-colordark/50" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[0.8125rem] font-semibold text-colordark">{label}</p>
              <p className="text-[0.6875rem] text-colordark/45">{sub}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
