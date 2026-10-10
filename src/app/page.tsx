import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-indigo-50 to-white px-6 py-24 text-center sm:px-12 lg:px-24">
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Earn Rewards by Completing Simple Tasks
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
          Take quizzes, complete tasks, and participate in surveys to earn demo points. Track your progress and redeem rewards.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Started
          </Link>
          <Link
            href="/#features"
            className="rounded-md bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
          >
            Learn More
          </Link>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Currently in demo mode — all rewards are simulated
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full px-6 py-20 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center sm:text-4xl">
            Features
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">⚡</span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Available Now
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Quick Quizzes</h3>
              <p className="mt-4 text-slate-600 flex-grow">
                Test your knowledge with timed multiple-choice quizzes. 5 questions, 7 seconds each. Earn demo points for correct answers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">📋</span>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Simple Tasks</h3>
              <p className="mt-4 text-slate-600 flex-grow">
                Complete simple tasks to earn additional demo points. Tasks will be available once verified providers are integrated.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">📊</span>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Surveys</h3>
              <p className="mt-4 text-slate-600 flex-grow">
                Share your opinions through short surveys and earn demo points. Surveys will be available once verified providers approve our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-6 py-20 sm:px-12 lg:px-24 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center sm:text-4xl">
            How It Works
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">Create your free account</h3>
              <p className="mt-2 text-slate-600">Sign up in seconds to start your journey.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">Complete quizzes and earn demo points</h3>
              <p className="mt-2 text-slate-600">Engage with activities and watch your balance grow.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">Track your balance and redeem rewards (simulated)</h3>
              <p className="mt-2 text-slate-600">Exchange points for demo rewards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Transparency Section */}
      <section className="w-full px-6 py-20 sm:px-12 lg:px-24 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center sm:text-4xl">
            Built with Transparency
          </h2>
          <ul className="mt-10 space-y-4 text-lg text-slate-600">
            <li className="flex items-start">
              <span className="mr-3 text-indigo-600 text-xl">✓</span>
              <span>All points and rewards are clearly labelled as simulated</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-indigo-600 text-xl">✓</span>
              <span>No hidden fees or surprise charges</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-indigo-600 text-xl">✓</span>
              <span>Your data is protected with industry-standard security</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-indigo-600 text-xl">✓</span>
              <span>Tasks and surveys will only be added from verified, approved providers</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
