import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";

export const metadata: Metadata = {
  title: "Dashboard | AIGEP",
  description: "Simple test dashboard",
};

export default async function SimpleDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to AIGEP Dashboard</h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Authentication Successful!</h2>
          <p className="text-green-700">You are successfully logged in as:</p>
          <div className="mt-4 p-4 bg-white rounded border">
            <p><strong>Name:</strong> {session.user.name}</p>
            <p><strong>Email:</strong> {session.user.email}</p>
            <p><strong>ID:</strong> {session.user.id}</p>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <a href="/dashboard/full" className="block text-blue-600 hover:text-blue-800 underline">
            Try Full Dashboard →
          </a>
          <div className="flex justify-center">
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}