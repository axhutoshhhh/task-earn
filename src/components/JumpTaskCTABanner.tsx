'use client';

import React from 'react';
import Link from 'next/link';

export default function JumpTaskCTABanner() {
  return (
    <section className="relative w-full bg-[#C5FF5A] overflow-hidden pt-16 sm:pt-20 lg:pt-28 pb-0">
      {/* Subtle Ambient Light Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/[0.04] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* =========================================================================
              LEFT COLUMN: Typography, Value Proposition, Action CTA & Trust Micro-Copy
              ========================================================================= */}
          <div className="lg:col-span-7 pb-12 sm:pb-16 lg:pb-28 pt-2">
            <h2 className="text-4xl sm:text-6xl lg:text-[72px] xl:text-[80px] font-black tracking-tight text-slate-950 leading-[1.03]">
              Start earning in<br />
              the next 5<br />
              minutes
            </h2>

            <p className="mt-8 text-base sm:text-lg text-slate-900 leading-relaxed max-w-xl font-medium">
              Multiple ways to earn. Real payouts. Transparent system. Task Earn gives you complete control over your time and earnings. Create your free account and claim your first rewards today.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#161616] hover:bg-black px-9 py-4 text-base font-bold text-white shadow-xl shadow-black/15 transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer"
              >
                <span>Create free account</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Reassurance Row */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                <span>8 sec to first reward</span>
              </span>
              <span className="text-slate-500">&bull;</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                <span>3,500+ daily tasks</span>
              </span>
              <span className="text-slate-500">&bull;</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                <span>Zero fees forever</span>
              </span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Bespoke Handcrafted 3D Hand & Smartphone Vector Artwork
              ========================================================================= */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-end select-none">
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[500px] flex items-end justify-center">
              <svg
                viewBox="0 0 540 600"
                className="w-full h-auto max-h-[580px] drop-shadow-2xl overflow-visible select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Ambient Soft Dropshadow Filter */}
                  <filter id="ctaHandShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="24" result="blur" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.05   0 0 0 0 0.14   0 0 0 0 0.02   0 0 0 0.35 0" />
                  </filter>

                  {/* Neon Lime Glow Filter */}
                  <filter id="ctaLimeGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="9" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Phone Screen Gradient (Deep Obsidian) */}
                  <linearGradient id="ctaScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0E121A" />
                    <stop offset="40%" stopColor="#090B10" />
                    <stop offset="100%" stopColor="#050608" />
                  </linearGradient>

                  {/* Titanium Phone Frame Gradient */}
                  <linearGradient id="ctaTitaniumFrame" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3F4756" />
                    <stop offset="25%" stopColor="#252B37" />
                    <stop offset="70%" stopColor="#0F131A" />
                    <stop offset="100%" stopColor="#2B323F" />
                  </linearGradient>

                  {/* Metallic Bevel Highlight */}
                  <linearGradient id="ctaBezelHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1E232D" stopOpacity="0.3" />
                  </linearGradient>

                  {/* 3D Electric Lime Star Gradient */}
                  <linearGradient id="ctaLimeStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F4FF8A" />
                    <stop offset="45%" stopColor="#B5FF24" />
                    <stop offset="100%" stopColor="#65A30D" />
                  </linearGradient>

                  {/* Hand Skin Tone Gradients (Rich Deep Umber with Natural Volume) */}
                  <linearGradient id="ctaHandSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5E3E30" />
                    <stop offset="35%" stopColor="#432B20" />
                    <stop offset="75%" stopColor="#2A1B14" />
                    <stop offset="100%" stopColor="#150B07" />
                  </linearGradient>

                  <linearGradient id="ctaThumbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6E4837" />
                    <stop offset="45%" stopColor="#4A3024" />
                    <stop offset="100%" stopColor="#24150E" />
                  </linearGradient>

                  <linearGradient id="ctaFingerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#634233" />
                    <stop offset="50%" stopColor="#452B1E" />
                    <stop offset="100%" stopColor="#25160E" />
                  </linearGradient>

                  {/* Ambient Lime Rim Light Reflecting on Hand Contour */}
                  <linearGradient id="ctaHandRimLight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C5FF5A" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#C5FF5A" stopOpacity="0" />
                  </linearGradient>

                  {/* 3D Gold Coin Gradients */}
                  <linearGradient id="ctaCoinFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2B2" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>

                  <linearGradient id="ctaCoinRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#B45309" />
                    <stop offset="100%" stopColor="#78350F" />
                  </linearGradient>
                </defs>

                {/* 1. Ambient Surface Shadows on Ground */}
                <ellipse cx="280" cy="545" rx="180" ry="40" fill="#0D2405" opacity="0.35" filter="url(#ctaHandShadow)" />
                <rect x="150" y="65" width="250" height="485" rx="42" fill="#0D2405" opacity="0.28" filter="url(#ctaHandShadow)" transform="rotate(-4.5, 280, 305)" />

                {/* 2. Base Palm Geometry behind phone */}
                <path d="M190,460 C180,510 190,560 195,600 L380,600 C375,560 380,510 390,440 Z" fill="url(#ctaHandSkinGrad)" />

                {/* 3. Rotated Phone Chassis (-4.5 deg natural ergonomic tilt) */}
                <g transform="rotate(-4.5, 280, 305)">
                  {/* Titanium Outer Frame */}
                  <rect x="155" y="60" width="250" height="485" rx="42" fill="url(#ctaTitaniumFrame)" stroke="url(#ctaBezelHighlight)" strokeWidth="1.5" />

                  {/* Screen Glass Face */}
                  <rect x="163" y="68" width="234" height="469" rx="35" fill="url(#ctaScreenGrad)" stroke="#1F2533" strokeWidth="1" />

                  {/* Subtle Diagonal Specular Reflection across Screen */}
                  <path d="M220,68 L360,68 C385,68 395,85 395,110 L300,320 L220,68 Z" fill="#FFFFFF" opacity="0.035" />

                  {/* Dynamic Island */}
                  <rect x="246" y="78" width="68" height="18" rx="9" fill="#000000" />
                  <circle cx="295" cy="87" r="3.2" fill="#081A2D" opacity="0.8" />
                  <circle cx="295" cy="87" r="1.2" fill="#1E3A8A" />

                  {/* Screen App Header */}
                  <g transform="translate(182, 105)">
                    {/* Task Earn Brand Logo with Purple Accent Dot */}
                    <text x="0" y="12" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                      task earn
                    </text>
                    <circle cx="64" cy="8" r="3" fill="#793FFF" />

                    {/* Right Hamburger Menu Icon */}
                    <g transform="translate(180, 4)" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
                      <line x1="0" y1="0" x2="16" y2="0" />
                      <line x1="0" y1="4" x2="16" y2="4" />
                      <line x1="0" y1="8" x2="16" y2="8" />
                    </g>
                  </g>

                  {/* Commanding Screen Headline */}
                  <text x="184" y="166" fill="#FFFFFF" fontSize="35" fontWeight="950" fontFamily="sans-serif" letterSpacing="-1">
                    DON&apos;T
                  </text>
                  <text x="184" y="202" fill="#FFFFFF" fontSize="35" fontWeight="950" fontFamily="sans-serif" letterSpacing="-1">
                    MISS
                  </text>
                  <text x="184" y="238" fill="#FFFFFF" fontSize="35" fontWeight="950" fontFamily="sans-serif" letterSpacing="-1">
                    OUT.
                  </text>

                  {/* 3D Electric Lime Stars */}
                  <g filter="url(#ctaLimeGlow)">
                    {/* Large 4-Point Star Gem */}
                    <path d="M260,252 Q260,285 227,285 Q260,285 260,318 Q260,285 293,285 Q260,285 260,252 Z" fill="url(#ctaLimeStarGrad)" />
                    {/* Facet Highlights */}
                    <line x1="260" y1="256" x2="260" y2="314" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
                    <line x1="231" y1="285" x2="289" y2="285" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

                    {/* Small Companion Star Gem */}
                    <path d="M312,296 Q312,315 293,315 Q312,315 312,334 Q312,315 331,315 Q312,315 312,296 Z" fill="url(#ctaLimeStarGrad)" />
                  </g>

                  {/* Live Task Earning Pill on Screen */}
                  <g transform="translate(180, 345)">
                    <rect x="0" y="0" width="200" height="34" rx="17" fill="#131722" stroke="#252D3F" strokeWidth="1" />
                    <circle cx="18" cy="17" r="6" fill="#10B981" />
                    <path d="M15 17 L17 19 L21 15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="32" y="21" fill="#FFFFFF" fontSize="10" fontWeight="800" fontFamily="sans-serif">
                      +50 PTS &bull; SPEED QUIZ
                    </text>
                  </g>

                  {/* Screen Subtitle Copy */}
                  <text x="182" y="405" fill="#94A3B8" fontSize="10.5" fontWeight="500" fontFamily="sans-serif">
                    Watch short videos and complete simple
                  </text>
                  <text x="182" y="420" fill="#94A3B8" fontSize="10.5" fontWeight="500" fontFamily="sans-serif">
                    tasks to earn instant cash.
                  </text>

                  {/* Screen Button: Start your tasks */}
                  <g transform="translate(180, 444)">
                    <rect x="0" y="0" width="200" height="38" rx="19" fill="#161B26" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.2" />
                    <text x="100" y="24" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
                      Start your tasks →
                    </text>
                  </g>
                </g>

                {/* 4. Foreground Sculpted Hand: Left Thumb Wrapping Phone Bezel */}
                <g>
                  {/* Thumb Shadow on Titanium Frame */}
                  <path d="M142,345 C150,320 162,290 178,270 C184,285 186,310 182,345 C176,375 168,410 156,430 Z" fill="#081005" opacity="0.45" />

                  {/* Thumb Anatomical Body */}
                  <path d="M125,500 C120,440 135,370 152,320 C158,300 166,275 178,270 C188,266 193,280 188,310 C182,350 176,395 166,450 C158,495 152,545 150,600 L120,600 Z" fill="url(#ctaThumbGrad)" stroke="url(#ctaHandRimLight)" strokeWidth="1.5" />

                  {/* Thumb Knuckle Shading & Highlights */}
                  <path d="M152,320 C158,305 166,285 176,278" stroke="#8C5C45" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  <path d="M174,272 C182,270 186,280 184,298" stroke="#A77258" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                </g>

                {/* 5. Foreground Sculpted Hand: Right Wrapping Fingertips */}
                <g>
                  {/* Index Finger */}
                  <g transform="translate(385, 205)">
                    <path d="M0,0 C15,0 35,5 38,20 C40,32 25,40 10,40 C0,40 -8,30 -5,18 Z" fill="url(#ctaFingerGrad)" />
                    <ellipse cx="6" cy="20" rx="8" ry="12" fill="#0A1005" opacity="0.3" />
                    <path d="M5,8 C18,8 28,12 28,24" stroke="#8C5C45" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
                  </g>

                  {/* Middle Finger */}
                  <g transform="translate(388, 265)">
                    <path d="M0,0 C18,0 40,6 42,22 C44,35 28,42 12,42 C0,42 -8,32 -5,18 Z" fill="url(#ctaFingerGrad)" />
                    <ellipse cx="6" cy="21" rx="8" ry="12" fill="#0A1005" opacity="0.3" />
                    <path d="M5,8 C20,8 30,12 30,25" stroke="#8C5C45" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
                  </g>

                  {/* Ring Finger */}
                  <g transform="translate(385, 325)">
                    <path d="M0,0 C16,0 36,5 38,20 C40,32 25,40 10,40 C0,40 -8,30 -5,18 Z" fill="url(#ctaFingerGrad)" />
                    <ellipse cx="6" cy="20" rx="8" ry="12" fill="#0A1005" opacity="0.3" />
                    <path d="M5,8 C18,8 28,12 28,24" stroke="#8C5C45" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
                  </g>

                  {/* Pinky Finger */}
                  <g transform="translate(380, 385)">
                    <path d="M0,0 C14,0 32,5 34,18 C36,28 22,36 8,36 C0,36 -8,26 -5,16 Z" fill="url(#ctaFingerGrad)" />
                    <ellipse cx="5" cy="18" rx="7" ry="10" fill="#0A1005" opacity="0.3" />
                    <path d="M4,7 C15,7 24,10 24,20" stroke="#8C5C45" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
                  </g>

                  {/* Right Heel & Wrist extending down to base border */}
                  <path d="M395,430 C410,470 415,530 410,600 L370,600 C375,540 375,480 370,440 Z" fill="url(#ctaHandSkinGrad)" stroke="url(#ctaHandRimLight)" strokeWidth="1.5" />
                </g>

                {/* 6. Floating 3D Gold Rupee Coin on Left */}
                <g transform="translate(75, 220) rotate(-14)">
                  <ellipse cx="30" cy="38" rx="30" ry="24" fill="url(#ctaCoinRimGrad)" />
                  <ellipse cx="30" cy="30" rx="30" ry="24" fill="url(#ctaCoinFaceGrad)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
                  <text x="30" y="38" fill="#78350F" fontSize="22" fontWeight="950" fontFamily="sans-serif" textAnchor="middle">
                    ₹
                  </text>
                  {/* Coin Specular Glint */}
                  <polygon points="12,18 14,23 19,25 14,27 12,32 10,27 5,25 10,23" fill="#FFFFFF" opacity="0.9" />
                </g>

                {/* 7. Floating 3D Sparkle Crystals in Atmosphere */}
                <g filter="url(#ctaLimeGlow)">
                  <polygon points="480,120 484,132 496,136 484,140 480,152 476,140 464,136 476,132" fill="#FFFFFF" opacity="0.85" />
                  <polygon points="460,390 463,398 471,400 463,402 460,410 457,402 449,400 457,398" fill="#FFFFFF" opacity="0.75" />
                  <circle cx="100" cy="140" r="3" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="490" cy="270" r="2.5" fill="#FFFFFF" opacity="0.8" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
