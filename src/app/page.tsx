'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCTA from '@/components/HeroCTA';
import JumpTaskHeroCards from '@/components/JumpTaskHeroCards';
import JumpTaskHowItWorks from '@/components/JumpTaskHowItWorks';
import JumpTaskFeaturesShowcase from '@/components/JumpTaskFeaturesShowcase';
import JumpTaskTrustShowcase from '@/components/JumpTaskTrustShowcase';

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-transparent text-slate-900">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-24 bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          {/* Top Pill Tag: Online earning platform */}
          <ScrollReveal direction="down" delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-xs border border-white/80">
              <svg className="h-3.5 w-3.5 text-[#793FFF]" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Online earning platform</span>
            </div>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal direction="up" delay={0.15}>
            <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.08]">
              Earn money online, one simple task at a time
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.25}>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Task Earn is an online earning platform built for anyone. Watch videos, train AI, complete arcade games, or solve speed quizzes – and get rewarded for all of it.
            </p>
          </ScrollReveal>

          {/* CTA Button */}
          <ScrollReveal direction="up" delay={0.35}>
            <HeroCTA />
          </ScrollReveal>

          {/* 3D Floating Hero Cards */}
          <ScrollReveal direction="up" delay={0.45}>
            <JumpTaskHeroCards />
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          2. YOU CAN EARN MONEY IN MINUTES. HERE'S HOW: (JumpTask Interactive Showcase)
          ========================================================================= */}
      <JumpTaskHowItWorks />

      {/* =========================================================================
          3. PICK A TASK. COMPLETE IT. GET PAID. (JumpTask 3D Alternating Showcase)
          ========================================================================= */}
      <JumpTaskFeaturesShowcase />

      {/* =========================================================================
          4. 100% SAFE AND TRUSTED (JumpTask 3D Alternating Trust Showcase)
          ========================================================================= */}
      <JumpTaskTrustShowcase />

      {/* =========================================================================
          5. START EARNING IN THE NEXT 5 MINUTES (High-Aesthetic CTA Banner)
          ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="relative mx-auto max-w-5xl rounded-[40px] bg-gradient-to-br from-[#0F1422] via-[#1A2238] to-[#0A0D15] p-10 sm:p-20 text-center text-white shadow-2xl border border-white/10 overflow-hidden">
          {/* Aesthetic Multi-Spectrum Ambient Glows */}
          <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-r from-[#793FFF]/30 via-[#B5FF24]/20 to-cyan-400/20 rounded-full blur-3xl opacity-80" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-[#793FFF]/20 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-[#B5FF24] backdrop-blur-md border border-white/10">
              <span className="h-2 w-2 rounded-full bg-[#B5FF24] animate-pulse" />
              <span>Instant Access &bull; 100% Free Forever</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Start earning in the next 5 minutes
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Join active earners answering speed quizzes, rating AI, streaming videos, and redeeming verified digital gift cards.
            </p>

            <div className="pt-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B5FF24] hover:bg-[#a6ee1e] px-10 py-4 text-base font-black text-slate-950 shadow-xl shadow-[#B5FF24]/25 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Create free account</span>
                <span>→</span>
              </Link>
            </div>

            {/* Reassurance Pills */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>No credit card required</span>
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Instant email setup</span>
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>100% Free forever</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
