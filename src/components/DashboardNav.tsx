'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Overview',
      href: '/dashboard',
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      name: 'Speed Quizzes',
      href: '/dashboard/quiz',
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      name: 'Watch to Earn',
      href: '/dashboard/watch',
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      ),
    },
    {
      name: 'Train AI',
      href: '/dashboard/train-ai',
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
        </svg>
      ),
    },
    {
      name: 'Play Games',
      href: '/dashboard/games',
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 12h4m-2-2v4" />
          <line x1="15" y1="11" x2="15.01" y2="11" />
          <line x1="18" y1="13" x2="18.01" y2="13" />
        </svg>
      ),
    },
    {
      name: 'POV Bounties',
      href: '/dashboard/pov-videos',
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
    },
    {
      name: 'Rewards Catalog',
      href: '/dashboard/rewards',
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="sticky top-20 z-40 bg-white/60 backdrop-blur-md py-3 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 transition-colors">
      <div className="mx-auto max-w-7xl">
        {/* Aesthetic Frosted Glass Pill Capsule */}
        <div className="w-fit mx-auto rounded-full bg-white/75 backdrop-blur-xl border border-white/90 p-1.5 shadow-lg shadow-[#793FFF]/5 overflow-x-auto no-scrollbar flex items-center gap-1">
          <nav
            className="flex items-center gap-1 text-xs font-bold"
            aria-label="Dashboard Earning Channels"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#161616] text-white shadow-md shadow-slate-900/20'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                  }`}
                >
                  <span className={isActive ? 'text-[#B5FF24]' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
