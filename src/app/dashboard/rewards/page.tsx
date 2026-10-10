'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

type BrandName =
  | 'Paytm'
  | 'Google Pay'
  | 'PayPal'
  | 'Google Play'
  | 'Flipkart'
  | 'Amazon'
  | 'Apple'
  | 'Zomato'
  | 'Swiggy'
  | 'Steam'
  | 'Starbucks';

interface RewardCatalogItem {
  id: string;
  name: string;
  brand: BrandName;
  category: 'wallets' | 'ecommerce' | 'food' | 'gaming';
  value: string;
  description: string;
  points: number;
  payoutType: 'wallet' | 'upi' | 'paypal' | 'giftcard';
  inputLabel: string;
  inputPlaceholder: string;
  cardBg: string;
  accentColor: string;
  badge: string;
}

// ==========================================
// OFFICIAL VECTOR BRAND LOGOS
// ==========================================

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

function OfficialPaytmLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 28" fill="none">
      <text x="0" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="22" fill="#002970">Pay</text>
      <text x="44" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="22" fill="#00BAF2">tm</text>
    </svg>
  );
}

function OfficialGooglePayLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 32" fill="none">
      <g transform="translate(2, 2)">
        <path d="M26.8 14.2c0-.9-.1-1.8-.2-2.7H14v5.1h7.2c-.3 1.7-1.3 3.1-2.7 4.1v3.4h4.4c2.6-2.4 4.1-5.9 4.1-9.9z" fill="#4285F4" />
        <path d="M14 27.2c3.7 0 6.7-1.2 9-3.3l-4.4-3.4c-1.2.8-2.8 1.3-4.6 1.3-3.5 0-6.5-2.4-7.6-5.6H1.8v3.5c2.3 4.6 7 7.5 12.2 7.5z" fill="#34A853" />
        <path d="M6.4 16.2c-.3-.9-.4-1.8-.4-2.8s.1-1.9.4-2.8V7.1H1.8C.6 9.4 0 11.9 0 14.6s.6 5.2 1.8 7.5l4.6-3.6v-2.3z" fill="#FBBC05" />
        <path d="M14 5.8c2 0 3.8.7 5.2 2l3.9-3.9C20.7 1.8 17.7.8 14 .8 8.8.8 4.1 3.7 1.8 8.3l4.6 3.6c1.1-3.2 4.1-6.1 7.6-6.1z" fill="#EA4335" />
      </g>
      <text x="35" y="22" fontFamily="sans-serif" fontWeight="800" fontSize="18" fill="currentColor">Pay</text>
    </svg>
  );
}

function OfficialPaypalLogo({ className = 'h-7 w-auto' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 32" fill="none">
      <path d="M12.5 4H6.2c-.6 0-1.1.4-1.2 1L2 24.8c-.1.5.3 1 .9 1h4.2l1.1-6.8h2.3c4.8 0 8.3-2.6 9-7.4.4-2.4-.2-4.4-1.6-5.7C16.6 4.7 14.7 4 12.5 4z" fill="#003087" />
      <path d="M15.8 10.8c-.4 2.4-2.2 4.2-4.6 4.2h-2.1l-1.4 8.8h3.3c.5 0 1-.4 1.1-.9l.9-5.7h1.4c3.8 0 6.6-2 7.1-5.8.3-1.9-.1-3.5-1.2-4.5-.4 1.8-1.9 3.4-4.5 3.9z" fill="#0079C1" />
      <text x="32" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill="#003087">Pay</text>
      <text x="61" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill="#0079C1">Pal</text>
    </svg>
  );
}

function OfficialFlipkartLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 130 32" fill="none">
      <rect x="0" y="2" width="28" height="28" rx="6" fill="#FFE11B" />
      <path d="M16 8h-4.5c-2.5 0-3.5 1.5-3.5 3.5V23h4v-7h3.5v-3H12v-1.5c0-.8.4-1.2 1.2-1.2H16V8z" fill="#2874F0" />
      <text x="34" y="22" fontFamily="sans-serif" fontStyle="italic" fontWeight="900" fontSize="18" fill="#2874F0">Flipkart</text>
    </svg>
  );
}

