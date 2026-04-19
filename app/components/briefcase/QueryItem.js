"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, MoreVertical, ChevronDown } from "lucide-react";

export default function QueryItem({ query, index, isExpanded, onToggle }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-colors ${isExpanded ? "border-blue-from/30 bg-blue-from/[0.02]" : "border-colordark/[0.06]"}`}>
      <button
        className="w-full flex items-start justify-between px-4 sm:px-6 py-3 sm:py-4 cursor-pointer hover:bg-colordark/[0.015] transition-colors text-left"
        onClick={onToggle}
      >
        <h3 className="text-[0.8125rem] sm:text-[0.9375rem] font-semibold text-colordark pr-3 sm:pr-4 leading-snug">
          {index + 1}. {query.question}
        </h3>
        <div className={`shrink-0 p-1 mt-0.5 transition-colors ${isExpanded ? "text-blue-from" : "text-colordark/40"}`}>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <ChevronDown size={16} strokeWidth={2} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="px-4 sm:px-6 pb-4">
              <p className="text-[0.8125rem] sm:text-[0.875rem] text-colordark/70 leading-relaxed mb-4">
                {query.answer}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-colordark/[0.06] pt-3">
                <span className="px-3 py-1 text-[0.75rem] font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-from to-blue-to bg-blue-from/[0.08] rounded-full self-start">
                  {query.tag}
                </span>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[0.8125rem] font-medium text-colordark/50 hover:text-blue-from rounded-lg transition-all cursor-pointer border border-colordark/[0.06] hover:border-blue-from/30 bg-colorlight">
                    <Copy size={13} strokeWidth={2} />
                    Copy
                  </button>
                  <button className="p-1.5 text-colordark/40 hover:text-colordark rounded-lg transition-all cursor-pointer border border-colordark/[0.06] hover:border-colordark/20 bg-colorlight">
                    <MoreVertical size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
