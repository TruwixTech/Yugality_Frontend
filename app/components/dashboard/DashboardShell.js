"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Bot,
  BookOpen,
  FileEdit,
  Clock,
  Languages,
  LogOut,
  Menu,
  X,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Briefcase", href: "/dashboard/briefcase", icon: Briefcase },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "AI Assistant", href: "/dashboard/ai-assistant", icon: Bot },
  { label: "Research", href: "/dashboard/research", icon: BookOpen },
  { label: "Notepad", href: "/dashboard/notepad", icon: FileEdit },
  { label: "Translation", href: "/dashboard/translation", icon: Languages },
  { label: "Chronology", href: "/dashboard/chronology", icon: Clock },
];

export default function DashboardShell({ children, userEmail }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Inject Google Translate script globally for dashboard
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

  // Persist translation on route change
  useEffect(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      if (match && match[1] === "hi") {
        setTimeout(() => {
          const select = document.querySelector(".goog-te-combo");
          if (select) {
            select.value = "hi";
            select.dispatchEvent(new Event("change"));
          }
        }, 300);
      }
    }
  }, [pathname]);


  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback redirect
      router.push('/login');
    }
  };

  return (
    <div className="flex min-h-screen bg-colorlight">
      {/* ─── Desktop Sidebar (Fixed) ─── */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[260px] h-screen fixed top-0 left-0 bg-colorlight border-r border-colordark/[0.06] z-30">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-5 py-6">
            <a href="/" className="flex items-center gap-3 no-underline">
              <div className="relative w-9 h-9 rounded-none overflow-hidden flex-shrink-0">
                <Image src="/logo.jpeg" alt="Yugality Logo" fill className="object-cover" priority />
              </div>
              <span className="text-[1.0625rem] font-semibold text-colordark tracking-[-0.02em]">Yugality</span>
            </a>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4">
            <div className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.8125rem] font-semibold transition-all duration-200 ${isActive
                      ? 'bg-gradient-to-r from-blue-from to-blue-to text-white shadow-sm shadow-blue-from/20'
                      : 'text-colordark/[0.45] hover:text-colordark hover:bg-colordark/[0.04]'
                      }`}
                  >
                    <Icon size={17} strokeWidth={isActive ? 2 : 1.8} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          {/* User Section */}
          <div className="p-3 mt-auto border-t border-colordark/[0.06]">
            <a
              href="/dashboard/profile"
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-colordark/[0.04] transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-from to-blue-to flex items-center justify-center shrink-0 shadow-sm shadow-blue-from/15">
                <span className="text-[0.75rem] font-bold text-colorlight">
                  {userEmail?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.6875rem] font-semibold text-colordark/30 uppercase tracking-wider leading-none mb-1">Account</p>
                <p className="text-[0.8125rem] font-medium text-colordark/60 truncate">{userEmail}</p>
              </div>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[0.8125rem] font-medium text-colordark/[0.35] hover:text-colordark/[0.6] hover:bg-colordark/[0.04] transition-all duration-200 mt-1 cursor-pointer"
            >
              <LogOut size={16} strokeWidth={1.8} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Mobile Sidebar ─── */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-colordark/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-[260px] bg-colorlight border-r border-colordark/[0.06] z-50 lg:hidden">
            <div className="flex flex-col h-full">
              <div className="px-5 py-6 flex items-center justify-between">
                <a href="/" className="flex items-center gap-3 no-underline">
                  <div className="relative w-9 h-9 rounded-none overflow-hidden flex-shrink-0">
                    <Image src="/logo.jpeg" alt="Yugality Logo" fill className="object-cover" />
                  </div>
                  <span className="text-[1.0625rem] font-semibold text-colordark tracking-[-0.02em]">Yugality</span>
                </a>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 text-colordark/40 hover:text-colordark rounded-lg transition-all cursor-pointer">
                  <X size={18} strokeWidth={2} />
                </button>
              </div>

              <nav className="flex-1 px-3 py-4">
                <div className="space-y-0.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.8125rem] font-semibold transition-all duration-200 ${isActive
                          ? 'bg-gradient-to-r from-blue-from to-blue-to text-white shadow-sm shadow-blue-from/20'
                          : 'text-colordark/[0.45] hover:text-colordark hover:bg-colordark/[0.04]'
                          }`}
                      >
                        <Icon size={17} strokeWidth={isActive ? 2 : 1.8} />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </nav>

              <div className="p-3 mt-auto border-t border-colordark/[0.06]">
                <a href="/dashboard/profile" onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-colordark/[0.04] transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-from to-blue-to flex items-center justify-center shrink-0 shadow-sm shadow-blue-from/15">
                    <span className="text-[0.75rem] font-bold text-colorlight">{userEmail?.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.6875rem] font-semibold text-colordark/30 uppercase tracking-wider leading-none mb-1">Account</p>
                    <p className="text-[0.8125rem] font-medium text-colordark/60 truncate">{userEmail}</p>
                  </div>
                </a>
                <button onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[0.8125rem] font-medium text-colordark/[0.35] hover:text-colordark/[0.6] hover:bg-colordark/[0.04] transition-all duration-200 mt-1 cursor-pointer"
                >
                  <LogOut size={16} strokeWidth={1.8} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ─── Main Content (offset for fixed sidebar) ─── */}
      <main className="flex-1 flex flex-col min-h-screen lg:ml-[260px]">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-colorlight/80 backdrop-blur-md border-b border-colordark/[0.06] px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-none overflow-hidden flex-shrink-0">
                <Image src="/logo.jpeg" alt="Yugality Logo" fill className="object-cover" />
              </div>
              <span className="text-[1rem] font-semibold text-colordark tracking-[-0.01em]">Yugality</span>
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-colordark/50 hover:text-colordark rounded-lg transition-all cursor-pointer"
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