function OfficialGooglePlayLogo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#00E676" />
      <path d="M47 36.1C41.4 46.4 38 59.4 38 74.4v363.2c0 15 3.4 28 9 38.3L275.6 256 47 36.1z" fill="#00B0FF" />
      <path d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z" fill="#FF3D00" />
      <path d="M466 237.2l-80.6-46.3-60.1 65.1 60.1 65.1 80.6-46.3c23-13.2 23-34.4 0-47.6z" fill="#FFD600" />
    </svg>
  );
}

function OfficialZomatoLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 32" fill="none">
      <rect width="110" height="32" rx="7" fill="#E23744" />
      <text x="12" y="22" fontFamily="sans-serif" fontStyle="italic" fontWeight="900" fontSize="19" fill="#FFFFFF">zomato</text>
    </svg>
  );
}

function OfficialSwiggyLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#FC8019" />
      <path d="M19 11c0-1.7-1.3-3-3-3-2 0-3.5 1.5-3.5 3.5 0 3 4.5 3 4.5 6 0 1.5-1.2 2.5-2.7 2.5-1.5 0-2.8-.8-3.3-2.2l-1.5.8c.8 2 2.7 3.2 4.8 3.2 2.6 0 4.5-1.8 4.5-4.2 0-3.3-4.5-3.3-4.5-6.2 0-.8.7-1.5 1.7-1.5 1 0 1.7.5 2 1.3l1.5-.7z" fill="#FFFFFF" />
      <text x="36" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="17" fill="#FC8019" letterSpacing="0.5">SWIGGY</text>
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

function OfficialStarbucksLogo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="48" fill="#006241" />
      <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="1.5" />
      <path d="M50 18l3 6.5 7.2 1-5.2 5.1 1.2 7.1L50 34.2l-6.2 3.5 1.2-7.1-5.2-5.1 7.2-1L50 18z" fill="white" />
      <circle cx="34" cy="46" r="2.5" fill="white" />
      <circle cx="66" cy="46" r="2.5" fill="white" />
      <path d="M44 40h12v6c0 3.3-2.7 6-6 6s-6-2.7-6-6v-6z" fill="white" />
      <path d="M32 58c4-3 10-4 18-4s14 1 18 4c0 0-4 11-18 11s-18-11-18-11z" fill="white" />
      <path d="M26 42c0 8 4 16 10 20-3 3-8 5-14 3 0 0 1-13 4-23z" fill="white" />
      <path d="M74 42c0 8-4 16-10 20 3 3 8 5 14 3 0 0-1-13-4-23z" fill="white" />
    </svg>
  );
}

// ==========================================
// CATALOG (10 Points = 1 Rupee -> 1,000 Points = ₹100 INR)
// ==========================================

