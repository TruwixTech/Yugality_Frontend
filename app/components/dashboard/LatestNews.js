"use client";

import { Newspaper, Clock, ArrowUpRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Supreme Court Landmark Ruling on Digital Privacy",
    description:
      "The apex court sets new precedents for data protection in digital age, impacting tech companies nationwide.",
    source: "Legal Wire",
    date: "28 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 2,
    title: "RBI New Guidelines for FinTech Lending",
    description:
      "Reserve Bank introduces comprehensive framework for digital lending platforms to enhance consumer protection.",
    source: "Business Law Journal",
    date: "27 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 3,
    title: "NCLT Approves Major Corporate Restructuring",
    description:
      "Tribunal green-lights one of the largest IBC resolutions this year, setting benchmarks for future cases.",
    source: "Corporate Watch",
    date: "26 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 4,
    title: "New Arbitration Rules by SIAC for 2026",
    description:
      "Singapore International Arbitration Centre publishes updated rules aimed at expediting dispute resolution.",
    source: "ADR Times",
    date: "25 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 5,
    title: "SEBI Tightens Disclosure Norms for Listed Entities",
    description:
      "New regulations mandate enhanced transparency in quarterly filings and insider trading reports.",
    source: "Market Regulator",
    date: "24 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 6,
    title: "Delhi HC Sets Precedent on AI-Generated Evidence",
    description:
      "High Court issues first-of-its-kind ruling on admissibility of AI-generated content in civil disputes.",
    source: "India Law Report",
    date: "23 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 7,
    title: "Parliament Passes Data Protection Amendment Bill",
    description:
      "Key amendments strengthen cross-border data transfer rules and impose stricter penalties for non-compliance.",
    source: "Legislative Digest",
    date: "22 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?auto=format&fit=crop&q=80&w=300&h=200",
  },
];

export default function LatestNews() {
  return (
    <div className="p-5 rounded-2xl border border-colordark/[0.06]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[0.6875rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to uppercase tracking-[0.1em]">
          Latest News
        </h3>
        <a
          href="#"
          className="text-[0.6875rem] font-medium text-colordark/35 hover:text-blue-from transition-colors flex items-center gap-1"
        >
          View all
          <ArrowUpRight size={11} strokeWidth={2.5} />
        </a>
      </div>

      {/* News List */}
      <div className="space-y-3">
        {newsItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className="flex gap-3.5 p-2.5 -mx-1 rounded-xl hover:bg-colordark/[0.02] transition-all cursor-pointer group"
          >
            {/* Image */}
            <div className="w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 bg-colordark/[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 flex flex-col justify-center">
              <h4 className="text-[0.8125rem] font-bold text-colordark leading-[1.35] tracking-[-0.01em] line-clamp-2 group-hover:text-blue-from transition-colors duration-200">
                {item.title}
              </h4>
              <p className="text-[0.6875rem] font-bold text-colordark/45 leading-[1.5] line-clamp-1 mt-1">
                {item.description}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[0.625rem] font-bold text-colordark/50">
                  {item.source}
                </span>
                <span className="text-colordark/20 text-[0.5rem]">•</span>
                <span className="text-[0.625rem] font-bold text-colordark/35 flex items-center gap-0.5">
                  <Clock size={9} strokeWidth={2} />
                  {item.date}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
