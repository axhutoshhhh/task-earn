'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const footerSections = {
    earn: [
      { name: 'Get paid to train AI', href: '/dashboard/train-ai' },
      { name: 'Get paid for POV videos', href: '/dashboard/pov-videos' },
      { name: 'Get paid to watch ads', href: '/dashboard/watch' },
      { name: 'Get paid to take surveys', href: '/dashboard/surveys' },
      { name: 'Get paid to solve quizzes', href: '/dashboard/quiz' },
      { name: 'Get paid to play games', href: '/dashboard/games' },
      { name: 'Complete microtasks', href: '/dashboard/tasks' },
    ],
    makeMoney: [
      { name: 'Earn money online', href: '/#features' },
      { name: 'Earning app', href: '/register' },
      { name: 'Rewards catalog', href: '/dashboard/rewards' },
      { name: 'Daily streaks & bonus', href: '/dashboard' },
      { name: 'Referral program', href: '/register' },
    ],
    payouts: [
      { name: 'All payout methods', href: '/dashboard/rewards' },
      { name: 'Instant UPI cash', href: '/dashboard/rewards' },
      { name: 'Paytm cash', href: '/dashboard/rewards' },
      { name: 'Amazon gift cards', href: '/dashboard/rewards' },
      { name: 'Flipkart gift cards', href: '/dashboard/rewards' },
      { name: 'Starbucks vouchers', href: '/dashboard/rewards' },
      { name: 'Google Play vouchers', href: '/dashboard/rewards' },
    ],
    about: [
      { name: 'What is Task Earn', href: '/faq' },
      { name: 'How does it work', href: '/#features' },
      { name: 'Is Task Earn legit', href: '/terms' },
      { name: 'Reward rules', href: '/reward-rules' },
      { name: 'Security & ledger', href: '/privacy' },
    ],
    explore: [
      { name: 'Help centre', href: '/faq' },
      { name: 'Contact us', href: '/contact' },
      { name: 'Terms of service', href: '/terms' },
      { name: 'Privacy policy', href: '/privacy' },
    ],
  };

  return (
    <footer className="w-full bg-black text-white pt-16 sm:pt-20 pb-12 border-t border-zinc-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* =========================================================================
            TOP SECTION: 5 Categorized Link Columns (Exact JumpTask Format)
            ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-10 pb-16 sm:pb-20 border-b border-zinc-900/80">
          {/* 1. EARN */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Earn
            </h3>
            <ul className="space-y-3">
              {footerSections.earn.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. MAKE MONEY */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Make Money
            </h3>
            <ul className="space-y-3">
              {footerSections.makeMoney.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. PAYOUTS */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Payouts
            </h3>
            <ul className="space-y-3">
              {footerSections.payouts.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. ABOUT */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              About
            </h3>
            <ul className="space-y-3">
              {footerSections.about.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. EXPLORE */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerSections.explore.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* =========================================================================
            MIDDLE SECTION: Brand Description on Left, Google Play Badge on Right
            ========================================================================= */}
        <div className="py-12 sm:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand & Description */}
          <div className="max-w-lg space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-2xl font-black tracking-tight text-white hover:opacity-90 transition-opacity"
              aria-label="Task Earn Home"
            >
              <span>taskearn</span>
              <span className="inline-block h-2 w-2 rounded-full bg-[#793FFF]" />
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-normal">
              Complete simple online tasks from your phone or from home and receive payouts for your time, all in one easy to use platform.
            </p>
          </div>

          {/* Google Play App Badge */}
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[11px] font-semibold text-zinc-300 mb-2 uppercase tracking-wider">
              Get the app
            </span>
            <Link
              href="/register"
              className="inline-block transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Get Task Earn on Google Play"
            >
              <img
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                className="h-10 sm:h-11 w-auto object-contain block"
              />
            </Link>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM BAR: Copyright & Legal Links on Left, Social Media Icons on Right
            ========================================================================= */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          {/* Copyright & Legal Links */}
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()}, Task Earn.{' '}
            <Link
              href="/terms"
              className="text-zinc-400 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            {' '}&amp;{' '}
            <Link
              href="/privacy"
              className="text-zinc-400 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy policy
            </Link>
            .
          </p>

          {/* Minimalist Social Media Icons */}
          <div className="flex items-center gap-5 text-zinc-400">
            {/* 1. X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Task Earn on X"
              className="hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* 2. Discord */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Task Earn Discord"
              className="hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>

            {/* 3. Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Task Earn on Facebook"
              className="hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* 4. Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Task Earn on Instagram"
              className="hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* 5. Telegram */}
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Task Earn on Telegram"
              className="hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </a>

            {/* 6. YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to Task Earn on YouTube"
              className="hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
