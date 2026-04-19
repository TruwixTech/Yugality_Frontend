"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const logos = [
    "Acme Corp", "TechStart", "LegalPro", "InnovateLaw", "GlobalFirm",
    "NextGen Legal", "Prime Associates", "Elite Partners", "Vertex Law", "Apex Legal"
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-colordark via-colordark to-colordark px-20 max-md:px-6 max-[480px]:px-5 min-h-screen flex flex-col">
      {/* Background Video from ImageKit */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="https://ik.imagekit.io/5zhbq8jo8/herobgvideo?updatedAt=1773997821491" type="video/mp4" />
        </video>
      </div>
      
      {/* Professional Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-colordark/90 via-colordark/40 to-colordark/90" />
      
      <div className="relative z-20 w-full flex-1 flex items-center">

        <motion.div
          className="max-w-[780px] text-left md:pl-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >



          <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.05] max-md:leading-[1.1] tracking-[-0.04em] text-colorlight mb-6 max-md:mb-5">
            The AI native legal workspace
          </h1>

          <p className="text-[clamp(1.0625rem,2vw,1.1875rem)] leading-[1.65] max-md:leading-[1.6] text-colorlight/75 max-w-[580px] mb-10 max-md:mb-8 font-normal">
            Transform your legal practice into a connected knowledge system that learns, optimizes, and improves itself intelligently.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 max-md:flex-col max-md:items-stretch max-md:w-full">
            <a href="/signup" className="inline-flex items-center justify-center h-13 sm:h-14 max-md:h-12 px-7 sm:px-8 max-md:px-7 rounded-xl text-colordark bg-colorlight text-[15px] sm:text-[16px] font-semibold transition-all duration-300 shadow-[0_8px_30px_rgba(251,251,249,0.12)] hover:shadow-[0_8px_30px_rgba(251,251,249,0.25)] hover:-translate-y-0.5">
              Start for free
            </a>
            <a href="/demo" className="inline-flex items-center justify-center h-13 sm:h-14 max-md:h-12 px-7 sm:px-8 max-md:px-7 rounded-xl bg-colorlight/10 text-colorlight text-[15px] sm:text-[16px] font-semibold transition-all duration-300 hover:bg-colorlight/20 hover:-translate-y-0.5 border border-colorlight/10">
              Book a demo
            </a>
            <a href="/solutions" className="inline-flex items-center justify-center h-13 sm:h-14 max-md:h-12 px-7 sm:px-8 max-md:px-7 rounded-xl bg-colorlight/5 backdrop-blur-sm border border-colorlight/30 text-colorlight text-[15px] sm:text-[16px] font-medium transition-all duration-300 hover:bg-colorlight/10 hover:border-colorlight/50">
              Solutions
            </a>
            <a href="/pricing" className="inline-flex items-center justify-center h-13 sm:h-14 max-md:h-12 px-7 sm:px-8 max-md:px-7 rounded-xl bg-colorlight/5 backdrop-blur-sm border border-colorlight/30 text-colorlight text-[15px] sm:text-[16px] font-medium transition-all duration-300 hover:bg-colorlight/10 hover:border-colorlight/50">
              Pricing
            </a>
          </div>
        </motion.div>

      </div>

      {/* Rotating Logos */}
      <div className="absolute bottom-0 left-0 right-0 w-full py-6 backdrop-blur-xl bg-colordark/50 border-t border-colorlight/10 z-30">
        <div className="w-full">
          <div className="relative overflow-hidden">
            <div className="flex gap-16 animate-marquee">
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="text-[15px] font-medium text-colorlight/80 whitespace-nowrap shrink-0"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
