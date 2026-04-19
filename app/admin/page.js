"use client";

import { Users, CreditCard, Settings } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminHeader from "@/app/components/admin/AdminHeader";
import AdminTabs from "@/app/components/admin/AdminTabs";
import UsersTab from "@/app/components/admin/UsersTab";
import SubscriptionsTab from "@/app/components/admin/SubscriptionsTab";
import SettingsTab from "@/app/components/admin/SettingsTab";

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(urlTab || "users");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      
      if (user.email === adminEmail) {
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    };

    checkAdminAccess();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-from/20 border-t-blue-from rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-colordark/50 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "users", label: "Users", icon: Users },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", plan: "Pro", status: "Active", joined: "Jan 15, 2024", cases: 12 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", plan: "Enterprise", status: "Active", joined: "Jan 10, 2024", cases: 24 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", plan: "Free", status: "Active", joined: "Jan 20, 2024", cases: 3 },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", plan: "Pro", status: "Inactive", joined: "Dec 28, 2023", cases: 8 },
    { id: 5, name: "Tom Brown", email: "tom@example.com", plan: "Pro", status: "Active", joined: "Jan 5, 2024", cases: 15 },
  ];

  const subscriptions = [
    { id: 1, user: "John Doe", plan: "Pro", amount: "$29/mo", status: "Active", nextBilling: "Feb 15, 2024", method: "Visa •••• 4242" },
    { id: 2, user: "Jane Smith", plan: "Enterprise", amount: "$99/mo", status: "Active", nextBilling: "Feb 10, 2024", method: "Mastercard •••• 5555" },
    { id: 3, user: "Tom Brown", plan: "Pro", amount: "$29/mo", status: "Active", nextBilling: "Feb 5, 2024", method: "Visa •••• 1234" },
    { id: 4, user: "Sarah Williams", plan: "Pro", amount: "$29/mo", status: "Cancelled", nextBilling: "-", method: "Visa •••• 9876" },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-5 py-8 lg:px-8 lg:py-12 min-h-screen">
      <AdminHeader />
      <AdminTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "users" && (
        <UsersTab users={users} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}

      {activeTab === "subscriptions" && (
        <SubscriptionsTab subscriptions={subscriptions} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}

      {activeTab === "settings" && <SettingsTab />}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContent />
    </Suspense>
  );
}
