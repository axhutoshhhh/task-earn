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
  
  // Timer state (seconds remaining, counts down from 7)
  const [timeLeft, setTimeLeft] = useState<number>(SECONDS_PER_QUESTION);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [result, setResult] = useState<QuizResult | null>(null);

  // Clear timer helper
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Submit all answers to server
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

  // Advance to next question or submit if last question
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

  // Handle timer tick when active
  useEffect(() => {
    if (gameState !== 'active') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired for this question: advance with no answer
          advanceQuestion(null);
          return SECONDS_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimer();
  }, [gameState, currentIndex, advanceQuestion, clearTimer]);

  // Start Quiz: calls backend /api/quiz/start
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
    // Brief 200ms visual confirmation before advancing
    setTimeout(() => {
      advanceQuestion(optionIndex);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Navigation Bar Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
          >
            ← Back to Dashboard
          </Link>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            Simulated Quiz
          </span>
        </div>

        {/* 1. INTRO STATE */}
        {gameState === 'intro' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-3xl">
              ⚡
            </div>
            <h1 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
              Knowledge Speed Quiz
            </h1>
            <p className="mt-3 text-slate-600">
              Test your knowledge and earn demo points.
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-6 text-left text-sm text-slate-700 space-y-3 border border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-bold text-indigo-600">✓ Exactly 5 Questions</span>
                <span>— Multiple choice</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-amber-600">⏱ 7-Second Timer</span>
                <span>— Strict countdown per question</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-green-600">★ +10 Demo Points</span>
                <span>— Per correct answer</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-500">🔒 Server-Verified</span>
                <span>— Timing and scores evaluated server-side</span>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="mt-8 w-full rounded-xl bg-indigo-600 py-3.5 px-6 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Quiz Now
            </button>
          </div>
        )}

        {/* 2. LOADING STATE */}
        {gameState === 'loading' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-4 text-base font-medium text-slate-700">Preparing your 5 questions...</p>
          </div>
        )}

        {/* 3. ACTIVE QUIZ STATE */}
        {gameState === 'active' && questions[currentIndex] && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Progress and Timer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <div className="mt-1 h-2 w-36 sm:w-48 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* 7-Second Countdown Badge */}
              <div
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-sm font-bold transition-all ${
                  timeLeft <= 2
                    ? 'bg-rose-100 text-rose-700 animate-pulse'
                    : timeLeft <= 4
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
                aria-live="polite"
              >
                <span>⏱</span>
                <span>{timeLeft}s</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl leading-snug">
                {questions[currentIndex].question}
              </h2>
            </div>

            {/* Options List */}
            <div className="mt-6 space-y-3" role="radiogroup" aria-label="Quiz Options">
              {questions[currentIndex].options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-medium transition flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold text-slate-600 bg-slate-50">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {isSelected && (
                      <span className="text-indigo-600 font-bold">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer Notice */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Select an answer or wait for the 7s timer.</span>
              <button
                type="button"
                onClick={() => advanceQuestion(null)}
                className="text-slate-600 hover:text-slate-900 underline"
              >
                Skip Question →
              </button>
            </div>
          </div>
        )}

        {/* 4. SUBMITTING STATE */}
        {gameState === 'submitting' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-4 text-base font-medium text-slate-700">
              Validating answers and recording demo rewards...
            </p>
          </div>
        )}

        {/* 5. RESULT STATE */}
        {gameState === 'result' && result && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
              🎉
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900">Quiz Completed!</h2>
            <p className="mt-2 text-sm text-slate-600">{result.message}</p>

            <div className="my-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="text-xs uppercase font-semibold text-slate-500">Correct Answers</span>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">
                  {result.correctCount} / {result.totalQuestions}
                </p>
              </div>
              <div className="rounded-xl bg-indigo-50 p-4 border border-indigo-100">
                <span className="text-xs uppercase font-semibold text-indigo-600">Demo Points Earned</span>
                <p className="mt-1 text-2xl font-extrabold text-indigo-700">
                  +{result.pointsEarned}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-800 text-left mb-6">
              <strong>Simulated Points Notice:</strong> All points earned are strictly demo units for testing the reward ledger. Points carry no cash, cryptocurrency, or monetary value.
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={startQuiz}
                className="flex-1 rounded-xl bg-indigo-600 py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
              >
                Play Another Quiz
              </button>
              <Link
                href="/dashboard"
                className="flex-1 rounded-xl bg-slate-100 py-3 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition text-center"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* 6. ERROR STATE */}
        {gameState === 'error' && (
          <div className="rounded-2xl border border-rose-200 bg-white p-8 shadow-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-3xl text-rose-600">
              ⚠️
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">Quiz Error</h2>
            <p className="mt-2 text-sm text-rose-600">{errorMessage || 'An unexpected error occurred.'}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={startQuiz}
                className="rounded-xl bg-indigo-600 py-2.5 px-5 text-sm font-semibold text-white hover:bg-indigo-500 transition"
              >
                Try Again
              </button>
              <Link
                href="/dashboard"
                className="rounded-xl bg-slate-100 py-2.5 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
