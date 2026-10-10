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
    description: 'Simulated monthly entertainment pass code.',
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
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
          >
            ← Back to Dashboard
          </Link>
          <span className="self-start sm:self-auto rounded-full bg-amber-100 px-3.5 py-1 text-xs font-semibold text-amber-800">
            Simulated Ledger & Redemptions
          </span>
        </div>

        {/* Prominent Simulation Disclaimer */}
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900 shadow-xs">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="text-xs sm:text-sm space-y-1">
              <p className="font-bold">Demonstration Platform Disclaimer</p>
              <p className="text-amber-800">
                All points, reward catalog items, and redemption codes are strictly simulated for testing and demonstration purposes. No real money, gift cards, or cash payouts will ever be issued or processed. Task Earn does not collect bank accounts, UPI PINs, or financial details.
              </p>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Verified Reward Ledger Balance
            </span>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-indigo-600">
                {loading ? '...' : balance}
              </span>
              <span className="text-sm sm:text-base font-semibold text-slate-600">
                Demo Points
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Calculated server-side from your append-only transaction ledger.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard/quiz"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition shadow-xs text-center"
            >
              Earn More Points (Quiz) →
            </Link>
          </div>
        </div>

        {/* Feedback Messages */}
        {successMessage && (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
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
          <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-rose-900 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
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
        <div className="border-b border-slate-200 flex gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'catalog'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Redeem Catalog (Simulated)
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'ledger'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Auditable Ledger ({ledger.length})
          </button>
          <button
            onClick={() => setActiveTab('redemptions')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'redemptions'
                ? 'border-indigo-600 text-indigo-600'
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
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                        {item.points} Points
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <p className="mt-2 text-xs text-slate-600">{item.description}</p>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      disabled={!canAfford || isSubmitting}
                      onClick={() => setRedeemingItem(item)}
                      className={`w-full rounded-xl py-2.5 px-4 text-xs sm:text-sm font-semibold transition ${
                        canAfford
                          ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xs'
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
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800">
                Transaction History (Append-Only Ledger)
              </h3>
            </div>
            {ledger.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">
                No ledger transactions found yet. Complete a quiz to earn your first demo points!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Transaction Reason</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {ledger.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 text-slate-500 text-xs">
                          {new Date(entry.created_at).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-medium">{entry.reason}</td>
                        <td
                          className={`py-3 px-4 text-right font-bold ${
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
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800">Simulated Redemptions History</h3>
            </div>
            {redemptions.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">
                You haven&apos;t redeemed any simulated rewards yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Reward & Demo Code</th>
                      <th className="py-3 px-4">Points</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {redemptions.map((redemption) => (
                      <tr key={redemption.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 text-slate-500 text-xs">
                          {new Date(redemption.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {redemption.reward_type}
                        </td>
                        <td className="py-3 px-4 text-rose-600 font-bold">
                          -{redemption.points} pts
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
              <div className="text-center">
                <span className="text-4xl">{redeemingItem.icon}</span>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  Confirm Simulated Redemption
                </h3>
                <p className="mt-2 text-xs text-slate-600">
                  You are about to redeem <strong>{redeemingItem.points} demo points</strong> for <strong>{redeemingItem.name}</strong>.
                </p>
                <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-800 text-left border border-amber-200">
                  <strong>Notice:</strong> This is a simulation. A demo test code will be generated. No real voucher or money is provided.
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setRedeemingItem(null)}
                  className="flex-1 rounded-xl bg-slate-100 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleRedeem(redeemingItem)}
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-indigo-500 transition shadow-xs"
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
