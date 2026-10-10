'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardNav from '@/components/DashboardNav';

interface AIBatch {
  id: string;
  prompt: string;
  taskType: string;
  points: number;
  responseA: string;
  responseB: string;
}

const AI_TASKS: AIBatch[] = [
  {
    id: 'ai-1',
    prompt: 'Explain the difference between synchronous and asynchronous JavaScript to a beginner programmer.',
    taskType: 'LLM Response Comparison (RLHF)',
    points: 30,
    responseA:
      'Synchronous JavaScript executes line by line in sequence. If one operation takes 5 seconds, the whole script halts until it finishes. Asynchronous JavaScript allows tasks like network requests or timers to run in the background, executing a callback or Promise when ready without freezing the UI.',
    responseB:
      'JavaScript is single-threaded so it only runs one thing. Async means you use async/await or setTimeout. Sync is regular code. You should usually prefer async for API calls.',
  },
  {
    id: 'ai-2',
    prompt: 'Write a Python function to check whether a string is a valid palindrome, ignoring spaces and capitalization.',
    taskType: 'Code Quality Evaluation',
    points: 35,
    responseA:
      '```python\ndef is_palindrome(s: str) -> bool:\n    cleaned = "".join(c.lower() for c in s if c.isalnum())\n    return cleaned == cleaned[::-1]\n```\nThis strips all non-alphanumeric characters and checks if the cleaned string equals its reverse.',
    responseB:
      '```python\ndef is_palindrome(s):\n    return s == reversed(s)\n```\nThis reverses the string and compares them directly.',
  },
  {
    id: 'ai-3',
    prompt: 'Summarize the primary benefits of renewable solar energy for residential households in under 50 words.',
    taskType: 'Summary & Conciseness Verification',
    points: 25,
    responseA:
      'Solar energy drastically cuts household electricity bills, increases home resale valuation, provides grid energy independence, and eliminates carbon emissions. With net metering and battery storage, families produce clean, renewable power directly from their rooftop.',
    responseB:
      'Solar panels are good for the environment because they use the sun. They can be installed on roofs and they save money over a 20 year lifespan.',
  },
];

