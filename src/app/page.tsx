'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCTA from '@/components/HeroCTA';
import JumpTaskHeroCards from '@/components/JumpTaskHeroCards';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is Task Earn and how do I earn rewards?',
      a: 'Task Earn is an online earning platform where you complete digital micro-tasks—including 7-second speed quizzes, watching partner YouTube clips, training AI models with RLHF feedback, playing arcade games, and uploading POV video clips. Each completed task awards verified points directly to your reward wallet.',
    },
    {
      q: 'Is Task Earn completely free to use?',
      a: 'Yes, 100% free! We never charge membership fees or transaction costs, and we never ask for sensitive financial information like bank accounts or UPI PINs. You simply earn points through your activity.',
    },
    {
      q: 'How do I redeem my points for gift cards?',
      a: 'Once you accumulate points, navigate to the Rewards Catalog in your dashboard and choose your preferred voucher (Amazon, Starbucks, Apple, or Google Play). Click Redeem to immediately generate your digital gift card code.',
    },
    {
      q: 'How fast are reward codes delivered?',
      a: 'Instantaneous! Our server validates your ledger balance in real time and issues the gift card voucher code directly to your Past Redemptions section within seconds.',
    },
    {
      q: 'Do I need any special skills to start earning?',
      a: 'No special skills are needed! Anyone with an internet connection and a few spare minutes can answer quick quizzes, stream video sessions, rate AI outputs, or play casual arcade games.',
    },
  ];

  const recentPayouts = [
    { brand: 'Amazon $10 Digital Card', points: '1,000 PTS', time: 'Just now', color: 'from-amber-500 to-orange-500' },
    { brand: 'Starbucks $5 Coffee Card', points: '500 PTS', time: '2m ago', color: 'from-emerald-500 to-teal-600' },
    { brand: 'Apple $25 App Store Code', points: '2,500 PTS', time: '5m ago', color: 'from-slate-700 to-slate-900' },
    { brand: 'Google Play $15 Voucher', points: '1,500 PTS', time: '9m ago', color: 'from-cyan-500 to-blue-600' },
    { brand: 'Amazon $25 Digital Card', points: '2,500 PTS', time: '14m ago', color: 'from-amber-500 to-orange-500' },
    { brand: 'Starbucks $10 Coffee Card', points: '1,000 PTS', time: '21m ago', color: 'from-emerald-500 to-teal-600' },
  ];

  return (
    <div className="relative overflow-hidden bg-white text-slate-900">
      {/* =========================================================================
          1. HERO SECTION (Identical JumpTask Layout from Screenshot 1)
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

          {/* Main Headline (JumpTask massive Grotesk style) */}
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

          {/* CTA Button: JumpTask solid black pill */}
          <ScrollReveal direction="up" delay={0.35}>
            <HeroCTA />
          </ScrollReveal>

          {/* The 3 Tilted 3D Cards (Screenshot 1 visual showcase) */}
          <ScrollReveal direction="up" delay={0.45}>
            <JumpTaskHeroCards />
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          2. YOU CAN EARN MONEY IN MINUTES. HERE'S HOW: (JumpTask Section 2)
          ========================================================================= */}
      <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100 bg-[#faf8ff]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              You can earn money online in minutes. Here’s how:
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Get started and begin accumulating reward points in four straightforward steps.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="group rounded-3xl bg-white p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#793FFF]/40 transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 group-hover:bg-[#793FFF] group-hover:text-white transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-950">1. Create free account</h3>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                Sign up in under a minute with your email. No credit cards, fees, or banking info required.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group rounded-3xl bg-white p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#793FFF]/40 transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 group-hover:bg-[#793FFF] group-hover:text-white transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-950">2. Complete tasks</h3>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                Pick from rapid speed quizzes, video streams, AI model evaluation, or arcade gaming quests.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group rounded-3xl bg-white p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#793FFF]/40 transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 group-hover:bg-[#793FFF] group-hover:text-white transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-950">3. Collect credits</h3>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                Finished tasks automatically verify and deposit reward points into your secure wallet ledger.
              </p>
            </div>

            {/* Step 4 */}
            <div className="group rounded-3xl bg-white p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#793FFF]/40 transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 group-hover:bg-[#793FFF] group-hover:text-white transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-950">4. Cash out</h3>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                Redeem your balance instantly for top digital gift cards with immediate code delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PICK A TASK. COMPLETE IT. GET PAID. (JumpTask Section 3)
          ========================================================================= */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#793FFF]">
              Diverse Ways to Earn
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Pick a task. Complete it. Get paid.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Jump into any of our active earning channels suited to your schedule and preferences.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Watch & Earn */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-xs hover:shadow-2xl hover:border-rose-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                    Popular
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-950 group-hover:text-rose-600 transition-colors">
                  Watch &amp; earn
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Stream curated tech reviews, programming walkthroughs, and creator content. Earn verified points upon 100% video completion.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/dashboard/watch"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-rose-600 hover:text-rose-700"
                >
                  <span>Start watching</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* 2. Train AI */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-xs hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <rect x="9" y="9" width="6" height="6" />
                      <line x1="9" y1="1" x2="9" y2="4" />
                      <line x1="15" y1="1" x2="15" y2="4" />
                      <line x1="9" y1="20" x2="9" y2="23" />
                      <line x1="15" y1="20" x2="15" y2="23" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">
                    High Reward
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-950 group-hover:text-cyan-600 transition-colors">
                  Train AI
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Rate LLM completions, evaluate prompt responses side-by-side, and provide valuable RLHF feedback to train commercial neural models.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/dashboard/train-ai"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-600 hover:text-cyan-700"
                >
                  <span>Train models</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* 3. Speed Quizzes */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-xs hover:shadow-2xl hover:border-[#793FFF] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF] group-hover:bg-[#793FFF] group-hover:text-white transition-colors">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-[#793FFF]">
                    Instant 7s
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-950 group-hover:text-[#793FFF] transition-colors">
                  Speed Quizzes
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Test your general knowledge with 5 timed multiple-choice questions. 7 seconds per question with server-verified anti-cheat validation.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/dashboard/quiz"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#793FFF] hover:text-[#682FF8]"
                >
                  <span>Play quiz</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* 4. Play & Earn */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-xs hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="6" y1="12" x2="10" y2="12" />
                      <line x1="8" y1="10" x2="8" y2="14" />
                      <line x1="15" y1="13" x2="15.01" y2="13" />
                      <line x1="18" y1="11" x2="18.01" y2="11" />
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    Quests
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-950 group-hover:text-emerald-600 transition-colors">
                  Play &amp; earn
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Launch browser arcade challenges, dodge obstacles, and hit designated score quest milestones to earn bonus rewards.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/dashboard/games"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700"
                >
                  <span>Play arcade</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* 5. POV Video Bounties */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-xs hover:shadow-2xl hover:border-indigo-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 7l-7 5 7 5V7z" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">
                    Spatial AI
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-950 group-hover:text-indigo-600 transition-colors">
                  POV Video Bounties
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Record 45–90s first-person perspective sweeps of ordinary environments to help spatial computing partners train vision models.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/dashboard/pov-videos"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700"
                >
                  <span>Submit clips</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* 6. Gift Card Catalog */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-xs hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                    Instant Code
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                  Instant Rewards
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Redeem verified points for digital vouchers from Amazon, Starbucks, Apple, and Google Play delivered directly to your ledger.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/dashboard/rewards"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700"
                >
                  <span>Browse catalog</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. RECENT PAYOUTS (JumpTask Section 4 Ticker)
          ========================================================================= */}
      <section className="py-16 bg-[#161616] text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#B5FF24]">
            Live Activity
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight text-white">
            Recent redemptions &amp; payouts
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Real-time digital gift card codes redeemed by our active members.
          </p>
        </div>

        {/* Ticker Row */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-4 sm:justify-center">
          {recentPayouts.map((payout, idx) => (
            <div
              key={idx}
              className="flex shrink-0 items-center gap-3.5 rounded-2xl bg-white/5 border border-white/10 px-5 py-3.5 backdrop-blur-xs hover:bg-white/10 transition"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr ${payout.color} text-white shadow-xs`}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-white">{payout.brand}</p>
                <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-extrabold text-[#B5FF24]">{payout.points}</span>
                  <span>•</span>
                  <span>{payout.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. 100% SAFE AND TRUSTED (JumpTask Section 5)
          ========================================================================= */}
      <section id="trust" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#faf8ff]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#793FFF]">
              Total Transparency
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              100% safe and trusted earning app
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Your security and privacy are our top priorities. Here is how we guarantee safety:
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="rounded-3xl bg-white p-8 border border-slate-200/80 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-950">Zero Financial Data</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                We never request bank details, credit cards, or UPI PINs. Completely risk-free.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-slate-200/80 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF]">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-950">Immutable Ledger</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                All points earned and redeemed are stored in a tamper-proof database transaction ledger.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-slate-200/80 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-950">Instant Code Issuance</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                No waiting periods or delayed payouts. Your gift card codes generate right on confirmation.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-slate-200/80 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-950">Anti-Bot Fair Play</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Server-side timing and verification ensures rewards go strictly to real, honest human users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. START EARNING IN THE NEXT 5 MINUTES (JumpTask CTA Banner)
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-5xl rounded-[40px] bg-[#161616] p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#793FFF]/25 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Start earning in the next 5 minutes
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Join active earners answering speed quizzes, rating AI, streaming videos, and redeeming digital gift cards.
            </p>

            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-[#793FFF] hover:bg-[#682FF8] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#793FFF]/30 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Create free account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FREQUENTLY ASKED QUESTIONS (JumpTask Section 7 Accordion)
          ========================================================================= */}
      <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100 bg-[#faf8ff]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#793FFF]">
              Got Questions?
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Everything you need to know about getting started on Task Earn.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs transition hover:border-[#793FFF]/30"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#793FFF] text-white' : ''
                      }`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#793FFF] hover:text-[#682FF8]"
            >
              <span>View all questions in the Help Center</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
