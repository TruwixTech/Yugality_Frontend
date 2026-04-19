"use client";

import { useRouter } from "next/navigation";
import {
  BookOpen,
  Scale,
  Landmark,
  FileText,
  ScrollText,
  Globe,
  Newspaper,
  Gavel,
  Library,
} from "lucide-react";

const databases = [
  { id: "curated-topics", label: "Browse Curated Topics", icon: BookOpen, color: "#3b82f6" },
  { id: "law-reports", label: "Browse Law Reports", icon: Scale, color: "#a855f7" },
  { id: "judgments", label: "Browse Judgments by Court / Tribunals", icon: Gavel, color: "#22c55e" },
  { id: "legislation", label: "Browse Legislation", icon: Landmark, color: "#f97316" },
  { id: "articles", label: "Browse Articles & Short Pieces", icon: FileText, color: "#ec4899" },
  { id: "secondary-material", label: "Browse Secondary Material", icon: Library, color: "#06b6d4" },
  { id: "treaties", label: "Browse Treaties, Conventions, and Instruments", icon: ScrollText, color: "#eab308" },
  { id: "legal-news", label: "Browse Legal / Business News", icon: Newspaper, color: "#ef4444" },
  { id: "moot-court", label: "Moot Court Resources", icon: Globe, color: "#6366f1" },
];

export default function DatabaseGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {databases.map((db) => {
        const Icon = db.icon;
        return (
          <button
            key={db.id}
            onClick={() => router.push(`/dashboard/research/${db.id}`)}
            className="flex items-center gap-4 px-5 py-5 rounded-2xl bg-white border border-colordark/6 hover:bg-colordark/[0.015] transition-all text-left group cursor-pointer"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
              style={{ backgroundColor: db.color }}
            >
              <Icon size={20} strokeWidth={1.8} className="text-white" />
            </div>
            <span className="text-[0.9375rem] font-semibold text-colordark tracking-[-0.01em] leading-snug">
              {db.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
