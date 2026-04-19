"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingCard({ plan }) {
  const dark = plan.popular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px", amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl p-8 max-md:p-7 transition-all duration-300 ${
        dark
          ? "bg-colordark border border-colordark"
          : "bg-white border border-colordark/10 hover:border-colordark/20"
      }`}
    >
      <div className="mb-8">
        <h3 className={`text-[1.25rem] font-medium mb-2 tracking-[-0.01em] ${dark ? "text-colorlight" : "text-colordark"}`}>
          {plan.name}
        </h3>
        <p className={`text-[0.9375rem] leading-[1.6] ${dark ? "text-colorlight/60" : "text-colordark/60"}`}>
          {plan.description}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1.5">
          <span className={`text-[3rem] font-medium tracking-[-0.03em] leading-none ${dark ? "text-colorlight" : "text-colordark"}`}>
            {plan.price}
          </span>
          <span className={`text-[0.9375rem] ${dark ? "text-colorlight/50" : "text-colordark/50"}`}>
            /{plan.period.split(" ")[1] || plan.period}
          </span>
        </div>
      </div>

      <a
        href={plan.href}
        className={`flex items-center justify-center w-full h-11 rounded-xl text-[0.9375rem] font-medium mb-8 transition-all duration-300 ${
          dark
            ? "bg-colorlight text-colordark hover:bg-colorlight/90"
            : "bg-colordark text-colorlight hover:bg-colordark/90"
        }`}
      >
        {plan.cta}
      </a>

      <div className="space-y-3.5">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check size={16} strokeWidth={2} className={`shrink-0 mt-0.5 ${dark ? "text-colorlight/70" : "text-colordark/70"}`} />
            <span className={`text-[0.9375rem] leading-[1.6] ${dark ? "text-colorlight/80" : "text-colordark/80"}`}>
              {feature}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
