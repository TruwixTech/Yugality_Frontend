"use client";

import { useParams } from "next/navigation";
import { getSolutionBySlug } from "../solutionData";
import Link from "next/link";
import HeroSection from "@/app/components/solutions/HeroSection";
import NavigateSection from "@/app/components/solutions/NavigateSection";
import WhatItStoresSection from "@/app/components/solutions/WhatItStoresSection";
import HowTeamsUseSection from "@/app/components/solutions/HowTeamsUseSection";
import StatsSection from "@/app/components/solutions/StatsSection";
import WhyItMattersSection from "@/app/components/solutions/WhyItMattersSection";
import UseCasesSection from "@/app/components/solutions/UseCasesSection";
import CTASection from "@/app/components/solutions/CTASection";

export default function SolutionPage() {
  const { slug } = useParams();
  const data = getSolutionBySlug(slug);

  if (!data) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-colorlight pt-24 px-6">
        <h1 className="text-3xl font-medium text-colordark mb-4">
          Solution not found
        </h1>
        <p className="text-colordark/50 mb-8">
          The feature page you&apos;re looking for doesn&apos;t exist yet.
        </p>
        <Link
          href="/solutions"
          className="inline-flex items-center h-11 px-6 rounded-xl text-[14px] font-semibold bg-colordark text-colorlight hover:bg-colordark/90 transition-all duration-300 no-underline"
        >
          View all solutions
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-colorlight">
      <HeroSection data={data} />
      <NavigateSection data={data} />
      <WhatItStoresSection data={data} />
      <HowTeamsUseSection data={data} />
      <StatsSection data={data} />
      <WhyItMattersSection data={data} />
      <UseCasesSection data={data} />
      <CTASection data={data} />
    </main>
  );
}
