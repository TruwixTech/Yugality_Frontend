"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import PricingCard from "./PricingCard";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for individuals getting started",
    features: [
      "Up to 3 projects",
      "Basic AI assistance",
      "5GB storage",
      "Email support",
      "Basic templates"
    ],
    cta: "Start for free",
    href: "/signup",
    popular: false
  },
  {
    name: "Professional",
    price: "₹2,999",
    period: "per month",
    description: "For professionals and growing teams",
    features: [
      "Unlimited projects",
      "Advanced AI capabilities",
      "100GB storage",
      "Priority support",
      "Custom templates",
      "Team collaboration",
      "Advanced analytics",
      "API access"
    ],
    cta: "Get started",
    href: "/signup",
    popular: true
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-colorwhite py-24 px-6 max-md:py-20 max-[480px]:py-16">
      <div className="max-w-[1100px] mx-auto">
        
        <SectionHeader
          title={<>Simple <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-from to-blue-to">pricing</span></>}
          subtitle="Choose the plan that works for you"
          className="mb-14 max-md:mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[880px] mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

      </div>
    </section>
  );
}
