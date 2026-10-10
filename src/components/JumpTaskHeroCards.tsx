'use client';

import React from 'react';

export default function JumpTaskHeroCards() {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-5xl px-4 sm:px-6 select-none">
      {/* 3D Perspective Container */}
      <div className="relative flex items-center justify-center pt-8 pb-12 sm:pt-12 sm:pb-20 perspective-[1400px]">
        {/* Background 3D Dark Pebbles (JumpTask aesthetic) */}
        {/* Left Pebble */}
        <div
          className="pointer-events-none absolute left-4 sm:left-12 top-20 sm:top-28 h-56 w-56 sm:h-72 sm:w-72 rounded-[45%] bg-gradient-to-br from-slate-800 via-slate-900 to-black opacity-90 shadow-2xl blur-[1px] transform -rotate-12 -z-10"
          style={{
            boxShadow: 'inset 4px 6px 16px rgba(255,255,255,0.12), 0 30px 60px rgba(0,0,0,0.5)',
          }}
        />

        {/* Center / Lower Pebble */}
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 h-44 w-72 sm:h-60 sm:w-96 rounded-[50%] bg-gradient-to-b from-slate-900 to-black opacity-95 shadow-2xl blur-[1px] -z-10"
          style={{
            boxShadow: 'inset 0 6px 14px rgba(255,255,255,0.08), 0 35px 70px rgba(0,0,0,0.6)',
          }}
        />

        {/* Right Pebble */}
        <div
          className="pointer-events-none absolute right-4 sm:right-12 top-16 sm:top-24 h-60 w-60 sm:h-80 sm:w-80 rounded-[48%] bg-gradient-to-bl from-slate-800 via-slate-900 to-black opacity-90 shadow-2xl blur-[1px] transform rotate-12 -z-10"
          style={{
            boxShadow: 'inset -4px 6px 16px rgba(255,255,255,0.12), 0 30px 60px rgba(0,0,0,0.5)',
          }}
        />

        {/* Tilted Cards Wrapper */}
        <div className="relative flex items-center justify-center w-full max-w-4xl">
          {/* ================= CARD 1: SIGN UP IN A MINUTE (Left Tilted) ================= */}
          <div
            className="relative z-10 w-64 sm:w-80 h-96 sm:h-[430px] rounded-[32px] p-6 sm:p-7 text-white overflow-hidden shadow-2xl border border-white/25 transform -rotate-12 -translate-x-8 sm:-translate-x-16 translate-y-6 sm:translate-y-8 hover:-translate-y-2 hover:-rotate-8 transition-all duration-500 ease-out cursor-pointer group"
            style={{
              background: 'linear-gradient(140deg, #FF6036 0%, #FF2A6D 48%, #9B00E8 100%)',
              boxShadow: '0 25px 50px -12px rgba(255, 42, 109, 0.45), inset 0 2px 6px rgba(255,255,255,0.4)',
            }}
          >
            {/* Glossy sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

            {/* Header: Step Icon & Text */}
            <div className="relative z-10 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md shadow-xs">
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-sm sm:text-base font-extrabold text-white leading-tight drop-shadow-sm">
                  Sign up<br />in a minute
                </p>
              </div>
            </div>

            {/* Graphic: 3D Glowing Neon Diagonal Arrows (JumpTask visual) */}
            <div className="absolute -bottom-4 -right-4 w-56 sm:w-64 h-56 sm:h-64 pointer-events-none transform group-hover:scale-105 transition-transform duration-500">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <defs>
                  <linearGradient id="neonArrowGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C026D3" />
                    <stop offset="100%" stopColor="#E879F9" />
                  </linearGradient>
                  <linearGradient id="neonArrowGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                  <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Arrow 1 (Back Glow) */}
                <g filter="url(#neonGlow)" opacity="0.6">
                  <path
                    d="M 30 150 L 110 70 M 110 70 L 65 65 M 110 70 L 105 115"
                    stroke="url(#neonArrowGrad1)"
                    strokeWidth="28"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Arrow 1 (Front Solid) */}
                <path
                  d="M 30 150 L 110 70 M 110 70 L 65 65 M 110 70 L 105 115"
                  stroke="url(#neonArrowGrad1)"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Arrow 2 (Back Glow) */}
                <g filter="url(#neonGlow)" opacity="0.6">
                  <path
                    d="M 80 170 L 160 90 M 160 90 L 115 85 M 160 90 L 155 135"
                    stroke="url(#neonArrowGrad2)"
                    strokeWidth="28"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Arrow 2 (Front Solid) */}
                <path
                  d="M 80 170 L 160 90 M 160 90 L 115 85 M 160 90 L 155 135"
                  stroke="url(#neonArrowGrad2)"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* ================= CARD 2: PICK A TASK, DO IT (Center Tilted Lime Green) ================= */}
          <div
            className="relative z-20 w-72 sm:w-96 h-[410px] sm:h-[460px] rounded-[36px] p-7 sm:p-8 text-slate-950 overflow-hidden shadow-2xl border border-white/40 transform -rotate-2 hover:rotate-0 hover:-translate-y-3 transition-all duration-500 ease-out cursor-pointer group"
            style={{
              background: 'linear-gradient(145deg, #B5FF24 0%, #85EB17 52%, #4ECB04 100%)',
              boxShadow: '0 30px 60px -15px rgba(110, 210, 10, 0.45), inset 0 2px 8px rgba(255,255,255,0.6)',
            }}
          >
            {/* Glossy sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 pointer-events-none" />

            {/* Header: Step Icon & Text */}
            <div className="relative z-10 flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white/45 backdrop-blur-md shadow-xs">
                <svg className="h-5 w-5 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-base sm:text-lg font-black text-slate-950 leading-tight">
                  Pick a task,<br />do it
                </p>
              </div>
            </div>

            {/* Graphic: 3D Voxel / Isometric Downward Arrow (Exact JumpTask visual) */}
            <div className="absolute bottom-4 right-2 sm:bottom-6 sm:right-4 w-60 sm:w-72 h-60 sm:h-72 pointer-events-none transform group-hover:scale-105 transition-transform duration-500">
              <svg viewBox="0 0 240 240" className="w-full h-full" fill="none">
                <defs>
                  {/* Subtle ground contact shadow */}
                  <radialGradient id="arrowGroundShadow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1E5C00" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#1E5C00" stopOpacity="0" />
                  </radialGradient>
                  {/* Voxel 3D facets */}
                  <linearGradient id="voxelTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C4FF36" />
                    <stop offset="100%" stopColor="#A8F814" />
                  </linearGradient>
                  <linearGradient id="voxelLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7CD806" />
                    <stop offset="100%" stopColor="#55A600" />
                  </linearGradient>
                  <linearGradient id="voxelRight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9BEA17" />
                    <stop offset="100%" stopColor="#6BC202" />
                  </linearGradient>
                </defs>

                {/* Ground Shadow */}
                <ellipse cx="140" cy="190" rx="60" ry="24" fill="url(#arrowGroundShadow)" />

                {/* 3D Isometric Stepped Voxel Downward Arrow */}
                {/* Stem Upper Voxel Cube */}
                <g transform="translate(110, 40)">
                  {/* Top face */}
                  <polygon points="25,0 50,15 25,30 0,15" fill="url(#voxelTop)" />
                  {/* Left face */}
                  <polygon points="0,15 25,30 25,70 0,55" fill="url(#voxelLeft)" />
                  {/* Right face */}
                  <polygon points="25,30 50,15 50,55 25,70" fill="url(#voxelRight)" />
                </g>

                {/* Stem Middle Voxel Cube */}
                <g transform="translate(110, 75)">
                  {/* Left face */}
                  <polygon points="0,15 25,30 25,70 0,55" fill="url(#voxelLeft)" />
                  {/* Right face */}
                  <polygon points="25,30 50,15 50,55 25,70" fill="url(#voxelRight)" />
                </g>

                {/* Stepped Arrowhead Wing (Left) */}
                <g transform="translate(65, 105)">
                  <polygon points="25,0 50,15 25,30 0,15" fill="url(#voxelTop)" />
                  <polygon points="0,15 25,30 25,55 0,40" fill="url(#voxelLeft)" />
                  <polygon points="25,30 50,15 50,40 25,55" fill="url(#voxelRight)" />
                </g>

                {/* Stepped Arrowhead Wing (Right) */}
                <g transform="translate(155, 105)">
                  <polygon points="25,0 50,15 25,30 0,15" fill="url(#voxelTop)" />
                  <polygon points="0,15 25,30 25,55 0,40" fill="url(#voxelLeft)" />
                  <polygon points="25,30 50,15 50,40 25,55" fill="url(#voxelRight)" />
                </g>

                {/* Arrowhead Center Point Voxel Cube (Bottom Tip) */}
                <g transform="translate(110, 130)">
                  {/* Top face */}
                  <polygon points="25,0 50,15 25,30 0,15" fill="url(#voxelTop)" />
                  {/* Left face */}
                  <polygon points="0,15 25,30 25,65 0,50" fill="url(#voxelLeft)" />
                  {/* Right face */}
                  <polygon points="25,30 50,15 50,50 25,65" fill="url(#voxelRight)" />
                </g>
              </svg>
            </div>
          </div>

          {/* ================= CARD 3: GET PAID, CASH OUT (Right Tilted Violet) ================= */}
          <div
            className="relative z-10 w-64 sm:w-80 h-96 sm:h-[430px] rounded-[32px] p-6 sm:p-7 text-white overflow-hidden shadow-2xl border border-white/25 transform rotate-12 translate-x-8 sm:translate-x-16 translate-y-6 sm:translate-y-8 hover:-translate-y-2 hover:rotate-8 transition-all duration-500 ease-out cursor-pointer group"
            style={{
              background: 'linear-gradient(140deg, #5D33EC 0%, #793FFF 50%, #3B82F6 100%)',
              boxShadow: '0 25px 50px -12px rgba(121, 63, 255, 0.45), inset 0 2px 6px rgba(255,255,255,0.4)',
            }}
          >
            {/* Glossy sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

            {/* Header: Step Icon & Text */}
            <div className="relative z-10 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md shadow-xs">
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-sm sm:text-base font-extrabold text-white leading-tight drop-shadow-sm">
                  Get paid,<br />cash out
                </p>
              </div>
            </div>

            {/* Graphic: 3D Glowing Gradient Spheres (Exact JumpTask visual) */}
            <div className="absolute -bottom-6 -right-6 w-56 sm:w-64 h-56 sm:h-64 pointer-events-none transform group-hover:scale-105 transition-transform duration-500">
              <svg viewBox="0 0 220 220" className="w-full h-full" fill="none">
                <defs>
                  {/* Sphere 1 Gradient (Large Orange/Gold Sphere) */}
                  <radialGradient id="sphereGrad1" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="35%" stopColor="#FF7A00" />
                    <stop offset="70%" stopColor="#E02E49" />
                    <stop offset="100%" stopColor="#7E1066" />
                  </radialGradient>
                  {/* Sphere 2 Gradient (Medium Magenta/Pink Sphere) */}
                  <radialGradient id="sphereGrad2" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFA6E0" />
                    <stop offset="40%" stopColor="#EC4899" />
                    <stop offset="85%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#4C1D95" />
                  </radialGradient>
                  {/* Sphere 3 Gradient (Small Ambient Orb) */}
                  <radialGradient id="sphereGrad3" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#FFD166" />
                    <stop offset="60%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#B45309" />
                  </radialGradient>
                  <filter id="sphereShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#2E1065" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Small Sphere */}
                <circle cx="65" cy="80" r="24" fill="url(#sphereGrad3)" filter="url(#sphereShadow)" opacity="0.85" />

                {/* Medium Pink Sphere */}
                <circle cx="75" cy="145" r="38" fill="url(#sphereGrad2)" filter="url(#sphereShadow)" />

                {/* Large Orange Glow Sphere */}
                <circle cx="150" cy="130" r="58" fill="url(#sphereGrad1)" filter="url(#sphereShadow)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
