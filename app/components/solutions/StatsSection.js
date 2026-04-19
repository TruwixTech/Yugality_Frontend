"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function StatsSection({ data }) {
  return (
    <section className="bg-colorlight px-6 py-20 md:py-28 border-t border-colordark/6">
      <div className="w-full max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="mb-14"
        >
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark">
            Proven results with{" "}
            <span className="text-colordark/40">
              {data.title.replace("Your ", "").replace("Our ", "")}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">
          <div />

          {/* Right — stat items */}
          <div className="flex flex-col">
            {data.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                className="py-10 border-t border-colordark/8 first:border-t-0 first:pt-0"
              >
                <span className="block text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1] tracking-[-0.04em] text-colordark mb-3">
                  {stat.value}
                </span>
                <p className="text-[15px] leading-[1.6] text-colordark/50 max-w-md">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
