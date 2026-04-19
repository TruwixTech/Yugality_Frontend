"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const languages = [
  "English", "Hindi", "Spanish", "French", "German", "Chinese",
  "Japanese", "Korean", "Arabic", "Portuguese", "Russian", "Italian",
];

export default function LanguageDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block mb-4 w-full">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 w-full px-4 h-11 bg-transparent border border-colordark/[0.06] rounded-xl text-[0.875rem] font-medium text-colordark hover:border-blue-from/30 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all cursor-pointer">
        <span>{value}</span>
        <ChevronDown size={15} strokeWidth={2} className="text-colordark/40" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-2 left-0 right-0 bg-colorlight border border-colordark/[0.06] rounded-2xl shadow-[0_20px_60px_-10px_rgba(15,15,12,0.15)] py-2 z-50 max-h-56 overflow-y-auto">
            {languages.map((lang) => (
              <button key={lang} onClick={() => { onChange(lang); setOpen(false); }}
                className={`w-full px-4 py-2.5 text-left text-[0.875rem] hover:bg-colordark/[0.02] transition-colors cursor-pointer ${
                  value === lang ? "font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to" : "text-colordark/70"
                }`}>
                {lang}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
