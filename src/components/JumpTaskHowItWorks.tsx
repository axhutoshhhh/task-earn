'use client';

import React, { useState, useEffect } from 'react';

export default function JumpTaskHowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Auto-cycle through steps 1 -> 2 -> 3 -> 4 every 3 seconds even without touching.
  // Touching / clicking any step instantly takes the user to that screen and resets the 3-second cycle.
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeStep]);

  const handleStepSelect = (step: number) => {
    setActiveStep(step);
  };

  return (
    <section
      id="how-it-works"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="mx-auto max-w-7xl">
        {/* Main Headline — Exact JumpTask Typography & Sizing */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-6xl lg:text-[70px] font-black tracking-tight text-slate-950 leading-[1.08]">
            You can earn money online in minutes. Here’s how:
          </h2>
        </div>

        {/* 3-Column Interactive Showcase (Steps Left | Phone Center | Steps Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-6xl mx-auto">
          {/* =========================================================================
              LEFT COLUMN: STEP 1 & STEP 2
              ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-7 order-1 h-full justify-between">
            {/* Step 1 Card */}
            <div
              onClick={() => handleStepSelect(1)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleStepSelect(1)}
              className={`group relative flex flex-col justify-center rounded-[32px] p-8 sm:p-9 min-h-[250px] sm:min-h-[275px] transition-all duration-300 cursor-pointer select-none ${
                activeStep === 1
                  ? 'bg-[#161616] text-white shadow-2xl scale-[1.02] ring-1 ring-white/10'
                  : 'bg-white text-slate-900 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200'
              }`}
            >
              <span
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  activeStep === 1 ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Step 1
              </span>
              <h3
                className={`mt-4 text-2xl sm:text-3xl font-black tracking-tight transition-colors ${
                  activeStep === 1 ? 'text-white' : 'text-slate-950'
                }`}
              >
                Create free account
              </h3>
              <p
                className={`mt-3 text-sm sm:text-base leading-relaxed transition-colors ${
                  activeStep === 1 ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Sign up in under a minute. Your dashboard is ready right away.
              </p>
            </div>

            {/* Step 2 Card */}
            <div
              onClick={() => handleStepSelect(2)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleStepSelect(2)}
              className={`group relative flex flex-col justify-center rounded-[32px] p-8 sm:p-9 min-h-[250px] sm:min-h-[275px] transition-all duration-300 cursor-pointer select-none ${
                activeStep === 2
                  ? 'bg-[#161616] text-white shadow-2xl scale-[1.02] ring-1 ring-white/10'
                  : 'bg-white text-slate-900 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200'
              }`}
            >
              <span
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  activeStep === 2 ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Step 2
              </span>
              <h3
                className={`mt-4 text-2xl sm:text-3xl font-black tracking-tight transition-colors ${
                  activeStep === 2 ? 'text-white' : 'text-slate-950'
                }`}
              >
                Complete tasks
              </h3>
              <p
                className={`mt-3 text-sm sm:text-base leading-relaxed transition-colors ${
                  activeStep === 2 ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Choose from videos, paid surveys, games, and other micro tasks.
              </p>
            </div>
          </div>

          {/* =========================================================================
              CENTER COLUMN: HIGH-FIDELITY IPHONE PREVIEW
              ========================================================================= */}
          <div className="lg:col-span-4 flex justify-center order-3 lg:order-2 my-2 lg:my-0">
            <div className="relative w-[300px] sm:w-[325px] h-[590px] sm:h-[615px] rounded-[52px] bg-[#0A0D12] p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
              {/* Glossy Metallic Bezel Highlight */}
              <div className="absolute inset-0 rounded-[52px] border-[5px] border-slate-800/80 pointer-events-none" />

              {/* Hardware Side Buttons */}
              <div className="absolute -left-[5px] top-28 w-[3px] h-8 bg-slate-700 rounded-l" />
              <div className="absolute -left-[5px] top-40 w-[3px] h-12 bg-slate-700 rounded-l" />
              <div className="absolute -left-[5px] top-56 w-[3px] h-12 bg-slate-700 rounded-l" />
              <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-slate-700 rounded-r" />

              {/* Internal Screen Glass */}
              <div className="relative h-full w-full rounded-[42px] bg-[#121214] overflow-hidden flex flex-col justify-between select-none">
                {/* 1. Status Bar & Dynamic Island */}
                <div className="relative z-30 pt-3 px-6 flex items-center justify-between text-white text-[11px] font-semibold tracking-tight">
                  <span>9:41</span>
                  {/* Dynamic Island Pill */}
                  <div className="h-5 w-24 rounded-full bg-black flex items-center justify-end pr-2 gap-1.5 shadow-xs border border-white/5">
                    <div className="h-2 w-2 rounded-full bg-[#1A1A1A] border border-blue-900/30" />
                    <div className="h-2 w-2 rounded-full bg-[#0D2818] border border-emerald-500/40" />
                  </div>
                  {/* Battery & Signal */}
                  <div className="flex items-center gap-1.5">
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                      <rect x="2" y="16" width="3" height="6" rx="1" />
                      <rect x="7" y="12" width="3" height="10" rx="1" />
                      <rect x="12" y="8" width="3" height="14" rx="1" />
                      <rect x="17" y="4" width="3" height="18" rx="1" />
                    </svg>
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
                    </svg>
                    <div className="flex items-center">
                      <div className="w-5 h-2.5 rounded-sm border border-white p-0.5">
                        <div className="w-full h-full bg-white rounded-xs" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. DYNAMIC SCREEN CONTENT ACCORDING TO ACTIVE STEP */}
                <div className="relative flex-1 px-5 pt-3 pb-2 flex flex-col justify-between overflow-hidden">
                  {/* -------------------------------------------------------------
                      SCREEN 1: CREATE FREE ACCOUNT (Sign Up Screen)
                      ------------------------------------------------------------- */}
                  {activeStep === 1 && (
                    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
                      <div>
                        {/* Top Bar with Task Earn Branding */}
                        <div className="flex items-center justify-between pt-1 pb-2 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="flex h-2 w-2 rounded-full bg-[#793FFF] animate-pulse" />
                            <span className="font-extrabold text-white text-xs tracking-tight">task earn</span>
                          </div>
                          <span className="text-[10px] text-slate-400">Join Free</span>
                        </div>

                        <h4 className="mt-2 text-center text-xl font-extrabold text-white">
                          Sign up
                        </h4>

                        {/* 3 Illustrated Vector Avatars with Verified Badge */}
                        <div className="mt-4 flex justify-center items-center">
                          <div className="flex -space-x-3 items-center">
                            {/* Avatar 1 (Woman) */}
                            <div className="relative h-12 w-12 rounded-full ring-2 ring-[#121214] overflow-hidden bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                              <svg className="h-9 w-9 text-white/95" viewBox="0 0 36 36" fill="currentColor">
                                <circle cx="18" cy="13" r="6" />
                                <path d="M18 21c-5 0-10 3-10 7v2h20v-2c0-4-5-7-10-7z" />
                              </svg>
                            </div>
                            {/* Avatar 2 (Man with Beard & Glasses + Purple Verified Check Badge) */}
                            <div className="relative z-10 h-14 w-14 rounded-full ring-2 ring-[#121214] overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                              <svg className="h-11 w-11 text-white/95" viewBox="0 0 36 36" fill="currentColor">
                                <circle cx="18" cy="13" r="6.5" />
                                <path d="M18 21.5c-5.5 0-11 3.2-11 7.5v2h22v-2c0-4.3-5.5-7.5-11-7.5z" />
                              </svg>
                              {/* Purple Check Badge */}
                              <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-[#793FFF] flex items-center justify-center ring-2 ring-[#121214]">
                                <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                            </div>
                            {/* Avatar 3 (Woman) */}
                            <div className="relative h-12 w-12 rounded-full ring-2 ring-[#121214] overflow-hidden bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                              <svg className="h-9 w-9 text-white/95" viewBox="0 0 36 36" fill="currentColor">
                                <circle cx="18" cy="13" r="6" />
                                <path d="M18 21c-5 0-10 3-10 7v2h20v-2c0-4-5-7-10-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Sign-Up Providers */}
                        <div className="mt-6 space-y-2.5">
                          {/* Google */}
                          <div className="flex items-center gap-3.5 rounded-2xl bg-[#1D1D20] px-4 py-2.5 border border-white/5 shadow-xs">
                            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 10.03 0 12s.45 3.83 1.25 5.42l4.03-3.15z" />
                              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                            </svg>
                            <span className="text-xs font-semibold text-slate-200">
                              Sign up with Google
                            </span>
                          </div>

                          {/* Facebook */}
                          <div className="flex items-center gap-3.5 rounded-2xl bg-[#1D1D20] px-4 py-2.5 border border-white/5 shadow-xs">
                            <svg className="h-5 w-5 shrink-0 fill-[#1877F2]" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="text-xs font-semibold text-slate-200">
                              Sign up with Facebook
                            </span>
                          </div>

                          {/* Apple */}
                          <div className="flex items-center gap-3.5 rounded-2xl bg-[#1D1D20] px-4 py-2.5 border border-white/5 shadow-xs">
                            <svg className="h-5 w-5 shrink-0 fill-white" viewBox="0 0 24 24">
                              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.61 1.34-.55.63-.99 1.68-.86 2.69 1 .08 1.93-.43 2.55-1.18z" />
                            </svg>
                            <span className="text-xs font-semibold text-slate-200">
                              Sign up with Apple
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Prompt */}
                      <div className="mt-3 text-center text-[11px] text-slate-400 pb-2">
                        Already have an account?{' '}
                        <span className="text-white font-bold underline underline-offset-2">
                          Sign in
                        </span>
                      </div>
                    </div>
                  )}

                  {/* -------------------------------------------------------------
                      SCREEN 2: COMPLETE TASKS (4 Square Blunt Bars with Liquid Feel)
                      ------------------------------------------------------------- */}
                  {activeStep === 2 && (
                    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
                      <div>
                        {/* Top Bar with Clear "task earn" mention (ashu_earn removed) */}
                        <div className="flex items-center justify-between pt-1 pb-2.5 text-xs text-slate-400 border-b border-white/5">
                          <div className="flex items-center gap-1.5">
                            <span className="flex h-2 w-2 rounded-full bg-[#793FFF] animate-pulse" />
                            <span className="font-extrabold text-white text-xs tracking-tight">task earn</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span>Activity</span>
                            <span className="text-[#B5FF24] font-semibold">Rewards</span>
                            <span>&gt;</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <h4 className="text-base font-extrabold text-white tracking-tight">
                            Popular tasks
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">4 Channels</span>
                        </div>

                        {/* 4 Square Blunt Border Bars with Aesthetic Liquid Glass Feel */}
                        <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                          {/* Square 1: Speed Quizzes (Liquid Purple Wave) */}
                          <div className="group relative overflow-hidden rounded-[20px] p-3 flex flex-col justify-between aspect-square border border-violet-400/30 bg-gradient-to-br from-[#793FFF]/90 via-[#8B5CF6]/80 to-[#4F46E5]/90 shadow-md shadow-violet-500/20 text-white">
                            {/* Fluid Liquid Swirl Graphic */}
                            <svg className="absolute -bottom-2 -left-2 w-24 h-14 text-white/15 pointer-events-none" viewBox="0 0 100 50" fill="currentColor">
                              <path d="M0,20 C30,45 50,5 80,30 C90,40 100,10 100,50 L0,50 Z" />
                            </svg>
                            <div className="relative z-10 flex items-center justify-between">
                              <div className="h-7 w-7 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-xs">
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                              </div>
                              <span className="text-[10px] font-bold text-violet-100 bg-black/20 px-1.5 py-0.5 rounded-full">
                                7s
                              </span>
                            </div>
                            <div className="relative z-10">
                              <p className="text-xs font-black tracking-tight leading-snug">Quizzes</p>
                              <p className="text-[10px] font-medium text-violet-100 mt-0.5">+10 pts</p>
                            </div>
                          </div>

                          {/* Square 2: Watch & Earn (Liquid Sunset Rose) */}
                          <div className="group relative overflow-hidden rounded-[20px] p-3 flex flex-col justify-between aspect-square border border-rose-400/30 bg-gradient-to-br from-[#F43F5E]/90 via-[#E11D48]/80 to-[#BE123C]/90 shadow-md shadow-rose-500/20 text-white">
                            {/* Fluid Liquid Swirl Graphic */}
                            <svg className="absolute -bottom-2 -left-2 w-24 h-14 text-white/15 pointer-events-none" viewBox="0 0 100 50" fill="currentColor">
                              <path d="M0,25 C25,10 55,40 85,15 C95,25 100,10 100,50 L0,50 Z" />
                            </svg>
                            <div className="relative z-10 flex items-center justify-between">
                              <div className="h-7 w-7 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-xs">
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                                  <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                              </div>
                              <span className="text-[10px] font-bold text-rose-100 bg-black/20 px-1.5 py-0.5 rounded-full">
                                Video
                              </span>
                            </div>
                            <div className="relative z-10">
                              <p className="text-xs font-black tracking-tight leading-snug">Watch &amp; earn</p>
                              <p className="text-[10px] font-medium text-rose-100 mt-0.5">+35 pts</p>
                            </div>
                          </div>

                          {/* Square 3: Train AI (Liquid Electric Cyan) */}
                          <div className="group relative overflow-hidden rounded-[20px] p-3 flex flex-col justify-between aspect-square border border-cyan-400/30 bg-gradient-to-br from-[#06B6D4]/90 via-[#0EA5E9]/80 to-[#2563EB]/90 shadow-md shadow-cyan-500/20 text-white">
                            {/* Fluid Liquid Swirl Graphic */}
                            <svg className="absolute -bottom-2 -left-2 w-24 h-14 text-white/15 pointer-events-none" viewBox="0 0 100 50" fill="currentColor">
                              <path d="M0,30 C35,15 65,45 85,20 C95,30 100,15 100,50 L0,50 Z" />
                            </svg>
                            <div className="relative z-10 flex items-center justify-between">
                              <div className="h-7 w-7 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-xs">
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <rect x="4" y="4" width="16" height="16" rx="2" />
                                  <rect x="9" y="9" width="6" height="6" />
                                </svg>
                              </div>
                              <span className="text-[10px] font-bold text-cyan-100 bg-black/20 px-1.5 py-0.5 rounded-full">
                                RLHF
                              </span>
                            </div>
                            <div className="relative z-10">
                              <p className="text-xs font-black tracking-tight leading-snug">Train AI</p>
                              <p className="text-[10px] font-medium text-cyan-100 mt-0.5">+30 pts</p>
                            </div>
                          </div>

                          {/* Square 4: Play & Earn (Liquid Electric Lime/Emerald) */}
                          <div className="group relative overflow-hidden rounded-[20px] p-3 flex flex-col justify-between aspect-square border border-emerald-400/30 bg-gradient-to-br from-[#10B981]/95 via-[#84CC16]/90 to-[#B5FF24]/95 shadow-md shadow-emerald-500/20 text-slate-950">
                            {/* Fluid Liquid Swirl Graphic */}
                            <svg className="absolute -bottom-2 -left-2 w-24 h-14 text-black/15 pointer-events-none" viewBox="0 0 100 50" fill="currentColor">
                              <path d="M0,20 C30,40 60,10 80,35 C90,45 100,10 100,50 L0,50 Z" />
                            </svg>
                            <div className="relative z-10 flex items-center justify-between">
                              <div className="h-7 w-7 rounded-xl bg-slate-950/20 backdrop-blur-md flex items-center justify-center text-slate-950 border border-black/15 shadow-xs">
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <line x1="6" y1="12" x2="10" y2="12" />
                                  <line x1="8" y1="10" x2="8" y2="14" />
                                  <line x1="15" y1="13" x2="15.01" y2="13" />
                                  <line x1="18" y1="11" x2="18.01" y2="11" />
                                  <rect x="2" y="6" width="20" height="12" rx="2" />
                                </svg>
                              </div>
                              <span className="text-[10px] font-bold text-slate-950 bg-white/40 px-1.5 py-0.5 rounded-full">
                                Games
                              </span>
                            </div>
                            <div className="relative z-10">
                              <p className="text-xs font-black tracking-tight leading-snug">Play &amp; earn</p>
                              <p className="text-[10px] font-bold text-slate-800 mt-0.5">+50 pts</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-[10px] text-slate-400 pb-2">
                        Liquid aesthetic task engine
                      </div>
                    </div>
                  )}

                  {/* -------------------------------------------------------------
                      SCREEN 3: COLLECT CREDITS (Quizzes 980 pts, Watch 280 coins, Microtasks 160 coins, 142 rupee earned, Withdraw)
                      ------------------------------------------------------------- */}
                  {activeStep === 3 && (
                    <div className="flex-1 flex flex-col justify-between animate-fadeIn relative">
                      <div>
                        {/* Top Bar with Clear "task earn" mention (ashu_earn removed) */}
                        <div className="flex items-center justify-between pt-1 pb-2.5 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="flex h-2 w-2 rounded-full bg-[#793FFF] animate-pulse" />
                            <span className="font-extrabold text-white text-xs tracking-tight">task earn</span>
                          </div>
                          <span className="text-[11px] text-slate-400">&lt; Back</span>
                        </div>

                        <div className="mt-1 text-center">
                          <h4 className="text-lg font-black text-white">My Activity</h4>
                          <p className="text-[11px] text-slate-400">30 days activity</p>
                        </div>

                        {/* White Activity Container Card */}
                        <div className="mt-3 rounded-[26px] bg-white p-4 text-slate-900 shadow-xl relative">
                          <div className="space-y-2.5 text-xs">
                            {/* Item 1: Quizzes -> 980 points */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-lg bg-purple-100 text-[#793FFF] flex items-center justify-center">
                                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                  </svg>
                                </div>
                                <span className="font-bold text-slate-700">Quizzes</span>
                              </div>
                              <div className="flex items-center gap-1 font-extrabold text-slate-950 font-mono text-[11px]">
                                <span className="h-3.5 w-3.5 rounded-full bg-black text-white flex items-center justify-center text-[9px]">+</span>
                                <span>980 pts</span>
                              </div>
                            </div>

                            {/* Item 2: Watch & earn -> 280 coins */}
                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                  </svg>
                                </div>
                                <span className="font-bold text-slate-700">Watch &amp; earn</span>
                              </div>
                              <div className="flex items-center gap-1 font-extrabold text-slate-950 font-mono text-[11px]">
                                <span className="h-3.5 w-3.5 rounded-full bg-black text-white flex items-center justify-center text-[9px]">+</span>
                                <span>280 coins</span>
                              </div>
                            </div>

                            {/* Item 3: Microtasks -> 160 coins */}
                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center">
                                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="9 11 12 14 22 4" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                  </svg>
                                </div>
                                <span className="font-bold text-slate-700">Microtasks</span>
                              </div>
                              <div className="flex items-center gap-1 font-extrabold text-slate-950 font-mono text-[11px]">
                                <span className="h-3.5 w-3.5 rounded-full bg-black text-white flex items-center justify-center text-[9px]">+</span>
                                <span>160 coins</span>
                              </div>
                            </div>

                            {/* Little thin margin separator with "142 rupee earned" */}
                            <div className="pt-2.5 mt-1 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-[11px] font-bold text-slate-500">Total Accrued</span>
                              <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full font-mono">
                                142 rupee earned
                              </span>
                            </div>
                          </div>

                          {/* Withdraw Button (renamed from View All) */}
                          <div className="mt-3">
                            <button className="w-full rounded-full bg-black hover:bg-slate-900 py-2.5 text-center text-xs font-black text-white shadow-md transition active:scale-95 cursor-pointer">
                              Withdraw
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 3D Pixel Neon-Lime Mouse Cursor */}
                      <div className="absolute right-2 top-36 pointer-events-none z-30 transform hover:scale-110 transition-transform">
                        <svg className="w-16 h-20 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)]" viewBox="0 0 70 85" fill="none">
                          {/* 3D Dark Extruded Bevel */}
                          <path
                            d="M 16 7 L 16 62 L 28 50 L 39 74 L 49 69 L 38 46 L 56 46 Z"
                            fill="#4D8800"
                          />
                          {/* Main Neon-Lime Pixel Face */}
                          <path
                            d="M 12 3 L 12 58 L 24 46 L 35 70 L 45 65 L 34 42 L 52 42 Z"
                            fill="#B5FF24"
                          />
                          {/* Pixel Accent Highlight */}
                          <rect x="18" y="10" width="4" height="4" fill="#E4FF85" />
                        </svg>
                      </div>

                      <div className="text-center text-[10px] text-slate-500 pb-2">
                        10 points = 1 rupee instant conversion
                      </div>
                    </div>
                  )}

                  {/* -------------------------------------------------------------
                      SCREEN 4: CASH OUT (24 hours withdrawal only at bottom)
                      ------------------------------------------------------------- */}
                  {activeStep === 4 && (
                    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
                      <div>
                        {/* Top Bar with Clear "task earn" mention (ashu_earn removed) */}
                        <div className="flex items-center justify-between pt-1 pb-2.5 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="flex h-2 w-2 rounded-full bg-[#793FFF] animate-pulse" />
                            <span className="font-extrabold text-white text-xs tracking-tight">task earn</span>
                          </div>
                          <span className="text-[11px] text-slate-400">&lt; Back</span>
                        </div>

                        <div className="text-center mt-1">
                          <h4 className="text-lg font-black text-white">Payout</h4>
                        </div>

                        {/* 3D Isometric Stacked Vouchers Visual */}
                        <div className="my-2 flex justify-center items-center h-24">
                          <svg className="w-32 h-24 filter drop-shadow-[0_15px_25px_rgba(255,85,0,0.35)]" viewBox="0 0 160 120">
                            {/* Layer 1 (Bottom Orange Layer) */}
                            <polygon points="80,85 140,55 80,25 20,55" fill="#FF5500" opacity="0.9" />
                            {/* Layer 2 (Middle Pink Layer) */}
                            <polygon points="80,75 140,45 80,15 20,45" fill="#FF2A85" opacity="0.95" />
                            {/* Layer 3 (Top Violet Gradient Layer) */}
                            <defs>
                              <linearGradient id="payoutTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#C084FC" />
                                <stop offset="50%" stopColor="#F43F5E" />
                                <stop offset="100%" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                            <polygon points="80,65 140,35 80,5 20,35" fill="url(#payoutTopGrad)" />
                            {/* Currency Symbol in Center of Top Layer */}
                            <text
                              x="80"
                              y="38"
                              textAnchor="middle"
                              fill="white"
                              fontSize="16"
                              fontWeight="900"
                              fontFamily="sans-serif"
                            >
                              ₹
                            </text>
                          </svg>
                        </div>

                        {/* Payout Channels list */}
                        <div className="space-y-2">
                          {/* Paytm / UPI */}
                          <div className="flex items-center justify-between rounded-2xl bg-white px-3.5 py-2.5 text-slate-900 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-2.5">
                              <div className="h-6 w-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-black">
                                P
                              </div>
                              <span className="text-xs font-bold text-slate-900">Paytm / UPI</span>
                            </div>
                            <span className="text-xs font-bold text-slate-400">&gt;</span>
                          </div>

                          {/* Gift Card */}
                          <div className="flex items-center justify-between rounded-2xl bg-white px-3.5 py-2.5 text-slate-900 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-2.5">
                              <div className="h-6 w-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black">
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <rect x="2" y="5" width="20" height="14" rx="2" />
                                  <line x1="2" y1="10" x2="22" y2="10" />
                                </svg>
                              </div>
                              <span className="text-xs font-bold text-slate-900">Gift card</span>
                            </div>
                            <span className="text-xs font-bold text-slate-400">&gt;</span>
                          </div>

                          {/* PayPal / Prepaid Card */}
                          <div className="flex items-center justify-between rounded-2xl bg-white px-3.5 py-2.5 text-slate-900 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-2.5">
                              <div className="h-6 w-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                                $
                              </div>
                              <span className="text-xs font-bold text-slate-900">PayPal / Prepaid</span>
                            </div>
                            <span className="text-xs font-bold text-slate-400">&gt;</span>
                          </div>
                        </div>
                      </div>

                      {/* Clean 24 Hours Withdrawal text only */}
                      <div className="text-center text-[11px] font-bold text-slate-400 pb-2">
                        24 hours withdrawal
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. iPhone Bottom Home Indicator */}
                <div className="relative z-30 pb-2 pt-1 flex justify-center">
                  <div className="h-1 w-28 rounded-full bg-white/30" />
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: STEP 3 & STEP 4
              ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-7 order-2 lg:order-3 h-full justify-between">
            {/* Step 3 Card */}
            <div
              onClick={() => handleStepSelect(3)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleStepSelect(3)}
              className={`group relative flex flex-col justify-center rounded-[32px] p-8 sm:p-9 min-h-[250px] sm:min-h-[275px] transition-all duration-300 cursor-pointer select-none ${
                activeStep === 3
                  ? 'bg-[#161616] text-white shadow-2xl scale-[1.02] ring-1 ring-white/10'
                  : 'bg-white text-slate-900 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200'
              }`}
            >
              <span
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  activeStep === 3 ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Step 3
              </span>
              <h3
                className={`mt-4 text-2xl sm:text-3xl font-black tracking-tight transition-colors ${
                  activeStep === 3 ? 'text-white' : 'text-slate-950'
                }`}
              >
                Collect credits
              </h3>
              <p
                className={`mt-3 text-sm sm:text-base leading-relaxed transition-colors ${
                  activeStep === 3 ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Earn credits for every task you finish. 10 points = 1 rupee.
              </p>
            </div>

            {/* Step 4 Card */}
            <div
              onClick={() => handleStepSelect(4)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleStepSelect(4)}
              className={`group relative flex flex-col justify-center rounded-[32px] p-8 sm:p-9 min-h-[250px] sm:min-h-[275px] transition-all duration-300 cursor-pointer select-none ${
                activeStep === 4
                  ? 'bg-[#161616] text-white shadow-2xl scale-[1.02] ring-1 ring-white/10'
                  : 'bg-white text-slate-900 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200'
              }`}
            >
              <span
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  activeStep === 4 ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Step 4
              </span>
              <h3
                className={`mt-4 text-2xl sm:text-3xl font-black tracking-tight transition-colors ${
                  activeStep === 4 ? 'text-white' : 'text-slate-950'
                }`}
              >
                Cash out
              </h3>
              <p
                className={`mt-3 text-sm sm:text-base leading-relaxed transition-colors ${
                  activeStep === 4 ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Turn credits into gift cards or direct UPI/Paytm. Pay out from ₹100 or $1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
