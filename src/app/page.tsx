'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCTA from '@/components/HeroCTA';
import JumpTaskHeroCards from '@/components/JumpTaskHeroCards';

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white text-slate-900">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          {/* Top Pill Tag: Online earning platform */}
          <ScrollReveal direction="down" delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-xs">
              <svg className="h-3.5 w-3.5 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
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
          2. YOU CAN EARN MONEY IN MINUTES. HERE'S HOW: (Super Cool Joyful Finish)
          ========================================================================= */}
      <section
        id="how-it-works"
        className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5FF] to-[#F0F7FF] border-y border-purple-100/70"
      >
        {/* Joyful Ambient Aura Blobs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-r from-amber-200/40 via-purple-300/35 to-sky-200/40 rounded-full blur-3xl opacity-80" />
        <div className="pointer-events-none absolute top-1/2 -left-24 w-80 h-80 bg-rose-200/45 rounded-full blur-3xl opacity-70" />
        <div className="pointer-events-none absolute bottom-0 -right-24 w-80 h-80 bg-emerald-200/45 rounded-full blur-3xl opacity-70" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-black tracking-wide text-[#793FFF] shadow-xs border border-purple-200/80">
              <span className="flex h-2 w-2 rounded-full bg-[#793FFF] animate-ping" />
              <span className="uppercase text-[11px] tracking-wider">How It Works</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
              You can earn money online in minutes.{' '}
              <span className="bg-gradient-to-r from-[#793FFF] via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Here’s how:
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
              Get started and begin accumulating verified reward points in four straightforward steps.
            </p>
          </div>

          {/* 4 Redesigned Joyful Aesthetic Tabs */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: Create Free Account */}
            <div className="group relative flex flex-col justify-between rounded-3xl bg-white/85 backdrop-blur-xl p-8 border border-white shadow-[0_10px_30px_rgba(121,63,255,0.06)] hover:shadow-[0_20px_45px_rgba(121,63,255,0.16)] hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-80" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" />
                      <line x1="23" y1="11" x2="17" y2="11" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-violet-100/90 border border-violet-200/80 px-3 py-1 font-mono text-[11px] font-black tracking-wider text-violet-800">
                    STEP 01
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 group-hover:text-[#793FFF] transition-colors">
                  Create free account
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  Sign up in under 60 seconds with your email. Zero credit cards, zero deposits, and no banking info required.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-violet-700">
                <span>Instant Setup</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>

            {/* Step 2: Complete Tasks */}
            <div className="group relative flex flex-col justify-between rounded-3xl bg-white/85 backdrop-blur-xl p-8 border border-white shadow-[0_10px_30px_rgba(59,130,246,0.06)] hover:shadow-[0_20px_45px_rgba(59,130,246,0.16)] hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-80" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-blue-100/90 border border-blue-200/80 px-3 py-1 font-mono text-[11px] font-black tracking-wider text-blue-800">
                    STEP 02
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 group-hover:text-blue-600 transition-colors">
                  Complete tasks
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  Pick from rapid speed quizzes, video streams, AI model evaluation, or browser arcade quest challenges.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                <span>Play &amp; Answer</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>

            {/* Step 3: Collect Credits */}
            <div className="group relative flex flex-col justify-between rounded-3xl bg-white/85 backdrop-blur-xl p-8 border border-white shadow-[0_10px_30px_rgba(245,158,11,0.06)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.16)] hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-80" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v10" />
                      <path d="M15 9.5a3 3 0 0 0-3-2.5h-1a2.5 2.5 0 0 0 0 5h2a2.5 2.5 0 0 1 0 5H12a3 3 0 0 1-3-2.5" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-amber-100/90 border border-amber-200/80 px-3 py-1 font-mono text-[11px] font-black tracking-wider text-amber-800">
                    STEP 03
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                  Collect credits
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  Finished tasks automatically verify and instantly credit reward points directly to your personal ledger.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>Instant Accrual</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>

            {/* Step 4: Cash Out */}
            <div className="group relative flex flex-col justify-between rounded-3xl bg-white/85 backdrop-blur-xl p-8 border border-white shadow-[0_10px_30px_rgba(16,185,129,0.06)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.16)] hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-80" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-emerald-100/90 border border-emerald-200/80 px-3 py-1 font-mono text-[11px] font-black tracking-wider text-emerald-800">
                    STEP 04
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 group-hover:text-emerald-600 transition-colors">
                  Cash out
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  Redeem balance for direct Paytm transfers, Google Pay UPI, PayPal cash, or official digital gift cards.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>Fast Payout SLA</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PICK A TASK. COMPLETE IT. GET PAID. (Aesthetic Premium Midnight Background)
          ========================================================================= */}
      <section id="features" className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B0E17] text-white">
        {/* Cinematic Aurora Lighting Mesh */}
        <div className="pointer-events-none absolute -top-40 left-1/3 w-[650px] h-[650px] rounded-full bg-[#793FFF]/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-[550px] h-[550px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="pointer-events-none absolute top-1/2 -left-20 w-[450px] h-[450px] rounded-full bg-rose-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-[#B5FF24] backdrop-blur-md border border-white/10">
              <span className="h-2 w-2 rounded-full bg-[#B5FF24] animate-pulse" />
              <span className="uppercase tracking-wider text-[11px]">Diverse Ways to Earn</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Pick a task. Complete it.{' '}
              <span className="bg-gradient-to-r from-[#B5FF24] via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Get paid.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
              Jump into any of our active earning channels suited to your schedule and preferences.
            </p>
          </div>

          {/* 6 Ultra-Aesthetic Premium Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Watch & Earn */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/[0.04] p-8 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.08] hover:border-rose-500/40">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rose-500/15 blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/30 group-hover:bg-rose-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-rose-500/30 transition-all duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-rose-500/15 border border-rose-500/30 px-3 py-1 text-xs font-bold text-rose-300">
                    Popular &bull; +20-35 Pts
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-rose-400 transition-colors">
                  Watch &amp; earn
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                  Stream curated tech reviews, programming walkthroughs, and creator content. Earn verified points upon 100% video completion.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/dashboard/watch"
                  className="inline-flex items-center gap-2 text-sm font-bold text-rose-400 group-hover:text-white transition-colors"
                >
                  <span>Start watching</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>

            {/* 2. Train AI */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/[0.04] p-8 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.08] hover:border-cyan-400/40">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/15 blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <rect x="9" y="9" width="6" height="6" />
                      <line x1="9" y1="1" x2="9" y2="4" />
                      <line x1="15" y1="1" x2="15" y2="4" />
                      <line x1="9" y1="20" x2="9" y2="23" />
                      <line x1="15" y1="20" x2="15" y2="23" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-300">
                    High Reward &bull; +25-35 Pts
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">
                  Train AI
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                  Rate LLM completions, evaluate prompt responses side-by-side, and provide valuable RLHF feedback to train commercial neural models.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/dashboard/train-ai"
                  className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 group-hover:text-white transition-colors"
                >
                  <span>Train models</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>

            {/* 3. Speed Quizzes */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/[0.04] p-8 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.08] hover:border-[#793FFF]/50">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#793FFF]/20 blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#793FFF]/20 text-[#B5FF24] border border-[#793FFF]/40 group-hover:bg-[#793FFF] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#793FFF]/30 transition-all duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-purple-500/15 border border-purple-500/30 px-3 py-1 text-xs font-bold text-purple-300">
                    Instant 7s &bull; +10 Pts
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-[#B5FF24] transition-colors">
                  Speed Quizzes
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                  Test your general knowledge with 5 timed multiple-choice questions. 7 seconds per question with server-verified anti-cheat validation.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/dashboard/quiz"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#B5FF24] group-hover:text-white transition-colors"
                >
                  <span>Play quiz</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>

            {/* 4. Play & Earn */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/[0.04] p-8 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.08] hover:border-emerald-400/40">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/15 blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="6" y1="12" x2="10" y2="12" />
                      <line x1="8" y1="10" x2="8" y2="14" />
                      <line x1="15" y1="13" x2="15.01" y2="13" />
                      <line x1="18" y1="11" x2="18.01" y2="11" />
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-300">
                    Quests &bull; +40-120 Pts
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">
                  Play &amp; earn
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                  Launch browser arcade challenges, dodge obstacles, and hit designated score quest milestones to earn bonus rewards.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/dashboard/games"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:text-white transition-colors"
                >
                  <span>Play arcade</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>

            {/* 5. POV Video Bounties */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/[0.04] p-8 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.08] hover:border-indigo-400/40">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/15 blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M23 7l-7 5 7 5V7z" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-300">
                    Spatial AI &bull; +150-220 Pts
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
                  POV Video Bounties
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                  Record 45–90s first-person perspective sweeps of ordinary environments to help spatial computing partners train vision models.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/dashboard/pov-videos"
                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 group-hover:text-white transition-colors"
                >
                  <span>Submit clips</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>

            {/* 6. Instant Rewards */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/[0.04] p-8 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.08] hover:border-amber-400/40">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-500/15 blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300">
                    100% Safe &bull; ₹100 / $1
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                  Instant Rewards
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                  Redeem verified points for direct Paytm transfers, Google Pay UPI, PayPal cash, and official digital gift card vouchers.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/dashboard/rewards"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 group-hover:text-white transition-colors"
                >
                  <span>Browse catalog</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. 100% SAFE AND TRUSTED (Beautiful Modern Aesthetics)
          ========================================================================= */}
      <section id="trust" className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF8FF] via-[#F4F1FA] to-white border-t border-slate-100">
        <div className="pointer-events-none absolute top-10 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/4 w-96 h-96 bg-[#793FFF]/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-4 py-1.5 text-xs font-black text-emerald-800 border border-emerald-200 shadow-xs">
              <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="uppercase text-[11px] tracking-wider">Total Transparency</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              100% safe and trusted earning app
            </h2>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
              Your security and privacy are our top priorities. Here is how we guarantee your safety:
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {/* Trust Card 1 */}
            <div className="group rounded-3xl bg-white p-8 border border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(16,185,129,0.12)] hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">Zero Financial Data</h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                  We never request bank details, credit cards, or UPI PINs. Completely risk-free with zero exposure.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-emerald-700">
                Bank-Free Security
              </div>
            </div>

            {/* Trust Card 2 */}
            <div className="group rounded-3xl bg-white p-8 border border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(121,63,255,0.12)] hover:border-purple-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF] border border-[#793FFF]/20 group-hover:bg-[#793FFF] group-hover:text-white transition-colors duration-300 shadow-xs">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">Immutable Ledger</h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                  Every point earned and payout redeemed is permanently recorded in a tamper-proof database transaction ledger.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#793FFF]">
                100% Verifiable
              </div>
            </div>

            {/* Trust Card 3 */}
            <div className="group rounded-3xl bg-white p-8 border border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(6,182,212,0.12)] hover:border-cyan-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">Instant Code Issuance</h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                  Direct wallet transfers and authorized digital voucher codes generated reliably within 24 hours.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-cyan-700">
                24-Hour SLA Guarantee
              </div>
            </div>

            {/* Trust Card 4 */}
            <div className="group rounded-3xl bg-white p-8 border border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(245,158,11,0.12)] hover:border-amber-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">Anti-Bot Fair Play</h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                  Server-side timing and verification ensures rewards go strictly to real, authentic human users.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-amber-800">
                Real Humans Only
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. START EARNING IN THE NEXT 5 MINUTES (High-Aesthetic CTA Banner)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#F8F9FD]">
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
