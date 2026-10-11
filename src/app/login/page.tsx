'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import AuthLayoutWrapper from '@/components/AuthLayoutWrapper';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let isMounted = true;

    // Immediately redirect if already authenticated
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Replace login in history so pressing 'Back' never returns to login screen
    window.location.replace('/dashboard');
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

  return (
    <AuthLayoutWrapper
      title="Welcome back"
      subtitle="Sign in to access your TaskEarn dashboard & reward wallet"
      error={error}
      footerText="Don't have an account?"
      footerLinkText="Register now"
      footerLinkHref="/register"
    >
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label htmlFor="login-email" className="block text-xs font-bold text-slate-700 mb-1.5">
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#793FFF]/15 focus:border-[#793FFF] outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-xs font-bold text-slate-700">
              Password
            </label>
            <Link
              href="/reset-password"
              className="text-xs font-bold text-[#793FFF] hover:text-[#682FF8] hover:underline transition"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="login-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
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
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
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
