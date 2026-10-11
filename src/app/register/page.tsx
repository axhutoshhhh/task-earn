'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import AuthLayoutWrapper from '@/components/AuthLayoutWrapper';

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

  const supabase = useMemo(() => createClient(), []);

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

    // If session is already created (e.g. email confirmation disabled), go directly to dashboard
    if (data.session) {
      window.location.replace('/dashboard');
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-transparent p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#793FFF] border-r-transparent" />
          <p className="text-xs font-bold text-slate-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <AuthLayoutWrapper
        title="Account Created"
        subtitle="Verification link sent to your inbox"
        footerText="Ready to log in?"
        footerLinkText="Sign in now"
        footerLinkHref="/login"
      >
        <div className="text-center space-y-4 py-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-xs">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-950">Registration Successful</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Please check your email inbox to verify your account, or sign in directly to your dashboard.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#161616] hover:bg-[#793FFF] py-4 px-6 text-sm font-bold text-white shadow-xl hover:shadow-2xl transition cursor-pointer"
            >
              Proceed to Sign In →
            </Link>
          </div>
        </div>
      </AuthLayoutWrapper>
    );
  }

  return (
    <AuthLayoutWrapper
      title="Create Free Account"
      subtitle="Join TaskEarn to test speed quizzes & earn rewards"
      error={error}
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <label htmlFor="reg-name" className="block text-xs font-bold text-slate-700 mb-1.5">
            Display Name
          </label>
          <input
            id="reg-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex"
            className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/15 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-xs font-bold text-slate-700 mb-1.5">
            Email Address
          </label>
          <input
            id="reg-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/15 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label htmlFor="reg-password" className="block text-xs font-bold text-slate-700 mb-1.5">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/15 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label htmlFor="reg-confirm" className="block text-xs font-bold text-slate-700 mb-1.5">
            Confirm Password
          </label>
          <input
            id="reg-confirm"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat your password"
            className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/15 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <input
            id="terms"
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded-sm border-slate-300 text-[#793FFF] focus:ring-[#793FFF] cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-slate-600 leading-snug cursor-pointer">
            I agree to the{' '}
            <Link href="/terms" className="text-[#793FFF] hover:text-[#682FF8] hover:underline font-bold transition">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#793FFF] hover:text-[#682FF8] hover:underline font-bold transition">
              Privacy Policy
            </Link>
            .
          </label>
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
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </form>
    </AuthLayoutWrapper>
  );
}
