"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";

const plans = [
  {
    id: "monthly",
    label: "Monthly",
    price: "₹2,999",
    unit: "seat / month",
    badge: null,
    cardHeader: {
      icon: "sparkles",
      title: "No hidden math, no fine print.",
      subtitle: "Just full access to Yugality.",
    },
    benefits: [
      "Research, drafting, translations – everything included.",
      "Every update and every integration.",
      "Complete access to current and future legal repositories.",
      "Tailored prompt libraries & templates.",
      "Dedicated training and onboarding.",
      "Zero lock-ins. Zero nonsense.",
      "Cancel anytime, no questions asked.",
    ],
  },
  {
    id: "yearly",
    label: "Yearly",
    price: "₹2,399",
    unit: "seat / month",
    badge: "Save 20% with yearly",
    cardHeader: {
      icon: "zap",
      title: "Best value. Maximum commitment savings.",
      subtitle: "Everything in Monthly, plus yearly perks.",
    },
    benefits: [
      "Everything in Monthly – all features unlocked.",
      "Save 20% compared to monthly billing.",
      "10–20% stackable volume discounts (25+ seats).",
      "Priority onboarding & dedicated account manager.",
      "Early access to new features & beta programs.",
      "Custom firm-wide branding & templates.",
      "Annual billing with flexible payment options.",
    ],
  },
];

export default function PricingSelector() {
  const [selected, setSelected] = useState("monthly");

  const activePlan = plans.find((p) => p.id === selected);
  const IconComponent = activePlan.cardHeader.icon === "zap" ? Zap : Sparkles;

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start max-w-[1100px] mx-auto">

      {/* ── Left Column: Pricing selector ── */}
      <div className="w-full lg:w-[520px] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Heading */}
          <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-2">
            One Pricing, All-Access
          </h2>
          <p className="text-[16px] leading-[1.6] text-colordark/50 mb-10">
            No lock-ins. No minimum seats.
          </p>

          {/* Plan Cards */}
          <div className="flex flex-col gap-3 mb-10">
            {plans.map((plan) => {
              const isActive = selected === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelected(plan.id)}
                  className={`group relative text-left w-full rounded-2xl transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? "bg-white border-colordark/12 shadow-[0_2px_16px_-4px_rgba(15,15,12,0.08)]"
                      : "bg-transparent border-colordark/8 hover:border-colordark/12 hover:bg-colordark/[0.02]"
                  }`}
                  style={{ padding: "20px 24px" }}
                >
                  {/* Radio + Label Row */}
                  <div className="flex items-center gap-3 mb-1.5">
                    {/* Custom Radio */}
                    <span
                      className={`flex items-center justify-center w-[20px] h-[20px] rounded-full border-2 transition-all duration-200 shrink-0 ${
                        isActive
                          ? "border-colordark"
                          : "border-colordark/20 group-hover:border-colordark/30"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="radio-dot"
                          className="w-[10px] h-[10px] rounded-full bg-colordark"
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                      )}
                    </span>
                    <span
                      className={`text-[16px] font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-colordark"
                          : "text-colordark/50 group-hover:text-colordark/70"
                      }`}
                    >
                      {plan.label}
                    </span>
                    {plan.badge && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold tracking-wide border border-emerald-200/60">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 pl-[32px]">
                    <span
                      className={`text-[18px] font-semibold transition-colors duration-200 ${
                        isActive ? "text-colordark" : "text-colordark/40"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-[13px] text-colordark/35 font-medium">
                      / {plan.unit}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <a
            href="/signup"
            className="inline-flex items-center justify-center h-[48px] px-8 rounded-xl bg-colordark text-white text-[15px] font-semibold tracking-tight transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(15,15,12,0.3)] hover:-translate-y-0.5 active:translate-y-0 mb-12"
          >
            Continue with {activePlan.label} Plan
          </a>

          {/* Contact */}
          <div className="text-[14px] text-colordark/50">
            <p className="font-medium text-colordark/70 mb-0.5">
              Need something tailored?
            </p>
            <p>
              Write to us at{" "}
              <a
                href="mailto:contact@yugality.com"
                className="text-colordark/70 underline underline-offset-2 decoration-colordark/20 hover:text-colordark hover:decoration-colordark/40 transition-colors duration-200"
              >
                contact@yugality.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Right Column: Dynamic Benefits card ── */}
      <div className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-colordark/[0.03] border border-colordark/8 rounded-[24px] p-8 lg:p-10"
          >
            {/* Card Header */}
            <div className="flex items-start gap-4 mb-8 pb-7 border-b border-colordark/6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-colordark/5 text-colordark/50 shrink-0 mt-0.5">
                <IconComponent size={18} />
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-colordark leading-snug mb-0.5">
                  {activePlan.cardHeader.title}
                </h3>
                <p className="text-[14px] text-colordark/50 leading-relaxed">
                  {activePlan.cardHeader.subtitle}
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="flex flex-col gap-5">
              {activePlan.benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
                  className="flex items-start gap-3.5 group/item"
                >
                  <div className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-colordark/5 text-colordark/40 shrink-0 group-hover/item:text-colordark group-hover/item:bg-colordark/8 transition-all duration-200">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] text-colordark/60 leading-relaxed font-medium tracking-tight group-hover/item:text-colordark/80 transition-colors duration-200">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
