'use client';

import React from 'react';
import Link from 'next/link';

export default function JumpTaskCTABanner() {
  return (
    <section className="relative w-full bg-[#C5FF5A] overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Headline, Description, Button, Microcopy */}
          <div className="lg:col-span-7 pb-12 sm:pb-16 lg:pb-24 pt-4">
            <h2 className="text-4xl sm:text-6xl lg:text-[70px] xl:text-[76px] font-black tracking-tight text-slate-950 leading-[1.05]">
              Start earning in<br />
              the next 5<br />
              minutes
            </h2>

            <p className="mt-8 text-base sm:text-lg text-slate-900 leading-relaxed max-w-xl font-medium">
              Multiple ways to earn. Real payouts. Transparent system. This online earning platform gives you more control and more opportunities. Create your account and start earning now.
            </p>

            <div className="mt-9">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-[#161616] hover:bg-black px-9 py-4 text-base font-bold text-white shadow-xl shadow-black/15 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Create free account
              </Link>
            </div>

            <p className="mt-5 text-xs font-semibold text-slate-800 tracking-wide">
              8 sec to first reward. 3,500+ tasks
            </p>
          </div>

          {/* Right Column: Hand & Smartphone Graphic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-end">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[480px] flex items-end justify-center select-none">
              <img
                src="/task-earn-hand-cta.png"
                alt="Task Earn Mobile App Preview"
                className="w-full h-auto object-contain block drop-shadow-xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
