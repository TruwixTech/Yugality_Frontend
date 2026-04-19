"use client";

import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder, className = "" }) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-colordark/40" size={16} strokeWidth={2} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-10 pl-10 pr-4 bg-colorlight border border-colordark/8 rounded-lg text-[0.875rem] text-colordark placeholder:text-colordark/40 focus:outline-none focus:border-colordark/20 transition-colors"
        />
      </div>
    </div>
  );
}
