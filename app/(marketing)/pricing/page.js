"use client";

import { motion } from "framer-motion";
import PricingSelector from "@/app/components/pricing/PricingSelector";

export default function PricingPage() {
  return (
    <main className="flex flex-col min-h-screen pt-24 bg-colorlight">
      {/* Light Hero Section */}
      <section className="bg-colorlight text-colordark pt-16 pb-32 md:pb-40 relative overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 relative z-[1]">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start max-w-3xl"
          >
            <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-4">
              Simple pricing. <br />
              <span className="text-colordark/40">
                Built for modern legal teams.
              </span>
            </h1>
            <p className="text-[18px] leading-[1.6] text-colordark/60 max-w-xl">
              Transparent, flexible plans designed to scale with your practice. 
              Choose the perfect workspace for your firm's needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Light Content Section with overlap */}
      <section className="bg-colorlight py-[120px] px-6 max-md:py-[100px] max-[480px]:py-[80px] rounded-t-[40px] md:rounded-t-[60px] -mt-10 relative z-[2]">
        <div className="w-full max-w-[1280px] mx-auto">
          <PricingSelector />
        </div>
      </section>
    </main>
  );
}
