"use client";

import { useState, useEffect, useCallback } from "react";
import CriticalDeadlines from "@/app/components/dashboard/CriticalDeadlines";
import TodaysTasks from "@/app/components/dashboard/TodaysTasks";
import RecentActivity from "@/app/components/dashboard/RecentActivity";
import UpcomingHearings from "@/app/components/dashboard/UpcomingHearings";
import MiniCalendar from "@/app/components/dashboard/MiniCalendar";
import QuickActionsFAB from "@/app/components/dashboard/QuickActionsFAB";
import StatsRow from "@/app/components/dashboard/StatsRow";
import DashboardTopBar from "@/app/components/dashboard/DashboardTopBar";
import LatestNews from "@/app/components/dashboard/LatestNews";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [userRes, summaryRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/dashboard/summary')
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.data);
      }

      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        setSummary(summaryData.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const userName = user ? (user.firstName || user.name?.split(" ")[0] || user.email?.split("@")[0]) : "";
  const formattedUserName = userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : "";

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-colorlight/30">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-blue-from animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-from rounded-full" />
          </div>
        </div>
        <p className="text-[0.875rem] font-semibold text-colordark/40 animate-pulse tracking-wide uppercase">Preparing your Workspace</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="px-6 md:px-10 py-8 md:py-10">
        <DashboardTopBar userName={formattedUserName} />
        
        <StatsRow stats={summary?.stats} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Main Column */}
          <div className="flex flex-col gap-6">
            <UpcomingHearings hearings={summary?.upcomingEvents} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TodaysTasks tasks={summary?.todaysEvents} />
              <CriticalDeadlines data={summary?.criticalDeadlines} />
            </div>

            <RecentActivity activities={summary?.activities} />
          </div>

          {/* Sidebar Column */}
          <div className="flex flex-col gap-6">
            <MiniCalendar events={summary?.monthEvents} />
            <LatestNews />
          </div>
        </div>
      </div>
      
      <QuickActionsFAB />
    </div>
  );
}
