import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminPanel from '@/components/AdminPanel';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Console | Task Earn',
  description: 'Manage quiz questions and platform feature toggles.',
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  const admin = createAdminClient();

  // 1. Fetch user role server-side (cannot be edited by client)
  const { data: profile } = await admin
    .from('profiles')
    .select('role, display_name, email')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f7f4fd] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          </div>
          <h1 className="mt-4 text-xl font-bold text-slate-900">Admin Access Restricted</h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Your current account (<strong>{user.email}</strong>) has the <strong>&apos;user&apos;</strong> role. Only designated administrators can manage platform features and quiz questions.
          </p>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left text-xs text-slate-600 border border-slate-200">
            <strong>How to promote your account:</strong>
            <p className="mt-1">
              In your Supabase dashboard &rarr; Table Editor &rarr; <code>profiles</code>, change your user row&apos;s <code>role</code> column from <code>user</code> to <code>admin</code>.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/dashboard"
              className="inline-flex w-full justify-center rounded-full bg-[#793FFF] py-3 px-6 text-sm font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/25"
            >
              Return to User Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Fetch admin data
  const { data: flags } = await admin
    .from('feature_flags')
    .select('*')
    .order('name');

  const { data: questions } = await admin
    .from('quiz_questions')
    .select('*')
    .order('created_at', { ascending: false });

  const { count: totalUsers } = await admin
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="min-h-screen bg-[#f7f4fd] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Admin Console</h1>
              <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-bold text-indigo-700">
                Server-Verified Admin
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Logged in as {profile?.display_name || user.email}
            </p>
          </div>

          <Link
            href="/dashboard"
            className="self-start sm:self-auto rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            ← User Dashboard
          </Link>
        </div>

        {/* Interactive Admin Panel */}
        <AdminPanel
          initialFlags={flags || []}
          initialQuestions={questions || []}
          totalUsers={totalUsers || 0}
        />
      </div>
    </div>
  );
}