export default function TrainAIPage() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedWinner, setSelectedWinner] = useState<'A' | 'B' | 'Tie' | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentTask = AI_TASKS[currentTaskIndex];

  const handleSubmitEvaluation = () => {
    if (!selectedWinner) return;

    const pointsToAdd = currentTask.points;
    setCompletedTasks((prev) => [...prev, currentTask.id]);
    setEarnedPoints((prev) => prev + pointsToAdd);
    setToastMessage(`+${pointsToAdd} Points earned for model evaluation!`);

    setTimeout(() => {
      setToastMessage(null);
      if (currentTaskIndex < AI_TASKS.length - 1) {
        setCurrentTaskIndex((prev) => prev + 1);
        setSelectedWinner(null);
        setFeedback('');
      }
    }, 2000);
  };

  const isAllDone = completedTasks.length === AI_TASKS.length;

  return (
    <div className="min-h-screen bg-[#f7f4fd]">
      <DashboardNav />
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Dashboard
          </Link>
          <span className="self-start sm:self-auto rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3.5 py-1 text-xs font-bold text-[#793FFF] flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#793FFF] animate-pulse" />
            AI Training Station Active
          </span>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
              Train AI & Annotate Datasets
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Help calibrate and align state-of-the-art AI models. Evaluate side-by-side prompt responses for accuracy, reasoning, and clarity to earn instant points.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-xs text-right shrink-0">
            <span className="text-xs uppercase font-bold text-slate-500">Session Earnings</span>
            <p className="text-2xl font-black text-emerald-600">+{earnedPoints} Pts</p>
          </div>
        </div>

        {isAllDone ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm space-y-5">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600">
              <svg className="h-10 w-10 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" />
                <line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" />
                <line x1="15" y1="20" x2="15" y2="23" />
                <line x1="20" y1="9" x2="23" y2="9" />
                <line x1="20" y1="14" x2="23" y2="14" />
                <line x1="1" y1="9" x2="4" y2="9" />
                <line x1="1" y1="14" x2="4" y2="14" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-slate-950">AI Training Batch Completed!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              You have successfully completed all current human-feedback evaluations. You earned a total of{' '}
              <strong>+{earnedPoints} Points</strong> this session. New training batches refresh every few hours.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/dashboard/rewards"
                className="rounded-full bg-[#793FFF] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/30 hover:bg-[#682FF8] transition"
              >
                Redeem Earned Points →
              </Link>
              <button
                onClick={() => {
                  setCurrentTaskIndex(0);
                  setCompletedTasks([]);
                  setSelectedWinner(null);
                }}
                className="rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Practice Again
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            {/* Task Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-[#793FFF]/10 px-3 py-1 text-xs font-black text-[#793FFF]">
                  Batch #{currentTaskIndex + 1} of {AI_TASKS.length}
                </span>
                <span className="text-xs font-semibold text-slate-500">{currentTask.taskType}</span>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800 self-start sm:self-auto">
                +{currentTask.points} Points Available
              </span>
            </div>

            {/* User Prompt Box */}
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                AI Training Prompt Given
              </span>
              <p className="mt-1 text-base font-bold text-slate-900">
                &quot;{currentTask.prompt}&quot;
              </p>
            </div>

            {/* Model Comparison Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Response A */}
              <div
                onClick={() => setSelectedWinner('A')}
                className={`cursor-pointer rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                  selectedWinner === 'A'
                    ? 'border-[#793FFF] bg-[#793FFF]/5 ring-2 ring-[#793FFF]/20 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700">
                      Model A
                    </span>
                    {selectedWinner === 'A' && (
                      <span className="text-xs font-bold text-[#793FFF] inline-flex items-center gap-1">
                        <svg className="h-3.5 w-3.5 text-[#793FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        Selected Better
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">
                    {currentTask.responseA}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 text-center">
                  <span
                    className={`inline-block text-xs font-bold ${
                      selectedWinner === 'A' ? 'text-[#793FFF]' : 'text-slate-400'
                    }`}
                  >
                    Click to Vote Model A
                  </span>
                </div>
              </div>

              {/* Response B */}
              <div
                onClick={() => setSelectedWinner('B')}
                className={`cursor-pointer rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                  selectedWinner === 'B'
                    ? 'border-[#793FFF] bg-[#793FFF]/5 ring-2 ring-[#793FFF]/20 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700">
                      Model B
                    </span>
                    {selectedWinner === 'B' && (
                      <span className="text-xs font-bold text-[#793FFF] inline-flex items-center gap-1">
                        <svg className="h-3.5 w-3.5 text-[#793FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        Selected Better
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">
                    {currentTask.responseB}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 text-center">
                  <span
                    className={`inline-block text-xs font-bold ${
                      selectedWinner === 'B' ? 'text-[#793FFF]' : 'text-slate-400'
                    }`}
                  >
                    Click to Vote Model B
                  </span>
                </div>
              </div>
            </div>

            {/* Optional Rationale Input */}
            <div className="space-y-2">
              <label htmlFor="feedback" className="text-xs font-bold text-slate-700">
                Feedback / Reasoning (Optional)
              </label>
              <input
                id="feedback"
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Briefly state why your selected model was superior..."
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#793FFF]"
              />
            </div>

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                Your annotation directly trains commercial LLM reward models.
              </p>

              <button
                disabled={!selectedWinner}
                onClick={handleSubmitEvaluation}
                className={`w-full sm:w-auto rounded-full px-8 py-3 text-xs sm:text-sm font-bold transition shadow-md ${
                  selectedWinner
                    ? 'bg-[#793FFF] text-white hover:bg-[#682FF8] shadow-[#793FFF]/25 active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Evaluation & Claim +{currentTask.points} Pts →
              </button>
            </div>

            {toastMessage && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span>{toastMessage}</span>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
