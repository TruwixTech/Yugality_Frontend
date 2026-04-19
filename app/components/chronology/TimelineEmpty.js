"use client";

import { Clock } from "lucide-react";

export default function TimelineEmpty() {
  return (
    <div className="flex items-center justify-center py-16 sm:py-24">
      <div className="text-center max-w-xs sm:max-w-sm px-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-colorlight flex items-center justify-center mx-auto mb-4 sm:mb-5">
          <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-colordark/30" strokeWidth={1.5} />
        </div>
        <h3 className="text-[0.9375rem] sm:text-[1rem] font-semibold text-colordark mb-2">No Timeline Generated</h3>
        <p className="text-[0.8125rem] sm:text-[0.875rem] text-colordark/45 leading-relaxed">
          Upload your documents and click &quot;Generate Timeline&quot; to extract chronological events using AI.
        </p>
      </div>
    </div>
  );
}
