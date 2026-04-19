import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardShell from "@/app/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  let user = null;

  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      user = data.data;
    }
  } catch (err) {
    console.error("Layout user fetch error:", err);
  }

  return (
    <DashboardShell 
      userEmail={user?.email || "user@yugality.com"} 
      userName={(user?.firstName || user?.name) || "Legal Professional"}
    >
      {children}
    </DashboardShell>
  );
}
