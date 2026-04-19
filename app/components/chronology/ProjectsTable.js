"use client";

import { Users, Download, X, Clock, Folder } from "lucide-react";

export default function ProjectsTable({ filtered, onRowClick, onDelete }) {
  return (
    <>
      {/* ─── Desktop Table (hidden on mobile) ─── */}
      <div className="hidden md:block rounded-2xl border border-colordark/[0.06] overflow-hidden">
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-colordark/[0.06]">
                <th className="text-left px-6 py-3 text-[0.8125rem] font-semibold text-colordark/50 w-[60%]">Project Name</th>
                <th className="text-left px-4 py-3 text-[0.8125rem] font-semibold text-colordark/50">
                  <span className="flex items-center gap-1">
                    Created At
                    <svg className="w-3 h-3 text-colordark/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </th>
                <th className="text-right px-6 py-3 text-[0.8125rem] font-semibold text-colordark/50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-colordark/[0.04]">
              {filtered.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-colordark/[0.015] transition-colors cursor-pointer group"
                  onClick={() => onRowClick(project.id)}
                >
                  <td className="px-6 py-3.5 text-[0.875rem] font-medium text-colordark group-hover:text-blue-from transition-colors">{project.name}</td>
                  <td className="px-4 py-3.5 text-[0.875rem] text-colordark/55">{project.createdAt}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={(e) => e.stopPropagation()} className="p-1.5 text-colordark/30 hover:text-colordark rounded-lg transition-all" title="Share">
                        <Users size={15} strokeWidth={2} />
                      </button>
                      <button onClick={(e) => e.stopPropagation()} className="p-1.5 text-colordark/30 hover:text-colordark rounded-lg transition-all" title="Download">
                        <Download size={15} strokeWidth={2} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); onDelete(project.id); }} className="p-1.5 text-colordark/30 hover:text-red-500 rounded-lg transition-all" title="Delete">
                        <X size={15} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-colordark/[0.06] flex items-center gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[0.8125rem] text-colordark/50">Rows per page:</span>
            <select className="px-2 py-1 text-[0.8125rem] text-colordark border border-colordark/[0.08] rounded-lg focus:outline-none focus:border-blue-from/40 transition-all">
              <option>100</option><option>50</option><option>25</option>
            </select>
          </div>
          <span className="text-[0.8125rem] text-colordark/50 shrink-0">1–{filtered.length} of {filtered.length}</span>
          <div className="flex items-center gap-1 shrink-0 ml-auto">
            <button className="w-7 h-7 flex items-center justify-center text-colordark/30 hover:text-colordark rounded-lg transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="w-7 h-7 flex items-center justify-center text-white bg-gradient-to-br from-blue-from to-blue-to rounded-full text-[0.75rem] font-medium shadow-sm shadow-blue-from/20">1</button>
            <button className="w-7 h-7 flex items-center justify-center text-colordark/30 hover:text-colordark rounded-lg transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Card List (visible only on mobile) ─── */}
      <div className="md:hidden space-y-3">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-colordark/[0.06] p-4 active:bg-colordark/[0.02] transition-colors cursor-pointer"
            onClick={() => onRowClick(project.id)}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center shrink-0">
                <Folder size={18} strokeWidth={1.8} className="text-blue-from" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[0.875rem] font-semibold text-colordark leading-snug truncate">{project.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock size={12} strokeWidth={2} className="text-colordark/35 shrink-0" />
                  <span className="text-[0.75rem] text-colordark/45">{project.createdAt}</span>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                className="p-1.5 text-colordark/30 hover:text-red-500 rounded-lg transition-all shrink-0"
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}

        {/* Mobile Pagination */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[0.75rem] text-colordark/45">1–{filtered.length} of {filtered.length}</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center text-colordark/30 rounded-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="w-7 h-7 flex items-center justify-center text-white bg-gradient-to-br from-blue-from to-blue-to rounded-full text-[0.75rem] font-medium shadow-sm shadow-blue-from/20">1</button>
            <button className="w-7 h-7 flex items-center justify-center text-colordark/30 rounded-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
