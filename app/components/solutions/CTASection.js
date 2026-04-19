"use client";

import Link from "next/link";

export default function CTASection({ data }) {
  const cta = data.cta;
  
  return (
    <section className="bg-colordark px-6 py-16 md:py-20 border-t border-colorlight/8">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.03em] text-colorlight">
          {cta.heading}
        </h2>
        <Link
          href={cta.buttonHref}
          className="inline-flex items-center justify-center h-11 px-7 rounded-xl text-[14px] font-semibold bg-colorlight text-colordark hover:bg-white transition-all duration-300 no-underline shadow-[0_4px_20px_rgba(251,251,249,0.1)]"
        >
          {cta.buttonText}
        </Link>
      </div>
    </section>
  );
}
