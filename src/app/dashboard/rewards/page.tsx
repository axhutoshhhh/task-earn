'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import DashboardNav from '@/components/DashboardNav';

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
  brand: 'Amazon' | 'Apple' | 'Starbucks' | 'Google Play' | 'Steam';
  category: 'shopping' | 'tech' | 'coffee' | 'gaming';
  value: string;
  description: string;
  points: number;
  cardBg: string;
  accentColor: string;
  badge: string;
}

// Official brand vector logos
function OfficialAppleLogo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 170 170" fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.43-6.19-9.57-11.08-20.91-14.67-34.02-3.59-13.11-5.38-25.17-5.38-36.19 0-14.57 3.73-26.78 11.19-36.63 7.46-9.85 16.92-14.9 28.38-15.15 4.9 0 10.37 1.34 16.42 4.02 6.05 2.68 10.27 4.08 12.66 4.2 2.17-.25 6.42-1.7 12.74-4.35 6.32-2.65 11.51-3.9 15.58-3.75 14.13.62 25.32 6.07 33.56 16.34-12.74 7.74-18.99 18.39-18.75 31.95.24 10.49 4.16 19.34 11.76 26.56 7.6 7.22 16.8 11.43 27.61 12.64-2.17 6.43-4.8 12.79-7.89 19.08zM119.22 31.84c0-7.74 2.76-14.88 8.28-21.42 5.53-6.54 12.18-10.42 19.96-11.64.24 1.13.36 2.14.36 3.03 0 7.74-2.82 15.01-8.46 21.81-5.64 6.8-12.39 10.74-20.25 11.82-.12-1.25-.19-2.26-.19-3.6z" />
    </svg>
  );
}

function OfficialAmazonLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 167 50" fill="currentColor">
      <path d="M78.6 30.6c-4.9 3.6-12 5.6-18.2 5.6-8.6 0-16.4-3.2-22.3-8.5-.5-.4-.1-1 .5-.7 6.2 3.6 13.8 5.7 21.8 5.7 5.5 0 11.7-1.5 17.4-4.5.9-.5 1.6.7.8 1.4z" fill="#FF9900" />
      <path d="M81 28.5c-.4-.5-2.6-.2-3.9-.1-.4.1-.5-.3-.1-.6 2.4-1.6 6.2-1.2 6.6-.7.4.6-.1 4.5-2.4 6.3-.4.3-.7.1-.5-.2.7-1.3 1.1-3.7.3-4.7z" fill="#FF9900" />
      <path d="M28.4 20.3c0-3.3-1.6-4.9-5.1-4.9-3.1 0-6.2 1.4-8.2 2.7-.4.3-.8-.1-.6-.5 1.5-2.9 3.6-4.2 8.7-4.2 5.9 0 9 2.9 9 8.7v10.2c0 2.2.9 3.2 1.8 4.4.3.4 0 .9-.5.9-1.9.4-4.8.4-6.3-2-.9 1.4-2.8 2.6-5.8 2.6-4.5 0-7.9-2.7-7.9-7.3 0-5.7 4.6-7.5 10.8-7.5 1.5 0 2.7.2 4.1.4v-3.5zm-3.8 14.5c2.4 0 4.1-1.6 4.1-4.2v-1.6c-1.2-.2-2.7-.4-4-.4-3.8 0-6.1 1.1-6.1 4 0 2.7 2.3 4.2 6 4.2zM43.7 13.9h3.7c.4 0 .6.3.6.7v2.3c1.5-2 3.6-3.4 6.4-3.4 3.7 0 5.8 2.1 6.6 4.7 1.8-2.9 4.3-4.7 7.7-4.7 4.8 0 8.1 3.4 8.1 9.8v13.6c0 .4-.3.7-.7.7h-3.8c-.4 0-.7-.3-.7-.7V24.5c0-4.3-1.5-6.3-4.4-6.3-2.6 0-4.7 2-4.7 6.1v12.7c0 .4-.3.7-.7.7h-3.8c-.4 0-.7-.3-.7-.7V24.5c0-4.3-1.5-6.3-4.4-6.3-2.6 0-4.7 2-4.7 6.1v12.7c0 .4-.3.7-.7.7h-3.8c-.4 0-.7-.3-.7-.7V14.6c0-.4.3-.7.6-.7zM100.9 25.4c0-7.2 4.9-12 11.9-12 7 0 11.9 4.8 11.9 12 0 7.2-4.9 12-11.9 12-7 0-11.9-4.8-11.9-12zm18.4 0c0-4.8-2.6-8-6.5-8s-6.5 3.2-6.5 8 2.6 8 6.5 8 6.5-3.2 6.5-8zM128.5 13.9h3.7c.4 0 .6.3.6.7v2.5c1.8-2.3 4.3-3.6 7.4-3.6 5 0 8.3 3.6 8.3 9.8v13.7c0 .4-.3.7-.7.7h-3.8c-.4 0-.7-.3-.7-.7V24.5c0-4.3-1.8-6.3-5-6.3-2.9 0-5.1 2.1-5.1 6.3v12.5c0 .4-.3.7-.7.7h-3.8c-.4 0-.7-.3-.7-.7V14.6c0-.4.2-.7.6-.7z" />
    </svg>
  );
}

