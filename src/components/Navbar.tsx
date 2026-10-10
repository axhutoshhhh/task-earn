'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [balance, setBalance] = useState<number | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

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
        const res = await fetch('/api/rewards/balance');
        if (res.ok) {
          const data = await res.json();
          setBalance(data.balance ?? 0);
        }
      } catch {
        // Ignore balance fetch failure
      }
    }

    checkUser();

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
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Close user dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    await supabase.auth.signOut();
    window.location.replace('/login');
  };

  const publicNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const loggedInNavLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Rewards', href: '/dashboard/rewards' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#793FFF]/15 bg-[#f7f4fd]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center shrink-0">
          <Link
            href={user ? '/dashboard' : '/'}
            className="group flex items-center gap-3 text-xl font-extrabold tracking-tight text-slate-900"
            aria-label="Task Earn Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#793FFF] via-[#8B5CF6] to-[#06B6D4] shadow-md shadow-[#793FFF]/20 transition-transform duration-300 group-hover:scale-105">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Task<span className="text-[#793FFF]">Earn</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Spacious & Clean */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600"
          aria-label="Main Navigation"
        >
          {(user ? loggedInNavLinks : publicNavLinks).map((link) => {
            const isActive =
              link.href === '/dashboard'
                ? pathname.startsWith('/dashboard') && !pathname.includes('/rewards')
                : pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-[#793FFF] ${
                  isActive ? 'font-bold text-[#793FFF]' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / User Area - Spacious with proper gaps */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Wallet Pill - Sleek Vector Icon, NO emoji */}
              <Link
                href="/dashboard/rewards"
                className="inline-flex items-center gap-2 rounded-full border border-[#793FFF]/25 bg-[#793FFF]/8 px-4 py-2 text-xs font-black text-[#793FFF] transition hover:bg-[#793FFF]/15 hover:border-[#793FFF]/40 shadow-xs"
                title="Reward Wallet Balance"
              >
                <svg
                  className="h-3.5 w-3.5 text-[#793FFF]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M14.5 9h-4a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3h-4" />
                  <path d="M12 7v10" />
                </svg>
                <span>{balance !== null ? `${balance} PTS` : '0 PTS'}</span>
              </Link>

              {/* User Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white p-1.5 pr-3 text-xs font-bold text-slate-800 shadow-xs hover:border-[#793FFF]/40 hover:shadow-sm transition cursor-pointer"
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white font-black text-xs shadow-xs">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{displayName}</span>
                  <svg
                    className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
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

                {/* Dropdown Menu - Sleek SVGs, NO emojis */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2.5 w-64 rounded-3xl border border-[#793FFF]/20 bg-white p-3 shadow-2xl z-50">
                    <div className="border-b border-slate-100 p-3">
                      <p className="text-xs font-extrabold text-slate-900 truncate">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#793FFF]/10 p-2.5 text-xs font-bold text-[#793FFF]">
                        <span className="flex items-center gap-1.5">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                          </svg>
                          Reward Wallet
                        </span>
                        <span>{balance !== null ? `${balance} PTS` : '0 PTS'}</span>
                      </div>
                    </div>

                    <div className="py-2 space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#793FFF]/10 hover:text-[#793FFF] transition"
                      >
                        <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#793FFF]/10 hover:text-[#793FFF] transition"
                      >
                        <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 12 20 22 4 22 4 12" />
                          <rect x="2" y="7" width="20" height="5" />
                          <line x1="12" y1="22" x2="12" y2="7" />
                        </svg>
                        <span>Rewards Catalog</span>
                      </Link>
                      <Link
                        href="/faq"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span>FAQ & Help Desk</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-2">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      >
                        <svg className="h-4 w-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <Link
                href="/login"
                className="rounded-full px-5 py-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 hover:bg-slate-100/60"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#793FFF] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#793FFF]/25 transition-all duration-200 hover:bg-[#682FF8] hover:shadow-lg hover:shadow-[#793FFF]/35 active:scale-95"
              >
                <span>Start Earning</span>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-700 hover:bg-slate-100 focus:outline-none"
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

      {/* Mobile Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#793FFF]/15 bg-[#f7f4fd] px-4 pt-3 pb-6 shadow-xl" id="mobile-menu">
          {user ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white font-black text-sm">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900 text-sm">{displayName}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[170px]">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/rewards"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3 py-1 text-xs font-bold text-[#793FFF]"
                  >
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v10" />
                    </svg>
                    <span>{balance !== null ? `${balance} PTS` : '0 PTS'}</span>
                  </Link>
                </div>
              </div>

              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1.5">
                {loggedInNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white hover:text-slate-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="pt-2 border-t border-slate-200">
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
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
              {publicNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-white hover:text-slate-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700 hover:bg-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-[#793FFF] px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-[#793FFF]/20 hover:bg-[#682FF8]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Earning →
                </Link>
              </div>
            </nav>
          )}
        </div>
      )}
    </header>
  );
}
