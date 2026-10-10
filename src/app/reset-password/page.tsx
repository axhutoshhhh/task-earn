'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsCheckingSession(false);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage('Check your email for the password reset link.');
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage('Password updated successfully. Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
    setLoading(false);
  };

  if (isCheckingSession) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-transparent">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#793FFF] border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-transparent p-4 sm:p-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white shadow-md shadow-[#793FFF]/25">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            {user ? 'Set New Password' : 'Reset Password'}
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            {user
              ? 'Enter your new account password below'
              : 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-300 bg-rose-50 p-3.5 text-xs sm:text-sm font-medium text-rose-700 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs sm:text-sm font-medium text-emerald-700 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            <span>{message}</span>
          </div>
        )}

        {user ? (
          <form className="mt-6 space-y-4" onSubmit={handleUpdatePassword}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#793FFF] focus:outline-none focus:ring-1 focus:ring-[#793FFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#793FFF] focus:outline-none focus:ring-1 focus:ring-[#793FFF]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 rounded-full bg-[#793FFF] py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/25 hover:bg-[#682FF8] transition active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Updating Password...' : 'Update Password →'}
            </button>
          </form>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleRequestReset}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#793FFF] focus:outline-none focus:ring-1 focus:ring-[#793FFF]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 rounded-full bg-[#793FFF] py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/25 hover:bg-[#682FF8] transition active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Sending Link...' : 'Send Reset Link →'}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
          Remembered your password?{' '}
          <Link href="/login" className="font-bold text-[#793FFF] hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
