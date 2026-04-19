"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const useCases = [
  "Document Storage",
  "Legal Research",
  "Contract Analysis",
  "Complex Workflows",
];

export default function RotatingText() {
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on client side only
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 2000); // Changed to 2 seconds for faster rotation

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Create infinite loop of items
  const getVisibleItems = () => {
    const items = [];
    const range = 4; // Show items above and below
    
    for (let i = -range; i <= range; i++) {
      const index = (offset + i + useCases.length * 100) % useCases.length;
      const position = i;
      
      items.push({
        text: useCases[index],
        position: position,
        id: offset + i // Unique ID for each position
      });
    }
    return items;
  };

  return (
    <section className="relative bg-colorwhite min-h-0 flex items-center justify-center px-6 py-20 max-md:py-16 max-[480px]:py-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full">
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 w-full">
          
          {/* Left side - Static text */}
          <div className="shrink-0 text-left max-md:text-center">
            <p className="text-[17px] font-semibold text-colordark leading-[1.6]">The top legal teams</p>
            <p className="text-[17px] font-semibold text-colordark leading-[1.6]">use Yugality for</p>
          </div>

          {/* Center - Stacked rotating text */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="relative w-full max-w-[600px] h-[280px] md:h-[500px] flex items-center justify-center overflow-hidden">
              {/* Top gradient blur overlay */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-colorwhite to-transparent z-10 pointer-events-none" />
              
              {/* Bottom gradient blur overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-colorwhite to-transparent z-10 pointer-events-none" />
              
              {getVisibleItems().map((item) => {
                const isCurrent = item.position === 0;
                const yPosition = isMobile ? item.position * 60 : item.position * 90;
                
                // Only render items that are within visible range
                if (yPosition < -250 || yPosition > 250) {
                  return null;
                }
                
                return (
                  <motion.div
                    key={item.id}
                    className="absolute inset-0 flex items-center justify-center px-4"
                    initial={{ 
                      y: 400,
                      opacity: 0,
                    }}
                    animate={{
                      y: yPosition,
                      opacity: isCurrent ? 1 : 0.3,
                    }}
                    exit={{
                      y: -400,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    <h2 
                      className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.04em] text-center"
                      style={{
                        color: isCurrent ? '#0f0f0c' : '#0f0f0c',
                        opacity: isCurrent ? 1 : 0.3
                      }}
                    >
                      {item.text}
                    </h2>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right side - CTA button */}
          <div className="shrink-0 max-md:w-full max-md:flex max-md:justify-center">
            <a 
              href="/signup" 
              className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-transparent border border-colordark/20 text-colordark text-[15px] font-medium transition-all hover:bg-colordark/5 hover:border-colordark/30"
            >
              Explore Platform
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}