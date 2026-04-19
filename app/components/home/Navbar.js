"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "./navLinks";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isLightPage = pathname === "/solutions" || pathname.startsWith("/solutions/") || pathname.startsWith("/blog") || pathname === "/demo" || pathname === "/about" || pathname === "/pricing" || pathname === "/security";

  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const shouldBeLight = scrolled || isLightPage;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        shouldBeLight ? 'bg-colorwhite/95 backdrop-blur-xl shadow-sm' : 'bg-transparent'
      }`}>
        <div className="w-full px-12 max-md:px-5 h-[72px] max-md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 no-underline group">
              <div className="relative w-8 h-8 rounded-none overflow-hidden flex-shrink-0">
                <Image 
                  src="/logo.jpeg" 
                  alt="Yugality Logo" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className={`text-[21px] font-semibold tracking-[-0.03em] transition-all duration-300 ${
                shouldBeLight ? 'text-colordark' : 'text-colorlight'
              }`}>Yugality</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <div 
                key={l.label} 
                className="relative"
                onMouseEnter={() => l.isDropdown && setSolutionsOpen(true)}
                onMouseLeave={() => l.isDropdown && setSolutionsOpen(false)}
              >
                {l.isDropdown ? (
                  <span 
                    className={`px-4 py-2 text-[15px] cursor-default font-semibold no-underline rounded-lg transition-all duration-300 ${
                      shouldBeLight 
                        ? 'text-colordark/70 hover:text-colordark' 
                        : 'text-colorlight/80 hover:text-colorlight'
                    }`}
                  >
                    {l.label}
                  </span>
                ) : (
                  <Link 
                    href={l.href} 
                    className={`px-4 py-2 text-[15px] font-semibold no-underline rounded-lg transition-all duration-300 ${
                      shouldBeLight 
                        ? 'text-colordark/70 hover:text-colordark' 
                        : 'text-colorlight/80 hover:text-colorlight'
                    }`}
                  >
                    {l.label}
                  </Link>
                )}

                {l.isDropdown && (
                  <AnimatePresence>
                    {solutionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-[72px] left-0 right-0 w-full overflow-hidden flex justify-center pt-2 pointer-events-none"
                      >
                        <div 
                          className="w-[calc(100vw-120px)] max-w-6xl bg-white rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.12)] border border-colordark/5 p-10 lg:p-12 flex gap-10 lg:gap-16 overflow-hidden pointer-events-auto"
                          onMouseEnter={() => setSolutionsOpen(true)}
                          onMouseLeave={() => setSolutionsOpen(false)}
                        >
                          {/* Categories Side */}
                          <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-6">
                            {l.subLinks.map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                className="group no-underline block"
                                onClick={() => {
                                  setSolutionsOpen(false);
                                  // Force navigation and scroll if hash matches
                                  if (sub.href.startsWith(pathname + '#')) {
                                    const id = sub.href.split('#')[1];
                                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }}
                              >
                                <h4 className="text-[14px] font-semibold text-colordark mb-1 transition-colors group-hover:text-blue-from">
                                  {sub.label}
                                </h4>
                                <p className="text-[12px] text-colordark/45 leading-relaxed group-hover:text-colordark/60 transition-colors">
                                  {sub.description}
                                </p>
                              </a>
                            ))}
                          </div>

                          {/* Featured Side */}
                          <div className="w-[320px] shrink-0 border-l border-colordark/5 pl-10 lg:pl-16 flex flex-col justify-center">
                            <div className="relative w-full aspect-[1.7/1] rounded-2xl overflow-hidden mb-6 border border-colordark/5 shadow-sm">
                              <Image 
                                src={l.featured.image} 
                                alt={l.featured.title} 
                                fill 
                                className="object-cover"
                              />
                            </div>
                            <h3 className="text-[16px] font-semibold text-colordark mb-1.5 tracking-tight">
                              {l.featured.title}
                            </h3>
                            <p className="text-[13px] text-colordark/50 leading-relaxed mb-4">
                              {l.featured.description}
                            </p>
                            <Link 
                              href={l.featured.href} 
                              className="text-[13px] font-semibold text-colordark hover:text-blue-from transition-colors flex items-center gap-1.5"
                              onClick={() => setSolutionsOpen(false)}
                            >
                              Explore solutions
                              <span className="text-[11px] opacity-50">→</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            {user ? (
              <a 
                href="/dashboard" 
                className={`hidden md:inline-flex items-center h-10 px-5 text-[15px] font-semibold no-underline rounded-lg transition-all duration-300 ${
                  shouldBeLight
                    ? 'text-colorlight bg-colordark hover:bg-colordark/90 shadow-sm'
                    : 'text-colordark bg-colorlight hover:bg-white shadow-[0_4px_20px_rgba(251,251,249,0.15)]'
                }`}
              >
                Dashboard
              </a>
            ) : (
              <>
                <a 
                  href="/login" 
                  className={`hidden md:inline-flex items-center h-10 px-5 text-[15px] font-semibold no-underline rounded-lg transition-all duration-300 ${
                    shouldBeLight
                      ? 'text-colordark/70 hover:text-colordark hover:bg-colordark/5'
                      : 'text-colorlight/80 hover:text-colorlight hover:bg-colorlight/10'
                  }`}
                >
                  Log In
                </a>
                <a href="/signup" className={`hidden md:inline-flex items-center h-10 px-5 text-[15px] font-semibold no-underline rounded-lg transition-all duration-300 ${
                  shouldBeLight
                    ? 'text-colorlight bg-colordark hover:bg-colordark/90 shadow-sm'
                    : 'text-colordark bg-colorlight hover:bg-white shadow-[0_4px_20px_rgba(251,251,249,0.15)]'
                }`}>
                  Sign Up
                </a>
              </>
            )}
            
            <button className={`flex md:hidden p-2 cursor-pointer transition-all duration-300 rounded-lg ${
              shouldBeLight ? 'text-colordark hover:bg-colordark/5' : 'text-colorlight hover:bg-colorlight/10'
            }`} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop with fade animation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-colordark/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Slide-in Menu */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-full bg-colordark border-l border-colorlight/10 z-50 md:hidden shadow-2xl overflow-y-auto"
            >
              <div className="p-6 flex flex-col min-h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-2.5 no-underline group">
                    <div className="relative w-8 h-8 rounded-none overflow-hidden flex-shrink-0">
                      <Image 
                        src="/logo.jpeg" 
                        alt="Yugality Logo" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[20px] font-bold text-colorlight tracking-[-0.02em] no-underline">Yugality</span>
                  </Link>
                  <button onClick={() => setMobileOpen(false)} className="p-1.5 text-colorlight cursor-pointer hover:bg-colorlight/10 rounded-lg transition-colors">
                    <X size={20} />
                  </button>
                </div>
                
                <nav className="flex flex-col gap-1 mb-8">
                  {navLinks.map((l) => (
                    <div key={l.label}>
                      {l.isDropdown ? (
                        <>
                          <div className="p-3.5 px-4 text-[15px] font-bold text-colorlight/40 uppercase tracking-widest mt-4 mb-2">
                            {l.label}
                          </div>
                          {l.subLinks.map((sub) => (
                            <Link 
                              key={sub.label} 
                              href={sub.href} 
                              className="p-3.5 px-6 no-underline rounded-xl transition-all hover:bg-colorlight/5 flex flex-col gap-0.5"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span className="text-[15px] font-semibold text-colorlight flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-from/40" />
                                {sub.label}
                              </span>
                              <span className="text-[12px] text-colorlight/35 pl-3.5">
                                {sub.description}
                              </span>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <Link 
                          href={l.href} 
                          className="p-3.5 px-4 text-[15px] font-semibold text-colorlight no-underline rounded-xl transition-all hover:bg-colorlight/5 hover:translate-x-1"
                          onClick={() => setMobileOpen(false)}
                        >
                          {l.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                
                <div className="flex flex-col gap-3 mt-auto pt-8">
                  {user ? (
                    <a href="/dashboard" className="flex items-center justify-center h-11 rounded-full text-colordark bg-colorwhite text-[14px] font-semibold no-underline hover:bg-colorlight transition-colors">
                      Dashboard
                    </a>
                  ) : (
                    <>
                      <a href="/login" className="flex items-center justify-center h-11 rounded-full bg-transparent border border-colorlight/20 text-[14px] font-semibold text-colorlight no-underline transition-all hover:bg-colorlight/5 hover:border-colorlight/40">
                        Log In
                      </a>
                      <a href="/signup" className="flex items-center justify-center h-11 rounded-full text-colordark bg-colorwhite text-[14px] font-semibold no-underline hover:bg-colorlight transition-colors">
                        Sign Up
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
