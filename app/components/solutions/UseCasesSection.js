"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function UseCasesSection({ data }) {
  return (
    <section className="bg-colordark px-6 py-20 md:py-28">
      <div className="w-full max-w-[1280px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colorlight mb-14"
        >
          How Lawyers Use It
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.useCases.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.06 }}
              className="rounded-2xl border border-colorlight/8 bg-colorlight/[0.03] p-8 hover:bg-colorlight/[0.06] transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-lg bg-colorlight/10 flex items-center justify-center text-[13px] font-semibold text-colorlight/60">
                  {i + 1}
                </span>
                <h3 className="text-[17px] font-semibold text-colorlight tracking-[-0.02em]">
                  {uc.title}
                </h3>
              </div>
              <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
                {uc.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-colorlight/55"
                  >
                    <span className="mt-2 w-1 h-1 rounded-full bg-colorlight/30 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
