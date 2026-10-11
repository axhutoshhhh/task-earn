'use client';

import React from 'react';
import Link from 'next/link';

export default function JumpTaskCTABanner() {
  return (
    <section className="relative w-full bg-[#C5FF5A] overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Subtle Ambient Light Wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/[0.03] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* =========================================================================
              LEFT COLUMN: Typography, Description & Action CTA Button
              ========================================================================= */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-4xl sm:text-6xl lg:text-[72px] xl:text-[80px] font-black tracking-tight text-slate-950 leading-[1.03]">
              Start earning in<br />
              the next 5<br />
              minutes
            </h2>

            <p className="text-base sm:text-lg text-slate-900 leading-relaxed max-w-xl font-medium">
              Multiple ways to earn. Real payouts. Transparent system. Task Earn gives you complete control over your time and earnings. Create your free account and claim your first rewards today.
            </p>

            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#161616] hover:bg-black px-10 py-4.5 text-base font-bold text-white shadow-xl shadow-black/15 transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer"
              >
                <span>Create free account</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Symmetrically Floating 3D Smartphone with Coin & 2 Neon Stars
              ========================================================================= */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center select-none">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] flex items-center justify-center">
              <svg
                viewBox="0 0 540 620"
                className="w-full h-auto max-h-[580px] drop-shadow-2xl overflow-visible select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Ambient Soft Levitation Shadow */}
                  <filter id="phoneLevitateShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="24" result="blur" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.05   0 0 0 0 0.14   0 0 0 0 0.02   0 0 0 0.36 0" />
                  </filter>

                  {/* Intense Neon Star Glow Filter */}
                  <filter id="neonStarGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="10" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Phone Screen Gradient (Deep Obsidian) */}
                  <linearGradient id="phoneScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0E121A" />
                    <stop offset="40%" stopColor="#090B10" />
                    <stop offset="100%" stopColor="#050608" />
                  </linearGradient>

                  {/* Space Black Titanium Phone Chassis */}
                  <linearGradient id="phoneTitanium" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3F4756" />
                    <stop offset="25%" stopColor="#222732" />
                    <stop offset="70%" stopColor="#0E1218" />
                    <stop offset="100%" stopColor="#2A313E" />
                  </linearGradient>

                  {/* Metallic Chamfer Edge Highlight */}
                  <linearGradient id="phoneBezelHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#1E232D" stopOpacity="0.3" />
                  </linearGradient>

                  {/* Neon Lime Star Gradient (Right Side) */}
                  <linearGradient id="starNeonLime" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#EAFF78" />
                    <stop offset="70%" stopColor="#B5FF24" />
                    <stop offset="100%" stopColor="#65A30D" />
                  </linearGradient>

                  {/* Neon Cyan Star Gradient (Left Side) */}
                  <linearGradient id="starNeonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor="#67E8F9" />
                    <stop offset="80%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>

                  {/* 3D Gold Rupee Coin Gradients */}
                  <linearGradient id="goldCoinFace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF3B0" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>

                  <linearGradient id="goldCoinRim" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#B45309" />
                    <stop offset="100%" stopColor="#78350F" />
                  </linearGradient>
                </defs>

                {/* 1. Ambient Levitation Ground Shadow under Floating Phone */}
                <ellipse cx="270" cy="565" rx="140" ry="32" fill="#0C2504" opacity="0.32" filter="url(#phoneLevitateShadow)" />

                {/* 2. Symmetrically Positioned Floating Smartphone (sleek -3.5 deg tilt) */}
                <g transform="rotate(-3.5, 270, 300)">
                  {/* Titanium Outer Chassis */}
                  <rect x="150" y="65" width="240" height="470" rx="42" fill="url(#phoneTitanium)" stroke="url(#phoneBezelHighlight)" strokeWidth="1.5" />

                  {/* Glossy Obsidian Screen Glass */}
                  <rect x="158" y="73" width="224" height="454" rx="35" fill="url(#phoneScreenGrad)" stroke="#1F2533" strokeWidth="1" />

                  {/* Specular Diagonal Glass Reflection */}
                  <path d="M210,73 L340,73 C370,73 382,90 382,115 L290,320 L210,73 Z" fill="#FFFFFF" opacity="0.04" />

                  {/* Dynamic Island */}
                  <rect x="236" y="83" width="68" height="18" rx="9" fill="#000000" />
                  <circle cx="285" cy="92" r="3.2" fill="#081A2D" opacity="0.8" />
                  <circle cx="285" cy="92" r="1.2" fill="#1E3A8A" />

                  {/* Screen App Header */}
                  <g transform="translate(176, 112)">
                    {/* Brand Logo with Purple Accent Dot */}
                    <text x="0" y="11" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                      task earn
                    </text>
                    <circle cx="64" cy="7" r="3" fill="#793FFF" />

                    {/* Right Hamburger Menu Icon */}
                    <g transform="translate(170, 3)" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
                      <line x1="0" y1="0" x2="16" y2="0" />
                      <line x1="0" y1="4" x2="16" y2="4" />
                      <line x1="0" y1="8" x2="16" y2="8" />
                    </g>
                  </g>

                  {/* Commanding Screen Headline */}
                  <text x="178" y="170" fill="#FFFFFF" fontSize="34" fontWeight="950" fontFamily="sans-serif" letterSpacing="-1">
                    DON&apos;T
                  </text>
                  <text x="178" y="206" fill="#FFFFFF" fontSize="34" fontWeight="950" fontFamily="sans-serif" letterSpacing="-1">
                    MISS
                  </text>
                  <text x="178" y="242" fill="#FFFFFF" fontSize="34" fontWeight="950" fontFamily="sans-serif" letterSpacing="-1">
                    OUT.
                  </text>

                  {/* Central 3D Electric Lime Stars on Phone */}
                  <g filter="url(#neonStarGlow)">
                    {/* Large 4-Point Star Gem */}
                    <path d="M255,256 Q255,288 223,288 Q255,288 255,320 Q255,288 287,288 Q255,288 255,256 Z" fill="url(#starNeonLime)" />
                    {/* Star Facet Highlights */}
                    <line x1="255" y1="260" x2="255" y2="316" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
                    <line x1="227" y1="288" x2="283" y2="288" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

                    {/* Small Companion Star */}
                    <path d="M306,298 Q306,317 287,317 Q306,317 306,336 Q306,317 325,317 Q306,317 306,298 Z" fill="url(#starNeonLime)" />
                  </g>

                  {/* Live Task Earning Pill on Screen */}
                  <g transform="translate(174, 348)">
                    <rect x="0" y="0" width="192" height="34" rx="17" fill="#131722" stroke="#252D3F" strokeWidth="1" />
                    <circle cx="18" cy="17" r="6" fill="#10B981" />
                    <path d="M15 17 L17 19 L21 15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="32" y="21" fill="#FFFFFF" fontSize="9.5" fontWeight="800" fontFamily="sans-serif">
                      +50 PTS • SPEED QUIZ
                    </text>
                  </g>

                  {/* Screen Subtitle Copy */}
                  <text x="176" y="407" fill="#94A3B8" fontSize="10" fontWeight="500" fontFamily="sans-serif">
                    Watch short videos and complete simple
                  </text>
                  <text x="176" y="421" fill="#94A3B8" fontSize="10" fontWeight="500" fontFamily="sans-serif">
                    tasks to earn instant cash.
                  </text>

                  {/* Screen Button: Start your tasks */}
                  <g transform="translate(174, 444)">
                    <rect x="0" y="0" width="192" height="38" rx="19" fill="#161B26" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.2" />
                    <text x="96" y="24" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
                      Start your tasks →
                    </text>
                  </g>
                </g>

                {/* 3. Left Side: Floating 3D Gold Rupee Coin */}
                <g transform="translate(68, 280) rotate(-14)">
                  <ellipse cx="28" cy="35" rx="28" ry="22" fill="url(#goldCoinRim)" />
                  <ellipse cx="28" cy="28" rx="28" ry="22" fill="url(#goldCoinFace)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
                  <text x="28" y="36" fill="#78350F" fontSize="21" fontWeight="950" fontFamily="sans-serif" textAnchor="middle">
                    ₹
                  </text>
                  {/* Coin Specular Glint */}
                  <polygon points="11,17 13,22 18,24 13,26 11,31 9,26 4,24 9,22" fill="#FFFFFF" opacity="0.9" />
                </g>

                {/* 4. Left Side: Glowing Neon Art Star (Cyan Glow) */}
                <g transform="translate(85, 140)" filter="url(#neonStarGlow)">
                  <path d="M30,0 Q30,30 0,30 Q30,30 30,60 Q30,30 60,30 Q30,30 30,0 Z" fill="url(#starNeonCyan)" />
                  <circle cx="30" cy="30" r="4" fill="#FFFFFF" />
                </g>

                {/* 5. Right Side: Glowing Neon Art Star (Lime Glow) */}
                <g transform="translate(425, 200)" filter="url(#neonStarGlow)">
                  <path d="M32,0 Q32,32 0,32 Q32,32 32,64 Q32,32 64,32 Q32,32 32,0 Z" fill="url(#starNeonLime)" />
                  <circle cx="32" cy="32" r="4.5" fill="#FFFFFF" />
                </g>

                {/* 6. Additional Ambient Sparkle Crystals */}
                <g filter="url(#neonStarGlow)">
                  <polygon points="460,370 463,379 472,381 463,383 460,392 457,383 448,381 457,379" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="430" cy="110" r="3" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="120" cy="420" r="2.5" fill="#FFFFFF" opacity="0.8" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
