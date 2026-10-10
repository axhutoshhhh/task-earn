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
  brand: string;
  description: string;
  points: number;
  color: string;
  badge: string;
}

const CATALOG: RewardCatalogItem[] = [
  {
    id: 'amazon_voucher_5',
    name: '$5 Amazon Gift Card',
    brand: 'Amazon',
    description: 'Digital voucher code for Amazon shopping, books, and merchandise.',
    points: 50,
    color: 'from-amber-500 to-orange-600',
    badge: 'Popular',
  },
  {
    id: 'starbucks_card_5',
    name: '$5 Starbucks e-Gift Card',
    brand: 'Starbucks',
    description: 'Digital coffee card for food, drinks, and in-store purchases.',
    points: 100,
    color: 'from-emerald-600 to-teal-700',
    badge: 'Lifestyle',
  },
  {
    id: 'streaming_pass_10',
    name: '$10 Media & Streaming Pass',
    brand: 'Streaming',
    description: 'Credit pass for entertainment, music, or video subscriptions.',
    points: 200,
    color: 'from-purple-600 to-indigo-700',
    badge: 'Entertainment',
  },
  {
    id: 'apple_gift_card_10',
    name: '$10 Apple Gift Card',
    brand: 'Apple',
    description: 'Redeem for App Store apps, games, Apple Music, or iCloud storage.',
    points: 250,
    color: 'from-slate-700 to-slate-950',
    badge: 'Apps & Media',
  },
  {
    id: 'google_play_10',
    name: '$10 Google Play Code',
    brand: 'Google Play',
    description: 'Redeem for Android applications, mobile games, and digital content.',
    points: 250,
    color: 'from-cyan-600 to-blue-700',
    badge: 'Mobile Gaming',
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

  const renderCardIcon = (brand: string) => {
    switch (brand) {
      case 'Amazon':
        return (
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        );
      case 'Starbucks':
        return (
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        );
      case 'Streaming':
        return (
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
        );
      case 'Apple':
        return (
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        );
      case 'Google Play':
        return (
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" />
            <line x1="12" y1="22" x2="12" y2="7" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4fd] py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Breadcrumb & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Dashboard Overview
          </Link>
          <span className="self-start sm:self-auto rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3.5 py-1 text-xs font-bold text-[#793FFF] flex items-center gap-1.5">
            <svg className="h-3 w-3 text-[#793FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Instant Digital Voucher Issuance
          </span>
        </div>

        {/* Balance Card (High-End Fintech Aesthetic) */}
        <div className="rounded-3xl bg-slate-950 p-8 sm:p-10 text-white shadow-xl border border-slate-900 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#793FFF]/20 blur-2xl" />

          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Reward Wallet Balance
            </span>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-[#793FFF]">
                {loading ? '...' : balance}
              </span>
              <span className="text-base font-bold text-slate-300">
                Points
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              Computed server-side from your immutable transaction ledger.
            </p>
          </div>

          <div className="relative z-10 flex gap-3">
            <Link
              href="/dashboard/quiz"
              className="inline-flex items-center gap-2 rounded-full bg-[#793FFF] px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-[#682FF8] transition shadow-lg shadow-[#793FFF]/30 text-center active:scale-95"
            >
              <span>Earn More Points</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
              <svg className="h-4 w-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 font-bold text-xs ml-4 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-300 bg-rose-50 p-4 text-rose-900 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
              <svg className="h-4 w-4 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-700 hover:text-rose-900 font-bold text-xs ml-4 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 flex gap-6 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-3.5 border-b-2 transition cursor-pointer ${
              activeTab === 'catalog'
                ? 'border-[#793FFF] text-[#793FFF] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Vouchers Catalog
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`pb-3.5 border-b-2 transition cursor-pointer ${
              activeTab === 'ledger'
                ? 'border-[#793FFF] text-[#793FFF] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Auditable Ledger ({ledger.length})
          </button>
          <button
            onClick={() => setActiveTab('redemptions')}
            className={`pb-3.5 border-b-2 transition cursor-pointer ${
              activeTab === 'redemptions'
                ? 'border-[#793FFF] text-[#793FFF] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Past Redemptions ({redemptions.length})
          </button>
        </div>

        {/* TAB 1: REWARD CATALOG */}
        {activeTab === 'catalog' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATALOG.map((item) => {
              const canAfford = balance >= item.points;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#793FFF]/30 transition"
                >
                  <div>
                    {/* Brand Card Mockup Graphic */}
                    <div className={`h-24 rounded-2xl bg-gradient-to-r ${item.color} p-4 text-white flex flex-col justify-between shadow-sm relative overflow-hidden`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/80">
                          {item.badge}
                        </span>
                        {renderCardIcon(item.brand)}
                      </div>
                      <span className="text-base font-extrabold tracking-tight">
                        {item.brand}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">{item.name}</span>
                      <span className="rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-2.5 py-0.5 text-xs font-black text-[#793FFF]">
                        {item.points} Pts
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={!canAfford || isSubmitting}
                      onClick={() => setRedeemingItem(item)}
                      className={`w-full rounded-full py-3 px-4 text-xs font-bold transition cursor-pointer ${
                        canAfford
                          ? 'bg-[#793FFF] text-white hover:bg-[#682FF8] shadow-md shadow-[#793FFF]/20 active:scale-95'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem Voucher' : `Requires ${item.points} Points`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: AUDITABLE REWARD LEDGER */}
        {activeTab === 'ledger' && (
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-100 bg-slate-50/70">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Transaction History (Append-Only Ledger)
              </h3>
            </div>
            {ledger.length === 0 ? (
              <div className="p-12 text-center text-xs sm:text-sm text-slate-500">
                No ledger transactions found yet. Complete speed quizzes, watch videos, or train AI to earn points.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-5">Date & Time</th>
                      <th className="py-3 px-5">Activity Reason</th>
                      <th className="py-3 px-5 text-right">Points Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {ledger.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-50/70 transition">
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
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-100 bg-slate-50/70">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">Past Redemptions History</h3>
            </div>
            {redemptions.length === 0 ? (
              <div className="p-12 text-center text-xs sm:text-sm text-slate-500">
                No rewards redeemed yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-5">Date</th>
                      <th className="py-3 px-5">Reward Voucher Code</th>
                      <th className="py-3 px-5">Points Deducted</th>
                      <th className="py-3 px-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {redemptions.map((redemption) => (
                      <tr key={redemption.id} className="hover:bg-slate-50/70 transition">
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

        {/* REDEMPTION CONFIRMATION MODAL - Clean SVGs, NO emojis */}
        {redeemingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl border border-slate-200">
              <div className="text-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${redeemingItem.color} shadow-md`}>
                  {renderCardIcon(redeemingItem.brand)}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">
                  Confirm Voucher Redemption
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600">
                  You are about to redeem <strong>{redeemingItem.points} points</strong> for <strong>{redeemingItem.name}</strong>.
                </p>
                <div className="mt-4 rounded-2xl bg-[#793FFF]/8 p-4 text-xs text-[#793FFF] text-left border border-[#793FFF]/20">
                  <strong>Instant Delivery:</strong> Your digital voucher code will be issued instantly and permanently archived in your Past Redemptions history.
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setRedeemingItem(null)}
                  className="flex-1 rounded-full bg-slate-100 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleRedeem(redeemingItem)}
                  className="flex-1 rounded-full bg-[#793FFF] py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20 cursor-pointer"
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
