'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DashboardNav() {
  const pathname = usePathname();
  const [balance, setBalance] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function loadBalance() {
      try {
        const res = await fetch('/api/rewards/balance');
        if (res.ok) {
          const data = await res.json();
          setBalance(data.balance ?? 0);
        }
      } catch {
        // Ignore background balance load error
      }
    }

    loadBalance();

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadBalance();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: '📊' },
    { name: 'Speed Quizzes', href: '/dashboard/quiz', icon: '⚡' },
    { name: 'Watch to Earn', href: '/dashboard/watch', icon: '📺' },
    { name: 'Train AI', href: '/dashboard/train-ai', icon: '🤖' },
    { name: 'Play Games', href: '/dashboard/games', icon: '🎮' },
    { name: 'POV Bounties', href: '/dashboard/pov-videos', icon: '🎥' },
    { name: 'Rewards Catalog', href: '/dashboard/rewards', icon: '🎁' },
  ];

  return (
    <div className="sticky top-20 z-40 border-b border-[#793FFF]/15 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5">
        {/* Horizontal Scrollable Tabs */}
        <nav
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs font-bold"
          aria-label="Dashboard Channels"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 transition-all ${
                  isActive
                    ? 'bg-[#793FFF] text-white shadow-md shadow-[#793FFF]/25 ring-2 ring-[#793FFF]/30'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side: Live Wallet Pill */}
        <div className="hidden md:flex items-center gap-3 shrink-0 pl-4 border-l border-slate-200">
          <Link
            href="/dashboard/rewards"
            className="inline-flex items-center gap-2 rounded-full border border-[#793FFF]/30 bg-[#793FFF]/10 px-3.5 py-1.5 text-xs font-black text-[#793FFF] transition hover:bg-[#793FFF]/20"
            title="Click to open Rewards Catalog"
          >
            <span>🪙</span>
            <span>{balance !== null ? `${balance} Pts` : 'Loading...'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
