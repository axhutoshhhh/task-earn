import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import DashboardActivities from '@/components/DashboardActivities';
import WalletBalanceDisplay from '@/components/WalletBalanceDisplay';

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

  // Fetch rewards ledger total balance via admin client to ensure 100% reliable calculation
  const admin = createAdminClient();
  const { data: ledgerEntries } = await admin
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
        
        {/* =========================================================================
            TOP WELCOME HERO STAGE (Aesthetic, Premium & Vibrant)
            ========================================================================= */}
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-b from-white/95 via-white/85 to-white/75 backdrop-blur-2xl border border-white/90 p-8 sm:p-12 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.06),0_0_0_1px_rgba(255,255,255,0.8)] text-center">
          {/* Subtle Organic Ambient Corner Glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-[#793FFF]/15 via-purple-300/10 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-amber-400/15 via-orange-300/10 to-transparent blur-3xl" />

          <div className="relative z-10 max-w-5xl mx-auto space-y-4">
            {/* Member Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/90 px-4 py-1.5 text-xs font-bold text-slate-800 shadow-2xs backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500 font-semibold">Account Status:</span>
              <span className="text-violet-700 font-black">Verified Member</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold">24h Payout Guarantee</span>
            </div>

            {/* Single Line Welcome Heading (Expands sidewards for long names) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 sm:whitespace-nowrap leading-tight">
              Welcome Back, {displayName}!
            </h1>

            {/* Let's Make Some Money For You */}
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#793FFF] via-violet-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              Let&apos;s Make Some Money For You
            </p>

            {/* Micro Trust Indicators Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 font-semibold border-t border-slate-100/80 mt-4">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[#793FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Instant Point Credit</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>Direct UPI &amp; Paytm Payouts</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>10 Points = ₹1.00 INR Fixed Parity</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2 EQUAL-SIZED HERO CARDS: WALLET BALANCE & REDEEM REWARDS
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
          
          {/* Card 1: Wallet Balance */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-gradient-to-br from-white via-white/95 to-violet-50/40 p-7 sm:p-8 shadow-[0_15px_35px_-5px_rgba(121,63,255,0.06),0_1px_3px_rgba(0,0,0,0.03)] hover:border-violet-300 hover:shadow-[0_20px_50px_rgba(121,63,255,0.12)] transition-all duration-300 flex flex-col justify-between group">
            {/* Ambient Corner Glow */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#793FFF]/10 blur-2xl group-hover:bg-[#793FFF]/20 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-5">
                {/* Sleek Vector Wallet Pocket */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white shadow-lg shadow-[#793FFF]/25 transition-transform duration-300 group-hover:scale-105">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                  </svg>
                </div>

                <div className="rounded-full bg-violet-50 border border-violet-100/80 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-violet-700 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-Time Sync</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  Wallet Balance
                </span>
                <WalletBalanceDisplay initialBalance={pointsBalance} />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Verified Ledger Credit</span>
              <span className="font-bold text-violet-700">Zero Withdrawal Fees</span>
            </div>
          </div>

          {/* Card 2: Redeem Rewards */}
          <Link
            href="/dashboard/rewards"
            className="relative overflow-hidden rounded-[32px] border border-white/80 bg-gradient-to-br from-white via-white/95 to-amber-50/40 p-7 sm:p-8 shadow-[0_15px_35px_-5px_rgba(245,158,11,0.06),0_1px_3px_rgba(0,0,0,0.03)] hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            {/* Ambient Corner Glow */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-5">
                {/* Sleek Vector Gift / Redeem Pocket */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25 transition-transform duration-300 group-hover:scale-105">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="8" width="18" height="4" rx="1" />
                    <path d="M12 8v13" />
                    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                  </svg>
                </div>

                <div className="rounded-full bg-amber-50 border border-amber-100/80 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>24h Disbursements</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  Redeem Rewards
                </span>
                <div className="mt-1.5">
                  <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 group-hover:text-amber-600 transition-colors tracking-tight block">
                    UPI, Vouchers and Gift Cards
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">UPI</span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">Paytm</span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">Amazon</span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">Flipkart</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-amber-600 group-hover:text-white">
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* =========================================================
            GENUINE EARNING ACTIVITIES (Available & Unavailable Grids)
            ========================================================= */}
        <DashboardActivities />

      </div>
    </main>
  );
}
