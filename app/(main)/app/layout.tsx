import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "../../globals.css";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during font load
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Viewport configuration for better mobile experience
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
  colorScheme: "light dark",
};

// Enhanced metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    template: "%s | EzyTube",
    default: "EzyTube - Chat with Youtube Videos",
  },
  description:
    "Transform your video experience with EzyTube. Share, discover, and engage with amazing content from creators worldwide.",
  keywords: [
    "video sharing",
    "content creation",
    "streaming",
    "entertainment",
    "creators",
  ],
  authors: [{ name: "EzyTube Team" }],
  creator: "EzyTube",
  publisher: "EzyTube",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EzyTube",
    title: "EzyTube - Chat with Youtube Videos",
    description:
      "Transform your video experience with EzyTube. Share, discover, and engage with amazing content from creators worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EzyTube Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EzyTube - Chat with Youtube Videos",
    description:
      "Transform your video experience with EzyTube. Share, discover, and engage with amazing content from creators worldwide.",
    images: ["/og-image.png"],
    creator: "@ezytube",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};
// ok
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  // Server-side subscription check with error handling
  let hasActiveSubscription = false;

  try {
    const url = new URL(
      "/api/check-subscription",
      process.env.NEXT_PUBLIC_BASE_URL
    );
    url.searchParams.set("userId", userId!);

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) throw new Error("Subscription check failed");

    const data = await response.json();
    hasActiveSubscription = data.hasActiveSubscription;
  } catch (error) {
    console.error("Error checking subscription:", error);
  }

  // Redirect if no active subscription
  if (!hasActiveSubscription) {
    redirect("/pricing");
  }

  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <main id="main-content" className="px-20">
          {children}
        </main>
      </body>
    </html>
  );
}
