import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard | Task Earn',
  description: 'Manage your Task Earn account, wallet balance, and active rewards.',
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch rewards ledger total balance
  const { data: ledgerEntries } = await supabase
    .from('reward_ledger')
    .select('amount')
    .eq('user_id', user.id);

  const pointsBalance = (ledgerEntries || []).reduce(
    (total, entry) => total + (entry.amount || 0),
    0
  );

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-[#f7f4fd] py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Welcome Hero Card (JumpTask Premium Aesthetic) */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 sm:p-10 text-white shadow-xl border border-slate-900">
          {/* Subtle Glow Background Accent */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#793FFF]/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#06B6D4]/15 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md border border-white/10">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Verified Member • Instant Earnings Active
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Welcome back, {displayName}!
              </h1>
              <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                Explore high-paying earning channels: Take speed quizzes, stream YouTube videos, train AI models, play arcade games, and upload POV videos.
              </p>
            </div>

            {/* Quick Action in Hero */}
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#793FFF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/30 hover:bg-[#682FF8] transition active:scale-95 text-center"
              >
                <span>Play Speed Quiz</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/dashboard/rewards"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-sm font-bold text-slate-200 hover:bg-slate-800 transition text-center"
              >
                Rewards Catalog
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Balance */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#793FFF]/30 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Wallet Balance
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#793FFF]/10 text-[#793FFF]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M14.5 9h-4a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3h-4" />
                  <path d="M12 7v10" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#793FFF]">{pointsBalance}</span>
              <span className="text-xs font-bold text-slate-600">Points</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Verified server ledger</p>
          </div>

          {/* Card 2: Quizzes */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#793FFF]/30 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Speed Quizzes
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-[#793FFF]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900">5 Qs</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                Active
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">7s timer per question</p>
          </div>

          {/* Card 3: Watch & Train AI */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#793FFF]/30 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Watch & Train AI
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#793FFF]">Live</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Active Feed
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Continuous video & RLHF tasks</p>
          </div>

          {/* Card 4: Games & POV */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#793FFF]/30 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Games & POV Bounties
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">Top Tier</span>
              <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-semibold text-cyan-700">
                High Yield
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Up to 220 Pts per submission</p>
          </div>
        </div>

        {/* Feature Action Cards Grid (6 Channels) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Quizzes Action Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#793FFF]/30 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  5 Qs Ready
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Knowledge Speed Quizzes</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Test your knowledge across programming and technology. Answer 5 questions under 7s each and win instant points.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dashboard/quiz"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#793FFF] py-3 px-6 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20"
              >
                <span>Launch Quiz Engine</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Watch YouTube Videos */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-rose-300 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                  Watch to Earn
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Watch YouTube Videos</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Stream curated creator videos, tech insights, and gaming clips. Keep watching to fill the progress bar and claim points.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dashboard/watch"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-rose-600 py-3 px-6 text-xs font-bold text-white hover:bg-rose-700 transition shadow-md shadow-rose-600/20"
              >
                <span>Watch Videos</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Train AI to Earn */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-cyan-300 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="9" y1="9" x2="15" y2="9" />
                    <line x1="9" y1="13" x2="15" y2="13" />
                  </svg>
                </div>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">
                  AI Alignment
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Train AI & Annotate</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Help align cutting-edge LLMs. Evaluate side-by-side prompt responses for accuracy, reasoning, and clarity for high payouts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dashboard/train-ai"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-cyan-600 py-3 px-6 text-xs font-bold text-white hover:bg-cyan-700 transition shadow-md shadow-cyan-600/20"
              >
                <span>Start AI Training</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Card 4: Play Games to Earn */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M6 12h4m-2-2v4" />
                    <line x1="15" y1="11" x2="15" y2="11" />
                    <line x1="18" y1="13" x2="18" y2="13" />
                  </svg>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Play to Earn
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Play Games to Earn</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Test browser and mobile arcade titles, conquer speed reaction challenges, and hit quest milestones to unlock points.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dashboard/games"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-3 px-6 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
              >
                <span>Play Games Now</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Card 5: POV Videos */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-purple-300 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-[#793FFF]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <span className="rounded-full bg-[#793FFF]/10 px-3 py-1 text-xs font-bold text-[#793FFF]">
                  Spatial Bounties
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Get Paid for POV Videos</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Capture short everyday first-person video sweeps (desk setup, kitchen, street walks) for high-value spatial AI bounties.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dashboard/pov-videos"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#793FFF] py-3 px-6 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20"
              >
                <span>Submit POV Video</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Card 6: Rewards Catalog */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-amber-300 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  Instant Payouts
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Redeem Gift Cards</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Exchange your accumulated points for Amazon, Starbucks, Apple, and Google Play digital vouchers with immediate delivery.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dashboard/rewards"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 py-3 px-6 text-xs font-bold text-slate-800 hover:bg-slate-100 transition shadow-xs"
              >
                <span>Browse Rewards Catalog</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Earning Tip Banner - Clean SVG, NO emoji */}
        <div className="rounded-3xl border border-[#793FFF]/20 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              <strong className="text-slate-900">Daily Earning Tip:</strong> Combine quick speed quizzes with YouTube video watching and AI training tasks to multiply your daily points yield.
            </p>
          </div>
          <Link
            href="/dashboard/rewards"
            className="shrink-0 rounded-full bg-[#793FFF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20 text-center"
          >
            Check Wallet Balance →
          </Link>
        </div>
      </div>
    </div>
  );
}
