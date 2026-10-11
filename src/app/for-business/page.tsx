'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type ServiceKey = 'ai' | 'video' | 'tasks' | 'growth';

interface ServiceDetail {
  id: ServiceKey;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  accentGradient: string;
  accentColor: string;
  description: string;
  features: string[];
  metrics: { label: string; value: string }[];
  throughput: string;
  turnaround: string;
  exportFormat: string;
}

const SERVICES: Record<ServiceKey, ServiceDetail> = {
  ai: {
    id: 'ai',
    title: 'AI Training & RLHF Alignment',
    tagline: 'High-accuracy human feedback, data annotation, and model safety evaluations.',
    badge: 'RLHF & SFT',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200/80',
    accentGradient: 'from-violet-600 via-fuchsia-600 to-indigo-600',
    accentColor: '#793FFF',
    description:
      'Train foundation models, conversational agents, and vision systems with verified human intelligence. Our distributed workforce annotates edge cases, ranks model responses with multi-turn preference ratings, and flags safety violations.',
    features: [
      'Pairwise LLM response comparison & ranking',
      'Safety red-teaming, toxicity detection & bias auditing',
      'Bounding box, polygon & keypoint image/video annotation',
      'Domain-specific prompt engineering & synthetic generation',
    ],
    metrics: [
      { label: 'Consensus Rate', value: '99.8%' },
      { label: 'Quality Verification', value: '3-Tier Human Audit' },
      { label: 'Average SLA', value: '< 18 Hours' },
    ],
    throughput: '25,000+ annotations / day',
    turnaround: '12 - 24 Hours',
    exportFormat: 'JSONL, Hugging Face, Parquet, CSV',
  },
  video: {
    id: 'video',
    title: 'Video Distribution & Creator POV',
    tagline: 'High-velocity engagement, real watch-time delivery, and crowdsourced footage.',
    badge: 'Engagement & Media',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/80',
    accentGradient: 'from-rose-500 via-pink-500 to-orange-500',
    accentColor: '#F43F5E',
    description:
      'Supercharge your video marketing and content training datasets. Distribute brand videos to authentic human viewers with guaranteed retention, or crowdsource first-person mobile POV video clips for computer vision training.',
    features: [
      'Guaranteed watch duration with real-time attention tracking',
      'Crowdsourced real-world POV video capture from 50+ countries',
      'High-retention social distribution and trailer view velocity',
      'Authentic human feedback and sentiment polling',
    ],
    metrics: [
      { label: 'Retention Rate', value: '94.2%' },
      { label: 'Unique Devices', value: '100% Genuine' },
      { label: 'Fraud Detection', value: 'Zero Bot Guarantee' },
    ],
    throughput: '60,000+ completed views / day',
    turnaround: '4 - 12 Hours',
    exportFormat: 'Raw MP4, Video URL Registry, Analytics CSV',
  },
  tasks: {
    id: 'tasks',
    title: 'Brand Micro-Tasks & QA Testing',
    tagline: 'Massive parallel execution of web testing, surveys, and product trials.',
    badge: 'Micro-Operations',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    accentGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    accentColor: '#10B981',
    description:
      'Eliminate manual operational bottlenecks by breaking large digital workflows into millions of parallel micro-tasks. Collect market research, perform localized QA tests on multiple device types, and audit local store listings.',
    features: [
      'Multi-device and cross-OS manual QA test runs',
      'Targeted demographic surveys with fraud verification',
      'Local search audit, store listings & price checks',
      'Data collection, receipt scanning & web scraping validation',
    ],
    metrics: [
      { label: 'Worker Availability', value: '35,000+ Active' },
      { label: 'Duplicate Prevention', value: 'Hardware Fingerprint' },
      { label: 'Validation Pass', value: '99.4%' },
    ],
    throughput: '80,000+ micro-tasks / day',
    turnaround: '< 8 Hours',
    exportFormat: 'REST API, Webhook, S3 Bucket, CSV',
  },
  growth: {
    id: 'growth',
    title: 'Targeted User Acquisition & Installs',
    tagline: 'High-intent app downloads, verified sign-ups, and engagement milestones.',
    badge: 'Performance Growth',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
    accentGradient: 'from-blue-600 via-indigo-600 to-sky-500',
    accentColor: '#2563EB',
    description:
      'Acquire verified real-world users who interact with your digital products. Structure milestone-based rewards where contributors explore your onboarding, test core features, and reach engagement levels with zero bot risk.',
    features: [
      'Tiered milestone validation (Install -> Signup -> Level 5)',
      'Clean post-install retention with organic behavior',
      'Targeting by region, device brand, and language',
      'Affiliate & partner tracking with instant ledger verification',
    ],
    metrics: [
      { label: 'Real Human Verification', value: '100%' },
      { label: 'Fraud Detection Rate', value: '99.9%' },
      { label: 'Cost Per Action', value: 'Optimized ROAS' },
    ],
    throughput: '15,000+ acquisitions / day',
    turnaround: 'Continuous Scale',
    exportFormat: 'AppsFlyer, Adjust, Branch, Custom Webhook',
  },
};

