'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

type DropdownKey = 'earn' | 'payouts' | 'explore' | 'about' | null;

export default function Navbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<DropdownKey>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [balance, setBalance] = useState<number | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      setUser(currentUser);
      if (currentUser) {
        const name =
          currentUser.user_metadata?.display_name ||
          currentUser.email?.split('@')[0] ||
          'User';
        setDisplayName(name);
        fetchBalance();
      }
    }

    async function fetchBalance() {
      try {
        const res = await fetch('/api/rewards/balance', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setBalance(data.balance ?? 0);
        }
      } catch {
        // Ignore balance fetch failure
      }
    }

    checkUser();

    const handleBalanceEvent = (e?: Event) => {
      const customEvent = e as CustomEvent<{ newBalance?: number }>;
      if (customEvent?.detail?.newBalance !== undefined) {
        setBalance(customEvent.detail.newBalance);
      } else {
        fetchBalance();
      }
    };

    window.addEventListener('taskearn:balance-updated', handleBalanceEvent);
    window.addEventListener('focus', fetchBalance);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        const name =
          nextUser.user_metadata?.display_name ||
          nextUser.email?.split('@')[0] ||
          'User';
        setDisplayName(name);
        fetchBalance();
      } else {
        setDisplayName('');
        setBalance(null);
      }
    });

    return () => {
      window.removeEventListener('taskearn:balance-updated', handleBalanceEvent);
      window.removeEventListener('focus', fetchBalance);
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close dropdowns and refresh balance on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);

    // Fetch fresh balance on route navigation
    const refreshNavBalance = async () => {
      try {
        const res = await fetch('/api/rewards/balance', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.balance === 'number') {
            setBalance(data.balance);
          }
        }
      } catch {
        // Ignore balance refresh failure
      }
    };

    refreshNavBalance();
  }, [pathname]);

  const handleMouseEnter = (key: DropdownKey) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    await supabase.auth.signOut();
    window.location.replace('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-colors">
      <div
        ref={navRef}
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Brand Logo - JumpTask style lowercase font with purple dot */}
        <div className="flex items-center shrink-0">
          <Link
            href={user ? '/dashboard' : '/'}
            className="group flex items-center gap-1.5 text-2xl font-black tracking-tight text-slate-900 transition"
            aria-label="Task Earn Home"
          >
            <span>taskearn</span>
            <span className="inline-block h-2 w-2 rounded-full bg-[#793FFF] transition-transform group-hover:scale-125" />
          </Link>
        </div>

        {/* Center Navigation - Dropdown Menu Buttons */}
        <nav
          className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-700"
          aria-label="Main Navigation"
        >
          {/* 1. Earn Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('earn')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'earn' ? null : 'earn')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors ${
                activeDropdown === 'earn'
                  ? 'text-[#793FFF] bg-[#793FFF]/8'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
              }`}
              aria-expanded={activeDropdown === 'earn'}
            >
              <span>Earn</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === 'earn' ? 'rotate-180 text-[#793FFF]' : 'text-slate-400'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Earn Dropdown Panel (Textured Mega-Menu with Gradient Badges & Ambient Highlights) */}
            {activeDropdown === 'earn' && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[590px] rounded-[30px] border border-white/80 bg-white/95 backdrop-blur-2xl p-6 shadow-[0_25px_70px_-15px_rgba(15,23,42,0.18),0_0_0_1px_rgba(0,0,0,0.03)] z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden select-none"
                onMouseEnter={() => handleMouseEnter('earn')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Organic Ambient Corner Glows */}
                <div className="pointer-events-none absolute -top-14 -right-14 h-36 w-36 rounded-full bg-gradient-to-br from-violet-400/20 via-purple-300/15 to-transparent blur-2xl" />
                <div className="pointer-events-none absolute -bottom-14 -left-14 h-36 w-36 rounded-full bg-gradient-to-tr from-rose-400/20 via-amber-300/15 to-transparent blur-2xl" />

                {/* Header Strip */}
                <div className="relative flex items-center justify-between border-b border-slate-100/80 pb-3.5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#793FFF] animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Active Earning Categories
                    </span>
                  </div>
                  <Link
                    href={user ? '/dashboard' : '/login'}
                    className="group/all inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-[#793FFF] transition"
                  >
                    <span>View all tasks</span>
                    <svg className="h-3.5 w-3.5 transition-transform group-hover/all:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </div>

                <div className="relative grid grid-cols-2 gap-2.5">
                  {/* 1. Speed Quizzes */}
                  <Link
                    href={user ? '/dashboard/quiz' : '/login'}
                    className="group relative flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-2xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#793FFF] to-[#06B6D4] text-white shadow-md shadow-[#793FFF]/25">
                      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-[#793FFF] transition-colors">
                          Speed Quizzes
                        </h4>
                        <span className="rounded-full bg-emerald-50 text-emerald-700 px-1.5 py-0.2 text-[8px] font-bold">
                          Available
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                        Timed rapid knowledge rounds &amp; instant payouts
                      </p>
                    </div>
                  </Link>

                  {/* 2. Play Games */}
                  <Link
                    href={user ? '/dashboard/games' : '/login'}
                    className="group relative flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-2xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25">
                      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="2" y="6" width="20" height="12" rx="2" />
                        <path d="M6 12h4m-2-2v4" />
                        <circle cx="17" cy="12" r="1" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          Play Games
                        </h4>
                        <span className="rounded-full bg-emerald-50 text-emerald-700 px-1.5 py-0.2 text-[8px] font-bold">
                          Available
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                        Arcade reflex challenges and score milestones
                      </p>
                    </div>
                  </Link>

                  {/* 3. Watch Videos */}
                  <Link
                    href={user ? '/dashboard/watch' : '/login'}
                    className="group relative flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-2xs opacity-80 hover:opacity-100"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-md shadow-rose-500/25">
                      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">
                          Watch videos and earn
                        </h4>
                        <span className="rounded-full bg-slate-100 text-slate-500 px-1.5 py-0.2 text-[8px] font-bold">
                          Soon
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                        Stream curated partner and tech content
                      </p>
                    </div>
                  </Link>

                  {/* 4. Train AI */}
                  <Link
                    href={user ? '/dashboard/train-ai' : '/login'}
                    className="group relative flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-2xs opacity-80 hover:opacity-100"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25">
                      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="9" y="9" width="6" height="6" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors">
                          Train AI and earn
                        </h4>
                        <span className="rounded-full bg-slate-100 text-slate-500 px-1.5 py-0.2 text-[8px] font-bold">
                          Soon
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                        Human feedback and prompt evaluations
                      </p>
                    </div>
                  </Link>

                  {/* 5. POV Video Bounties */}
                  <Link
                    href={user ? '/dashboard/pov-videos' : '/login'}
                    className="col-span-2 group relative flex items-center justify-between rounded-2xl p-2.5 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-2xs opacity-80 hover:opacity-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25">
                        <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M23 7l-7 5 7 5V7z" />
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            Upload POV videos and earn
                          </h4>
                          <span className="rounded-full bg-slate-100 text-slate-500 px-1.5 py-0.2 text-[8px] font-bold">
                            Soon
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                          First-person video sweeps for spatial computing datasets
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Bottom Trust Strip */}
                <div className="relative mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Real-time ledger credit upon every task completion</span>
                  </span>
                  <span className="font-bold text-slate-800">Zero fees forever</span>
                </div>
              </div>
            )}
          </div>

          {/* 2. Payouts Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('payouts')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'payouts' ? null : 'payouts')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors ${
                activeDropdown === 'payouts'
                  ? 'text-[#793FFF] bg-[#793FFF]/8'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
              }`}
              aria-expanded={activeDropdown === 'payouts'}
            >
              <span>Payouts</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === 'payouts' ? 'rotate-180 text-[#793FFF]' : 'text-slate-400'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Payouts Dropdown Panel (Textured Menu with Gradient Badges & Ambient Highlights) */}
            {activeDropdown === 'payouts' && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[410px] rounded-[30px] border border-white/80 bg-white/95 backdrop-blur-2xl p-5 shadow-[0_25px_70px_-15px_rgba(15,23,42,0.18),0_0_0_1px_rgba(0,0,0,0.03)] z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden select-none"
                onMouseEnter={() => handleMouseEnter('payouts')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Organic Ambient Corner Glows */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-300/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-gradient-to-tr from-purple-400/20 to-indigo-300/10 blur-2xl" />

                {/* Header Strip */}
                <div className="relative flex items-center justify-between border-b border-slate-100/80 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Verified Payout Rails
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                    24h Dispatch
                  </span>
                </div>

                <div className="relative space-y-1.5">
                  {/* Instant UPI & Bank Cash */}
                  <Link
                    href={user ? '/dashboard/rewards' : '/login'}
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600 text-white shadow-md shadow-emerald-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="2" y="5" width="20" height="14" rx="3" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          Instant UPI &amp; Bank
                        </h4>
                        <span className="rounded-full bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.2 text-[9px] font-bold text-emerald-700">
                          Instant UPI
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        Direct transfer to Indian UPI handle or bank account
                      </p>
                    </div>
                  </Link>

                  {/* Brand Gift Cards */}
                  <Link
                    href={user ? '/dashboard/rewards' : '/login'}
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-500 text-white shadow-md shadow-purple-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polyline points="20 12 20 22 4 22 4 12" />
                        <rect x="2" y="7" width="20" height="5" rx="1" />
                        <line x1="12" y1="22" x2="12" y2="7" />
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                          Brand Gift Cards
                        </h4>
                        <span className="rounded-full bg-purple-50 border border-purple-200/60 px-1.5 py-0.2 text-[9px] font-bold text-purple-700">
                          Top Brands
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        Amazon, Flipkart, Google Play &amp; Starbucks vouchers
                      </p>
                    </div>
                  </Link>

                  {/* All Methods */}
                  <Link
                    href={user ? '/dashboard/rewards' : '/login'}
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                        All Payout Methods
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        Discover all redemption rails &amp; minimum balances
                      </p>
                    </div>
                  </Link>

                  {/* Cryptographic Ledger */}
                  <Link
                    href={user ? '/dashboard' : '/login'}
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-md shadow-amber-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                          Balance &amp; Security Audit
                        </h4>
                        <span className="rounded-full bg-amber-50 border border-amber-200/60 px-1.5 py-0.2 text-[9px] font-bold text-amber-700">
                          Audited
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        Server-verified balance &amp; payout integrity
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Bottom Callout */}
                <div className="relative mt-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-3 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-extrabold text-emerald-950 text-[11px]">
                      Zero deduction fee on all payout methods
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Explore Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('explore')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'explore' ? null : 'explore')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors ${
                activeDropdown === 'explore'
                  ? 'text-[#793FFF] bg-[#793FFF]/8'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
              }`}
              aria-expanded={activeDropdown === 'explore'}
            >
              <span>Explore</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === 'explore' ? 'rotate-180 text-[#793FFF]' : 'text-slate-400'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Explore Dropdown Panel (Textured Menu with Gradient Badges & Ambient Highlights) */}
            {activeDropdown === 'explore' && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[400px] rounded-[30px] border border-white/80 bg-white/95 backdrop-blur-2xl p-5 shadow-[0_25px_70px_-15px_rgba(15,23,42,0.18),0_0_0_1px_rgba(0,0,0,0.03)] z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden select-none"
                onMouseEnter={() => handleMouseEnter('explore')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Organic Ambient Corner Glows */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-sky-400/20 to-blue-300/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-gradient-to-tr from-violet-400/20 to-indigo-300/10 blur-2xl" />

                {/* Header Strip */}
                <div className="relative flex items-center justify-between border-b border-slate-100/80 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Platform Directory &amp; Legal
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    Official
                  </span>
                </div>

                <div className="relative space-y-1.5">
                  <Link
                    href="/faq"
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white shadow-md shadow-sky-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                          Frequently Asked Questions
                        </h4>
                        <span className="rounded-full bg-sky-50 border border-sky-200/60 px-1.5 py-0.2 text-[9px] font-bold text-sky-700">
                          Help
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        Answers for withdrawals, verification &amp; tokens
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/terms"
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        Terms of Service
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        User agreement, fair conduct &amp; compliance rules
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/privacy"
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white shadow-md shadow-slate-900/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="3" y="11" width="18" height="11" rx="3" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-slate-700 transition-colors">
                          Privacy Policy
                        </h4>
                        <span className="rounded-full bg-slate-100 border border-slate-200 px-1.5 py-0.2 text-[9px] font-bold text-slate-700">
                          Encrypted
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        Row-level security, zero tracking &amp; data safety
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/reward-rules"
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-md shadow-amber-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                        Reward Rules
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        Transparent point formulas &amp; payout guidelines
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 4. About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors ${
                activeDropdown === 'about'
                  ? 'text-[#793FFF] bg-[#793FFF]/8'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
              }`}
              aria-expanded={activeDropdown === 'about'}
            >
              <span>About</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === 'about' ? 'rotate-180 text-[#793FFF]' : 'text-slate-400'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* About Dropdown Panel (Textured Menu with Gradient Badges & Ambient Highlights) */}
            {activeDropdown === 'about' && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[410px] rounded-[30px] border border-white/80 bg-white/95 backdrop-blur-2xl p-5 shadow-[0_25px_70px_-15px_rgba(15,23,42,0.18),0_0_0_1px_rgba(0,0,0,0.03)] z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden select-none"
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Organic Ambient Corner Glows */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-300/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-gradient-to-tr from-emerald-400/20 to-teal-300/10 blur-2xl" />

                {/* Header Strip */}
                <div className="relative flex items-center justify-between border-b border-slate-100/80 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-600 animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Company &amp; Governance
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-200/80 px-2 py-0.5 rounded-full">
                    Task Earn HQ
                  </span>
                </div>

                <div className="relative space-y-1.5">
                  <Link
                    href="/#how-it-works"
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white shadow-md shadow-violet-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-violet-600 transition-colors">
                        About Task Earn
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        How our micro-earnings engine empowers individuals
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/#trust"
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-md shadow-emerald-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          Is Task Earn Legit?
                        </h4>
                        <span className="rounded-full bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.2 text-[9px] font-bold text-emerald-700">
                          100% Legit
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        Full transparency, audited payouts &amp; safety record
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/reward-rules"
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50/90 border border-transparent hover:border-slate-100 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 text-white shadow-md shadow-amber-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                        Reward Ledger Rules
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug font-normal">
                        Anti-fraud parameters &amp; withdrawal eligibility
                      </p>
                    </div>
                  </Link>

                  {/* Contact & Business Desk */}
                  <Link
                    href="/contact"
                    className="group relative flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 bg-gradient-to-r from-blue-500/[0.08] via-indigo-500/[0.05] to-transparent border border-blue-200/70 hover:border-blue-400 hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 text-white shadow-md shadow-blue-500/25 transition-transform duration-200 group-hover:scale-105">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-extrabold text-blue-900 group-hover:text-blue-700 transition-colors">
                          Contact &amp; Business Desk
                        </h4>
                        <span className="rounded-full bg-blue-600 px-1.5 py-0.2 text-[9px] font-black text-white uppercase tracking-wider">
                          Support
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-600 leading-snug font-normal">
                        Reach our team for support &amp; partnerships
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA / User Area - Identical to JumpTask ('For business' + 'Start earning >') */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Wallet Pill */}
              <Link
                href="/dashboard/rewards"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-xs hover:border-[#793FFF] hover:text-[#793FFF] transition"
              >
                <svg className="h-3.5 w-3.5 text-[#793FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10" />
                </svg>
                <span>{balance !== null ? `${balance} PTS` : '0 PTS'}</span>
              </Link>

              {/* User Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full bg-[#161616] pl-1.5 pr-3 py-1.5 text-xs font-bold text-white hover:bg-[#793FFF] transition cursor-pointer"
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white font-black text-xs">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{displayName}</span>
                  <svg
                    className={`h-3 w-3 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2.5 w-60 rounded-3xl border border-slate-100 bg-white p-3 shadow-2xl z-50">
                    <div className="border-b border-slate-100 p-2.5">
                      <p className="text-xs font-extrabold text-slate-900 truncate">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-2 space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#793FFF]/10 hover:text-[#793FFF] transition"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        <span>Dashboard Overview</span>
                      </Link>
                      <Link
                        href="/dashboard/rewards"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#793FFF]/10 hover:text-[#793FFF] transition"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 12 20 22 4 22 4 12" />
                          <rect x="2" y="7" width="20" height="5" />
                          <line x1="12" y1="22" x2="12" y2="7" />
                        </svg>
                        <span>Rewards Catalog</span>
                      </Link>
                      <Link
                        href="/faq"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span>FAQ &amp; Help Desk</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-2">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Outlined pill button: 'For business' */}
              <Link
                href="/contact"
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-400 transition"
              >
                For business
              </Link>

              {/* Solid black pill button: 'Start earning >' */}
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#161616] px-5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#793FFF] transition"
              >
                <span>Start earning</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-800 hover:bg-slate-100 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Toggle navigation</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Offcanvas / Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-5 pt-3 pb-8 shadow-2xl" id="mobile-menu">
          {user ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#161616] text-white font-black text-sm">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900 text-sm">{displayName}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[160px]">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/rewards"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#793FFF] px-3 py-1 text-xs font-bold text-white"
                  >
                    <span>{balance !== null ? `${balance} PTS` : '0 PTS'}</span>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/rewards"
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rewards Catalog
                </Link>
                <Link
                  href="/faq"
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ &amp; Help
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full rounded-xl bg-rose-50 border border-rose-200 py-3 text-center text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mobile Accordion Nav */}
              <div className="divide-y divide-slate-100">
                {/* 1. Earn */}
                <div className="py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'earn' ? null : 'earn'
                      )
                    }
                    className="flex w-full items-center justify-between py-2 text-base font-bold text-slate-900"
                  >
                    <span>Earn</span>
                    <svg
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        mobileExpandedSection === 'earn' ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {mobileExpandedSection === 'earn' && (
                    <div className="mt-2 space-y-2 pl-3">
                      <Link
                        href="/login"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Watch &amp; earn
                      </Link>
                      <Link
                        href="/login"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Train AI
                      </Link>
                      <Link
                        href="/login"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Speed Quizzes
                      </Link>
                      <Link
                        href="/login"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Play &amp; earn
                      </Link>
                      <Link
                        href="/login"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        POV Video Bounties
                      </Link>
                    </div>
                  )}
                </div>

                {/* 2. Payouts */}
                <div className="py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'payouts' ? null : 'payouts'
                      )
                    }
                    className="flex w-full items-center justify-between py-2 text-base font-bold text-slate-900"
                  >
                    <span>Payouts</span>
                    <svg
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        mobileExpandedSection === 'payouts' ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {mobileExpandedSection === 'payouts' && (
                    <div className="mt-2 space-y-2 pl-3">
                      <Link
                        href="/login"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        All methods
                      </Link>
                      <Link
                        href="/login"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Gift cards (New)
                      </Link>
                      <Link
                        href="/login"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Instant delivery
                      </Link>
                    </div>
                  )}
                </div>

                {/* 3. Explore */}
                <div className="py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'explore' ? null : 'explore'
                      )
                    }
                    className="flex w-full items-center justify-between py-2 text-base font-bold text-slate-900"
                  >
                    <span>Explore</span>
                    <svg
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        mobileExpandedSection === 'explore' ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {mobileExpandedSection === 'explore' && (
                    <div className="mt-2 space-y-2 pl-3">
                      <Link
                        href="/faq"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        FAQ
                      </Link>
                      <Link
                        href="/terms"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Terms of Service
                      </Link>
                      <Link
                        href="/privacy"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Privacy Policy
                      </Link>
                    </div>
                  )}
                </div>

                {/* 4. About */}
                <div className="py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'about' ? null : 'about'
                      )
                    }
                    className="flex w-full items-center justify-between py-2 text-base font-bold text-slate-900"
                  >
                    <span>About</span>
                    <svg
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        mobileExpandedSection === 'about' ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {mobileExpandedSection === 'about' && (
                    <div className="mt-2 space-y-2 pl-3">
                      <Link
                        href="/#how-it-works"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        About us
                      </Link>
                      <Link
                        href="/#trust"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Is Task Earn legit?
                      </Link>
                      <Link
                        href="/reward-rules"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Reward rules
                      </Link>
                      <Link
                        href="/contact"
                        className="block text-sm font-semibold text-slate-600 hover:text-[#793FFF]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Contact &amp; support
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="rounded-full border border-slate-300 py-3 text-center text-sm font-bold text-slate-800 hover:bg-slate-50 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  For business
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#161616] py-3 text-center text-sm font-bold text-white shadow-md hover:bg-[#793FFF] transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Start earning</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
