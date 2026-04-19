"use client";

import { motion } from "framer-motion";

export default function ProductDemo() {
  return (
    <section className="relative bg-colorwhite py-[120px] px-6 max-md:py-[100px] max-[480px]:py-[80px]">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Heading */}
        <motion.div
          className="text-left mb-8 max-w-[1150px]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.3 }}
          transition={{ 
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to">AI designed</span> for legal professionals.
            <br />
            <span className="text-colordark/40">
              Focus on high-value work.
            </span>
          </h2>
        </motion.div>

        {/* Video Demo Placeholder */}
        <motion.div
          className="w-full aspect-video rounded-2xl bg-[#1a1a1a] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px", amount: 0.2 }}
          transition={{ 
            duration: 0.9, 
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {/* Placeholder for video demo */}
        </motion.div>

      </div>
    </section>
  );
}
