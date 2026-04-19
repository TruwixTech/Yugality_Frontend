"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/lib/validations/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const emailError = validateEmail(email);

    if (emailError) newErrors.email = emailError;
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data)
      localStorage.setItem("token", data?.token);


      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage({ type: "success", text: "Login successful! Redirecting..." });
      router.push("/dashboard");
    } catch (error) {
      // User-friendly error messages
      let errorMessage = error.message;
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Incorrect email or password. Please try again.";
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = "Please confirm your email before logging in. Check your inbox.";
      } else if (error.message.includes('Invalid email')) {
        errorMessage = "Please enter a valid email address.";
      } else if (error.message.includes('User not found')) {
        errorMessage = "No account found with this email. Please sign up first.";
      }
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage({ type: "error", text: "Google login is currently disabled. Please use email." });
  };

  return (
    <div className="flex min-h-screen bg-colordark items-center justify-center p-6">
      <div className="w-full max-w-[420px]">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-colorwhite text-colordark text-[18px] font-bold">
              Y
            </span>
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-[clamp(1.75rem,3vw,2rem)] font-semibold tracking-[-0.02em] leading-[1.2] text-colorlight mb-1.5">
            Welcome back
          </h1>
          <p className="text-[clamp(0.9375rem,1.5vw,1rem)] leading-[1.6] text-colorlight/65">
            Log in to your Yugality account
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div className="mb-3">
            <div className={`p-3 rounded-xl text-[0.875rem] leading-relaxed ${message.type === "error"
              ? "bg-red-500/10 border border-red-500/20 text-red-400"
              : "bg-green-500/10 border border-green-500/20 text-green-400"
              }`}>
              {message.text}
            </div>
          </div>
        )}

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full h-[3rem] bg-colorlight text-colordark text-[0.9375rem] font-medium rounded-xl transition-all duration-200 hover:bg-white hover:-translate-y-0.5 outline-none shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mb-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.01v2.84C3.82 20.53 7.6 23 12 23z" fill="#34A853" /><path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.01C1.34 8.39 1 9.87 1 11.4c0 1.53.34 3.01 1.01 4.34l3.83-1.64z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.6 1 3.82 3.47 2.01 7.06l3.83 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" /></svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-3">
          <div className="flex-1 h-px bg-colorlight/10" />
          <span className="text-[0.8125rem] font-medium text-colorlight/40">or</span>
          <div className="flex-1 h-px bg-colorlight/10" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div>
            <label className="block text-[0.875rem] font-medium text-colorlight/75 mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full h-[3rem] px-4 bg-transparent border rounded-xl text-[0.9375rem] text-colorlight placeholder:text-colorlight/35 outline-none transition-all duration-200 ${errors.email
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-colorlight/20 focus:border-colorlight/50 hover:border-colorlight/30'
                }`}
            />
            {errors.email && <p className="text-[0.8125rem] text-red-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-[0.875rem] font-medium text-colorlight/75 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full h-[3rem] px-4 bg-transparent border rounded-xl text-[0.9375rem] text-colorlight placeholder:text-colorlight/35 outline-none transition-all duration-200 ${errors.password
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-colorlight/20 focus:border-colorlight/50 hover:border-colorlight/30'
                }`}
            />
            {errors.password && <p className="text-[0.8125rem] text-red-400 mt-1">{errors.password}</p>}
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-[0.875rem] text-colorlight/70 hover:text-colorlight no-underline transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[3rem] text-colordark text-[0.9375rem] font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 outline-none bg-colorwhite hover:bg-colorlight shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-[0.9375rem] text-colorlight/65 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-colorlight hover:text-colorwhite no-underline transition-colors duration-200">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
