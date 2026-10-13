'use client';

import React from 'react';
import Link from 'next/link';

interface TaskUnavailableNoticeProps {
  title?: string;
  category?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export default function TaskUnavailableNotice({
  title = 'Client Tasks',
  category = 'Task Provider',
  onClose,
  isModal = false,
}: TaskUnavailableNoticeProps) {
  const content = (
    <div className={`relative w-full ${isModal ? 'max-w-xl mx-auto' : 'max-w-3xl mx-auto'} rounded-[36px] neu-flat-xl bg-[#EEF2F7] border border-white/60 p-7 sm:p-10 text-slate-800`}>
      {/* Close button if modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-6 right-6 neu-btn flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 transition cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* Top Header Badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="neu-inset-sm px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-amber-700">
          Provider Onboarding in Progress
        </span>
      </div>

      {/* Hero Icon & Title */}
      <div className="flex items-start gap-4 sm:gap-5 mb-6">
        <div className="neu-icon-well flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-[#793FFF]">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            {title} Not Available Right Now
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Category: {category} • Genuine Client Verification
          </p>
        </div>
      </div>

      {/* Honest Clarification */}
      <div className="neu-inset rounded-2xl p-4 sm:p-5 mb-6 text-slate-700">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
          We do not have an active task provider right now. Task Earn takes tasks directly from real business clients and posts verified tasks — we strictly refuse to display fake dummy tasks or artificial simulations.
        </p>
      </div>

      {/* Short Key Points */}
      <div className="space-y-3 mb-8">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
          Why Task Earn is 100% Genuine
        </h3>

        <div className="grid grid-cols-1 gap-2.5">
          {/* Point 1 */}
          <div className="neu-convex rounded-2xl p-4 border border-white/60 flex items-start gap-3.5">
            <div className="neu-inset-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-emerald-600 mt-0.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Direct Client Sourcing Only
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Every task published on Task Earn comes directly from authenticated corporate clients and paying advertising partners.
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="neu-convex rounded-2xl p-4 border border-white/60 flex items-start gap-3.5">
            <div className="neu-inset-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-emerald-600 mt-0.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Zero Fake or Dummy Activities
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                We never fabricate synthetic tasks, fake videos, or bogus simulations to mislead you or inflate activity numbers.
              </p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="neu-convex rounded-2xl p-4 border border-white/60 flex items-start gap-3.5">
            <div className="neu-inset-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-emerald-600 mt-0.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Guaranteed Fair Reward Payouts
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Client campaigns undergo contract review before release to ensure each completed task earns guaranteed wallet credits.
              </p>
            </div>
          </div>

          {/* Point 4 */}
          <div className="neu-convex rounded-2xl p-4 border border-white/60 flex items-start gap-3.5">
            <div className="neu-inset-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-emerald-600 mt-0.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Automatic Release Upon Onboarding
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                As soon as verified provider integrations are finalized, fresh client tasks will appear here automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-5 border-t border-slate-200/60">
        <Link
          href="/dashboard/quiz"
          className="neu-btn-primary w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-5 text-xs font-bold shadow-md cursor-pointer text-center"
        >
          <span>Play Speed Quizzes</span>
          <span>→</span>
        </Link>
        <Link
          href="/dashboard/games"
          className="neu-btn-emerald w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-5 text-xs font-bold shadow-md cursor-pointer text-center"
        >
          <span>Play Games</span>
          <span>→</span>
        </Link>
        {isModal && onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="neu-btn w-full sm:w-auto inline-flex items-center justify-center rounded-full py-3.5 px-6 text-xs font-bold text-slate-700 transition cursor-pointer"
          >
            Close
          </button>
        ) : (
          <Link
            href="/dashboard"
            className="neu-btn w-full sm:w-auto inline-flex items-center justify-center rounded-full py-3.5 px-6 text-xs font-bold text-slate-700 transition cursor-pointer"
          >
            Back
          </Link>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="relative w-full max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-[70vh] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {content}
    </main>
  );
}
