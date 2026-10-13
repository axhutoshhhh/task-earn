'use client';

import React, { useState, useEffect } from 'react';

interface WalletBalanceDisplayProps {
  initialBalance: number;
}

export default function WalletBalanceDisplay({ initialBalance }: WalletBalanceDisplayProps) {
  const [balance, setBalance] = useState<number>(initialBalance);

  useEffect(() => {
    setBalance(initialBalance);
  }, [initialBalance]);

  useEffect(() => {
    const fetchFreshBalance = async () => {
      try {
        const res = await fetch('/api/rewards/balance', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.balance === 'number') {
            setBalance(data.balance);
          }
        }
      } catch {
        // Keep current balance on network error
      }
    };

    // Always fetch fresh balance on mount to invalidate any stale client RSC cache
    fetchFreshBalance();

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ newBalance?: number }>;
      if (customEvent?.detail?.newBalance !== undefined) {
        setBalance(customEvent.detail.newBalance);
      } else {
        fetchFreshBalance();
      }
    };

    window.addEventListener('taskearn:balance-updated', handleUpdate);
    window.addEventListener('focus', fetchFreshBalance);

    return () => {
      window.removeEventListener('taskearn:balance-updated', handleUpdate);
      window.removeEventListener('focus', fetchFreshBalance);
    };
  }, []);

  return (
    <div className="mt-1.5 flex items-baseline gap-2">
      <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
        {balance}
      </span>
      <span className="rounded-lg bg-[#793FFF]/10 border border-[#793FFF]/20 px-2.5 py-0.5 text-xs font-black text-[#793FFF] tracking-wide">
        Points
      </span>
    </div>
  );
}
