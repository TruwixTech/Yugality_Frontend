"use client";

import { motion } from "framer-motion";
import { Target, Shield } from "lucide-react";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <main className="flex flex-col min-h-screen pt-24 bg-colorlight">
      <section className="bg-colorlight text-colordark pt-16 pb-32 md:pb-40 relative overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start max-w-3xl"
            >
              <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-0">
                Redefining knowledge.{" "}
                <span className="text-colordark/50">
                  Built for legal professionals.
                </span>
              </h1>
            </motion.div>

            {/* Paragraphs */}
            <motion.div 
              className="flex flex-col gap-6 max-w-[800px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[16px] leading-[1.6] text-colordark/60">
                Yugality was founded on a simple premise: brilliant legal minds shouldn&apos;t spend their days doing repetitive, manual data extraction. We build cutting edge artificial intelligence that empowers, rather than replaces, human intelligence.
              </p>
              
              <p className="text-[16px] leading-[1.6] text-colordark/60">
                Our core mission is to build the most intuitive and powerful cognitive engine for law firms worldwide. We believe in augmenting the immense capabilities of legal experts with beautifully designed software that simply works and gets out of their way.
              </p>
              
              <p className="text-[16px] leading-[1.6] text-colordark/60">
                In the legal field, security isn&apos;t just a feature; it&apos;s the absolute foundation. That is why Yugality was engineered from the very first line of code with military grade encryption and ultra strict privacy protocols.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Light Section (Matches Landing Page Body) */}
      <section className="bg-colorlight py-[120px] px-6 max-md:py-[100px] max-[480px]:py-[80px] rounded-t-[40px] md:rounded-t-[60px] -mt-10 relative z-20">
        <div className="w-full max-w-[1280px] mx-auto">

          {/* Team Section */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="max-w-[1100px] mx-auto"
          >
            <div className="text-center mb-16 max-w-[600px] mx-auto">
              <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-4">
                Meet the team.
              </h2>
              <p className="text-[16px] leading-[1.6] text-colordark/60 max-w-lg mx-auto">
                We are a dedicated group of innovators, AI researchers, and master designers passionate about bringing state of the art technology to the legal industry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="group flex flex-col items-center">
                <div className="w-full aspect-[4/5] rounded-[32px] bg-colordark/5 mb-6 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="Yug Srivastav" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105" />
                </div>
                <h4 className="text-[1.125rem] text-colordark font-medium tracking-tight">Yug Srivastav</h4>
                <p className="text-[0.9375rem] text-colordark/50 mt-1">Founding Member</p>
              </div>
              
              {/* Team Member 2 */}
              <div className="group flex flex-col items-center">
                <div className="w-full aspect-[4/5] rounded-[32px] bg-colordark/5 mb-6 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" alt="Raman Nagpal" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105" />
                </div>
                <h4 className="text-[1.125rem] text-colordark font-medium tracking-tight">Raman Nagpal</h4>
                <p className="text-[0.9375rem] text-colordark/50 mt-1">Founding Member</p>
              </div>

              {/* Team Member 3 */}
              <div className="group flex flex-col items-center">
                <div className="w-full aspect-[4/5] rounded-[32px] bg-colordark/5 mb-6 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" alt="Bhavesh Chauhan" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105" />
                </div>
                <h4 className="text-[1.125rem] text-colordark font-medium tracking-tight">Bhavesh Chauhan</h4>
                <p className="text-[0.9375rem] text-colordark/50 mt-1">Founding Member</p>
              </div>
            </div>


          </motion.div>

        </div>
      </section>
    </main>
  );
}
