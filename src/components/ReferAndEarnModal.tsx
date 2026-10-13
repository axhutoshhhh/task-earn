'use client';

import React, { useState } from 'react';

interface ReferAndEarnModalProps {
  onClose: () => void;
}

export default function ReferAndEarnModal({ onClose }: ReferAndEarnModalProps) {
  const [submissionText, setSubmissionText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim() || submissionText.trim().length < 3) {
      setError('Please enter your friends\' names or your video comment link.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-[32px] border border-slate-200/90 bg-white/95 backdrop-blur-2xl p-7 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Top Header Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-700">
            Available Now • Direct Cash Rewards
          </span>
        </div>

        {/* Hero Icon & Title */}
        <div className="flex items-start gap-4 sm:gap-5 mb-6">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white shadow-lg shadow-[#793FFF]/25">
            <svg className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Refer and Earn
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              Community &amp; Creator Program • Guaranteed Payout Verification
            </p>
          </div>
        </div>

        {/* Welcome Intro Box */}
        <div className="rounded-2xl bg-purple-50/60 border border-purple-100 p-4 sm:p-5 mb-6">
          <h3 className="text-sm font-black text-[#793FFF] uppercase tracking-wider mb-1">
            Welcome to Refer &amp; Earn!
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Earn direct cash by expanding our community. Bring real active members or promote Task Earn on social media to earn verified rewards deposited straight into your balance.
          </p>
        </div>

        {/* =====================================================================
            METHOD 1: DIRECT FRIEND REFERRALS (In Points)
            ===================================================================== */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#793FFF] text-white text-[11px] font-black">
              1
            </span>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Method 1: Invite Friends &amp; Earn Cash
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <div className="flex items-start gap-3 rounded-xl bg-slate-50/80 border border-slate-200/80 p-3 shadow-2xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[#793FFF] mt-0.5 font-black text-[10px]">
                A
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900 font-bold">Invite people to join:</strong> Have your friends register an account on Task Earn using their real display name.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-slate-50/80 border border-slate-200/80 p-3 shadow-2xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[#793FFF] mt-0.5 font-black text-[10px]">
                B
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900 font-bold">Tell us their names:</strong> Enter their registered display names or emails in the typing box below for verification.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-slate-50/80 border border-slate-200/80 p-3 shadow-2xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[#793FFF] mt-0.5 font-black text-[10px]">
                C
              </div>
              <div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  <strong className="text-slate-900 font-bold">Active user payouts:</strong> Once our team verifies their accounts and confirms regular activity on quizzes and tasks, you will receive:
                </p>
                <div className="grid grid-cols-3 gap-2 mt-2 pt-1">
                  <div className="rounded-lg bg-white border border-purple-100 p-2 text-center">
                    <span className="block text-[11px] font-bold text-slate-500">2 Friends</span>
                    <span className="text-sm font-black text-[#793FFF]">₹20 INR</span>
                  </div>
                  <div className="rounded-lg bg-white border border-purple-100 p-2 text-center">
                    <span className="block text-[11px] font-bold text-slate-500">5 Friends</span>
                    <span className="text-sm font-black text-[#793FFF]">₹50 INR</span>
                  </div>
                  <div className="rounded-lg bg-white border border-purple-100 p-2 text-center">
                    <span className="block text-[11px] font-bold text-slate-500">10 Friends</span>
                    <span className="text-sm font-black text-[#793FFF]">₹120 INR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Margin */}
        <hr className="my-6 border-slate-200/80" />

        {/* =====================================================================
            METHOD 2: SOCIAL MEDIA COMMENTS (₹50 for 100 Likes)
            ===================================================================== */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white text-[11px] font-black">
                2
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                Method 2: Instagram Reels &amp; YouTube Shorts Promotion
              </h3>
            </div>
            <span className="rounded-lg bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-black text-rose-600">
              ₹50 INR
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <div className="flex items-start gap-3 rounded-xl bg-slate-50/80 border border-slate-200/80 p-3 shadow-2xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 mt-0.5 font-black text-[10px]">
                A
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900 font-bold">Post a helpful comment:</strong> Write an informative comment about Task Earn under any public trending Instagram Reel or YouTube Shorts video.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-slate-50/80 border border-slate-200/80 p-3 shadow-2xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 mt-0.5 font-black text-[10px]">
                B
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900 font-bold">Minimum 100 likes:</strong> Your comment must achieve at least 100 likes from organic viewers. You will receive <strong className="text-rose-600 font-bold">₹50 INR</strong> direct reward per verified comment.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-slate-50/80 border border-slate-200/80 p-3 shadow-2xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 mt-0.5 font-black text-[10px]">
                C
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900 font-bold">Solve questions &amp; doubts:</strong> Actively reply to people who ask questions under your comment and explain how quizzes and payouts work.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================================
            SUBMISSION SPOT / TYPING PLACE
            ===================================================================== */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6 mb-6">
          <label
            htmlFor="referral-input"
            className="block text-xs sm:text-sm font-black text-slate-900 mb-2"
          >
            Name of your friends / Link of the Instagram / YouTube video where you commented
          </label>

          {submitted ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center space-y-2 animate-in fade-in duration-200">
              <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4 className="text-sm font-black text-emerald-950">
                Verification Details Submitted!
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                Our verification team will review your referrals or social link within 24 hours. Once confirmed active, rewards will be credited directly to your balance.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-emerald-900 underline hover:no-underline"
              >
                Submit another verification entry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                id="referral-input"
                rows={3}
                value={submissionText}
                onChange={(e) => {
                  setSubmissionText(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter names of your invited friends (e.g. Aman Sharma, Rahul Verma) OR paste your Instagram Reel / YouTube Shorts link..."
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#793FFF] focus:outline-none focus:ring-2 focus:ring-[#793FFF]/20 transition"
              />

              {error && (
                <p className="text-xs font-bold text-rose-600">
                  {error}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#161616] hover:bg-[#793FFF] py-3.5 px-6 text-xs font-bold text-white transition shadow-sm cursor-pointer"
                >
                  <span>Submit for Verification</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-200/80 hover:bg-slate-300 py-3.5 px-6 text-xs font-bold text-slate-700 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
