"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  {
    quote: "Mehta & Associates uses Yugality for greater time savings across their entire legal team.",
    company: "Mehta & Assoc",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    quote: "Yugality helps Sharma Legal Group focus on creating strategic value for clients faster.",
    company: "Sharma Legal",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
  {
    quote: "Vertex Industries completely streamlined their in-house legal review with our platform.",
    company: "Vertex Ind.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
  },
  {
    quote: "GlobalTech slashed compliance review time by 40% using our automated extraction.",
    company: "GlobalTech",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function ImpactVideos() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = direction === "left" ? -880 : 880;

      // Check if we hit the boundaries to loop
      if (direction === "right" && container.scrollLeft + container.clientWidth >= container.scrollWidth - 50) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else if (direction === "left" && container.scrollLeft <= 50) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    if (isHovered) return;
    
    const intervalId = setInterval(() => {
      scroll("right");
    }, 4500); // Auto-scroll every 4.5 seconds

    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
    <div 
      className="w-full mb-32 max-md:mb-24 mt-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-16 px-6 max-w-[1400px] mx-auto w-full">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-medium text-colorlight tracking-[-0.02em]">
          Real impact for real clients
        </h2>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-colorlight/15 flex items-center justify-center text-colorlight/50 hover:text-colorlight hover:border-colorlight/30 transition-all duration-200"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-colorlight/15 flex items-center justify-center text-colorlight/50 hover:text-colorlight hover:border-colorlight/30 transition-all duration-200"
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Carousel */}
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto snap-x snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden scroll-smooth" 
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-6 w-max mx-0">
          
          {/* Universal Left Spacer: Accurately aligns the first video with the 1400px container boundary on large/wide screens */}
          <div className="shrink-0" style={{ width: "max(24px, calc((100vw - 1400px) / 2 + 24px))" }} />

          {videos.map((vid, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[90vw] md:w-[70vw] lg:w-[880px] aspect-[4/3] lg:aspect-[16/9] shrink-0 snap-center lg:snap-start overflow-hidden rounded-xl group cursor-pointer border border-colorlight/10"
            >
              {/* Image Background */}
              <div className="absolute inset-0 bg-colordark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={vid.image} 
                  alt={vid.company} 
                  className="w-full h-full object-cover opacity-[0.45] group-hover:opacity-60 transition-all duration-700 group-hover:scale-105"
                />
              </div>

              {/* Smart Dark Overlay Gradient - Darker at top and bottom for text, clearer in the middle */}
              <div className="absolute inset-0 bg-gradient-to-b from-colordark/95 via-colordark/20 to-colordark/90 transition-colors duration-500" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.02em] text-colorlight/95 max-w-sm lg:max-w-md drop-shadow-md">
                    {vid.quote}
                  </h3>
                </div>
                
                <div className="flex items-end justify-between mt-auto">
                  {/* Play Button */}
                  <div className="w-16 h-16 rounded-full bg-colorlight/10 border border-colorlight/20 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 text-colorlight fill-colorlight ml-1" />
                  </div>
                  
                  {/* Company Watermark / Text */}
                  <div className="text-2xl md:text-3xl font-medium tracking-tight text-colorlight/30 uppercase select-none pb-2">
                    {vid.company}.
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Universal Right Spacer: Ensures you can scroll to the very end with proper padding */}
          <div className="shrink-0" style={{ width: "max(24px, calc((100vw - 1400px) / 2 + 24px))" }} />
        </div>
      </div>
    </div>
  );
}
