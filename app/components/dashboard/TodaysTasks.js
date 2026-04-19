"use client";

import { CheckCircle2, Circle, ArrowRight, ListTodo } from "lucide-react";

export default function TodaysTasks({ tasks }) {
  const displayTasks = tasks?.length > 0 ? tasks.map(t => ({
    id: t._id,
    title: t.title,
    completed: false
  })) : [];

  return (
    <div className="rounded-2xl border border-colordark/[0.06] bg-white flex flex-col h-full shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-colordark/[0.06]">
        <div className="flex items-center gap-2">
          <ListTodo size={18} className="text-blue-from" />
          <h2 className="text-[1rem] font-semibold text-colordark tracking-[-0.01em]">Today's Agenda</h2>
        </div>
        <a href="/dashboard/calendar" className="flex items-center gap-1 text-[0.75rem] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to hover:opacity-70 transition-all">
          View All <ArrowRight size={12} strokeWidth={2} className="text-blue-from" />
        </a>
      </div>

      <div className="p-2 flex-1">
        {displayTasks.length > 0 ? displayTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-colordark/[0.02] transition-colors cursor-pointer group">
            <button className={`${task.completed ? "text-blue-from" : "text-colordark/15 group-hover:text-colordark/25"} transition-colors`}>
              {task.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
            </button>
            <span className={`text-[0.875rem] font-medium leading-tight ${task.completed ? "text-colordark/35 line-through" : "text-colordark/80"}`}>
              {task.title}
            </span>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-10 px-5 text-center h-full">
            <p className="text-[0.875rem] font-semibold text-colordark/30">Nothing scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
}
