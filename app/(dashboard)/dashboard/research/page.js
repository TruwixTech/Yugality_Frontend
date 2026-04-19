"use client";

import { useState } from "react";
import { Search, BookOpen, Scale, Landmark, FileText, ScrollText, Globe, Gavel, Library, Hash, User, List, Type, Sparkles, ArrowRight } from "lucide-react";
import ResearchSearchBar from "@/app/components/research/ResearchSearchBar";

const researchTiles = [
  { label: "Word Search", desc: "Search across all legal databases", icon: Type, color: "#3b82f6" },
  { label: "Case Law by Section", desc: "Find cases by statutory section", icon: List, color: "#a855f7" },
  { label: "Find by Citation", desc: "Look up by case citation", icon: Hash, color: "#22c55e" },
  { label: "Find by Party Name", desc: "Search by party or advocate", icon: User, color: "#f97316" },
  { label: "Find by Topic", desc: "Browse by legal topic area", icon: Search, color: "#ec4899" },
  { label: "Words and Phrases", desc: "Judicial definitions of terms", icon: Globe, color: "#06b6d4" },
];

const libraryTiles = [
  { label: "Curated Topics", desc: "Expert-curated legal topics", icon: BookOpen, color: "#3b82f6" },
  { label: "Law Reports", desc: "Browse official law reports", icon: Scale, color: "#a855f7" },
  { label: "Judgments", desc: "Court and tribunal judgments", icon: Gavel, color: "#22c55e" },
  { label: "Acts and Rules", desc: "Browse legislation and rules", icon: Landmark, color: "#f97316" },
  { label: "Articles", desc: "Legal articles and commentary", icon: FileText, color: "#ec4899" },
  { label: "Secondary Material", desc: "Textbooks and treatises", icon: Library, color: "#06b6d4" },
  { label: "Treaties", desc: "International conventions", icon: ScrollText, color: "#eab308" },
];

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 px-6 md:px-10 py-8 md:py-10 max-w-[1440px] mx-auto min-h-screen">

      {/* Hero Card */}
      <div className="rounded-2xl border border-colordark/[0.06] px-6 md:px-8 pt-8 pb-7 mb-8">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-from/[0.06] border border-blue-from/15 mb-4">
            <Sparkles size={11} strokeWidth={2.5} className="text-blue-from" />
            <span className="text-[0.6875rem] font-semibold text-blue-from tracking-wide">AI-POWERED RESEARCH</span>
          </div>
          <h1 className="text-[1.625rem] font-semibold text-colordark tracking-[-0.03em] mb-2 leading-tight">
            Legal Research Portal
          </h1>
          <p className="text-[0.875rem] text-colordark/40 font-medium leading-relaxed">
            Search across millions of cases, statutes, and legal documents
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <ResearchSearchBar
            query={searchQuery}
            setQuery={setSearchQuery}
            onSearch={() => {}}
          />
        </div>
      </div>

      {/* ReSearch+ Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-from/10 flex items-center justify-center">
              <Search size={18} strokeWidth={2.5} className="text-blue-from" />
            </div>
            <div>
              <h2 className="text-[1.0625rem] font-bold text-colordark tracking-[-0.02em] leading-tight">ReSearch+</h2>
              <p className="text-[0.75rem] text-colordark/40 font-medium mt-0.5">Find cases using advanced search tools</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-blue-from hover:opacity-70 transition-all cursor-pointer">
            View all <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {researchTiles.map((tile, i) => (
            <button
              key={i}
              className="bg-transparent border border-colordark/[0.06] rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all group cursor-pointer min-h-[160px]"
            >
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all"
                style={{ backgroundColor: tile.color }}
              >
                <tile.icon size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <span className="text-colordark text-[0.875rem] font-bold leading-tight tracking-tight group-hover:text-blue-from transition-colors mb-1">
                {tile.label}
              </span>
              <span className="text-[0.75rem] text-colordark/35 font-medium leading-snug">
                {tile.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* My Library Section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-from/10 flex items-center justify-center">
              <Library size={18} strokeWidth={2.5} className="text-blue-from" />
            </div>
            <div>
              <h2 className="text-[1.0625rem] font-bold text-colordark tracking-[-0.02em] leading-tight">My Library</h2>
              <p className="text-[0.75rem] text-colordark/40 font-medium mt-0.5">Browse legal databases and collections</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-blue-from hover:opacity-70 transition-all cursor-pointer">
            View all <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {libraryTiles.map((tile, i) => (
            <button
              key={i}
              className="bg-transparent border border-colordark/[0.06] rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all group cursor-pointer min-h-[160px]"
            >
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all"
                style={{ backgroundColor: tile.color }}
              >
                <tile.icon size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <span className="text-colordark text-[0.875rem] font-bold leading-tight tracking-tight group-hover:text-blue-from transition-colors mb-1">
                {tile.label}
              </span>
              <span className="text-[0.75rem] text-colordark/35 font-medium leading-snug">
                {tile.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
