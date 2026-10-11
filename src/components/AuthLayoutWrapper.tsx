'use client';

import React from 'react';
import Link from 'next/link';

interface AuthLayoutWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  error?: string | null;
  successMessage?: string | null;
}

export default function AuthLayoutWrapper({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  error,
  successMessage,
}: AuthLayoutWrapperProps) {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-x-hidden bg-transparent py-10 sm:py-16 px-4 sm:px-6 lg:px-8 text-slate-900 selection:bg-[#793FFF]/20 selection:text-[#793FFF] flex items-center justify-center">
      {/* Background ambient lighting flares */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-violet-400/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-cyan-400/10 blur-[120px]"
      />

      {/* Main 3-Column Centered Stage */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center lg:justify-between gap-6 xl:gap-12">
        {/* =========================================================================
            LEFT COLUMN: 3D Glass Architecture, Benefit Badges, & Neon Stars
            ========================================================================= */}
        <div className="hidden lg:flex flex-1 max-w-[340px] xl:max-w-[400px] flex-col items-center justify-center select-none">
          <svg
            viewBox="0 0 460 620"
            className="w-full h-auto drop-shadow-2xl overflow-visible select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Ambient Levitation Ground Shadow */}
              <filter id="leftArtShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="24" result="blur" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.28   0 0 0 0 0.15   0 0 0 0 0.58   0 0 0 0.22 0" />
              </filter>

              {/* Neon Star Glow Filter */}
              <filter id="neonStarGlowLeft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Glass Slab Gradient */}
              <linearGradient id="glassSlabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#EDE9FE" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.3" />
              </linearGradient>

              {/* Glass Slab Rim Highlight */}
              <linearGradient id="glassSlabRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.65" />
              </linearGradient>

              {/* Glass Orb Gradient */}
              <linearGradient id="glassOrbGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.35" />
              </linearGradient>

              {/* Emerald Diamond Prism Gradient */}
              <linearGradient id="diamondGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#6EE7B7" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.35" />
              </linearGradient>

              {/* Neon Violet Star Gradient */}
              <linearGradient id="starNeonViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#E9D5FF" />
                <stop offset="70%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#9333EA" />
              </linearGradient>

              {/* Neon Cyan Star Gradient */}
              <linearGradient id="starNeonCyanLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#67E8F9" />
                <stop offset="80%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>

              {/* 3D Gold Rupee Coin Gradients */}
              <linearGradient id="goldCoinFaceLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF3B0" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              <linearGradient id="goldCoinRimLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>

            {/* Ambient Levitation Ground Shadow */}
            <ellipse cx="230" cy="565" rx="150" ry="32" fill="#312E81" opacity="0.18" filter="url(#leftArtShadow)" />

            {/* Ambient Radial Flare */}
            <circle cx="210" cy="270" r="140" fill="#7C3AED" opacity="0.09" style={{ filter: 'blur(45px)' }} />

            {/* 1. Tilted Glass Architecture Slab */}
            <g transform="translate(70, 45) rotate(-6 160 180)">
              {/* Ambient shadow */}
              <rect x="0" y="0" width="240" height="340" rx="42" fill="#4338CA" opacity="0.08" style={{ filter: 'blur(18px)' }} />
              {/* Glass Slab Body */}
              <rect
                x="0"
                y="0"
                width="240"
                height="340"
                rx="42"
                fill="url(#glassSlabGrad)"
                stroke="url(#glassSlabRim)"
                strokeWidth="2.5"
              />
              {/* Specular Diagonal Glass Sheen */}
              <path d="M 0 50 L 240 160 L 240 210 L 0 100 Z" fill="white" opacity="0.25" />
              {/* Concentric Architectural Rings */}
              <circle cx="120" cy="170" r="64" stroke="white" strokeWidth="2" strokeDasharray="8 8" opacity="0.5" />
              <circle cx="120" cy="170" r="34" stroke="white" strokeWidth="1.5" opacity="0.4" />
            </g>

            {/* 2. Floating Frosted Feature Badges (Pristine Glass Cards) */}
            {/* Feature 1: Instant UPI Cash */}
            <g transform="translate(40, 110)">
              <rect x="0" y="0" width="220" height="64" rx="20" fill="#FFFFFF" fillOpacity="0.88" stroke="#E2E8F0" strokeWidth="1.5" />
              <circle cx="34" cy="32" r="16" fill="#ECFDF5" />
              <path d="M28 32 L32 36 L40 28" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="60" y="27" fill="#0F172A" fontSize="12" fontWeight="800" fontFamily="sans-serif">
                Instant UPI Cash
              </text>
              <text x="60" y="43" fill="#64748B" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                Direct bank withdrawal
              </text>
              <rect x="168" y="12" width="42" height="18" rx="9" fill="#10B981" fillOpacity="0.12" />
              <text x="189" y="24" fill="#059669" fontSize="8.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                0% FEE
              </text>
            </g>

            {/* Feature 2: Daily Speed Quizzes */}
            <g transform="translate(75, 205)">
              <rect x="0" y="0" width="220" height="64" rx="20" fill="#FFFFFF" fillOpacity="0.88" stroke="#E2E8F0" strokeWidth="1.5" />
              <circle cx="34" cy="32" r="16" fill="#F5F3FF" />
              <path d="M34 22 L30 31 L35 31 L34 40 L41 29 L36 29 Z" fill="#7C3AED" />
              <text x="60" y="27" fill="#0F172A" fontSize="12" fontWeight="800" fontFamily="sans-serif">
                Speed Quizzes
              </text>
              <text x="60" y="43" fill="#64748B" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                5 questions • 7s timer
              </text>
              <rect x="168" y="12" width="42" height="18" rx="9" fill="#7C3AED" fillOpacity="0.12" />
              <text x="189" y="24" fill="#6D28D9" fontSize="8.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                LIVE
              </text>
            </g>

            {/* Feature 3: Verified Partner Tasks */}
            <g transform="translate(35, 300)">
              <rect x="0" y="0" width="220" height="64" rx="20" fill="#FFFFFF" fillOpacity="0.88" stroke="#E2E8F0" strokeWidth="1.5" />
              <circle cx="34" cy="32" r="16" fill="#F0F9FF" />
              <polygon points="34,22 37,28 44,29 39,34 40,41 34,38 28,41 29,34 24,29 31,28" fill="#0284C7" />
              <text x="60" y="27" fill="#0F172A" fontSize="12" fontWeight="800" fontFamily="sans-serif">
                Verified Tasks
              </text>
              <text x="60" y="43" fill="#64748B" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                Simple &amp; honest payouts
              </text>
              <rect x="168" y="12" width="42" height="18" rx="9" fill="#0284C7" fillOpacity="0.12" />
              <text x="189" y="24" fill="#0369A1" fontSize="8.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                FAST
              </text>
            </g>

            {/* 3. Floating 3D Frosted Glass Orb */}
            <g transform="translate(80, 420)">
              <ellipse cx="44" cy="60" rx="38" ry="12" fill="#4338CA" opacity="0.12" style={{ filter: 'blur(10px)' }} />
              <circle cx="44" cy="44" r="42" fill="url(#glassOrbGradLeft)" stroke="white" strokeWidth="2.5" />
              <ellipse cx="32" cy="28" rx="16" ry="9" fill="white" opacity="0.7" transform="rotate(-30 32 28)" />
            </g>

            {/* 4. Floating 3D Emerald Diamond Prism */}
            <g transform="translate(255, 395)">
              <ellipse cx="40" cy="56" rx="32" ry="10" fill="#047857" opacity="0.12" style={{ filter: 'blur(10px)' }} />
              <polygon points="40,10 72,40 40,70 8,40" fill="url(#diamondGradLeft)" stroke="white" strokeWidth="2" />
              <line x1="40" y1="10" x2="40" y2="70" stroke="white" strokeWidth="1.2" opacity="0.6" />
              <line x1="8" y1="40" x2="72" y2="40" stroke="white" strokeWidth="1.2" opacity="0.6" />
            </g>

            {/* 5. Floating 3D Gold Rupee Coin (Top Right) */}
            <g transform="translate(325, 110) rotate(16)">
              <ellipse cx="26" cy="33" rx="26" ry="20" fill="url(#goldCoinRimLeft)" />
              <ellipse cx="26" cy="26" rx="26" ry="20" fill="url(#goldCoinFaceLeft)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
              <text x="26" y="34" fill="#78350F" fontSize="19" fontWeight="950" fontFamily="sans-serif" textAnchor="middle">
                ₹
              </text>
              <polygon points="10,16 12,20 17,22 12,24 10,29 8,24 3,22 8,20" fill="#FFFFFF" opacity="0.9" />
            </g>

            {/* 6. Glowing Neon Star (Top Right Violet Glow) */}
            <g transform="translate(340, 40)" filter="url(#neonStarGlowLeft)">
              <path d="M28,0 Q28,28 0,28 Q28,28 28,56 Q28,28 56,28 Q28,28 28,0 Z" fill="url(#starNeonViolet)" />
              <circle cx="28" cy="28" r="4" fill="#FFFFFF" />
            </g>

            {/* 7. Glowing Neon Star (Bottom Left Cyan Glow) */}
            <g transform="translate(20, 480)" filter="url(#neonStarGlowLeft)">
              <path d="M24,0 Q24,24 0,24 Q24,24 24,48 Q24,24 48,24 Q24,24 24,0 Z" fill="url(#starNeonCyanLeft)" />
              <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
            </g>

            {/* 8. Sparkle Crystals */}
            <g filter="url(#neonStarGlowLeft)">
              <circle cx="360" cy="340" r="3" fill="#FFFFFF" opacity="0.9" />
              <circle cx="30" cy="80" r="2.5" fill="#FFFFFF" opacity="0.85" />
              <circle cx="310" cy="510" r="3.5" fill="#A78BFA" opacity="0.9" />
            </g>
          </svg>
        </div>

        {/* =========================================================================
            CENTER COLUMN: Frosted Glassmorphism Authentication Card
            ========================================================================= */}
        <div className="w-full max-w-md shrink-0">
          <div className="relative rounded-[36px] border border-white/80 bg-white/80 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(15,23,42,0.08),0_1px_3px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.9)] overflow-hidden transition-all duration-300">
            {/* Top specular gloss sheen */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-violet-400/10 blur-2xl" />

            {/* Brand Header */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#793FFF] via-[#6366F1] to-[#06B6D4] text-white shadow-lg shadow-[#793FFF]/25">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                {title}
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-normal">
                {subtitle}
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mt-6 rounded-2xl border border-rose-300/80 bg-rose-50/90 backdrop-blur-sm p-3.5 text-xs sm:text-sm font-medium text-rose-700 flex items-center gap-2.5 shadow-xs">
                <svg className="w-4 h-4 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Success Banner */}
            {successMessage && (
              <div className="mt-6 rounded-2xl border border-emerald-300/80 bg-emerald-50/90 backdrop-blur-sm p-3.5 text-xs sm:text-sm font-medium text-emerald-800 flex items-center gap-2.5 shadow-xs">
                <svg className="w-4 h-4 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form Content */}
            <div className="mt-6">{children}</div>

            {/* Footer Switcher */}
            <div className="mt-8 pt-6 border-t border-slate-100/90 text-center text-xs text-slate-600 font-normal">
              {footerText}{' '}
              <Link href={footerLinkHref} className="font-bold text-[#793FFF] hover:text-[#682FF8] hover:underline transition">
                {footerLinkText}
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Floating 3D Smartphone with "YOU ARE JUST ONE STEP AWAY"
            ========================================================================= */}
        <div className="hidden lg:flex flex-1 max-w-[340px] xl:max-w-[420px] flex-col items-center justify-center select-none">
          <svg
            viewBox="0 0 540 640"
            className="w-full h-auto drop-shadow-2xl overflow-visible select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Ambient Levitation Ground Shadow */}
              <filter id="phoneLevitateShadowRight" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="24" result="blur" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.05   0 0 0 0 0.14   0 0 0 0 0.02   0 0 0 0.36 0" />
              </filter>

              {/* Neon Star Glow Filter */}
              <filter id="neonStarGlowPhone" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Phone Screen Gradient (Deep Obsidian) */}
              <linearGradient id="phoneScreenGradRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0E121A" />
                <stop offset="40%" stopColor="#090B10" />
                <stop offset="100%" stopColor="#050608" />
              </linearGradient>

              {/* Space Black Titanium Phone Chassis */}
              <linearGradient id="phoneTitaniumRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3F4756" />
                <stop offset="25%" stopColor="#222732" />
                <stop offset="70%" stopColor="#0E1218" />
                <stop offset="100%" stopColor="#2A313E" />
              </linearGradient>

              {/* Metallic Chamfer Edge Highlight */}
              <linearGradient id="phoneBezelHighlightRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1E232D" stopOpacity="0.3" />
              </linearGradient>

              {/* Neon Lime Star Gradient */}
              <linearGradient id="starNeonLimeRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#EAFF78" />
                <stop offset="70%" stopColor="#B5FF24" />
                <stop offset="100%" stopColor="#65A30D" />
              </linearGradient>

              {/* Neon Cyan Star Gradient */}
              <linearGradient id="starNeonCyanRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#67E8F9" />
                <stop offset="80%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>

              {/* 3D Gold Rupee Coin Gradients */}
              <linearGradient id="goldCoinFaceRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF3B0" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              <linearGradient id="goldCoinRimRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>

            {/* 1. Ambient Levitation Ground Shadow under Floating Phone */}
            <ellipse cx="270" cy="575" rx="140" ry="32" fill="#0C2504" opacity="0.32" filter="url(#phoneLevitateShadowRight)" />

            {/* 2. Symmetrically Floating Smartphone (-2.5 deg sleek tilt) */}
            <g transform="rotate(-2.5, 270, 310)">
              {/* Titanium Outer Chassis */}
              <rect
                x="150"
                y="55"
                width="244"
                height="490"
                rx="42"
                fill="url(#phoneTitaniumRight)"
                stroke="url(#phoneBezelHighlightRight)"
                strokeWidth="1.5"
              />

              {/* Glossy Obsidian Screen Glass */}
              <rect
                x="158"
                y="63"
                width="228"
                height="474"
                rx="35"
                fill="url(#phoneScreenGradRight)"
                stroke="#1F2533"
                strokeWidth="1"
              />

              {/* Specular Diagonal Glass Reflection */}
              <path d="M210,63 L340,63 C370,63 386,80 386,105 L290,320 L210,63 Z" fill="#FFFFFF" opacity="0.04" />

              {/* Dynamic Island */}
              <rect x="238" y="73" width="68" height="18" rx="9" fill="#000000" />
              <circle cx="287" cy="82" r="3.2" fill="#081A2D" opacity="0.8" />
              <circle cx="287" cy="82" r="1.2" fill="#1E3A8A" />

              {/* Screen App Header: "task earn" name on top left */}
              <g transform="translate(176, 106)">
                {/* Brand Logo with Purple Accent Dot */}
                <text x="0" y="11" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                  task earn
                </text>
                <circle cx="64" cy="7" r="3" fill="#793FFF" />

                {/* Right Header Menu Icon */}
                <g transform="translate(170, 3)" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
                  <line x1="0" y1="0" x2="16" y2="0" />
                  <line x1="0" y1="4" x2="16" y2="4" />
                  <line x1="0" y1="8" x2="16" y2="8" />
                </g>
              </g>

              {/* Commanding Screen Headline: "YOU ARE JUST ONE STEP AWAY" */}
              <text x="176" y="156" fill="#FFFFFF" fontSize="23" fontWeight="950" fontFamily="sans-serif" letterSpacing="-0.5">
                YOU ARE
              </text>
              <text x="176" y="184" fill="#FFFFFF" fontSize="23" fontWeight="950" fontFamily="sans-serif" letterSpacing="-0.5">
                JUST ONE
              </text>
              <text x="176" y="214" fill="#B5FF24" fontSize="23" fontWeight="950" fontFamily="sans-serif" letterSpacing="-0.5">
                STEP AWAY
              </text>

              {/* Central Glowing Neon Star Gems on Phone */}
              <g filter="url(#neonStarGlowPhone)">
                <path d="M260,228 Q260,252 236,252 Q260,252 260,276 Q260,252 284,252 Q260,252 260,228 Z" fill="url(#starNeonLimeRight)" />
                <line x1="260" y1="232" x2="260" y2="272" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
                <line x1="240" y1="252" x2="280" y2="252" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

                <path d="M308,260 Q308,275 293,275 Q308,275 308,290 Q308,275 323,275 Q308,275 308,260 Z" fill="url(#starNeonLimeRight)" />
              </g>

              {/* Live Task Earning Card 1: Many Earning Opportunities */}
              <g transform="translate(172, 302)">
                <rect x="0" y="0" width="200" height="42" rx="14" fill="#131722" stroke="#252D3F" strokeWidth="1" />
                <circle cx="20" cy="21" r="9" fill="#10B981" />
                <path d="M16 21 L19 24 L25 18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <text x="36" y="18" fill="#FFFFFF" fontSize="9.5" fontWeight="900" fontFamily="sans-serif">
                  MANY EARNING OPPORTUNITIES
                </text>
                <text x="36" y="32" fill="#10B981" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">
                  Lots of work to choose from
                </text>
              </g>

              {/* Live Task Earning Card 2: Speed Quiz */}
              <g transform="translate(172, 354)">
                <rect x="0" y="0" width="200" height="42" rx="14" fill="#161B26" stroke="#2A3347" strokeWidth="1" />
                <circle cx="20" cy="21" r="9" fill="#793FFF" />
                <path d="M20 15 L17 21 L20 21 L19 27 L24 20 L21 20 Z" fill="#FFFFFF" />
                <text x="36" y="18" fill="#FFFFFF" fontSize="10.5" fontWeight="900" fontFamily="sans-serif">
                  SPEED QUIZ ACTIVE
                </text>
                <text x="36" y="32" fill="#A78BFA" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">
                  5 Questions • 7s Timer
                </text>
              </g>

              {/* Screen Subtitle Copy */}
              <text x="176" y="416" fill="#94A3B8" fontSize="10" fontWeight="500" fontFamily="sans-serif">
                Join thousands earning daily cash
              </text>
              <text x="176" y="430" fill="#94A3B8" fontSize="10" fontWeight="500" fontFamily="sans-serif">
                and fast voucher rewards.
              </text>

              {/* Screen Action Button */}
              <g transform="translate(172, 448)">
                <rect x="0" y="0" width="200" height="42" rx="21" fill="#793FFF" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.2" />
                <text x="100" y="26" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
                  Start Earning Today →
                </text>
              </g>
            </g>

            {/* 3. Left Side of Phone: Floating 3D Gold Rupee Coin */}
            <g transform="translate(68, 270) rotate(-14)">
              <ellipse cx="28" cy="35" rx="28" ry="22" fill="url(#goldCoinRimRight)" />
              <ellipse cx="28" cy="28" rx="28" ry="22" fill="url(#goldCoinFaceRight)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
              <text x="28" y="36" fill="#78350F" fontSize="21" fontWeight="950" fontFamily="sans-serif" textAnchor="middle">
                ₹
              </text>
              <polygon points="11,17 13,22 18,24 13,26 11,31 9,26 4,24 9,22" fill="#FFFFFF" opacity="0.9" />
            </g>

            {/* 4. Left Side of Phone: Glowing Neon Art Star (Cyan Glow) */}
            <g transform="translate(85, 130)" filter="url(#neonStarGlowPhone)">
              <path d="M30,0 Q30,30 0,30 Q30,30 30,60 Q30,30 60,30 Q30,30 30,0 Z" fill="url(#starNeonCyanRight)" />
              <circle cx="30" cy="30" r="4" fill="#FFFFFF" />
            </g>

            {/* 5. Right Side of Phone: Glowing Neon Art Star (Lime Glow) */}
            <g transform="translate(425, 190)" filter="url(#neonStarGlowPhone)">
              <path d="M32,0 Q32,32 0,32 Q32,32 32,64 Q32,32 64,32 Q32,32 32,0 Z" fill="url(#starNeonLimeRight)" />
              <circle cx="32" cy="32" r="4.5" fill="#FFFFFF" />
            </g>

            {/* 6. Ambient Sparkle Crystals */}
            <g filter="url(#neonStarGlowPhone)">
              <polygon points="460,370 463,379 472,381 463,383 460,392 457,383 448,381 457,379" fill="#FFFFFF" opacity="0.85" />
              <circle cx="430" cy="100" r="3" fill="#FFFFFF" opacity="0.9" />
              <circle cx="120" cy="430" r="2.5" fill="#FFFFFF" opacity="0.8" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
