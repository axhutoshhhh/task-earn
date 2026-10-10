'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function HeroCTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  if (isLoggedIn) {
    return (
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#793FFF] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#793FFF]/30 hover:bg-[#682FF8] hover:shadow-xl hover:shadow-[#793FFF]/40 transition-all duration-200 active:scale-95"
        >
          <span>Go to Your Dashboard</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
        <Link
          href="/dashboard/rewards"
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-400 transition"
        >
          Rewards Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        href="/register"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#793FFF] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#793FFF]/30 hover:bg-[#682FF8] hover:shadow-xl hover:shadow-[#793FFF]/40 transition-all duration-200 active:scale-95"
      >
        <span>Start Earning Now</span>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
      <Link
        href="/#features"
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-400 transition"
      >
        Explore Features
      </Link>
    </div>
  );
}
