"use client";

import { useState } from "react";
import { X, Briefcase, ScrollText, Search, FileText, BookOpen, FileEdit, MessageSquare, Tag, ChevronRight, Check, ArrowLeft } from "lucide-react";

const sections = [
  {
    id: "briefcase",
    label: "Briefcase Files",
    icon: Briefcase,
    desc: "Pull documents from your projects",
    items: [
      { id: "b1", name: "Companies Act 2013 - Full Text.pdf", source: "Companies Act and Rules", type: "pdf" },
      { id: "b2", name: "Term Loan Agreement - Draft v3.docx", source: "Facility Agreements", type: "docx" },
      { id: "b3", name: "Shareholders Agreement - Final.pdf", source: "SHA", type: "pdf" },
      { id: "b4", name: "Lease Deed - Commercial Property.pdf", source: "Real Estate", type: "pdf" },
      { id: "b5", name: "SEC Order - Sep 2025.pdf", source: "SEC Orders", type: "pdf" },
      { id: "b6", name: "MCA Circulars 2025.pdf", source: "Companies Act and Rules", type: "pdf" },
    ],
  },
  {
    id: "chronology",
    label: "Chronology Entries",
    icon: ScrollText,
    desc: "Reference timeline events from cases",
    items: [
      { id: "c1", name: "Board Meeting Resolution - Jan 2025", source: "ABC Corp Dispute", type: "entry" },
      { id: "c2", name: "Notice of Default Issued", source: "Facility Agreement Case", type: "entry" },
      { id: "c3", name: "Filing of Appeal - High Court", source: "Land Acquisition Matter", type: "entry" },
      { id: "c4", name: "Settlement Negotiation Minutes", source: "ABC Corp Dispute", type: "entry" },
    ],
  },
  {
    id: "research",
    label: "Research & Citations",
    icon: Search,
    desc: "Attach saved research and case citations",
    items: [
      { id: "r1", name: "Director Duties - Companies Act 2013", source: "Saved Research", type: "research" },
      { id: "r2", name: "Smith v. Johnson - Contract Breach Precedents", source: "Case Law", type: "case" },
      { id: "r3", name: "SEBI Insider Trading Regulations", source: "Legislation", type: "statute" },
      { id: "r4", name: "Arbitration Act - Recent Amendments", source: "Articles", type: "article" },
    ],
  },
  {
    id: "drafts",
    label: "Drafts & Templates",
    icon: FileEdit,
    desc: "Attach existing drafts or templates",
    items: [
      { id: "d1", name: "NDA Template - Standard", source: "Templates", type: "template" },
      { id: "d2", name: "Legal Opinion Draft - Tax Matter", source: "Drafts", type: "draft" },
      { id: "d3", name: "Contract Review Notes", source: "Drafts", type: "draft" },
    ],
  },
];

const typeIcons = {
  pdf: "text-red-500 bg-red-50",
  docx: "text-blue-500 bg-blue-50",
  entry: "text-purple-500 bg-purple-50",
  research: "text-emerald-500 bg-emerald-50",
  case: "text-amber-500 bg-amber-50",
  statute: "text-indigo-500 bg-indigo-50",
  article: "text-cyan-500 bg-cyan-50",
  template: "text-pink-500 bg-pink-50",
  draft: "text-orange-500 bg-orange-50",
};

