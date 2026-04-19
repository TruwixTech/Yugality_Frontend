"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import DemoCalendar from "./DemoCalendar";

const benefits = [
  {
    title: "Personalized workflow walkthrough",
    desc: "We\u2019ll show you how Yugality adapts specifically to your firm\u2019s existing processes.",
  },
  {
    title: "Q&A with our legal tech experts",
    desc: "Get straight answers on security, compliance, data migration, and implementation timelines.",
  },
  {
    title: "Custom ROI & pricing assessment",
    desc: "We\u2019ll calculate exactly how much time and money your firm stands to save.",
  },
];

export default function DemoHero() {
  return (
    <section className="relative bg-colorlight py-[120px] px-6 max-md:py-[100px] max-[480px]:py-[80px]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start px-4 md:px-6">

          {/* Left Side Content */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-5">
              Book a demo.{" "}
              <span className="text-colordark/50">
                See how it transforms your practice.
              </span>
            </h1>

            <p className="text-[16px] leading-[1.6] text-colordark/60 mb-12 max-w-lg">
              Discover exactly how leading law firms are leveraging our AI workspace to save 15+ hours a week per attorney while eliminating critical omissions.
            </p>

            <div className="space-y-6">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-colordark/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-colordark/70" />
                  </div>
                  <div>
                    <h4 className="text-[1.0625rem] font-medium text-colordark tracking-tight mb-1">{b.title}</h4>
                    <p className="text-[0.9375rem] leading-[1.6] text-colordark/60">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side Calendar */}
          <motion.div
            className="flex-1 w-full lg:max-w-md xl:max-w-lg lg:sticky lg:top-32"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <DemoCalendar />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
