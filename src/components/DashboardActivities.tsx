'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TaskUnavailableNotice from './TaskUnavailableNotice';
import ReferAndEarnModal from './ReferAndEarnModal';

export default function DashboardActivities() {
  const [modalNotice, setModalNotice] = useState<{
    title: string;
    category: string;
  } | null>(null);

  const [isReferModalOpen, setIsReferModalOpen] = useState(false);

  return (
    <section className="space-y-14">
      {/* Interactive Modal if user clicks on unavailable provider task */}
      {modalNotice && (
        <TaskUnavailableNotice
          title={modalNotice.title}
          category={modalNotice.category}
          isModal={true}
          onClose={() => setModalNotice(null)}
        />
      )}

      {/* Refer and Earn Modal */}
      {isReferModalOpen && (
        <ReferAndEarnModal onClose={() => setIsReferModalOpen(false)} />
      )}

      {/* =========================================================================
          1. AVAILABLE TASKS (Speed Quizzes, Games, Refer & Earn) - Centered Heading
          ========================================================================= */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-950 tracking-tight">
            Available Tasks
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Active verified earning channels ready to credit reward points to your balance immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
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
              <h3 className="text-xl font-black text-slate-950">Speed Quizzes</h3>
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
              <h3 className="text-xl font-black text-slate-950">Play Games to Earn</h3>
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

          {/* 3. Refer and Earn */}
          <div className="rounded-[28px] border-2 border-indigo-200 bg-gradient-to-b from-white to-indigo-50/30 p-7 shadow-xs hover:shadow-xl hover:border-indigo-500 transition flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  High Reward
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-950 group-hover:text-indigo-600 transition-colors">
                Refer and Earn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Invite active friends or create popular social comments to earn direct cash rewards from ₹20 up to ₹120.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsReferModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 py-3.5 px-6 text-xs font-bold text-white transition shadow-sm cursor-pointer"
              >
                <span>Start Referring</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. CURRENTLY UNAVAILABLE (9 Task Tabs) - Centered & Larger Heading
          ========================================================================= */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-950 tracking-tight">
            Currently Unavailable
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Don&apos;t worry, we are working on bringing them back soon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
          {/* 1. Watch Videos and Earn */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Watch Videos and Earn',
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
                Watch Videos and Earn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Stream curated partner content, tech reviews, and gaming insights. Fill the active progress bar to earn.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* 2. Train AI and Earn */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Train AI and Earn',
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
                Train AI and Earn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Compare side-by-side prompt responses from modern LLMs. Provide human feedback (RLHF) for high yields.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* 3. Upload POV Videos and Earn */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Upload POV Videos and Earn',
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
                Upload POV Videos and Earn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Record short 45-90s sweeps of ordinary spaces (workspace, kitchen, streets) for spatial computing datasets.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* 4. Fill Survey and Earn */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Fill Survey and Earn',
                category: 'Market Research & Surveys',
              })
            }
            className="group rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-amber-300 transition flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="m9 14 2 2 4-4" />
                    <path d="M9 10h6" />
                  </svg>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  Surveys
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 group-hover:text-amber-700 transition-colors">
                Fill Survey and Earn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Share your insights on consumer products, brands, and market trends through verified partner opinion questionnaires.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* 5. Type and Earn */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Type and Earn',
                category: 'Data Entry & Typing',
              })
            }
            className="group rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="6" y1="8" x2="6" y2="8.01" />
                    <line x1="10" y1="8" x2="10" y2="8.01" />
                    <line x1="14" y1="8" x2="14" y2="8.01" />
                    <line x1="18" y1="8" x2="18.01" y2="8.01" />
                    <line x1="6" y1="12" x2="6" y2="12.01" />
                    <line x1="10" y1="12" x2="10" y2="12.01" />
                    <line x1="14" y1="12" x2="14" y2="12.01" />
                    <line x1="18" y1="12" x2="18.01" y2="12.01" />
                    <line x1="7" y1="16" x2="17" y2="16" />
                  </svg>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Data Entry
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 group-hover:text-emerald-700 transition-colors">
                Type and Earn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Digitize handwritten texts, convert scanned documents into clean digital copy, and verify automated optical character recognition.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* 6. Transcribe and Earn */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Transcribe and Earn',
                category: 'Speech & Audio Transcription',
              })
            }
            className="group rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-purple-300 transition flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-[#793FFF]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-[#793FFF]">
                  Transcription
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 group-hover:text-[#793FFF] transition-colors">
                Transcribe and Earn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Listen to short audio clips, voice recordings, and conversation snippets, and transcribe spoken dialogue into accurate text.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-purple-50 text-[#793FFF] hover:bg-[#793FFF] hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* 7. Edit Videos and Earn */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Edit Videos and Earn',
                category: 'Video Production & Editing',
              })
            }
            className="group rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-pink-300 transition flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                  </svg>
                </div>
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-800">
                  Video Editing
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 group-hover:text-pink-600 transition-colors">
                Edit Videos and Earn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Edit short reels, YouTube cuts, and promo video clips for partner marketing campaigns.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* 8. Make PPT/Assignments and Earn */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Make PPT/Assignments and Earn',
                category: 'Document & Slide Creation',
              })
            }
            className="group rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-orange-300 transition flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h20" />
                    <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                    <path d="m7 21 5-5 5 5" />
                  </svg>
                </div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">
                  Presentations
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 group-hover:text-orange-600 transition-colors">
                Make PPT/Assignments and Earn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Create professional slide decks, format academic assignments, and design presentation templates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>Check Task Status</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* 9. Complete Microtasks and Earn */}
          <div
            onClick={() =>
              setModalNotice({
                title: 'Complete Microtasks and Earn',
                category: 'Client Microtasks & Web Actions',
              })
            }
            className="group rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-teal-300 transition flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 11 3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800">
                  Microtasks
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 group-hover:text-teal-700 transition-colors">
                Complete Microtasks and Earn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Complete quick verified microtasks, web actions, and app testing tasks from authentic clients.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white py-3.5 px-6 text-xs font-bold transition shadow-2xs cursor-pointer"
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
