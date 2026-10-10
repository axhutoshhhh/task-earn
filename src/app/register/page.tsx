'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (isMounted) {
        if (user) {
          window.location.replace('/dashboard');
        } else {
          setCheckingAuth(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // If session is already created (e.g. email confirmation disabled), go directly to dashboard!
    if (data.session) {
      window.location.replace('/dashboard');
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#f7f4fd] p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#793FFF] border-r-transparent" />
          <p className="text-xs font-bold text-slate-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#f7f4fd] p-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-3xl text-emerald-600">
            ✉️
          </div>
          <h2 className="mt-4 text-2xl font-black text-slate-950">Registration Successful</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Please check your email inbox to verify your account, or sign in directly to your dashboard.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#793FFF] py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/25 hover:bg-[#682FF8] transition cursor-pointer"
            >
              Proceed to Sign In →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#f7f4fd] p-4 sm:p-8">
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
            Create Free Account
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            Join TaskEarn to test speed quizzes & earn rewards
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-300 bg-rose-50 p-3.5 text-xs sm:text-sm font-medium text-rose-700">
            ⚠️ {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Display Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#793FFF] focus:outline-none focus:ring-1 focus:ring-[#793FFF]"
            />
          </div>

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

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              placeholder="Repeat your password"
              className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#793FFF] focus:outline-none focus:ring-1 focus:ring-[#793FFF]"
            />
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded-sm border-slate-300 text-[#793FFF] focus:ring-[#793FFF]"
            />
            <label htmlFor="terms" className="text-xs text-slate-600 leading-snug">
              I agree to the{' '}
              <Link href="/terms" className="text-[#793FFF] hover:underline font-semibold">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#793FFF] hover:underline font-semibold">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 rounded-full bg-[#793FFF] py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/25 hover:bg-[#682FF8] transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-[#793FFF] hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
