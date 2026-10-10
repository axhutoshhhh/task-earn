import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard Overview | Task Earn',
  description: 'Manage your Task Earn account, wallet balance, and active earning channels.',
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

  // Fetch rewards ledger total balance and recent transactions
  const { data: ledgerEntries } = await supabase
    .from('reward_ledger')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const pointsBalance = (ledgerEntries || []).reduce(
    (total, entry) => total + (entry.amount || 0),
    0
  );

  const recentTransactions = (ledgerEntries || []).slice(0, 5);

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'User';

  return (
    <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Welcome Earning Console Card */}
          <div className="relative overflow-hidden rounded-[32px] bg-slate-950 p-8 sm:p-12 text-white shadow-2xl border border-slate-900">
            {/* Ambient Background Lighting */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#793FFF]/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#B5FF24]/10 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#B5FF24] backdrop-blur-md border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-[#B5FF24] animate-pulse" />
                  <span>Verified Member • Active Earnings Engine</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  Welcome back, {displayName}!
                </h1>
                <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                  Earn points across 5 active channels. Speed quizzes, YouTube video watch sessions, AI model training, arcade games, and POV bounties.
                </p>
              </div>

              {/* Quick Actions in Hero */}
              <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard/quiz"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#793FFF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/30 hover:bg-[#682FF8] transition active:scale-95 text-center"
                >
                  <span>Launch Speed Quiz</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/dashboard/rewards"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition text-center backdrop-blur-xs"
                >
                  Redeem Vouchers
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar (Fintech Glass Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Stat 1: Wallet Balance */}
            <div className="rounded-[24px] border border-slate-200/90 bg-white p-6 shadow-xs hover:border-[#793FFF]/40 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Wallet Balance
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#793FFF]/10 text-[#793FFF]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v10" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-950">{pointsBalance}</span>
                <span className="text-xs font-bold text-[#793FFF]">PTS</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 font-medium">
                Approx. ${(pointsBalance * 0.01).toFixed(2)} USD in vouchers
              </p>
            </div>

            {/* Stat 2: Quizzes Active */}
            <div className="rounded-[24px] border border-slate-200/90 bg-white p-6 shadow-xs hover:border-[#793FFF]/40 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Speed Quizzes
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-[#793FFF]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-950">5 Qs</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  Ready
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500 font-medium">
                +10 PTS per 7s question
              </p>
            </div>

            {/* Stat 3: Watch & Train AI */}
            <div className="rounded-[24px] border border-slate-200/90 bg-white p-6 shadow-xs hover:border-[#793FFF]/40 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Watch &amp; Train AI
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-950">Live</span>
                <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-bold text-cyan-800">
                  Active Feed
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500 font-medium">
                25–35 PTS per session
              </p>
            </div>

            {/* Stat 4: Games & POV */}
            <div className="rounded-[24px] border border-slate-200/90 bg-white p-6 shadow-xs hover:border-[#793FFF]/40 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Games &amp; Bounties
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-950">Top Tier</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  High Yield
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500 font-medium">
                Up to 220 PTS per bounty
              </p>
            </div>
          </div>

          {/* Earning Channels (Organized 6-Card Grid) */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-black text-slate-950 tracking-tight">
                  Available Earning Channels
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete tasks in any category to deposit reward points directly into your balance.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. Knowledge Speed Quizzes */}
              <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-[#793FFF]/40 transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF]">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-[#793FFF]">
                      Instant 7s
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-950">Knowledge Speed Quizzes</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    5 multiple-choice questions with a strict 7-second countdown per question. Rapid point payouts.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/dashboard/quiz"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#161616] hover:bg-[#793FFF] py-3.5 px-6 text-xs font-bold text-white transition shadow-sm"
                  >
                    <span>Launch Quiz Engine</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* 2. Watch YouTube Videos */}
              <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-rose-300 transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                      Watch &amp; Earn
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-950">Watch YouTube Videos</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Stream curated partner content, tech reviews, and gaming insights. Fill the active progress bar to earn.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/dashboard/watch"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-rose-600 hover:bg-rose-700 py-3.5 px-6 text-xs font-bold text-white transition shadow-sm"
                  >
                    <span>Watch Videos</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* 3. Train AI */}
              <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-cyan-300 transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="9" y="9" width="6" height="6" />
                        <line x1="9" y1="1" x2="9" y2="4" />
                        <line x1="15" y1="1" x2="15" y2="4" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">
                      AI Alignment
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-950">Train AI &amp; Annotate</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Compare side-by-side prompt responses from modern LLMs. Provide human feedback (RLHF) for high yields.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/dashboard/train-ai"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-cyan-600 hover:bg-cyan-700 py-3.5 px-6 text-xs font-bold text-white transition shadow-sm"
                  >
                    <span>Start AI Training</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* 4. Play Games */}
              <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="2" y="6" width="20" height="12" rx="2" />
                        <path d="M6 12h4m-2-2v4" />
                        <line x1="15" y1="11" x2="15.01" y2="11" />
                        <line x1="18" y1="13" x2="18.01" y2="13" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                      Quests
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-950">Play Games to Earn</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Launch arcade challenges directly in your browser. Reach score milestones to unlock bonus points.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/dashboard/games"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 py-3.5 px-6 text-xs font-bold text-white transition shadow-sm"
                  >
                    <span>Play Arcade Games</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* 5. POV Video Bounties */}
              <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-indigo-300 transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M23 7l-7 5 7 5V7z" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">
                      Spatial AI
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-950">POV Video Bounties</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Record short 45-90s sweeps of ordinary spaces (workspace, kitchen, streets) for spatial computing datasets.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/dashboard/pov-videos"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 py-3.5 px-6 text-xs font-bold text-white transition shadow-sm"
                  >
                    <span>Submit POV Clips</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* 6. Rewards Catalog */}
              <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-amber-300 transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                      Instant Code
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-950">Redeem Gift Cards</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Exchange your points for Amazon, Apple, Starbucks, and Google Play digital vouchers with instant code delivery.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/dashboard/rewards"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#161616] hover:bg-[#793FFF] py-3.5 px-6 text-xs font-bold text-white transition shadow-sm"
                  >
                    <span>Browse Rewards Catalog</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity / Ledger Stream */}
          <div className="rounded-[28px] border border-slate-200/90 bg-white overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-950">Recent Ledger Activity</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified server-side credit and debit events on your account.
                </p>
              </div>
              <Link
                href="/dashboard/rewards"
                className="text-xs font-bold text-[#793FFF] hover:underline"
              >
                View Full Ledger →
              </Link>
            </div>

            {recentTransactions.length === 0 ? (
              <div className="p-12 text-center text-xs sm:text-sm text-slate-500">
                No recent activity recorded. Take a quiz or watch a video to see your points ledger update!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          tx.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'text-rose-600 bg-rose-50'
                        }`}
                      >
                        {tx.amount > 0 ? (
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{tx.reason}</p>
                        <p className="text-[11px] text-slate-400">
                          {new Date(tx.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-sm font-black ${
                          tx.amount > 0 ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount} PTS
                      </span>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
  );
}
