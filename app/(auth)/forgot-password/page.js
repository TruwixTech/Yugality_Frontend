"use client";

import { useState } from "react";
import Link from "next/link";
import { validateEmail } from "@/lib/validations/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setLoading(true);
    setErrors({});
    setMessage({ type: "", text: "" });

    try {
      // Mock reset password for now
      setMessage({ 
        type: "success", 
        text: "Password reset functionality is currently handled by the backend. Contact support if needed." 
      });
      setEmail("");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-colordark items-center justify-center p-6">
      <div className="w-full max-w-[420px]">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-colorwhite text-colordark text-[18px] font-bold">
              Y
            </span>
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-[clamp(1.75rem,3vw,2rem)] font-semibold tracking-[-0.02em] leading-[1.2] text-colorlight mb-2">
            Forgot password?
          </h1>
          <p className="text-[clamp(0.9375rem,1.5vw,1rem)] leading-[1.6] text-colorlight/65">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div className="mb-3">
            <div className={`p-3 rounded-xl text-[0.875rem] leading-relaxed ${
              message.type === "error" 
                ? "bg-red-500/10 border border-red-500/20 text-red-400" 
                : "bg-green-500/10 border border-green-500/20 text-green-400"
            }`}>
              {message.text}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[0.875rem] font-medium text-colorlight/75 mb-2">Email address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              className={`w-full h-[3rem] px-4 bg-transparent border rounded-xl text-[0.9375rem] text-colorlight placeholder:text-colorlight/35 outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-red-500/50 focus:border-red-500' 
                  : 'border-colorlight/20 focus:border-colorlight/50 hover:border-colorlight/30'
              }`}
            />
            {errors.email && <p className="text-[0.8125rem] text-red-400 mt-1">{errors.email}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-[3rem] text-colordark text-[0.9375rem] font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 outline-none bg-colorwhite hover:bg-colorlight shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-[0.9375rem] text-colorlight/65 mt-6">
          Remember your password?{" "}
          <Link href="/login" className="font-semibold text-colorlight hover:text-colorwhite no-underline transition-colors duration-200">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
