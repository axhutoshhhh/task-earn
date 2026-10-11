'use client';

import React from 'react';
import Link from 'next/link';

export default function JumpTaskTrustShowcase() {
  return (
    <section id="trust" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="mx-auto max-w-6xl">
        {/* =========================================================================
            HEADER: Commanding JumpTask Headline & Pill Tag
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-emerald-800 border border-emerald-300/60 shadow-xs mb-4">
            <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="uppercase text-[11px] tracking-wider font-extrabold">Total Transparency</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight text-slate-950 leading-[1.08]">
            100% safe and trusted earning app
          </h2>
          <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Your security, privacy, and earnings are our highest priority. We believe in absolute honesty, zero banking exposure, and guaranteed on-time reward redemptions.
          </p>
        </div>

        <div className="space-y-28 sm:space-y-40">
          {/* =========================================================================
              PILLAR 1: ZERO FINANCIAL DATA (Text LEFT, 3D Art RIGHT)
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Column */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-4">
                <span>Privacy First Architecture</span>
              </div>
              <h3 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-950 leading-tight">
                Zero financial data
              </h3>

              {/* Grey Metric Pill Card */}
              <div className="my-6 rounded-2xl bg-[#E5E9EE]/90 p-5 max-w-sm border border-slate-200/60 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Bank credentials required</p>
                <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">
                  0 Logins &bull; 100% Risk-Free
                </p>
              </div>

              <p className="font-bold text-slate-900 text-sm sm:text-base">
                Guarantee: We never ask for bank accounts, debit cards, or UPI PINs.
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                Task Earn operates on a strict zero-exposure policy. You only provide an email address or payout destination handle when redeeming rewards. Your banking credentials, CVVs, and passwords remain entirely untouched.
              </p>

              <div className="mt-8">
                <Link
                  href="/privacy"
                  className="inline-flex items-center justify-center rounded-full bg-[#161616] hover:bg-black px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  View privacy policy
                </Link>
              </div>
            </div>

            {/* 3D Artwork Column (Right) */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center select-none">
                {/* Multi-Spectrum Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/25 via-teal-400/25 to-cyan-500/20 rounded-full blur-3xl -z-10" />

                {/* 3D Isometric Biometric Vault & Floating Holographic Shield Art */}
                <svg viewBox="0 0 520 400" className="w-full h-full filter drop-shadow-2xl overflow-visible">
                  <defs>
                    {/* Emerald Shield Gradients */}
                    <linearGradient id="shieldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="50%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="shieldFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.95" />
                      <stop offset="45%" stopColor="#059669" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#064E3B" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="shieldDepthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#064E3B" />
                      <stop offset="100%" stopColor="#022C22" />
                    </linearGradient>

                    {/* Padlock Metallic Shackle */}
                    <linearGradient id="shackleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E2E8F0" />
                      <stop offset="35%" stopColor="#FFFFFF" />
                      <stop offset="70%" stopColor="#94A3B8" />
                      <stop offset="100%" stopColor="#64748B" />
                    </linearGradient>

                    {/* Padlock Body */}
                    <linearGradient id="lockBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0F172A" />
                      <stop offset="50%" stopColor="#047857" />
                      <stop offset="100%" stopColor="#064E3B" />
                    </linearGradient>

                    {/* Pedestal Platform */}
                    <linearGradient id="platformTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="platformSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#64748B" stopOpacity="0.3" />
                    </linearGradient>

                    {/* Holographic Ring Gradient */}
                    <linearGradient id="holoRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34D399" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="0.1" />
                    </linearGradient>

                    {/* Soft Glow Filter */}
                    <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 1. Isometric Hexagonal Floor Pedestal */}
                  <g transform="translate(0, 45)">
                    {/* Shadow under platform */}
                    <ellipse cx="260" cy="275" rx="190" ry="60" fill="#047857" opacity="0.12" filter="url(#emeraldGlow)" />

                    {/* Base Extrusions */}
                    <path d="M110,240 L260,305 L410,240 L410,260 L260,325 L110,260 Z" fill="url(#platformSideGrad)" />
                    {/* Top Surface */}
                    <polygon points="260,175 410,240 260,305 110,240" fill="url(#platformTopGrad)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.6" />

                    {/* Concentric Isometric Grid Lines on Platform */}
                    <polygon points="260,195 380,240 260,285 140,240" fill="none" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
                    <polygon points="260,215 340,240 260,265 180,240" fill="none" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.4" />
                  </g>

                  {/* 2. Concentric Holographic Scanner Orbit Rings */}
                  <g transform="rotate(-12, 260, 180)">
                    <ellipse cx="260" cy="180" rx="160" ry="70" fill="none" stroke="url(#holoRingGrad)" strokeWidth="2" strokeDasharray="8 6" opacity="0.75" />
                    <ellipse cx="260" cy="180" rx="130" ry="55" fill="none" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.5" />
                    {/* Orbiting Sensor Nodes */}
                    <circle cx="410" cy="170" r="4.5" fill="#34D399" filter="url(#emeraldGlow)" />
                    <circle cx="115" cy="190" r="3.5" fill="#06B6D4" filter="url(#emeraldGlow)" />
                    <circle cx="280" cy="115" r="3" fill="#6EE7B7" />
                  </g>

                  {/* 3. 3D Thick Sculpted Holographic Shield */}
                  <g transform="translate(260, 185) scale(1)">
                    {/* Shield Ambient Drop Shadow */}
                    <path
                      d="M0,-110 C60,-110 105,-85 105,-15 C105,65 35,115 0,140 C-35,115 -105,65 -105,-15 C-105,-85 -60,-110 0,-110 Z"
                      fill="#022C22"
                      opacity="0.35"
                      transform="translate(0, 22) scale(1.02)"
                    />

                    {/* Shield 3D Extrusion Depth (Bottom & Left/Right Edges) */}
                    <path
                      d="M-100,-15 C-100,65 -30,115 0,138 C30,115 100,65 100,-15 L106,-8 C106,72 32,124 0,148 C-32,124 -106,72 -106,-8 Z"
                      fill="url(#shieldDepthGrad)"
                    />

                    {/* Outer Beveled Shield Rim */}
                    <path
                      d="M0,-110 C60,-110 100,-85 100,-15 C100,65 32,115 0,138 C-32,115 -100,65 -100,-15 C-100,-85 -60,-110 0,-110 Z"
                      fill="url(#shieldRimGrad)"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeOpacity="0.4"
                    />

                    {/* Inner Recessed Glossy Glass Face */}
                    <path
                      d="M0,-96 C50,-96 84,-74 84,-14 C84,54 26,98 0,118 C-26,98 -84,54 -84,-14 C-84,-74 -50,-96 0,-96 Z"
                      fill="url(#shieldFaceGrad)"
                      stroke="#6EE7B7"
                      strokeWidth="1.2"
                      strokeOpacity="0.5"
                    />

                    {/* Diagonal Specular Highlight Curve */}
                    <path
                      d="M-60,-80 C-10,-88 40,-70 70,-30 C75,-10 65,30 40,70 C-10,40 -60,0 -60,-80 Z"
                      fill="#FFFFFF"
                      opacity="0.18"
                    />

                    {/* 4. Central 3D Floating Padlock / Security Core */}
                    <g transform="translate(0, 8)">
                      {/* Shackle */}
                      <path
                        d="M-22,-18 V-40 C-22,-54 22,-54 22,-40 V-18"
                        fill="none"
                        stroke="url(#shackleGrad)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Shackle Inner Hollow Mask Shadow */}
                      <path
                        d="M-22,-18 V-40 C-22,-54 22,-54 22,-40 V-18"
                        fill="none"
                        stroke="#0F172A"
                        strokeWidth="4"
                        strokeLinecap="round"
                        opacity="0.4"
                      />

                      {/* Chamfered Padlock Body Drop Shadow */}
                      <rect x="-38" y="-14" width="76" height="62" rx="16" fill="#022C22" opacity="0.4" transform="translate(0, 6)" />

                      {/* Padlock Body Solid */}
                      <rect x="-36" y="-16" width="72" height="58" rx="14" fill="url(#lockBodyGrad)" stroke="#34D399" strokeWidth="1.8" />

                      {/* Metallic Bevel Highlight */}
                      <rect x="-33" y="-13" width="66" height="20" rx="10" fill="#FFFFFF" opacity="0.12" />

                      {/* Glowing Mint Keyhole */}
                      <circle cx="0" cy="8" r="7" fill="#34D399" filter="url(#emeraldGlow)" />
                      <circle cx="0" cy="8" r="4.5" fill="#FFFFFF" />
                      <polygon points="-3,10 3,10 4.5,22 -4.5,22" fill="#34D399" />
                      <polygon points="-2,10 2,10 3,20 -3,20" fill="#FFFFFF" />

                      {/* Status LED Pulsed Ring */}
                      <circle cx="22" cy="-4" r="3" fill="#10B981" filter="url(#emeraldGlow)" />
                      <circle cx="22" cy="-4" r="1.5" fill="#FFFFFF" />
                    </g>
                  </g>

                  {/* 5. Floating Glass Pill Badge: "0 Bank Data" */}
                  <g transform="translate(350, 95) rotate(6)">
                    <rect x="0" y="0" width="124" height="42" rx="21" fill="#FFFFFF" fillOpacity="0.85" stroke="#34D399" strokeWidth="1.5" filter="url(#emeraldGlow)" />
                    <circle cx="22" cy="21" r="10" fill="#10B981" />
                    <path d="M18 21 L21 24 L27 18" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="38" y="25" fill="#064E3B" fontSize="12" fontWeight="900" fontFamily="sans-serif">
                      0 BANK DATA
                    </text>
                  </g>

                  {/* 6. Floating Ambient Sparkles */}
                  <g fill="#34D399" filter="url(#emeraldGlow)">
                    <polygon points="100,110 104,118 112,122 104,126 100,134 96,126 88,122 96,118" />
                    <polygon points="430,260 432,265 437,267 432,269 430,274 428,269 423,267 428,265" />
                    <circle cx="160" cy="90" r="3" fill="#06B6D4" />
                    <circle cx="390" cy="210" r="2.5" fill="#6EE7B7" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* =========================================================================
              PILLAR 2: IMMUTABLE LEDGER (3D Art LEFT, Text RIGHT)
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 3D Artwork Column (Left) */}
            <div className="order-1 flex justify-center items-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center select-none">
                {/* Multi-Spectrum Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/25 via-indigo-500/25 to-cyan-400/20 rounded-full blur-3xl -z-10" />

                {/* 3D Isometric Cryptographic Ledger Cube & Chain Art */}
                <svg viewBox="0 0 520 400" className="w-full h-full filter drop-shadow-2xl overflow-visible">
                  <defs>
                    {/* Purple / Indigo Gradients */}
                    <linearGradient id="cubeTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C084FC" />
                      <stop offset="60%" stopColor="#818CF8" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                    <linearGradient id="cubeLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#793FFF" />
                      <stop offset="100%" stopColor="#4338CA" />
                    </linearGradient>
                    <linearGradient id="cubeRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#312E81" />
                    </linearGradient>

                    {/* Frosted Translucent Glass Cube */}
                    <linearGradient id="glassTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#A5B4FC" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#818CF8" stopOpacity="0.65" />
                    </linearGradient>
                    <linearGradient id="glassLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#818CF8" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="glassRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#3730A3" stopOpacity="0.4" />
                    </linearGradient>

                    {/* Neon Purple Glow */}
                    <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Floor Shadow */}
                  <ellipse cx="260" cy="335" rx="180" ry="50" fill="#312E81" opacity="0.18" filter="url(#purpleGlow)" />

                  {/* 1. Base Ledger Cube (Solid Indigo/Violet) */}
                  <g transform="translate(0, 45)">
                    {/* Top Face */}
                    <polygon points="260,190 355,245 260,300 165,245" fill="url(#cubeTopGrad)" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
                    {/* Left Face */}
                    <polygon points="165,245 260,300 260,360 165,305" fill="url(#cubeLeftGrad)" />
                    {/* Right Face */}
                    <polygon points="260,300 355,245 355,305 260,360" fill="url(#cubeRightGrad)" />

                    {/* Circuit lines on Base Cube */}
                    <path d="M185,275 L225,295 L225,335" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeOpacity="0.6" />
                    <circle cx="225" cy="335" r="3" fill="#C084FC" filter="url(#purpleGlow)" />
                    <path d="M335,275 L295,295 L295,335" fill="none" stroke="#818CF8" strokeWidth="1.5" strokeOpacity="0.6" />
                    <circle cx="295" cy="335" r="3" fill="#38BDF8" filter="url(#purpleGlow)" />
                  </g>

                  {/* 2. Middle Translucent Frosted Glass Cube */}
                  <g transform="translate(0, -15)">
                    {/* Drop shadow on base */}
                    <polygon points="260,190 355,245 260,300 165,245" fill="#1E1B4B" opacity="0.3" />

                    {/* Left Face Glass */}
                    <polygon points="165,185 260,240 260,300 165,245" fill="url(#glassLeftGrad)" stroke="#C7D2FE" strokeWidth="1" strokeOpacity="0.4" />
                    {/* Right Face Glass */}
                    <polygon points="260,240 355,185 355,245 260,300" fill="url(#glassRightGrad)" stroke="#C7D2FE" strokeWidth="1" strokeOpacity="0.4" />
                    {/* Top Face Glass */}
                    <polygon points="260,130 355,185 260,240 165,185" fill="url(#glassTopGrad)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />

                    {/* Neon cryptographic data core inside middle block */}
                    <ellipse cx="260" cy="210" rx="36" ry="18" fill="#793FFF" opacity="0.6" filter="url(#purpleGlow)" />
                    <circle cx="260" cy="210" r="10" fill="#38BDF8" filter="url(#purpleGlow)" />
                    <circle cx="260" cy="210" r="5" fill="#FFFFFF" />
                  </g>

                  {/* 3. Top Floating Rotating Cryptographic Block */}
                  <g transform="translate(0, -75) scale(0.85) translate(45, 10)">
                    {/* Top Cube Shadow */}
                    <polygon points="260,130 355,185 260,240 165,185" fill="#0F172A" opacity="0.25" />

                    {/* Top Face */}
                    <polygon points="260,75 355,130 260,185 165,130" fill="url(#cubeTopGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
                    {/* Left Face */}
                    <polygon points="165,130 260,185 260,245 165,190" fill="url(#cubeLeftGrad)" />
                    {/* Right Face */}
                    <polygon points="260,185 355,130 355,190 260,245" fill="url(#cubeRightGrad)" />

                    {/* Vertex Data Nodes */}
                    <circle cx="260" cy="75" r="4" fill="#38BDF8" filter="url(#purpleGlow)" />
                    <circle cx="355" cy="130" r="4" fill="#C084FC" filter="url(#purpleGlow)" />
                    <circle cx="165" cy="130" r="4" fill="#C084FC" filter="url(#purpleGlow)" />
                    <circle cx="260" cy="185" r="5" fill="#FFFFFF" filter="url(#purpleGlow)" />
                  </g>

                  {/* 4. Central Vertical Neon Laser Audit Beam */}
                  <line x1="260" y1="20" x2="260" y2="350" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.65" filter="url(#purpleGlow)" />

                  {/* 5. Floating 3D Transaction Receipt Slip */}
                  <g transform="translate(330, 80) rotate(10)">
                    <rect x="0" y="0" width="138" height="74" rx="16" fill="#FFFFFF" fillOpacity="0.92" stroke="#818CF8" strokeWidth="1.5" filter="url(#purpleGlow)" />
                    {/* Green Verified Dot */}
                    <circle cx="20" cy="22" r="6" fill="#10B981" />
                    <path d="M18 22 L20 24 L24 20" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="32" y="25" fill="#1E1B4B" fontSize="11" fontWeight="800" fontFamily="sans-serif">
                      TX-LEDGER AUDIT
                    </text>
                    {/* Code Bar lines */}
                    <rect x="18" y="36" width="90" height="4" rx="2" fill="#E0E7FF" />
                    <rect x="18" y="45" width="60" height="4" rx="2" fill="#E0E7FF" />
                    {/* Verified Pill */}
                    <rect x="18" y="54" width="70" height="12" rx="6" fill="#793FFF" fillOpacity="0.1" />
                    <text x="24" y="63" fill="#793FFF" fontSize="8" fontWeight="800" fontFamily="sans-serif">
                      100% VERIFIED
                    </text>
                  </g>

                  {/* 6. Floating Particles */}
                  <g fill="#A855F7" filter="url(#purpleGlow)">
                    <circle cx="110" cy="140" r="3.5" fill="#38BDF8" />
                    <circle cx="410" cy="260" r="3" fill="#C084FC" />
                    <polygon points="120,280 124,286 130,290 124,294 120,300 116,294 110,290 116,286" fill="#818CF8" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Text Column (Right) */}
            <div className="order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200/80 px-3.5 py-1 text-xs font-bold text-purple-800 mb-4">
                <span>Tamper-Proof Tracking</span>
              </div>
              <h3 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-950 leading-tight">
                Immutable ledger
              </h3>

              {/* Grey Metric Pill Card */}
              <div className="my-6 rounded-2xl bg-[#E5E9EE]/90 p-5 max-w-sm border border-slate-200/60 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Record integrity</p>
                <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">
                  100% On-Record &bull; Cryptographic
                </p>
              </div>

              <p className="font-bold text-slate-900 text-sm sm:text-base">
                Guarantee: Every point earned, bonus received, and cashout is logged permanently.
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                No hidden deductions or missing points. Our backend utilizes an immutable accounting ledger. Every single quiz answer, video completion, and payout request receives a permanent transaction ID that you can inspect in your dashboard anytime.
              </p>

              <div className="mt-8">
                <Link
                  href="/reward-rules"
                  className="inline-flex items-center justify-center rounded-full bg-[#161616] hover:bg-black px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  View reward rules
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================================
              PILLAR 3: INSTANT CODE ISSUANCE (Text LEFT, 3D Art RIGHT)
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Column */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 border border-cyan-200/80 px-3.5 py-1 text-xs font-bold text-cyan-800 mb-4">
                <span>Guaranteed SLA Window</span>
              </div>
              <h3 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-950 leading-tight">
                Instant code issuance
              </h3>

              {/* Grey Metric Pill Card */}
              <div className="my-6 rounded-2xl bg-[#E5E9EE]/90 p-5 max-w-sm border border-slate-200/60 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Average fulfillment speed</p>
                <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">
                  &lt; 24 Hours SLA Guarantee
                </p>
              </div>

              <p className="font-bold text-slate-900 text-sm sm:text-base">
                Guarantee: Real digital vouchers and direct wallet payouts without endless delays.
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                When you redeem your accumulated points for Amazon, Flipkart, Starbucks, or Paytm vouchers, our automated fulfillment pipelines deliver legitimate, authorized digital claim codes directly to your screen within 24 hours.
              </p>

              <div className="mt-8">
                <Link
                  href="/dashboard/rewards"
                  className="inline-flex items-center justify-center rounded-full bg-[#161616] hover:bg-black px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Browse rewards catalog
                </Link>
              </div>
            </div>

            {/* 3D Artwork Column (Right) */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center select-none">
                {/* Multi-Spectrum Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-amber-400/25 to-blue-500/20 rounded-full blur-3xl -z-10" />

                {/* 3D High-Speed 24-Hour Chronometer & Fast Payout Art */}
                <svg viewBox="0 0 520 400" className="w-full h-full filter drop-shadow-2xl overflow-visible">
                  <defs>
                    {/* Chronometer Gradients */}
                    <linearGradient id="chronoRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="50%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#0369A1" />
                    </linearGradient>
                    <linearGradient id="chronoFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0F172A" />
                      <stop offset="60%" stopColor="#0C4A6E" />
                      <stop offset="100%" stopColor="#0369A1" />
                    </linearGradient>

                    {/* Gold Coin Gradients */}
                    <linearGradient id="chronoCoinFace" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDE68A" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                    <linearGradient id="chronoCoinRim" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#B45309" />
                      <stop offset="100%" stopColor="#78350F" />
                    </linearGradient>

                    {/* Voucher Card Gradients */}
                    <linearGradient id="voucherGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00BAF2" />
                      <stop offset="100%" stopColor="#002970" />
                    </linearGradient>
                    <linearGradient id="voucherGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF9900" />
                      <stop offset="100%" stopColor="#E65100" />
                    </linearGradient>

                    {/* Cyan Glow Filter */}
                    <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Floor Shadow */}
                  <ellipse cx="260" cy="325" rx="190" ry="55" fill="#0369A1" opacity="0.15" filter="url(#cyanGlow)" />

                  {/* 1. Accelerated Energy Stream / Swirl Ribbon in 3D */}
                  <path
                    d="M60,260 C120,330 220,340 330,300 C430,260 480,180 440,110 C400,40 280,30 180,80 C110,120 90,200 130,260"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.3"
                    filter="url(#cyanGlow)"
                  />
                  <path
                    d="M80,250 C130,310 220,325 320,290 C410,250 450,180 420,120 C390,60 290,50 200,90 C140,125 110,195 140,245"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3"
                    strokeDasharray="12 8"
                    opacity="0.8"
                  />

                  {/* 2. Main 3D Chronometer Body */}
                  <g transform="translate(230, 200)">
                    {/* Chronometer Shadow */}
                    <circle cx="0" cy="18" r="95" fill="#082F49" opacity="0.35" filter="url(#cyanGlow)" />

                    {/* Outer Beveled Metallic Ring */}
                    <circle cx="0" cy="0" r="95" fill="url(#chronoRimGrad)" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.5" />

                    {/* Bevel Chamfer Highlight */}
                    <circle cx="0" cy="0" r="86" fill="url(#chronoFaceGrad)" stroke="#38BDF8" strokeWidth="1.5" />

                    {/* Chronometer Dial Ticks */}
                    <g stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.6">
                      <line x1="0" y1="-78" x2="0" y2="-68" />
                      <line x1="0" y1="78" x2="0" y2="68" />
                      <line x1="-78" y1="0" x2="-68" y2="0" />
                      <line x1="78" y1="0" x2="68" y2="0" />
                      <line x1="-55" y1="-55" x2="-48" y2="-48" strokeWidth="1.5" />
                      <line x1="55" y1="-55" x2="48" y2="-48" strokeWidth="1.5" />
                      <line x1="-55" y1="55" x2="-48" y2="48" strokeWidth="1.5" />
                      <line x1="55" y1="55" x2="48" y2="48" strokeWidth="1.5" />
                    </g>

                    {/* "24H" Typography on Dial */}
                    <text x="0" y="-30" fill="#38BDF8" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">
                      GUARANTEED
                    </text>
                    <text x="0" y="8" fill="#FFFFFF" fontSize="32" fontWeight="950" fontFamily="sans-serif" textAnchor="middle">
                      24H
                    </text>
                    <text x="0" y="28" fill="#FBBF24" fontSize="11" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2">
                      SLA WINDOW
                    </text>

                    {/* High-Speed Lightning Hand pointing to instant 0 */}
                    <path d="M0,0 L20,-50 L28,-46 L8,5 Z" fill="#F59E0B" filter="url(#cyanGlow)" />
                    <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
                    <circle cx="0" cy="0" r="4" fill="#0F172A" />
                  </g>

                  {/* 3. Floating 3D Voucher Cards in Perspective */}
                  {/* Card 1: Paytm Cyan Card */}
                  <g transform="translate(360, 100) rotate(15) scale(0.9)">
                    <rect x="0" y="0" width="130" height="80" rx="14" fill="url(#voucherGrad1)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.6" filter="url(#cyanGlow)" />
                    <rect x="14" y="14" width="22" height="18" rx="4" fill="#F59E0B" opacity="0.85" />
                    <text x="14" y="52" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">
                      PAYTM CASH
                    </text>
                    <text x="14" y="66" fill="#38BDF8" fontSize="9" fontWeight="700" fontFamily="sans-serif">
                      INSTANT CODE
                    </text>
                  </g>

                  {/* Card 2: Amazon Orange Card */}
                  <g transform="translate(340, 210) rotate(-10) scale(0.85)">
                    <rect x="0" y="0" width="130" height="80" rx="14" fill="url(#voucherGrad2)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.6" filter="url(#cyanGlow)" />
                    <text x="14" y="32" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                      AMAZON
                    </text>
                    <text x="14" y="48" fill="#FFF" fontSize="9" fontWeight="700" fontFamily="sans-serif" opacity="0.8">
                      GIFT VOUCHER
                    </text>
                    <circle cx="106" cy="40" r="12" fill="#FFFFFF" fillOpacity="0.25" />
                  </g>

                  {/* 4. Floating 3D Gold Rupee Coins */}
                  <g transform="translate(100, 110) rotate(-18)">
                    {/* Coin Rim Depth */}
                    <ellipse cx="28" cy="34" rx="28" ry="24" fill="url(#chronoCoinRim)" />
                    {/* Coin Face */}
                    <ellipse cx="28" cy="28" rx="28" ry="24" fill="url(#chronoCoinFace)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
                    <text x="28" y="36" fill="#78350F" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                      ₹
                    </text>
                  </g>

                  <g transform="translate(150, 260) rotate(12) scale(0.75)">
                    <ellipse cx="28" cy="34" rx="28" ry="24" fill="url(#chronoCoinRim)" />
                    <ellipse cx="28" cy="28" rx="28" ry="24" fill="url(#chronoCoinFace)" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="28" y="36" fill="#78350F" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                      ₹
                    </text>
                  </g>

                  {/* 5. Speed Sparkles */}
                  <g fill="#38BDF8" filter="url(#cyanGlow)">
                    <polygon points="170,50 173,55 178,57 173,59 170,64 167,59 162,57 167,55" />
                    <polygon points="460,190 462,194 466,195 462,197 460,201 458,197 454,195 458,194" fill="#FBBF24" />
                    <circle cx="210" cy="310" r="3" fill="#38BDF8" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* =========================================================================
              PILLAR 4: ANTI-BOT FAIR PLAY (3D Art LEFT, Text RIGHT)
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 3D Artwork Column (Left) */}
            <div className="order-1 flex justify-center items-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center select-none">
                {/* Multi-Spectrum Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/25 via-pink-400/25 to-purple-500/20 rounded-full blur-3xl -z-10" />

                {/* 3D Human Identity Prism & Protective Forcefield Art */}
                <svg viewBox="0 0 520 400" className="w-full h-full filter drop-shadow-2xl overflow-visible">
                  <defs>
                    {/* Rose / Violet Gradients */}
                    <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FB7185" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#9333EA" stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="forcefieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#C026D3" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="humanCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFE4E6" />
                      <stop offset="60%" stopColor="#FDA4AF" />
                      <stop offset="100%" stopColor="#F43F5E" />
                    </linearGradient>

                    {/* Rose Glow Filter */}
                    <filter id="roseGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Floor Shadow */}
                  <ellipse cx="260" cy="330" rx="180" ry="50" fill="#881337" opacity="0.15" filter="url(#roseGlow)" />

                  {/* 1. Isometric Base Scanner Grid Platform */}
                  <g transform="translate(0, 50)">
                    <ellipse cx="260" cy="270" rx="160" ry="50" fill="#FFE4E6" opacity="0.4" />
                    <ellipse cx="260" cy="270" rx="140" ry="42" fill="none" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
                    <ellipse cx="260" cy="270" rx="100" ry="30" fill="none" stroke="#C026D3" strokeWidth="1.2" opacity="0.6" />
                  </g>

                  {/* 2. Defensive Forcefield Shield Outer Lattice */}
                  <g transform="translate(260, 180)">
                    <circle cx="0" cy="0" r="120" fill="url(#forcefieldGrad)" stroke="#FB7185" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
                    {/* Concentric Rotating Scanner Rings */}
                    <ellipse cx="0" cy="0" rx="140" ry="60" fill="none" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="4 4" transform="rotate(-25)" opacity="0.4" />
                    <ellipse cx="0" cy="0" rx="140" ry="60" fill="none" stroke="#9333EA" strokeWidth="1.5" strokeDasharray="4 4" transform="rotate(25)" opacity="0.4" />
                  </g>

                  {/* 3. Central 3D Biometric Prism Orb */}
                  <g transform="translate(260, 180)">
                    {/* Orb Ambient Shadow */}
                    <circle cx="0" cy="12" r="82" fill="#4C0519" opacity="0.3" filter="url(#roseGlow)" />

                    {/* Prismatic Sphere Body */}
                    <circle cx="0" cy="0" r="80" fill="url(#orbGrad)" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.7" />

                    {/* Specular Crescent Highlight */}
                    <path
                      d="M-55,-55 C-20,-75 35,-65 60,-35 C40,-50 0,-55 -35,-40 C-50,-30 -55,-10 -55,-55 Z"
                      fill="#FFFFFF"
                      opacity="0.3"
                    />

                    {/* 4. Glowing 3D Biometric Fingerprint / Human Core */}
                    <g fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.95">
                      {/* Fingerprint Loops */}
                      <path d="M-15,35 C-25,20 -28,-5 -18,-25 C-10,-40 10,-40 18,-25 C28,-5 25,20 15,35" />
                      <path d="M-9,28 C-16,16 -18,-2 -10,-18 C-4,-28 4,-28 10,-18 C18,-2 16,16 9,28" strokeWidth="2.5" />
                      <path d="M-4,20 C-8,12 -8,0 -3,-10 C0,-15 0,-15 3,-10 C8,0 8,12 4,20" strokeWidth="2.2" />
                      <circle cx="0" cy="5" r="2" fill="#FFFFFF" />
                    </g>
                  </g>

                  {/* 5. Deflected Malicious Bot Vectors (Sparks hitting shield) */}
                  <g transform="translate(130, 130)">
                    <line x1="-30" y1="-20" x2="0" y2="0" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" filter="url(#roseGlow)" />
                    <polygon points="0,0 -8,-1 -5,-8" fill="#FDA4AF" />
                    <circle cx="0" cy="0" r="5" fill="#FFFFFF" filter="url(#roseGlow)" />
                  </g>
                  <g transform="translate(390, 140)">
                    <line x1="30" y1="-20" x2="0" y2="0" stroke="#FB7185" strokeWidth="3" strokeLinecap="round" filter="url(#roseGlow)" />
                    <polygon points="0,0 8,-1 5,-8" fill="#FDA4AF" />
                    <circle cx="0" cy="0" r="5" fill="#FFFFFF" filter="url(#roseGlow)" />
                  </g>

                  {/* 6. Floating 3D "Verified Human" Badge */}
                  <g transform="translate(315, 75) rotate(8)">
                    <rect x="0" y="0" width="144" height="42" rx="21" fill="#FFFFFF" fillOpacity="0.92" stroke="#F43F5E" strokeWidth="1.5" filter="url(#roseGlow)" />
                    <circle cx="21" cy="21" r="10" fill="#F43F5E" />
                    <path d="M17 21 L20 24 L26 18" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="38" y="25" fill="#881337" fontSize="11" fontWeight="900" fontFamily="sans-serif">
                      100% REAL HUMAN
                    </text>
                  </g>

                  {/* 7. Floating Light Particles */}
                  <g fill="#F43F5E" filter="url(#roseGlow)">
                    <polygon points="100,220 103,225 108,227 103,229 100,234 97,229 92,227 97,225" />
                    <polygon points="420,280 422,284 426,285 422,287 420,291 418,287 414,285 418,284" fill="#9333EA" />
                    <circle cx="160" cy="90" r="3" fill="#FB7185" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Text Column (Right) */}
            <div className="order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-200/80 px-3.5 py-1 text-xs font-bold text-rose-800 mb-4">
                <span>Anti-Cheat Ecosystem</span>
              </div>
              <h3 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-950 leading-tight">
                Anti-bot fair play
              </h3>

              {/* Grey Metric Pill Card */}
              <div className="my-6 rounded-2xl bg-[#E5E9EE]/90 p-5 max-w-sm border border-slate-200/60 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Protection standard</p>
                <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">
                  Real Humans &bull; Zero Bots
                </p>
              </div>

              <p className="font-bold text-slate-900 text-sm sm:text-base">
                Guarantee: Rewards go strictly to real, authentic contributors, not automated scripts.
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                We protect task sponsors and real community members with server-side response timing, question entropy, and intelligent device fingerprinting. Automated scrapers and botnets are blocked at the perimeter so legitimate earners get the highest payouts.
              </p>

              <div className="mt-8">
                <Link
                  href="/terms"
                  className="inline-flex items-center justify-center rounded-full bg-[#161616] hover:bg-black px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Read terms of service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
