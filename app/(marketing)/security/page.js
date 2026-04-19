"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, Users, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1];

export default function SecurityPage() {
  return (
    <main className="flex flex-col min-h-screen bg-colorlight">
      {/* Hero Section */}
      <section className="bg-colorlight pt-36 pb-20 md:pt-44 md:pb-28 px-6 relative overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto relative z-[1]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="max-w-3xl"
          >
            <p className="text-[14px] font-semibold text-colordark/50 uppercase tracking-wider mb-6">Security</p>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.04em] text-colordark mb-8">
              For the Most Sensitive Matters
            </h1>
            <p className="text-[17px] md:text-[19px] leading-[1.65] text-colordark/60 mb-10 max-w-md">
              Yugality keeps your client data safe with world-class security and data privacy measures.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl text-[15px] font-semibold bg-colordark text-colorlight hover:bg-colordark/90 transition-all duration-300 no-underline shadow-sm"
            >
              Explore Security Portal
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enterprise-Grade Protection */}
      <section className="bg-colorlight px-6 py-20 md:py-28 border-t border-colordark/6">
        <div className="w-full max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-14"
          >
            Enterprise-Grade Protection
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Dedicated Security Expertise",
                desc: "Yugality's in-house security team spans infrastructure, product, and operations. We implement robust security protections across the stack, with 24/7 coverage and end-to-end monitoring.",
              },
              {
                icon: Lock,
                title: "Data Sovereignty and Control",
                desc: "With Yugality, you retain full control over your data. Decide which data to upload, set retention policies, delete data anytime, and keep everything in-region—India, EU or Switzerland, US, or Australia.",
              },
              {
                icon: Eye,
                title: "No Model Training",
                desc: "Yugality contractually guarantees through our Platform Agreement that your data stays yours. We don't use inputs, outputs, or uploaded documents to train underlying models.",
              },
              {
                icon: FileCheck,
                title: "Enterprise-grade Features",
                desc: "Yugality includes default controls that enterprise teams expect: SAML SSO, audit logs, IP allow-listing, data lifecycle management, and more.",
              },
              {
                icon: Users,
                title: "Enforceable Commitments",
                desc: "Yugality's Security Addendum includes binding terms on data protection, data access, incident response SLAs, and other controls aligned with SOC 2, ISO, GDPR and other standards. Our commitments are auditable, enforceable, and built to exceed standard vendor forms.",
              },
              {
                icon: CheckCircle,
                title: "Independently Tested",
                desc: "Yugality partners with top-tier security firms, including Schellman, NCC Group and Bishop Fox, to perform in-depth audits. This offers external validation that Yugality meets the highest standards of resilience.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                className="flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-colordark/5 flex items-center justify-center text-colordark">
                  <item.icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-[17px] font-semibold text-colordark tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-colordark/60">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Security and Controls - Dark Section */}
      <section className="bg-colordark px-6 py-20 md:py-28 rounded-t-[40px] md:rounded-t-[60px]">
        <div className="w-full max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
            >
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colorlight mb-6">
                Enterprise-grade security and controls
              </h2>
              <p className="text-[16px] leading-[1.65] text-colorlight/60 mb-8">
                Yugality is built on a non-negotiable principle: protecting the security and confidentiality of our customers' data. We've designed our platform from the ground up to safeguard the most sensitive information.
              </p>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center h-11 px-7 rounded-xl text-[14px] font-semibold bg-colorlight text-colordark hover:bg-white transition-all duration-300 no-underline shadow-sm"
              >
                Explore Security Portal
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { label: "SOC 2 Type II", icon: Shield },
                { label: "CCPA", icon: FileCheck },
                { label: "ISO 27001", icon: CheckCircle },
                { label: "GDPR", icon: Lock },
              ].map((cert, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-8 rounded-2xl border border-colorlight/10 bg-colorlight/[0.03] hover:bg-colorlight/[0.06] transition-colors"
                >
                  <cert.icon size={40} strokeWidth={1.5} className="text-colorlight/40 mb-4" />
                  <p className="text-[15px] font-semibold text-colorlight text-center">{cert.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Privacy & User Rights */}
      <section className="bg-colorlight px-6 py-20 md:py-28 border-t border-colordark/6">
        <div className="w-full max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-4">
              Your Data, Your Rights
            </h2>
            <p className="text-[16px] leading-[1.65] text-colordark/60">
              We're committed to transparency and giving you full control over your personal data
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Privacy Notice & Consent",
                desc: "Clear, upfront privacy notices before any data collection. You choose what you share and for what purpose, with full transparency on how your data is used.",
              },
              {
                icon: Eye,
                title: "Data Access & Download",
                desc: "Request and download all your personal data at any time. We provide your data in a portable format within the timeframe specified by law.",
              },
              {
                icon: FileCheck,
                title: "Data Correction & Erasure",
                desc: "Update incorrect information or request complete deletion of your data. We process erasure requests promptly and notify all relevant processors.",
              },
              {
                icon: Users,
                title: "Consent Withdrawal",
                desc: "Withdraw your consent as easily as you gave it. We stop processing immediately and mark your data for deletion as per your instructions.",
              },
              {
                icon: Lock,
                title: "Grievance Redressal",
                desc: "Dedicated grievance officer and support system. Submit concerns through our portal and receive responses within the legally mandated timeframe.",
              },
              {
                icon: CheckCircle,
                title: "Data Retention Control",
                desc: "Transparent retention periods for all data types. Automatic deletion when purposes are fulfilled, with legal-hold exceptions clearly communicated.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-colordark/6 bg-white/50 hover:bg-white transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-colordark/5 flex items-center justify-center text-colordark">
                  <item.icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-[16px] font-semibold text-colordark tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-colordark/60">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center h-11 px-7 rounded-xl text-[14px] font-semibold bg-colordark text-colorlight hover:bg-colordark/90 transition-all duration-300 no-underline shadow-sm"
            >
              View Privacy Policy
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Compliance & Data Protection */}
      <section className="bg-colordark px-6 py-20 md:py-28">
        <div className="w-full max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colorlight mb-4">
              Built for Compliance
            </h2>
            <p className="text-[16px] leading-[1.65] text-colorlight/60">
              Our platform is designed to meet the strictest data protection regulations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Cross-Border Data Transfer",
                desc: "Full transparency on data location and transfers. Choose your data residency region and maintain compliance with local data protection laws.",
              },
              {
                title: "Breach Detection & Notification",
                desc: "Real-time monitoring and incident response. Immediate notification to affected users and regulatory authorities as required by law.",
              },
              {
                title: "Vendor & Processor Management",
                desc: "All third-party processors are contractually bound with Data Processing Agreements. We maintain full accountability for data handling.",
              },
              {
                title: "Security Safeguards",
                desc: "TLS encryption in transit, encryption at rest, OAuth2 authentication, role-based access control, audit logs, and continuous monitoring.",
              },
              {
                title: "Children's Data Protection",
                desc: "Age verification controls and parental consent mechanisms. No tracking, behavioral monitoring, or targeted advertising to children.",
              },
              {
                title: "Data Protection Impact Assessment",
                desc: "Regular DPIAs for high-risk processing activities. Independent audits and technical due diligence for all AI models and algorithms.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                className="flex flex-col gap-3 p-6 rounded-2xl border border-colorlight/10 bg-colorlight/3 hover:bg-colorlight/6 transition-colors"
              >
                <h3 className="text-[16px] font-semibold text-colorlight tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-colorlight/60">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="mt-12 p-8 rounded-2xl border border-colorlight/10 bg-colorlight/3"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-[18px] font-semibold text-colorlight mb-2">
                  Privacy Contact & Grievance Officer
                </h3>
                <p className="text-[14px] text-colorlight/60">
                  Have questions or concerns about your data? Our dedicated privacy team is here to help.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-11 px-7 rounded-xl text-[14px] font-semibold bg-colorlight text-colordark hover:bg-white transition-all duration-300 no-underline shadow-sm whitespace-nowrap"
              >
                Contact Privacy Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security is Fundamental - FAQ Section */}
      <SecurityFAQ />

      {/* CTA Section */}
      <section className="bg-colordark px-6 py-16 md:py-20 border-t border-colorlight/8">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.03em] text-colorlight">
            Unlock Professional-Class AI for Your Firm
          </h2>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center h-11 px-7 rounded-xl text-[14px] font-semibold bg-colorlight text-colordark hover:bg-white transition-all duration-300 no-underline shadow-[0_4px_20px_rgba(251,251,249,0.1)]"
          >
            Request a Demo
          </Link>
        </div>
      </section>
    </main>
  );
}

function SecurityFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does Yugality define customer data?",
      answer: "Customer data includes all information you provide to Yugality, including inputs, outputs, uploaded documents, and any other data you share with our platform. We treat all customer data with the highest level of security and confidentiality.",
    },
    {
      question: "How does Yugality keep my data private and secure?",
      answer: "We employ multiple layers of security including end-to-end encryption, secure data centers, regular security audits, access controls, and 24/7 monitoring. Your data is encrypted both in transit and at rest, and we never use your data to train our models.",
    },
    {
      question: "Where is my data hosted and processed?",
      answer: "Your data is hosted in secure, SOC 2 compliant data centers. You can choose your preferred region (India, EU, US, or Australia) to ensure compliance with local data residency requirements. All data processing happens within your selected region.",
    },
    {
      question: "How do you respect access controls for client data?",
      answer: "Yugality implements role-based access controls (RBAC) and supports SAML SSO integration. You have full control over who can access what data within your organization. We also provide detailed audit logs of all data access.",
    },
    {
      question: "How does Yugality ensure no one is training on my data?",
      answer: "We contractually guarantee through our Platform Agreement that your data stays yours. We never use customer inputs, outputs, or uploaded documents to train underlying AI models. This commitment is auditable and enforceable.",
    },
    {
      question: "Can my firm use our client data for model training?",
      answer: "No. Yugality's platform is designed to keep client data completely separate from any training processes. Your client data is used only to provide services to you and is never used for model training purposes.",
    },
    {
      question: "How often do you perform security audits and vulnerability assessments?",
      answer: "We conduct regular security audits quarterly and perform continuous vulnerability assessments. We also engage third-party security firms including Schellman, NCC Group, and Bishop Fox for independent penetration testing and security reviews.",
    },
  ];

  return (
    <section className="bg-colorlight px-6 py-20 md:py-28 border-t border-colordark/6">
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark mb-4">
              Security is Fundamental to Everything We Do
            </h2>
            <p className="text-[15px] leading-[1.65] text-colordark/60 mb-8">
              We've built a comprehensive system that protects data at every level—from robust user authentication to network monitoring. Our approach combines cutting-edge technology with rigorous protocols, ensuring your data remains secure across the entire legal landscape. We constantly test and improve our defenses, staying ahead of potential threats to maintain the trust our clients place in us.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center h-11 px-7 rounded-xl text-[14px] font-semibold bg-colordark text-colorlight hover:bg-colordark/90 transition-all duration-300 no-underline shadow-sm"
            >
              Explore Security Portal
            </Link>
          </motion.div>

          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                className="border-b border-colordark/8 last:border-b-0"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
                >
                  <span className="text-[15px] font-semibold text-colordark group-hover:text-colordark/70 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <span className={`text-colordark/40 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="pb-5"
                  >
                    <p className="text-[14px] leading-[1.65] text-colordark/60">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
