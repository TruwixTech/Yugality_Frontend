"use client";

import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group p-7 bg-colorlight/2 border border-colorlight/10 rounded-xl transition-all duration-300 hover:bg-colorlight/4 hover:border-colorlight/15 cursor-pointer"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-colorlight/10 text-colorlight mb-5 transition-all duration-300 group-hover:bg-colorlight/15">
        <Icon size={20} strokeWidth={2} />
      </div>
      <h3 className="text-[1.0625rem] font-medium text-colorlight mb-2 tracking-tight">{title}</h3>
      <p className="text-[0.9375rem] font-semibold leading-[1.6] text-colorlight/60">{desc}</p>
    </motion.div>
  );
}
