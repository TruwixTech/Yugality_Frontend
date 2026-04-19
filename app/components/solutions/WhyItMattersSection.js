"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const iconMap = {
  assistant: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  folder: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
};

export default function WhyItMattersSection({ data }) {
  const wm = data.whyItMatters;

  return (
    <section className="bg-colordark px-6 py-20 md:py-28 rounded-t-[40px] md:rounded-t-[60px]">
      <div className="w-full max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="mb-14"
        >
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colorlight mb-3">
            {wm.heading}
          </h2>
          <p className="text-[16px] leading-[1.6] text-colorlight/50 max-w-lg">
            {wm.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {wm.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              className="rounded-2xl border border-colorlight/8 bg-colorlight/[0.03] p-8 flex flex-col gap-4 hover:bg-colorlight/[0.06] transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-colorlight/10 flex items-center justify-center text-colorlight/70">
                {iconMap[item.icon] || iconMap.folder}
              </div>
              <h3 className="text-[17px] font-semibold text-colorlight tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-colorlight/50">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
