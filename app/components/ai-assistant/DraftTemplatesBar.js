"use client";

import { useState } from "react";
import { X, Search, LayoutTemplate } from "lucide-react";
import draftTemplates from "./draftTemplates";
import policyTemplates from "./policyTemplates";
import resolutionTemplates from "./resolutionTemplates";

export default function DraftTemplatesModal({ isOpen, onClose, onUse, onAttach }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("contracts");

  if (!isOpen) return null;

  const currentTemplates = activeTab === "contracts" 
    ? draftTemplates 
    : activeTab === "policies" 
      ? policyTemplates 
      : resolutionTemplates;

  const filtered = currentTemplates.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (template) => {
    if (onAttach) {
      onAttach([{
        id: `template-${template.id}`,
        name: `${template.title} Template`,
        source: "System Template",
        type: "file",
        content: template.prompt
      }]);
    }
    
    onClose();
    setSearch("");
    setActiveTab("contracts");
  };

  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 backdrop-blur-sm z-50" onClick={() => { onClose(); setSearch(""); setActiveTab("contracts"); }} />
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => { onClose(); setSearch(""); setActiveTab("contracts"); }}>
        <div
          className="w-full sm:max-w-[720px] max-h-[85vh] sm:max-h-[580px] rounded-t-2xl sm:rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden flex flex-col animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-colordark/[0.06] shrink-0">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                  <LayoutTemplate size={15} strokeWidth={2} className="text-blue-from" />
                </div>
                <div>
                  <h2 className="text-[0.9375rem] sm:text-[1rem] font-semibold text-colordark tracking-[-0.02em]">Select Template</h2>
                  <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/50 hidden xs:block">Choose the template that best matches your needs</p>
                </div>
              </div>
              <button
                onClick={() => { onClose(); setSearch(""); setActiveTab("contracts"); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 bg-colordark/[0.03] p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("contracts")}
                className={`flex-1 py-1.5 text-[0.75rem] sm:text-[0.8125rem] font-medium transition-all rounded-lg ${
                  activeTab === "contracts"
                    ? "bg-colorlight text-colordark shadow-[0_2px_8px_-2px_rgba(15,15,12,0.1)]"
                    : "text-colordark/50 hover:text-colordark hover:bg-colordark/[0.02]"
                }`}
              >
                Contracts
              </button>
              <button
                onClick={() => setActiveTab("policies")}
                className={`flex-1 py-1.5 text-[0.75rem] sm:text-[0.8125rem] font-medium transition-all rounded-lg ${
                  activeTab === "policies"
                    ? "bg-colorlight text-colordark shadow-[0_2px_8px_-2px_rgba(15,15,12,0.1)]"
                    : "text-colordark/50 hover:text-colordark hover:bg-colordark/[0.02]"
                }`}
              >
                Policies
              </button>
              <button
                onClick={() => setActiveTab("resolutions")}
                className={`flex-1 py-1.5 text-[0.75rem] sm:text-[0.8125rem] font-medium transition-all rounded-lg ${
                  activeTab === "resolutions"
                    ? "bg-colorlight text-colordark shadow-[0_2px_8px_-2px_rgba(15,15,12,0.1)]"
                    : "text-colordark/50 hover:text-colordark hover:bg-colordark/[0.02]"
                }`}
              >
                Resolutions
              </button>
            </div>

            {/* Search */}
            <div className="relative group">
              <Search
                size={14}
                strokeWidth={2}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-colordark/30 group-focus-within:text-blue-from transition-colors"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full h-9 sm:h-10 pl-10 pr-4 text-[0.8125rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.06] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all"
              />
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <LayoutTemplate size={36} className="text-colordark/15 mb-3" strokeWidth={1.5} />
                <p className="text-[0.875rem] font-medium text-colordark/45">No templates found</p>
                <p className="text-[0.75rem] text-colordark/30 mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {filtered.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect(t)}
                    className="text-left px-3.5 sm:px-4 py-3.5 sm:py-4 rounded-xl border border-colordark/[0.06] hover:border-blue-from/20 hover:bg-blue-from/[0.02] transition-all cursor-pointer group"
                  >
                    <h3 className="text-[0.8125rem] font-semibold text-colordark group-hover:text-blue-from transition-colors leading-snug tracking-[-0.01em]">
                      {t.title}
                    </h3>
                    <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/45 mt-1 sm:mt-1.5 leading-[1.5] line-clamp-2">
                      {t.description}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
