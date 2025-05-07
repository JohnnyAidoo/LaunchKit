"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function AuthRedirect() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  // Redirect to /app if user is signed in and on root path
  if (pathname === "/" && isLoaded && isSignedIn) {
    window.location.href = "/app";
  }
  return null;
}
