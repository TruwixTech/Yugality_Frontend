import { Download, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-1 bg-blue-from/5 text-blue-from rounded-full text-[0.6875rem] font-bold uppercase tracking-wider hover:bg-blue-from/10 transition-all no-underline">
            <LayoutDashboard size={12} strokeWidth={2.5} />
            Back to Dashboard
          </Link>
        </div>
        <h1 className="text-[2rem] font-semibold tracking-[-0.04em] text-colordark mb-1 leading-tight">Admin Console</h1>
        <p className="text-[1rem] text-colordark/40 font-medium">System-wide monitoring and resource management</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-5 h-11 text-[0.875rem] font-semibold text-colordark bg-colorwhite border border-colordark/6 hover:border-colordark/15 rounded-xl transition-all cursor-pointer">
          <Download size={16} strokeWidth={2} />
          Export Audit Log
        </button>
      </div>
    </div>
  );
}