const CATALOG: RewardCatalogItem[] = [
  {
    id: 'paytm_wallet_100',
    name: 'Paytm Wallet ₹100',
    brand: 'Paytm',
    category: 'wallets',
    value: '₹100.00 INR',
    description: 'Instant ₹100 direct transfer to your Paytm Wallet. Credited directly within 24 hours.',
    points: 1000,
    payoutType: 'wallet',
    inputLabel: 'Enter 10-Digit Paytm Mobile Number',
    inputPlaceholder: 'e.g. 8302072636',
    cardBg: 'from-[#002970] via-[#003893] to-[#001D52]',
    accentColor: '#00BAF2',
    badge: 'Direct Wallet',
  },
  {
    id: 'gpay_upi_100',
    name: 'Google Pay (G Pay) ₹100',
    brand: 'Google Pay',
    category: 'wallets',
    value: '₹100.00 INR',
    description: 'Direct UPI payment sent straight to your Google Pay linked bank account.',
    points: 1000,
    payoutType: 'upi',
    inputLabel: 'Enter your Google Pay UPI ID / VPA',
    inputPlaceholder: 'e.g. username@okhdfcbank or 8302072636@paytm',
    cardBg: 'from-[#1A237E] via-[#283593] to-[#0D1240]',
    accentColor: '#4285F4',
    badge: 'Instant UPI',
  },
  {
    id: 'paypal_usd_1',
    name: 'PayPal $1.00 USD Payout',
    brand: 'PayPal',
    category: 'wallets',
    value: '$1.00 USD',
    description: 'Direct global payout of $1.00 USD sent straight to your verified PayPal account.',
    points: 1000,
    payoutType: 'paypal',
    inputLabel: 'Enter your PayPal Account Email ID',
    inputPlaceholder: 'e.g. axhutoshhhh@gmail.com',
    cardBg: 'from-[#003087] via-[#004EA8] to-[#001F5B]',
    accentColor: '#0079C1',
    badge: 'Global Payout',
  },
  {
    id: 'google_play_100',
    name: 'Google Play Store ₹100 Code',
    brand: 'Google Play',
    category: 'gaming',
    value: '₹100.00 INR',
    description: 'Official 16-character Google Play Store redeem code for apps, books, and in-game diamonds.',
    points: 1000,
    payoutType: 'giftcard',
    inputLabel: 'Delivery Email Address',
    inputPlaceholder: 'e.g. axhutoshhhh@gmail.com',
    cardBg: 'from-[#0D1B2A] via-[#1B263B] to-[#060D17]',
    accentColor: '#00E676',
    badge: 'Play Store Official',
  },
  {
    id: 'flipkart_card_100',
    name: 'Flipkart Gift Card ₹100',
    brand: 'Flipkart',
    category: 'ecommerce',
    value: '₹100.00 INR',
    description: 'Official Flipkart Gift Card voucher code with secure PIN. Valid across all Flipkart shopping.',
    points: 1000,
    payoutType: 'giftcard',
    inputLabel: 'Delivery Email Address',
    inputPlaceholder: 'e.g. axhutoshhhh@gmail.com',
    cardBg: 'from-[#1C3FAA] via-[#2874F0] to-[#122A72]',
    accentColor: '#FFE11B',
    badge: 'E-Commerce',
  },
  {
    id: 'amazon_card_100',
    name: 'Amazon Pay Gift Card ₹100',
    brand: 'Amazon',
    category: 'ecommerce',
    value: '₹100.00 INR',
    description: 'Add ₹100 directly to your Amazon Pay wallet for mobile recharges, utility bills, and shopping.',
    points: 1000,
    payoutType: 'giftcard',
    inputLabel: 'Delivery Email Address',
    inputPlaceholder: 'e.g. axhutoshhhh@gmail.com',
    cardBg: 'from-[#19222D] via-[#232F3E] to-[#131A22]',
    accentColor: '#FF9900',
    badge: 'Amazon Pay',
  },
  {
    id: 'apple_card_100',
    name: 'Apple Gift Card ₹100',
    brand: 'Apple',
    category: 'gaming',
    value: '₹100.00 INR',
    description: 'Official Apple redeem code for App Store purchases, iCloud+ storage, Apple Music, and games.',
    points: 1000,
    payoutType: 'giftcard',
    inputLabel: 'Delivery Email Address',
    inputPlaceholder: 'e.g. axhutoshhhh@gmail.com',
    cardBg: 'from-[#2A2B32] via-[#1E1F24] to-[#121316]',
    accentColor: '#FFFFFF',
    badge: 'Apple Official',
  },
  {
    id: 'zomato_voucher_100',
    name: 'Zomato Food Voucher ₹100',
    brand: 'Zomato',
    category: 'food',
    value: '₹100.00 INR',
    description: 'Instant ₹100 digital voucher for your next delicious food delivery order across India.',
    points: 1000,
    payoutType: 'giftcard',
    inputLabel: 'Delivery Email Address',
    inputPlaceholder: 'e.g. axhutoshhhh@gmail.com',
    cardBg: 'from-[#B71C1C] via-[#E23744] to-[#7F0000]',
    accentColor: '#FFFFFF',
    badge: 'Food Delivery',
  },
  {
    id: 'swiggy_voucher_100',
    name: 'Swiggy Money Voucher ₹100',
    brand: 'Swiggy',
    category: 'food',
    value: '₹100.00 INR',
    description: 'Official Swiggy Money credit code for food orders, Instamart groceries, and Dineout.',
    points: 1000,
    payoutType: 'giftcard',
    inputLabel: 'Delivery Email Address',
    inputPlaceholder: 'e.g. axhutoshhhh@gmail.com',
    cardBg: 'from-[#D95300] via-[#FC8019] to-[#993A00]',
    accentColor: '#FFFFFF',
    badge: 'Instamart & Food',
  },
  {
    id: 'steam_wallet_100',
    name: 'Steam Wallet ₹100 Code',
    brand: 'Steam',
    category: 'gaming',
    value: '₹100.00 INR',
    description: 'Official Steam wallet Indian Rupee gift voucher to add funds directly to your PC gaming wallet.',
    points: 1000,
    payoutType: 'giftcard',
    inputLabel: 'Delivery Email Address',
    inputPlaceholder: 'e.g. axhutoshhhh@gmail.com',
    cardBg: 'from-[#171A21] via-[#1B2838] to-[#101217]',
    accentColor: '#66C0F4',
    badge: 'PC Gaming',
  },
  {
    id: 'starbucks_card_100',
    name: 'Starbucks e-Gift Card ₹100',
    brand: 'Starbucks',
    category: 'food',
    value: '₹100.00 INR',
    description: 'Official Starbucks India beverage digital voucher for any participating cafe across India.',
    points: 1000,
    payoutType: 'giftcard',
    inputLabel: 'Delivery Email Address',
    inputPlaceholder: 'e.g. axhutoshhhh@gmail.com',
    cardBg: 'from-[#00462A] via-[#006241] to-[#01351E]',
    accentColor: '#006241',
    badge: 'Cafe & Beverage',
  },
];

