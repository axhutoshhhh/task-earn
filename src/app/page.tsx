import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#f7f4fd]">
      {/* Background Decorative Glow Elements */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="aspect-1155/678 w-[68rem] bg-gradient-to-tr from-[#793FFF]/20 via-[#8B5CF6]/15 to-[#06B6D4]/20 opacity-70"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-5xl text-center">
          {/* Top Pill Badge */}
          <ScrollReveal direction="down" delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#793FFF]/20 bg-[#793FFF]/5 px-4 py-1.5 text-xs font-semibold text-[#793FFF] shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#793FFF] animate-pulse" />
              <span>Next-Gen Micro-Reward Platform</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">Simulated Demo Mode</span>
            </div>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal direction="up" delay={0.15}>
            <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Earn rewards online,{' '}
              <span className="bg-gradient-to-r from-[#793FFF] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                one simple task
              </span>{' '}
              at a time
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.25}>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
              Task Earn is built for anyone looking to engage with quick knowledge activities. Complete 7-second speed quizzes, build your auditable ledger, and test simulated reward redemptions.
            </p>
          </ScrollReveal>

          {/* Action CTAs */}
          <ScrollReveal direction="up" delay={0.35}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#793FFF] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#793FFF]/30 hover:bg-[#682FF8] hover:shadow-xl hover:shadow-[#793FFF]/40 transition-all duration-200 active:scale-95"
              >
                <span>Start Earning Now</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/#features"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-400 transition"
              >
                Explore Features
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              All points and vouchers are simulated for demonstration. No real financial payout occurs.
            </p>
          </ScrollReveal>

          {/* Floating Interactive Hero Mockup Card */}
          <ScrollReveal direction="up" delay={0.45}>
            <div className="relative mx-auto mt-16 max-w-3xl rounded-3xl border border-slate-200 bg-white/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:shadow-[#793FFF]/15 hover:border-[#793FFF]/30">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-semibold text-slate-500">TaskEarn Speed Engine</span>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  Live Verification
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#793FFF]">
                    Sample Quiz Question
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    Which programming language powers the web?
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-medium text-slate-600">A. Python</span>
                    <span className="rounded-lg bg-[#793FFF]/10 border border-[#793FFF]/30 px-3 py-1.5 font-bold text-[#793FFF]">
                      B. JavaScript ✓
                    </span>
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-medium text-slate-600">C. C++</span>
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-medium text-slate-600">D. Java</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-5 border border-slate-200 text-center shrink-0 w-full sm:w-44 shadow-xs">
                  <span className="text-xs font-bold uppercase text-slate-500">Timer</span>
                  <div className="my-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#793FFF] text-lg font-black text-white shadow-md shadow-[#793FFF]/30 animate-pulse">
                    7s
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">+10 Demo Pts</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. STATS & TRANSPARENCY BAR */}
      <section className="border-y border-[#793FFF]/10 bg-white/60 backdrop-blur-xs py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            <ScrollReveal delay={0.05}>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-slate-950">5</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600">Questions Per Quiz</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-[#793FFF]">7s</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600">Strict Speed Timer</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-[#06B6D4]">100%</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600">Server-Side Verified</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-emerald-600">0</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600">Financial Data Collected</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. WAYS TO EARN (SCROLL-ANIMATED CARDS) */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#793FFF]">
                Multiple Opportunities
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Ways to Earn on TaskEarn
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Explore diverse ways to earn simulated rewards. We emphasize honesty: features will only activate when real partner integrations are approved.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1: Speed Quizzes (Stagger 1) */}
            <ScrollReveal direction="up" delay={0.15} className="h-full">
              <div className="h-full group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#793FFF]/50 hover:shadow-2xl hover:shadow-[#793FFF]/15 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF] transition-transform duration-300 group-hover:scale-110">
                      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                      Available Now
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#793FFF] transition-colors">
                    Knowledge Speed Quizzes
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Answer 5 timed multiple-choice questions within 7 seconds each. The server validates responses, enforces timing bounds, and awards demo points directly into your ledger.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/dashboard/quiz"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#793FFF] group-hover:text-[#682FF8]"
                  >
                    <span>Play Quiz Demo</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Micro Tasks (Stagger 2) */}
            <ScrollReveal direction="up" delay={0.3} className="h-full">
              <div className="h-full group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition-transform duration-300 group-hover:scale-110">
                      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Simple Micro-Tasks</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Complete social engagement, content verification, and web testing tasks. This section will only launch once approved third-party task providers complete verification.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/dashboard/tasks"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800"
                  >
                    <span>View Provider Status</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3: Paid Surveys (Stagger 3) */}
            <ScrollReveal direction="up" delay={0.45} className="h-full">
              <div className="h-full group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 transition-transform duration-300 group-hover:scale-110">
                      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 20V10" />
                        <path d="M12 20V4" />
                        <path d="M6 20v-6" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Market Research Surveys</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Share opinions through market research panels. No mock questions or data harvesting: surveys will exclusively activate with authorized provider callbacks.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/dashboard/surveys"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800"
                  >
                    <span>View Survey Status</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (STEPPED CARDS WITH SCROLL ANIMATION) */}
      <section id="how-it-works" className="py-24 bg-[#f2ecfc]/50 border-t border-[#793FFF]/10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#793FFF]">
                Step-by-Step
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                How TaskEarn Works
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Get started in three effortless steps.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={0.15} className="h-full">
              <div className="h-full relative rounded-3xl bg-white p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <span className="text-4xl font-black text-[#793FFF]/30">01</span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">Create Free Account</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Sign up in seconds using secure Supabase authentication. Your profile is assigned a unique stable identity with automatic Row Level Security.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#793FFF]">
                  Instant Access
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} className="h-full">
              <div className="h-full relative rounded-3xl bg-white p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <span className="text-4xl font-black text-[#06B6D4]/40">02</span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">Take Speed Quizzes</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Answer 5 knowledge questions under a 7-second per question countdown. Questions and answers are evaluated server-side to prevent tampering.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#06B6D4]">
                  7 Seconds Per Question
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.45} className="h-full">
              <div className="h-full relative rounded-3xl bg-white p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <span className="text-4xl font-black text-emerald-400">03</span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">Track & Redeem</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Watch your balance accumulate in an append-only ledger. Test simulated voucher redemptions and review the complete auditable transaction history.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-600">
                  Auditable Ledger
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. TRANSPARENCY & INTEGRITY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mx-auto max-w-4xl rounded-3xl bg-slate-950 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-[#8B5CF6]">
                Trust & Integrity Policy
              </span>
              <h2 className="mt-4 text-2xl sm:text-4xl font-black text-white">
                Built with Total Transparency
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-400">
                Unlike platforms that invent fake statistics or mock payouts, Task Earn is honest about its architecture and business stage.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">✓</span>
                  <span>All points and vouchers are explicitly designated as simulated demo units</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">✓</span>
                  <span>No banking information, UPI PINs, or sensitive passwords collected</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">✓</span>
                  <span>Server-enforced timing and answer verification prevents replay tampering</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">✓</span>
                  <span>Micro-tasks and surveys remain disabled until licensed partners approve integration</span>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">Ready to explore the demo platform?</span>
                <Link
                  href="/register"
                  className="rounded-full bg-[#793FFF] px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20"
                >
                  Create Demo Account →
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
