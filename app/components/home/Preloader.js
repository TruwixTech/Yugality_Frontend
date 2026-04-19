"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only run on the client
    if (typeof window !== "undefined") {
      const isFirstLoad = sessionStorage.getItem("siteLoaded");
      
      if (!isFirstLoad) {
        sessionStorage.setItem("siteLoaded", "true");
        
        // Start fading out after 2 seconds
        const fadeTimer = setTimeout(() => {
          setFading(true);
        }, 2000);

        // Remove from DOM after fade completes (2.5 seconds total)
        const removeTimer = setTimeout(() => {
          setLoading(false);
        }, 2500);

        return () => {
          clearTimeout(fadeTimer);
          clearTimeout(removeTimer);
        };
      } else {
        // Already loaded this session, skip preloader immediately
        setLoading(false);
      }
    }
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-colorlight transition-opacity duration-500 ${fading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Pulsing logo */}
        <div className="w-28 h-28 relative animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]">
          <Image
            src="/logo.jpeg"
            alt="Yugality Logo"
            fill
            className="object-contain rounded-xl"
            priority
          />
        </div>
      </div>
      
      <div className="mt-8 relative overflow-hidden h-4">
         <div className="text-[0.65rem] tracking-[0.2em] font-bold text-colordark uppercase animate-[pulse_2s_ease-in-out_infinite]">
           Yugality
         </div>
      </div>
    </div>
  );
}
