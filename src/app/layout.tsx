import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Earn — Complete Micro-Tasks, Watch Videos, Train AI & Earn",
  description:
    "Earn rewards by taking speed quizzes, watching YouTube videos, training AI models, playing games, and submitting POV videos. Redeem instant gift cards and vouchers.",
  keywords: ["task earn", "quizzes", "rewards", "watch to earn", "train ai", "play to earn", "pov videos", "gift cards"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative text-slate-900 selection:bg-[#793FFF]/20 selection:text-[#793FFF] bg-[#FAF9FD]">
        {/* =========================================================================
            TASK EARN GLOBAL UNIFIED AMBIENT BACKGROUND
            Clear-whitish canvas with softly blended, colorful organic aurora patches
            applied everywhere across the entire application.
            ========================================================================= */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {/* Base clear-whitish canvas */}
          <div className="absolute inset-0 bg-[#FAF9FD]" />

          {/* Radiant Violet / Purple Patch (Top center / left) */}
          <div className="absolute -top-32 left-1/4 w-[650px] h-[550px] rounded-full bg-gradient-to-tr from-violet-400/25 via-purple-300/20 to-indigo-400/20 blur-[140px]" />

          {/* Sunrise Peach / Warm Amber Patch (Top right) */}
          <div className="absolute top-10 right-0 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-amber-300/25 via-orange-300/20 to-rose-300/20 blur-[140px]" />

          {/* Electric Sky Cyan / Turquoise Patch (Mid left) */}
          <div className="absolute top-[35%] -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-400/20 via-sky-300/20 to-blue-400/20 blur-[150px]" />

          {/* Neon Mint / Emerald Patch (Mid right) */}
          <div className="absolute top-[50%] -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-emerald-300/20 via-teal-300/20 to-lime-200/20 blur-[150px]" />

          {/* Radiant Lavender / Fuchsia Bloom (Lower mid) */}
          <div className="absolute top-[70%] left-1/3 w-[650px] h-[550px] rounded-full bg-gradient-to-tr from-fuchsia-400/20 via-purple-300/20 to-pink-300/20 blur-[160px]" />

          {/* Sunset Coral & Gold (Bottom) */}
          <div className="absolute -bottom-20 right-1/4 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-rose-400/20 via-amber-300/20 to-violet-300/20 blur-[150px]" />

          {/* Frosted Translucent Veil: soft milky-white diffusion */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[40px]" />
        </div>

        <Navbar />
        <main className="flex-1 bg-transparent">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
