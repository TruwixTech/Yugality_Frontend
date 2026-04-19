"use client";

import { Bot, Scale, FileText, BookOpen, FileEdit } from "lucide-react";

const suggestions = [
  { icon: Scale, text: "Summarize key arguments for a breach of contract case" },
  { icon: FileText, text: "Draft a non-disclosure agreement" },
  { icon: BookOpen, text: "Find precedents on employment discrimination" },
  { icon: FileEdit, text: "Review this contract clause for risks" },
];

export default function ChatWelcome({ onSuggestion }) {
  return (
    <div className="w-full max-w-[640px] mx-auto px-4">
      {/* Icon + heading */}
      <div className="text-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-br from-blue-from to-blue-to flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-sm shadow-blue-from/20">
          <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-colorlight" strokeWidth={2} />
        </div>
        <h1 className="text-[1.375rem] sm:text-[1.75rem] font-semibold text-colordark mb-1.5 sm:mb-2 tracking-[-0.02em]">
          How can I help you?
        </h1>
        <p className="text-[0.8125rem] sm:text-[0.9375rem] text-colordark/45">
          Ask anything about legal research, drafting, or case analysis
        </p>
      </div>
    </div>
  );
}