function OfficialStarbucksLogo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="48" fill="#006241" />
      <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="1.5" />
      <path
        d="M50 18l3 6.5 7.2 1-5.2 5.1 1.2 7.1L50 34.2l-6.2 3.5 1.2-7.1-5.2-5.1 7.2-1L50 18z"
        fill="white"
      />
      <circle cx="34" cy="46" r="2.5" fill="white" />
      <circle cx="66" cy="46" r="2.5" fill="white" />
      <path
        d="M44 40h12v6c0 3.3-2.7 6-6 6s-6-2.7-6-6v-6z"
        fill="white"
      />
      <path
        d="M32 58c4-3 10-4 18-4s14 1 18 4c0 0-4 11-18 11s-18-11-18-11z"
        fill="white"
      />
      <path
        d="M26 42c0 8 4 16 10 20-3 3-8 5-14 3 0 0 1-13 4-23z"
        fill="white"
      />
      <path
        d="M74 42c0 8-4 16-10 20 3 3 8 5 14 3 0 0-1-13-4-23z"
        fill="white"
      />
    </svg>
  );
}

function OfficialGooglePlayLogo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#00E676" />
      <path d="M47 36.1C41.4 46.4 38 59.4 38 74.4v363.2c0 15 3.4 28 9 38.3L275.6 256 47 36.1z" fill="#00B0FF" />
      <path d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z" fill="#FF3D00" />
      <path d="M466 237.2l-80.6-46.3-60.1 65.1 60.1 65.1 80.6-46.3c23-13.2 23-34.4 0-47.6z" fill="#FFD600" />
    </svg>
  );
}

function OfficialSteamLogo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
    </svg>
  );
}

const CATALOG: RewardCatalogItem[] = [
  {
    id: 'amazon_voucher_5',
    name: '$5 Amazon Gift Card',
    brand: 'Amazon',
    category: 'shopping',
    value: '$5.00 USD',
    description: 'Instant code for millions of items across Amazon shopping, electronics, and books.',
    points: 50,
    cardBg: 'from-[#19222D] via-[#232F3E] to-[#131A22]',
    accentColor: '#FF9900',
    badge: 'Popular',
  },
  {
    id: 'starbucks_card_5',
    name: '$5 Starbucks e-Gift Card',
    brand: 'Starbucks',
    category: 'coffee',
    value: '$5.00 USD',
    description: 'Redeem at any participating Starbucks store for coffee, cold drinks, and bakery items.',
    points: 50,
    cardBg: 'from-[#00462A] via-[#006241] to-[#01351E]',
    accentColor: '#006241',
    badge: 'Lifestyle',
  },
  {
    id: 'apple_gift_card_10',
    name: '$10 Apple Gift Card',
    brand: 'Apple',
    category: 'tech',
    value: '$10.00 USD',
    description: 'Use across the App Store, Apple Music, iCloud+ storage, Apple TV+, and hardware products.',
    points: 100,
    cardBg: 'from-[#1E1E24] via-[#121216] to-[#050507]',
    accentColor: '#FFFFFF',
    badge: 'Official',
  },
  {
    id: 'google_play_10',
    name: '$10 Google Play Pass',
    brand: 'Google Play',
    category: 'gaming',
    value: '$10.00 USD',
    description: 'Instant credit for Android games, apps, in-app purchases, and Google Play Store books.',
    points: 100,
    cardBg: 'from-[#1A2332] via-[#101824] to-[#0B0F17]',
    accentColor: '#00E676',
    badge: 'Mobile Gaming',
  },
  {
    id: 'steam_wallet_20',
    name: '$20 Steam Wallet Code',
    brand: 'Steam',
    category: 'gaming',
    value: '$20.00 USD',
    description: 'Deposit funds directly to your Steam Wallet to purchase top PC titles and DLCs.',
    points: 200,
    cardBg: 'from-[#171A21] via-[#1B2838] to-[#101217]',
    accentColor: '#66C0F4',
    badge: 'PC Gaming',
  },
  {
    id: 'apple_gift_card_25',
    name: '$25 Apple Gift Card',
    brand: 'Apple',
    category: 'tech',
    value: '$25.00 USD',
    description: 'High-tier Apple credit for software subscriptions, in-app gems, or Apple Store hardware.',
    points: 250,
    cardBg: 'from-[#2C2D35] via-[#1A1A22] to-[#0D0D12]',
    accentColor: '#FFFFFF',
    badge: 'Top Tier',
  },
];

