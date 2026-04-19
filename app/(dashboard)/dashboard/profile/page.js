"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const result = await res.json();
          const userData = result.data;
          setUser(userData);
          setDisplayName(userData.firstName ? `${userData.firstName} ${userData.lastName || ""}`.trim() : userData.name || userData.email?.split("@")[0] || "");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    setMsg({ type: "", text: "" });
    try {
      const res = await fetch("/api/auth/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName })
      });

      if (res.ok) {
        setMsg({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMsg({ type: "error", text: "Failed to update profile." });
      }
    } catch (err) {
      setMsg({ type: "error", text: "An error occurred while saving." });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg({ type: "", text: "" }), 3000);
    }
  };

  const initials = user?.firstName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U";
  
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-from animate-spin" />
        <p className="text-[0.8125rem] font-bold text-colordark/30 uppercase tracking-widest">Loading Profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="px-6 md:px-10 py-8 md:py-10 max-w-2xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[1.75rem] lg:text-[2.25rem] font-bold tracking-[-0.04em] text-colordark mb-1.5 leading-tight">My Profile</h1>
          <p className="text-[0.9375rem] text-colordark/45 font-medium">Customize your professional identity and account settings.</p>
        </div>

        {/* Identity Card */}
        <div className="flex items-center gap-6 p-6 rounded-3xl border border-colordark/[0.06] bg-white shadow-sm mb-10">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-from to-blue-to flex items-center justify-center shrink-0 shadow-lg shadow-blue-from/20 transition-transform group-hover:scale-[1.02]">
              <span className="text-[1.75rem] font-bold text-white tracking-tighter">{initials}</span>
            </div>
            {/* Optional Edit Badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg shadow-sm border border-colordark/5 flex items-center justify-center text-colordark/40">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-[1.25rem] font-bold text-colordark tracking-[-0.02em] leading-tight">
                {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : (user?.name || "Legal Professional")}
            </h2>
            <p className="text-[0.875rem] font-bold text-colordark/35 mt-1">{user?.email}</p>
            <div className="flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full bg-colordark/[0.03] w-fit">
               <div className="w-1 h-1 rounded-full bg-blue-from" />
               <p className="text-[0.6875rem] font-bold text-colordark/40 uppercase tracking-wider">Member since {memberSince}</p>
            </div>
          </div>
        </div>

        {/* Forms Section */}
        <div className="space-y-6">
          <div className="p-7 rounded-3xl border border-colordark/[0.06] bg-white shadow-sm">
            <h3 className="text-[0.9375rem] font-bold text-colordark mb-6 flex items-center gap-2">
                Personal Information
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[0.75rem] font-bold text-colordark/40 uppercase tracking-widest mb-2.5 ml-1">Full Display Name</label>
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Adv. Sahil Verma"
                    className="flex-1 h-12 px-5 border border-colordark/[0.08] rounded-2xl text-[0.9375rem] font-medium text-colordark placeholder:text-colordark/20 focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.06)] transition-all bg-colordark/[0.01]"
                  />
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="h-12 px-8 text-[0.875rem] font-bold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-xl hover:shadow-blue-from/20 rounded-2xl transition-all cursor-pointer disabled:opacity-50 shrink-0 flex items-center justify-center gap-2 min-w-[120px]"
                  >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : "Save Changes"}
                  </button>
                </div>
              </div>

              {msg.text && (
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border animate-in slide-in-from-top-2 duration-300 ${
                    msg.type === "error" ? "bg-red-50 border-red-100 text-red-600" : "bg-emerald-50 border-emerald-100 text-emerald-700"
                }`}>
                  {msg.type === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                  <p className="text-[0.8125rem] font-bold">{msg.text}</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-7 rounded-3xl border border-colordark/[0.06] bg-white shadow-sm opacity-60">
            <div className="flex items-center justify-between mb-2">
                <label className="block text-[0.75rem] font-bold text-colordark/40 uppercase tracking-widest ml-1">Email Address</label>
                <div className="px-2 py-0.5 rounded-md bg-colordark/5 text-[0.625rem] font-bold text-colordark/40 uppercase">Locked</div>
            </div>
            <div className="h-12 px-5 border border-colordark/[0.08] rounded-2xl text-[0.9375rem] font-medium text-colordark/30 flex items-center bg-colordark/[0.02] cursor-not-allowed">
              {user?.email}
            </div>
            <p className="text-[0.75rem] text-colordark/25 font-bold mt-3 italic ml-1">* Secondary security verification required to change email.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
