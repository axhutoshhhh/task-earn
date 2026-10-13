'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GameQuest {
  id: string;
  title: string;
  genre: string;
  rewardPoints: number;
  milestone: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const FEATURED_GAMES: GameQuest[] = [
  {
    id: 'game-1',
    title: 'Neon Reflex Runner',
    genre: 'Arcade / Reflex',
    rewardPoints: 50,
    milestone: 'Survive 30 seconds & dodge obstacles',
    difficulty: 'Medium',
  },
  {
    id: 'game-2',
    title: 'Cyber Sudoku Master',
    genre: 'Logic / Puzzle',
    rewardPoints: 40,
    milestone: 'Complete 1 standard 9x9 grid under 5 mins',
    difficulty: 'Easy',
  },
  {
    id: 'game-3',
    title: 'Galaxy Commander Odyssey',
    genre: 'Strategy / RPG',
    rewardPoints: 120,
    milestone: 'Reach Base Level 10 & defeat Sector Boss',
    difficulty: 'Hard',
  },
  {
    id: 'game-4',
    title: 'Match-3 Royal Kingdom',
    genre: 'Casual Match-3',
    rewardPoints: 60,
    milestone: 'Clear Stage 20 & unlock Golden Chest',
    difficulty: 'Easy',
  },
];

