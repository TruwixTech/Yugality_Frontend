"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Yugality completely changed the way our firm operates. We used to spend hours sorting through case files and now everything is organized and searchable in seconds. Our team finally has more time to focus on strategy instead of paperwork.",
    name: "Arjun Mehta",
    title: "Managing Partner",
    company: "Mehta & Associates",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600"
  },
  {
    quote: "The AI research assistant is honestly the best tool we have ever used. Finding relevant case law and precedents used to take our associates an entire day. Now it takes less than ten minutes with full citations included.",
    name: "Priya Sharma",
    title: "Senior Advocate",
    company: "Sharma Legal Group",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"
  },
  {
    quote: "We tried several legal tech platforms before switching to Yugality. Nothing else comes close. The document scanning and smart folders alone saved us from hiring two additional paralegals. It just works beautifully.",
    name: "Vikram Patel",
    title: "Legal Director",
    company: "Patel & Rao LLP",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
  },
  {
    quote: "Our clients noticed the difference within the first month. Faster turnaround on every matter, cleaner documentation, and seamless collaboration across our offices in Mumbai and Delhi. Yugality made it all possible.",
    name: "Ananya Desai",
    title: "General Counsel",
    company: "Vertex Industries",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600"
  }
];

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i) => {
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
  };

  const t = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative bg-colorwhite py-[140px] px-6 max-md:py-[100px] max-[480px]:py-[64px]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">

        {/* Section Header */}
        <motion.div
          className="mb-10 max-md:mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[clamp(1.75rem,3vw,2.125rem)] font-medium leading-[1.15] tracking-[-0.02em] text-colordark">
            Trusted by legal teams.{" "}
            <span className="text-colordark/50">
              Read their stories.
            </span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-6 md:gap-6 items-center">

            {/* Left - Photo */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`img-${currentIndex}`}
                custom={direction}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full aspect-[4/5] max-w-[360px] rounded-2xl object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Right - Text content */}
            <div className="flex flex-col justify-center">
              <Quote className="w-10 h-10 text-colordark/15 mb-6 rotate-180" strokeWidth={1} />
              
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`text-${currentIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <blockquote className="text-[clamp(1.125rem,2vw,1.375rem)] font-semibold leading-[1.65] text-colordark/80 mb-10">
                    {t.quote}
                  </blockquote>

                  <div>
                    <div>
                      <div className="text-[15px] font-bold text-colordark">{t.name}</div>
                      <div className="text-[14px] font-bold text-colordark/50 mt-0.5">{t.title}, {t.company}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex ? "w-8 bg-colordark" : "w-1.5 bg-colordark/20 hover:bg-colordark/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
