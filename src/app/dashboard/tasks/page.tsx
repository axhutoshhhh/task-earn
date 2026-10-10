import Link from 'next/link';

export const metadata = {
  title: 'Tasks | Task Earn',
  description: 'View available tasks on Task Earn.',
};

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
          >
            ← Back to Dashboard
          </Link>
          <span className="rounded-full bg-slate-200 px-3.5 py-1 text-xs font-semibold text-slate-700">
            Tasks (Coming Soon)
          </span>
        </div>

        {/* Empty State Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">
            📋
          </div>

          <span className="mt-6 inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            0 Tasks Available • Awaiting Provider Approval
          </span>

          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
            Tasks Are Currently Unavailable
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
            Task Earn does not host fabricated tasks or mock assignments. We are actively working to establish legitimate partnerships with verified third-party task providers.
          </p>

          {/* Honesty & Transparency Box */}
          <div className="mx-auto mt-8 max-w-xl rounded-xl bg-slate-50 p-6 text-left border border-slate-200 space-y-3">
            <h2 className="text-sm font-bold text-slate-800">Our Commitment to Transparency:</h2>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc pl-5">
              <li>
                <strong>No fake tasks:</strong> We will never generate artificial tasks to falsely inflate engagement.
              </li>
              <li>
                <strong>Authenticated validation:</strong> Future tasks will be verified exclusively through provider-approved server-to-server callbacks.
              </li>
              <li>
                <strong>Demo stage:</strong> Until compliant integrations and business model approvals are secured, this section remains strictly disabled.
              </li>
            </ul>
          </div>

          {/* Alternative Action */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard/quiz"
              className="w-full sm:w-auto rounded-full bg-[#793FFF] px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-[#793FFF]/25 hover:bg-[#682FF8] transition text-center"
            >
              Try Speed Quizzes Instead →
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition text-center shadow-xs"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
