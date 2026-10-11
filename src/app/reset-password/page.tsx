'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import AuthLayoutWrapper from '@/components/AuthLayoutWrapper';

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

  const supabase = useMemo(() => createClient(), []);

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
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-transparent p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#793FFF] border-r-transparent" />
          <p className="text-xs font-bold text-slate-500">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthLayoutWrapper
      title={user ? 'Set New Password' : 'Reset Password'}
      subtitle={user ? 'Enter your new account password below' : 'Enter your email to receive recovery instructions'}
      error={error}
      successMessage={message}
      footerText="Remembered your password?"
      footerLinkText="Back to sign in"
      footerLinkHref="/login"
    >
      {user ? (
        <form className="space-y-4" onSubmit={handleUpdatePassword}>
          <div>
            <label htmlFor="reset-new-password" className="block text-xs font-bold text-slate-700 mb-1.5">
              New Password
            </label>
            <input
              id="reset-new-password"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/15 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label htmlFor="reset-confirm-password" className="block text-xs font-bold text-slate-700 mb-1.5">
              Confirm Password
            </label>
            <input
              id="reset-confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/15 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-full bg-[#161616] hover:bg-[#793FFF] py-4 px-6 text-sm font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <span>Update Password</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={handleRequestReset}>
          <div>
            <label htmlFor="reset-email" className="block text-xs font-bold text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              id="reset-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/15 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-full bg-[#161616] hover:bg-[#793FFF] py-4 px-6 text-sm font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </AuthLayoutWrapper>
  );
}
