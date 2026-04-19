"use client";

import { motion } from "framer-motion";
import ImpactVideos from "./ImpactVideos";

const stats = [
  { label: "Average hours saved per month", value: "20+" },
  { label: "Professionals using Yugality", value: "100,000+" },
  { label: "Law firms and in-house legal teams using Yugality", value: "1,000+" },
  { label: "Countries Yugality is used in", value: "60" },
];

export default function Impact() {
  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-colordark via-colordark to-colordark pt-[60px] pb-[120px] max-md:pb-[100px] max-[480px]:pb-[80px]">
      
      <ImpactVideos />

      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Heading */}
        <motion.div
          className="text-center mb-20 max-md:mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.3 }}
          transition={{ 
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.03em] text-colorlight">
            Helping teams stay focused<br />and see measurable results
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="space-y-0"
          variants={statsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px", amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statItemVariants}
            >
              <div className="flex items-center justify-between py-10 max-md:py-8 max-md:flex-col max-md:items-start max-md:gap-4">
                <div className="text-[1.125rem] md:text-[1.25rem] font-medium leading-[1.4] text-colorlight/90 max-w-[420px] tracking-[-0.01em]">
                  {stat.label}
                </div>
                <div className="text-[clamp(3rem,6vw,5rem)] font-medium tracking-[-0.04em] text-colorlight shrink-0">
                  {stat.value}
                </div>
              </div>
              {index < stats.length - 1 && (
                <div className="h-px bg-colorlight/20" />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
