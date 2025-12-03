import { redirect } from "next/navigation";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import DashboardContent from "./dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | AIGEP",
  description: "Role-based dashboard for AI project governance and compliance",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return <DashboardContent user={session.user} />;
}