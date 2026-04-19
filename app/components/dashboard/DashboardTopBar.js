"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Clock, Briefcase } from "lucide-react";

export default function DashboardTopBar({ userName }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      if (match && match[1] === "hi") setLang("HI");
    }

    // Add Google Translate script
    if (typeof window !== "undefined" && !document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en", includedLanguages: "en,hi", autoDisplay: false },
            "google_translate_element"
          );
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLangToggle = () => {
    const newLang = lang === "EN" ? "HI" : "EN";
    setLang(newLang);
    
    // Set cookie for persistence across pages
    const langCode = newLang === "HI" ? "hi" : "en";
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 relative z-40">
      {/* Welcome */}
      <div>
        <p className="text-[0.75rem] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to mb-2 tracking-wide uppercase">
          {today}
        </p>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold tracking-[-0.035em] text-colordark leading-[1.1]">
          {greeting()}{userName ? `, ${userName}` : ""}
        </h1>
        <p className="text-[0.9375rem] text-colordark/45 font-semibold mt-2">
          Here&apos;s what needs your attention today.
        </p>
      </div>

      {/* Search + Notifications */}
      <div className="flex items-center gap-3 relative">
        <div className="relative flex-1 md:flex-initial group">
          <Search size={15} strokeWidth={2.2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-colordark/30 group-focus-within:text-blue-from transition-colors" />
          <input
            type="text"
            placeholder="Search cases..."
            className="w-full md:w-[220px] h-10 pl-10 pr-4 text-[0.8125rem] text-colordark placeholder:text-colordark/30 bg-transparent border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all"
          />
        </div>
        
        <div id="google_translate_element" className="hidden" />

        {/* Switch Toggle EN/HI */}
        <button
          onClick={handleLangToggle}
          className="relative w-16 h-8 rounded-full bg-colordark/[0.04] border border-colordark/[0.08] flex items-center p-1 cursor-pointer shrink-0 transition-colors focus-visible:outline-none focus-visible:border-blue-from/40"
          aria-label="Toggle language"
        >
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] flex items-center justify-center bg-colorwhite rounded-full shadow-[0_2px_4px_rgba(15,15,12,0.1)] transition-transform duration-300 ${
              lang === "HI" ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <span className="text-[0.6875rem] font-bold text-colordark leading-none">
              {lang}
            </span>
          </div>
          <div className="flex-1 text-[0.625rem] font-bold text-colordark/30 text-center leading-none select-none z-0">
            EN
          </div>
          <div className="flex-1 text-[0.625rem] font-bold text-colordark/30 text-center leading-none select-none z-0">
            HI
          </div>
        </button>

        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative w-10 h-10 flex items-center justify-center text-colordark/35 hover:text-blue-from border border-colordark/[0.08] rounded-xl hover:border-blue-from/30 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all cursor-pointer shrink-0"
        >
          <Bell size={17} strokeWidth={2} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-blue-from to-blue-to rounded-full" />
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
            <div className="absolute top-full right-0 mt-3 w-[340px] bg-colorlight border border-colordark/8 rounded-2xl shadow-[0_20px_60px_-10px_rgba(15,15,12,0.15)] z-50 overflow-hidden">
              <div className="px-5 py-4 border-b border-colordark/[0.06] flex items-center justify-between">
                <h3 className="text-[0.9375rem] font-semibold text-colordark tracking-[-0.01em]">Notifications</h3>
                <button onClick={() => setShowNotifications(false)} className="text-[0.75rem] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to hover:opacity-70 transition-opacity cursor-pointer">
                  Mark all read
                </button>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-colordark/[0.04] hover:bg-colordark/[0.02] transition-colors cursor-pointer group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={15} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 className="text-[0.8125rem] font-semibold text-colordark mb-0.5 leading-snug">Deposition tomorrow</h4>
                      <p className="text-[0.75rem] text-colordark/50 leading-snug">Prepare questions for Mr. Johnson.</p>
                      <p className="text-[0.6875rem] text-colordark/25 mt-1.5 font-bold tracking-wider uppercase">10 mins ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 hover:bg-colordark/[0.02] transition-colors cursor-pointer group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/5 text-blue-from flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase size={15} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 className="text-[0.8125rem] font-semibold text-colordark mb-0.5 leading-snug">New Document Shared</h4>
                      <p className="text-[0.75rem] text-colordark/50 leading-snug">Sarah shared &quot;Motion_Draft_v2.docx&quot;.</p>
                      <p className="text-[0.6875rem] text-colordark/25 mt-1.5 font-bold tracking-wider uppercase">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3.5 text-center border-t border-colordark/[0.04]">
                <button className="text-[0.8125rem] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to hover:opacity-70 transition-opacity cursor-pointer">
                  View all notifications
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
