import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Header from "../components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        url: "https://r3tv2xmek0.ufs.sh/f/4gNoDWR6F1kqBz8ZA2VSiUIONBd2R8n9qfuZ56HAxbVwpEXh",
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
    images: [
      "https://r3tv2xmek0.ufs.sh/f/4gNoDWR6F1kqBz8ZA2VSiUIONBd2R8n9qfuZ56HAxbVwpEXh",
    ],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInForceRedirectUrl="/app">
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* App Header with Clerk */}
          <Header
            signInButton={
              <>
                <SignedOut>
                  <SignInButton>
                    <button className="btn btn-primary shadow-none">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            }
          />

          {/* Main App Content */}
          {children}
        </body>

        {/* Just in case you're using next/third-parties Google */}
        <GoogleAnalytics gaId="G-6Y3ZPYW79W" />
      </html>
    </ClerkProvider>
  );
}
