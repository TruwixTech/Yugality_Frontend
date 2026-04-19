"use client";

import { History, FileText, Briefcase, Sparkles, MessageSquare } from "lucide-react";

const getIcon = (type) => {
  switch (type) {
    case "BRIEFCASE": return Briefcase;
    case "NOTE": return FileText;
    case "CHRONOLOGY": return Sparkles;
    default: return MessageSquare;
  }
};

export default function RecentActivity({ activities }) {
  const displayActivities = activities?.length > 0 ? activities : [];

  return (
    <div className="rounded-2xl border border-colordark/[0.06] bg-white flex flex-col shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-colordark/[0.06]">
        <div className="flex items-center gap-2">
          <History size={18} className="text-blue-from" />
          <h2 className="text-[1rem] font-semibold text-colordark tracking-[-0.01em]">Recent Activity</h2>
        </div>
      </div>

      <div className="divide-y divide-colordark/[0.04]">
        {displayActivities.length > 0 ? displayActivities.map((activity, i) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-colordark/[0.01] transition-colors cursor-default group">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-colordark/[0.03] text-colordark/30 flex items-center justify-center group-hover:bg-blue-from/5 group-hover:text-blue-from transition-all">
                <Icon size={16} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.875rem] text-colordark/80 font-medium leading-snug">
                  {activity.type === 'BRIEFCASE' ? 'Project created: ' : 'Note updated: '}
                  <span className="text-colordark font-semibold">{activity.name}</span>
                </p>
                <span className="text-[0.75rem] text-colordark/35 font-bold mt-1 block">
                  {new Date(activity.date).toLocaleDateString("en-US", { 
                    month: "short", 
                    day: "numeric", 
                    hour: "numeric", 
                    minute: "2-digit" 
                  })}
                </span>
              </div>
            </div>
          );
        }) : (
          <div className="py-12 px-5 text-center">
            <p className="text-[0.875rem] font-semibold text-colordark/30">No recent activity detected</p>
          </div>
        )}
      </div>
    </div>
  );
}
