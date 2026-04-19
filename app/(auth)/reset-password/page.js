"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validatePassword, validateConfirmPassword } from "@/lib/validations/auth";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    const newErrors = {};
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setMessage({ type: "", text: "" });

    try {
      // Mock password update for now
      // This should ideally call a backend API with a token from the URL
      setMessage({ 
        type: "success", 
        text: "Password updated successfully! Redirecting to login..." 
      });
      
      setTimeout(() => router.push("/login"), 2000);
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
            Reset password
          </h1>
          <p className="text-[clamp(0.9375rem,1.5vw,1rem)] leading-[1.6] text-colorlight/65">
            Enter your new password below
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
            <label className="block text-[0.875rem] font-medium text-colorlight/75 mb-2">New Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className={`w-full h-[3rem] px-4 bg-transparent border rounded-xl text-[0.9375rem] text-colorlight placeholder:text-colorlight/35 outline-none transition-all duration-200 ${
                errors.password 
                  ? 'border-red-500/50 focus:border-red-500' 
                  : 'border-colorlight/20 focus:border-colorlight/50 hover:border-colorlight/30'
              }`}
            />
            {errors.password && <p className="text-[0.8125rem] text-red-400 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-[0.875rem] font-medium text-colorlight/75 mb-2">Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••" 
              className={`w-full h-[3rem] px-4 bg-transparent border rounded-xl text-[0.9375rem] text-colorlight placeholder:text-colorlight/35 outline-none transition-all duration-200 ${
                errors.confirmPassword 
                  ? 'border-red-500/50 focus:border-red-500' 
                  : 'border-colorlight/20 focus:border-colorlight/50 hover:border-colorlight/30'
              }`}
            />
            {errors.confirmPassword && <p className="text-[0.8125rem] text-red-400 mt-1">{errors.confirmPassword}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-[3rem] text-colordark text-[0.9375rem] font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 outline-none bg-colorwhite hover:bg-colorlight shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>

      </div>
    </div>
  );
}
