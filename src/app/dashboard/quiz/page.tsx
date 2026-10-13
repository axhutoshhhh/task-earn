'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
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

      // Dispatch balance update event so Navbar & Dashboard update immediately
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('taskearn:balance-updated'));
      }
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
        headers: { 'Content-Type': 'application/json' },
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
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Navigation Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              router.push('/dashboard');
              router.refresh();
            }}
            className="neu-btn px-4 py-2 rounded-full inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#793FFF] transition cursor-pointer"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
          <span className="neu-inset-sm px-3.5 py-1 text-[11px] font-black text-[#793FFF] rounded-full">
            Speed Engine • 7s Countdown
          </span>
        </div>

        {/* 1. INTRO STATE */}
        {gameState === 'intro' && (
          <div className="neu-flat-xl rounded-[36px] bg-[#EEF2F7] border border-white/60 p-8 sm:p-10 text-center text-slate-800">
            <div className="neu-icon-well flex h-16 w-16 mx-auto items-center justify-center rounded-2xl text-[#793FFF]">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h1 className="mt-6 text-2xl font-black text-slate-800 sm:text-3xl tracking-tight">
              Speed Knowledge Quiz
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
              Answer 5 multiple-choice questions under strict 7-second countdown timers.
            </p>

            <div className="mt-8 neu-inset rounded-2xl p-5 sm:p-6 text-left text-xs sm:text-sm text-slate-700 space-y-3">
              <div className="neu-convex rounded-xl p-3 border border-white/60 flex items-center gap-3">
                <span className="neu-inset-sm flex h-6 w-6 items-center justify-center rounded-full text-[#793FFF] text-xs font-black">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span className="font-semibold text-slate-800">5 Multiple-Choice Questions</span>
              </div>
              <div className="neu-convex rounded-xl p-3 border border-white/60 flex items-center gap-3">
                <span className="neu-inset-sm flex h-6 w-6 items-center justify-center rounded-full text-amber-700 text-xs font-black">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </span>
                <span className="text-slate-700"><strong>7 Seconds per Question:</strong> Auto-advances when time expires</span>
              </div>
              <div className="neu-convex rounded-xl p-3 border border-white/60 flex items-center gap-3">
                <span className="neu-inset-sm flex h-6 w-6 items-center justify-center rounded-full text-emerald-700 text-xs font-black">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                </span>
                <span className="text-slate-700"><strong>+10 Points:</strong> Credited to your reward wallet per correct answer</span>
              </div>
              <div className="neu-convex rounded-xl p-3 border border-white/60 flex items-center gap-3">
                <span className="neu-inset-sm flex h-6 w-6 items-center justify-center rounded-full text-slate-700 text-xs font-black">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </span>
                <span className="text-slate-700"><strong>Server Verified:</strong> Answers evaluated securely with anti-replay protection</span>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="mt-8 neu-btn-primary w-full py-4 px-6 rounded-full text-sm sm:text-base font-bold shadow-lg cursor-pointer"
            >
              Start Speed Quiz →
            </button>
          </div>
        )}

        {/* 2. LOADING STATE */}
        {gameState === 'loading' && (
          <div className="neu-flat-xl rounded-[36px] bg-[#EEF2F7] border border-white/60 p-14 text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#793FFF] border-r-transparent"></div>
            <p className="mt-4 text-sm font-bold text-slate-700">Loading your questions from database...</p>
          </div>
        )}

        {/* 3. ACTIVE QUIZ STATE */}
        {gameState === 'active' && questions[currentIndex] && (
          <div className="neu-flat-xl rounded-[36px] bg-[#EEF2F7] border border-white/60 p-6 sm:p-9 text-slate-800">
            {/* Header: Progress & Timer */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-200/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <div className="mt-1.5 h-2.5 w-36 sm:w-48 rounded-full neu-inset-sm overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#793FFF] to-[#06B6D4] transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Countdown Timer Badge */}
              <div
                className={`neu-inset flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-sm font-black transition-all ${
                  timeLeft <= 2
                    ? 'text-rose-600 ring-2 ring-rose-400 animate-pulse'
                    : timeLeft <= 4
                    ? 'text-amber-600'
                    : 'text-[#793FFF]'
                }`}
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span>{timeLeft}s</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="mt-7">
              <h2 className="text-lg sm:text-2xl font-black text-slate-800 leading-snug">
                {questions[currentIndex].question}
              </h2>
            </div>

            {/* Options List */}
            <div className="mt-7 space-y-3.5" role="radiogroup" aria-label="Quiz Choices">
              {questions[currentIndex].options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl text-sm sm:text-base font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'neu-inset text-[#793FFF] ring-2 ring-[#793FFF]'
                        : 'neu-btn text-slate-800 hover:text-[#793FFF]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`neu-inset-sm flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${
                        isSelected ? 'text-[#793FFF]' : 'text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {isSelected && (
                      <svg className="h-4 w-4 text-[#793FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Skip footer */}
            <div className="mt-7 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
              <span>Auto-advances when 7s countdown expires.</span>
              <button
                type="button"
                onClick={() => advanceQuestion(null)}
                className="font-bold text-slate-600 hover:text-[#793FFF] transition underline cursor-pointer"
              >
                Skip Question →
              </button>
            </div>
          </div>
        )}

        {/* 4. SUBMITTING STATE */}
        {gameState === 'submitting' && (
          <div className="neu-flat-xl rounded-[36px] bg-[#EEF2F7] border border-white/60 p-14 text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#793FFF] border-r-transparent"></div>
            <p className="mt-4 text-sm font-bold text-slate-700">
              Evaluating answers &amp; crediting points...
            </p>
          </div>
        )}

        {/* 5. RESULT STATE */}
        {gameState === 'result' && result && (
          <div className="neu-flat-xl rounded-[36px] bg-[#EEF2F7] border border-white/60 p-8 sm:p-10 text-center text-slate-800">
            <div className="neu-icon-well flex h-16 w-16 mx-auto items-center justify-center rounded-2xl text-emerald-600">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
              </svg>
            </div>
            <h2 className="mt-5 text-2xl font-black text-slate-800 tracking-tight">Quiz Finished!</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">{result.message}</p>

            <div className="my-7 grid grid-cols-2 gap-4">
              <div className="neu-inset rounded-2xl p-5 text-center">
                <span className="text-[11px] uppercase font-bold text-slate-400">Score</span>
                <p className="mt-1 text-3xl font-black text-slate-800">
                  {result.correctCount} / {result.totalQuestions}
                </p>
              </div>
              <div className="neu-inset rounded-2xl p-5 text-center">
                <span className="text-[11px] uppercase font-bold text-[#793FFF]">Points Credited</span>
                <p className="mt-1 text-3xl font-black text-[#793FFF]">
                  +{result.pointsEarned}
                </p>
              </div>
            </div>

            <div className="neu-convex rounded-2xl p-4 border border-white/60 text-xs text-emerald-800 text-left mb-7">
              <strong>Transaction Confirmed:</strong> Points have been recorded to your secure wallet and are ready for reward redemption.
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5">
              <button
                onClick={startQuiz}
                className="neu-btn-primary flex-1 py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm shadow-md cursor-pointer"
              >
                Play Another Quiz
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push('/dashboard');
                  router.refresh();
                }}
                className="neu-btn flex-1 py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm text-slate-700 transition text-center cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* 6. ERROR STATE */}
        {gameState === 'error' && (
          <div className="neu-flat-xl rounded-[36px] bg-[#EEF2F7] border border-white/60 p-8 text-center text-slate-800">
            <h2 className="text-xl font-bold text-rose-600">Quiz Error</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">{errorMessage || 'An error occurred.'}</p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={startQuiz}
                className="neu-btn-primary py-2.5 px-6 text-xs font-bold rounded-full cursor-pointer"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push('/dashboard');
                  router.refresh();
                }}
                className="neu-btn py-2.5 px-6 text-xs font-bold text-slate-700 rounded-full cursor-pointer"
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
