import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const links = {
    platform: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Quizzes', href: '/dashboard/quiz' },
      { name: 'Rewards', href: '/dashboard/rewards' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Reward Rules', href: '/reward-rules' },
    ],
    support: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Branding & Tagline */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white" aria-label="Task Earn Home">
              <span aria-hidden="true">⚡</span> Task Earn
            </Link>
            <p className="text-sm leading-6 text-gray-400">
              Earn demo rewards by completing quizzes.
            </p>
            <div className="rounded-md bg-gray-800 p-4 border border-gray-700">
              <p className="text-xs font-medium text-gray-400">
                <strong className="text-white">Disclaimer:</strong> Task Earn is currently in demo mode. All points and rewards are simulated and have no real-world value.
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0" aria-label="Footer Navigation">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Platform</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {links.platform.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {links.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {links.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2024 Task Earn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