export default function AttachModal({ isOpen, onClose, onAttach }) {
  const [activeSection, setActiveSection] = useState("briefcase");
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);

  if (!isOpen) return null;

  const currentSection = sections.find((s) => s.id === activeSection);
  const filteredItems = currentSection?.items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.source.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const toggleItem = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAttach = () => {
    const allItems = sections.flatMap((s) => s.items);
    const attachedItems = allItems.filter((item) => selected.has(item.id));
    onAttach?.(attachedItems);
    onClose();
    setSelected(new Set());
    setSearch("");
    setShowMobileSidebar(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="w-full sm:max-w-[680px] h-[85vh] sm:h-[520px] rounded-t-2xl sm:rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-colordark/[0.06] shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                <BookOpen size={15} strokeWidth={2} className="text-blue-from" />
              </div>
              <div>
                <h2 className="text-[0.9375rem] sm:text-[1rem] font-semibold text-colordark tracking-[-0.02em]">Add to Chat</h2>
                <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/50 hidden sm:block">Select files, references, or drafts to include</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left sidebar — sections (desktop always, mobile conditional) */}
            <div className={`${showMobileSidebar ? "flex" : "hidden"} sm:flex w-full sm:w-[200px] shrink-0 sm:border-r border-colordark/[0.06] py-2 flex-col`}>
              {sections.map((sec) => {
                const Icon = sec.icon;
                const count = sec.items.filter((i) => selected.has(i.id)).length;
                return (
                  <button
                    key={sec.id}
                    onClick={() => { setActiveSection(sec.id); setSearch(""); setShowMobileSidebar(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all cursor-pointer ${
                      activeSection === sec.id
                        ? "bg-blue-from/[0.06] text-colordark"
                        : "text-colordark/60 hover:text-colordark hover:bg-colordark/[0.02]"
                    }`}
                  >
                    <Icon size={16} strokeWidth={2} className={activeSection === sec.id ? "text-blue-from" : ""} />
                    <div className="flex-1 min-w-0">
                      <span className="text-[0.8125rem] font-semibold truncate block">{sec.label}</span>
                      <span className="text-[0.6875rem] text-colordark/40 sm:hidden">{sec.desc}</span>
                    </div>
                    {count > 0 && (
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-from to-blue-to text-white text-[0.625rem] font-bold flex items-center justify-center shrink-0">{count}</span>
                    )}
                    <ChevronRight size={14} className="text-colordark/30 sm:hidden shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Right content — items (desktop always, mobile conditional) */}
            <div className={`${showMobileSidebar ? "hidden" : "flex"} sm:flex flex-1 flex-col overflow-hidden`}>
              {/* Mobile back button */}
              <button onClick={() => setShowMobileSidebar(true)} className="sm:hidden flex items-center gap-2 px-4 py-2.5 text-[0.8125rem] font-medium text-colordark/60 border-b border-colordark/[0.06]">
                <ArrowLeft size={16} strokeWidth={2} />
                {currentSection?.label}
              </button>

              {/* Search */}
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-colordark/[0.06] shrink-0">
                <div className="relative group">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-colordark/30 group-focus-within:text-blue-from transition-colors" strokeWidth={2} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`Search ${currentSection?.label.toLowerCase()}...`}
                    className="w-full h-9 pl-9 pr-3 text-[0.8125rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.06] rounded-lg focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all"
                  />
                </div>
                <p className="text-[0.6875rem] text-colordark/40 mt-1.5 sm:mt-2 hidden sm:block">{currentSection?.desc}</p>
              </div>

              {/* Items list */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-2">
                {filteredItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <Search size={32} className="text-colordark/15 mb-3" strokeWidth={1.5} />
                    <p className="text-[0.8125rem] text-colordark/45 font-medium">No items found</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredItems.map((item) => {
                      const isSelected = selected.has(item.id);
                      const style = typeIcons[item.type] || "text-colordark/50 bg-colordark/[0.04]";
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`w-full flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-xl text-left transition-all cursor-pointer group ${
                            isSelected ? "bg-blue-from/[0.06] border border-blue-from/20" : "hover:bg-colordark/[0.02] border border-transparent"
                          }`}
                        >
                          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 ${style}`}>
                            <FileText size={15} strokeWidth={1.8} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[0.8125rem] font-semibold text-colordark truncate leading-snug">{item.name}</p>
                            <p className="text-[0.6875rem] text-colordark/40 mt-0.5 truncate">{item.source}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? "bg-gradient-to-r from-blue-from to-blue-to border-transparent" : "border-colordark/15 group-hover:border-colordark/25"
                          }`}>
                            {isSelected && <Check size={12} strokeWidth={3} className="text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-colordark/[0.06] shrink-0">
            <p className="text-[0.75rem] sm:text-[0.8125rem] text-colordark/45">
              {selected.size > 0 ? (
                <span><span className="font-semibold text-colordark">{selected.size}</span> item{selected.size > 1 ? "s" : ""} selected</span>
              ) : (
                "Select items to attach"
              )}
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={onClose} className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl text-[0.8125rem] sm:text-[0.875rem] font-medium text-colordark/55 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleAttach}
                disabled={selected.size === 0}
                className="h-9 sm:h-10 px-4 sm:px-6 rounded-xl text-[0.8125rem] sm:text-[0.875rem] font-semibold bg-gradient-to-r from-blue-from to-blue-to text-white hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm"
              >
                Attach {selected.size > 0 ? `(${selected.size})` : ""}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