export default function ForBusinessPage() {
  const [activeService, setActiveService] = useState<ServiceKey>('ai');
  const [taskVolume, setTaskVolume] = useState<number>(10000);
  const [selectedSolution, setSelectedSolution] = useState<string>('AI Training & RLHF');
  const [selectedBudget, setSelectedBudget] = useState<string>('₹50k - ₹2L');

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const currentService = SERVICES[activeService];

  // Calculate dynamic turnaround and SLA estimate based on volume slider
  const getEstimatedHours = (volume: number) => {
    if (volume <= 2000) return '4 - 6 Hours';
    if (volume <= 10000) return '12 - 18 Hours';
    if (volume <= 25000) return '24 - 36 Hours';
    return '48 Hours (Phased Stream)';
  };

  const getEstimatedAccuracy = (volume: number) => {
    if (volume > 20000) return '99.9% (Multi-Layer Consensus)';
    return '99.6% (Automated + Lead Review)';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        requirements: '',
      });
    }, 1100);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="relative min-h-screen bg-transparent py-10 sm:py-16 px-4 sm:px-6 lg:px-8 text-slate-900 selection:bg-[#793FFF]/20 selection:text-[#793FFF]">
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* =========================================================================
            1. HERO SECTION WITH 3D ART & DUAL CTAS
            ========================================================================= */}
        <section className="relative">
          {/* Breadcrumb & Live Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#793FFF] transition-colors"
            >
              <span>← Back to Task Earn</span>
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-slate-200/80 px-3.5 py-1 text-xs font-bold text-slate-800 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Enterprise Partner Desk Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#793FFF]">
                <span>Enterprise &amp; Advertisers</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight text-slate-950 leading-[1.05]">
                Scale your business with 35,000+ verified humans
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
                Deploy high-accuracy RLHF data labeling, programmatic video distribution, user acquisition bounties, and micro-task surveys with guaranteed quality and anti-bot verification.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#161616] hover:bg-[#793FFF] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Request Custom Proposal</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#solutions"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 hover:bg-white px-7 py-4 text-sm font-bold text-slate-800 shadow-xs transition-all duration-200 hover:border-slate-400 cursor-pointer"
                >
                  <span>Explore Solutions</span>
                </a>
              </div>

              {/* Trust Subtext */}
              <div className="pt-2 flex items-center gap-6 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>99.6% Human Quality Consensus</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>API &amp; Webhook Integration</span>
                </span>
              </div>
            </div>

            {/* Right Column: 3D Isometric Enterprise Art Graphic */}
            <div className="lg:col-span-5 flex justify-center items-center select-none">
              <div className="relative w-full max-w-[460px] aspect-[4/3] flex items-center justify-center">
                {/* Multi-Spectrum Ambient Glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-violet-500/25 via-sky-400/20 to-emerald-400/20 rounded-full blur-3xl -z-10" />

                {/* 3D Isometric Enterprise Technology Hub Art */}
                <svg
                  viewBox="0 0 540 440"
                  className="w-full h-full drop-shadow-2xl overflow-visible select-none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="bizBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E1B4B" />
                      <stop offset="50%" stopColor="#312E81" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>

                    <linearGradient id="bizGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#C084FC" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.7" />
                    </linearGradient>

                    <linearGradient id="bizGoldPebble" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDE047" />
                      <stop offset="60%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>

                    <linearGradient id="bizEmeraldBar" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>

                    <linearGradient id="bizVioletBar" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#C084FC" />
                    </linearGradient>

                    <linearGradient id="bizCyanBar" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                  </defs>

                  {/* Ambient Levitation Shadow */}
                  <ellipse cx="270" cy="380" rx="200" ry="40" fill="#1E1B4B" opacity="0.22" style={{ filter: 'blur(20px)' }} />

                  {/* ================= 1. BASE ISOMETRIC MONOLITH SLAB ================= */}
                  <g transform="translate(0, 30)">
                    {/* Extruded Side Bottom */}
                    <path
                      d="M 90 260 L 270 345 L 450 260 L 450 285 L 270 370 L 90 285 Z"
                      fill="#0F172A"
                    />
                    {/* Monolith Top Face */}
                    <path
                      d="M 90 260 L 270 175 L 450 260 L 270 345 Z"
                      fill="url(#bizBaseGrad)"
                      stroke="#4338CA"
                      strokeWidth="2"
                    />

                    {/* Isometric Grid Coordinates on Monolith */}
                    <path
                      d="M 150 232 L 330 317 M 210 203 L 390 288 M 180 303 L 360 218 M 270 345 L 270 175"
                      stroke="#6366F1"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                      opacity="0.45"
                    />
                  </g>

                  {/* ================= 2. FLOATING FROSTED GLASS ANALYTICS PLATFORM ================= */}
                  <g transform="translate(0, -25)">
                    {/* Platform Extruded Edge */}
                    <path
                      d="M 140 220 L 270 280 L 400 220 L 400 232 L 270 292 L 140 232 Z"
                      fill="#4338CA"
                      opacity="0.9"
                    />
                    {/* Glass Surface */}
                    <path
                      d="M 140 220 L 270 160 L 400 220 L 270 280 Z"
                      fill="url(#bizGlassGrad)"
                      stroke="white"
                      strokeWidth="2"
                    />
                    {/* Specular White Gloss Edge */}
                    <path
                      d="M 140 220 L 270 160 L 300 174 L 170 234 Z"
                      fill="white"
                      opacity="0.3"
                    />

                    {/* 3D Holographic Bar Charts on Glass Platform */}
                    {/* Bar 1 (Emerald - High RLHF) */}
                    <g transform="translate(190, 160)">
                      <path d="M 10 35 L 25 42 L 25 15 L 10 8 Z" fill="#047857" />
                      <path d="M 25 42 L 40 35 L 40 8 L 25 15 Z" fill="#059669" />
                      <path d="M 10 8 L 25 1 L 40 8 L 25 15 Z" fill="#34D399" />
                    </g>

                    {/* Bar 2 (Cyan - Speed) */}
                    <g transform="translate(230, 130)">
                      <path d="M 10 65 L 25 72 L 25 20 L 10 13 Z" fill="#0369A1" />
                      <path d="M 25 72 L 40 65 L 40 13 L 25 20 Z" fill="#0284C7" />
                      <path d="M 10 13 L 25 6 L 40 13 L 25 20 Z" fill="#38BDF8" />
                    </g>

                    {/* Bar 3 (Violet - Human Consensus) */}
                    <g transform="translate(270, 100)">
                      <path d="M 10 95 L 25 102 L 25 20 L 10 13 Z" fill="#6D28D9" />
                      <path d="M 25 102 L 40 95 L 40 13 L 25 20 Z" fill="#7C3AED" />
                      <path d="M 10 13 L 25 6 L 40 13 L 25 20 Z" fill="#C084FC" />
                    </g>

                    {/* Floating Hologram Arrow Pointer */}
                    <polygon
                      points="330,110 355,100 345,125"
                      fill="#F43F5E"
                      style={{ filter: 'drop-shadow(0 4px 8px rgba(244,63,94,0.4))' }}
                    />
                  </g>

                  {/* ================= 3. FLOATING 3D GOLDEN REWARD COIN ================= */}
                  <g transform="translate(380, 80)">
                    {/* Coin Ambient Shadow */}
                    <ellipse cx="25" cy="85" rx="30" ry="12" fill="#D97706" opacity="0.3" style={{ filter: 'blur(10px)' }} />
                    {/* 3D Rim */}
                    <path
                      d="M 5 25 C 5 0, 45 0, 45 25 L 45 36 C 45 61, 5 61, 5 36 Z"
                      fill="#B45309"
                    />
                    {/* Face */}
                    <ellipse cx="25" cy="25" rx="20" ry="32" fill="url(#bizGoldPebble)" stroke="white" strokeWidth="1.5" />
                    {/* Inner Star */}
                    <polygon
                      points="25,14 28,21 35,22 30,27 31,34 25,30 19,34 20,27 15,22 22,21"
                      fill="white"
                      opacity="0.95"
                    />
                  </g>

                  {/* ================= 4. FLOATING 3D NEON TECH CUBE (LEFT) ================= */}
                  <g transform="translate(70, 120)">
                    {/* Top Face */}
                    <polygon points="40,20 65,32 40,44 15,32" fill="#38BDF8" />
                    {/* Left Face */}
                    <polygon points="15,32 40,44 40,75 15,63" fill="#0284C7" />
                    {/* Right Face */}
                    <polygon points="40,44 65,32 65,63 40,75" fill="#0369A1" />
                    {/* Glow outline */}
                    <polygon
                      points="40,20 65,32 65,63 40,75 15,63 15,32"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                  </g>

                  {/* ================= 5. TWO SHINING NEON STAR ORBS ================= */}
                  <g transform="translate(100, 50)">
                    <circle cx="12" cy="12" r="5" fill="#C5FF5A" />
                    <line x1="12" y1="0" x2="12" y2="24" stroke="#C5FF5A" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="0" y1="12" x2="24" y2="12" stroke="#C5FF5A" strokeWidth="2.5" strokeLinecap="round" />
                  </g>

                  <g transform="translate(450, 240)">
                    <circle cx="10" cy="10" r="4" fill="#E879F9" />
                    <line x1="10" y1="0" x2="10" y2="20" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" />
                    <line x1="0" y1="10" x2="20" y2="10" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. VIBRANT COLORFUL FIGURES & METRICS GRID (As requested by user)
            ========================================================================= */}
        <section className="relative">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#793FFF] mb-2">
              Enterprise Scale &amp; Performance
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              Numbers that power modern AI &amp; growth campaigns
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Figure 1: 35,000+ */}
            <div className="group relative rounded-3xl border border-violet-200/80 bg-white/90 backdrop-blur-md p-7 shadow-lg shadow-violet-500/5 hover:shadow-xl hover:border-violet-300 transition-all duration-300 overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-violet-400/15 blur-2xl group-hover:scale-125 transition-transform" />
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-violet-100 border border-violet-200 px-2.5 py-0.5 text-[10px] font-black uppercase text-violet-700">
                  Global Reach
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
                35,000+
              </h3>
              <p className="mt-2 text-sm font-bold text-violet-900">
                Active Human Solvers
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
                Distributed across mobile &amp; desktop with hardware device validation.
              </p>
            </div>

            {/* Figure 2: 99.6% */}
            <div className="group relative rounded-3xl border border-emerald-200/80 bg-white/90 backdrop-blur-md p-7 shadow-lg shadow-emerald-500/5 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-emerald-400/15 blur-2xl group-hover:scale-125 transition-transform" />
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-800">
                  Precision
                </span>
                <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
                99.6%
              </h3>
              <p className="mt-2 text-sm font-bold text-emerald-900">
                Human Quality Accuracy
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
                Multi-pass consensus auditing with zero automated bot tolerance.
              </p>
            </div>

            {/* Figure 3: < 15 Mins */}
            <div className="group relative rounded-3xl border border-amber-200/80 bg-white/90 backdrop-blur-md p-7 shadow-lg shadow-amber-500/5 hover:shadow-xl hover:border-amber-300 transition-all duration-300 overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-amber-400/15 blur-2xl group-hover:scale-125 transition-transform" />
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[10px] font-black uppercase text-amber-800">
                  Rapid Launch
                </span>
                <svg className="h-4 w-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
                &lt; 15 Mins
              </h3>
              <p className="mt-2 text-sm font-bold text-amber-900">
                Campaign Launch SLA
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
                Submit tasks and initiate live worker allocation in under a quarter hour.
              </p>
            </div>

            {/* Figure 4: Zero Hidden Fees */}
            <div className="group relative rounded-3xl border border-rose-200/80 bg-white/90 backdrop-blur-md p-7 shadow-lg shadow-rose-500/5 hover:shadow-xl hover:border-rose-300 transition-all duration-300 overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-rose-400/15 blur-2xl group-hover:scale-125 transition-transform" />
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-rose-100 border border-rose-200 px-2.5 py-0.5 text-[10px] font-black uppercase text-rose-800">
                  Transparent
                </span>
                <span className="text-[11px] font-black text-rose-700">₹0 Setup</span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
                ₹0 Setup
              </h3>
              <p className="mt-2 text-sm font-bold text-rose-900">
                Zero Platform Retainers
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
                Pay strictly for approved, quality-verified deliverables. No lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. INTERACTIVE SERVICE SOLUTIONS & LIVE ESTIMATOR (Interactive Tab Hub)
            ========================================================================= */}
        <section id="solutions" className="relative space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#793FFF] mb-2">
              Interactive Enterprise Solutions
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              Select your campaign objective
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Switch through our core solutions to view live throughput, delivery specs, and quality frameworks.
            </p>
          </div>

          {/* Interactive Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(
              [
                { key: 'ai', label: 'AI Training & RLHF', badge: 'Model Ops' },
                { key: 'video', label: 'Video & POV Content', badge: 'Distribution' },
                { key: 'tasks', label: 'Micro-Tasks & QA', badge: 'Parallel Ops' },
                { key: 'growth', label: 'User Growth & Installs', badge: 'Acquisition' },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveService(item.key)}
                className={`flex items-center gap-2 rounded-full px-5 py-3 text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                  activeService === item.key
                    ? 'bg-[#161616] text-white shadow-xl scale-105 ring-2 ring-[#793FFF]/30'
                    : 'bg-white/90 text-slate-700 border border-slate-200/90 hover:bg-white hover:border-slate-300'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                    activeService === item.key
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Active Solution Deep-Dive Card */}
          <div className="rounded-[36px] border border-slate-200/90 bg-white/95 backdrop-blur-xl p-8 sm:p-12 shadow-2xl shadow-slate-900/5 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Solution Detail & Deliverables */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${currentService.badgeColor}`}
                  >
                    {currentService.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Turnaround: {currentService.turnaround}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
                  {currentService.title}
                </h3>

                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  {currentService.description}
                </p>

                {/* Key Deliverables Checkmarks */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Enterprise Capabilities Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentService.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 rounded-2xl bg-slate-50/80 p-3 border border-slate-100"
                      >
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-slate-700 leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Output & Integration Specs */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                  <div>
                    <span className="block font-bold text-slate-400 text-[10px] uppercase">
                      Daily Throughput
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs">
                      {currentService.throughput}
                    </span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-400 text-[10px] uppercase">
                      Export Formats
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs">
                      {currentService.exportFormat}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Volume Estimator Calculator */}
              <div className="lg:col-span-5 rounded-3xl bg-slate-900 text-white p-7 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#793FFF]/30 blur-3xl" />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Live Campaign Estimator
                  </span>
                  <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold">
                    Interactive
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-300">Target Task Volume</span>
                    <span className="text-xl font-black text-white">
                      {taskVolume.toLocaleString()} units
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={50000}
                    step={1000}
                    value={taskVolume}
                    onChange={(e) => setTaskVolume(Number(e.target.value))}
                    className="w-full accent-[#793FFF] cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1,000</span>
                    <span>10,000</span>
                    <span>25,000</span>
                    <span>50,000+</span>
                  </div>
                </div>

                {/* Dynamic Calculated Outputs */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between rounded-2xl bg-white/10 p-3.5 border border-white/10">
                    <span className="text-xs text-slate-300">Estimated Delivery Time</span>
                    <span className="text-xs font-black text-emerald-400">
                      {getEstimatedHours(taskVolume)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white/10 p-3.5 border border-white/10">
                    <span className="text-xs text-slate-300">Consensus Assurance</span>
                    <span className="text-xs font-black text-sky-400">
                      {getEstimatedAccuracy(taskVolume)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white/10 p-3.5 border border-white/10">
                    <span className="text-xs text-slate-300">Integration Support</span>
                    <span className="text-xs font-black text-amber-300">
                      Dedicated Lead Architect
                    </span>
                  </div>
                </div>

                <a
                  href="#contact-form"
                  onClick={() => setSelectedSolution(currentService.title)}
                  className="block w-full text-center rounded-2xl bg-gradient-to-r from-[#793FFF] to-[#9333EA] py-3.5 text-xs font-black uppercase tracking-wider text-white hover:opacity-90 transition shadow-lg shadow-purple-900/30 cursor-pointer"
                >
                  Quote for {taskVolume.toLocaleString()} {currentService.badge} Units →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. INTERACTIVE ENTERPRISE INQUIRY FORM & DIRECT CHANNELS
            ========================================================================= */}
        <section id="contact-form" className="relative space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#793FFF] mb-2">
              Direct Enterprise Desk
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              Launch your campaign with our team
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Submit your requirements below or reach our business directors directly via phone or email. Guaranteed turnaround under 2 hours.
            </p>
          </div>

          {/* Fast Connect Channels (Direct Email & Phone) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Email Channel */}
            <div className="rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-[#793FFF]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h4 className="mt-4 text-base font-extrabold text-slate-900">Enterprise Email</h4>
                <p className="mt-0.5 text-xs text-slate-500">Official proposals &amp; RFP desk</p>
                <a
                  href="mailto:axhutoshhhh@gmail.com"
                  className="mt-2 block text-sm font-black text-[#793FFF] hover:underline break-all"
                >
                  axhutoshhhh@gmail.com
                </a>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">&lt; 2h SLA</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('axhutoshhhh@gmail.com', 'email')}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  {copiedType === 'email' ? 'Copied' : 'Copy Email'}
                </button>
              </div>
            </div>

            {/* Direct Phone Channel */}
            <div className="rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h4 className="mt-4 text-base font-extrabold text-slate-900">Direct Partner Hotline</h4>
                <p className="mt-0.5 text-xs text-slate-500">Call or WhatsApp our team</p>
                <a
                  href="tel:8302072636"
                  className="mt-2 block text-base font-black text-slate-900 hover:text-[#793FFF] transition"
                >
                  +91 8302072636
                </a>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Direct Line</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard('8302072636', 'phone')}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
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

            {/* Turnaround & SLA */}
            <div className="rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h4 className="mt-4 text-base font-extrabold text-slate-900">Enterprise SLA</h4>
                <p className="mt-0.5 text-xs text-slate-500">Dedicated operational backing</p>
                <div className="mt-2.5 space-y-1.5 text-xs text-slate-600 font-medium">
                  <p>• Custom NDA &amp; Security Compliance</p>
                  <p>• Real-time webhook &amp; JSON streaming</p>
                  <p>• Dedicated client solution architect</p>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Lead Representative Assigned</span>
              </div>
            </div>
          </div>

          {/* Interactive Proposal Request Form */}
          <div className="rounded-[36px] border border-slate-200/90 bg-white/95 backdrop-blur-xl p-8 sm:p-12 shadow-2xl shadow-slate-900/5">
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  Request a Tailored Enterprise Proposal
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal">
                  Fill in your project parameters and our solutions team will prepare a structured quote and worker roadmap.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-black text-emerald-950">
                    Proposal Request Logged Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                    Thank you for reaching out. Our enterprise director has been alerted and will send a detailed brief to your email within <strong>2 hours</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 rounded-full bg-[#793FFF] px-7 py-3 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Service Objective Pills */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Campaign Solution Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'AI Training & RLHF',
                        'Video Distribution & POV',
                        'Brand Micro-Tasks',
                        'User Acquisition',
                        'Custom Enterprise',
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSelectedSolution(item)}
                          className={`rounded-full px-4 py-2 text-xs font-extrabold transition-all cursor-pointer ${
                            selectedSolution === item
                              ? 'bg-[#793FFF] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="companyName" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#793FFF] focus:border-[#793FFF] outline-none transition text-sm bg-slate-50/50"
                        placeholder="e.g. OpenAI Partner / Brand Corp"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contactName" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#793FFF] focus:border-[#793FFF] outline-none transition text-sm bg-slate-50/50"
                        placeholder="e.g. Ashutosh Raj"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Business Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#793FFF] focus:border-[#793FFF] outline-none transition text-sm bg-slate-50/50"
                        placeholder="you@company.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#793FFF] focus:border-[#793FFF] outline-none transition text-sm bg-slate-50/50"
                        placeholder="+91 8302072636"
                      />
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Estimated Campaign Budget Tier
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['< ₹50k', '₹50k - ₹2L', '₹2L - ₹10L', '₹10L+ / Custom'].map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setSelectedBudget(tier)}
                          className={`rounded-2xl py-2.5 text-xs font-bold transition cursor-pointer text-center ${
                            selectedBudget === tier
                              ? 'bg-[#161616] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="requirements" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Campaign Specifications &amp; Data Needs *
                    </label>
                    <textarea
                      id="requirements"
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#793FFF] focus:border-[#793FFF] outline-none transition text-sm bg-slate-50/50 resize-none"
                      placeholder="Describe target demographics, annotation taxonomy, daily volume needed, or timeline requirements..."
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
                        <span>Transmitting Proposal Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Campaign Proposal Request</span>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    Enterprise confidentiality guaranteed. We sign bilateral NDAs upon request.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
