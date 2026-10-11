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
        {/* =========================================================================
            TASK EARN GLOBAL UNIFIED AMBIENT BACKGROUND
            Ultra-fast, GPU-rasterized organic aurora mesh.
            Replaces heavy DOM blur-[160px] layers & full-viewport backdrop-blur
            for instant 60/120fps scrolling and zero paint latency.
            ========================================================================= */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            backgroundColor: '#FAF9FD',
            backgroundImage: `
              radial-gradient(ellipse 700px 550px at 28% -5%, rgba(139, 92, 246, 0.14) 0%, transparent 70%),
              radial-gradient(ellipse 550px 500px at 92% 5%, rgba(251, 146, 60, 0.13) 0%, transparent 70%),
              radial-gradient(ellipse 600px 600px at -5% 35%, rgba(56, 189, 248, 0.11) 0%, transparent 70%),
              radial-gradient(ellipse 600px 600px at 105% 50%, rgba(52, 211, 153, 0.11) 0%, transparent 70%),
              radial-gradient(ellipse 650px 550px at 35% 72%, rgba(232, 121, 249, 0.12) 0%, transparent 70%),
              radial-gradient(ellipse 700px 500px at 80% 95%, rgba(244, 63, 94, 0.11) 0%, transparent 70%)
            `,
          }}
        />

        <Navbar />
        <main className="flex-1 bg-transparent">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
