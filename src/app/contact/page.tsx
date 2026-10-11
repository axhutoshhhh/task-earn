'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Platform Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'General Platform Inquiry',
        message: '',
      });
    }, 1100);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent py-10 sm:py-16 px-4 sm:px-6 lg:px-8 text-slate-900 selection:bg-[#793FFF]/20 selection:text-[#793FFF]">
      {/* =========================================================================
          GLASS ARCHITECTURE: SIDE DECORATIONS (Frames the empty sides with 3D art)
          ========================================================================= */}
      {/* LEFT SIDE: Floating Glass Sculptures & Prisms (Desktop View) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-24 bottom-0 w-48 xl:w-64 z-0 hidden lg:flex flex-col justify-around select-none"
      >
        <svg viewBox="0 0 260 620" className="w-full h-auto drop-shadow-2xl overflow-visible" fill="none">
          <defs>
            <linearGradient id="glassLeftGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#E0E7FF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="glassLeftRim1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="glassLeftOrbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Background Ambient Soft Violet Flare */}
          <circle cx="120" cy="220" r="110" fill="#7C3AED" opacity="0.08" style={{ filter: 'blur(35px)' }} />

          {/* 1. Floating Tilted Glass Architectural Slab */}
          <g transform="translate(35, 60) rotate(-10 90 110)">
            {/* Slab ambient shadow */}
            <rect x="0" y="0" width="150" height="210" rx="36" fill="#4338CA" opacity="0.06" style={{ filter: 'blur(16px)' }} />
            {/* Glass Face */}
            <rect
              x="0"
              y="0"
              width="150"
              height="210"
              rx="36"
              fill="url(#glassLeftGrad1)"
              stroke="url(#glassLeftRim1)"
              strokeWidth="2.5"
            />
            {/* Specular Diagonal Sheen */}
            <path d="M 0 35 L 150 110 L 150 150 L 0 75 Z" fill="white" opacity="0.3" />
            {/* Architectural concentric grid rings */}
            <circle cx="75" cy="105" r="42" stroke="white" strokeWidth="2" strokeDasharray="6 6" opacity="0.55" />
            <circle cx="75" cy="105" r="22" stroke="white" strokeWidth="1.5" opacity="0.4" />
          </g>

          {/* 2. Floating Frosted Glass Orb */}
          <g transform="translate(60, 370)">
            <ellipse cx="50" cy="65" rx="42" ry="14" fill="#4338CA" opacity="0.1" style={{ filter: 'blur(10px)' }} />
            <circle cx="50" cy="50" r="44" fill="url(#glassLeftOrbGrad)" stroke="white" strokeWidth="2.5" />
            <ellipse cx="38" cy="35" rx="18" ry="10" fill="white" opacity="0.65" transform="rotate(-30 38 35)" />
          </g>

          {/* 3. Floating Neon Sparkle Beacons */}
          <g transform="translate(180, 40)">
            <circle cx="10" cy="10" r="3.5" fill="#8B5CF6" />
            <line x1="10" y1="0" x2="10" y2="20" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g transform="translate(40, 520)">
            <circle cx="8" cy="8" r="3" fill="#38BDF8" />
            <line x1="8" y1="0" x2="8" y2="16" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="8" x2="16" y2="8" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* RIGHT SIDE: Floating Glass Sculptures & Prisms (Desktop View) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-24 bottom-0 w-48 xl:w-64 z-0 hidden lg:flex flex-col justify-around items-end select-none"
      >
        <svg viewBox="0 0 260 620" className="w-full h-auto drop-shadow-2xl overflow-visible" fill="none">
          <defs>
            <linearGradient id="glassRightGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#A7F3D0" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="glassRightRim1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="glassRightDiamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FDE047" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Background Ambient Soft Emerald/Teal Flare */}
          <circle cx="140" cy="240" r="110" fill="#059669" opacity="0.08" style={{ filter: 'blur(35px)' }} />

          {/* 1. Floating Tilted Glass Pill Architecture */}
          <g transform="translate(60, 70) rotate(12 80 110)">
            {/* Pill ambient shadow */}
            <rect x="0" y="0" width="140" height="220" rx="42" fill="#047857" opacity="0.06" style={{ filter: 'blur(16px)' }} />
            {/* Glass Face */}
            <rect
              x="0"
              y="0"
              width="140"
              height="220"
              rx="42"
              fill="url(#glassRightGrad1)"
              stroke="url(#glassRightRim1)"
              strokeWidth="2.5"
            />
            {/* Specular Diagonal Sheen */}
            <path d="M 0 40 L 140 120 L 140 160 L 0 80 Z" fill="white" opacity="0.3" />
          </g>

          {/* 2. Floating 3D Frosted Glass Diamond Prism */}
          <g transform="translate(70, 380)">
            <ellipse cx="50" cy="70" rx="38" ry="12" fill="#D97706" opacity="0.1" style={{ filter: 'blur(10px)' }} />
            <polygon
              points="50,12 88,50 50,88 12,50"
              fill="url(#glassRightDiamondGrad)"
              stroke="white"
              strokeWidth="2.5"
            />
            <line x1="50" y1="12" x2="50" y2="88" stroke="white" strokeWidth="1.5" opacity="0.6" />
            <line x1="12" y1="50" x2="88" y2="50" stroke="white" strokeWidth="1.5" opacity="0.6" />
          </g>

          {/* 3. Floating Neon Star Beacons */}
          <g transform="translate(50, 40)">
            <circle cx="10" cy="10" r="3.5" fill="#10B981" />
            <line x1="10" y1="0" x2="10" y2="20" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g transform="translate(190, 500)">
            <circle cx="8" cy="8" r="3" fill="#F59E0B" />
            <line x1="8" y1="0" x2="8" y2="16" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="8" x2="16" y2="8" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* =========================================================================
          CENTRAL CONTENT CONTAINER (Pure authentic information with glass architecture)
          ========================================================================= */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-10 sm:space-y-12">
        {/* Navigation & Live Active Status */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Home
          </Link>
          <span className="rounded-full bg-white/80 backdrop-blur-md border border-white/80 px-4 py-1.5 text-xs font-bold text-slate-800 shadow-xs flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Support Active 24/7</span>
          </span>
        </div>

        {/* Heading Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
            Get in Touch with Us
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Have questions about your rewards, partner inquiries, or need account assistance? We are here to help.
          </p>
        </div>

        {/* Contact Info Cards Grid (Glass Architecture) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Direct Email */}
          <div className="group relative rounded-[32px] border border-white/80 bg-white/75 backdrop-blur-2xl p-7 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_1px_3px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_25px_60px_rgba(121,63,255,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top glass gloss sheen */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-violet-400/10 blur-2xl group-hover:scale-125 transition-transform" />

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25 transition-transform duration-200 group-hover:scale-105">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Direct Email</h3>
              <p className="mt-1 text-xs text-slate-500 font-normal">Official support and business desk</p>
              <a
                href="mailto:axhutoshhhh@gmail.com"
                className="mt-3 block text-sm font-bold text-[#793FFF] hover:underline break-all"
              >
                axhutoshhhh@gmail.com
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400">Response &lt; 24h</span>
              <button
                type="button"
                onClick={() => copyToClipboard('axhutoshhhh@gmail.com', 'email')}
                className="rounded-full bg-slate-100/90 border border-slate-200/60 px-3.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                {copiedType === 'email' ? 'Copied' : 'Copy Email'}
              </button>
            </div>
          </div>

          {/* Card 2: Direct Phone Support */}
          <div className="group relative rounded-[32px] border border-white/80 bg-white/75 backdrop-blur-2xl p-7 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_1px_3px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-emerald-400/10 blur-2xl group-hover:scale-125 transition-transform" />

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 transition-transform duration-200 group-hover:scale-105">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Direct Phone Support</h3>
              <p className="mt-1 text-xs text-slate-500 font-normal">Call or message for urgent queries</p>
              <a
                href="tel:8302072636"
                className="mt-3 block text-base font-bold text-slate-900 hover:text-[#793FFF] transition"
              >
                +91 8302072636
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400">Direct Line</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard('8302072636', 'phone')}
                  className="rounded-full bg-slate-100/90 border border-slate-200/60 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  {copiedType === 'phone' ? 'Copied' : 'Copy'}
                </button>
                <a
                  href="tel:8302072636"
                  className="rounded-full bg-[#793FFF] px-3.5 py-1 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-xs"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Fast Resolution */}
          <div className="group relative rounded-[32px] border border-white/80 bg-white/75 backdrop-blur-2xl p-7 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_1px_3px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_25px_60px_rgba(56,189,248,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between sm:col-span-2 lg:col-span-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-sky-400/10 blur-2xl group-hover:scale-125 transition-transform" />

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 transition-transform duration-200 group-hover:scale-105">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Fast Resolution</h3>
              <p className="mt-1 text-xs text-slate-500 font-normal">Dedicated assistance for users</p>
              <div className="mt-3 space-y-1.5 text-xs text-slate-600 font-normal">
                <p>• <strong>Voucher Inquiries:</strong> Immediate audit</p>
                <p>• <strong>Account Issues:</strong> Same-day review</p>
                <p>• <strong>Partnerships:</strong> Custom integration support</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100/80">
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Dedicated Lead Representative
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Contact Form (Glass Architecture) */}
        <div className="relative rounded-[36px] border border-white/80 bg-white/75 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_25px_60px_rgba(15,23,42,0.06),0_1px_3px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.9)] overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl" />

          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Send Us a Direct Message</h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal">
                Fill in the details below and our team will get back to you directly at your email address.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-3xl bg-emerald-50/90 border border-emerald-200/80 p-8 text-center space-y-3 shadow-xs">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-xs">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Message Delivered Successfully!</h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto font-normal">
                  Thank you for reaching out. We have logged your submission and will get back to you shortly via{' '}
                  <strong>axhutoshhhh@gmail.com</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full bg-[#793FFF] px-7 py-2.5 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/10 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
                      placeholder="e.g. Ashutosh Raj"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/10 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/10 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 cursor-pointer"
                  >
                    <option value="General Platform Inquiry">General Platform Inquiry</option>
                    <option value="Voucher & Payout Audit">Voucher &amp; Payout Audit</option>
                    <option value="Account & Authentication">Account &amp; Authentication</option>
                    <option value="Partnerships & Business">Partnerships &amp; Business</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/10 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400 resize-none"
                    placeholder="Describe your inquiry or question in detail..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#161616] hover:bg-[#793FFF] py-4 text-sm font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Direct Message</span>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
