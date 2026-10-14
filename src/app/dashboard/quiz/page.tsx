'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  question: string;
  options: string[];
}

interface QuestionReview {
  id: string;
  question: string;
  options: string[];
  userAnswerIndex: number | null;
  correctIndex: number;
  isCorrect: boolean;
}

interface QuizResult {
  correctCount: number;
  totalQuestions: number;
  pointsEarned: number;
  isExpired: boolean;
  hasPassed?: boolean;
  review?: QuestionReview[];
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

  // Guards against duplicate advancement for the same question index
  const advancedForIndexRef = useRef<number>(-1);
  const answersRef = useRef<Record<string, number>>({});

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
    // Guard: Prevent advancing more than once for the same question index
    if (advancedForIndexRef.current === currentIndex) {
      return;
    }
    advancedForIndexRef.current = currentIndex;

    clearTimer();

    const currentQ = questions[currentIndex];
    if (currentQ && chosenOption !== null) {
      answersRef.current[currentQ.id] = chosenOption;
    }
    setAnswers({ ...answersRef.current });
    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(SECONDS_PER_QUESTION);
    } else {
      if (attemptId) {
        submitQuiz(answersRef.current, attemptId);
      }
    }
  }, [clearTimer, questions, currentIndex, attemptId, submitQuiz]);

  // 1. Countdown timer interval: purely decrements timeLeft without side effects
  useEffect(() => {
    if (gameState !== 'active') return;

    // Reset countdown for this question
    setTimeLeft(SECONDS_PER_QUESTION);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimer();
    };
  }, [gameState, currentIndex, clearTimer]);

  // 2. Timeout watcher: advances question cleanly when timeLeft hits 0
  useEffect(() => {
    if (gameState !== 'active') return;

    if (timeLeft === 0) {
      advanceQuestion(null);
    }
  }, [timeLeft, gameState, advanceQuestion]);

  const startQuiz = async () => {
    clearTimer();
    setGameState('loading');
    setErrorMessage(null);
    advancedForIndexRef.current = -1;
    answersRef.current = {};
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
    if (selectedOption !== null || advancedForIndexRef.current === currentIndex) return;
    setSelectedOption(optionIndex);

    // Stop timer immediately so timeout cannot fire while waiting to advance
    clearTimer();

    setTimeout(() => {
      advanceQuestion(optionIndex);
    }, 220);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
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
              Speed Quizzes
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Answer 5 multiple-choice questions under strict 7-second countdown timers.
            </p>

            <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-left text-xs sm:text-sm text-slate-700 space-y-3.5 border border-slate-200">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#793FFF]/15 font-bold text-[#793FFF] text-xs">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span className="font-semibold text-slate-900">5 Multiple-Choice Questions</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700 text-xs">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </span>
                <span><strong>7 Seconds per Question:</strong> Auto-advances when time expires</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700 text-xs">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                </span>
                <span><strong>10 Points per Correct Answer:</strong> Minimum 3 correct answers out of 5 required to earn points (up to 50 points)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-700 text-xs">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </span>
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
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
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
            <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${result.pointsEarned > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
              {result.pointsEarned > 0 ? (
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                </svg>
              ) : (
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-950">
              {result.pointsEarned > 0 ? 'Quiz Completed & Passed!' : 'Quiz Finished'}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{result.message}</p>

            <div className="my-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <span className="text-xs uppercase font-bold text-slate-500">Score</span>
                <p className="mt-1 text-3xl font-black text-slate-900">
                  {result.correctCount} / {result.totalQuestions}
                </p>
              </div>
              <div className={`rounded-2xl p-5 border ${result.pointsEarned > 0 ? 'bg-[#793FFF]/10 border-[#793FFF]/20' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-xs uppercase font-bold ${result.pointsEarned > 0 ? 'text-[#793FFF]' : 'text-slate-500'}`}>Points Credited</span>
                <p className={`mt-1 text-3xl font-black ${result.pointsEarned > 0 ? 'text-[#793FFF]' : 'text-slate-500'}`}>
                  +{result.pointsEarned}
                </p>
              </div>
            </div>

            {result.pointsEarned > 0 ? (
              <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 text-xs text-emerald-800 text-left mb-6">
                <strong>Transaction Confirmed:</strong> {result.pointsEarned} points have been credited to your verified wallet and are ready for reward redemption.
              </div>
            ) : (
              <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-800 text-left mb-6">
                <strong>Threshold Not Met:</strong> You scored {result.correctCount} out of 5. You need at least 3 correct answers to earn points (10 points per correct answer). Try another round to qualify!
              </div>
            )}

            {/* Question by Question Review */}
            {result.review && result.review.length > 0 && (
              <div className="mt-8 mb-6 text-left border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-black text-slate-900">
                    Question Review ({result.review.length} Questions)
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    {result.correctCount} Correct • {result.review.length - result.correctCount} Incorrect
                  </span>
                </div>

                <div className="space-y-3">
                  {result.review.map((item, idx) => {
                    const optLetters = ['A', 'B', 'C', 'D'];
                    const userOptionText =
                      typeof item.userAnswerIndex === 'number' && item.options[item.userAnswerIndex]
                        ? `${optLetters[item.userAnswerIndex]}. ${item.options[item.userAnswerIndex]}`
                        : 'No answer selected (Timed out)';
                    const correctOptionText = `${optLetters[item.correctIndex]}. ${item.options[item.correctIndex]}`;

                    return (
                      <div
                        key={item.id || idx}
                        className={`rounded-2xl p-4 border transition-all ${
                          item.isCorrect
                            ? 'bg-emerald-50/60 border-emerald-200/80'
                            : 'bg-rose-50/60 border-rose-200/80'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                              Question {idx + 1}
                            </span>
                            <p className="text-sm font-bold text-slate-900 mt-0.5">
                              {item.question}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black ${
                              item.isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {item.isCorrect ? (
                              <>
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Correct (+10 pts)</span>
                              </>
                            ) : (
                              <>
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                <span>Incorrect</span>
                              </>
                            )}
                          </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-500">Your choice:</span>
                            <span className={`font-bold ${item.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {userOptionText}
                            </span>
                          </div>
                          {!item.isCorrect && (
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-500">Correct answer:</span>
                              <span className="font-bold text-emerald-700">
                                {correctOptionText}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={startQuiz}
                className="flex-1 rounded-full bg-[#793FFF] py-3.5 px-6 text-sm font-bold text-white shadow-md shadow-[#793FFF]/20 hover:bg-[#682FF8] transition"
              >
                Play Another Quiz
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push('/dashboard');
                  router.refresh();
                }}
                className="flex-1 rounded-full border border-slate-200 bg-white py-3.5 px-6 text-sm font-bold text-slate-700 hover:bg-slate-50 transition text-center cursor-pointer"
              >
                Return to Dashboard
              </button>
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
