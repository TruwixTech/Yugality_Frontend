"use client";

import { Edit, Trash2, Calendar, BookOpen, Tag } from "lucide-react";

export default function ChronologyTable({ filtered, chronologies, selectedRows, toggleRow, toggleAll, onDelete }) {
  return (
    <>
      {/* ─── Desktop Table (hidden on small screens) ─── */}
      <div className="hidden md:block w-full overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-colordark/[0.06]">
              <th className="w-10 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === chronologies.length && chronologies.length > 0}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-colordark/20 accent-blue-from"
                />
              </th>
              <th className="px-4 py-3 text-left text-[0.8125rem] font-semibold text-colordark/50 w-[130px]">
                <span className="flex items-center gap-1">
                  Date
                  <svg className="w-3 h-3 text-colordark/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </th>
              <th className="px-4 py-3 text-left text-[0.8125rem] font-semibold text-colordark/50">Event</th>
              <th className="px-4 py-3 text-left text-[0.8125rem] font-semibold text-colordark/50 w-[180px]">
                <span className="flex items-center gap-1">
                  Source
                  <svg className="w-3 h-3 text-colordark/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </span>
              </th>
              <th className="px-4 py-3 text-left text-[0.8125rem] font-semibold text-colordark/50 w-[180px]">Issue</th>
              <th className="px-4 py-3 text-right text-[0.8125rem] font-semibold text-colordark/50 w-[80px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-colordark/[0.04]">
            {filtered.map((chrono) => (
              <tr
                key={chrono.id}
                className={`hover:bg-colordark/[0.015] transition-colors align-top ${selectedRows.includes(chrono.id) ? "bg-blue-from/[0.04]" : ""}`}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(chrono.id)}
                    onChange={() => toggleRow(chrono.id)}
                    className="w-4 h-4 rounded border-colordark/20 accent-blue-from mt-0.5"
                  />
                </td>
                <td className="px-4 py-4 text-[0.875rem] text-colordark font-medium whitespace-nowrap">{chrono.date}</td>
                <td className="px-4 py-4 text-[0.875rem] text-colordark/80 leading-relaxed">
                  {chrono.event}
                  {chrono.page && (
                    <span className="ml-2 text-[0.75rem] font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to cursor-pointer hover:opacity-70 transition-opacity">Page {chrono.page}</span>
                  )}
                </td>
                <td className="px-4 py-4 text-[0.875rem] text-colordark/60 hover:text-blue-from transition-colors cursor-pointer">{chrono.source}</td>
                <td className="px-4 py-4 text-[0.875rem] text-colordark/60">{chrono.issue}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 text-colordark/30 hover:text-colordark rounded-lg transition-all cursor-pointer" title="Edit">
                      <Edit size={14} strokeWidth={2} />
                    </button>
                    <button onClick={() => onDelete(chrono.id)} className="p-1.5 text-colordark/30 hover:text-red-500 rounded-lg transition-all cursor-pointer" title="Delete">
                      <Trash2 size={14} strokeWidth={2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── Mobile Card List (visible only on small screens) ─── */}
      <div className="md:hidden">
        {/* Select all row */}
        <div className="px-4 py-3 border-b border-colordark/[0.06] flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.length === chronologies.length && chronologies.length > 0}
            onChange={toggleAll}
            className="w-4 h-4 rounded border-colordark/20 accent-blue-from"
          />
          <span className="text-[0.75rem] font-medium text-colordark/45">Select all ({chronologies.length})</span>
        </div>

        <div className="divide-y divide-colordark/[0.04]">
          {filtered.map((chrono) => (
            <div
              key={chrono.id}
              className={`px-4 py-4 transition-colors ${selectedRows.includes(chrono.id) ? "bg-blue-from/[0.04]" : ""}`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(chrono.id)}
                  onChange={() => toggleRow(chrono.id)}
                  className="w-4 h-4 rounded border-colordark/20 accent-blue-from mt-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <Calendar size={12} strokeWidth={2} className="text-blue-from shrink-0" />
                    <span className="text-[0.8125rem] font-semibold text-colordark">{chrono.date}</span>
                  </div>

                  {/* Event text */}
                  <p className="text-[0.8125rem] text-colordark/75 leading-relaxed mb-3">
                    {chrono.event}
                    {chrono.page && (
                      <span className="ml-1 text-[0.75rem] font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to"> Page {chrono.page}</span>
                    )}
                  </p>

                  {/* Source & Issue tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-[0.6875rem] font-medium text-colordark/55 bg-colordark/[0.03] rounded-lg">
                      <BookOpen size={10} strokeWidth={2} className="shrink-0" />
                      <span className="truncate max-w-[160px]">{chrono.source}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-[0.6875rem] font-medium text-blue-from bg-blue-from/[0.06] rounded-lg">
                      <Tag size={10} strokeWidth={2} className="shrink-0" />
                      <span className="truncate max-w-[160px]">{chrono.issue}</span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-colordark/30 hover:text-colordark rounded-lg transition-all cursor-pointer" title="Edit">
                      <Edit size={14} strokeWidth={2} />
                    </button>
                    <button onClick={() => onDelete(chrono.id)} className="p-1.5 text-colordark/30 hover:text-red-500 rounded-lg transition-all cursor-pointer" title="Delete">
                      <Trash2 size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="text-[0.8125rem] text-colordark/40">No chronology entries found.</p>
          </div>
        )}
      </div>
    </>
  );
}
