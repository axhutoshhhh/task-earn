'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface LedgerItem {
  id: string;
  amount: number;
  reason: string;
  created_at: string;
}

interface RedemptionItem {
  id: string;
  points: number;
  status: string;
  reward_type: string;
  created_at: string;
}

interface RewardCatalogItem {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: string;
}

const CATALOG: RewardCatalogItem[] = [
  {
    id: 'demo_store_voucher',
    name: 'Demo Shopping Voucher',
    description: 'Simulated $5 e-voucher code for demo checkout testing.',
    points: 50,
    icon: '🛍️',
  },
  {
    id: 'demo_coffee_pass',
    name: 'Demo Coffee Pass',
    description: 'Simulated digital coffee voucher for testing redemption.',
    points: 100,
    icon: '☕',
  },
  {
    id: 'demo_streaming_pass',
    name: 'Demo Media Pass',
    description: 'Simulated entertainment subscription voucher.',
    points: 200,
    icon: '🎬',
  },
];

export default function RewardsPage() {
  const [balance, setBalance] = useState<number>(0);
  const [ledger, setLedger] = useState<LedgerItem[]>([]);
  const [redemptions, setRedemptions] = useState<RedemptionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'catalog' | 'ledger' | 'redemptions'>('catalog');
  const [redeemingItem, setRedeemingItem] = useState<RewardCatalogItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchBalanceAndHistory = useCallback(async () => {
    try {
      const res = await fetch('/api/rewards/balance');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch reward data.');
      }

      setBalance(data.balance || 0);
      setLedger(data.ledger || []);
      setRedemptions(data.redemptions || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading rewards.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch('/api/rewards/balance');
        const data = await res.json();
        if (!ignore) {
          if (!res.ok) throw new Error(data.error || 'Failed to fetch reward data.');
          setBalance(data.balance || 0);
          setLedger(data.ledger || []);
          setRedemptions(data.redemptions || []);
        }
      } catch (err: unknown) {
        if (!ignore) {
          const msg = err instanceof Error ? err.message : 'Error loading rewards.';
          setError(msg);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleRedeem = async (item: RewardCatalogItem) => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/rewards/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rewardType: item.name,
          points: item.points,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Redemption failed.');
      }

      setSuccessMessage(data.message);
      setBalance(data.newBalance);
      setRedeemingItem(null);
      fetchBalanceAndHistory();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Redemption error.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Dashboard
          </Link>
          <span className="self-start sm:self-auto rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 text-xs font-bold text-slate-700">
            Simulated Demo Vouchers
          </span>
        </div>

        {/* Disclaimer Banner */}
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900 shadow-xs">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="text-xs sm:text-sm space-y-1">
              <p className="font-bold">Simulated Demonstration Platform</p>
              <p className="text-amber-800">
                All points, catalog items, and redemption codes are strictly simulated for testing and demonstration. No real-world currency, cryptocurrency, or actual gift cards will be provided. Task Earn never collects banking information, UPI PINs, or financial secrets.
              </p>
            </div>
          </div>
        </div>

        {/* Balance Card (JumpTask Dark Aesthetic) */}
        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Reward Ledger Balance
            </span>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-[#793FFF]">
                {loading ? '...' : balance}
              </span>
              <span className="text-base font-bold text-slate-300">
                Demo Points
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Computed server-side from your append-only transaction ledger.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard/quiz"
              className="rounded-full bg-[#793FFF] px-6 py-3 text-sm font-bold text-white hover:bg-[#682FF8] transition shadow-lg shadow-[#793FFF]/30 text-center"
            >
              Earn More Points (Speed Quiz) →
            </Link>
          </div>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span>🎉</span>
              <span>{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 font-bold text-sm ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-300 bg-rose-50 p-4 text-rose-900 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-700 hover:text-rose-900 font-bold text-sm ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 flex gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'catalog'
                ? 'border-[#793FFF] text-[#793FFF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Redeem Catalog (Simulated)
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'ledger'
                ? 'border-[#793FFF] text-[#793FFF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Auditable Ledger ({ledger.length})
          </button>
          <button
            onClick={() => setActiveTab('redemptions')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'redemptions'
                ? 'border-[#793FFF] text-[#793FFF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Past Redemptions ({redemptions.length})
          </button>
        </div>

        {/* TAB 1: REWARD CATALOG */}
        {activeTab === 'catalog' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CATALOG.map((item) => {
              const canAfford = balance >= item.points;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3 py-1 text-xs font-black text-[#793FFF]">
                        {item.points} Points
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.description}</p>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      disabled={!canAfford || isSubmitting}
                      onClick={() => setRedeemingItem(item)}
                      className={`w-full rounded-full py-3 px-4 text-xs sm:text-sm font-bold transition ${
                        canAfford
                          ? 'bg-[#793FFF] text-white hover:bg-[#682FF8] shadow-md shadow-[#793FFF]/20'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem (Simulated)' : `Requires ${item.points} Pts`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: AUDITABLE REWARD LEDGER */}
        {activeTab === 'ledger' && (
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                Transaction History (Append-Only Ledger)
              </h3>
            </div>
            {ledger.length === 0 ? (
              <div className="p-12 text-center text-sm text-slate-500">
                No ledger transactions found yet. Complete a speed quiz to earn demo points!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-5">Date & Time</th>
                      <th className="py-3 px-5">Reason</th>
                      <th className="py-3 px-5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {ledger.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-5 text-slate-500 text-xs">
                          {new Date(entry.created_at).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-900">{entry.reason}</td>
                        <td
                          className={`py-3.5 px-5 text-right font-black ${
                            entry.amount > 0 ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {entry.amount > 0 ? `+${entry.amount}` : entry.amount} pts
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PAST REDEMPTIONS */}
        {activeTab === 'redemptions' && (
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">Simulated Redemptions History</h3>
            </div>
            {redemptions.length === 0 ? (
              <div className="p-12 text-center text-sm text-slate-500">
                No simulated rewards redeemed yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-5">Date</th>
                      <th className="py-3 px-5">Reward & Demo Code</th>
                      <th className="py-3 px-5">Points</th>
                      <th className="py-3 px-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {redemptions.map((redemption) => (
                      <tr key={redemption.id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-5 text-slate-500 text-xs">
                          {new Date(redemption.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-900">
                          {redemption.reward_type}
                        </td>
                        <td className="py-3.5 px-5 text-rose-600 font-black">
                          -{redemption.points} pts
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                            {redemption.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* REDEMPTION CONFIRMATION MODAL */}
        {redeemingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl border border-slate-200">
              <div className="text-center">
                <span className="text-4xl">{redeemingItem.icon}</span>
                <h3 className="mt-3 text-lg font-bold text-slate-950">
                  Confirm Simulated Redemption
                </h3>
                <p className="mt-2 text-xs text-slate-600">
                  You are about to redeem <strong>{redeemingItem.points} demo points</strong> for <strong>{redeemingItem.name}</strong>.
                </p>
                <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-xs text-amber-800 text-left border border-amber-200">
                  <strong>Notice:</strong> This is a demo test. A simulated code will be generated. No real gift card is issued.
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setRedeemingItem(null)}
                  className="flex-1 rounded-full bg-slate-100 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleRedeem(redeemingItem)}
                  className="flex-1 rounded-full bg-[#793FFF] py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
