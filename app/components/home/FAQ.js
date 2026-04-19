"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import FAQItem from "./FAQItem";

const faqs = [
  {
    q: "What is Yugality?",
    a: "Yugality is an AI-powered legal workspace that helps you organize cases, automate research, and build timelines. It's designed to streamline your legal practice and boost productivity."
  },
  {
    q: "How does the AI research assistant work?",
    a: "Our AI research assistant uses advanced natural language processing to analyze legal documents, case law, and statutes. It can summarize findings, identify relevant precedents, and help you build stronger arguments faster."
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use bank-level encryption (AES-256) for all data at rest and in transit. Your data is stored in SOC 2 compliant data centers, and we never share your information with third parties."
  },
  {
    q: "Can I collaborate with my team?",
    a: "Absolutely. Yugality supports real-time collaboration with team chat, file sharing, and shared workspaces. You can assign tasks, leave comments, and track changes across your entire team."
  },
  {
    q: "What file formats are supported?",
    a: "We support all major document formats including PDF, DOCX, TXT, RTF, and more. You can also scan physical documents directly into the platform using our mobile app."
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15
      }
    }
  };

  const faqItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  return (
    <section id="faq" className="relative bg-colorwhite py-[100px] px-6 max-md:py-[80px] max-[480px]:py-[64px]">
      <div className="max-w-[800px] mx-auto">
        
        <SectionHeader
          title={<>Frequently asked <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-from to-blue-to">questions</span></>}
          subtitle="Everything you need to know about Yugality"
          className="mb-16"
        />

        <motion.div
          className="space-y-3"
          variants={faqVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}


