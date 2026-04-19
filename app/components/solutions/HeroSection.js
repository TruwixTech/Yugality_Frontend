"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function HeroSection({ data }) {
  return (
    <section className="bg-colorlight pt-36 pb-20 md:pt-44 md:pb-28 px-6 relative overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="max-w-3xl mb-12"
        >
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.04em] text-colordark">
            {data.subtitle.endsWith(".") ? data.subtitle : data.subtitle + "."}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="w-full rounded-[2rem] overflow-hidden bg-colordark/[0.02] mb-12"
        >
          <img
            src="/screenshot.jpg"
            alt="Platform Interface"
            className="w-full h-auto object-cover block"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="max-w-2xl"
        >
          <p className="text-[17px] md:text-[19px] leading-[1.65] text-colordark/60">
            {data.heroDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
