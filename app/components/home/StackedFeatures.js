"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    title: "Voice to text notes",
    description: "Capture thoughts instantly during calls, depositions, and meetings with AI transcription. Our voice engine understands legal terminology natively, formatting dictation into structured, searchable notes.",
  },
  {
    title: "Document scanning",
    description: "Transform paper into organized, searchable digital assets in seconds. Automatically identify document types, extract key entities like dates and clauses, and file everything into the right case folder.",
  },
  {
    title: "Smart reminders",
    description: "Never miss a filing deadline, court appearance, or client follow-up. Yugality analyzes your cases and correspondence to proactively surface upcoming obligations and suggest optimal timelines.",
  },
  {
    title: "Calendar sync",
    description: "Unify every schedule in one intelligent view. Sync with Google Calendar, Outlook, and court scheduling systems for a single, conflict-free timeline with automated prep-time blocking.",
  },
  {
    title: "Research assistant",
    description: "Conduct comprehensive legal research in minutes, not hours. Cross-reference statutes, case law, and secondary sources simultaneously with precisely relevant results and full citation chains.",
  },
  {
    title: "Case notes",
    description: "Maintain structured notes for every case with attorney-designed templates. Tag key arguments, link supporting evidence, and create chronological timelines that auto-populate from your documents.",
  },
  {
    title: "File management",
    description: "Organize thousands of documents with AI-driven smart folders that categorize, tag, and version-control every file. Full-text search finds any clause or exhibit in seconds.",
  },
  {
    title: "Team collaboration",
    description: "Work together seamlessly with real-time co-editing, threaded discussions on documents, and @mention notifications. Audit trails track every change across your entire team.",
  },
  {
    title: "Multi language",
    description: "Handle matters across borders with support for 50+ languages. Translate documents, transcribe multilingual calls, and maintain full search capability regardless of language.",
  },
];

function FeatureCard({ feature, index, theme = "dark" }) {
  const isLight = theme === "light";

  return (
    <motion.div
      id={feature.title.toLowerCase().replace(/\s+/g, '-')}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className={`mb-12 rounded-2xl scroll-mt-[120px] ${isLight ? 'bg-colorlight' : 'bg-colordark'}`}
    >
      <div
        className={`w-full rounded-2xl border overflow-hidden flex flex-col md:flex-row p-8 sm:p-10 lg:p-14 gap-8 md:gap-14 items-stretch ${
          index % 2 !== 0 ? 'md:flex-row-reverse' : ''
        } ${
          isLight 
            ? 'bg-colordark/[0.03] border-colordark/10' 
            : 'bg-colorlight/[0.04] border-colorlight/10'
        }`}
      >
        {/* Text Side */}
        <div className={`flex-1 flex flex-col justify-center py-4 ${
          index % 2 !== 0 ? 'md:pl-10' : ''
        }`}>
          <h2 className={`text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] mb-4 ${
            isLight ? 'text-colordark' : 'text-colorlight'
          }`}>
            {feature.title}
          </h2>
          <p className={`text-[16px] leading-[1.6] mb-8 max-w-lg ${
            isLight ? 'text-colordark/60' : 'text-colorlight/60'
          }`}>
            {feature.description}
          </p>
          <div>
            <a
              href="/signup"
              className={`inline-flex items-center justify-center h-11 px-6 rounded-xl text-[15px] font-medium transition-all duration-300 border ${
                isLight
                  ? 'bg-colordark/5 text-colordark hover:bg-colordark/10 border-colordark/10'
                  : 'bg-colorlight/10 text-colorlight hover:bg-colorlight/20 border-colorlight/10'
              }`}
            >
              Get started
            </a>
          </div>
        </div>

        {/* Screenshot Side */}
        <div className={`flex-[1.2] w-full rounded-2xl overflow-hidden border ${
          isLight ? 'bg-colordark/[0.02] border-colordark/10' : 'bg-colorlight/[0.03] border-colorlight/10'
        }`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/screenshot.jpg"
            alt={`${feature.title} interface`}
            className="w-full h-full object-cover block"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function StackedFeatures({ theme = "dark" }) {
  const isLight = theme === "light";

  return (
    <section className={`relative py-[120px] px-6 max-md:py-[100px] max-[480px]:py-[80px] ${
      isLight ? 'bg-colorlight' : 'bg-colordark'
    }`}>
      <div className="max-w-[1400px] mx-auto">

        {/* Section Header */}
        <motion.div
          className="mb-16 max-md:mb-12 px-4 md:px-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={`text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] ${
            isLight ? 'text-colordark' : 'text-colorlight'
          }`}>
            Everything you need.{" "}
            <span className={isLight ? 'text-colordark/40' : 'text-colorlight/50'}>
              Built for modern legal teams.
            </span>
          </h2>
        </motion.div>

        {/* Features List */}
        <div className="relative px-4 md:px-6 space-y-8">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              index={i}
              feature={feature}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
