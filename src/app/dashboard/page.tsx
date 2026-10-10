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
    <div className="min-h-screen bg-[#f7f4fd] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* User Profile Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white font-bold text-lg shadow-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base">{displayName}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                  {user.email}
                </span>
                {profile?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-700 hover:bg-purple-200 transition"
                  >
                    Admin Console →
                  </Link>
                )}
              </div>
              <p className="text-xs text-slate-500">ID: {user.id.substring(0, 8)}...</p>
            </div>
          </div>

          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
            >
              Sign out
            </button>
          </form>
        </div>

        {/* Welcome Hero Card (JumpTask Dark Aesthetic) */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 sm:p-10 text-white shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Verified Member • Instant Earnings Active
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Welcome back, {displayName}!
              </h1>
              <p className="text-sm text-slate-400 max-w-xl">
                Explore high-paying earning channels: Take speed quizzes, stream YouTube videos, train next-gen AI models, test arcade games, and upload POV videos.
              </p>
            </div>

            {/* Quick Action in Hero */}
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#793FFF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/30 hover:bg-[#682FF8] transition active:scale-95 text-center"
              >
                <span>Play Speed Quiz</span>
                <span>→</span>
              </Link>
              <Link
                href="/dashboard/rewards"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-bold text-slate-200 hover:bg-slate-800 transition text-center"
              >
                Rewards Catalog
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Balance */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Reward Wallet Balance
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#793FFF]">{pointsBalance}</span>
              <span className="text-xs font-bold text-slate-600">Points</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Verified server ledger</p>
          </div>

          {/* Card 2: Quizzes */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Speed Quizzes
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900">5 Qs</span>
              <span className="text-xs font-bold text-emerald-600">Active</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">7s timer per question</p>
          </div>

          {/* Card 3: Watch & Train AI */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Watch & Train AI
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#793FFF]">Live</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Active Feed
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Continuous video & RLHF tasks</p>
          </div>

          {/* Card 4: Games & POV */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Games & POV Bounties
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">Top Tier</span>
              <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-semibold text-cyan-700">
                High Rewards
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Up to 220 Pts per submission</p>
          </div>
        </div>

        {/* Feature Action Cards Grid (6 Channels) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Quizzes Action Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
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
                className="w-full inline-flex items-center justify-center rounded-full bg-[#793FFF] py-3 px-6 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20"
              >
                Launch Quiz Engine →
              </Link>
            </div>
          </div>

          {/* Card 2: Watch YouTube Videos */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition">
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
                className="w-full inline-flex items-center justify-center rounded-full bg-rose-600 py-3 px-6 text-xs font-bold text-white hover:bg-rose-700 transition shadow-md shadow-rose-600/20"
              >
                Watch Videos →
              </Link>
            </div>
          </div>

          {/* Card 3: Train AI to Earn */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition">
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
                className="w-full inline-flex items-center justify-center rounded-full bg-cyan-600 py-3 px-6 text-xs font-bold text-white hover:bg-cyan-700 transition shadow-md shadow-cyan-600/20"
              >
                Start AI Training →
              </Link>
            </div>
          </div>

          {/* Card 4: Play Games to Earn */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition">
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
                className="w-full inline-flex items-center justify-center rounded-full bg-emerald-600 py-3 px-6 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
              >
                Play Games Now →
              </Link>
            </div>
          </div>

          {/* Card 5: POV Videos */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition">
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
                className="w-full inline-flex items-center justify-center rounded-full bg-[#793FFF] py-3 px-6 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20"
              >
                Submit POV Video →
              </Link>
            </div>
          </div>

          {/* Card 6: Rewards Catalog */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition">
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
                className="w-full inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 py-3 px-6 text-xs font-bold text-slate-800 hover:bg-slate-100 transition shadow-xs"
              >
                Browse Rewards Catalog →
              </Link>
            </div>
          </div>
        </div>

        {/* Earning Tip Banner */}
        <div className="rounded-3xl border border-[#793FFF]/20 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-xl text-[#793FFF]">
              💡
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
