import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard | Task Earn',
  description: 'Manage your Task Earn demo account and simulated rewards.',
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
    <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8">
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
                Live Demo Account Active
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Welcome back, {displayName}!
              </h1>
              <p className="text-sm text-slate-400 max-w-xl">
                Take timed speed quizzes to test your knowledge, accumulate simulated points, and verify your auditable ledger.
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
                Simulated Rewards
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Balance */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Reward Ledger Balance
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#793FFF]">{pointsBalance}</span>
              <span className="text-xs font-bold text-slate-600">Demo Pts</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Verified server-side</p>
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

          {/* Card 3: Tasks */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm opacity-80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Micro-Tasks
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-400">0</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                Coming Soon
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Awaiting partner approval</p>
          </div>

          {/* Card 4: Surveys */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm opacity-80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Market Surveys
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-400">0</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                Coming Soon
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Awaiting provider approval</p>
          </div>
        </div>

        {/* Feature Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quizzes Action Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Ready to Play
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Knowledge Speed Quizzes</h3>
              <p className="mt-2 text-sm text-slate-600">
                Test your knowledge across web development, programming, and technology. Earn 10 demo points per correct answer.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/dashboard/quiz"
                className="w-full inline-flex items-center justify-center rounded-full bg-[#793FFF] py-3 px-6 text-sm font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20"
              >
                Launch Quiz Engine →
              </Link>
            </div>
          </div>

          {/* Simulated Rewards Action Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">
                  Simulated Vouchers
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Redeem Demo Rewards</h3>
              <p className="mt-2 text-sm text-slate-600">
                Exchange accumulated demo points for simulated gift cards and test voucher codes. Inspect your append-only ledger history.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/dashboard/rewards"
                className="w-full inline-flex items-center justify-center rounded-full border border-slate-200 bg-white py-3 px-6 text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
              >
                View Catalog & Ledger →
              </Link>
            </div>
          </div>

          {/* Tasks Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between opacity-90">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Micro-Tasks</h3>
              <p className="mt-2 text-sm text-slate-600">
                Tasks remain disabled until formal agreements with third-party providers and authenticated server callbacks are completed.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/dashboard/tasks"
                className="w-full inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 py-3 px-6 text-sm font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Check Integration Status →
              </Link>
            </div>
          </div>

          {/* Surveys Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between opacity-90">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 20V10" />
                    <path d="M12 20V4" />
                    <path d="M6 20v-6" />
                  </svg>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Market Surveys</h3>
              <p className="mt-2 text-sm text-slate-600">
                Survey panels will activate only when licensed research partner networks approve our business model and integrations.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/dashboard/surveys"
                className="w-full inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 py-3 px-6 text-sm font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Check Integration Status →
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900 text-xs sm:text-sm">
          <strong>Notice:</strong> Task Earn is operating in demo mode. All points, balances, and redemption codes are strictly simulated for testing purposes and hold no real cash or cryptocurrency value.
        </div>
      </div>
    </div>
  );
}