export default function RewardsPage() {
  const [balance, setBalance] = useState<number>(0);
  const [ledger, setLedger] = useState<LedgerItem[]>([]);
  const [redemptions, setRedemptions] = useState<RedemptionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'catalog' | 'ledger' | 'redemptions'>('catalog');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [redeemingItem, setRedeemingItem] = useState<RewardCatalogItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

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
    fetchBalanceAndHistory();
  }, [fetchBalanceAndHistory]);

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

      setSuccessMessage(data.message || `Successfully redeemed ${item.name}! Check your past redemptions table.`);
      setBalance(data.newBalance);
      setRedeemingItem(null);
      fetchBalanceAndHistory();
      setActiveTab('redemptions');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Redemption error.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2000);
  };

  const filteredCatalog = CATALOG.filter((item) => {
    if (categoryFilter === 'all') return true;
    return item.category === categoryFilter;
  });

  const renderOfficialLogo = (brand: RewardCatalogItem['brand']) => {
    switch (brand) {
      case 'Apple':
        return <OfficialAppleLogo className="h-8 w-8 text-white" />;
      case 'Amazon':
        return <OfficialAmazonLogo className="h-6 w-auto text-white" />;
      case 'Starbucks':
        return <OfficialStarbucksLogo className="h-9 w-9" />;
      case 'Google Play':
        return <OfficialGooglePlayLogo className="h-8 w-8" />;
      case 'Steam':
        return <OfficialSteamLogo className="h-7 w-7 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4fd]">
      {/* Floating Aesthetic Frosted Glass Nav */}
      <DashboardNav />

      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Top Wealth & Redemption Banner */}
          <div className="relative overflow-hidden rounded-[32px] bg-slate-950 p-8 sm:p-12 text-white shadow-2xl border border-slate-900">
            {/* Background Ambient Glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#793FFF]/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#B5FF24]/10 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#B5FF24] backdrop-blur-md border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-[#B5FF24] animate-pulse" />
                  <span>Instant Gift Card Exchange • Direct Voucher Delivery</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  Redeem Rewards &amp; Vouchers
                </h1>
                <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                  Convert your verified task points into digital gift cards from premier brands with immediate code generation.
                </p>
              </div>

              {/* Balance Widget */}
              <div className="shrink-0 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md min-w-[240px] text-center sm:text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Available Wallet Balance
                </span>
                <div className="mt-2 flex items-baseline justify-center sm:justify-end gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#B5FF24]">
                    {loading ? '...' : balance}
                  </span>
                  <span className="text-sm font-bold text-slate-300">PTS</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Approx. value: ${(balance * 0.01).toFixed(2)} USD
                </p>
              </div>
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

          {/* View Mode Tabs (Vouchers Catalog | Auditable Ledger | Past Redemptions) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'catalog'
                    ? 'bg-[#161616] text-white shadow-md shadow-slate-900/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                Vouchers Catalog ({CATALOG.length})
              </button>
              <button
                onClick={() => setActiveTab('redemptions')}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'redemptions'
                    ? 'bg-[#161616] text-white shadow-md shadow-slate-900/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                Past Redemptions ({redemptions.length})
              </button>
              <button
                onClick={() => setActiveTab('ledger')}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'ledger'
                    ? 'bg-[#161616] text-white shadow-md shadow-slate-900/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                Ledger History ({ledger.length})
              </button>
            </div>

            {/* Category Filter Pills (When on Catalog tab) */}
            {activeTab === 'catalog' && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: 'all', label: 'All Brands' },
                  { id: 'tech', label: 'Apple' },
                  { id: 'shopping', label: 'Amazon' },
                  { id: 'coffee', label: 'Starbucks' },
                  { id: 'gaming', label: 'Gaming' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold transition cursor-pointer ${
                      categoryFilter === cat.id
                        ? 'bg-[#793FFF] text-white shadow-xs'
                        : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300/70'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= TAB 1: PREMIUM DIGITAL VOUCHER CARDS ================= */}
          {activeTab === 'catalog' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCatalog.map((item) => {
                const canAfford = balance >= item.points;
                const progressPct = Math.min(100, Math.round((balance / item.points) * 100));

                return (
                  <div
                    key={item.id}
                    className="group relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Realistic Digital Gift Card Mockup */}
                      <div
                        className={`h-48 rounded-2xl bg-gradient-to-br ${item.cardBg} p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]`}
                      >
                        {/* Card Specular Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                        {/* Top: Official Brand Logo & Badge */}
                        <div className="relative z-10 flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {renderOfficialLogo(item.brand)}
                          </div>
                          <span className="rounded-full bg-white/15 px-3 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white backdrop-blur-xs border border-white/20">
                            {item.badge}
                          </span>
                        </div>

                        {/* Middle: Realistic Metallic Chip Accent */}
                        <div className="relative z-10 my-auto">
                          <div className="h-7 w-9 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 opacity-70 shadow-xs flex items-center justify-center">
                            <div className="h-4 w-6 border border-amber-800/40 rounded-xs" />
                          </div>
                        </div>

                        {/* Bottom: Denomination & Brand Name */}
                        <div className="relative z-10 flex items-end justify-between">
                          <div>
                            <span className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase block">
                              Digital Voucher
                            </span>
                            <span className="text-xl font-black text-white tracking-tight">
                              {item.value}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-white/80">
                            {item.brand}
                          </span>
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="mt-5 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-slate-950">
                            {item.name}
                          </h3>
                          <span className="rounded-full bg-[#161616] px-3 py-1 text-xs font-black text-white">
                            {item.points} PTS
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Redemption Action / Progress */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      {canAfford ? (
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => setRedeemingItem(item)}
                          className="w-full rounded-full bg-[#161616] hover:bg-[#793FFF] py-3.5 px-4 text-xs font-bold text-white shadow-md shadow-slate-900/10 hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Redeem Voucher Now</span>
                          <span>→</span>
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-500">Progress</span>
                            <span className="text-[#793FFF]">{balance} / {item.points} PTS ({progressPct}%)</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#793FFF] to-[#B5FF24] transition-all duration-500"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                          <p className="text-[11px] text-slate-400 text-center font-medium">
                            Need {item.points - balance} more points to redeem
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= TAB 2: PAST REDEMPTIONS (With Official Logos & Copy Code) ================= */}
          {activeTab === 'redemptions' && (
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="p-6 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Your Redeemed Vouchers</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    All digital gift card codes are permanently recorded in your private ledger.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  {redemptions.length} Issued
                </span>
              </div>

              {redemptions.length === 0 ? (
                <div className="p-16 text-center space-y-3">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">No Vouchers Redeemed Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Once you redeem a reward from the catalog, your digital voucher code will appear here instantly.
                  </p>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="mt-2 rounded-full bg-[#793FFF] px-5 py-2 text-xs font-bold text-white hover:bg-[#682FF8] transition cursor-pointer"
                  >
                    Explore Catalog
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {redemptions.map((redemption) => {
                    // Generate a simulated stable clean voucher code representation based on redemption id
                    const mockCode = `VCHR-${redemption.id.slice(0, 4).toUpperCase()}-${redemption.id.slice(4, 8).toUpperCase()}-${redemption.id.slice(8, 12).toUpperCase()}`;
                    const isCopied = copiedCodeId === redemption.id;

                    return (
                      <div
                        key={redemption.id}
                        className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xs">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="2" y="5" width="20" height="14" rx="2" />
                              <line x1="2" y1="10" x2="22" y2="10" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">
                              {redemption.reward_type}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Issued on {new Date(redemption.created_at).toLocaleDateString()} at{' '}
                              {new Date(redemption.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <span className="text-xs font-bold text-rose-600">
                              -{redemption.points} PTS
                            </span>
                          </div>
                        </div>

                        {/* Voucher Code Box */}
                        <div className="flex items-center gap-3">
                          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-2 font-mono text-xs font-bold text-slate-800">
                            {mockCode}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(mockCode, redemption.id)}
                            className={`rounded-full px-4 py-2 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                              isCopied
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#161616] text-white hover:bg-[#793FFF]'
                            }`}
                          >
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: AUDITABLE LEDGER HISTORY ================= */}
          {activeTab === 'ledger' && (
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="p-6 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Tamper-Proof Transaction Ledger
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Immutable append-only record of all credits and debits on your account.
                  </p>
                </div>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-[#793FFF]">
                  {ledger.length} Transactions
                </span>
              </div>

              {ledger.length === 0 ? (
                <div className="p-16 text-center text-xs sm:text-sm text-slate-500">
                  No transaction history recorded yet. Complete speed quizzes, watch videos, or rate AI to earn points.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-6">Timestamp</th>
                        <th className="py-3.5 px-6">Earning Channel / Activity</th>
                        <th className="py-3.5 px-6 text-right">Points Delta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {ledger.map((entry) => (
                        <tr key={entry.id} className="hover:bg-slate-50/60 transition">
                          <td className="py-4 px-6 text-slate-500 text-xs">
                            {new Date(entry.created_at).toLocaleString()}
                          </td>
                          <td className="py-4 px-6 font-semibold text-slate-900">
                            {entry.reason}
                          </td>
                          <td
                            className={`py-4 px-6 text-right font-black ${
                              entry.amount > 0 ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {entry.amount > 0 ? `+${entry.amount}` : entry.amount} PTS
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================= CONFIRMATION MODAL WITH OFFICIAL BRAND LOGO ================= */}
          {redeemingItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-in fade-in duration-150">
              <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-slate-200">
                <div className="text-center">
                  {/* Digital Card Preview inside Modal */}
                  <div className={`mx-auto h-28 w-48 rounded-2xl bg-gradient-to-br ${redeemingItem.cardBg} p-4 text-white flex flex-col justify-between shadow-xl relative overflow-hidden`}>
                    <div className="flex items-center justify-between">
                      {renderOfficialLogo(redeemingItem.brand)}
                      <span className="text-[10px] font-bold text-white/80">{redeemingItem.value}</span>
                    </div>
                    <span className="text-xs font-bold text-left">{redeemingItem.name}</span>
                  </div>

                  <h3 className="mt-6 text-xl font-black text-slate-950">
                    Confirm Redemption
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600">
                    You are redeeming <strong>{redeemingItem.points} PTS</strong> for an official <strong>{redeemingItem.name}</strong> digital code.
                  </p>

                  <div className="mt-5 rounded-2xl bg-[#793FFF]/8 p-4 text-xs text-[#793FFF] text-left border border-[#793FFF]/20">
                    <strong>Instant Delivery:</strong> Your code will be generated immediately and archived in your Past Redemptions list.
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setRedeemingItem(null)}
                    className="flex-1 rounded-full bg-slate-100 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleRedeem(redeemingItem)}
                    className="flex-1 rounded-full bg-[#161616] hover:bg-[#793FFF] py-3.5 text-xs font-bold text-white transition shadow-lg shadow-slate-900/20 cursor-pointer"
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Redemption'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
