"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function NavigateSection({ data }) {
  const nav = data.navigateSection;
  
  return (
    <section className="bg-colorlight px-6 py-20 md:py-28">
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="relative rounded-2xl overflow-hidden border border-colordark/10 bg-colordark/[0.02] shadow-sm"
          >
            <img
              src="/screenshot.jpg"
              alt="Feature interface"
              className="w-full h-auto object-cover block"
            />
          </motion.div>

          {/* Right — text + feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="flex flex-col"
          >
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-4">
              {nav.heading}
            </h2>
            <p className="text-[16px] leading-[1.65] text-colordark/55 mb-10 max-w-lg">
              {nav.description}
            </p>

            <div className="flex flex-col gap-6">
              {nav.capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="border-t border-colordark/8 pt-5"
                >
                  <h3 className="text-[15px] font-semibold text-colordark mb-1.5 tracking-[-0.01em]">
                    {cap.title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-colordark/50">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
