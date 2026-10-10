'use client';

import { useState } from 'react';

interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  is_active: boolean;
}

interface AdminPanelProps {
  initialFlags: FeatureFlag[];
  initialQuestions: QuizQuestion[];
  totalUsers: number;
}

export default function AdminPanel({
  initialFlags,
  initialQuestions,
  totalUsers,
}: AdminPanelProps) {
  const [flags, setFlags] = useState<FeatureFlag[]>(initialFlags);
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // New question form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newCorrectIndex, setNewCorrectIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle feature flag
  const handleToggleFlag = async (name: string, currentStatus: boolean) => {
    setError(null);
    setMessage(null);
    const newStatus = !currentStatus;

    try {
      const res = await fetch('/api/admin/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, enabled: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update feature flag.');

      setFlags((prev) =>
        prev.map((f) => (f.name === name ? { ...f, enabled: newStatus } : f))
      );
      setMessage(`Feature flag "${name}" is now ${newStatus ? 'ENABLED' : 'PAUSED'}.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error updating flag.';
      setError(msg);
    }
  };

  // Toggle quiz question active state
  const handleToggleQuestion = async (id: string, currentStatus: boolean) => {
    setError(null);
    setMessage(null);
    const newStatus = !currentStatus;

    try {
      const res = await fetch('/api/admin/questions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update question.');

      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, is_active: newStatus } : q))
      );
      setMessage(`Question updated to ${newStatus ? 'ACTIVE' : 'INACTIVE'}.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error updating question.';
      setError(msg);
    }
  };

  // Delete question
  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/questions?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete question.');

      setQuestions((prev) => prev.filter((q) => q.id !== id));
      setMessage('Question deleted successfully.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error deleting question.';
      setError(msg);
    }
  };

  // Create new question
  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const filteredOptions = newOptions.map((o) => o.trim());
      if (filteredOptions.some((o) => o.length === 0)) {
        throw new Error('All 4 options must be filled.');
      }

      const res = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: newQuestionText.trim(),
          options: filteredOptions,
          correct_index: newCorrectIndex,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add question.');

      setQuestions((prev) => [data.question, ...prev]);
      setMessage('New quiz question created successfully!');
      setShowAddModal(false);
      setNewQuestionText('');
      setNewOptions(['', '', '', '']);
      setNewCorrectIndex(0);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error creating question.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Notifications */}
      {message && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 flex items-center justify-between">
          <span className="text-sm font-medium">✓ {message}</span>
          <button onClick={() => setMessage(null)} className="font-bold text-sm">✕</button>
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-rose-900 flex items-center justify-between">
          <span className="text-sm font-medium">⚠️ {error}</span>
          <button onClick={() => setError(null)} className="font-bold text-sm">✕</button>
        </div>
      )}

      {/* Honest Metrics Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-semibold uppercase text-slate-500">Total Registered Users</span>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">{totalUsers}</p>
          <p className="mt-1 text-xs text-slate-500">Live count from Supabase database</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-semibold uppercase text-slate-500">Total Quiz Questions</span>
          <p className="mt-2 text-3xl font-extrabold text-[#793FFF]">{questions.length}</p>
          <p className="mt-1 text-xs text-slate-500">
            {questions.filter((q) => q.is_active).length} active questions in pool
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-semibold uppercase text-slate-500">Active Feature Flags</span>
          <p className="mt-2 text-3xl font-extrabold text-emerald-600">
            {flags.filter((f) => f.enabled).length} / {flags.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">Platform operational status</p>
        </div>
      </div>

      {/* Feature Flags Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Platform Feature Flags (Emergency Pause Controls)</h2>
        <p className="mt-1 text-xs text-slate-500">
          Instantly pause or enable platform modules across the application.
        </p>

        <div className="mt-6 divide-y divide-slate-100">
          {flags.map((flag) => (
            <div key={flag.id} className="py-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 capitalize">{flag.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      flag.enabled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {flag.enabled ? 'ACTIVE' : 'PAUSED'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{flag.description}</p>
              </div>

              <button
                type="button"
                onClick={() => handleToggleFlag(flag.name, flag.enabled)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  flag.enabled
                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                {flag.enabled ? 'Pause Feature' : 'Enable Feature'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Questions Management Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Quiz Questions Pool ({questions.length})</h2>
            <p className="text-xs text-slate-500">
              Manage questions served by the 5-question speed quiz engine.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="rounded-xl bg-[#793FFF] px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-xs"
          >
            + Add New Question
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className={`rounded-xl border p-4 transition ${
                q.is_active ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                    <h3 className="text-sm font-bold text-slate-900">{q.question}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        q.is_active
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {q.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-2 rounded-lg border ${
                          oIdx === q.correct_index
                            ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                        <span>{opt}</span>
                        {oIdx === q.correct_index && (
                          <span className="ml-1 text-emerald-600 font-bold">✓ (Correct)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleQuestion(q.id, q.is_active)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  >
                    {q.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Add New Quiz Question</h3>
            <p className="mt-1 text-xs text-slate-500">
              Provide the question, 4 choices, and pick which option is correct.
            </p>

            <form onSubmit={handleAddQuestion} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Question Text
                </label>
                <input
                  type="text"
                  required
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g. What is the capital of France?"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[#793FFF] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Options (4 required) & Correct Choice
                </label>
                {newOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={newCorrectIndex === idx}
                      onChange={() => setNewCorrectIndex(idx)}
                      title="Select as correct answer"
                      className="h-4 w-4 text-[#793FFF] focus:ring-indigo-500"
                    />
                    <span className="text-xs font-bold text-slate-500 w-4">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => {
                        const updated = [...newOptions];
                        updated[idx] = e.target.value;
                        setNewOptions(updated);
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                      className="flex-1 rounded-xl border border-slate-300 p-2 text-xs focus:border-[#793FFF] focus:outline-none"
                    />
                  </div>
                ))}
                <p className="text-xs text-slate-400">Select the radio button next to the correct answer.</p>
              </div>

              <div className="mt-6 flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-[#793FFF] py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-xs"
                >
                  {isSubmitting ? 'Saving...' : 'Add Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
