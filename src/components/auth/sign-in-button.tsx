"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "@/lib/auth-client";

export function SignInButton() {
  const { data: session, isPending, error } = useSession();
  const [showButton, setShowButton] = useState(false);

  // Show the sign-in button after a short timeout to avoid loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isPending && !showButton) {
    return <Button disabled>Loading...</Button>;
  }

  if (session) {
    return null;
  }

  if (error) {
    return (
      <Button variant="destructive" disabled>
        Error
      </Button>
    );
  }

  return (
    <Button
      onClick={async () => {
        await signIn.social({
          provider: "google",
          callbackURL: "/dashboard",
        });
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
    >
      Sign in
    </Button>
  );
}
