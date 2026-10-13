'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TaskUnavailableNotice from './TaskUnavailableNotice';

export default function DashboardActivities() {
  const [modalNotice, setModalNotice] = useState<{
    title: string;
    category: string;
  } | null>(null);

  return (
    <section className="space-y-8">
      {/* Interactive Modal if user clicks on unavailable provider task */}
      {modalNotice && (
        <TaskUnavailableNotice
          title={modalNotice.title}
          category={modalNotice.category}
          isModal={true}
          onClose={() => setModalNotice(null)}
        />
      )}

      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#793FFF]" />
          <h2 className="text-xl font-black text-slate-950 tracking-tight">
            Earning Activities
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Complete authentic quizzes and verified client tasks to deposit reward points directly into your wallet.
        </p>
      </div>

      {/* Earning Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Knowledge Speed Quizzes (ACTIVE NOW) */}
        <div className="rounded-[28px] border-2 border-[#793FFF]/30 bg-gradient-to-b from-white to-purple-50/20 p-7 shadow-[0_10px_30px_rgba(121,63,255,0.06)] hover:border-[#793FFF] hover:shadow-xl transition flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#793FFF]/10 blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white shadow-md shadow-[#793FFF]/25">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available Now
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-950">
              Knowledge Speed Quizzes
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 font-medium">
              5 multiple-choice questions with a strict 7-second countdown per question. Fast, instant reward points deposited directly into your balance.
            </p>

            <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700">7s Timer</span>
              <span className="rounded-md bg-purple-50 text-[#793FFF] px-2 py-0.5">Rapid Payout</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700">Daily Access</span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <Link
              href="/dashboard/quiz"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#161616] hover:bg-[#793FFF] py-3.5 px-6 text-xs font-bold text-white transition shadow-sm group-hover:shadow-md"
            >
              <span>Launch Quiz Engine</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Card 2: Client Microtasks (ONBOARDING PROVIDER) */}
        <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:border-amber-300 hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/60">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <span className="rounded-full bg-amber-50 border border-amber-200/80 px-3 py-1 text-xs font-bold text-amber-800">
                Onboarding Provider
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-950">
              Client Microtasks
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 font-medium">
              Direct tasks from verified commercial clients and advertising partners. We strictly refuse to show fake dummy tasks.
            </p>

            <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span className="rounded-md bg-amber-50 text-amber-800 px-2 py-0.5">Real Clients Only</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700">Contract Vetted</span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setModalNotice({
                  title: 'Client Microtasks',
                  category: 'Direct Business Clients',
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200 py-3.5 px-6 text-xs font-bold text-slate-700 transition"
            >
              <span>Check Task Status</span>
              <span>ℹ</span>
            </button>
          </div>
        </div>

        {/* Card 3: Market Research Surveys (ONBOARDING PROVIDER) */}
        <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:border-amber-300 hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-200/60">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <span className="rounded-full bg-amber-50 border border-amber-200/80 px-3 py-1 text-xs font-bold text-amber-800">
                Onboarding Provider
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-950">
              Partner Surveys
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 font-medium">
              High-yield surveys from authenticated enterprise research firms. Guaranteed points upon verified completion.
            </p>

            <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span className="rounded-md bg-amber-50 text-amber-800 px-2 py-0.5">Enterprise Partners</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700">No Dummy Surveys</span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setModalNotice({
                  title: 'Partner Market Surveys',
                  category: 'Certified Research Firms',
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200 py-3.5 px-6 text-xs font-bold text-slate-700 transition"
            >
              <span>Check Survey Status</span>
              <span>ℹ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Genuine Platform Transparency Banner */}
      <div className="rounded-[28px] border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                100% Genuine Commitment
              </span>
              <span className="text-xs font-bold text-slate-400">Zero Fake Tasks</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-950 mt-1 tracking-tight">
              Why You Can Trust Task Earn
            </h3>
          </div>
          <Link
            href="/dashboard/quiz"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#161616] hover:bg-[#793FFF] px-5 py-2.5 text-xs font-bold text-white transition shrink-0"
          >
            <span>Play Active Quizzes Now</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 mb-2.5">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h4 className="text-xs font-black text-slate-950">Real Clients Only</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              We exclusively publish real tasks contracted and paid for by verified commercial clients.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 mb-2.5">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h4 className="text-xs font-black text-slate-950">Zero Fake Activities</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              We never fabricate dummy video views, synthetic AI prompts, or artificial simulations.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 mb-2.5">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h4 className="text-xs font-black text-slate-950">Guaranteed Points</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Every completed quiz and verified task is credited straight to your balance with clear redemption options.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 mb-2.5">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h4 className="text-xs font-black text-slate-950">Active Onboarding</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Provider integrations are currently underway. New client campaigns launch as soon as approved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
