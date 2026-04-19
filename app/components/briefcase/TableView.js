"use client";

export default function TableView({ queries }) {
  return (
    <>
      {/* ─── Desktop Table (hidden on small screens) ─── */}
      <div className="hidden sm:block w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-colordark/[0.06]">
              <th className="text-left px-5 py-3 text-[0.8125rem] font-semibold text-colordark/50 w-8">#</th>
              <th className="text-left px-5 py-3 text-[0.8125rem] font-semibold text-colordark/50 w-[30%]">Query</th>
              <th className="text-left px-5 py-3 text-[0.8125rem] font-semibold text-colordark/50">Answer</th>
              <th className="text-left px-5 py-3 text-[0.8125rem] font-semibold text-colordark/50 w-[120px]">Tag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-colordark/[0.04]">
            {queries.map((q, i) => (
              <tr key={q.id} className="hover:bg-colordark/[0.015] transition-colors align-top">
                <td className="px-5 py-4 text-[0.875rem] font-medium text-colordark">{i + 1}</td>
                <td className="px-5 py-4 text-[0.875rem] text-colordark font-medium">{q.question}</td>
                <td className="px-5 py-4 text-[0.875rem] text-colordark/70 leading-relaxed">{q.answer}</td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 text-[0.75rem] font-medium text-blue-from bg-blue-from/[0.08] rounded-full whitespace-nowrap">{q.tag}</span>
                </td>
              </tr>
            ))}
            {queries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-[0.875rem] text-colordark/40">No queries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Mobile Card List (visible only on small screens) ─── */}
      <div className="sm:hidden space-y-3">
        {queries.map((q, i) => (
          <div key={q.id} className="rounded-xl border border-colordark/[0.06] p-4">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-[0.8125rem] font-semibold text-blue-from shrink-0">{i + 1}.</span>
              <h4 className="text-[0.8125rem] font-semibold text-colordark leading-snug">{q.question}</h4>
            </div>
            <p className="text-[0.8125rem] text-colordark/65 leading-relaxed mb-3">{q.answer}</p>
            <span className="inline-block px-2.5 py-1 text-[0.6875rem] font-medium text-blue-from bg-blue-from/[0.08] rounded-full">{q.tag}</span>
          </div>
        ))}
        {queries.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-[0.8125rem] text-colordark/40">No queries found.</p>
          </div>
        )}
      </div>
    </>
  );
}
