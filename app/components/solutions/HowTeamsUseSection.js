"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ease = [0.16, 1, 0.3, 1];

function HowTeamsItem({ tab, index, setActiveTab }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", amount: "some" });

  useEffect(() => {
    if (isInView) {
      setActiveTab(index);
    }
  }, [isInView, index, setActiveTab]);

  return (
    <div ref={ref} className="flex flex-col gap-6 py-20 first:pt-4 last:pb-10 min-h-[60vh] justify-center">
      <div className="rounded-2xl overflow-hidden">
        <img
          src="/screenshot.jpg"
          alt={tab.label}
          className="w-full h-auto object-cover block"
        />
      </div>
      <div className="px-1">
        <h3 className="text-[18px] font-semibold text-colordark mb-2 tracking-[-0.02em]">
          {tab.label}
        </h3>
        <p className="text-[15px] leading-[1.7] text-colordark/55 max-w-xl">
          {tab.description}
        </p>
      </div>
    </div>
  );
}

export default function HowTeamsUseSection({ data }) {
  const [activeTab, setActiveTab] = useState(0);
  const hw = data.howItWorks;

  const scrollToTab = (index) => {
    const el = document.getElementById(`tab-content-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="bg-colorlight px-6 py-20 md:py-28 border-t border-colordark/6 relative">
      <div className="w-full max-w-[1280px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-14 md:text-center"
        >
          {hw.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-14 items-start relative">
          {/* Sidebar tabs (Sticky) */}
          <div className="md:sticky md:top-32 self-start flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 z-10 w-full bg-colorlight md:bg-transparent">
            {hw.tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => scrollToTab(i)}
                className={`text-left whitespace-nowrap md:whitespace-normal px-4 py-3 rounded-xl text-[15px] font-semibold transition-all duration-300 cursor-pointer border-none ${
                  activeTab === i
                    ? "bg-colordark text-colorlight shadow-md scale-[1.02]"
                    : "bg-transparent text-colordark/60 hover:text-colordark hover:bg-colordark/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right content — scrollable items */}
          <div className="flex flex-col relative w-full pt-4 md:pt-0">
            {hw.tabs.map((tab, i) => (
              <div key={i} id={`tab-content-${i}`}>
                <HowTeamsItem tab={tab} index={i} setActiveTab={setActiveTab} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
