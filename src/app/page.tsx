import React from 'react';
import HeroCTA from '@/components/HeroCTA';
import JumpTaskHeroCards from '@/components/JumpTaskHeroCards';
import JumpTaskHowItWorks from '@/components/JumpTaskHowItWorks';
import JumpTaskFeaturesShowcase from '@/components/JumpTaskFeaturesShowcase';
import JumpTaskCTABanner from '@/components/JumpTaskCTABanner';

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-transparent text-slate-900">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      {/* =========================================================================
          1. HERO SECTION (Unblocked for instantaneous paint & zero-delay FCP/LCP)
          ========================================================================= */}
      <section className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-24 bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          {/* Top Pill Tag: Online earning platform */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-xs border border-white/80">
            <svg className="h-3.5 w-3.5 text-[#793FFF]" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Online earning platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.08]">
            Earn money online, one simple task at a time
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
            Task Earn is an online earning platform built for anyone. Watch videos, train AI, complete arcade games, or solve speed quizzes – and get rewarded for all of it.
          </p>

          {/* CTA Button */}
          <div className="mt-2">
            <HeroCTA />
          </div>

          {/* 3D Floating Hero Cards */}
          <JumpTaskHeroCards />
        </div>
      </section>

      {/* =========================================================================
          2. YOU CAN EARN MONEY IN MINUTES. HERE'S HOW: (JumpTask Interactive Showcase)
          ========================================================================= */}
      <JumpTaskHowItWorks />

      {/* =========================================================================
          3. PICK A TASK. COMPLETE IT. GET PAID. (JumpTask 3D Alternating Showcase)
          ========================================================================= */}
      <JumpTaskFeaturesShowcase />

      {/* =========================================================================
          4. START EARNING IN THE NEXT 5 MINUTES (JumpTask Lime CTA Banner)
          ========================================================================= */}
      <JumpTaskCTABanner />
    </div>
  );
}
