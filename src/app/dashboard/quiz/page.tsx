'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  options: string[];
}

interface QuizResult {
  correctCount: number;
  totalQuestions: number;
  pointsEarned: number;
  isExpired: boolean;
  message: string;
}

const SECONDS_PER_QUESTION = 7;

export default function QuizPage() {
  const [gameState, setGameState] = useState<'intro' | 'loading' | 'active' | 'submitting' | 'result' | 'error'>('intro');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Timer state (seconds remaining)
  const [timeLeft, setTimeLeft] = useState<number>(SECONDS_PER_QUESTION);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [result, setResult] = useState<QuizResult | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const submitQuiz = useCallback(async (finalAnswers: Record<string, number>, currentAttemptId: string) => {
    clearTimer();
    setGameState('submitting');

    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId: currentAttemptId,
          answers: finalAnswers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quiz.');
      }

      setResult(data);
      setGameState('result');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit answers.';
      setErrorMessage(msg);
      setGameState('error');
    }
  }, [clearTimer]);

  const advanceQuestion = useCallback((chosenOption: number | null) => {
    clearTimer();

    const currentQ = questions[currentIndex];
    const updatedAnswers = {
      ...answers,
      ...(currentQ && chosenOption !== null ? { [currentQ.id]: chosenOption } : {}),
    };
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(SECONDS_PER_QUESTION);
    } else {
      if (attemptId) {
        submitQuiz(updatedAnswers, attemptId);
      }
    }
  }, [clearTimer, questions, currentIndex, answers, attemptId, submitQuiz]);

  useEffect(() => {
    if (gameState !== 'active') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          advanceQuestion(null);
          return SECONDS_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimer();
  }, [gameState, currentIndex, advanceQuestion, clearTimer]);

  const startQuiz = async () => {
    setGameState('loading');
    setErrorMessage(null);
    setAnswers({});
    setCurrentIndex(0);
    setSelectedOption(null);
    setTimeLeft(SECONDS_PER_QUESTION);

    try {
      const res = await fetch('/api/quiz/start', {
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to start quiz.');
      }

      if (!data.questions || data.questions.length === 0) {
        throw new Error('No quiz questions returned from server.');
      }

      setAttemptId(data.attemptId);
      setQuestions(data.questions);
      setGameState('active');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error starting quiz.';
      setErrorMessage(msg);
      setGameState('error');
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setTimeout(() => {
      advanceQuestion(optionIndex);
    }, 220);
  };

  return (
    <div className="min-h-screen bg-[#f7f4fd] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Navigation Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Dashboard
          </Link>
          <span className="rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3.5 py-1 text-xs font-bold text-[#793FFF]">
            Speed Engine • 7s Timer
          </span>
        </div>

        {/* 1. INTRO STATE */}
        {gameState === 'intro' && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white shadow-md shadow-[#793FFF]/25">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h1 className="mt-6 text-2xl font-black text-slate-950 sm:text-3xl">
              Speed Knowledge Quiz
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Answer 5 multiple-choice questions under strict 7-second countdown timers.
            </p>

            <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-left text-xs sm:text-sm text-slate-700 space-y-3.5 border border-slate-200">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#793FFF]/15 font-bold text-[#793FFF] text-xs">✓</span>
                <span className="font-semibold text-slate-900">5 Multiple-Choice Questions</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700 text-xs">⏱</span>
                <span><strong>7 Seconds per Question:</strong> Auto-advances when time expires</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700 text-xs">★</span>
                <span><strong>+10 Points:</strong> Credited to your reward wallet per correct answer</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-700 text-xs">🔒</span>
                <span><strong>Server Verified:</strong> Answers evaluated securely with anti-replay protection</span>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="mt-8 w-full rounded-full bg-[#793FFF] py-4 px-6 text-base font-bold text-white shadow-lg shadow-[#793FFF]/30 hover:bg-[#682FF8] transition active:scale-95"
            >
              Start Speed Quiz →
            </button>
          </div>
        )}

        {/* 2. LOADING STATE */}
        {gameState === 'loading' && (
          <div className="rounded-3xl border border-slate-200 bg-white p-14 shadow-sm text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#793FFF] border-r-transparent"></div>
            <p className="mt-4 text-sm font-bold text-slate-700">Loading your questions from database...</p>
          </div>
        )}

        {/* 3. ACTIVE QUIZ STATE */}
        {gameState === 'active' && questions[currentIndex] && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Header: Progress & Timer */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <div className="mt-1.5 h-2 w-36 sm:w-48 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#793FFF] transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Countdown Timer Badge */}
              <div
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-sm font-black transition-all ${
                  timeLeft <= 2
                    ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-300 animate-pulse'
                    : timeLeft <= 4
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-[#793FFF]/10 text-[#793FFF]'
                }`}
              >
                <span>⏱</span>
                <span>{timeLeft}s</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="mt-6">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                {questions[currentIndex].question}
              </h2>
            </div>

            {/* Options List */}
            <div className="mt-6 space-y-3" role="radiogroup" aria-label="Quiz Choices">
              {questions[currentIndex].options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#793FFF] bg-[#793FFF]/10 text-[#793FFF] ring-2 ring-[#793FFF]'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-[#793FFF]/50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-xl border text-xs font-bold bg-slate-50 text-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {isSelected && <span className="text-[#793FFF] font-bold">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Skip footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Auto-advances when 7s countdown expires.</span>
              <button
                type="button"
                onClick={() => advanceQuestion(null)}
                className="font-semibold text-slate-600 hover:text-slate-900 underline"
              >
                Skip Question →
              </button>
            </div>
          </div>
        )}

        {/* 4. SUBMITTING STATE */}
        {gameState === 'submitting' && (
          <div className="rounded-3xl border border-slate-200 bg-white p-14 shadow-sm text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#793FFF] border-r-transparent"></div>
            <p className="mt-4 text-sm font-bold text-slate-700">
              Evaluating answers & crediting points...
            </p>
          </div>
        )}

        {/* 5. RESULT STATE */}
        {gameState === 'result' && result && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl text-emerald-600">
              🏆
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-950">Quiz Finished!</h2>
            <p className="mt-2 text-sm text-slate-600">{result.message}</p>

            <div className="my-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <span className="text-xs uppercase font-bold text-slate-500">Score</span>
                <p className="mt-1 text-3xl font-black text-slate-900">
                  {result.correctCount} / {result.totalQuestions}
                </p>
              </div>
              <div className="rounded-2xl bg-[#793FFF]/10 p-5 border border-[#793FFF]/20">
                <span className="text-xs uppercase font-bold text-[#793FFF]">Points Credited</span>
                <p className="mt-1 text-3xl font-black text-[#793FFF]">
                  +{result.pointsEarned}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 text-xs text-emerald-800 text-left mb-6">
              <strong>Transaction Confirmed:</strong> Points have been recorded to your secure wallet and are ready for reward redemption.
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={startQuiz}
                className="flex-1 rounded-full bg-[#793FFF] py-3.5 px-6 text-sm font-bold text-white shadow-md shadow-[#793FFF]/20 hover:bg-[#682FF8] transition"
              >
                Play Another Quiz
              </button>
              <Link
                href="/dashboard"
                className="flex-1 rounded-full border border-slate-200 bg-white py-3.5 px-6 text-sm font-bold text-slate-700 hover:bg-slate-50 transition text-center"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* 6. ERROR STATE */}
        {gameState === 'error' && (
          <div className="rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Quiz Error</h2>
            <p className="mt-2 text-sm text-rose-600">{errorMessage || 'An error occurred.'}</p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={startQuiz}
                className="rounded-full bg-[#793FFF] py-2.5 px-6 text-sm font-bold text-white hover:bg-[#682FF8] transition"
              >
                Try Again
              </button>
              <Link
                href="/dashboard"
                className="rounded-full border border-slate-200 bg-white py-2.5 px-6 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
