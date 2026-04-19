"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, ScanText, Clock, CalendarDays, FlaskConical, NotebookPen, FolderOpen, MessageCircle, Languages, ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  { icon: FolderOpen, title: "Legal Briefcase", desc: "Store, scan, and manage all your legal documents in one place.", color: "bg-orange-500", cardBg: "dark" },
  { icon: CalendarDays, title: "Legal Calendar", desc: "Track hearings, deadlines, sync schedules, and get alerts.", color: "bg-orange-500", cardBg: "light" },
  { icon: MessageCircle, title: "Legal AI Assistant", desc: "Speak, write, research, and draft legal work instantly.", color: "bg-orange-500", cardBg: "blue" },
  { icon: FlaskConical, title: "Legal Research Hub", desc: "Search across millions of cases, laws, and documents in seconds.", color: "bg-orange-500", cardBg: "dark" },
  { icon: NotebookPen, title: "Legal Notepad", desc: "Write, organize, and manage all your legal notes clearly.", color: "bg-orange-500", cardBg: "light" },
  { icon: Languages, title: "Legal Translator", desc: "Translate legal documents into multiple languages accurately.", color: "bg-orange-500", cardBg: "blue" },
  { icon: Clock, title: "Chronology Builder", desc: "Automatically create a structured timeline of dates and events.", color: "bg-orange-500", cardBg: "dark" },
];

export default function Features() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".feature-scroll-card")?.offsetWidth || 300;
    el.scrollBy({ left: dir * (cardWidth + 20), behavior: "smooth" });
  };

  return (
    <section
      id="features"
      className="relative bg-colordark py-[120px] px-4 max-md:py-[90px] max-[480px]:py-[72px] border-t border-colorlight/10"
    >
      {/* Header row */}
      <motion.div
        className="max-w-[1400px] mx-auto px-6 md:px-10 mb-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colorlight">
            Everything you need.{" "}
            <span className="text-colorlight/50">
              Take a look at what&apos;s built in.
            </span>
          </h2>

          {/* Navigation arrows */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-colorlight/15 flex items-center justify-center text-colorlight/50 hover:text-colorlight hover:border-colorlight/30 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-colorlight/15 flex items-center justify-center text-colorlight/50 hover:text-colorlight hover:border-colorlight/30 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Scrollable cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto px-6 md:px-10 py-6 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`feature-scroll-card relative snap-start shrink-0 w-[340px] md:w-[400px] h-[460px] rounded-2xl md:rounded-[1.5rem] pt-8 pl-8 pr-8 pb-0 flex flex-col overflow-hidden group transition-all duration-300 ${
                f.cardBg === "dark" 
                  ? "bg-gradient-to-br from-colordark to-colordark/95 border border-colorlight/10 hover:border-colorlight/20" 
                  : f.cardBg === "blue"
                  ? "bg-gradient-to-br border border-[#A0D9EF]/60 hover:border-[#A0D9EF]/80"
                  : "bg-gradient-to-br from-colorlight to-colorwhite border border-colordark/10 hover:border-colordark/20"
              }`}
              style={f.cardBg === "blue" ? { 
                background: "linear-gradient(to bottom right, #D4EEF7, #A0D9EF)" 
              } : {}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Icon — top left */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-6 shadow-sm ${
                f.cardBg === "blue" ? "bg-colordark text-colorlight" : f.cardBg === "light" ? "bg-colordark text-colorlight" : "bg-colorlight text-colordark"
              }`}>
                <Icon icon={f.icon} />
              </div>

              {/* Title */}
              <h3 className={`text-[1.375rem] font-medium mb-3 tracking-tight capitalize ${
                f.cardBg === "blue" ? "text-colordark" : f.cardBg === "dark" ? "text-colorlight" : "text-colordark"
              }`}>
                {f.title}
              </h3>

              {/* Description */}
              <p className={`text-[1.0625rem] font-semibold leading-[1.6] line-clamp-3 ${
                f.cardBg === "blue" ? "text-colordark/70" : f.cardBg === "dark" ? "text-colorlight/60" : "text-colordark/60"
              }`}>
                {f.desc}
              </p>

              {/* Image at bottom */}
              <div className={`mt-8 flex-1 relative w-[calc(100%+32px)] border-t border-l rounded-tl-xl overflow-hidden shadow-2xl ${
                f.cardBg === "blue" ? "border-colordark/15" : f.cardBg === "dark" ? "border-colorlight/15" : "border-colordark/15"
              }`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/screenshot.jpg" 
                  alt="App Interface Preview" 
                  className="absolute top-0 left-0 w-[600px] max-w-none h-auto object-cover object-left-top"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Icon({ icon: IconComponent }) {
  return <IconComponent size={20} strokeWidth={2} />;
}
