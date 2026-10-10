import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard | Task Earn',
  description: 'Manage your Task Earn demo account and simulated rewards.',
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const displayName = profile?.full_name || profile?.display_name || user.email?.split('@')[0] || 'User';

  // Fetch points balance
  const { data: ledgerData } = await supabase
    .from('reward_ledger')
    .select('amount')
    .eq('user_id', user.id);

  const pointsBalance = ledgerData?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Task Earn</h1>
            <span className="ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              Demo Mode
            </span>
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {displayName}!
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {user.email} &mdash; <span className="font-semibold text-indigo-600">Demo Account</span>
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
            <dt className="text-sm font-medium text-gray-500 truncate">Demo Points Balance</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{pointsBalance}</dd>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <dt className="text-sm font-medium text-gray-500 truncate">Quizzes Available</dt>
            <dd className="mt-1 text-xl font-semibold text-gray-900">5 Questions Ready</dd>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-300">
            <dt className="text-sm font-medium text-gray-500 truncate">Tasks Status</dt>
            <dd className="mt-1 text-sm font-semibold text-gray-700">Coming Soon (0 available)</dd>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-300">
            <dt className="text-sm font-medium text-gray-500 truncate">Surveys Status</dt>
            <dd className="mt-1 text-sm font-semibold text-gray-700">Coming Soon (0 available)</dd>
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Quizzes Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-lg font-medium text-gray-900">Quick Knowledge Quizzes</h3>
              <p className="mt-2 text-sm text-gray-500">
                Earn simulated points by answering quick knowledge questions.
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <Link
                href="/dashboard/quiz"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
              >
                Start Quiz
              </Link>
            </div>
          </div>

          {/* Tasks Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col opacity-75">
            <div className="p-6 flex-grow">
              <h3 className="text-lg font-medium text-gray-900">Available Tasks</h3>
              <p className="mt-2 text-sm text-gray-500">
                Tasks are currently unavailable until verified partners approve integration.
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <Link
                href="/dashboard/tasks"
                className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-xs text-slate-700 bg-white hover:bg-slate-50 transition w-full"
              >
                View Status (Coming Soon)
              </Link>
            </div>
          </div>

          {/* Surveys Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col opacity-90">
            <div className="p-6 flex-grow">
              <h3 className="text-lg font-medium text-gray-900">Surveys</h3>
              <p className="mt-2 text-sm text-gray-500">
                Surveys are currently unavailable until verified partners approve integration.
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <Link
                href="/dashboard/surveys"
                className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-xs text-slate-700 bg-white hover:bg-slate-50 transition w-full"
              >
                View Status (Coming Soon)
              </Link>
            </div>
          </div>

          {/* Rewards Redemption Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-lg font-medium text-gray-900">Redeem Simulated Points</h3>
              <p className="mt-2 text-sm text-gray-500">
                Browse the demo catalog to exchange your simulated points for simulated rewards.
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <Link
                href="/dashboard/rewards"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
              >
                View Rewards
              </Link>
            </div>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Disclaimer: All points and rewards are strictly simulated and hold no real-world cash or monetary value.
              </h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
