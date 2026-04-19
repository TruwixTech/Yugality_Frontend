"use client";

import TimelineEvent from "./TimelineEvent";

export default function Timeline({ events }) {
  return (
    <div className="relative max-w-5xl">
      {/* Vertical line */}
      <div className="absolute left-[5px] top-0 bottom-0 w-px bg-colordark/10" />
      <div className="space-y-8">
        {events.map((event, i) => (
          <TimelineEvent key={i} event={event} />
        ))}
      </div>
    </div>
  );
}
