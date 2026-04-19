"use client";

import { Briefcase, Clock, FileText, Scale, TrendingUp, TrendingDown } from "lucide-react";

export default function StatsRow({ stats }) {
  const displayStats = [
    { 
      label: "Active Projects", 
      value: stats?.totalProjects || "0", 
      icon: Briefcase, 
      change: "+2", 
      trend: "up" 
    },
    { 
      label: "Notebook Entries", 
      value: stats?.totalNotes || "0", 
      icon: FileText, 
      change: "+12", 
      trend: "up" 
    },
    { 
      label: "Today's Agenda", 
      value: stats?.activeTasks || "0", 
      icon: Clock, 
      change: "-5", 
      trend: "down" 
    },
    { 
      label: "Hearings", 
      value: stats?.upcomingHearings || "0", 
      icon: Scale, 
      change: "0", 
      trend: "neutral" 
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {displayStats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="group p-5 rounded-2xl border border-colordark/[0.06] bg-white hover:border-colordark/[0.12] transition-all duration-200 cursor-default shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                <Icon size={16} strokeWidth={1.8} className="text-blue-from/70" />
              </div>
              {stat.trend !== "neutral" && (
                <div className={`flex items-center gap-0.5 text-[0.6875rem] font-bold ${
                  stat.trend === "up" ? "text-emerald-500" : "text-rose-500"
                }`}>
                  {stat.trend === "up" ? <TrendingUp size={12} strokeWidth={2.5} /> : <TrendingDown size={12} strokeWidth={2.5} />}
                  <span>{stat.change}</span>
                </div>
              )}
            </div>
            <p className="text-[1.75rem] font-semibold text-colordark tracking-[-0.04em] leading-none mb-1">
              {stat.value}
            </p>
            <p className="text-[0.8125rem] text-colordark/35 font-semibold">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
