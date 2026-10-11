'use client';

import React from 'react';
import Link from 'next/link';

export default function JumpTaskFeaturesShowcase() {
  return (
    <section id="features" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="mx-auto max-w-6xl">
        {/* =========================================================================
            HEADER: Exact JumpTask Headline & Subtitle
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight text-slate-950 leading-[1.08]">
            Pick a task. Complete it. Get paid.
          </h2>
          <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Task Earn is an online earning platform built for anyone who wants to earn with specific tasks. There are 5 main task types to choose from. Every task shows what you earn before you start. No guessing, no waiting.
          </p>
        </div>

        <div className="space-y-28 sm:space-y-40">
          {/* =========================================================================
              FEATURE 1: WATCH & EARN (Text LEFT, 3D Art RIGHT)
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Column */}
            <div className="order-2 lg:order-1">
              <h3 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-950 leading-tight">
                Watch &amp; earn
              </h3>

              {/* Grey Metric Pill Card */}
              <div className="my-6 rounded-2xl bg-[#E5E9EE]/90 p-5 max-w-sm border border-slate-200/60 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Earn per video</p>
                <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">
                  ₹5 – ₹50
                </p>
              </div>

              <p className="font-bold text-slate-900 text-sm sm:text-base">
                Best for: building extra cash with very low effort.
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                Watch short videos and get paid once you finish. You see how much you&apos;ll earn before you start, so there are no surprises. Each task takes just a few minutes, making it an easy way to start earning right away.
              </p>

              <div className="mt-8">
                <Link
                  href="/dashboard/watch"
                  className="inline-flex items-center justify-center rounded-full bg-[#161616] hover:bg-black px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Watch and earn
                </Link>
              </div>
            </div>

            {/* 3D Artwork Column (Right) */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center select-none">
                {/* Multi-Spectrum Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/25 via-orange-400/25 to-pink-500/20 rounded-full blur-3xl -z-10" />

                {/* 3D Isometric Stacked Video Slabs + Floating Coin Art */}
                <svg viewBox="0 0 520 400" className="w-full h-full filter drop-shadow-2xl overflow-visible">
                  <defs>
                    {/* Layer 1 (Bottom Magenta/Pink) */}
                    <linearGradient id="watchGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF1E8A" />
                      <stop offset="70%" stopColor="#F43F5E" />
                      <stop offset="100%" stopColor="#C026D3" />
                    </linearGradient>
                    {/* Layer 2 (Middle Fiery Coral/Orange) */}
                    <linearGradient id="watchGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF4B00" />
                      <stop offset="60%" stopColor="#FF7A00" />
                      <stop offset="100%" stopColor="#F43F5E" />
                    </linearGradient>
                    {/* Layer 3 (Top Peach Glass Slab) */}
                    <linearGradient id="watchGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFA07A" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#FF4081" stopOpacity="0.92" />
                      <stop offset="100%" stopColor="#D946EF" stopOpacity="0.88" />
                    </linearGradient>
                    {/* Coin Gradients */}
                    <linearGradient id="coinFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFE082" />
                      <stop offset="45%" stopColor="#FF80AB" />
                      <stop offset="100%" stopColor="#EA80FC" />
                    </linearGradient>
                    <linearGradient id="coinRimGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF5722" />
                      <stop offset="100%" stopColor="#FF4081" />
                    </linearGradient>
                    <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Ambient Base Shadow */}
                  <ellipse cx="260" cy="330" rx="190" ry="40" fill="#9F1239" opacity="0.15" filter="blur(16px)" />

                  {/* ================= LAYER 1: BOTTOM SLAB ================= */}
                  <g transform="translate(0, 56)">
                    {/* 3D Extruded Edge */}
                    <path
                      d="M 105 210 C 95 215 95 225 105 230 L 255 298 C 265 303 275 303 285 298 L 415 230 C 425 225 425 215 415 210 L 415 228 C 425 233 425 243 415 248 L 285 316 C 275 321 265 321 255 316 L 105 248 C 95 243 95 233 105 228 Z"
                      fill="#9F1239"
                    />
                    {/* Top Face */}
                    <path
                      d="M 105 210 C 95 205 95 195 105 190 L 255 122 C 265 117 275 117 285 122 L 415 190 C 425 195 425 205 415 210 L 285 278 C 275 283 265 283 255 278 Z"
                      fill="url(#watchGrad1)"
                    />
                  </g>

                  {/* ================= LAYER 2: MIDDLE SLAB ================= */}
                  <g transform="translate(0, 28)">
                    {/* 3D Extruded Edge */}
                    <path
                      d="M 105 175 C 95 180 95 190 105 195 L 255 263 C 265 268 275 268 285 263 L 415 195 C 425 190 425 180 415 175 L 415 193 C 425 198 425 208 415 213 L 285 281 C 275 286 265 286 255 281 L 105 213 C 95 208 95 198 105 193 Z"
                      fill="#C2410C"
                    />
                    {/* Top Face */}
                    <path
                      d="M 105 175 C 95 170 95 160 105 155 L 255 87 C 265 82 275 82 285 87 L 415 155 C 425 160 425 170 415 175 L 285 243 C 275 248 265 248 255 243 Z"
                      fill="url(#watchGrad2)"
                    />
                  </g>

                  {/* ================= LAYER 3: TOP FROSTED GLASS SLAB ================= */}
                  <g transform="translate(0, 0)">
                    {/* 3D Extruded Edge */}
                    <path
                      d="M 105 140 C 95 145 95 155 105 160 L 255 228 C 265 233 275 233 285 228 L 415 160 C 425 155 425 145 415 140 L 415 158 C 425 163 425 173 415 178 L 285 246 C 275 251 265 251 255 246 L 105 178 C 95 173 95 163 105 158 Z"
                      fill="#E11D48"
                    />
                    {/* Top Face */}
                    <path
                      d="M 105 140 C 95 135 95 125 105 120 L 255 52 C 265 47 275 47 285 52 L 415 120 C 425 125 425 135 415 140 L 285 208 C 275 213 265 213 255 208 Z"
                      fill="url(#watchGrad3)"
                    />

                    {/* Glossy Reflection Sheen */}
                    <path
                      d="M 105 135 L 255 48 L 295 66 L 145 153 Z"
                      fill="white"
                      opacity="0.3"
                    />

                    {/* 3D Isometric Play Triangle Cutout in center */}
                    <polygon
                      points="250,115 295,138 250,160"
                      fill="white"
                      opacity="0.95"
                      filter="drop-shadow(0 4px 10px rgba(0,0,0,0.25))"
                    />

                    {/* Timeline progress line */}
                    <line
                      x1="180"
                      y1="180"
                      x2="350"
                      y2="180"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      opacity="0.65"
                    />
                    {/* Scrubber Knob on Timeline */}
                    <circle cx="235" cy="180" r="5" fill="white" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
                  </g>

                  {/* ================= 3D FLOATING GLOWING COIN ================= */}
                  <g transform="translate(360, 65)">
                    {/* Coin Reflection / Ambient Glow */}
                    <ellipse cx="25" cy="95" rx="35" ry="12" fill="#F43F5E" opacity="0.35" filter="blur(10px)" />
                    {/* 3D Coin Rim */}
                    <path
                      d="M 5 25 C 5 0, 48 0, 48 25 L 48 40 C 48 65, 5 65, 5 40 Z"
                      fill="url(#coinRimGrad)"
                    />
                    {/* Coin Face */}
                    <ellipse
                      cx="26"
                      cy="26"
                      rx="32"
                      ry="48"
                      fill="url(#coinFaceGrad)"
                      transform="rotate(-28 26 26)"
                      stroke="white"
                      strokeWidth="2.5"
                    />
                    {/* Inner Coin Dotted Inset Ring */}
                    <ellipse
                      cx="26"
                      cy="26"
                      rx="24"
                      ry="38"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="5 3"
                      opacity="0.85"
                      transform="rotate(-28 26 26)"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* =========================================================================
              FEATURE 2: TRAIN AI (3D Art LEFT, Text RIGHT)
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 3D Artwork Column (Left) */}
            <div className="order-1 flex justify-center items-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center select-none">
                {/* Multi-Spectrum Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/25 via-emerald-400/25 to-purple-500/25 rounded-full blur-3xl -z-10" />

                {/* 3D Isometric Mortarboard / AI Graduation Cap Art */}
                <svg viewBox="0 0 520 400" className="w-full h-full filter drop-shadow-2xl overflow-visible">
                  <defs>
                    {/* Cap Diamond Surface Gradient (Electric Cyan to Neon Lime) */}
                    <linearGradient id="aiCapSurfaceGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="45%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#A3E635" />
                    </linearGradient>
                    {/* Skullcap Gradient (Translucent Cyan/Blue Cone) */}
                    <linearGradient id="aiSkullConeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity="0.95" />
                    </linearGradient>
                    {/* Base Platform Gradient (Violet/Purple) */}
                    <linearGradient id="aiPlatformGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>

                  {/* Base Platform Shadow */}
                  <ellipse cx="230" cy="340" rx="140" ry="30" fill="#4C1D95" opacity="0.2" filter="blur(14px)" />

                  {/* ================= BASE PLATFORM (Tilted Violet Star Slab) ================= */}
                  <g transform="translate(150, 245)">
                    {/* Extruded Side */}
                    <path
                      d="M 20 60 L 75 88 L 130 60 L 130 78 L 75 106 L 20 78 Z"
                      fill="#4C1D95"
                    />
                    {/* Top Face */}
                    <path
                      d="M 20 60 L 75 32 L 130 60 L 75 88 Z"
                      fill="url(#aiPlatformGrad)"
                    />
                    {/* 4-Point Star Cutout on Platform */}
                    <path
                      d="M 75 42 Q 75 60 93 60 Q 75 60 75 78 Q 75 60 57 60 Q 75 60 75 42 Z"
                      fill="white"
                      opacity="0.95"
                      filter="drop-shadow(0 2px 6px rgba(0,0,0,0.3))"
                    />
                  </g>

                  {/* ================= SKULLCAP CONE UNDERNEATH ================= */}
                  <g transform="translate(140, 155)">
                    <path
                      d="M 60 75 C 60 145, 145 145, 145 75 L 125 35 L 80 35 Z"
                      fill="url(#aiSkullConeGrad)"
                      opacity="0.85"
                    />
                    {/* Inner cone lighting */}
                    <ellipse cx="102" cy="75" rx="42" ry="20" fill="#00E5FF" opacity="0.25" />
                  </g>

                  {/* ================= 3D MORTARBOARD DIAMOND CAP TOP ================= */}
                  <g transform="translate(55, 45)">
                    {/* Extruded Thickness of Cap */}
                    <path
                      d="M 30 148 L 205 240 L 385 148 L 385 160 L 205 252 L 30 160 Z"
                      fill="#0284C7"
                    />
                    {/* Main Diamond Surface */}
                    <path
                      d="M 30 148 L 205 54 L 385 148 L 205 240 Z"
                      fill="url(#aiCapSurfaceGrad)"
                    />

                    {/* Glossy Edge Sheen */}
                    <path
                      d="M 30 148 L 205 54 L 230 68 L 55 162 Z"
                      fill="white"
                      opacity="0.25"
                    />

                    {/* Embossed Bold White "AI" on the front surface */}
                    <text
                      x="205"
                      y="142"
                      textAnchor="middle"
                      fill="white"
                      fontSize="68"
                      fontWeight="900"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      letterSpacing="-0.03em"
                      filter="drop-shadow(0 6px 14px rgba(0,0,0,0.2))"
                    >
                      AI
                    </text>

                    {/* Cap Center Button */}
                    <circle cx="205" cy="150" r="7.5" fill="#00E5FF" stroke="white" strokeWidth="2.5" />

                    {/* Tassel String draped over right edge */}
                    <path
                      d="M 205 150 Q 290 152 320 190 Q 330 205 336 235"
                      fill="none"
                      stroke="#A3E635"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                    />
                    {/* Tassel Bell Fringe */}
                    <path
                      d="M 330 235 L 342 235 L 346 256 L 326 256 Z"
                      fill="#84CC16"
                    />
                    <circle cx="336" cy="235" r="4.5" fill="#BEF264" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Text Column (Right) */}
            <div className="order-2">
              <h3 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-950 leading-tight">
                Train AI
              </h3>

              {/* Grey Metric Pill Card */}
              <div className="my-6 rounded-2xl bg-[#E5E9EE]/90 p-5 max-w-sm border border-slate-200/60 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Earn per task</p>
                <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">
                  ₹50 – ₹200 per hour
                </p>
              </div>

              <p className="font-bold text-slate-900 text-sm sm:text-base">
                Best for: higher-paying tasks that need more attention
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                Help improve AI by doing simple tasks like labeling images, evaluating model prompts side-by-side, or reviewing completions. Instructions are clear and easy to follow. These tasks take a bit more focus, but they usually pay more.
              </p>

              <div className="mt-8">
                <Link
                  href="/dashboard/train-ai"
                  className="inline-flex items-center justify-center rounded-full bg-[#161616] hover:bg-black px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Train AI
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================================
              FEATURE 3: COMPLETE MICROTASKS (Text LEFT, 3D Art RIGHT)
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Column */}
            <div className="order-2 lg:order-1">
              <h3 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-950 leading-tight">
                Complete microtasks
              </h3>

              {/* Grey Metric Pill Card */}
              <div className="my-6 rounded-2xl bg-[#E5E9EE]/90 p-5 max-w-sm border border-slate-200/60 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Earn per task</p>
                <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">
                  ₹10 – ₹100
                </p>
              </div>

              <p className="font-bold text-slate-900 text-sm sm:text-base">
                Best for: beginners who want easy, flexible tasks
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                Choose from quick and simple tasks you can finish in minutes. This can include speed quiz questions, fast review actions, or short surveys. No experience needed. Just pick a task and start earning step by step.
              </p>

              <div className="mt-8">
                <Link
                  href="/dashboard/quiz"
                  className="inline-flex items-center justify-center rounded-full bg-[#161616] hover:bg-black px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Complete microtasks
                </Link>
              </div>
            </div>

            {/* 3D Artwork Column (Right) */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center select-none">
                {/* Multi-Spectrum Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-pink-400/25 to-orange-400/20 rounded-full blur-3xl -z-10" />

                {/* 3D Layered Floating Cards & Diagonal Capsule/Pencil Art */}
                <svg viewBox="0 0 520 400" className="w-full h-full filter drop-shadow-2xl overflow-visible">
                  <defs>
                    <linearGradient id="microPencilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B00" />
                      <stop offset="50%" stopColor="#FF2A85" />
                      <stop offset="100%" stopColor="#C026D3" />
                    </linearGradient>
                    <linearGradient id="microCardMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF1F2" />
                      <stop offset="100%" stopColor="#FED7AA" />
                    </linearGradient>
                    <linearGradient id="microCardBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F43F5E" />
                      <stop offset="100%" stopColor="#C026D3" />
                    </linearGradient>
                  </defs>

                  {/* Base Ambient Shadows */}
                  <ellipse cx="280" cy="330" rx="160" ry="35" fill="#9F1239" opacity="0.15" filter="blur(16px)" />

                  {/* Card 3: Back Solid Magenta Card (Tilted) */}
                  <g transform="translate(250, 80)">
                    <rect
                      x="0"
                      y="0"
                      width="155"
                      height="220"
                      rx="30"
                      fill="url(#microCardBackGrad)"
                      transform="rotate(6 77 110)"
                      opacity="0.95"
                    />
                  </g>

                  {/* Card 2: Middle Liquid Swirl Card */}
                  <g transform="translate(180, 50)">
                    <rect
                      x="0"
                      y="0"
                      width="155"
                      height="220"
                      rx="30"
                      fill="url(#microCardMidGrad)"
                      stroke="#F43F5E"
                      strokeWidth="1.5"
                    />
                    {/* Liquid Swirl Ribbon on Card */}
                    <path
                      d="M 10 135 Q 50 185 80 135 Q 110 85 145 145"
                      fill="none"
                      stroke="#FB923C"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 15 115 Q 55 165 85 115 Q 115 65 140 125"
                      fill="none"
                      stroke="#C026D3"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    {/* Play Cutout Accent */}
                    <polygon
                      points="105,170 130,185 105,200"
                      fill="white"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                    />
                  </g>

                  {/* Card 1: Front Frosted Glass Card with 3D Diagonal Capsule/Pencil */}
                  <g transform="translate(95, 20)">
                    {/* Frosted Glass Shadow */}
                    <rect
                      x="0"
                      y="0"
                      width="165"
                      height="235"
                      rx="34"
                      fill="white"
                      opacity="0.82"
                      filter="drop-shadow(0 25px 35px rgba(0,0,0,0.14))"
                    />
                    {/* Glass White Border */}
                    <rect
                      x="0"
                      y="0"
                      width="165"
                      height="235"
                      rx="34"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      opacity="0.95"
                    />

                    {/* 3D Diagonal Capsule / Pencil on Front Card */}
                    <g transform="translate(52, 45) rotate(42)">
                      <rect
                        x="0"
                        y="0"
                        width="26"
                        height="92"
                        rx="13"
                        fill="url(#microPencilGrad)"
                        filter="drop-shadow(0 10px 14px rgba(255,42,133,0.4))"
                      />
                      {/* Glossy Sheen line */}
                      <rect
                        x="4.5"
                        y="4.5"
                        width="6.5"
                        height="83"
                        rx="3"
                        fill="white"
                        opacity="0.35"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* =========================================================================
              FEATURE 4: PLAY & EARN (3D Art LEFT, Text RIGHT)
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 3D Artwork Column (Left) */}
            <div className="order-1 flex justify-center items-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center select-none">
                {/* Multi-Spectrum Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/25 via-sky-400/25 to-emerald-400/20 rounded-full blur-3xl -z-10" />

                {/* 3D Stylized Hand Holding Smartphone with Heart Art */}
                <svg viewBox="0 0 520 400" className="w-full h-full filter drop-shadow-2xl overflow-visible">
                  <defs>
                    <linearGradient id="handGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                    <linearGradient id="phoneBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#818CF8" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="fingerTipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#818CF8" />
                    </linearGradient>
                  </defs>

                  {/* Hand Silhouette / Wrist */}
                  <g transform="translate(65, 40)">
                    <path
                      d="M 60 270 C 40 230, 40 185, 50 145 C 60 105, 80 85, 95 95 C 110 105, 100 135, 95 165 L 110 270 Z"
                      fill="url(#handGrad)"
                      filter="drop-shadow(0 16px 28px rgba(79,70,229,0.35))"
                    />

                    {/* Smartphone Held in Hand */}
                    <g transform="translate(90, 20)">
                      <rect
                        x="0"
                        y="0"
                        width="140"
                        height="235"
                        rx="32"
                        fill="url(#phoneBodyGrad)"
                        stroke="white"
                        strokeWidth="2.5"
                        opacity="0.96"
                      />
                      {/* Glossy Diagonal Reflection across phone glass */}
                      <path
                        d="M 0 35 L 140 115 L 140 155 L 0 75 Z"
                        fill="white"
                        opacity="0.2"
                      />

                      {/* Embossed Glowing Heart in center of screen */}
                      <path
                        d="M 70 88 C 70 72, 47 72, 47 93 C 47 114, 70 130, 70 138 C 70 130, 93 114, 93 93 C 93 72, 70 72, 70 88 Z"
                        fill="white"
                        filter="drop-shadow(0 8px 18px rgba(0,0,0,0.25))"
                      />
                    </g>

                    {/* Translucent Cyan/Lilac Fingertips wrapping around right side */}
                    <g transform="translate(205, 62)">
                      {/* Finger 1 */}
                      <circle cx="20" cy="20" r="14.5" fill="url(#fingerTipGrad)" opacity="0.88" />
                      {/* Finger 2 */}
                      <circle cx="26" cy="57" r="15.5" fill="url(#fingerTipGrad)" opacity="0.92" />
                      {/* Finger 3 */}
                      <circle cx="20" cy="94" r="14.5" fill="url(#fingerTipGrad)" opacity="0.88" />
                      {/* Finger 4 */}
                      <circle cx="10" cy="128" r="12.5" fill="url(#fingerTipGrad)" opacity="0.82" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Text Column (Right) */}
            <div className="order-2">
              <h3 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-950 leading-tight">
                Play &amp; earn
              </h3>

              {/* Grey Metric Pill Card */}
              <div className="my-6 rounded-2xl bg-[#E5E9EE]/90 p-5 max-w-sm border border-slate-200/60 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Earn per quest</p>
                <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">
                  ₹20 – ₹150
                </p>
              </div>

              <p className="font-bold text-slate-900 text-sm sm:text-base">
                Best for: turning gaming and arcade time into rewards
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                Launch browser arcade quest challenges, dodge obstacles, hit designated score milestones, and unlock bonus earnings. No installations or downloads required.
              </p>

              <div className="mt-8">
                <Link
                  href="/dashboard/games"
                  className="inline-flex items-center justify-center rounded-full bg-[#161616] hover:bg-black px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Play arcade
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
