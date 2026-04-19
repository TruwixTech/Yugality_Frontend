"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function WhatItStoresSection({ data }) {
  return (
    <section className="bg-colorlight px-6 py-16 md:py-24 border-t border-colordark/6">
      <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 items-start">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark"
        >
          What It Stores
        </motion.h2>

        <div className="flex flex-wrap gap-3">
          {data.whatItStores.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              className="inline-flex items-center h-10 px-5 rounded-full text-[14px] font-medium text-colordark/70 bg-colordark/[0.04] border border-colordark/8"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