export default function RewardsPage() {
  const [balance, setBalance] = useState<number>(0);
  const [ledger, setLedger] = useState<LedgerItem[]>([]);
  const [redemptions, setRedemptions] = useState<RedemptionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'catalog' | 'redemptions' | 'ledger'>('catalog');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [redeemingItem, setRedeemingItem] = useState<RewardCatalogItem | null>(null);
  const [payoutInput, setPayoutInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successRedemption, setSuccessRedemption] = useState<{
    itemName: string;
    code: string;
    account: string;
  } | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);

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

  const handleOpenRedeemModal = (item: RewardCatalogItem) => {
    setRedeemingItem(item);
    setPayoutInput('');
    setError(null);
  };

  const handleConfirmRedeem = async () => {
    if (!redeemingItem) return;

    if (redeemingItem.payoutType === 'wallet' && !payoutInput.trim()) {
      setError('Please provide your 10-digit Paytm mobile number.');
      return;
    }
    if (redeemingItem.payoutType === 'upi' && !payoutInput.trim()) {
      setError('Please provide your valid Google Pay UPI ID.');
      return;
    }
    if (redeemingItem.payoutType === 'paypal' && !payoutInput.trim()) {
      setError('Please provide your PayPal account email address.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/rewards/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rewardType: redeemingItem.name,
          points: redeemingItem.points,
          accountDetails: payoutInput.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Redemption failed.');
      }

      setBalance(data.newBalance);
      if (data.redemption) {
        setRedemptions((prev) => [data.redemption, ...prev]);
      } else {
        fetchBalanceAndHistory();
      }

      setSuccessRedemption({
        itemName: redeemingItem.name,
        code: data.voucherCode,
        account: payoutInput.trim() || 'Direct Digital Voucher Delivery',
      });
      setRedeemingItem(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Redemption error occurred.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const renderBrandLogo = (brand: BrandName, className?: string) => {
    switch (brand) {
      case 'Apple':
        return <OfficialAppleLogo className={className || 'h-7 w-7 text-white'} />;
      case 'Amazon':
        return <OfficialAmazonLogo className={className || 'h-6 w-auto text-white'} />;
      case 'Paytm':
        return <OfficialPaytmLogo className={className || 'h-6 w-auto'} />;
      case 'Google Pay':
        return <OfficialGooglePayLogo className={className || 'h-6 w-auto text-white'} />;
      case 'PayPal':
        return <OfficialPaypalLogo className={className || 'h-6 w-auto'} />;
      case 'Flipkart':
        return <OfficialFlipkartLogo className={className || 'h-6 w-auto'} />;
      case 'Google Play':
        return <OfficialGooglePlayLogo className={className || 'h-7 w-7'} />;
      case 'Zomato':
        return <OfficialZomatoLogo className={className || 'h-6 w-auto'} />;
      case 'Swiggy':
        return <OfficialSwiggyLogo className={className || 'h-6 w-auto'} />;
      case 'Steam':
        return <OfficialSteamLogo className={className || 'h-7 w-7 text-white'} />;
      case 'Starbucks':
        return <OfficialStarbucksLogo className={className || 'h-8 w-8'} />;
    }
  };

  const filteredCatalog =
    categoryFilter === 'all'
      ? CATALOG
      : CATALOG.filter((item) => item.category === categoryFilter);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Top Wealth & Redemption Banner */}
        <div className="relative overflow-hidden rounded-[32px] bg-slate-950 p-8 sm:p-12 text-white shadow-2xl border border-slate-900">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#793FFF]/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#B5FF24]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#B5FF24] backdrop-blur-md border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-[#B5FF24] animate-pulse" />
                  <span>Instant Gift Cards &bull; Direct Wallet Payouts</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSupportModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-xs font-semibold text-slate-200 transition border border-white/10 cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5 text-[#B5FF24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>Help &amp; Support</span>
                </button>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Redeem Rewards &amp; Payouts
              </h1>
              <p className="max-w-xl text-xs sm:text-sm text-slate-400">
                Convert your verified task points into direct Paytm wallet transfers, Google Pay UPI, PayPal cash, and official digital gift card vouchers.
              </p>
            </div>

            {/* Live Wallet Balance Box */}
            <div className="flex flex-col rounded-3xl bg-white/5 p-6 backdrop-blur-xl border border-white/10 shrink-0 min-w-[240px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Available Wallet Balance
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-[#B5FF24]">
                  {loading ? '...' : balance}
                </span>
                <span className="text-sm font-bold text-slate-400">PTS</span>
              </div>
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">Estimated Value:</span>
                <span className="font-bold text-white">
                  ₹{((balance || 0) / 10).toFixed(2)} INR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TRUST, CONVERSION FACTOR & GUARANTEE STRIP */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Transparent Conversion Factor (10 Points = 1 Rupee) */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF] border border-[#793FFF]/20">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-900">10 Points = ₹1.00 INR</span>
                <span className="rounded-full bg-[#793FFF]/10 px-2 py-0.5 text-[10px] font-bold text-[#793FFF]">
                  Fixed Parity
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Zero hidden fees. 1,000 Points = ₹100 direct payout.
              </p>
            </div>
          </div>

          {/* 2. Beautiful Green Verified Tick (100% Safe & Genuine Payout) */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-50/50 to-white border border-emerald-200 p-5 shadow-xs flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/25">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-emerald-950">100% Safe &amp; Genuine Payout</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs text-emerald-800 font-medium mt-0.5">
                Direct UPI, Paytm Wallet &amp; Official Authorized Codes.
              </p>
            </div>
          </div>

          {/* 3. 24-Hour SLA Guarantee */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 border border-blue-500/20">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-900">Withdrawals Within 24 Hours</span>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                  Fast SLA
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Guaranteed payout disbursement within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-600 hover:text-rose-950 font-bold ml-4 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>Vouchers &amp; Payouts Catalog</span>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-white">
                {CATALOG.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('redemptions')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'redemptions'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>Redemption History</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                activeTab === 'redemptions' ? 'bg-[#B5FF24] text-slate-950' : 'bg-slate-100 text-slate-700'
              }`}>
                {redemptions.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ledger')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'ledger'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>Ledger Activity</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">
                {ledger.length}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowSupportModal(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-bold text-[#793FFF] hover:text-[#682FF8] bg-[#793FFF]/10 hover:bg-[#793FFF]/20 px-3.5 py-1.5 rounded-full transition cursor-pointer"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Need Help with Payouts?</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: CATALOG VIEW */}
        {/* ========================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'All Rewards (11)', value: 'all' },
                { label: 'Wallets & UPI (3)', value: 'wallets' },
                { label: 'E-Commerce (2)', value: 'ecommerce' },
                { label: 'Food & Dining (3)', value: 'food' },
                { label: 'Tech & Gaming (3)', value: 'gaming' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setCategoryFilter(tab.value)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                    categoryFilter === tab.value
                      ? 'bg-[#793FFF] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalog.map((item) => {
                const canAfford = balance >= item.points;
                const progressPct = Math.min(100, Math.round((balance / item.points) * 100));

                return (
                  <div
                    key={item.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-slate-300"
                  >
                    <div>
                      {/* Realistic Digital Voucher Card Graphic */}
                      <div
                        className={`relative aspect-[1.65/1] w-full overflow-hidden rounded-2xl bg-gradient-to-tr ${item.cardBg} p-5 text-white shadow-md flex flex-col justify-between`}
                      >
                        {/* Metallic microchip & Official Brand Logo */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {renderBrandLogo(item.brand)}
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                              {item.badge}
                            </span>
                          </div>

                          {/* EMV Gold Microchip Vector */}
                          <div className="h-6 w-8 rounded-sm bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-200/50 p-0.5 shadow-xs">
                            <div className="h-full w-full border border-amber-700/30 rounded-xs flex flex-col justify-between py-0.5 px-1">
                              <div className="h-[1px] bg-amber-800/40" />
                              <div className="h-[1px] bg-amber-800/40" />
                            </div>
                          </div>
                        </div>

                        {/* Card Center: Denomination */}
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-white/60">
                            Guaranteed Value
                          </span>
                          <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {item.value}
                          </p>
                        </div>

                        {/* Card Footer: Brand watermark & points badge */}
                        <div className="flex items-center justify-between text-xs text-white/80 pt-1 border-t border-white/10">
                          <span className="font-mono text-[10px] tracking-wider uppercase">
                            Official Voucher
                          </span>
                          <span className="font-bold text-[#B5FF24]">
                            {item.points.toLocaleString()} PTS
                          </span>
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="mt-5 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base font-black text-slate-950">
                            {item.name}
                          </h3>
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700 shrink-0">
                            {item.points.toLocaleString()} Pts
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Action & Progress Bar */}
                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                      {!canAfford && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                            <span>Progress to Unlock</span>
                            <span>{progressPct}% ({balance} / {item.points} pts)</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-[#793FFF] transition-all duration-500"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleOpenRedeemModal(item)}
                        className={`w-full rounded-full py-3 px-4 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          canAfford
                            ? 'bg-[#161616] text-[#B5FF24] hover:bg-slate-900 shadow-md shadow-slate-900/10'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {canAfford ? (
                          <>
                            <span>Redeem {item.value} Now</span>
                            <span>&rarr;</span>
                          </>
                        ) : (
                          <>
                            <span>Need {item.points - balance} More Points</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: REDEMPTION HISTORY (FULLY FUNCTIONAL) */}
        {/* ========================================================= */}
        {activeTab === 'redemptions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Your Redemption History
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Track your payout status, voucher codes, and direct wallet disbursements.
                </p>
              </div>

              <div className="rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>24-Hour Payout Guarantee SLA Active</span>
              </div>
            </div>

            {redemptions.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-4 shadow-xs">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF]">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  No Past Redemptions Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You haven&apos;t redeemed any rewards yet. Accumulate 1,000 points to redeem ₹100 directly to Paytm, Google Pay UPI, or digital gift vouchers.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('catalog')}
                  className="rounded-full bg-[#793FFF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#682FF8] transition cursor-pointer"
                >
                  Browse Rewards Catalog &rarr;
                </button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="py-4 px-6">Reward &amp; Brand</th>
                        <th className="py-4 px-6">Destination / Voucher Code</th>
                        <th className="py-4 px-6">Points Deducted</th>
                        <th className="py-4 px-6">Payout Status</th>
                        <th className="py-4 px-6">Date Requested</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {redemptions.map((red) => {
                        // Extract voucher code inside parenthesis if present
                        const codeMatch = red.reward_type.match(/\(([^)]+)\)/);
                        const voucherCode = codeMatch ? codeMatch[1] : `TE-${red.id.substring(0, 8).toUpperCase()}`;
                        const isCopied = copiedCodeId === red.id;

                        return (
                          <tr key={red.id} className="hover:bg-slate-50/60 transition">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white p-1 shrink-0">
                                  <svg className="h-4 w-4 text-[#B5FF24]" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-950 block">
                                    {red.reward_type.split(' (')[0]}
                                  </span>
                                  <span className="text-[11px] text-slate-400">
                                    Ref ID: #{red.id.substring(0, 8)}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <code className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-bold text-slate-900 border border-slate-200">
                                  {voucherCode}
                                </code>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(voucherCode, red.id)}
                                  className="rounded-lg bg-slate-100 hover:bg-slate-200 p-1.5 text-slate-600 transition cursor-pointer"
                                  title="Copy Code"
                                >
                                  {isCopied ? (
                                    <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  ) : (
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </td>

                            <td className="py-4 px-6 font-mono font-bold text-slate-950">
                              -{red.points.toLocaleString()} PTS
                            </td>

                            <td className="py-4 px-6">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                <span>Completed &bull; 24h Verified</span>
                              </span>
                            </td>

                            <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                              {new Date(red.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: LEDGER ACTIVITY */}
        {/* ========================================================= */}
        {activeTab === 'ledger' && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-950">
              Reward Ledger History
            </h2>

            {ledger.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-xs">
                No ledger transactions recorded yet.
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-4 px-6">Activity &amp; Task Reason</th>
                      <th className="py-4 px-6">Points Delta</th>
                      <th className="py-4 px-6">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {ledger.map((item) => {
                      const isCredit = item.amount > 0;
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition">
                          <td className="py-4 px-6 font-medium text-slate-900">
                            {item.reason}
                          </td>
                          <td className={`py-4 px-6 font-mono font-bold ${
                            isCredit ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {isCredit ? `+${item.amount}` : item.amount} PTS
                          </td>
                          <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                            {new Date(item.created_at).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* REDEMPTION MODAL */}
      {/* ========================================================= */}
      {redeemingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white p-1">
                  {renderBrandLogo(redeemingItem.brand, 'h-6 w-auto')}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950">
                    Redeem {redeemingItem.name}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Guaranteed Payout Value: {redeemingItem.value}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setRedeemingItem(null)}
                className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Check Affordability */}
            {balance < redeemingItem.points ? (
              <div className="space-y-4">
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 space-y-2">
                  <span className="font-bold block">Insufficient Balance</span>
                  <p>
                    You have <strong>{balance} Points</strong>, but this reward requires <strong>{redeemingItem.points} Points</strong> (₹100).
                  </p>
                  <p className="text-amber-700">
                    You need <strong>{redeemingItem.points - balance} more points</strong> to complete this payout.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Fast ways to earn remaining points:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Link
                      href="/dashboard/quiz"
                      className="rounded-xl border border-slate-200 p-3 hover:border-[#793FFF] transition block bg-slate-50"
                    >
                      <span className="font-bold text-slate-900 block">Speed Quizzes</span>
                      <span className="text-[11px] text-[#793FFF]">+10 Pts per answer</span>
                    </Link>
                    <Link
                      href="/dashboard/watch"
                      className="rounded-xl border border-slate-200 p-3 hover:border-[#793FFF] transition block bg-slate-50"
                    >
                      <span className="font-bold text-slate-900 block">Watch Videos</span>
                      <span className="text-[11px] text-[#793FFF]">+30 Pts per session</span>
                    </Link>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRedeemingItem(null)}
                  className="w-full rounded-full bg-slate-950 py-3 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  Close &amp; Keep Earning
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Payout Input Form */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {redeemingItem.inputLabel}
                  </label>
                  <input
                    type="text"
                    value={payoutInput}
                    onChange={(e) => setPayoutInput(e.target.value)}
                    placeholder={redeemingItem.inputPlaceholder}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-900 focus:border-[#793FFF] focus:outline-none focus:ring-2 focus:ring-[#793FFF]/20"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Your withdrawal request will be processed and disbursed within 24 hours.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Reward Value:</span>
                    <span className="font-bold text-slate-900">{redeemingItem.value}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Points to Deduct:</span>
                    <span className="font-bold text-rose-600">-{redeemingItem.points} PTS</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-slate-900 font-bold">
                    <span>Remaining Balance:</span>
                    <span>{balance - redeemingItem.points} PTS</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRedeemingItem(null)}
                    className="flex-1 rounded-full border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmRedeem}
                    disabled={isSubmitting}
                    className="flex-1 rounded-full bg-[#161616] py-2.5 text-xs font-bold text-[#B5FF24] hover:bg-slate-900 transition disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? 'Processing Payout...' : 'Confirm & Redeem ₹100'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUCCESS CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {successRedemption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 text-center animate-in fade-in zoom-in-95">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-700">
                100% Genuine Payout Confirmed
              </span>
              <h3 className="mt-3 text-xl font-black text-slate-950">
                Redemption Successful!
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Your payout request for <strong>{successRedemption.itemName}</strong> has been logged and registered.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Tracking / Voucher Reference
              </span>
              <div className="flex items-center justify-center gap-2">
                <code className="rounded-lg bg-white px-3 py-1.5 font-mono text-sm font-bold text-slate-900 border border-slate-200 shadow-xs">
                  {successRedemption.code}
                </code>
                <button
                  type="button"
                  onClick={() => copyToClipboard(successRedemption.code, 'success-code')}
                  className="rounded-lg bg-white hover:bg-slate-100 border border-slate-200 p-2 text-slate-600 transition cursor-pointer"
                  title="Copy Reference"
                >
                  {copiedCodeId === 'success-code' ? (
                    <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Destination: {successRedemption.account}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-[11px] text-blue-800 font-medium border border-blue-100">
              Withdrawal will be completed and credited within 24 hours.
            </div>

            <button
              type="button"
              onClick={() => {
                setSuccessRedemption(null);
                setActiveTab('redemptions');
              }}
              className="w-full rounded-full bg-slate-950 py-3 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
            >
              View in Redemption History &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* HELP & SUPPORT MODAL */}
      {/* ========================================================= */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#793FFF]/10 text-[#793FFF]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950">
                    24/7 Rewards &amp; Payout Support
                  </h3>
                  <span className="text-xs text-slate-500">
                    Direct assistance for your ₹100 withdrawals &amp; vouchers
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed">
                Have a question about your Paytm transfer, Google Pay UPI status, or gift voucher code? Reach out directly to our dedicated support team:
              </p>

              {/* Email Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Official Support Email
                  </span>
                  <span className="text-sm font-bold text-slate-950">
                    axhutoshhhh@gmail.com
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Average response time: &lt; 2 hours
                  </span>
                </div>
                <a
                  href="mailto:axhutoshhhh@gmail.com"
                  className="rounded-full bg-[#793FFF] px-4 py-2 text-xs font-bold text-white hover:bg-[#682FF8] transition shrink-0"
                >
                  Send Email
                </a>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Helpline &amp; WhatsApp
                  </span>
                  <span className="text-sm font-bold text-slate-950 font-mono">
                    +91 8302072636
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Direct assistance &amp; instant payout resolution
                  </span>
                </div>
                <a
                  href="tel:8302072636"
                  className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shrink-0"
                >
                  Call Now
                </a>
              </div>

              {/* Payout SLA Guarantee Box */}
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>100% Genuine &bull; 24-Hour Dispatch Guarantee</span>
                </span>
                <p className="text-[11px] text-emerald-800">
                  Every withdrawal is checked and dispatched within 24 hours. If any delay occurs, our support team immediately rectifies the disbursement.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSupportModal(false)}
              className="w-full rounded-full bg-slate-950 py-3 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
            >
              Close Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
