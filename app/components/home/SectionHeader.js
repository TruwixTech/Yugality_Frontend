"use client";

import { motion } from "framer-motion";

export default function SectionHeader({ title, subtitle, dark = false, align = "center", className = "" }) {
  const alignClasses = align === "left" ? "text-left mb-8" : "text-center mx-auto mb-16";

  return (
    <motion.div
      className={`max-w-[680px] ${alignClasses} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px", amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className={`text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] mb-4 ${
        dark ? "text-colorlight" : "text-colordark"
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-[16px] leading-[1.6] ${dark ? "text-colorlight/60" : "text-colordark/60"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
