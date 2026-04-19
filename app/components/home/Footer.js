"use client";

import Image from "next/image";
import Link from "next/link";
import FooterLink from "./FooterLink";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-colordark via-colordark to-colordark border-t border-colorlight/10">
      <div className="max-w-[1280px] mx-auto px-6 pt-[72px] pb-8 max-sm:pt-[56px] max-sm:px-4 max-sm:pb-7">

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_2.6fr] gap-12 md:gap-16">
          <div>
            <Link href="/" className="flex items-center gap-3 no-underline mb-6 group">
              <div className="relative w-20 h-20 rounded-none overflow-hidden flex-shrink-0">
                <Image 
                  src="/logo.jpeg" 
                  alt="Yugality Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[22px] font-semibold text-colorlight tracking-[-0.02em]">Yugality</span>
            </Link>
            <p className="text-[14px] text-colorlight/60 leading-[1.65] mb-6 max-w-[400px] md:max-w-[280px]">
              AI powered workspace for documents, research, notes, calendars, and case timelines.
            </p>
            <div className="flex gap-2">
              <a href="#" className="flex items-center justify-center w-9 h-9 rounded-[10px] border border-colorlight/20 text-colorlight/60 bg-transparent transition-all duration-150 hover:text-colorlight hover:border-colorlight/30 hover:bg-colorlight/5" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="flex items-center justify-center w-9 h-9 rounded-[10px] border border-colorlight/20 text-colorlight/60 bg-transparent transition-all duration-150 hover:text-colorlight hover:border-colorlight/30 hover:bg-colorlight/5" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="#" className="flex items-center justify-center w-9 h-9 rounded-[10px] border border-colorlight/20 text-colorlight/60 bg-transparent transition-all duration-150 hover:text-colorlight hover:border-colorlight/30 hover:bg-colorlight/5" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-7 min-[400px]:gap-8 sm:gap-10">
            <div>
              <h4 className="text-[13px] font-semibold text-colorlight mb-5 tracking-[-0.01em]">Product</h4>
              <ul className="flex flex-col gap-3.5 m-0 p-0 list-none">
                <li><FooterLink href="/#features">Features</FooterLink></li>
                <li><FooterLink href="/#faq">FAQ</FooterLink></li>
                <li><FooterLink href="#">Changelog</FooterLink></li>
                <li><FooterLink href="#">Security</FooterLink></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-colorlight mb-5 tracking-[-0.01em]">Resources</h4>
              <ul className="flex flex-col gap-3.5 m-0 p-0 list-none">
                <li><FooterLink href="#">Documentation</FooterLink></li>
                <li><FooterLink href="#">API Reference</FooterLink></li>
                <li><FooterLink href="#">Guides</FooterLink></li>
                <li><FooterLink href="/blog">Blog</FooterLink></li>
                <li><FooterLink href="#">Status</FooterLink></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-colorlight mb-5 tracking-[-0.01em]">Company</h4>
              <ul className="flex flex-col gap-3.5 m-0 p-0 list-none">
                <li><FooterLink href="/about">About Us</FooterLink></li>
                <li><FooterLink href="#">Careers</FooterLink></li>
                <li><FooterLink href="/contact">Contact</FooterLink></li>
                <li><FooterLink href="/privacy">Privacy</FooterLink></li>
                <li><FooterLink href="/terms">Terms</FooterLink></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-px bg-colorlight/10 mt-14 mb-6" />
        <div className="flex items-center justify-between gap-4 flex-wrap max-sm:flex-col max-sm:items-start max-sm:gap-3">
          <p className="text-[13px] text-colorlight/40">&copy; 2026 Yugality, Inc. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
