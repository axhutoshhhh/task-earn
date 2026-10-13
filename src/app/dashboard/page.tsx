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

  // Fetch rewards ledger total balance
  const { data: ledgerEntries } = await supabase
    .from('reward_ledger')
    .select('amount')
    .eq('user_id', user.id);

  const pointsBalance = (ledgerEntries || []).reduce(
    (total, entry) => total + (entry.amount || 0),
    0
  );

  const displayName =
    user.user_metadata?.display_name ||
    profile?.display_name ||
    user.user_metadata?.name ||
    user.user_metadata?.full_name ||
    'Member';

  return (
    <main className="py-8 sm:py-12 px-4 sm:px-8 lg:px-12 w-full">
      <div className="mx-auto max-w-7xl xl:max-w-[1440px] space-y-10">
        {/* Page Header: Clean Typography & Repositioned Wallet Balance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-100/80">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950">
              Welcome Back, {displayName}!
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#793FFF] tracking-tight">
              Let&apos;s Make Some Money For You
            </p>
          </div>

          {/* Repositioned Wallet Balance Card (Points Only, No Approx Money) */}
          <div className="shrink-0">
            <div className="rounded-[28px] border border-slate-200/90 bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:border-[#793FFF]/40 hover:shadow-md transition flex items-center gap-5 min-w-[240px] sm:min-w-[270px]">
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white shadow-md shadow-[#793FFF]/25">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  Wallet Balance
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    {pointsBalance}
                  </span>
                  <span className="text-sm font-black text-[#793FFF] uppercase tracking-wider">
                    PTS
                  </span>
                </div>
              </div>
            </div>
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

        </div>
      </main>
  );
}
