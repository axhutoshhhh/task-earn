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
      <div className="mx-auto max-w-7xl xl:max-w-[1440px] space-y-12">
        {/* Top Center Welcome Heading (Neumorphic sculpted header) */}
        <div className="text-center w-full max-w-7xl mx-auto space-y-3 pt-2 pb-2">
          <div className="inline-flex items-center gap-2 neu-inset-sm px-4 py-1.5 rounded-full text-[11px] font-bold text-slate-500 mb-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            <span>Verified Member Portal</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#793FFF] font-black">Live Session</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-slate-800 sm:whitespace-nowrap">
            Welcome Back, {displayName}!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#793FFF] tracking-tight">
            Let&apos;s Make Some Money For You
          </p>
        </div>

        {/* 2 Equal-Sized Tabs: Wallet Balance & Redeem (Neumorphic sculpted tactile cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 max-w-5xl mx-auto w-full">
          {/* Tab 1: Wallet Balance */}
          <div className="neu-flat rounded-[32px] p-6 sm:p-8 flex items-center gap-5 transition-all duration-300 hover:neu-convex">
            <div className="neu-icon-well flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-[#793FFF]">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>
            <div>
              <span className="block text-xs font-black uppercase tracking-wider text-slate-400">
                Wallet Balance
              </span>
              <WalletBalanceDisplay initialBalance={pointsBalance} />
            </div>
          </div>

          {/* Tab 2: Redeem */}
          <Link
            href="/dashboard/rewards"
            className="group neu-flat rounded-[32px] p-6 sm:p-8 flex items-center justify-between gap-5 transition-all duration-300 hover:neu-convex cursor-pointer"
          >
            <div className="flex items-center gap-5 min-w-0">
              <div className="neu-icon-well flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-orange-500 group-hover:scale-105 transition-transform">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="8" width="18" height="4" rx="1" />
                  <path d="M12 8v13" />
                  <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                  <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  Redeem Rewards
                </span>
                <div className="mt-1">
                  <span className="text-base sm:text-lg md:text-xl font-black text-slate-800 group-hover:text-[#793FFF] transition-colors tracking-tight block">
                    UPI, Vouchers and Gift Cards
                  </span>
                </div>
              </div>
            </div>
            <div className="neu-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-slate-600 group-hover:neu-btn-primary group-hover:text-white transition-all">
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Genuine Earning Activities Section */}
        <DashboardActivities />

      </div>
    </main>
  );
}
