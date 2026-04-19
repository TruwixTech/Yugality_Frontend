"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUs() {
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
    <main className="bg-colordark text-colorlight min-h-screen flex flex-col pt-40 lg:pt-48 pb-24 relative overflow-hidden">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-24 mb-10">
          
          {/* Left Column: Text & Details */}
          <div className="flex flex-col">
            <motion.div 
              className="max-w-[500px] mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colorlight mb-5">
                Contact us.{" "}
                <span className="text-colorlight/50">
                  Let&apos;s start a conversation.
                </span>
              </h1>
              <p className="text-[16px] leading-[1.6] text-colorlight/60">
                Have questions about Yugality? Interested in an enterprise deployment? 
                Our team is here to help you revolutionize your legal workflow.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col gap-8 md:gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-colorlight/[0.03] border border-colorlight/10 flex items-center justify-center shrink-0 text-blue-400 group-hover:bg-colorlight/10 group-hover:border-colorlight/20 transition-all duration-300">
                  <Mail size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[17px] font-medium mb-1 tracking-tight">Email us</h3>
                  <p className="text-[14.5px] text-colorlight/50 mb-2 block">Our friendly team is here to help.</p>
                  <a href="mailto:hello@yugality.com" className="text-[15px] font-medium text-colorlight hover:text-blue-400 transition-colors">hello@yugality.com</a>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-colorlight/[0.03] border border-colorlight/10 flex items-center justify-center shrink-0 text-blue-400 group-hover:bg-colorlight/10 group-hover:border-colorlight/20 transition-all duration-300">
                  <MapPin size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[17px] font-medium mb-1 tracking-tight">Office</h3>
                  <p className="text-[14.5px] text-colorlight/50 mb-2 block">Come say hello at our headquarters.</p>
                  <span className="text-[15px] font-medium text-colorlight block">123 Innovation Drive</span>
                  <span className="text-[15px] font-medium text-colorlight block">Suite 400, San Francisco, CA</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-colorlight/[0.03] border border-colorlight/10 flex items-center justify-center shrink-0 text-blue-400 group-hover:bg-colorlight/10 group-hover:border-colorlight/20 transition-all duration-300">
                  <Phone size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[17px] font-medium mb-1 tracking-tight">Phone</h3>
                  <p className="text-[14.5px] text-colorlight/50 mb-2 block">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+15551234567" className="text-[15px] font-medium text-colorlight hover:text-blue-400 transition-colors">+1 (555) 123-4567</a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="bg-colorlight/[0.02] border border-colorlight/10 p-7 sm:p-9 rounded-3xl relative backdrop-blur-md self-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <form className="flex flex-col gap-5 sm:gap-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <motion.div variants={itemVariants} className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-[13.5px] font-medium text-colorlight/80 ml-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full h-[48px] bg-colordark/50 border border-colorlight/10 hover:border-colorlight/20 rounded-xl px-4 text-[14.5px] outline-none focus:border-blue-500 focus:bg-colordark transition-all"
                    placeholder="Jane"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-[13.5px] font-medium text-colorlight/80 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full h-[48px] bg-colordark/50 border border-colorlight/10 hover:border-colorlight/20 rounded-xl px-4 text-[14.5px] outline-none focus:border-blue-500 focus:bg-colordark transition-all"
                    placeholder="Doe"
                  />
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants} className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[13.5px] font-medium text-colorlight/80 ml-1">Work Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full h-[48px] bg-colordark/50 border border-colorlight/10 hover:border-colorlight/20 rounded-xl px-4 text-[14.5px] outline-none focus:border-blue-500 focus:bg-colordark transition-all"
                  placeholder="jane@lawfirm.com"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-2">
                <label htmlFor="company" className="text-[13.5px] font-medium text-colorlight/80 ml-1">Company / Law Firm</label>
                <input 
                  type="text" 
                  id="company" 
                  className="w-full h-[48px] bg-colordark/50 border border-colorlight/10 hover:border-colorlight/20 rounded-xl px-4 text-[14.5px] outline-none focus:border-blue-500 focus:bg-colordark transition-all"
                  placeholder="Doe & Associates"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[13.5px] font-medium text-colorlight/80 ml-1">Message</label>
                <textarea 
                  id="message" 
                  rows="4"
                  className="w-full bg-colordark/50 border border-colorlight/10 hover:border-colorlight/20 rounded-xl p-4 text-[14.5px] outline-none focus:border-blue-500 focus:bg-colordark transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </motion.div>

              <motion.button 
                variants={itemVariants}
                type="button" 
                className="mt-2 h-[52px] w-full rounded-xl bg-colorlight text-colordark font-semibold text-[15px] hover:bg-white transition-all shadow-sm"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
