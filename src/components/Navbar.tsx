'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#793FFF]/10 bg-[#f7f4fd]/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo - NO flash emoji */}
        <div className="flex items-center">
          <Link
            href="/"
            className="group flex items-center gap-3 text-xl font-extrabold tracking-tight text-slate-900"
            aria-label="Task Earn Home"
          >
            {/* Sleek Geometric Brand Icon */}
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50/80 px-4 py-1.5 rounded-full border border-slate-200/60 shadow-xs" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 hover:bg-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full px-5 py-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 hover:bg-slate-50"
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
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
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
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/login"
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50"
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
        </div>
      )}
    </header>
  );
}
