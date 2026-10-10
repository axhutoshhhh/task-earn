'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCTA from '@/components/HeroCTA';
import JumpTaskHeroCards from '@/components/JumpTaskHeroCards';
import JumpTaskHowItWorks from '@/components/JumpTaskHowItWorks';

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
          3. PICK A TASK. COMPLETE IT. GET PAID. (Seamless Unified Background)
          ========================================================================= */}
      <section
        id="features"
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-transparent"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-black text-[#793FFF] shadow-xs border border-purple-200/80">
              <span className="flex h-2 w-2 rounded-full bg-[#793FFF] animate-ping" />
              <span className="uppercase text-[11px] tracking-wider">Diverse Ways to Earn</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
              Pick a task. Complete it.{' '}
              <span className="bg-gradient-to-r from-[#793FFF] via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Get paid.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
              Jump into any of our active earning channels suited to your schedule and preferences.
            </p>
          </div>

          {/* 6 High-Aesthetic Frosted Glass Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Watch & Earn */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/85 p-8 border border-white/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(244,63,94,0.15)] hover:border-rose-200 hover:-translate-y-2 transition-all duration-300">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rose-200/40 blur-2xl group-hover:scale-125 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 group-hover:bg-rose-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-rose-500/25 transition-all duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-rose-50 border border-rose-200/80 px-3 py-1 text-xs font-bold text-rose-700">
                    Popular &bull; +20-35 Pts
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-950 group-hover:text-rose-600 transition-colors">
                  Watch &amp; earn
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  Stream curated tech reviews, programming walkthroughs, and creator content. Earn verified points upon 100% video completion.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/dashboard/watch"
                  className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors"
                >
                  <span>Start watching</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>

            {/* 2. Train AI */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/85 p-8 border border-white/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(6,182,212,0.15)] hover:border-cyan-200 hover:-translate-y-2 transition-all duration-300">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-200/40 blur-2xl group-hover:scale-125 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <rect x="9" y="9" width="6" height="6" />
                      <line x1="9" y1="1" x2="9" y2="4" />
                      <line x1="15" y1="1" x2="15" y2="4" />
                      <line x1="9" y1="20" x2="9" y2="23" />
                      <line x1="15" y1="20" x2="15" y2="23" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-cyan-50 border border-cyan-200/80 px-3 py-1 text-xs font-bold text-cyan-700">
                    High Reward &bull; +25-35 Pts
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-950 group-hover:text-cyan-600 transition-colors">
                  Train AI
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  Rate LLM completions, evaluate prompt responses side-by-side, and provide valuable RLHF feedback to train commercial neural models.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/dashboard/train-ai"
                  className="inline-flex items-center gap-2 text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                  <span>Train models</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>

            {/* 3. Speed Quizzes */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/85 p-8 border border-white/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(121,63,255,0.15)] hover:border-purple-200 hover:-translate-y-2 transition-all duration-300">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-200/40 blur-2xl group-hover:scale-125 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-[#793FFF] border border-purple-100 group-hover:bg-[#793FFF] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#793FFF]/25 transition-all duration-300">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-purple-50 border border-purple-200/80 px-3 py-1 text-xs font-bold text-purple-700">
                    Instant 7s &bull; +10 Pts
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-950 group-hover:text-[#793FFF] transition-colors">
                  Speed Quizzes
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  Test your general knowledge with 5 timed multiple-choice questions. 7 seconds per question with server-verified anti-cheat validation.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/dashboard/quiz"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#793FFF] hover:text-[#682FF8] transition-colors"
                >
                  <span>Play quiz</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>

            {/* 4. Play & Earn */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/85 p-8 border border-white/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.15)] hover:border-emerald-200 hover:-translate-y-2 transition-all duration-300">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-200/40 blur-2xl group-hover:scale-125 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <line x1="6" y1="12" x2="10" y2="12" />
                        <line x1="8" y1="10" x2="8" y2="14" />
                        <line x1="15" y1="13" x2="15.01" y2="13" />
                        <line x1="18" y1="11" x2="18.01" y2="11" />
                        <rect x="2" y="6" width="20" height="12" rx="2" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-xs font-bold text-emerald-700">
                      Quests &bull; +40-120 Pts
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 group-hover:text-emerald-600 transition-colors">
                    Play &amp; earn
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                    Launch browser arcade challenges, dodge obstacles, and hit designated score quest milestones to earn bonus rewards.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/dashboard/games"
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <span>Play arcade</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                  </Link>
                </div>
              </div>

              {/* 5. POV Video Bounties */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/85 p-8 border border-white/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(99,102,241,0.15)] hover:border-indigo-200 hover:-translate-y-2 transition-all duration-300">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-200/40 blur-2xl group-hover:scale-125 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300">
                      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M23 7l-7 5 7 5V7z" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-indigo-50 border border-indigo-200/80 px-3 py-1 text-xs font-bold text-indigo-700">
                      Spatial AI &bull; +150-220 Pts
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 group-hover:text-indigo-600 transition-colors">
                    POV Video Bounties
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                    Record 45–90s first-person perspective sweeps of ordinary environments to help spatial computing partners train vision models.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/dashboard/pov-videos"
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <span>Submit clips</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                  </Link>
                </div>
              </div>

              {/* 6. Instant Rewards */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-white/85 p-8 border border-white/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.15)] hover:border-amber-200 hover:-translate-y-2 transition-all duration-300">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-200/40 blur-2xl group-hover:scale-125 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/25 transition-all duration-300">
                      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-amber-50 border border-amber-200/80 px-3 py-1 text-xs font-bold text-amber-700">
                      100% Safe &bull; ₹100 / $1
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                    Instant Rewards
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                    Redeem verified points for direct Paytm transfers, Google Pay UPI, PayPal cash, and official digital gift card vouchers.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/dashboard/rewards"
                    className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
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
          4. 100% SAFE AND TRUSTED (Seamless Unified Background)
          ========================================================================= */}
      <section
        id="trust"
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-transparent"
      >
        <div className="mx-auto max-w-7xl">
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
            <div className="group rounded-3xl bg-white/85 backdrop-blur-xl p-8 border border-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(16,185,129,0.12)] hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
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
            <div className="group rounded-3xl bg-white/85 backdrop-blur-xl p-8 border border-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(121,63,255,0.12)] hover:border-purple-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
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
            <div className="group rounded-3xl bg-white/85 backdrop-blur-xl p-8 border border-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(6,182,212,0.12)] hover:border-cyan-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
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
            <div className="group rounded-3xl bg-white/85 backdrop-blur-xl p-8 border border-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(245,158,11,0.12)] hover:border-amber-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
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
