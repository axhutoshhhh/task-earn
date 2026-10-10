import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const links = {
    platform: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Speed Quizzes', href: '/dashboard/quiz' },
      { name: 'Watch YouTube Videos', href: '/dashboard/watch' },
      { name: 'Train AI to Earn', href: '/dashboard/train-ai' },
      { name: 'Play Games to Earn', href: '/dashboard/games' },
      { name: 'POV Video Bounties', href: '/dashboard/pov-videos' },
      { name: 'Rewards Catalog', href: '/dashboard/rewards' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Reward Rules', href: '/reward-rules' },
    ],
    support: [
      { name: 'Frequently Asked Questions', href: '/faq' },
      { name: 'Contact Us', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-12">
          {/* Brand & Mission Column */}
          <div className="space-y-6 xl:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-2xl font-black tracking-tight text-white transition hover:opacity-90"
              aria-label="Task Earn Home"
            >
              <span>taskearn</span>
              <span className="inline-block h-2 w-2 rounded-full bg-[#793FFF]" />
            </Link>

            <p className="text-sm leading-relaxed text-slate-400">
              The modern reward platform. Complete speed quizzes, watch YouTube videos, train AI models, play arcade games, and upload POV videos to earn instant digital gift cards.
            </p>

            <div className="rounded-xl bg-slate-900/90 p-4 border border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="font-bold text-slate-200 block">Security & Integrity</span>
              <p>
                All reward transactions are authenticated server-side and recorded in an auditable transaction ledger.
              </p>
            </div>
          </div>

          {/* Links Columns */}
          <nav className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-3 xl:mt-0" aria-label="Footer Navigation">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Ecosystem
              </h3>
              <ul className="mt-4 space-y-3">
                {links.platform.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Compliance & Legal
              </h3>
              <ul className="mt-4 space-y-3">
                {links.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Support
              </h3>
              <ul className="mt-4 space-y-3">
                {links.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Task Earn. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, Tailwind CSS & Supabase.</p>
        </div>
      </div>
    </footer>
  );
}