export default function GamesPage() {
  const router = useRouter();
  const [isPlayingMiniGame, setIsPlayingMiniGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [targetPosition, setTargetPosition] = useState({ top: 40, left: 50 });
  const [gameOver, setGameOver] = useState(false);
  const [claimedReward, setClaimedReward] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Timer loop for reflex game
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingMiniGame && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlayingMiniGame) {
      setIsPlayingMiniGame(false);
      setGameOver(true);
    }
    return () => clearInterval(timer);
  }, [isPlayingMiniGame, timeLeft]);

  const startMiniGame = () => {
    setGameScore(0);
    setTimeLeft(15);
    setGameOver(false);
    setClaimedReward(false);
    setIsPlayingMiniGame(true);
    moveTarget();
  };

  const moveTarget = () => {
    const randomTop = Math.floor(Math.random() * 60) + 20;
    const randomLeft = Math.floor(Math.random() * 70) + 15;
    setTargetPosition({ top: randomTop, left: randomLeft });
  };

  const handleTargetClick = () => {
    setGameScore((prev) => prev + 1);
    moveTarget();
  };

  const claimMiniGamePoints = async () => {
    if (gameScore >= 5 && !claimedReward && !isClaiming) {
      setIsClaiming(true);
      try {
        const res = await fetch('/api/games/claim', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gameId: 'reaction-arena',
            score: gameScore,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to claim game reward.');
        }

        setClaimedReward(true);
        setToast(`+${data.pointsEarned} Points credited to your reward wallet! Balance: ${data.newBalance} PTS`);

        // Dispatch balance update event so Navbar & Dashboard update immediately
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('taskearn:balance-updated', {
              detail: { newBalance: data.newBalance },
            })
          );
        }

        setTimeout(() => setToast(null), 5000);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error claiming points.';
        setToast(msg);
      } finally {
        setIsClaiming(false);
      }
    }
  };

  const renderGameIcon = (genre: string) => {
    if (genre.includes('Reflex')) {
      return (
        <svg className="h-6 w-6 text-[#793FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    }
    if (genre.includes('Logic')) {
      return (
        <svg className="h-6 w-6 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
        </svg>
      );
    }
    if (genre.includes('Strategy')) {
      return (
        <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        </svg>
      );
    }
    return (
      <svg className="h-6 w-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
      </svg>
    );
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              router.push('/dashboard');
              router.refresh();
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition cursor-pointer"
          >
            ← Back to Dashboard Overview
          </button>
          <span className="self-start sm:self-auto rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Arcade Game Engine Active
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
            Play Games & Complete Quests
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl">
            Test games, conquer reaction speed challenges, and reach designated milestone levels to unlock high point rewards.
          </p>
        </div>

        {/* Interactive Speed Challenge Arena */}
        <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 sm:p-8 text-white shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#793FFF]">
                Browser Arcade Engine
              </span>
              <h2 className="text-lg font-bold text-white">Daily Reaction Reflex Arena</h2>
              <p className="text-xs text-slate-400">
                Hit at least 5 target milestones in 15 seconds to claim instant bonus points.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-mono font-bold text-slate-200 border border-slate-800">
                Time: {timeLeft}s
              </div>
              <div className="rounded-xl bg-[#793FFF]/20 px-3 py-1.5 text-xs font-mono font-bold text-[#793FFF] border border-[#793FFF]/30">
                Hits: {gameScore}
              </div>
            </div>
          </div>

          {/* Interactive Arena Canvas */}
          <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden flex items-center justify-center select-none">
            {!isPlayingMiniGame && !gameOver && (
              <div className="text-center space-y-3 p-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#793FFF]/20 text-[#793FFF] border border-[#793FFF]/30">
                  <svg className="h-7 w-7 text-[#793FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Reflex Target Challenge Ready</h3>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    Click the target as rapidly as possible before the 15-second timer expires.
                  </p>
                </div>
                <button
                  onClick={startMiniGame}
                  className="rounded-full bg-[#793FFF] px-8 py-3 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/30 cursor-pointer"
                >
                  Start Arena Challenge →
                </button>
              </div>
            )}

            {isPlayingMiniGame && (
              <button
                type="button"
                onClick={handleTargetClick}
                style={{
                  top: `${targetPosition.top}%`,
                  left: `${targetPosition.left}%`,
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white flex items-center justify-center shadow-lg shadow-[#793FFF]/50 active:scale-90 transition-transform cursor-pointer"
              >
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </button>
            )}

            {gameOver && (
              <div className="text-center space-y-4 p-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Challenge Completed</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  You scored <strong className="text-white">{gameScore} hits</strong> in 15 seconds.
                </p>
                <div className="flex justify-center gap-3">
                  {gameScore >= 5 ? (
                    claimedReward ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 px-6 py-2.5 text-xs font-bold">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>+{gameScore * 5} Points Credited</span>
                      </span>
                    ) : (
                      <button
                        onClick={claimMiniGamePoints}
                        disabled={isClaiming}
                        className="rounded-full bg-emerald-500 text-white px-6 py-2.5 text-xs font-bold hover:bg-emerald-600 transition shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {isClaiming ? 'Claiming Points...' : `Claim +${Math.min(gameScore * 5, 100)} Points Now`}
                      </button>
                    )
                  ) : (
                    <span className="text-xs text-rose-400">Score 5 or more hits to qualify for points.</span>
                  )}
                  <button
                    onClick={startMiniGame}
                    className="rounded-full bg-slate-800 px-6 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {toast && (
            <div className="rounded-2xl bg-emerald-500/20 border border-emerald-500/40 p-3 text-center text-xs font-bold text-emerald-300 flex items-center justify-center gap-2">
              <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              <span>{toast}</span>
            </div>
          )}
        </div>

        {/* Featured Partner Games Catalog */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Featured Partner Games</h2>
            <span className="text-xs text-slate-500">{FEATURED_GAMES.length} Active Quests</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_GAMES.map((game) => (
              <div
                key={game.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#793FFF]/30 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      {renderGameIcon(game.genre)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          game.difficulty === 'Easy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : game.difficulty === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {game.difficulty}
                      </span>
                      <span className="rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3 py-1 text-xs font-black text-[#793FFF]">
                        +{game.rewardPoints} Pts
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{game.title}</h3>
                  <span className="text-xs font-semibold text-[#793FFF]">{game.genre}</span>

                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Required Quest Milestone
                    </span>
                    <p className="mt-1 text-xs font-semibold text-slate-800">{game.milestone}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Cross-Platform Sync</span>
                  <button
                    onClick={() => alert(`Starting quest for "${game.title}". Complete the milestone to earn +${game.rewardPoints} points!`)}
                    className="rounded-full bg-[#793FFF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20 active:scale-95 cursor-pointer"
                  >
                    Start Game Quest →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
