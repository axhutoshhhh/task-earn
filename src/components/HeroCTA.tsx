'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function HeroCTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = useMemo(() => createClient(), []);

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
      <div className="mt-8 flex justify-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-[#161616] px-8 py-3.5 text-base font-bold text-white shadow-xl transition-all duration-200 hover:bg-[#793FFF] hover:shadow-2xl hover:scale-105 active:scale-95"
        >
          <span>Go to Dashboard</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 flex justify-center">
      <Link
        href="/register"
        className="inline-flex items-center justify-center rounded-full bg-[#161616] px-8 py-3.5 text-base font-bold text-white shadow-xl transition-all duration-200 hover:bg-[#793FFF] hover:shadow-2xl hover:scale-105 active:scale-95"
      >
        Create free account
      </Link>
    </div>
  );
}
