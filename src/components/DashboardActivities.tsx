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
    <section className="space-y-12">
      {/* Interactive Modal if user clicks on unavailable provider task */}
      {modalNotice && (
        <TaskUnavailableNotice
          title={modalNotice.title}
          category={modalNotice.category}
          isModal={true}
          onClose={() => setModalNotice(null)}
        />
      )}

      {/* =========================================================================
          1. AVAILABLE TASKS (Speed Quizzes & Games)
          ========================================================================= */}
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Available Tasks
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Active verified earning channels ready to credit reward points to your balance immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Speed Quizzes */}
          <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-[#793FFF]/40 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-[#793FFF]">
                  Instant 7s
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950">Speed Quizzes</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                5 multiple-choice questions with a strict 7-second countdown per question. Rapid point payouts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dashboard/quiz"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#161616] hover:bg-[#793FFF] py-3.5 px-6 text-xs font-bold text-white transition shadow-sm"
              >
                <span>Launch Quiz Engine</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* 2. Play Games */}
          <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M6 12h4m-2-2v4" />
                    <line x1="15" y1="11" x2="15.01" y2="11" />
                    <line x1="18" y1="13" x2="18.01" y2="13" />
                  </svg>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Quests
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950">Play Games to Earn</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Launch arcade challenges directly in your browser. Reach score milestones to unlock bonus points.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dashboard/games"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 py-3.5 px-6 text-xs font-bold text-white transition shadow-sm"
              >
                <span>Play Arcade Games</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. CURRENTLY UNAVAILABLE (Tasks tabs as before)
          ========================================================================= */}
      <div className="space-y-5 pt-4">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Currently Unavailable
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Don&apos;t worry, we are working on bringing them back soon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Watch YouTube Videos */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Watch YouTube Videos',
                category: 'Media & Video Provider',
              })
            }
            className="group rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-rose-300 transition flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                  Watch &amp; Earn
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 group-hover:text-rose-600 transition-colors">
                Watch YouTube Videos
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Stream curated partner content, tech reviews, and gaming insights. Fill the active progress bar to earn.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Card 2: Train AI */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Train AI & Annotate',
                category: 'AI Alignment & Data Annotation',
              })
            }
            className="group rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-cyan-300 transition flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                  </svg>
                </div>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">
                  AI Alignment
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 group-hover:text-cyan-700 transition-colors">
                Train AI &amp; Annotate
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Compare side-by-side prompt responses from modern LLMs. Provide human feedback (RLHF) for high yields.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Card 3: POV Video Bounties */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'POV Video Bounties',
                category: 'Spatial AI & Media Datasets',
              })
            }
            className="group rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-indigo-300 transition flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">
                  Spatial AI
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 group-hover:text-indigo-600 transition-colors">
                POV Video Bounties
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Record short 45-90s sweeps of ordinary spaces (workspace, kitchen, streets) for spatial computing datasets.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
