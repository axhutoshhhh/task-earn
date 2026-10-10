'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

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

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#f7f4fd] p-4 sm:p-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white shadow-md shadow-[#793FFF]/25">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Sign in to access your TaskEarn dashboard
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-300 bg-rose-50 p-3.5 text-xs sm:text-sm font-medium text-rose-700">
            ⚠️ {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address
            </label>
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
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <Link
                href="/reset-password"
                className="text-xs font-semibold text-[#793FFF] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#793FFF] focus:outline-none focus:ring-1 focus:ring-[#793FFF]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-full bg-[#793FFF] py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/25 hover:bg-[#682FF8] transition active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-bold text-[#793FFF] hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
