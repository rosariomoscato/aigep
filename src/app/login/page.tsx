import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import ClientLoginPage from "./client-login-page";

export const metadata: Metadata = {
  title: "Sign In | AIGEP",
  description: "Sign in to AIGEP - AI Governance & Ethics Platform",
};

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return <ClientLoginPage />;
}